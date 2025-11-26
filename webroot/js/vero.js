 let primeraCelda=null;
function selecionarCeldas(e) {
  //Solamente se puede selecionar
    // if(e.target.tagName === "TD"){
    // e.target.classList.add("seleccionado");
    // }
    if (!primeraCelda){
      //Se puede selcionar y deselecionar
      // if(e.target.tagName === "TD"){
      //   e.target.classList.toggle("seleccionado");
      //con dir se ven todas las propiedades.
      //   console.dir(e.target);
      // }
      primeraCelda = e.target;
      primeraCelda.classList.add("seleccionado")
    }else{
      const celda2 = e.target;
      palabraSelecionada = comprobarSeleccion(primeraCelda,celda2,e.currentTarget);
    ComprobarPalabra(palabraSelecionada,arrayPalabras);
      primeraCelda=null;
    }
   
}
 
function comprobarSeleccion(primeraCelda, celda2, tabla) {
  //la fila tr hace refencia al padre (parentElement). Fila de la primera celda
    const fila = primeraCelda.parentElement.rowIndex;
    console.log(fila);
    //columna de la primera celda
    const columna = primeraCelda.cellIndex;
    console.log(columna);
    //fila de la segunda celda
    const fila2 =celda2.parentElement.rowIndex;
    console.log(fila2);
 
    // columna de la segunda celda
    const columna2 = celda2.cellIndex;
     console.log(columna2);
    // Diferencia entre coordenadas, filas y columnas
    let difFilas = fila2-fila;
    let difCols = columna2 - columna;
    //Si las diferencia entre las filas en 0 es horizontal y si la divisiòn entre la  diferencia de las filas es positivo va hacía abajo y si es negativo, va hacia arriba. y lo mismo pra las columnas(derecha o izquierda)
    let pasoFilas = difFilas === 0 ? 0 : difFilas / Math.abs(difFilas);
    let pasoCols = difCols === 0 ? 0 : difCols / Math.abs(difCols);
 
    let arrayCeldas = [];
    let arrayLetras = [];
    let filaActual = fila;
    let colActual = columna;
    if(!(difFilas == 0 || difCols == 0 || Math.abs(difFilas) == Math.abs(difCols))){
      console.log("seleccion no valida")
    } else {
      while (filaActual !== fila2 + pasoFilas || colActual !== columna2 + pasoCols ){
        let celdaActual = tabla.rows[filaActual].cells[colActual];
        let letraActual = celdaActual.textContent;
        arrayLetras.push(letraActual);
        arrayCeldas.push(celdaActual);
        filaActual = filaActual + pasoFilas;
        colActual = colActual + pasoCols;
        console.log(letraActual);
       
      }
    }
arrayCeldas.forEach(clase =>clase.classList.add("seleccionado"));
palabrasSeleccionadas = arrayLetras.join("");
console.log(palabrasSeleccionadas);
return palabrasSeleccionadas;
}
 
function ComprobarPalabra(palabraSelecionada,arrayPalabras) {
  if (arrayPalabras.includes(document.querySelectorAll(".seleccionado"))){
    for(casilla of seleccionado ){
      casilla.classList.remove("seleccionado");
      casilla.classList.add("correcto");
    }
  }else{
      for(casilla of document.querySelectorAll(".seleccionado")){
      casilla.classList.remove("seleccionado");
      casilla.classList.add("incorrecto");
    }
    setTimeout(()=>{
       for(casilla of document.querySelectorAll(".incorrecto")){
      casilla.classList.remove("incorrecto");
    }
    },1000)
    }
}