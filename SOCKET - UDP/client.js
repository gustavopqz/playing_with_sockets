var udp = require('dgram');
var readline = require('readline');

var client = udp.createSocket('udp4');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

client.on('message', function (msg, info) {
    console.log('Dados recebidos do servidor: ' + msg.toString());
    console.log('Recebido %d bytes from %s:%d\n', msg.length, info.address, info.port);
});

function sendMessage() {
    rl.question('Digite uma mensagem para enviar: ', function (message) {
        var data = Buffer.from(message);

        client.send(data, 2222, 'localhost', function (error) {
            if (error) {
                client.close();
            } else {
                console.log('Dados enviados!!');
                client.once('message', (mensagem) => {
                    // console.log(`Recebido do servidor: ${mensagem}`);
                    sendMessage(); // Permite o envio de outra mensagem
                });
            }
        });
    });
}

sendMessage(); // Inicia o processo de envio de mensagens