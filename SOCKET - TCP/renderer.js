document.getElementById('connect-button').addEventListener('click', () => {
    const host = document.getElementById('host').value;
    const port = parseInt(document.getElementById('port').value, 10);

    window.electronAPI.connectToServer(host, port);

    window.electronAPI.onStatus((status) => {
        document.getElementById('status').innerText = status;
    });

    window.electronAPI.onData((data) => {
        let str = data;
        if (str.match('Quadrado')){
            let split = str.split(': ')
            document.getElementById('quadrado').innerText = 'O quadrado do número enviado acima é: ' + split[1];
            return;
        }

        document.getElementById('response').innerText = data;
    });
});

document.getElementById('calculaQuadrado').addEventListener('click', () => {
    const numero = document.getElementById('numero').value;

    window.electronAPI.sendMessage(numero.toString());
})