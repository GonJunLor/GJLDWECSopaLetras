export async function pedirPalabras(numPalabras) { // Ahora es async
    let palabrasApi = ["gato"];
    try {
        const respuesta = await fetch("https://random-word-api.herokuapp.com/word?number="+numPalabras);
        const datos = await respuesta.json();
        palabrasApi = datos; 
        console.log(palabrasApi);
        return palabrasApi;
    } catch (error) {
        console.error("Error:", error);
    }
    return palabrasApi;
}

