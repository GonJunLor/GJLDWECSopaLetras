var palabras = ["perro", "gato", "loro", "guacamayo", "col", "sal", "agua", "lapicero","balon","pizarra"];
const TAM_PALABRA_MAYOR = palabramasLarga(palabras);
const TOTAL_LETRAS_PALABARAS = cantidadLetras(palabras);

var tamTab = calcTamTablero(TAM_PALABRA_MAYOR,TOTAL_LETRAS_PALABARAS);
document.writeln("Tamaño de tablero: " + tamTab + "*" + tamTab);
var tablero = crearTablero(tamTab);

var aDirecciones = [
    [1,1,0,-1,-1,-1,0,1],
    [0,1,1,1,0,-1,-1,-1]
];

//dibujarTablero(tablero);
recorrerPalabras();
//dibujarTablero(tablero);
document.writeln("<br>")
rellenarTablero();
dibujarTablero(tablero);
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
            //celdas[i][j] = j+","+i;
            celdas[i][j] = 0;
        }
    }
    return celdas;
}
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
    document.writeln("<table>")
    for (let i = 0; i < celdas.length; i++) {
        document.writeln("<tr>")
        for (let j = 0; j < celdas.length; j++) {
            if (celdas[i][j]==0) {
                document.writeln("<td>" + celdas[i][j] + "</td>");
            } else{
                document.writeln("<td class='verde'>" + celdas[i][j] + "</td>");
            }
            
        }
        document.writeln("<tr>")
    }
    document.writeln("</table>")
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