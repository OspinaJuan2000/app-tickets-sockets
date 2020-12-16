const socket = io();
const btnNewTicket = document.querySelector('#btn_newTicket');
const newTicketHTML = document.querySelector('#lblNuevoTicket');

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected to server');
});

socket.on('currentStatus', (data) => {
    btnNewTicket.innerHTML = data.current;
});

btnNewTicket.addEventListener('click', nextTicket);

function nextTicket() {
    socket.emit('nextTicket', null, (nextTicket) => {
        btnNewTicket.innerHTML = nextTicket;
    });
};