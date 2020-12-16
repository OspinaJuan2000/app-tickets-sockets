const socket = io();

const urlParams = new URLSearchParams(window.location.search);
const desk = urlParams.get('escritorio');
const deskHTML = document.querySelector('h1');
const btnticketHTML = document.querySelector('#attendTicket');
const ticketAttend = document.querySelector('small');

if (!desk) {
    window.location.href = 'index.html';
    throw new Error('The desk is required');
}

deskHTML.innerHTML = `Escritorio ${desk}`;

btnticketHTML.addEventListener('click', attendTicket);

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected to server');
});

function attendTicket() {
    socket.emit('attendTicket', {
        desk
    }, (resp) => {

        if(resp === 'There are not tikects') {
            alert(resp);
            ticketAttend.innerHTML = resp;
            return;
        }

        ticketAttend.innerHTML = `Ticket ${resp.number}`;
    });
};