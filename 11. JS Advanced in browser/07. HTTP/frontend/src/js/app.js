import Api from './api';
import Popup from './popup';
import Ticket from './ticket';

const api = new Api();
const popup = new Popup();

const buttonNewTask = document.querySelector('.new-task');
const popupBg = document.querySelector('.popup__bg');
const closePopupButton = document.querySelector('.close-popup');
const updateButton = document.querySelector('.update');

const tickets = document.querySelector('.tickets');
const savePopupButton = document.querySelector('.save');

const updateTickets = async () => {
  tickets.querySelectorAll('.ticket').forEach((item) => {
    item.remove();
  });

  try {
    const data = await api.getTickets('allTickets');
    data.forEach((item) => {
      const {
 id, status, name, description, created,
} = item;
      const ticket = new Ticket(id, name, description, created, status);
      const newTicket = ticket.render();

      tickets.appendChild(newTicket);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

const changeTicketStatus = async (ticketElement) => {
  setTimeout(async () => {
    const el = ticketElement.querySelector('.status');
    const ticketId = ticketElement.getAttribute('id');

    if (el.classList.contains('checked')) {
      await api.editTicket(ticketId, { status: false });

      el.innerHTML = '';
      el.classList.remove('checked');
      el.setAttribute('title', 'Отметить как выполненное');
      el.parentNode.setAttribute('style', 'opacity: 1;');
    } else {
      await api.editTicket(ticketId, { status: true });

      el.innerHTML = '&#x2714;';
      el.classList.add('checked');
      el.setAttribute('title', 'Отметить как невыполненное');
      el.parentNode.setAttribute('style', 'opacity: 0.4;');
    }
  }, 100);
};

buttonNewTask.addEventListener('click', async (e) => {
  e.preventDefault();
  popup.open();

  document.querySelector('.textarea__short').value = '';
  document.querySelector('.textarea__full').value = '';
  document.querySelector('.textarea__short').focus();

  const saveButtonClickHandler = async () => {
    const name = document.querySelector('.textarea__short').value || 'Без названия';
    const description = document.querySelector('.textarea__full').value || '-';

    await api.createNewTicket(name, description);

    savePopupButton.removeEventListener('click', saveButtonClickHandler);
    popup.close();
    setTimeout(updateTickets, 500);
  };

  savePopupButton.addEventListener('click', saveButtonClickHandler);
});

closePopupButton.addEventListener('click', (e) => {
  e.preventDefault();
  popup.close();
});

document.addEventListener('click', (e) => {
  e.preventDefault();

  if (e.target === popupBg) {
    popup.close();
  }
});

tickets.addEventListener('click', async (e) => {
  e.preventDefault();

  const ticketElement = e.target.closest('.ticket');
  if (!ticketElement) return;

  if (e.target.classList.contains('status')) {
    changeTicketStatus(ticketElement);
    return;
  }

  if (e.target.classList.contains('edit')) {
    popup.open();

    const ticketId = ticketElement.getAttribute('id');
    const ticketInfo = await api.getTicketInfo('ticketById', ticketId);

    document.querySelector('.textarea__short').value = ticketInfo.name;
    document.querySelector('.textarea__full').value = ticketInfo.description;

    const saveButtonClickHandler = async () => {
      const newName = document.querySelector('.textarea__short').value;
      const newDescription = document.querySelector('.textarea__full').value;

      await api.editTicket(ticketId, { name: newName, description: newDescription });

      ticketElement.querySelector('.name').textContent = newName;
      ticketElement.querySelector('.description').textContent = newDescription;

      popup.close();
      savePopupButton.removeEventListener('click', saveButtonClickHandler);
    };

    savePopupButton.addEventListener('click', saveButtonClickHandler);
    return;
  }

  if (e.target.classList.contains('remove')) {
    const ticketId = ticketElement.getAttribute('id');
    await api.deleteTicket(ticketId);
    ticketElement.remove();
    return;
  }

  ticketElement.querySelector('.description').classList.toggle('hidden');
});

updateButton.addEventListener('click', async (e) => {
  e.preventDefault();
  updateTickets();
});

updateTickets();
