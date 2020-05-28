import openSocket from "socket.io-client";

const socket = openSocket('https://localhost:3000');
export const sendMessage = (message: any) => {
    console.log('sending ' + message.event + ' message to server');
    socket.emit('message', message);
    socket.on('message', (message:any) => {
        console.log('Message received: ' ,message);
    });
};

