<?php

function debuguear($variable) : string {
    echo "<pre>";
    var_dump($variable);
    echo "</pre>";
    exit;
}

// Escapa / Sanitizar el HTML
function s($html) : string {
    $s = htmlspecialchars($html);
    return $s;
}
//Buscar el ultimo valor de la 
function ultimoValor(string $actual, string $proximo):bool{
    if($actual !== $proximo){
        return true;
    }
    return false;
}

// FUncion para revisar que el usuario este autenticado

function esAut() : void{
    if (!isset($_SESSION['login'])){
        header('Location:/');
    }
}
//Funcion para revisar si el usuario es administrador y esta autenticado

function isAdmin() : void{
    if(!isset($_SESSION['admin'])){
        header('Location:/');
    }
}   
