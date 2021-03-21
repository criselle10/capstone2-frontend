const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get('courseId');

console.log(courseId)
let url = `https://ca-coursebooking.herokuapp.com/api/courses/${courseId}`;

fetch(url)
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        // display data in html
        let courseName = document.querySelector('#editCourseName')
        let courseDesc = document.querySelector('#editCourseDescription')
        let coursePrice = document.querySelector('#editCoursePrice')
        courseName.value = data.name
        courseDesc.value = data.description
        coursePrice.value = data.price
    })



let editCourse = document.querySelector('#editCourse')
editCourse.addEventListener('submit', (e) => {
    e.preventDefault();

    let name = document.querySelector('#editCourseName').value;
    let price = document.querySelector('#editCoursePrice').value;
    let description = document.querySelector('#editCourseDescription').value;

    let body = {
        _id: courseId,
        name: name,
        price: price,
        description: description
    }

    fetch('https://ca-coursebooking.herokuapp.com/api/courses', {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage['token']}`
            }
        }).then(res => res.json())
        .then(data => {
            if (!data) return alert("Something went wrong");

            window.location.replace('./courses.html')

        })

})