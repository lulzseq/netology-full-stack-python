export default class Api {
    constructor() {
        this.host = 'http://localhost:3000/';
        this.headers = {
            'Content-Type': 'application/json',
        };
    }

    async request(queryParams, method = 'GET', body) {
        const response = await fetch(`${this.host}?${queryParams}`, {
            headers: this.headers,
            method,
            body: JSON.stringify(body),
        });

        if (response.ok) {
            return response;
        }
            throw new Error(response.statusText);
    }

    async getTickets(queryMethod) {
        const params = new URLSearchParams({
            method: queryMethod,
        });
        const response = await this.request(params);
        return response.json();
    }

    async getTicketInfo(queryMethod, id) {
        const params = new URLSearchParams({
            method: queryMethod,
            id,
        });
        const response = await this.request(params);
        const res = await response.json();
        return res;
    }

    async deleteTicket(id) {
        const params = new URLSearchParams({
            method: 'ticketById',
            id,
        });
        const response = await this.request(params, 'DELETE');
        const res = await response.json();
        return res;
    }

    async createNewTicket(name, description) {
        const params = new URLSearchParams({
            method: 'createTicket',
        });
        const body = {
            name,
            description,
        };
        const response = await this.request(params, 'POST', body);
        const res = await response.json();
        return res;
    }

    async editTicket(id, body) {
        const params = new URLSearchParams({
            method: 'ticketById',
            id,
        });
        const response = await this.request(params, 'PUT', body);
        const res = await response.json();
        return res;
    }
}
