<h1 class="nombre-pagina">Recuparar Contraseña</h1>


<?php
    include_once __DIR__ . '../../templates/alertas.php';
?>
<?php if($error === false){?>
<p class="descripcion-pagina">Ingresa tu nueva contraseña a continuación:</p>
<form class="formulario" method="POST">
    <div class="campo">
        <label for="password">Contraseña:</label>
        <input type="password" id="password" name="password" placeholder="Ingresa tu nueva contraseña" >
    </div>

    <input type="submit" class="boton"  value="Guardar Nuevo Password">
</form>
<?php }; ?>
<div class="acciones">
    <a href="/">¿Ya tienes un cuenta? Inicia Sesión</a>
    <a href="/crear-cuenta">¿No tienes un cuenta? Crea una</a>
</div>
