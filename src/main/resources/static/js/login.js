
let btnLogin = document.querySelector('.btn-user');

btnLogin.addEventListener("click", function(){

    login();
});

async function login(){

    let datos = {
        email: document.querySelector('#txtEmail').value,
        password: document.querySelector('#txtPassword').value
    }

    const req = await fetch('api/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });

    const res = await req.text();

    console.log(res);

    if (res != 'fail'){
        localStorage.token = res;
        localStorage.setItem('email', datos.email);
        location.href = "/usuarios.html";
    }else{
        alert('Credenciales incorrectas');
    }
}