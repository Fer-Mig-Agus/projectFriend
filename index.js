

const URL_BASE = "http://localhost:5000";

//Primera Actividad
const bottonVerAmigos = document.querySelector("#boton")
const listaAmigos = document.querySelector('#lista');
const spinnerOne = document.querySelector('#spinner-one');


//Segunda Actividad
const inputAmigo = document.querySelector("#input");
const searchButton = document.querySelector("#search");
const searchAmigo = document.querySelector("#amigo");

//Tercera Actividad
const inputDelete = document.querySelector("#inputDelete");
const deleteFriendButton = document.querySelector("#delete");
const successInfo = document.querySelector("#success");
const spinnerTwo = document.querySelector("#spinner-two");


//Variables Generales

const imagenWelcome = document.querySelector("#image-welcome");
const sectionVerAmigos = document.querySelector("#ver-amigos");
const sectionBuscarAmigos = document.querySelector("#buscar-amigos");
const sectionBorrarAmigos = document.querySelector("#borrar-amigos");

const sectionBuscarAmigosButton = document.querySelector("#search-main");
const sectionBorrarAmigosButton = document.querySelector("#delete-main");


//important: Resolucion de la primera actividad
const ConsultaVerAmigos = (event) => {
    imagenWelcome.style.display = "none";
    sectionVerAmigos.style.display = "flex";
    sectionBorrarAmigos.style.display = "none";
    sectionBuscarAmigos.style.display = "none";
    
    const element = event.target;
    if (element.classList.contains("activa")) {

        verAmigosOption(element, "desactiva", "Ocultar Amigos", "block");
        spinnerOne.style.display = "block";
        //De esta manera reseteo la lista, sin gastar recursos
        listaAmigos.innerHTML = "";
        //De esta manera reseteo la lista, pero gasta recursos
        //limpiarLista();
        
        setTimeout(() => {
            
            spinnerOne.style.display = "none";
            $.get(`${URL_BASE}/amigos`, serverVerAmigos);
        }, 2000);

    } else {
        imagenWelcome.style.display = "block";
        sectionVerAmigos.style.display = "none";
        verAmigosOption(element, "activa", "Ver Amigos", "none");
    }

}

function verAmigosOption(element, clase, texto, display) {
    element.className = clase;
    element.innerHTML = texto;
    listaAmigos.style.display = display;
}

const serverVerAmigos = (amigos) => {
    amigos.forEach((amigo) => {
        const li = document.createElement("li");
        li.innerHTML = amigo.name;
        listaAmigos.appendChild(li);
    });
}


// function limpiarLista() {
//     while (listaAmigos.firstChild) {
//         listaAmigos.removeChild(listaAmigos.firstChild);
//     }
// }

//document: Aqui ejecuto el addEvent para la primera actividad

bottonVerAmigos.addEventListener('click', ConsultaVerAmigos);


//important: Resolucion de la segunda actividad


//document: Aqui ejecuto el addEvent para la segunda actividad
searchButton.addEventListener('click', (event) => {

    if (inputAmigo.value !== "" && inputAmigo.value <= 6) {
        $.get(`${URL_BASE}/amigos/${inputAmigo.value}`, (amigo) => {
            searchAmigo.innerHTML = amigo.name;
        });
        event.target.style.cursor = "not-allowed";
        setTimeout(() => {
            searchAmigo.innerHTML = "";
            event.target.style.cursor = "pointer";
            inputAmigo.value = "";
        }, 2000);

    } else {
        changeSearch(event, "red", "ERROR!", "not-allowed");
        setTimeout(() => {
            inputAmigo.value = "";
            changeSearch(event, "black", "Buscar", "pointer");
        }, 2000);
    }
});

function changeSearch(event, color, texto, cursor) {
    event.target.style.color = color;
    event.target.innerHTML = texto;
    event.target.style.cursor = cursor;
}





//important: Resolucion de la tercer actividad


// const inputDelete=document.querySelector("#inputDelete");
// const deleteFriendButton=document.querySelector("#delete");
// const successInfo=document.querySelector("#success");

deleteFriendButton.addEventListener('click', (event) => {

    if (inputDelete.value !== "" && inputDelete.value <= 6) {
        $.ajax({
            url: `${URL_BASE}/amigos/${inputDelete.value}`,
            type: "DELETE", // DELETE
            success: $.get(`${URL_BASE}/amigos`, deleteServer)
        });
    } else {
        changeSearch(event, "red", "ERROR!", "not-allowed");
        successInfo.innerHTML = "Fallo al eliminar"
        setTimeout(() => {
            successInfo.innerHTML = ""
            inputDelete.value = "";
            changeSearch(event, "black", "Delete", "pointer");
        }, 2000);
    }
});

const deleteServer = (() => {
    spinnerTwo.style.display = "block";
    deleteFriendButton.style.cursor = "not-allowed";
    setTimeout(() => {
        spinnerTwo.style.display = "none";
        deleteExitoso();
        deleteFriendButton.style.cursor = "pointer";
        inputDelete.value = "";
    }, 3000);

}); // esta es la callback de que hacemos cuando termina

function deleteExitoso() {
    successInfo.innerHTML = "Eliminado con Exito";
    setTimeout(() => {
        successInfo.innerHTML = ""
    }, 2000);
}


//important: Funciones agregadas

sectionBuscarAmigosButton.addEventListener('click', () => {
    imagenWelcome.style.display = "none";
    sectionBorrarAmigos.style.display = "none";
    sectionBuscarAmigos.style.display = "flex";
    sectionVerAmigos.style.display = "none";
});

sectionBorrarAmigosButton.addEventListener('click',()=>{
    imagenWelcome.style.display = "none";
    sectionBorrarAmigos.style.display = "flex";
    sectionBuscarAmigos.style.display = "none";
    sectionVerAmigos.style.display = "none";
});








