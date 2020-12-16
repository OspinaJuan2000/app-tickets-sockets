const socket = io();

const ticket1 = document.querySelector('#lblTicket1');
const ticket2 = document.querySelector('#lblTicket2');
const ticket3 = document.querySelector('#lblTicket3');
const ticket4 = document.querySelector('#lblTicket4');

const desk1 = document.querySelector('#lblEscritorio1');
const desk2 = document.querySelector('#lblEscritorio2');
const desk3 = document.querySelector('#lblEscritorio3');
const desk4 = document.querySelector('#lblEscritorio4');

const ticketsHTML = [ticket1, ticket2, ticket3, ticket4];

const desksHTML = [desk1, desk2, desk3, desk4];

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected to server');
});

socket.on('currentStatus', (data) => {
    return updateDesksAndTickets(data.lastFour);
});

socket.on('lastFour', (data) => {

    const audio = new Audio('audio/new-ticket.mp3');
    audio.play();

    return updateDesksAndTickets(data.lastFour);
});

function updateDesksAndTickets(lastFour) {
    lastFour.forEach((last, index) => {
        ticketsHTML[index].innerHTML = `Ticket: ${last.number}`
        desksHTML[index].innerHTML = `Desk: ${last.desk}`
    });
}