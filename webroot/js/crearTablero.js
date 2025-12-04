var palabras = ["perro", "gato", "loro", "guacamayo", "col", "sal", "agua", "lapicero","balon","pizarra"];
const TAM_PALABRA_MAYOR = palabramasLarga(palabras);
const TOTAL_LETRAS_PALABARAS = cantidadLetras(palabras);

var tamTab = calcTamTablero(TAM_PALABRA_MAYOR,TOTAL_LETRAS_PALABARAS);

// Obtener el elemento <main>
var main = document.getElementsByTagName("main")[0];

// Crear el elemento <h2> para la información
const infoElement = document.createElement("h2");
main.appendChild(infoElement);

// Crear el <div> contenedor del tablero
const tableroContainer = document.createElement("div");
tableroContainer.id = "tablero"; // Opcional: darle un ID
main.appendChild(tableroContainer);


// Crear elemento para palabras a buscar
const caja = document.createElement("div");
caja.id = "palabrasBuscar";
main.appendChild(caja);

// Creamos y añadimos tabla de puntuación al main
var tablaPuntos = crearTabla();
main.append(tablaPuntos);

// variables para control de selección
var origenX;
var origenY;
var palabra;
var tableroBloqueado = false;
var ratonPulsado = false;
var anteriorX = 0; 
var anteriorY = 0;
var segundosJuego = 0;

infoElement.innerHTML = "Tamaño de tablero: " + tamTab + "*" + tamTab;

var tablero = crearTablero(tamTab);

var aDirecciones = [
    [1,1,0,-1,-1,-1,0,1],
    [0,1,1,1,0,-1,-1,-1]
];

recorrerPalabras();
rellenarTablero();
inicio(tableroContainer);


// addPuntuacion(tablaPuntos, "gonzalo", 50000);
// addPuntuacion(tablaPuntos, "gonzalo", 50000);
// addPuntuacion(tablaPuntos, "gonzalo", 50000);

exportarPuntuaciones(tablaPuntos);
importarPuntuaciones(tablaPuntos);


// ***********************************************
// *************** FUNCIONES *********************
// ***********************************************

function inicio(contenedorTablero) {

    const cuadroNombre = document.createElement("input");
    cuadroNombre.type = 'text';
    cuadroNombre.name = 'cuadroNombre';
    cuadroNombre.id = 'cuadroNombre';
    cuadroNombre.placeholder = 'Introduce nombre';

    const botonInicio = document.createElement("input");
    botonInicio.type = 'submit';
    botonInicio.name = 'botonInicio';
    botonInicio.id = 'botonInicio';
    botonInicio.value = 'Iniciar Juego';
    botonInicio.addEventListener("click",()=>{
        nombre = cuadroNombre.value;
        empezarPartida(nombre, contenedorTablero, cuadroNombre, botonInicio);
    })

    contenedorTablero.append(cuadroNombre);
    contenedorTablero.append(botonInicio);
}

