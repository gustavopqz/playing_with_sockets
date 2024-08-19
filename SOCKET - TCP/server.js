const net = require('net');

// Cria o servidor TCP
const server = net.createServer((socket) => {
    console.log('Cliente conectado');

    // Envia uma mensagem para o cliente quando ele se conecta
    socket.write('Bem-vindo ao servidor!\n');

    // Recebe dados do cliente
    socket.on('data', (data) => {
        console.log('Recebido do cliente:', data.toString());

        try {
            let numero = parseInt(data);
            socket.write('Quadrado: ' + (numero * numero).toString())
        } catch (error) {
            
        }

        // Opcionalmente, pode enviar uma resposta ao cliente após receber dados
        // socket.write('Mensagem recebida meu patrão!' + '\n');
    });

    // Lida com a desconexão do cliente
    socket.on('end', () => {
        console.log('Cliente desconectado');
    });

    // Lida com erros
    socket.on('error', (err) => {
        console.error('Erro:', err);
    });
});

// Define a porta e o endereço para o servidor
const PORT = 5432;
const HOST = '127.0.0.1';

server.listen(PORT, HOST, () => {
    console.log(`Servidor rodando em ${HOST}:${PORT}`);
});