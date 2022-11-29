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


let inputs=document.getElementsByClassName('animated');
for (let i = 0; i < inputs.length; i++) {
    inputs[i].onkeyup=()=>{
        if (inputs[i].value!="") {
            document.getElementById(`_${inputs[i].id}`).className="filled"
        }else{
            document.getElementById(`_${inputs[i].id}`).className="";
        }
    }
}