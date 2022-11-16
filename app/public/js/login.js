document.getElementById('log').onclick = () => {
    userbase = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    }
    fetch("/auth/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userbase),
    })
        .then(res => res.json()
            .then(data => {
                if (data.token) {
                    document.location.replace('/main');
                } else {
                    document.getElementById('msg').innerHTML = data;
                }
            }));
}