
let form = document.querySelector('form');
let btnregistro = document.querySelector('.btn-user');

btnregistro.addEventListener("click", function(){

    registrarUsuario();
    form.reset();
});

async function registrarUsuario(){

    let datos = {
        nombre: document.querySelector('#txtNombre').value,
        apellido: document.querySelector('#txtApellido').value,
        email: document.querySelector('#txtEmail').value,
        telefono: document.querySelector('#txtTelefono').value,
        password: document.querySelector('#txtPassword').value
    }

    let pw2 = document.querySelector('#txtPassword2').value;
    if (datos.password !== pw2){
        alert ('Las contraseñas no coinciden');
        document.querySelector('#txtPassword').value = '';
        return;
    }

const req = await fetch('api/usuarios', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
});

console.log(datos);

}