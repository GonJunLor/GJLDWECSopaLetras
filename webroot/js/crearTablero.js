var palabras = ["perro", "gato", "loro", "guacamayo"];
const TAM_PALABRA_MAYOR = palabramasLarga(palabras);
const TOTAL_LETRAS_PALABARAS = cantidadLetras(palabras);

var tamTab = calcTamTablero(TAM_PALABRA_MAYOR,TOTAL_LETRAS_PALABARAS);
document.writeln("Tamaño de tablero: " + tamTab + "*" + tamTab);
var tablero = crearTablero(tamTab);

var aDirecciones = [
    [1,1,0,-1,-1,-1,0,1],
    [0,1,1,1,0,-1,-1,-1]
];

dibujarTablero(tablero);
recorrerPalabras()
;
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
function crearTablero(tamTablero) {
    // creamos un array del tamaño del tablero e inicializado a 0 todas las celdas
    let celdas = [];
    for (let i = 0; i < tamTablero; i++) {
        celdas[i]=[];
        for (let j = 0; j < tamTablero; j++) {
            celdas[i][j] = j+","+i;
            // celdas[i][j] = 0;
        }
    }
    return celdas;
}
function recorrerPalabras() {
    // ordenar palabras para empezar con la más larga
    palabras.sort((a,b)=>b.length-a.length);
    for (const p of palabras) {
        posicionarPalabra(p);
    }
}
function posicionarPalabra(palabra) {
    let longitudPalabra = palabra.length;
    let aPalabra = Array.from(palabra);
    //console.log(aPalabra);
    
    // número aleatorio para posición i y j: 0-(tamTablero-1)
    let posi = posicionAleatoria(tamTab);
    let posj = posicionAleatoria(tamTab);
    //console.log(posi+","+posj);

    // número aleatorio 0-7 para direcciones
    let direccion = posicionAleatoria(8);
    //console.log(direccion);

    /* comprobar que entra en la tabla con pos y direccion, en cada switch comprobamos 
    con restas con los bordes y la longitud de la palabra */
    encajaPalabra(direccion, palabra, posi, posj);

    /* si entra la palabra seguimos, sino que vuelva a hacer otra dirección pero no aleatoria
    sino que coga la siguiente. Puede haber lio cuando llegamos a la dirección 7 ya que luego 
    empieza por la 0 */

    /* comporbar que podemos poner la palabra mirando celda por celda si esta vacia o si hay algo 
    pero encaja con nuestras letras, en cuanto no encaje una letra salimos a buscar otra dirección */
    
    /* si no hemos conseguido encajar en todas las direcciones buscamos nueva posición */
    
}
function dibujarTablero(celdas) {
    document.writeln("<table>")
    for (let i = 0; i < celdas.length; i++) {
        document.writeln("<tr>")
        for (let j = 0; j < celdas.length; j++) {
            document.writeln("<td>" + celdas[i][j] + "</td>");
        }
        document.writeln("<tr>")
    }
    document.writeln("</table>")
}
function posicionAleatoria(tamTablero){

    return parseInt(Math.random()*tamTablero);
}
function encajaPalabra(direccion, palabra, posX, posY) {
    console.log("posicion: " + posX + "-" + posY)
    console.log("direccion: " + direccion)
    let valido = true;
    // poner en los if de abajo lo de huecos...
    let huecosHastaBorde = Math.min(
        aDirecciones[0][direccion]==0?(tamTab*aDirecciones[1][direccion]-posY):(tamTab*aDirecciones[0][direccion]-posX)
        ,
        aDirecciones[1][direccion]==0?(tamTab*aDirecciones[0][direccion]-posX):(tamTab*aDirecciones[1][direccion]-posY)
    );
    if (aDirecciones[0][direccion]==0) {
        
    } else if(aDirecciones[0][direccion]==-1){

    } else {

    }
    console.log(huecosHastaBorde);
    return valido;
}