var urlApi = "https://jsonplaceholder.typicode.com";
var urlApiRickMorty = "https://rickandmortyapi.com/api/character";
var campoEmail = document.getElementById("emailInput");
var campoPass = document.getElementById("passInput");
var campoID = document.getElementById("buscarPersonaje");
const fecha = new Date();
var dia = fecha.getDate();
var mes = fecha.getMonth();
var año = fecha.getFullYear();

//Metodo para validar usuarios
function APIinit() {

    AJAXReq({

        metodo: "GET",
        // Peticion A JsonPlaceHolder para obtencion de usuarios
        url: `${urlApi}/users`,
        load: rps => {            
            rps.forEach(item => {
                //Evaluacion de Usuario y Contraseña
                if (item.email == campoEmail.value && item.id == campoPass.value) {                                        

                    let ocultarLogin = document.getElementById('logForm');
                    ocultarLogin.style.display = "none";

                    let mostrarNombre = document.getElementById("nombreUser");
                    mostrarNombre.innerHTML = item.name;

                    let mostrarFecha = document.getElementById("fechaActual");
                    mostrarFecha.innerHTML = año + "/" + (mes + 1) + "/" + dia;                                        

                    let desplegarBuscar = document.getElementById("busquedaPersonajes");
                    desplegarBuscar.style.display = "flex";
                }               
            });
        }
    });
}

//Metodo para obtener los personajes
function obtenerPersonajes() {

    AJAXReq({
        metodo: "GET",
        url: `${urlApiRickMorty}/${campoID.value}`,
        load: rps => {
            llenarTabla(rps);
        }
    });
}

//Metodo para crear y llenar la tabla
function llenarTabla(rps) {

    let tbody = document.getElementById('tbod');
    let table = document.getElementById("personajes");

    let newRow = '<tr>' +
        '<td>' + rps.id + '</td>' +
        '<td>' + '<a href=' + `${rps.image}>` + rps.name + '</a>' + '</td>' +
        '<td>' + rps.status + '</td>' +
        '<td>' + rps.species + '</td>' +
        '<td>' + rps.type + '</td>' +
        '<td>' + rps.gender + '</td>' +
        '</tr>';

    tbody.innerHTML = newRow;
    table.style.display = "flex";
}

//Metodo para hacer la peticion asincronica
function AJAXReq(set) {

    let xhr = new XMLHttpRequest;

    xhr.open(set.metodo, set.url);

    xhr.addEventListener("load", () => {

        if (xhr.readyState == 4 && xhr.status == 200) {

            let respuestaAPI = xhr.responseText;
            var r = JSON.parse(respuestaAPI);
            set.load(r);
        }
    })

    xhr.send(set.data);
}