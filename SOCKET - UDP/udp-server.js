var udp = require('dgram');
var server = udp.createSocket('udp4');

server.on('error', function (error) {
    console.log('Error: ' + error);
    server.close();
});

server.on('message', function (msg, info) {
    console.log('Dados recebidos do cliente: ' + msg.toString());
    console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port);

    server.send(msg, info.port, 'localhost', function (error) {
        if (error) {
            server.close();
        } else {
            console.log('Dados enviados!!!');
        }
    });
});

server.on('listening', function () {
    var address = server.address();
    console.log('Servidor ouvindo na porta ' + address.port);
    console.log('Server ip: ' + address.address);
    console.log('Server é IP4/IP6: ' + address.family);
});

server.on('close', function () {
    console.log('Socket está fechado!');
});

server.bind(2222);