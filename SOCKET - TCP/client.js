const net = require('net');
const readline = require('readline')

// Configurações do cliente
const PORT = 5432;
const HOST = '127.0.0.1';

// Cria o cliente TCP
const client = new net.Socket();

// Readline
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// Conecta ao servidor
client.connect(PORT, HOST, () => {
    console.log('Conectado ao servidor');
    client.write('Olá, servidor!');

    // rl.addListener('line', line => {
    //     client.write(line);
    // })
});

// Recebe dados do servidor
client.on('data', (data) => {
    console.log('Recebido do servidor:', data.toString());

    // Opcionalmente, pode enviar outra mensagem ou fechar a conexão
    // client.destroy(); // Fecha a conexão
});

// Lida com a desconexão
client.on('close', () => {
    console.log('Conexão fechada');
});

client.on('end', () => {
    console.log('Conexão encerrada pelo servidor');
    // rl.close();
})

// Lida com erros
client.on('error', (err) => {
    console.error('Erro:', err);
    // rl.close();
});