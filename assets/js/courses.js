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
        // <li>name</li>
        let courseContainer = document.querySelector('#courseContainer');
        let courseData = data.map(elem => {
            return `
	            <div class="col-md-6 my-3">
		            <div class="card">
	    		        <div class="card-body">
	            			<h5 class="card-title">${elem.name}</h5>
	            			<p class="card-text text-right">&#8369; ${elem.price}</p>
	            			<p class="card-text">${elem.description}</p>
	           			</div>
	            	</div>
	            </div>
	        `
        })

        console.log(courseData.join(""))

        courseContainer.innerHTML = courseData.join("");
    })