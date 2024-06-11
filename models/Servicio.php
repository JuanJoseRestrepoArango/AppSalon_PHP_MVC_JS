<?php

namespace Model;

class Servicio extends ActiveRecord{
    //Base de datos
    protected static $tabla = 'servicios';
    protected static $columnasDB = ['id', 'nombre', 'precio'];

    public $id;
    public $nombre;
    public $precio;

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->precio = $args['precio'] ?? '';
    }

    public function validarServicio(){
        if(!$this->nombre){
            self::$alertas['error'][] = 'Debe ingresar un Nombre para el servicio';
        }
        if(!$this->precio){
            self::$alertas['error'][] = 'Debe ingresar un Precio para el nuevo servicio';
        }
        if(!is_numeric($this->precio)){
            self::$alertas['error'][] = 'Debe ingresar un Precio valido para el nuevo servicio';
        }

        return self::$alertas;
    }
}