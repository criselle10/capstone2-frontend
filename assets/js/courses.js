let adminUser = localStorage["isAdmin"];
let adminButton = document.querySelector('#adminButton');
let cardFooter;

if (adminUser == "false" || !adminUser) {
    adminButton.innerHTML = ""
} else {
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

fetch('http://localhost:4000/api/courses/')
    .then(res => {
        return res.json()
    })
    .then(data => {
        console.log(data)

        function displayCardFooter(courseId) {
            if (adminUser == "false" || !adminUser) {
                cardFooter = `<a href="./course.html?courseId=${courseId}" class="btn btn-primary">Select course</a>`
            } else {
                cardFooter = `
                <a 
                    href="./editCourse.html?courseId=_courseId_" class="btn btn-primary editButton">
                    Edit
                </a>
                <a 
                    href="./deleteCourse.html?courseId=_courseId_" class="btn btn-danger deleteButton">
                    Delete
                </a>
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

        courseContainer.innerHTML = courseData.join("");
    })