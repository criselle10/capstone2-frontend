let token = localStorage.getItem("token");
let profileContainer = document.querySelector('#profileContainer');
const spinner = document.querySelector('#spinner');
const userContainer = document.querySelector('#userContainer ');
const userEnrolledCourses = document.querySelector('#userEnrolledCourses');

if (!token || token === null) {
    alert('You must login first!')
    window.location.href = "./login.html"
} else {
    fetch('https://ca-coursebooking.herokuapp.com/api/users/details', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.enrollments)
            userContainer.innerHTML = `
                <h3><strong>First Name:</strong> ${data.firstName}</h3>
                <h3><strong>Last Name:</strong> ${data.lastName}</h3>
                <h3><strong>Email:</strong> ${data.email}</h3>
                <h4 class="text-center my-5"><strong>Class History</strong></h4>
            `
            if (data.enrollments.length == 0) {
                const row = document.createElement('tr');
                row.innerHTML = `
                        <td>No enrolled courses yet.</td>
                        <td></td>
                        <td></td>
                    `
                userEnrolledCourses.appendChild(row);
            } else {
                data.enrollments.forEach(course => {
                    fetch(`https://ca-coursebooking.herokuapp.com/api/courses/${course.courseId}`)
                        .then(res => res.json())
                        .then(data => {
                            let d = new Date(course.enrolledOn);

                            const row = document.createElement('tr');
                            row.innerHTML = `
                                <td>${data.name}</td>
                                <td>${d}</td>
                                <td>${course.status}</td>
                            `
                            userEnrolledCourses.appendChild(row);
                        })
                })
            }
            spinner.innerHTML = '';
        })
        .catch(err => console.log(err));
}