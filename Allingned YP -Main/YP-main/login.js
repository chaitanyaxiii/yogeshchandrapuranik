function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("message");

    // Prevent empty login attempt
    if (!username || !password) {
        message.style.color = "red";
        message.textContent = "Username and Password are required!";
        return;
    }

    // Updated credentials
    if (username === "Admin" && password === "Admin@2002") {
        // Store login state
        localStorage.setItem('isAdminLoggedIn', 'true');

        // Success message
        message.style.color = "green";
        message.textContent = "Login Successful! Redirecting...";

        setTimeout(() => {
            // Redirect user based on stored page
            const redirectPage = sessionStorage.getItem('redirectPage');
            sessionStorage.removeItem('redirectPage'); // Clear redirect storage
            window.location.href = redirectPage ? redirectPage : "upload_notes.html";
        }, 1000);
    } else {
        message.style.color = "red";
        message.textContent = "Invalid Username or Password!";
    }
}

// Protect admin pages
document.addEventListener('DOMContentLoaded', () => {
    function protectAdminPage() {
        const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
        if (!isLoggedIn) {
            sessionStorage.setItem('redirectPage', window.location.pathname);
            window.location.href = '/login.html'; // Redirect to login page
        }
    }

    // Logout functionality
    function setupLogout() {
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('isAdminLoggedIn');
                window.location.href = '/login.html';
            });
        }
    }

    // Define protected pages
    const protectedPages = ['/upload_notes.html', '/research-admin.html'];
    if (protectedPages.includes(window.location.pathname)) {
        protectAdminPage();
    }

    setupLogout(); // Attach logout listener if button exists
});
