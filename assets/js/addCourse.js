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

    fetch('https://ca-coursebooking.herokuapp.com/api/courses/', {
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


// SIR ALEX SOLUTION

// let createCourse = document.querySelector('#createCourse')
// createCourse.addEventListener('submit' , e => {
// 	e.preventDefault()

// 	let name = document.querySelector('#name').value;
// 	let price = document.querySelector('#price').value;
// 	let description = document.querySelector('#description').value;

// 	let url = "http://localhost:4000/api/courses/";
// 	let options = {
// 		method : "POST",
// 		body: JSON.stringify({
// 			name,
// 			price,
// 			description
// 		}),
// 		headers: {
// 			"Content-Type" : "application/json",
// 			"Authorization" : `Bearer ${localStorage["token"]}`
// 		}
// 	}

// 	fetch(url, options)
// 	.then( res => {
// 		// console.log(res.json())
// 		return res.json()
// 	})
// 	.then( data => {
// 		if (!data) return alert("Something went wrong")

// 		window.location.replace('./courses.html');
// 	})
// })