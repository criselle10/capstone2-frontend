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
    })