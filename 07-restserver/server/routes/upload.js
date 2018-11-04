const express = require('express');
const fileUpload = require('express-fileupload');
const Usuario = require('../models/usuario.js');
const Categoria = require('../models/categoria.js');
const app = express();

const fs = require('fs');
const path = require('path');


app.use(fileUpload()); //esto guarda el archivo en la variable 'files'.


app.put('/upload/:tipo/:id', (req, res) => {

    let tipo = req.params.tipo;
    let id = req.params.id;

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err
        });
    }


    //Obtenemos el nombre del archivo
    let archivo = req.files.archivo;
    //Separamos el nombre de la extencion
    let = nombreArchivo = archivo.name.split('.');
    //Guardamos el nombre del archivo
    let nombreSoloArchivo = nombreArchivo[0];
    //Guardamos la extencion del archivo
    let extencionSolaArchivo = nombreArchivo[1];



    //Extenciones válidas para subir
    let extencionesValidas = ['jpg', 'jpeg', 'png', 'gif'];

    if (extencionesValidas.indexOf(extencionSolaArchivo) < 0) {

        return res.status(400).json({
            ok: false,
            err: {
                message: `El formato '${extencionSolaArchivo}' no es un formato permitido`,
                resolucion: `Los formatos válidos son: ${extencionesValidas.join(', ')}`
            }
        });
    }



    //Tipos válidos para subir
    let tiposValidos = ['usuario', 'categoria'];

    if (tiposValidos.indexOf(tipo) < 0) {

        return res.status(400).json({
            ok: false,
            err: {
                message: `El Tipo '${tipo}' no es válido`,
                resolucion: `Los Tipos válidos son: ${tiposValidos.join(', ')}`
            }
        });

    }


    //Generamos el nuevo nombre de archivo para que sea unico y no se pise con otros archivos
    let nuevoNombreArchivo = `${nombreSoloArchivo}-${id}-${new Date().getTime()}-${new Date().getMilliseconds()}.${extencionSolaArchivo}`;

    archivo.mv(`uploads/${tipo}/${nuevoNombreArchivo}`, (err) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        switch (tipo){
            case 'usuario':
            imagenUsuario(id, res, nuevoNombreArchivo);
            break;

            case 'categoria':
            imagenCategoria(id, res, nuevoNombreArchivo);
            break;
        }

    });
});



//===============================================================//
//Subir Imagen de Usuario
//===============================================================//
function imagenUsuario(id, res, nuevoNombreArchivo) {

    Usuario.findById(id, (err, usuarioDB) => {
        if (err) {
            borrarImagenAnterior(nuevoNombreArchivo, 'usuario');
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Este usuario no existe'
                }
            });
        }
        if (!usuarioDB) {
            borrarImagenAnterior(nuevoNombreArchivo, 'usuario');
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Este usuario no existe'
                }
            });
        }

        //Esta funcion Borra la imagen que ya tenia carga el usuario (para que no sea cumulen imagenes)
        borrarImagenAnterior(usuarioDB.img, 'usuario');


        usuarioDB.img = nuevoNombreArchivo;

        usuarioDB.save((err, usuarioGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.json({
                ok: true,
                message: `Imagen del Usuario '${usuarioDB.nombre}' guardad con éxito`,
                usuario: usuarioGuardado,
                img: nuevoNombreArchivo

            });
        });
    });
};


//===============================================================//
//Subir Imagen de Categoría
//===============================================================//
function imagenCategoria(id, res, nuevoNombreArchivo) {

    Categoria.findById(id, (err, categoriaDB) => {

        if (err) {
            borrarImagenAnterior(nuevoNombreArchivo, 'categoria');
            return res.status(500).json({
                ok: false,
                err : {
                    message: 'Esta categoria no existe'
                }
            });
        }

        if (!categoriaDB) {
            borrarImagenAnterior(nuevoNombreArchivo, 'categoria');
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Esta categoria no existe'
                }
            });
        }

        //Esta funcion Borra la imagen que ya tenia carga el usuario (para que no sea cumulen imagenes)
        borrarImagenAnterior(categoriaDB.img, 'categoria');


        categoriaDB.img = nuevoNombreArchivo;

        categoriaDB.save((err, categoriaGuardada) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            return res.json({
                ok: true,
                message: `Imagen de  la Categoría '${categoriaDB.nombre}' guardad con éxito`,
                usuario: categoriaGuardada,
                img: nuevoNombreArchivo

            });
        });
    });
};



//===============================================================//
//Borrar imagen anterior una vez que subimos una nueva imagen
//===============================================================//
function borrarImagenAnterior(nombreImagen, tipo) {

    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);
    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
    }

};



module.exports = app;