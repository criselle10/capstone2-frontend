let params = new URLSearchParams(window.location.search)
// console.log(params.get('courseId'));
let courseId = params.get('courseId');
let token = localStorage.getItem('token');

fetch(`https://ca-coursebooking.herokuapp.com/api/courses/${courseId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })