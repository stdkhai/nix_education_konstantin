document.getElementById('reg').onclick = () => {
    userbase = {
        name: document.getElementById('first_name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    }
    fetch("/auth/registration", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userbase),
    }).then(res => res.json().
        then(data => {
            document.getElementById('msg').innerHTML = data.message;
        }));

}