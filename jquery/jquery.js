//Dibujo canvas
//--------------
window.onload = function() {

    //Dibujo el simbolo del más
    //-------------------------

    var lienzo = document.getElementById("mas");
    var canvas = lienzo.getContext("2d");
    canvas.strokeStyle = "white";

    canvas.lineWidth = 10;

    canvas.beginPath();
    canvas.lineTo(0, 70);
    canvas.lineTo(200, 70);

    canvas.closePath();
    canvas.stroke();
    canvas.beginPath();

    canvas.lineTo(100, 0);
    canvas.lineTo(100, 150);
    canvas.stroke();

    canvas.closePath();
    //Dibujo la cruz
    //--------------

    var lienzo = document.getElementById("cruz");
    var canvas = lienzo.getContext("2d");
    canvas.lineWidth = 7;
    canvas.strokeStyle = "red";

    canvas.beginPath();

    canvas.lineTo(50, 0);
    canvas.lineTo(200, 150);
    canvas.stroke();

    canvas.closePath();
    canvas.beginPath();
    canvas.lineTo(200, 0);
    canvas.lineTo(50, 150);
    canvas.stroke();

    canvas.closePath();

    //Dibujo una V
    //-------------

    var lienzo = document.getElementById("tick");
    var canvas = lienzo.getContext("2d");
    canvas.lineWidth = 10;
    canvas.strokeStyle = "green";

    canvas.beginPath();

    canvas.lineTo(200, 0);
    canvas.lineTo(150, 200);
    canvas.stroke();

    canvas.closePath();
    canvas.beginPath();
    canvas.lineTo(100, 0);
    canvas.lineTo(185, 200);
    canvas.stroke();

    canvas.closePath();

};


//Efecto botón más
//-----------------


$("#mas").click(function() {
    console.log("entra");
    $("#imgInicia").slideUp(2000);
    $("#zonaProductos, #listadoProductos, #zonaTicket").slideDown(2000);

});

//Si pinchas en el icono de la comida para que aparezcan las comidas
//------------------------------------------------------------------

$("#comida").click(function() {
    $("#Comidas").slideToggle(100);
    $("#bebida").css("border", "none");
    $("#bebida").css("padding", "0");

    $("#comida").css("border", "solid 1px red");
    $("#comida").css("border-radius", "20px");
    $("#comida").css("padding", "10px");
    $("#Bebidas").css("display", "none");


});

//Si pinchas en el icono de la bebida para que aparezcan las bebidas
//------------------------------------------------------------------

$("#bebida").click(function() {
    $("#Bebidas").slideToggle(100);
    $("#comida").css("border", "none");
    $("#comida").css("padding", "0");

    $("#bebida").css("border", "solid 1px blue");
    $("#bebida").css("border-radius", "20px");
    $("#bebida").css("padding", "10px");

    $("#Comidas").css("display", "none");


});
//Si pinchas en alguna imágen de comida se le ponen estos efectos
//---------------------------------------------------------------------

$("#Comidas img").click(function() {
    $("#Comidas img").css("filter", "grayscale(0)");
    $("#Comidas img").css("margin-left", "0px");

    $("#Comidas img").css("border-radius", "0px");

    $(this).css("border-radius", "20px");
    $(this).css("margin-left", "10px");

    $(this).css("filter", "grayscale(1)");

});
//Si pinchas en alguna imágen de bebida se le ponen estos efectos
//---------------------------------------------------------------------
$("#Bebidas img").click(function() {
    $("#Bebidas img").css("filter", "grayscale(0)");
    $("#Bebidas img").css("margin-left", "0px");

    $("#Bebidas img").css("border-radius", "0px");

    $(this).css("border-radius", "20px");
    $(this).css("margin-left", "10px");

    $(this).css("filter", "grayscale(1)");

});


//Defino un array que utilizare más adelante para saber si ya hemos metido un producto y cuantas unidades

var unidadesPedido = new Array();

$("img").click(function() { //Si se clica en algun imágen
    var datos = $(this).attr("title"); //Saco todo el title con los datos
    let array = datos.split("-"); //Los guardo en un array y gracias al split - se guarda en cada posición cada vez que detecta un -
    var unidades = $("#" + array[0]).val(); //Para saber el número de unidades saco el input que tiene asociado con el valor que tiene ahora
    if (unidades == "") { //En caso de que no tenga valor le pongo por defecto 1
        unidades = 1;
    }

    let creado = false; //Para saber si ya lo hemos metido anteriormente lo guardo en un array en el que la llave sera el id y el contenido las unidades actuales
    for (llave in unidadesPedido) {
        if (llave == array[0]) {
            creado = true; //Si ya esta dentro del array pongo esta variable como true
        }
    }
    if (unidades > 10 || unidades < 1) { //Para asegurarme de que no metas un número mayor de 10 o menor de 1
        alert("No puedes introducir esa cantidad " + unidades + ", debe ser un valor comprendido entre (1-10)");
    } else {
        //unidadesPedido[array[0]] += parseInt(unidades);


        if (creado) {
            unidadesPedido[array[0]] += parseInt(unidades); //Si ya esta creado le sumo la nueva cantidad de unidades
            $("#t" + array[0]).remove(); //Si ya esta creado lo borro de la tabla de esta manera lo puedo volver a añadir más adelante


        } else {
            unidadesPedido[array[0]] = parseInt(unidades); //Si no esta creado en el array lo introduzco

        }



        //Introduzdo los datos en la tabla (le añado un id para así más atras poder localizarlo y borrarlo)
        $("table").append($("table").append("<tr id=t" + array[0] + "><td>" + array[0] + "</td><td>" + array[1] + "</td><td>" + array[2] + "</td><td>" + unidadesPedido[array[0]] + "</td></tr>"));


        coloresTabla(); //Llamo a la función colores tabla para ver si tengo que cambiar o no los colores
        // console.log(unidadesPedido[array[0]]);
    }

});

