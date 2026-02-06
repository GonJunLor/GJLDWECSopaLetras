export async function pedirPalabras(numPalabras) { // Ahora es async
    let palabrasApi = ["gato"];
    
    // 1. Creamos el controlador y el temporizador
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 segundos

    try {
        const respuesta = await fetch("https://random-word-api.herokuapp.com/word?number=" + numPalabras, {
            signal: controller.signal // 2. Pasamos la señal al fetch
        });

        // Si llega aquí, la respuesta fue exitosa antes de los 5s
        clearTimeout(timeoutId); // Limpiamos el timer

        const datos = await respuesta.json();
        return datos;

    } catch (error) {
        // 3. Manejamos el caso específico del timeout o cualquier otro error
        if (error.name === 'AbortError') {
            console.warn("La API tardó demasiado (5s). Usando palabra por defecto.");
        } else {
            console.error("Error de red o servidor:", error);
        }
        
        return palabrasApi; // Retorna ["gato"] en caso de fallo o timeout
    }
}

