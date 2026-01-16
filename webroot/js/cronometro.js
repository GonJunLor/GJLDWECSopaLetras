export var segundosJuego = 0;

export function crearCronometro(contenedorTablero) {

    const cronometro = document.createElement("div");
    cronometro.id="cronometro";
    cronometro.innerHTML ="<span id='contadorJuego'>00:00:00</span>";

    contenedorTablero.append(cronometro);
}
export function sumarSegundos() {
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