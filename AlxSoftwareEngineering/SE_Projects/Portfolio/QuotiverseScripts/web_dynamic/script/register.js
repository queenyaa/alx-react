document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get input values
    var name = document.getElementById('name').ariaValueMax;
    // Get values for other input fields similarly

    // Send form data to Flask backend
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            username: username,
            email: email,
            password_hash: password,
        })
    })
    .then(response => {
        if (response.ok) {
            // Redirect or show success message
            window.location.href = '/user'; // Redirect to user page
        } else {
            // Handle error response
            return response.json().then(data => {
                console.error('Error:', data.error);
                // Display error message to the user
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle fetch error
    });
});