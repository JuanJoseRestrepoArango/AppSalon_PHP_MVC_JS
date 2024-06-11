<?php

namespace Model;

class Usuario extends ActiveRecord {
    //Base de datos
    protected static $tabla = 'usuarios';
    protected static $columnasDB = ['id', 'nombre', 'apellido', 'email', 'password', 'telefono', 'admin', 'confirmado', 'token'];

    public $id;
    public $nombre;
    public $apellido;
    public $email;
    public $password;
    public $telefono;
    public $admin;
    public $confirmado;
    public $token;

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->apellido = $args['apellido'] ?? '';
        $this->email = $args['email'] ?? '';
        $this->password = $args['password'] ?? '';
        $this->telefono = $args['telefono'] ?? '';
        $this->admin = $args['admin'] ?? 0;
        $this->confirmado = $args['confirmado'] ?? 0;
        $this->token = $args['token'] ?? '';
    }

    //Mensajes de validacion para la creacion de una cuenta
    public function validarNuevoUsuario(){
        if(!$this->nombre){
            self::$alertas['error'][] = "Debe llenar el campo(Nombre)";
        }
        if(!$this->apellido){
            self::$alertas['error'][] = "Debe llenar el campo(Apellido)";
        }
        if(!$this->email){
            self::$alertas['error'][] = "Debe llenar el campo(E-mail)";
        }
        if(!$this->telefono){
            self::$alertas['error'][] = "Debe llenar el campo(Telefono)";
        }
        if(!$this->password){
            self::$alertas['error'][] = "Debe llenar el campo(Contraseña)";
        }
        if(strlen($this->password) < 8){
            self::$alertas['error'][] = "La Contraseña debe tener al menos 8 caracteres";
        }

        return self::$alertas;
    }

    //Validar login
    public function validarLogin(){
        if(!$this->email){
            self::$alertas['error'][] = 'El e-mail es obligatorio';
        }
        if(!$this->password){
            self::$alertas['error'][] = 'La Contraseña es obligatorio';
        }

        return self::$alertas;
    }

    //Validar Email
    public function validarEmail(){
        if(!$this->email){
            self::$alertas['error'][] = 'El e-mail es obligatorio';
        }

        return self::$alertas;

    }

    //Revisar si el usuario ya existe en la BD
    public function existeUsuario(){
        $query = " SELECT * FROM " . self::$tabla . " WHERE email = '" . $this->email . "' LIMIT 1";

        $resultado = self::$db->query($query);

        if($resultado->num_rows){
            self::$alertas['error'][] = "El Usuario ya esta registrado";
        }

        return $resultado;
    }

    //Hashear password
    public function hashPassword(){
        $this->password = password_hash($this->password, PASSWORD_BCRYPT);
    }

    //Crear token
    public function crearToken(){
        $this->token = uniqid();
    }

    //Comprobar la contraseña
    public function comprobarPasswordAndVerificado($password){
        $resultado = password_verify($password, $this->password);

        if(!$resultado||!$this->confirmado){
            self::$alertas['error'][] = "Contraseña incorrecta o no se ha confirmado la cuenta";
        }else{
            return true;
        }
    }

    //Validar contraseña
    public function validarPassword(){      
        if(!$this->password){
            self::$alertas['error'][] = 'La Contraseña es obligatorio';
        }
        if(strlen($this->password) < 8){
            self::$alertas['error'][] = "La Contraseña debe tener al menos 8 caracteres";
        }

        return self::$alertas;
    }


}