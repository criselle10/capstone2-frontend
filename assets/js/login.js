// if login is successful
// log the token
// if not log alert("Something went wrong")


// let logInUser = document.querySelector('#logInUser');
// console.log(logInUser)
// logInUser.addEventListener('submit', (e) => {
//     e.preventDefault()

//     let email = document.querySelector('#email').value;
//     let password = document.querySelector('#password').value;

//     let body = {
//         email: email,
//         password: password
//     }

//     fetch('http://localhost:4000/api/users/login', {
//             method: "POST",
//             body: JSON.stringify(body),
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         })
//         .then(res => res.json())
//         .then(accessToken => {
//             console.log(accessToken)
//             if (accessToken) {
//                 // alert("Login successful");
//                 localStorage.setItem("token", accessToken.accessToken)
//             } else {
//                 alert("Something went wrong");
//             }
//         })
// })

// SIR ALEX SOLUTION

let logInUser = document.querySelector('#logInUser')
logInUser.addEventListener('submit', (e) => {
    e.preventDefault();
    let email = document.querySelector('#email').value
    let password = document.querySelector('#password').value

    let body = {
        email: email,
        password: password
    }

    fetch('https://ca-coursebooking.herokuapp.com/api/users/login', {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .then(data => {
            if (!data) return alert("Something went wrong");

            localStorage.setItem("token", data.accessToken)

            fetch('https://ca-coursebooking.herokuapp.com/api/users/details', {
                    headers: {
                        "Authorization": `Bearer ${localStorage["token"]}`
                    }
                })
                .then(res => res.json())
                .then(user => {
                    console.log(user)

                    localStorage["id"] = user._id
                    localStorage["isAdmin"] = user.isAdmin

                    window.location.replace('./courses.html')
                })
        })
})