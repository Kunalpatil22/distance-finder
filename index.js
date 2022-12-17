const { SerialPort, ReadlineParser } = require('serialport');

const serialport = new SerialPort({path: '/dev/ttyACM0', baudRate: 9600});

const parser = serialport.pipe(new ReadlineParser({delimiter: '\r\n'}))

parser.on('data', (chunk) => {
    [value, unit] = chunk.split(" ");
    const data = { value, unit };
    console.log(data)
})