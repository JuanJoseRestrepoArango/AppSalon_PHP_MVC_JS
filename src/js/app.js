let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;

const cita = {
    id: '',
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}

document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
})

function iniciarApp(){
    mostrarSeccion();//mosstrar la seccion actual
    tabs(); //Cambia la seccion cuando se presiona algun tab
    botonesPaginador();//Agrega o quita los botones del paginador 
    paginaSiguiente();//Ir a la pagina Siguiente
    paginaAnterior();//Ir a la pagina Anterior

    consultarAPI(); //Consulta la API en el backend en PHP

    idCliente();//llena el id del cliente en citas
    nombreCliente(); //llenar el nombre del cliente en citas
    seleccionarFecha();//Seleccionar la fecha de la cita
    seleccionarHora();//Seleccionar la hora de la cita para agregarla al arreglo

    mostrarResumen();//Muestra el resumen de la cita
}

function mostrarSeccion(){

    //Ocultar la que tenga la clase de mostrar
    const seccionAnterior = document.querySelector('.mostrar');
    if(seccionAnterior){
        seccionAnterior.classList.remove('mostrar');
    }
    //quitar la clase actual
    const tabAnterior = document.querySelector('.actual');
    if(tabAnterior){
        tabAnterior.classList.remove('actual');
    }

    //Seleccionar la seccion con el paso....
    const seccion = document.querySelector(`#paso-${paso}`);
    seccion.classList.add('mostrar');
    //REsalta el tab actual
    const tab = document.querySelector(`[data-paso="${paso}"]`)
    tab.classList.add('actual');
}

function tabs(){
    const botones = document.querySelectorAll('.tabs button');

    botones.forEach(boton => {
        boton.addEventListener('click', function(e){
            paso = parseInt(e.target.dataset.paso);

            mostrarSeccion();
            botonesPaginador();
        })
    });
}

function botonesPaginador(){
    const paginaSiguiente = document.querySelector('#siguiente');
    const paginaAnterior = document.querySelector('#anterior');

    if(paso === 1 ){
        paginaAnterior.classList.add('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }else if(paso === 3){
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.add('ocultar');
        mostrarResumen();
    }else{
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }

    mostrarSeccion();
}

function paginaSiguiente(){
    const paginaSiguiente = document.querySelector('#siguiente')
    paginaSiguiente.addEventListener('click', function(){
        if(paso >= pasoFinal) return;
        paso++;
        botonesPaginador();
    })
}

function paginaAnterior(){
    const paginaAnterior = document.querySelector('#anterior')
    paginaAnterior.addEventListener('click', function(){
        if(paso <= pasoInicial) return;
        paso--;
        botonesPaginador();
    })
}

async function consultarAPI(){

    try{
        const url = '/api/servicios';
        const resultado = await fetch(url);
        const servicios = await resultado.json();
        mostrarServicios(servicios);
    }catch (error) {
        console.log(error);
    }
}

function mostrarServicios(servicios){
    servicios.forEach(servicio => {
        const {id, nombre, precio} = servicio;

        const nombreServicio = document.createElement('P');
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `$${precio}`;
        
        const servicioDiv = document.createElement('DIV');
        servicioDiv.classList.add('servicios');
        servicioDiv.dataset.idServicio = id;
        servicioDiv.onclick = function(){
            seleccionarServicio(servicio);
        }

        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);

        document.querySelector('#servicios').appendChild(servicioDiv);
    })
}

function seleccionarServicio(servicio){
    const {servicios} = cita;
    const {id} = servicio;

    //Identificar el elemento al que se le da click
    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);
    

    //Comprobar si un servicio ya fue agregado
    if( servicios.some(agregado => agregado.id === id)){
        //Eliminarlo
        cita.servicios = servicios.filter(agregado=>agregado.id !== id ) //deja en el arreglo a todos los que cumplan la condicion
        divServicio.classList.remove('seleccionado');
    }else{
        //Agregarlo
        cita.servicios = [...servicios,servicio];//... significa que tomo una copia del arreglo de servicios anterior para poderle agregar mas servicios
        divServicio.classList.add('seleccionado');
    }
}

function idCliente(){
    const id = document.querySelector('#id').value;
    cita.id = id;
}

function nombreCliente(){
    const nombre = document.querySelector('#nombre').value;
    cita.nombre = nombre;
}

function seleccionarFecha(){
    const inputFecha = document.querySelector('#fecha');

    inputFecha.addEventListener('input', function(e){
        const dia = new Date(e.target.value).getUTCDay();
        if([0].includes(dia)){
            e.target.value = '';
            mostrarAlerta('No trabajamos los domingos', 'error', '.formulario');
        }else{
            cita.fecha = e.target.value;
        }
    
    });
}