$("input:radio").click(function() { //En caso de que pinche en el radio verifico que he cambiado todo
    coloresTabla();
});

function coloresTabla() {

    //Miro si esta chekeado como recoger o a domicilio y en base a eso le aplico una clase u otra
    $("table tr").each(function(i) {
        if (i != 0) { //Para que no me cambie los th de color miro que no sea la primera iteración
            let clase = "producto_local";
            if ($("input:radio[name=pedido]:checked").val() == "domicilio") { //Si esta checkeado a domicilio
                $(this).removeClass(clase); //Elimino la clase anterior si es que tenía
                //console.log($(this).attr("id"));
                if (idPedidoTabla($(this).attr("id"), 2) < 100) { //Si el id es menor de 100 significa que es de comida, ademas utilizo una función para sacar el id de manera limpia

                    clase = "comida_llevar";

                } else {
                    clase = "bebida_llevar";

                }
            }

            $(this).addClass(clase); //Añado la clase
        }
    });
}



//En caso de que hagas doble click en alguna lado de la tabla
//----------------------------------------------------------- 
$("table").on("dblclick", "tr", function() { //Saco el tr en el que has pinchado
    //console.log($(this).attr("id"));

    let idPedido = idPedidoTabla($(this).attr("id"), 1); //Utilizo la función id pedido para sacar de manera más limpia el id
    unidadesPedido[idPedido] = 0; //Hago que en el array este pase a valer 0

    $(this).remove(); //Lo elimino de la tabla

});

//Como tengo que sacar el id en dos ocasiones en lugar de hacer un substring por cada uno, paso el número que quiero borrar (equivalente a las letras que va a tener) y las borro para sacar simplemente el número y en base a esto operar
function idPedidoTabla(id, n) {

    let idPedido = $("#" + id).attr("id").substr(n, $("#" + id).attr("id").length);

    return idPedido;
}


//Cancelando pedido
//-----------------

$("#cruz").click(function() {

    if (confirm("¿Estas seguro de cancelar tu pedido?")) {

        location.reload();
        /* 
        En caso de que se haga sin reiniciar
      
        $("#Comidas,#Bebidas").css("display", "none");

          for (llave in unidadesPedido) { //Es la unica manera que me deja por algún motivo si lo intento hacer usando pop, shift, lenght=0 etc... no funciona
              unidadesPedido[llave] = 0; //Recorro todo el array y pongo todo a 0
          }

          $("#zonaTicket p").remove(); //Quito todo lo de la zona ticket
          $("#zonaTicket li").remove();

          $("#zonaTicket h3").remove();
         // console.log(unidadesPedido);
          $("table td").remove();*/
    }

});

//Si pulsamos en el tick o V
//--------------------------

$("#tick").click(function() {

    let trabajador = $("#trabajadores").val(); //Saco el valor del input de trabajadores
    let fecha = new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear(); //Saco la fecha actual del sistema
    let comida = new Array(); //Creo dos array donde podre repartir u ordenar todo en familias
    let bebida = new Array();
    let totalPrecio = 0; //Creo una variable que usare para guardar el precio total
    $("table tr").each(function(i) { //Hago un bucle for each accediendo a cada tr de la tabla

        if (i != 0) { //Salto la primera iteración
            var cantidadActual = $(this).find("td")[2].textContent.substr(0, $(this).find("td")[2].textContent.length - 2) * $(this).find("td")[3].textContent;
            var datosActuales = "<li class=text-center>" + $(this).find("td")[3].textContent + " x " + $(this).find("td")[1].textContent + " ( " + $(this).find("td")[2].textContent + ") : " + cantidadActual + "€</li>";

            if ($(this).attr("id").startsWith("ta")) { //Si empieza con ta es que es una comida
                //Introduzdo dentro del array el precio-nombre-cantidad 
                comida.push(datosActuales);

                //Hago un substring en el precio para que no pete por el simbolo del euro y lo multiplico por la cantidad total, finalmente lo sumo al precio total
                totalPrecio += cantidadActual;
            } else { //Lo mismo pero con bebidas

                bebida.push(datosActuales);

                totalPrecio += cantidadActual;

            }
        }
    });



    //Introduzco todos los datos en el ticket, como el ticket es el unico que tiene un h2 simplemente uso un after para introducir todos los valores

    $("h2").after(`<p class=card-text>
        
    Gracias por venir a max-burguer usted ha sido atendido por:  ${trabajador} </p>
    <p class=card-text>Fecha: ${fecha}</p>
    <h3>Comidas<br>----------------</h3>
    
    ${comida.join(" ")}
    <h3>Bebidas <br>----------------</h3>
    
    ${bebida.join("")}
    <h3>Total Factura <br>---------------------<h3>

    ${totalPrecio}€
    <br>
    <button class="btn btn-primary" onclick=pagar()>Pagar</button>
    `);





});

//El boton de pagar tiene un evento on click de tal manera que al n

function pagar() {

    if (confirm("¿Deseas pagar?")) {
        location.reload();
    }

};