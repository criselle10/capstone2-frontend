const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get('courseId');

console.log(courseId)
let url = `http://localhost:4000/api/courses/${courseId}`;

fetch(url)
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        // display data in html
        let courseName = document.querySelector('#courseName')
        let courseDesc = document.querySelector('#courseDescription')
        let coursePrice = document.querySelector('#coursePrice')
        courseName.value = data.name
        courseDesc.value = data.description
        coursePrice.value = data.price
    })



let editCourse = document.querySelector('#editCourse')
editCourse.addEventListener('submit', (e) => {
    e.preventDefault();

    let courseName = document.querySelector('#courseName').value;
    let coursePrice = document.querySelector('#coursePrice').value;
    let courseDescription = document.querySelector('#courseDescription').value;

    let body = {
        _id: courseId,
        name: courseName,
        price: coursePrice,
        description: courseDescription
    }

    fetch('http://localhost:4000/api/courses', {
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