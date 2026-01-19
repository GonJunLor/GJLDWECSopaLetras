import {segundosJuego} from "./cronometro.js";
import {comprobarPuntuacion, ordenarPuntuaciones, mostrarPuntuaciones} from "./puntuaciones.js";

var origenX;
var origenY;
export var palabra;
export var palabras = ["perro"];
var tableroBloqueado = false;
var ratonPulsado = false;
var anteriorX = 0; 
var anteriorY = 0;
var palabrasTachadas = 0;

export function pulsarCelda(ev) {
    // Comprobación de bloqueo
    if (tableroBloqueado) {
        return; // Salir inmediatamente si el tablero está bloqueado
    }

    let coordenadas = ev.target.id
    
    let letras = coordenadas.split(",");
    
    origenX = parseInt(letras[0],10);
    origenY = parseInt(letras[1],10);

    ratonPulsado = true;

    // en algun momento devolver un array con las posiciones iniciales
}
export function entrarRatonEnCelda(ev){
    // Comprobación de bloqueo
    if (tableroBloqueado) {
        return; // Salir inmediatamente si el tablero está bloqueado
    }

    if (ratonPulsado) {
        let coordenadas = ev.target.id
    
        let letras = coordenadas.split(",");
        
        let moverX = parseInt(letras[0],10);
        let moverY = parseInt(letras[1],10);

        //console.log(moverX + "-" + moverY);

        if(validarDireccion(origenX, origenY, moverX, moverY)){
            anteriorX = moverX;
            anteriorY = moverY;
            pintarCeldas(origenX, origenY, moverX, moverY)
        }
    }

}
export function salirRatonDeCelda(ev) {
    // Comprobación de bloqueo
    if (tableroBloqueado) {
        return; // Salir inmediatamente si el tablero está bloqueado
    }
    if (ratonPulsado) {
        pintarCeldas(origenX, origenY, anteriorX, anteriorY, "blanco");
    }
}
export function soltarCelda(ev){
    ratonPulsado = false;

    // Comprobación de bloqueo
    if (tableroBloqueado) {
        return; // Salir inmediatamente si el tablero está bloqueado
    }

    let coordenadas = ev.target.id
    
    let letras = coordenadas.split(",");
    
    let destinoX =parseInt(letras[0],10);
    let destinoY = parseInt(letras[1],10);

    // en algun momento devolver un array con las posiciones destino en esta funcion y hacer esto fuera
    if(validarDireccion(origenX, origenY, destinoX, destinoY)){
        // dirección válida
        //console.log("direccion válida");
        let palabra = pintarCeldas(origenX, origenY, destinoX, destinoY);
        if(comprobarPalabra(palabra, palabras)){
            // la palabra esta en la sopa de letras
            //console.log("encontrado")
            pintarCeldas(origenX, origenY, destinoX, destinoY, "encontrado")
            tacharPalabra(palabra);
        } else {
            // la palabra no esta en la sopa de letras
            //console.log("NO encontrado")
            pintarCeldas(origenX, origenY, destinoX, destinoY, "erroneo")

            // Bloquear el tablero antes del setTimeout
            tableroBloqueado = true;
            setTimeout(() => {
                // La función se ejecuta SÓLO después de 1000 ms
                pintarCeldas(origenX, origenY, destinoX, destinoY, "blanco")

                // Desbloquear el tablero cuando el setTimeout termina
                tableroBloqueado = false;
            }, 1000);
            
        }

    } else {
        // dirección inválida
        //console.log("direccion NO válida");
    }

    
}
export function validarDireccion(x1, y1, x2, y2){
    let ok = false;

    if (x1==x2 || y1==y2 || Math.abs(x1-x2)==Math.abs(y1-y2)) {
        ok=true;
    }

    return ok;
}
export function pintarCeldas(x1, y1, x2, y2, color="seleccionado"){
    
    let palabra = "";
    
    // control del incremento de x e y según la dirección
    let incrementoX = 0;
    let incrementoY = 0;
    if (x2>x1) {
        incrementoX = 1;
    } else if (x2<x1) {
        incrementoX = -1;
    }
    if (y2>y1) {
        incrementoY = 1;
    } else if (y2<y1) {
        incrementoY = -1;
    }

    let controlX = x1;
    let controlY = y1;
    while (controlX!=x2 || controlY!=y2){
        // //console.log("x1="+x1+", y1="+y1+", x2="+x2+", y2="+y2)
        // //console.log("controlX="+controlX+" ,controlY="+controlY);

        // //console.log(controlX+","+controlY);
        // //console.log("Incrementos: "+incrementoX+","+incrementoY);

        let celda = document.getElementById(controlX+","+controlY);
        celda.classList.remove("seleccionado");
        celda.classList.remove("erroneo");
        celda.classList.remove("blanco");
        celda.classList.add(color);
        palabra += celda.textContent;
        // //console.log(celda);

        controlX += incrementoX;
        controlY += incrementoY;
    }
    let celda = document.getElementById(x2+","+y2);
    palabra += celda.textContent;
    celda.classList.remove("seleccionado");
    celda.classList.remove("erroneo");
    celda.classList.remove("blanco");
    celda.classList.add(color);

    //console.log(palabra);
    return palabra;
}
export function comprobarPalabra(pal, pals) {
    let salida = false;
    for (const p of pals) {
        if (p==pal) {
            salida = true;
        }
        
        //console.log(p + " == " + pal + " = " + salida)
    }
    return salida;
}
export function tacharPalabra(pal){
    //console.log("entrando a tachar " + pal);
    
    const parrafos = document.getElementById("palabrasBuscar").getElementsByTagName("p");

    for (const p of parrafos) {
        if (p.textContent === pal) {
            //console.log("tachando" + p);
            p.classList.add("tachar")
            break;
        } 
    }

    palabrasTachadas++;
    //console.log(palabrasTachadas + " == " + palabras.length)
    if (palabrasTachadas==palabras.length) { 
        finDejuego();
    }
}
export function finDejuego() {
    tableroBloqueado = true;
    clearTimeout(tiempo);
    let puntos = parseInt((1/segundosJuego)*1000);
    if(comprobarPuntuacion(puntos)){
        console.log("puntuacion menor");
        ordenarPuntuaciones(puntos);
        mostrarPuntuaciones();
    } 
    let caja = document.querySelector("main h2");
    caja.innerHTML = "Tus puntos: " + puntos + ", Reiniciando juego...";
    setTimeout(()=>{location.reload();},3000);
}