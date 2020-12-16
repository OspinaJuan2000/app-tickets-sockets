const {
    socket
} = require('../server');
const {
    TicketControl
} = require('../classes/TicketControl.js');

const ticketControl = new TicketControl();

socket.on('connection', (client) => {

    client.on('nextTicket', (data, callback) => {
        const next = ticketControl.next();

        callback(next);

        client.broadcast.emit('currentStatus', {
            current: next
        });
    });

    client.emit('currentStatus', {
        current: ticketControl.getLastTicket(),
        lastFour: ticketControl.getLastFourTicket()
    });

    client.on('attendTicket', (data, callback) => {

        if (!data.desk) {
            return {
                ok: false,
                msj: 'The desk is required'
            };
        }

        const attendTicket = ticketControl.attendTicket(data.desk);

        callback(attendTicket);

        client.broadcast.emit('lastFour', {
            lastFour: ticketControl.getLastFourTicket()
        });
    });

});