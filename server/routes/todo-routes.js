const express = require('express'); //require Express npm express
const Todo = require('../model/todo'); // importando modelo Todo
const app = express();
const _ = require('underscore'); // npm para utilizar _.pick
const usuario = require('../../../node/06-restserver/server/model/usuario');


app.get('/todos', function(req, res) {

    Todo.find()
        .exec((err, todos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                todos

            })


        })

});


//filtrando por Categororia 

app.get('/todos/:categoria', function(req, res) {

    let category = req.params.categoria;


    Todo.find({ categoria: category })
        .exec((err, todos) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }


            res.json({
                ok: true,
                todos

            })

        })
})


app.post('/todo', function(req, res) {
    let datos = req.body;

    let todo = new Todo({
        tarea: datos.tarea,
        categoria: datos.categoria,
        prioridad: datos.prioridad,
        estado: datos.estado,
        complete: datos.complete
    });

    todo.save((err, todoBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })

        }

        res.json({
            ok: true,
            todo: todoBD
        });
    });
});

app.put('/todo/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['tarea', 'categoria', 'estado', 'prioridad']);

    Todo.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, todoBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            todo: todoBD
        })
    })
});

app.delete('/todo/:id', function(req, res) {

    let cambiaEstado = {
        complete: true
    }

    let id = req.params.id;

    Todo.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, todoBD) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!todoBD) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Todo no encontrado'
                }
            })
        }

        res.json({
            ok: true,
            todo: todoBD
        })
    })

});


module.exports = app;