const fs = require('fs');

class Ticket {
    constructor(number, desk) {
        this.number = number;
        this.desk = desk;
    }
};

class TicketControl {
    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lastFour = [];

        let data = require('../data/data.json');

        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.lastFour = data.lastFour;
        } else {
            this.restarCount();
        }
    }

    next() {
        this.last += 1;
        this.writeInFile();

        const ticket = new Ticket(this.last, null);

        this.tickets.push(ticket);

        return this.getLastTicket();
    }

    getLastTicket() {
        return `Ticket: ${this.last}`;
    }

    getLastFourTicket() {
        return this.lastFour;
    }

    attendTicket(desk) {
        if (this.tickets.length === 0) {
            return 'There are not tikects'
        }

        const numberTicket = this.tickets.splice(0, 1);

        const ticket = new Ticket(numberTicket[0].number, desk);

        this.lastFour.unshift(ticket);

        if (this.lastFour.length > 4) {
            this.lastFour.pop();
        }
        
        this.writeInFile();

        return ticket;
    }

    restarCount() {
        this.last = 0;
        this.tickets = [];
        this.lastFour = [];
        this.writeInFile();
    }

    writeInFile() {
        const jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            lastFour: this.lastFour
        };

        fs.writeFileSync('./server/data/data.json', JSON.stringify(jsonData));
    }
}

module.exports = {
    TicketControl
}