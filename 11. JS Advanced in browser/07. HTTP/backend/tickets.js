const fs = require('fs');
const { deserialize } = require('v8');

class TicketFull {
  constructor() {
    this.jsonFile = './data.json';
    this.tickets = JSON.parse(fs.readFileSync(this.jsonFile, 'utf8'));
  }

  getTicketById(id) {
    const ticket = this.tickets.find(ticket => ticket.id == id);
    
    if (!ticket) {
      return 'Ticket not found';
    }
    return ticket;
  }

  createTicket(name, description) {
    const newTicket = {
      id: this.tickets.length !== 0 ? this.tickets[this.tickets.length - 1].id + 1 : 0,
      name: name,
      description: description,
      status: false,
      created: new Date().toLocaleDateString('ru-RU') + ' ' + new Date().toLocaleTimeString('ru-RU').substring(0, 5),
    };
    this.tickets.push(newTicket);
    fs.writeFileSync(this.jsonFile, JSON.stringify(this.tickets, null, 4));
    return newTicket;
  }

  editTicket(id, body) {
    const ticketIndex = this.tickets.findIndex(ticket => ticket.id == id);

    if (ticketIndex === -1) {
      return 'Ticket not found';
    }

    if (body.status !== undefined) {
      this.tickets[ticketIndex].status = body.status;
    }
    if (body.name !== undefined) {
      this.tickets[ticketIndex].name = body.name;
    }
    if (body.description !== undefined) {
      this.tickets[ticketIndex].description = body.description;
    }

    fs.writeFileSync(this.jsonFile, JSON.stringify(this.tickets, null, 4));
    return this.tickets[ticketIndex];
  }

  deleteTicket(id) {
    for (let i = 0; i < this.tickets.length; i++) {
      if (this.tickets[i].id == id) {
        this.tickets.splice(i, 1);
        fs.writeFileSync(this.jsonFile, JSON.stringify(this.tickets, null, 4));
        return this.tickets;
      }
    }
    return 'Ticket not found';
  }
}


class Ticket extends TicketFull {
  getAllTickets() {
    const arr = [];
    for (let t of this.tickets) {
      arr.push({
        id: t.id,
        name: t.name,
        description: t.description,
        status: t.status,
        created: t.created,
      });
    }
    return arr;
  }
}


module.exports = { TicketFull, Ticket };
