<h1 class="nombre-pagina">Crear Nueva Cita</h1>
<p class="descripcion-pagina">Elige tus Servicios a continuación</p>

<?php 
    include_once __DIR__ . '../../templates/barra.php';
?>
<div class="app">
    <nav class="tabs">
        <button class="actual" type="button" data-paso="1">Servicios</button>
        <button type="button" data-paso="2">Información Cita</button>
        <button type="button" data-paso="3">Verificacion</button>
    </nav>
    <div id="paso-1" class="seccion">
        <h2>Servicios</h2>
        <p class="text-center">Elige tus servicios a continuación</p>
        <div class="listado-servicios" id="servicios">

        </div>
    </div>
    <div id="paso-2" class="seccion">
        <h2>Tus Datos y Cita</h2>
        <p class="text-center">Ingresa tus datos y la fecha para tu cita</p>
        <form class="formulario">
            <div class="campo">
                <label for="nombre">Nombre</label>
                <input type="text" id="nombre" placeholder="Tu Nombre" value="<?php echo $nombre; ?>" disabled >
            </div>
            <div class="campo">
                <label for="fecha">Fecha</label>
                <input type="date" id="fecha" min="<?php echo date('Y-m-d'); ?>">
            </div>
            <div class="campo">
                <label for="hora">Hora</label>
                <input type="time" id="hora" >
            </div>
            <input type="hidden" id="id" value="<?php echo $id; ?>">
        </form>
        <div class="listado-servicios" id="servicios">

        </div>
    </div>
    <div id="paso-3" class="seccion contenido-resumen">
        <h2>Verificacion</h2>
        <p class="text-center">Verifica que la información este correcta</p>
        <div class="listado-servicios" id="servicios">

        </div>
    </div>    

    <div class="paginacion">
        <button class="boton" id="anterior">&laquo;</button>
        <button class="boton" id="siguiente">&raquo;</button>
    </div>
</div>

<?php
    $script = "
        <script src='https://cdn.jsdelivr.net/npm/sweetalert2@11'></script>
        <script src='build/js/app.js'></script>
    ";
?>