function seleccionarHora(){
    
    const inputHora = document.querySelector('#hora');
    inputHora.addEventListener('input', function(e) {
        const horaCita = e.target.value;
        const hora = horaCita.split(":")[0];//SPLIT DIVIDE UN STRING ENTRE UN VALOR DETERMINADO Y LOS GUARDA EN UNA LISTA PARA PODER ACCEDER  A CADA VALOR CON[]

        if(hora < 10 || hora > 20){
            e.target.value = '';
            mostrarAlerta('El horario es de 10 a.m. a 9 p.m.', 'error', '.formulario');
        }else{
            cita.hora = e.target.value;
            // console.log(cita);
        }
    })

}

function mostrarResumen(){
    const resumen = document.querySelector('.contenido-resumen');

    //Limpiar el contenido de Resumen
    while(resumen.firstChild){
        resumen.removeChild(resumen.firstChild);
    }

    if (Object.values(cita).includes('') || cita.servicios.length === 0){
        mostrarAlerta('Falta informacion para reservar la cita', 'error', '.contenido-resumen', false);
        return;
    }
    
    //Formatear el DIV de resumen
    const {nombre, fecha, hora, servicios} = cita;
    //Heading de la cita
    const verificacionServicios = document.createElement('H3');
    verificacionServicios.textContent = 'Verifique sus Servicios';
    resumen.appendChild(verificacionServicios);
    //Iteracion para mostrar los servicios
    servicios.forEach(servicio => {
        const {id, nombre, precio} =servicio;
        const contenedorServicio = document.createElement('DIV');
        contenedorServicio.classList.add('contenedor-servicio');
        
        const textoServicio = document.createElement('P');
        textoServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.innerHTML = `<span>Precio:</span> $${precio}`

        contenedorServicio.appendChild(textoServicio);
        contenedorServicio.appendChild(precioServicio);
        
        resumen.appendChild(contenedorServicio);
    })

    //Heading de la informacion
    const verificacionInfo = document.createElement('H3');
    verificacionInfo.textContent = 'Verifique su Informacion';
    resumen.appendChild(verificacionInfo);

    const nombreCliente = document.createElement('P');
    nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`;
    
    //Formatear la fecha en español
    const fechaObj = new Date(fecha);
    const mes = fechaObj.getMonth();
    const dia = fechaObj.getDate() + 2;
    const year = fechaObj.getFullYear();

    const fechaUTC = new Date( Date.UTC(year, mes, dia));
    
    const opciones = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const fechaFormateada = fechaUTC.toLocaleDateString('es-CO', opciones);


    const fechaCita = document.createElement('P');
    fechaCita.innerHTML = `<span>Fecha:</span> ${fechaFormateada}`;
    
    const horaCita = document.createElement('P');
    horaCita.innerHTML = `<span>Hora:</span> ${hora}`;

    //Boton para enviar la informacion de la cita
    const botonReservar = document.createElement('button');
    botonReservar.classList.add('boton');
    botonReservar.textContent = 'Confirmar';
    botonReservar.onclick = confirmarCita;

    
    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCita);
    resumen.appendChild(horaCita);
    resumen.appendChild(botonReservar);
}

function mostrarAlerta(mensaje, tipo, elemento, desaparece = true){
    //Previene que se generen mas de una alerta
    const alertaPrevia = document.querySelector('.alerta');
    if(alertaPrevia){
        alertaPrevia.remove();
    };

    //Scripting para crear la alerta
    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo);
    
    const referencia = document.querySelector(elemento);
    referencia.appendChild(alerta);

    //ELiminar la alerta despues de cierto tiempo
    if(desaparece){
        setTimeout(() => {
            alerta.remove();
        }, 4000);
    }

}

async function confirmarCita(){

    const {nombre, fecha, hora, servicios, id} = cita
    const servicioid = servicios.map(servicio => servicio.id);

    const datos = new FormData();
    datos.append('fecha', fecha);
    datos.append('hora', hora);
    datos.append('usuarioid', id);
    datos.append('servicios', servicioid);

    try {
        //Peticion hacia la api
        const url = '/api/citas';

        const respuesta = await fetch(url, {
            method: 'POST',
            body: datos
        });
        const resultado = await respuesta.json();

        console.log(resultado.resultado);

        if(resultado.resultado){
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Cita Reservada",
                showConfirmButton: true,
            }).then(() => {
                window.location.reload();
            });
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "La cita no se guardo correctamente"
        });
    }


    

    // console.log([...datos]);

}

