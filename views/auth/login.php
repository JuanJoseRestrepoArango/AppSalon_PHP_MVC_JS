<h1 class="nombre-pagina">Login</h1>
<p class="descripcion-pagina">Inicia Sesion:</p>

<?php 
    include_once __DIR__ . "/../templates/alertas.php";
?>

<form action="/" class="formulario" method="POST">
    <div class="campo">
        <label for="email">E-mail</label>
        <input type="email" id="email" placeholder="Tu Email" name="email">
    </div>
    <div class="campo">
        <label for="password">Password</label>
        <input type="password" id="password" placeholder="Tu Contraseña" name="password">
    </div>

    <input type="submit" class="boton" value="Iniciar Sesión">
</form>

<div class="acciones">
    <a href="/crear-cuenta">¿No tienes un cuenta? Crea una</a>
    <a href="/olvide">¿Olvidaste tu contraseña? Recupera tu contraseña</a>
</div>