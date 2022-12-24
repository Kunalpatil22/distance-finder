require('dotenv').config();
const { SerialPort, ReadlineParser } = require('serialport');
const serialport = new SerialPort({ path: '/dev/ttyACM0', baudRate: 9600 });
const parser = serialport.pipe(new ReadlineParser({ delimiter: '\r\n' }));
const express = require('express');
const http = require('http');
const io = require('socket.io');
const path = require('path');

// Constants
const port = process.env.PORT || 3000;

// HTTP and Web Socket server instances.
const app = express();
const httpServer = http.createServer(app);
const ioServer = new io.Server(httpServer);

// Serving index.html file for the client.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

// listner for client connections on socket.
ioServer.on('connection', (socket) => {
    // Serialport parser to parse data from buffer to text.
    parser.on('data', (chunk) => {
        const data = { value: chunk };
        // emitting data to the client.
        socket.emit('data', data);
    })
})

// Server start
httpServer.listen(port, console.log(`Listening on port: ${port}`));
