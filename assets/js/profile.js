let token = localStorage.getItem("token");
let profileContainer = document.querySelector('#profileContainer');

if (!token || token === null) {
    alert('You must login first!')
    window.location.href = "./login.html"
} else {
    fetch('http://localhost:4000/api/users/details', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            let enrolledCourses = data.enrollments
            // console.log(enrolledCourses.length === 0)
            let message = ""; //we will add message if the enrolles courses is empty, else it will stay empty

            if (enrolledCourses.length === 0) {
                message = "No enrolled courses yet."
            } else {
                message = "";
            }

            const profileDetails = `
	            <div class="col-12">
	                <section class="my-5">
	                    <div class="text-center">
	                        <h3>First Name: ${data.firstName}</h3>
	                        <h3>Last Name: ${data.lastName}</h3>
	                        <h3>Email: ${data.email}</h3>
	                        <h3 class="ct-3">Class History</h3>
	                    </div>
	                    <table class="table table-hover">
	                        <thead>
	                            <tr>
	                                <th> Course ID </th>
	                                <th> Enrolled On </th>
	                                <th> Status </th>
	                            </tr>
	                        </thead>
	                        <tbody>
	                            <!-- tr sample start -->
	                            <tr>
	                                <td>${message}</td>
	                            </tr>
	                            <!-- tr sample end -->
	                        </tbody>
	                    </table>
	                </section>
	            </div>
	            `
            // console.log(profileDetails)
            profileContainer.innerHTML = profileDetails;
        })
}