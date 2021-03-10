//make create course feature usable
//if successful in creating the course, redirect user in courses.html
// otherwise alert("Something went wrong");
//15 mins


let createCourse = document.querySelector('#createCourse');
createCourse.addEventListener('submit', (e) => {
    e.preventDefault();

    let name = document.querySelector('#name').value;
    let price = document.querySelector('#price').value;
    let description = document.querySelector('#description').value;

    let body = {
        name: name,
        price: price,
        description: description
    }

    fetch('http://localhost:4000/api/courses/', {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage["token"]}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data) {
                alert("Created course successfully");
                window.location.replace('./courses.html')
            } else {
                alert("Something went wrong");
            }

        })
})