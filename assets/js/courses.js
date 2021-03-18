let adminUser = localStorage["isAdmin"];
let adminButton = document.querySelector('#adminButton');
let cardFooter;

let url = '';
if (adminUser == "false" || !adminUser) {
    adminButton.innerHTML = ""
    url = 'https://ca-coursebooking.herokuapp.com/api/courses/'
} else {
    url = 'https://ca-coursebooking.herokuapp.com/api/courses/view'
    adminButton.innerHTML = `
    <div class="col-md-2">
        <a href="./addCourse.html" class="btn btn-primary">Add Course</a>
    </div>
`
}

// fetch(url)
// .then(res)
// .then(data)
// .catch()

fetch(url)
    .then(res => {
        return res.json()
    })
    .then(data => {
        // console.log(data)
        function displayCardFooter(courseId) {
            if (adminUser == "false" || !adminUser) {
                cardFooter = `<a href="./course.html?courseId=${courseId}" class="btn btn-primary">Select course</a>`
            } else {
                cardFooter = `
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <a 
                            href="./editCourse.html?courseId=${courseId}" class="btn btn-warning editButton">
                            Edit
                        </a>
                        <a 
                            href="./viewEnrolledUser.html?courseId=${courseId}" class="btn btn-warning viewButton">
                            View
                        </a>
                    </div>
                    <div>
                        <a 
                            href="./deleteCourse.html?courseId=${courseId}" class="my-3">
                                <label class="switch">
                                    <input type="checkbox">
                                    <span class="slider round"></span>
                                </label>
                        </a>
                    </div>
                </div>
            `
            }
            return cardFooter;
        }


        let courseContainer = document.querySelector('#courseContainer');
        let courseData = data.map(elem => {
            return `
                <div class="col-md-6 my-3">
                    <div class="card">
                       <div class="card-body">
                            <h5 class="card-title">${elem.name}</h5>
                            <p class="card-text text-right">&#8369; ${elem.price}</p>
                             <p class="card-text">${elem.description}</p>
                       </div>
                       <div class="card-footer">
                            ${displayCardFooter(elem._id)}
                       </div>
                    </div>
                </div>
            `
        })


        // let userProfile = document.querySelector('#userProfile');
        // let userName = data.map(elem => {
        //     return `
        //         <li class="nav-item">
        //             <a href="./profile.html" class="nav-link" id="userProfile">${data.firstName.lastName}</a>
        //         </li>
        //     `
        // })
        courseContainer.innerHTML = courseData.join("");
    })