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
        let courseDesc = document.querySelector('#courseDesc')
        let coursePrice = document.querySelector('#coursePrice')
        courseName.innerHTML = data.name
        courseDesc.innerHTML = data.description
        coursePrice.innerHTML = data.price
    })