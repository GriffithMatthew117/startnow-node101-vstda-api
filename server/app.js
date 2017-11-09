const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
var app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


var data = [{
        todoItemId: 0,
        name: 'an item',
        priority: 3,
        completed: false
    },
    {
        todoItemId: 1,
        name: 'another item',
        priority: 2,
        completed: false
    },
    {
        todoItemId: 2,
        name: 'a done item',
        priority: 1,
        completed: true
    }
];


//respond with generic object
app.get('/', function(req, res) {
    res.status('200').json({
        status: 'ok'
    });
});

// respond with all items in the dataset
app.get('/api/TodoItems', function(req, res) {
    res.send(data);
});


//GET
app.get('/api/TodoItems/:id', (req, res) => {
    var id = req.params.id;
    for (var i = 0; i < data.length; i++) {
        if (data[i].todoItemId === parseInt(id)) {
            return res.status(200).json(data[i]);
        }
    }
    res.status(404);
});

//POST
app.post('/api/TodoItems', (req, res) => {
    var newToDo = req.body;
    var newId = req.body.todoItemId;

    for (var i = 0; i < data.length; i++) {
        if (data[i].todoItemId === parseInt(newToDo)) {
            res.sendStatus(201).json(req.body);
            break;
        } else {
            data.push(req.body);
            res.status(201).json(req.body);
            break;
        }
    }
});

//DELETE
app.delete('/api/TodoItems/:id', (req, res) => {
    let id = req.params.id;
    for (var i = 0; i < data.length; i++) {
        if (data[i].todoItemId === parseInt(id)) {
            var deleted = data[i];
        };
    };
    res.json(deleted);
});

module.exports = app;