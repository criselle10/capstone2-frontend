let adminUser = localStorage["isAdmin"];
let adminButton = document.querySelector('#adminButton');
let token = localStorage.getItem('token');
let cardFooter;
let url = '';
let loggedInButton = '';
let forLoggedInUserAdmin = document.querySelector('#forLoggedInUserAdmin');

if (!token || token == null) {
    loggedInButton = `
        <li>
            <a href="./login.html" class="nav-link">Log In</a> 
        </li>
        <li class="nav-item">
            <a href="./register.html" class="nav-link">Register</a>
        </li>
    `
    forLoggedInUserAdmin.innerHTML = loggedInButton
} else {
    loggedInButton = `
        <li class="nav-item">
            <a href="./profile.html" class="nav-link" id="userProfile">Profile</a>
        </li>
        <li class="nav-item">
            <a href="./logout.html" class="nav-link">Log out</a>
        </li>
    `
    forLoggedInUserAdmin.innerHTML = loggedInButton
}

if (adminUser == "false" || !adminUser) {
    adminButton.innerHTML = ""
    url = 'https://ca-coursebooking.herokuapp.com/api/courses/'
} else {
    url = 'https://ca-coursebooking.herokuapp.com/api/courses/view'
    adminButton.innerHTML = `
    <div id="addCourse" class="col-md-2">
        <a href="./addCourse.html" class="btn">
            <i class="fa fa-plus-square"></i> Add Course
        </a>
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
        function displayCardFooter(courseId, status) {
            if (adminUser == "false" || !adminUser) {

                cardFooter = `<a href="./course.html?courseId=${courseId}" class="btn">Select course</a>`
            } else {
                let courseStatus = '';
                let courseMessage = '';
                if (status == true) {
                    courseStatus = 'checked'
                    courseMessage = 'Active'
                } else {
                    courseStatus = 'unchecked'
                    courseMessage = 'Inactive'
                }
                cardFooter = `
                <div id="adminBtn" class="d-flex justify-content-between align-items-center">
                    <div>
                        <a 
                            href="./viewEnrolledUser.html?courseId=${courseId}" class="btn">
                            <i class="fa fa-eye"></i> View
                        </a>
                        <a 
                            href="./editCourse.html?courseId=${courseId}" class="btn">
                            <i class="fa fa-edit"></i> Edit
                        </a>
                    </div>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="${courseId}" ${courseStatus} value = "${status}">
                        <label class="form-check-label" id="label${courseId}" for="${courseId}">${courseMessage}</label>  

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
                            <h4 class="card-title">${elem.name}</h4>
                            <p id="overview"> <strong>Overview:</strong> </p>
                            <p class="card-text">${elem.description}</p>
                            <p class="card-text text-right"><strong>Price: &#8369;${elem.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong></p>
                       </div>
                       <div class="card-footer">
                            ${displayCardFooter(elem._id, elem.isActive)}
                       </div>
                    </div>
                </div>
            `
        })
        courseContainer.innerHTML = courseData.join("");

        document.addEventListener('change', (event) => {
            statusFn(event.target.id, event.target.value)
            if (event.target.value == 'true') {
                event.target.value = 'false'
            } else
                event.target.value = 'true'
        })

        statusFn = (courseId, status) => {
            if (status == 'false') {
                fetch(`https://ca-coursebooking.herokuapp.com/api/courses/${courseId}`, {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        return document.querySelector(`#label${courseId}`).innerText = "Active"
                    })
            } else {

                fetch(`https://ca-coursebooking.herokuapp.com/api/courses/${courseId}`, {
                        method: "DELETE",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        return document.querySelector(`#label${courseId}`).innerText = "Inactive"
                    })
            }
        }
    })