function empezarPartida(nombreJugador, contenedorTablero, cuadroNombre, botonInicio) {
    if (nombreJugador != "") {
        contenedorTablero.removeChild(cuadroNombre);
        contenedorTablero.removeChild(botonInicio);
        crearCronometro(nombre, contenedorTablero)
        dibujarTablero(tablero);
        mostrarPalabras(caja, palabras);

        tiempo = setInterval(sumarSegundos,1000);
    }
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

// ***********************************************
// ******** Comprobaciones inciales **************
// ***********************************************

function palabramasLarga(array) {
    let palabraLarga = 0;
    for (const e of array) {
        if (e.length>palabraLarga) {
            palabraLarga = e.length;
        }
    }
    return palabraLarga;
}
function cantidadLetras(array) {
    let contarLetras = 0;
    for (const e of array) {
        contarLetras += e.length;
    }
    return contarLetras;
}
function calcTamTablero(palabraLarga,totalLetras) {
    totalLetras*=2;
    anchoTablero = parseInt(Math.sqrt(totalLetras))+1;
    if (palabraLarga>=anchoTablero) {
        anchoTablero=palabraLarga;
    }

    // console.log(anchoTablero);
    // console.log(palabraLarga);
    // console.log(totalLetras);
    return anchoTablero;
}
/**
 * Crea un array del tamaño del tablero e inicializado a 0 todas las celdas.
 * @param {*} tamTablero Un entero con el tamaño del tablero
 * @returns el array con las dimensiones adecuadas o vacio si el tamaño del tablero es 0
 */
function crearTablero(tamTablero) {
    // creamos un array del tamaño del tablero e inicializado a 0 todas las celdas
    let celdas = [];
    for (let i = 0; i < tamTablero; i++) {
        celdas[i]=[];
        for (let j = 0; j < tamTablero; j++) {
            celdas[i][j] = 0;
        }
    }
    return celdas;
}

// ***********************************************
// ******** Preparar el tablero ******************
// ***********************************************

function recorrerPalabras() {
    // ordenar palabras para empezar con la más larga
    palabras.sort((a,b)=>b.length-a.length);
    for (const p of palabras) {
        let siguientePalabra = false;
        //let contador = tamTab+1;
        do {
            siguientePalabra = posicionarPalabra(p);
            console.log("Palabra puesta: " + siguientePalabra)
            // contador--;
        } while (!siguientePalabra /*&& contador>0*/);
    }
}
function posicionarPalabra(palabra) {
    let longitudPalabra = palabra.length;
    let aPalabra = Array.from(palabra);
    console.log("Intento de poner: " + aPalabra);
    let encajo = false;
    //console.log(aPalabra);
    
    // número aleatorio para posición i y j: 0-(tamTablero-1)
    let posi = posicionAleatoria(tamTab);
    let posj = posicionAleatoria(tamTab);
    let inicialPosi = posi;
    let inicialPosj = posj;
    //console.log(posi+","+posj);

    let salir = false;
    let controlDireccion = -1;
    let direccion;
    
    /* Bucle para probar las 8 direcciones, si se encuentra una que encaje la palabra,
    con salir=true no damos más vueltas al bucle */
    for (let i = 0; i < 8 && !salir; i++) {
        /* Para controlar que direccion usamos, la primera vez pone una aleatoria pero 
            luego usa la siguiente hasta probar todas. */
        if (controlDireccion == -1) {
            // número aleatorio 0-7 para direcciones
            direccion = posicionAleatoria(8);
            controlDireccion = direccion;
        } else {
            direccion++;
            if (direccion==8) {
                direccion=0;
            }
        }
        //console.log("Direccion: " + direccion);

        if (!salir) {
        //     /* comprobar que entra en la tabla con posi y posj y direccion */
        //     /* comprobar que podemos poner la palabra mirando celda por celda si esta vacia o si hay algo 
        //     pero encaja con nuestras letras, en cuanto no encaje una letra salimos a buscar otra dirección */
        //     //encajaPalabra(direccion, palabra, posi, posj);
        //     try {
                posi = inicialPosi;
                posj = inicialPosj;
                numCaracteres = 0;
                for (const caracter of aPalabra) {
                    
                    // para comprobar si las posiciones estan dentro de los limites del tablero
                    if(posi>=0 && posi<tamTab && posj>=0 && posj<tamTab){

                        let carTablero = tablero[posi][posj];

                        // comprueba que si hay una letra se igual que la de la palabra
                        if (caracter!=carTablero && carTablero!=0) {
                            console.log("***** encajo if false");
                            encajo=false;
                            numCaracteres--; // para evitar que entre en el if de despues 
                        }
                        console.log("Direccion: " + direccion + " pos: " + posi + "," + posj + " Carcteres: " + 
                            carTablero + "==" + caracter);
                        posi+=aDirecciones[0][direccion];
                        posj+=aDirecciones[1][direccion];
                        numCaracteres++;
                    }

                        
                }
                // Para devolver true que quiere decir que encaja la palabra
                if (numCaracteres==aPalabra.length) {
                    salir=true;
                    encajo=true;
                }
                
        //         
        //         //console.log("Direccion: " + direccion + " pos: " + posi + "," + posj)

        //     } catch (error) {
        //         console.log("***** encajo catch false" + error);
        //         //encajo=false;
        //     }
        }

        /* si no hemos conseguido encajar en todas las direcciones salimos y devolvemos false para que vuelva a cargar
        ésta funcion pero con otra posición */
        console.log("Valor de i=" + i)
        // if (i==7) {
        //     console.log(">>>>>  encajo fin for false");
        //     encajo=false;
        // }
        //salir=true;
    }

    /* Si llegamos aqui es que la palabra se puede posicionar, aqui la guardamos en el tablero */
    console.log("------- Valor de encajo = " + encajo);
    if (encajo) {
        posi = inicialPosi;
        posj = inicialPosj;
        for (const caracter of aPalabra) {
            console.log("Caracter de la palabra: "+caracter+" en pos " +posi + "," + posj + " con direccion: " + direccion);
            tablero[posi][posj] = caracter;
            posi+=aDirecciones[0][direccion];
            posj+=aDirecciones[1][direccion]; 
        }
    }

    // Devolvemos true para indicar que si se ha guardado la palabra y false para no
    return encajo;

}
function dibujarTablero(celdas) {

    let tabla = document.createElement("table")

    for (let i = 0; i < celdas.length; i++) {
        let fila = document.createElement("tr");
        for (let j = 0; j < celdas.length; j++) {
            let celda = document.createElement("td");
            celda.innerHTML = celdas[i][j];
            celda.id = i+","+j;
            celda.addEventListener("mousedown", pulsarCelda);
            celda.addEventListener("mouseup", soltarCelda);
            celda.addEventListener("mouseenter", entrarRatonEnCelda);
            celda.addEventListener("mouseleave", salirRatonDeCelda);
            fila.append(celda);
        }
        tabla.append(fila);
    }

    tableroContainer.append(tabla);
}
function posicionAleatoria(tamTablero){

    return parseInt(Math.random()*tamTablero);
}
function rellenarTablero() {
    const vocales = ["a", "e", "i", "o", "u"];
    const consonantes = [
        "b", "c", "d", "f", "g", "h", "j", "k", "l", "m",
        "n", "ñ", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"
    ];

    for (let i = 0; i < tamTab; i++) {
        for (let j = 0; j < tamTab; j++) {
            if (tablero[i][j]==0) {
                // rellenamos con letras al azar con 30% vocales y 70% consonantes
                let aleatorio = Math.random();
                if (aleatorio < 0.7) {
                    tablero[i][j] = consonantes[parseInt(Math.random() * consonantes.length)].toLowerCase();
                } else {
                    tablero[i][j] = vocales[parseInt(Math.random() * vocales.length)].toLowerCase();
                }
            }
        }
    }
}

// ***********************************************
// ******** Control del juego ********************
// ***********************************************
function pulsarCelda(ev) {
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
function entrarRatonEnCelda(ev){
    // Comprobación de bloqueo
    if (tableroBloqueado) {
        return; // Salir inmediatamente si el tablero está bloqueado
    }

    if (ratonPulsado) {
        let coordenadas = ev.target.id
    
        let letras = coordenadas.split(",");
        
        moverX = parseInt(letras[0],10);
        moverY = parseInt(letras[1],10);

        console.log(moverX + "-" + moverY);

        if(validarDireccion(origenX, origenY, moverX, moverY)){
            anteriorX = moverX;
            anteriorY = moverY;
            pintarCeldas(origenX, origenY, moverX, moverY)
        }
    }

}
function salirRatonDeCelda(ev) {
    // Comprobación de bloqueo
    if (tableroBloqueado) {
        return; // Salir inmediatamente si el tablero está bloqueado
    }
    if (ratonPulsado) {
        pintarCeldas(origenX, origenY, anteriorX, anteriorY, "blanco");
    }
}
function soltarCelda(ev){
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
        console.log("direccion válida");
        let palabra = pintarCeldas(origenX, origenY, destinoX, destinoY);
        if(comprobarPalabra(palabra, palabras)){
            // la palabra esta en la sopa de letras
            console.log("encontrado")
            pintarCeldas(origenX, origenY, destinoX, destinoY, "encontrado")
            tacharPalabra(palabra);
        } else {
            // la palabra no esta en la sopa de letras
            console.log("NO encontrado")
            pintarCeldas(origenX, origenY, destinoX, destinoY, "erroneo")

            // Bloquear el tablero antes del setTimeout
            tableroBloqueado = true;
            espera = setTimeout(() => {
                // La función se ejecuta SÓLO después de 1000 ms
                pintarCeldas(origenX, origenY, destinoX, destinoY, "blanco")

                // Desbloquear el tablero cuando el setTimeout termina
                tableroBloqueado = false;
            }, 1000);
            
        }

    } else {
        // dirección inválida
        console.log("direccion NO válida");
    }

    
}
function validarDireccion(x1, y1, x2, y2){
    let ok = false;

    if (x1==x2 || y1==y2 || Math.abs(x1-x2)==Math.abs(y1-y2)) {
        ok=true;
    }

    return ok;
}
function pintarCeldas(x1, y1, x2, y2, color="seleccionado"){
    
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
        // console.log("x1="+x1+", y1="+y1+", x2="+x2+", y2="+y2)
        // console.log("controlX="+controlX+" ,controlY="+controlY);

        // console.log(controlX+","+controlY);
        // console.log("Incrementos: "+incrementoX+","+incrementoY);

        let celda = document.getElementById(controlX+","+controlY);
        celda.classList.remove("seleccionado");
        celda.classList.remove("erroneo");
        celda.classList.remove("blanco");
        celda.classList.add(color);
        palabra += celda.textContent;
        // console.log(celda);

        controlX += incrementoX;
        controlY += incrementoY;
    }
    let celda = document.getElementById(x2+","+y2);
    palabra += celda.textContent;
    celda.classList.remove("seleccionado");
    celda.classList.remove("erroneo");
    celda.classList.remove("blanco");
    celda.classList.add(color);

    console.log(palabra);
    return palabra;
}
function comprobarPalabra(pal, pals) {
    let salida = false;
    for (const p of pals) {
        if (p==pal) {
            salida = true;
        }
        
        console.log(p + " == " + pal + " = " + salida)
    }
    return salida;
}
function tacharPalabra(pal){
    console.log("entrando a tachar " + pal);
    
    const parrafos = document.getElementById("palabrasBuscar").getElementsByTagName("p");

    for (const p of parrafos) {
        if (p.textContent === pal) {
            console.log("tachando" + p);
            p.classList.add("tachar")
            break;
        }
        
    }
}

