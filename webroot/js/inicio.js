import {crearCronometro, sumarSegundos, segundosJuego} from "./cronometro.js";
import {crearTabla, comprobarPuntuacion, ordenarPuntuaciones, 
    mostrarPuntuaciones, exportarPuntuaciones, importarPuntuaciones} from "./puntuaciones.js";
import {pulsarCelda, entrarRatonEnCelda, salirRatonDeCelda,
    soltarCelda, validarDireccion, pintarCeldas, comprobarPalabra,
    tacharPalabra, finDejuego, palabra, palabras
} from "./controlJuego.js";
import {recorrerPalabras, posicionarPalabra, dibujarTablero,
    posicionAleatoria, rellenarTablero, caja, tablero
} from "./prepararTablero.js";

// Comprueba si las cookies están habilitadas o no
if(navigator.cookieEnabled==false){
    alert("Las cookies estan desactivadas, no se puede guardar las puntuaciones");
}

var tiempo;
var nombre = "";

exportarPuntuaciones();

mostrarPuntuaciones();

// ***********************************************
// *************** FUNCIONES *********************
// ***********************************************

export function inicio(contenedorTablero) {

    const botonInicio = document.createElement("input");
    botonInicio.type = 'submit';
    botonInicio.name = 'botonInicio';
    botonInicio.id = 'botonInicio';
    botonInicio.value = 'Iniciar Juego';
    botonInicio.addEventListener("click",()=>{

        empezarPartida(contenedorTablero, botonInicio);
    })

    contenedorTablero.append(botonInicio);
}

function empezarPartida(contenedorTablero, botonInicio) {
    contenedorTablero.removeChild(botonInicio);
    crearCronometro(contenedorTablero)
    dibujarTablero(tablero);
    mostrarPalabras(caja, palabras);

    tiempo = setInterval(sumarSegundos,1000);
}

/**
 * Crea un parrafo por cada palabra y lo añade al contenedor dado.
 * @param {*} contenedor contendor html donde añadir las palabras
 * @param {*} palabras array con las palabras a mostrar
 */
function mostrarPalabras(contenedor, palabras) {

    for (const p of palabras) {
        const parrafo = document.createElement("p");
        parrafo.innerHTML = p;

        contenedor.appendChild(parrafo);
    }

}