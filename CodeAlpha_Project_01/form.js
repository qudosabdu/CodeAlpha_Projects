document.addEventListener('DOMContentLoaded', function () {
    var users = JSON.parse(localStorage.getItem('users')) || [];

    var contentDiv = document.getElementById('content');
    var formContainerDiv = document.getElementById('form-container');
    var navUsername = document.getElementById('nav-username');

    var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        contentDiv.style.display = 'block';
        formContainerDiv.style.display = 'none';
        navUsername.textContent = loggedInUser.firstname; 
        document.getElementById('logout').addEventListener('click', function() {
            localStorage.removeItem('loggedInUser');
            location.reload();
            Swal.fire({
                icon: 'success',
                title: 'Logged Out',
                text: 'You have been successfully logged out.',
                showConfirmButton: false,
                timer: 3000
            });
        });
    } else {
        contentDiv.style.display = 'none';
        formContainerDiv.style.display = 'block';
    }

    document.getElementById('login-form').addEventListener('submit', function (e) {
        e.preventDefault();

        var username = document.getElementById('login-username').value;
        var password = document.getElementById('login-password').value;

        var user = users.find(function(user) {
            return user.username === username && user.password === password;
        });

        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            location.reload();
            Swal.fire({
                icon: 'success',
                title: 'Logged In',
                text: 'You have been successfully logged in.',
                showConfirmButton: false,
                timer: 3000
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Credentials',
                text: 'Invalid username or password. Please try again.'
            });
        }
    });

    document.getElementById('registration-form').addEventListener('submit', function (e) {
        e.preventDefault();

        var firstname = document.getElementById('reg-firstname').value;
        var lastname = document.getElementById('reg-lastname').value;
        var username = document.getElementById('reg-username').value;
        var password = document.getElementById('reg-password').value;

        var userExists = users.some(function(user) {
            return user.username === username;
        });

        if (userExists) {
            Swal.fire({
                icon: 'error',
                title: 'User Exists',
                text: 'User already exists. Please choose a different username.'
            });
            return;
        }

        users.push({ firstname: firstname, lastname: lastname, username: username, password: password });
        localStorage.setItem('users', JSON.stringify(users));

        Swal.fire({
            icon: 'success',
            title: 'Registered',
            text: 'You have been successfully registered.',
            showConfirmButton: false,
            timer: 3000
        });

        document.getElementById('registration-form').reset();
    });
});
