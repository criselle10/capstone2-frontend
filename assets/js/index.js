const token = localStorage.getItem('token');
let buttonsQuery = "";
let authorizedButton = document.querySelector('#authorizedButton');

if (!token || token === null) {
    buttonsQuery = `
		<li class="nav -item">
	        <a href="./pages/login.html" class="nav-link">Sign In</a>
	    </li>
	    <li class="nav-item">
	        <a href="./pages/register.html" class="nav-link">Register</a>
	    </li>
	`
} else {
    buttonsQuery = `
		<li class="nav-item">
			<a href="./pages/profile.html" class="nav-link">Profile</a>
		</li>
    	<li class="nav-item">
	        <a href="./pages/logout.html" class="nav-link">Log Out</a>
	    </li>
	`
}
authorizedButton.innerHTML = buttonsQuery