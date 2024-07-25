// import { createServer } from 'node:http';
// const { createServer } = require('node:http');

const express = require('express')
// const express = require('node_modules/express/index.js')

const app = express()


// const server = createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'text/plain' });
//     response.end('Hello World!\n');
// });

app.get('/estudiantes', function (request, response) {
    response.send('Hola Mundo!')
})

app.get('/cursos', function (request, response ) {
    response.send('¡Estos son nuestros cursos!')
})

// starts a simple http server locally on port 3000
// server.listen(3000, '127.0.0.1', () => {
//     console.log('Listening on 127.0.0.1:3000');
//     alert("hola mundo!")
// });

app.listen(8004, function(){
    console.log("Servidor está corriendo en http://127.0.0.1:8004")
})


console.log("hola mundo!")