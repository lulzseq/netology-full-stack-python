export default class Ticket {
  constructor(id, name, description, created, status = false) {
    this.id = id;
    this.status = status;
    this.name = name;
    this.description = description;
    this.created = created;
  }

  render() {
    const ticketElement = document.createElement('div');
    ticketElement.classList.add('ticket');
    ticketElement.setAttribute('id', this.id);

    const ticketStatusElement = document.createElement('button');
    ticketStatusElement.classList.add('status');
    ticketStatusElement.setAttribute('title', 'Отметить как выполненное');
    if (this.status) {
      ticketStatusElement.classList.add('checked');
      ticketStatusElement.innerHTML = '&#x2714;';
      ticketStatusElement.setAttribute('title', 'Отметить как невыполненное');
      ticketElement.setAttribute('style', 'opacity: 0.4;');
    }

    const ticketTextElement = document.createElement('div');
    ticketTextElement.classList.add('ticket_text');

    const ticketNameElement = document.createElement('span');
    ticketNameElement.classList.add('name');
    ticketNameElement.innerHTML = this.name;

    const ticketDescriptionElement = document.createElement('span');
    ticketDescriptionElement.classList.add('description', 'hidden');
    ticketDescriptionElement.innerHTML = this.description;

    ticketTextElement.appendChild(ticketNameElement);
    ticketTextElement.appendChild(ticketDescriptionElement);

    const ticketDateElement = document.createElement('span');
    ticketDateElement.classList.add('date');
    ticketDateElement.innerHTML = this.created;

    const ticketEditElement = document.createElement('button');
    ticketEditElement.classList.add('edit');
    ticketEditElement.innerHTML = '&#9998;';

    const ticketRemoveElement = document.createElement('button');
    ticketRemoveElement.classList.add('remove');
    ticketRemoveElement.innerHTML = 'x';

    ticketElement.appendChild(ticketStatusElement);
    ticketElement.appendChild(ticketTextElement);
    ticketElement.appendChild(ticketDateElement);
    ticketElement.appendChild(ticketEditElement);
    ticketElement.appendChild(ticketRemoveElement);

    return ticketElement;
  }
}