// ***********************************************
// ******** Tabla con puntuaciones ***************
// ***********************************************
function crearTabla(){
    let tabla = document.createElement("table");
    let cabecera = document.createElement("thead");
    let celdaNombre = document.createElement("th");
    let celdaPuntos = document.createElement("th");

    celdaNombre.innerHTML = "Nombre";
    celdaPuntos.innerHTML = "Puntuación";

    cabecera.append(celdaNombre);
    cabecera.append(celdaPuntos);

    tabla.append(cabecera);

    return tabla;
}
function addPuntuacion(tabla, nombre, puntuacion){
    let fila = document.createElement("tr");
    let celdaNombre = document.createElement("td");
    let celdaPuntos = document.createElement("td");

    celdaNombre.innerHTML = nombre;
    celdaPuntos.innerHTML = puntuacion;

    fila.append(celdaNombre);
    fila.append(celdaPuntos);

    tabla.append(fila);
}
function exportarPuntuaciones(nombre, puntuacion) {
    if (localStorage.getItem("puntuaciones")==null) {
        localStorage.setItem("puntuaciones",":");
    }
    
    let puntuaciones = localStorage.getItem("puntuaciones");
    // cargar puntuación y nombre real, llamar a esta función al finalizar juego
    // puntuaciones += ";alvaro:9874";
    localStorage.setItem("puntuaciones",puntuaciones);
}
function importarPuntuaciones(tab) {
    let puntuaciones = localStorage.getItem("puntuaciones");
    let jugadores = puntuaciones.split(";");
    for (const j of jugadores) {
        let jugador = j.split(":");
        let nombre = jugador[0];
        let puntuacion = jugador[1];
        addPuntuacion(tab, nombre, puntuacion);
    }
}

