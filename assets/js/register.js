// prevent form in submitting the form
// let fetch send the information to backend
// make sure to get the information from our from
// firstName
// lastName
// email
// mobileNo
// password
// confirmPassword

let registerForm = document.querySelector('#registerForm');
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log("eto yung gumagana")
    let firstName = document.querySelector('#firstName').value;
    let lastName = document.querySelector('#lastName').value;
    let email = document.querySelector('#email').value;
    let mobileNo = document.querySelector('#mobileNo').value;
    let password = document.querySelector('#password').value;
    let confirmPassword = document.querySelector('#confirmPassword').value;

    console.log(firstName,
        lastName,
        email,
        mobileNo,
        password,
        confirmPassword
    )
    let body = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNo: mobileNo,
        password: password,
        confirmPassword: confirmPassword
    }

    fetch('https://ca-coursebooking.herokuapp.com/api/users/', {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data) {
                alert("Registration successful");
                window.location.replace("./login.html")
            } else {
                alert("Something went wrong");
            }
        })
})