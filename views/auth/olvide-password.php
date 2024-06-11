<h1 class="nombre-pagina">Olvide la contraseña</h1>
<p class="descripcion-pagina">Restablece tu contraseña ingresando tu Email a continuación</p>

<?php 
    include_once __DIR__ . "/../templates/alertas.php";
?>

<form action="/olvide" class="formulario" method="POST">
    <div class="campo">
        <label for="email">E-mail</label>
        <input type="email" id="email" name="email" placeholder="Tu Email">
    </div>

    <input type="submit" class="boton" value="Enviar Instrucciones">
</form>

<div class="acciones">
    <a href="/">¿Ya tienes un cuenta? Inicia Sesión</a>
    <a href="/crear-cuenta">¿No tienes un cuenta? Crea una</a>
</div>