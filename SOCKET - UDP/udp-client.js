const udp = require('dgram');
const WebSocket = require('ws');

// Cria um socket UDP
const client = udp.createSocket('udp4');

// Configura o WebSocket Server
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Novo cliente conectado via WebSocket.');

    // Quando o WebSocket recebe uma mensagem do cliente web
    ws.on('message', (message) => {
        console.log('Mensagem recebida do frontend: ', message);

        // Converte a mensagem para buffer e envia ao servidor UDP
        const data = Buffer.from(message);
        client.send(data, 2222, 'localhost', (error) => {
            if (error) {
                client.close();
                console.log('Erro ao enviar mensagem UDP:', error);
            } else {
                console.log('Mensagem UDP enviada com sucesso!');
            }
        });
    });

    // Quando o cliente UDP recebe uma resposta do servidor
    client.on('message', (msg, info) => {
        console.log('Resposta recebida do servidor UDP:', msg.toString());

        // Envia a resposta ao cliente WebSocket
        ws.send(msg.toString());
    });

    // Quando o WebSocket é fechado
    ws.on('close', () => {
        console.log('Cliente desconectado do WebSocket.');
    });
});