// ***********************************************
// *************** Cronómetro ********************
// ***********************************************
function crearCronometro(nombre, contenedorTablero) {

    const cronometro = document.createElement("div");
    cronometro.id="cronometro";
    cronometro.innerHTML ="<span class='nombreJugador'>"+ nombre + "</span> -> <span id='contadorJuego'>00:00:00</span>";

    contenedorTablero.append(cronometro);
}
function sumarSegundos() {
    segundosJuego++;
    // 2. Calcular Horas, Minutos y Segundos a partir del total de segundos
    const horas = Math.floor(segundosJuego / 3600); // 3600 segundos en una hora
    const minutos = Math.floor((segundosJuego % 3600) / 60); // Segundos restantes después de las horas, divididos entre 60
    const segundos = segundosJuego % 60; // Segundos restantes

    // 3. Formatear la salida (Asegurar 2 dígitos: 00, 01, ..., 09, 10, ...)
    const h = String(horas).padStart(2, '0');
    const m = String(minutos).padStart(2, '0');
    const s = String(segundos).padStart(2, '0');

    // 4. Construir la cadena de tiempo
    const tiempoFormateado = `${h}:${m}:${s}`;

    // 5. Mostrar en el HTML
    let contadorJuego = document.getElementById('contadorJuego');
    if (contadorJuego) {
        contadorJuego.innerHTML = tiempoFormateado;
    }
}