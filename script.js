var usuarios;

// Menu que muestra y oculta las tablas
const tablaUsuarios = document.getElementById("tablaUsuarios");
const tablaSube = document.getElementById("tablaSube");
const tablaViajes = document.getElementById("tablaViajes");

document.getElementById("menuUsuarios").addEventListener("click",function () {mostrarTabla(tablaUsuarios)});
document.getElementById("menuSubes").addEventListener("click",function () {mostrarTabla(tablaSube)});
document.getElementById("menuViajes").addEventListener("click",function () {mostrarTabla(tablaViajes)});

function mostrarTabla(tabla) 
{
    tablaViajes.classList.add("hide");
    tablaSube.classList.add("hide");
    tablaUsuarios.classList.add("hide");
    tabla.classList.remove("hide");
}
// TERMINA Menu que muestra y oculta las tablas
//Conecta con JSON
fetch('http://www.damianargento.com/Sistema_Sube/tarjetas_Sube.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(usuarios) {
// Genera la tabla de usuarios y Sube y le carga los datos del json
    for (i=0;i<usuarios.length;i++){

        usuario = usuarios[i];

        var trSube = document.createElement("tr");
        var trUsuarios = document.createElement("tr");

        dni = usuarios[i].DNI;
        nombre = usuarios[i].name;
        sube = usuarios[i].sube;

        var textDni = document.createTextNode(dni);
        var tdDni = document.createElement("td");
        tdDni.appendChild(textDni);
        trUsuarios.appendChild(tdDni);
        trSube.appendChild(tdDni.cloneNode(true))

        var textNombre = document.createTextNode(nombre);
        var tdNombre = document.createElement("td");
        tdNombre.appendChild(textNombre);
        trUsuarios.appendChild(tdNombre);

        var textSubeNr = document.createTextNode(sube.nr);
        var tdSubeNr = document.createElement("td");
        tdSubeNr.appendChild(textSubeNr);
        trUsuarios.appendChild(tdSubeNr);
        trSube.appendChild(tdSubeNr.cloneNode(true));
        
        var textSubeSaldo = document.createTextNode("$" + sube.saldo);
        var tdSubeSaldo = document.createElement("td");
        tdSubeSaldo.appendChild(textSubeSaldo);
        tdSubeSaldo.className = "saldo" + usuarios[i].DNI;
        trUsuarios.appendChild(tdSubeSaldo);
        trSube.appendChild(tdSubeSaldo.cloneNode(true));

        document.getElementById("users").appendChild(trUsuarios);
        document.getElementById("subes").appendChild(trSube);
    
        //Genera el Select de usuarios en "Realizar Viaje"
        const selectNombres = document.getElementById("selectNombre");
        var optionNombre = document.createElement("option");
        optionNombre.value = nombre;
        optionNombre.appendChild(textNombre.cloneNode(true));
        selectNombres.appendChild(optionNombre);
    }
//Genera un td que queda oculto para guardar los datos del saldo de manera permanente en el front
     for(i=0;i<usuarios.length;i++) { 
       var saldoRestante = document.createTextNode(usuarios[i].sube.saldo)
       var tdSaldoRestante = document.createElement("td")
       tdSaldoRestante.id = usuarios[i].DNI;
       tdSaldoRestante.style="display:none";
       tdSaldoRestante.appendChild(saldoRestante);
       document.getElementsByTagName("body")[0].appendChild(tdSaldoRestante);
     }

//Funcion que 
//toma el dato del td creado mas arriba con el último saldo, 
//le resta el valor del viaje realizado
//actualiza el valor del td de arriba y de las tablas Sube y Usuario

    const viajar = function() {
        var nombre = document.getElementById("selectNombre").value;
        var precio = document.getElementById("precio").value;

        var tablaViajes = document.getElementById("tablaViajes");
        var trViajes = document.createElement("tr");
        tablaViajes.appendChild(trViajes);

        for(i=0;i<usuarios.length;i++) {
           if (nombre===usuarios[i].name) {
                var saldoTemporal = document.getElementById(usuarios[i].DNI);

                if (saldoTemporal.innerHTML>0){
                                document.getElementById("saldoInsuficiente").innerHTML = "";
                                saldoTemporal.innerHTML = saldoTemporal.innerHTML - precio;
                
                                var textDni = document.createTextNode(usuarios[i].DNI);
                                var tdDni = document.createElement("td");
                                tdDni.appendChild(textDni);
                                trViajes.appendChild(tdDni);
                
                                var textSubeNr = document.createTextNode(usuarios[i].sube.nr);
                                var tdSubeNr = document.createElement("td");
                                tdSubeNr.appendChild(textSubeNr);
                                trViajes.appendChild(tdSubeNr);
                
                                var textCod = document.createTextNode(Math.floor(100000 + Math.random() * 900000));
                                var tdCod = document.createElement("td");
                                tdCod.appendChild(textCod);
                                trViajes.appendChild(tdCod);
                
                                var textSaldoRestante = document.createTextNode("$" + saldoTemporal.innerHTML);
                                var tdSaldoRestante = document.createElement("td")
                                tdSaldoRestante.appendChild(textSaldoRestante);
                                trViajes.appendChild(tdSaldoRestante);
                                
                                document.getElementsByClassName("saldo" + usuarios[i].DNI)[0].innerHTML = "$" + saldoTemporal.innerHTML;
                                document.getElementsByClassName("saldo" + usuarios[i].DNI)[1].innerHTML = "$" + saldoTemporal.innerHTML;

                                           }
                else {
                    console.log(saldoTemporal.innerHTML);
                    console.log(precio);
                    document.getElementById("saldoInsuficiente").innerHTML = "No se puede realizar el viaje. El usuario no tiene saldo suficiente.";}
                    setTimeout(function(){ document.getElementById("saldoInsuficiente").innerHTML = "" }, 3000);

           }
        
        }
    }
document.getElementById("viajar").addEventListener("click",viajar);
});

    



