let token = localStorage.getItem("token");
let params = new URLSearchParams(window.location.search);
let courseId = params.get('courseId');
let courseName = document.querySelector('#viewCourseName');
let listOfEnrolledStudents = document.querySelector('#listOfEnrolledStudents');
let enrolledStud = document.querySelector('#enrolledStud');

if (!token || token === null) {
    alert('You must login first!')
    window.location.href = "./login.html"
} else {

    fetch(`https://ca-coursebooking.herokuapp.com/api/courses/${courseId}`, {
            method: 'GET',
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            courseName.innerHTML = `
                <h3>${data.name}</h3>
            `
            data.enrollees.forEach(course => {

                let d = new Date(course.enrolledOn);

                const row = document.createElement('tr');
                row.innerHTML = `
                        <td>${course.userId}</td>
                        <td>${d}</td>
                    `
                enrolledStud.appendChild(row);
                console.log(enrolledStud)
            })

        })
        .catch(err => console.log(err));
}