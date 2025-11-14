const pie = document.getElementsByTagName("footer")[0];
const contenedor = document.createElement("div");
contenedor.id="reloj";
const iconosPie = document.getElementById("iconosPie");
iconosPie.before(contenedor);
// pie.append(contenedor);


tiempo = setInterval(getHora,1000)

function getHora(){
    var fecha = new Date();

    // Se utiliza .padStart(2, '0') para asegurar que los números de un solo dígito tengan un cero inicial.
    var h = fecha.getHours().toString().padStart(2, '0');
    var m = fecha.getMinutes().toString().padStart(2, '0');
    var s = fecha.getSeconds().toString().padStart(2, '0');

    var hora = h + ":" + m + ":" + s;

    contenedor.innerHTML = hora ;
}