const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get('courseId');
let token = localStorage.getItem("token");


let url = `https://ca-coursebooking.herokuapp.com/api/courses/${courseId}`;

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


        document.querySelector('#enrollButton').addEventListener('click', () => {
            if (!token || token === null) {
                alert('You must login first!')
                window.location.href = "./login.html"
            }else{
                fetch(`https://ca-coursebooking.herokuapp.com/api/users/enroll`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage['token']}`
                    },
                    body: JSON.stringify({
                        courseId: courseId
                    })
                })
                .then(res => res.json())
                .then(data => {
                    if (data === true) {
                        // notify the user that enrollment is successful
                        alert("thank you for enrolling! see you!");
                        // redirect user to courses page
                        window.location.replace('./courses.html');
                    } else {
                        //notify user that enrollment failed
                        alert("something went wrong");
                    }
                })            }
        })
    })