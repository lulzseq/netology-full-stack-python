export default class Message {
    constructor(username, date, text) {
        this.username = username;
        this.date = date;
        this.text = text;
    }

    create() {
        const newMessage = document.createElement('div');
        newMessage.classList.add('chat__message');

        const newUsername = document.createElement('span');
        newUsername.classList.add('chat__username');
        newUsername.textContent = this.username;

        const newDate = document.createElement('span');
        newDate.classList.add('chat__date');
        newDate.textContent = `, ${this.date}`;

        const newMesageInfo = document.createElement('div');

        newMesageInfo.appendChild(newUsername);
        newMesageInfo.appendChild(newDate);

        const newText = document.createElement('span');
        newText.classList.add('chat__text');
        newText.textContent = this.text;

        newMessage.appendChild(newMesageInfo);
        newMessage.appendChild(newText);

        return newMessage;
    }
}
