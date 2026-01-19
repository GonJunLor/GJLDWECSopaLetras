var puntuaciones;

export function crearTabla(){
    let tabla = document.createElement("table");
    tabla.setAttribute("id","tablapuntos");
    let cabecera = document.createElement("thead");
    let cabNombre = document.createElement("th");
    let cabPuntos = document.createElement("th");

    cabNombre.innerHTML = "Nombre";
    cabPuntos.innerHTML = "Puntuación";

    cabecera.append(cabNombre);
    cabecera.append(cabPuntos);

    tabla.append(cabecera);

    for (let i = 0; i < 3; i++) {
        let filaPuntos = document.createElement("tr");
        // filaPuntos.classList.add("p"+(i+1));
        filaPuntos.setAttribute("id","p"+(i+1));
        filaPuntos.append(document.createElement("td"));
        filaPuntos.append(document.createElement("td"));
        tabla.append(filaPuntos);
    }

    return tabla;
}
export function comprobarPuntuacion(puntos, nivel=0) {
    let control = false;

    importarPuntuaciones();

    // cargamos las puntuaciones del nivel requerido por parámetro
    let aPuntos = puntuaciones[nivel];
    // console.log(aPuntos);

    for (const fila of aPuntos) {
        if(puntos>fila.puntuacion) control = true;
    }

    return control;
}
export function ordenarPuntuaciones(puntos, nivel=0) {
    importarPuntuaciones();

    // Usamos prompt para pedir el nombre, hay cambiarlo con poner el nombre directamente en la celda correspondiente de la tabla
    let nombreJugador = prompt("¡Nueva mejor puntuación! Introduce tu nombre:") || "Anónimo";
    
    // Eliminamos la última puntuación
    puntuaciones[nivel].pop();

    // Añadimos la nueva al final
    puntuaciones[nivel].push({ "nombre": nombreJugador, "puntuacion": puntos });

    // Ordenamos de menor a mayor (porque en tiempo, menos es mejor)
    puntuaciones[nivel].sort((a, b) => b.puntuacion - a.puntuacion);

    // Guardamos y actualizamos visualmente
    exportarPuntuaciones();
}
export function mostrarPuntuaciones(nivel=0) {
    importarPuntuaciones();

    // obtengo las filas de la tabla de puntos
    let filasPuntos = document.getElementById("tablapuntos").childNodes;
    
    // cargamos las puntuaciones del nivel requerido por parámetro
    let aPuntos = puntuaciones[nivel];
    // console.log(aPuntos);

    // recorro esas filas de la 1-3
    for (let i = 1; i <= 3; i++) {
        // en cada fila el hijo 0 es para nombre y el hijo 1 es para puntuación
        filasPuntos[i].childNodes[0].innerHTML=aPuntos[i-1].nombre;
        filasPuntos[i].childNodes[1].innerHTML=aPuntos[i-1].puntuacion;
    }
}
export function exportarPuntuaciones() {
    if (localStorage.getItem("puntuaciones")==null) {
        puntuaciones = [
            [
                {"nombre":"","puntuacion":0},
                {"nombre":"","puntuacion":0},
                {"nombre":"","puntuacion":0}
            ], 
            [
                {"nombre":"","puntuacion":0},
                {"nombre":"","puntuacion":0},
                {"nombre":"","puntuacion":0}
            ], 
            [
                {"nombre":"","puntuacion":0},
                {"nombre":"","puntuacion":0},
                {"nombre":"","puntuacion":0}
            ]
        ]
        localStorage.setItem("puntuaciones",JSON.stringify(puntuaciones));
    } else if(puntuaciones!=undefined){
        localStorage.setItem("puntuaciones",JSON.stringify(puntuaciones));
    } 
}
export function importarPuntuaciones() {
    puntuaciones = JSON.parse(localStorage.getItem("puntuaciones"));
}