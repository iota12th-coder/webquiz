// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Get references to the forms and the links that toggle them
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const showLoginLink = document.getElementById('show-login');
    const showSignupLink = document.getElementById('show-signup');

    // Event listener for the "Login here" link
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent the link from navigating
        signupForm.style.display = 'none'; // Hide the signup form
        loginForm.style.display = 'block'; // Show the login form
    });

    // Event listener for the "Sign up here" link
    showSignupLink.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent the link from navigating
        loginForm.style.display = 'none'; // Hide the login form
        signupForm.style.display = 'block'; // Show the signup form
    });

    // --- Placeholder for form submission logic ---
    // In a real application, you would add event listeners to the forms
    // to handle submission, send data to your backend API, and handle the response.

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Example: Get form data
        const mobile = document.getElementById('login-mobile').value;
        console.log(`Attempting to log in with mobile: ${mobile}`);
        // Here you would call fetch() to your backend login endpoint
        alert('Login functionality is not connected to the backend yet.');
        // On successful login, you would redirect the user
        // window.location.href = 'profile.html';
    });
    
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Example: Get form data
        const name = document.getElementById('signup-name').value;
        console.log(`Attempting to sign up user: ${name}`);
        // Here you would call fetch() to your backend signup endpoint
        alert('Signup functionality is not connected to the backend yet.');
    });
});

