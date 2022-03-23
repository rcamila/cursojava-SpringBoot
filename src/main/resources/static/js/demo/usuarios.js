// Call the dataTables jQuery plugin
$(document).ready(function() {
    cargarUsuarios();
    $('#usuarios').DataTable();

    actualizarUsuario();
});

    const btnCerrarSesion = document.querySelector('#cerrar-sesion');

btnCerrarSesion.addEventListener("click", function(){

    localStorage.clear();
    location.href = 'login.html';

});

function actualizarUsuario(){
    document.getElementById('txt-email-usuario').outerHTML = localStorage.getItem('email');
}

async function cargarUsuarios(){

const req = await fetch('api/usuarios', {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.token
    }
});

const usuarios = await req.json();

console.log(usuarios);

let lista = '';
    for (let element of usuarios) {

        let btnEliminar = '<a href="#" onclick="eliminarUsuario(' + element.id + ')" class="btn btn-danger btn-circle btn-sm">' +
                          '<i class="fas fa-trash"></i>' +
                          '</a>';

        let row =  '<tr> <td>' + element.id + '</td>' +
                   '<td>' + element.nombre + ' ' + element.apellido + '</td>' +
                   '<td>' + element.email + '</td>' +
                   '<td>' + element.telefono + '</td>' +
                   '<td>' + btnEliminar + '</td> </tr>';

        lista += row
    }

    document.querySelector('#usuarios tbody').outerHTML = lista;

}

async function eliminarUsuario(id){

    if (!confirm('¿Desea eliminar el usuario?')){
        return;
    }

    const req = await fetch('api/usuario/' + id , {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        }
    });

    location.reload();

}

