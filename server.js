const express = require('express');
const app = express(); //Llama a todas las funciones de express.
 app.listen(3003, function () {
     console.log('servidor encendido');
 });
app.use(express.static('public'));
