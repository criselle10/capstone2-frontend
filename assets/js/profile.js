let token = localStorage.getItem("token");
let profileContainer = document.querySelector('#profileContainer');

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
            // console.log(data)
            let enrolledCourses = data.enrollments
            console.table(enrolledCourses)
            let message = ""; //we will add message if the enrolles courses is empty, else it will stay empty

            if (enrolledCourses.length === 0) {
                message = "No enrolled courses yet."
            } else {
                let listOfCourses = enrolledCourses.map(course => {
                    let d = new Date(course.enrolledOn)
                    // console.log(d)
                    const returnData = () => {
                        fetch(`https://ca-coursebooking.herokuapp.com/api/courses/${course.courseId}`)
                            .then(res => res.json())
                            .then(data => {
                                cName = data.name
                            })
                    }
                    return `
                        <tr>
                            <td>${course.cName}</td>
                            <td>${d}</td>
                            <td>${course.status}</td>
                        </tr>
                    `
                })

                console.log(listOfCourses)
                message = listOfCourses.join("")
            }

            const profileDetails = `
                <div class="col-12">
                    <section class="my-5">
                        <div class="text-center">
                            <h3>First Name: ${data.firstName}</h3>
                            <h3>Last Name: ${data.lastName}</h3>
                            <h3>Email: ${data.email}</h3>
                            <h3 class="ct-3">Class History</h3>
                        </div>
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th> Course Name </th>
                                    <th> Enrolled On </th>
                                    <th> Status </th>
                                </tr>
                            </thead>
                            <tbody>
                                ${message}
                            </tbody>
                        </table>
                    </section>
                </div>
                `
            // console.log(profileDetails)
            profileContainer.innerHTML = profileDetails;
        })
}