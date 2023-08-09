const http = require('http');
const Koa = require('koa');
const cors = require('@koa/cors');
const { koaBody } = require('koa-body');

const { TicketFull, Ticket } = require('./tickets');

const ticketClass = new Ticket();
const ticketFullClass = new TicketFull();

const app = new Koa();

app.use(cors());

app.use(koaBody({
    urlencoded: true,
    multipart: true,
    json: true,
    credentials: true,
}));


app.use((ctx, next) => {
    if (ctx.request.method !== 'OPTIONS') {
        next();
        return;
    }
    ctx.response.set('Content-Type', 'application/x-www-form-urlencoded');
    ctx.response.set('Access-Control-Allow-Origin', '*');
    ctx.response.set('Access-Control-Allow-Methods', 'DELETE, PUT, PATCH, GET, POST, OPTIONS');
    ctx.response.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    ctx.response.status = 204;
    next();
});


app.use((ctx, next) => {

    const { method } = ctx.request.query;

    switch (method) {
        case 'allTickets':
            ctx.response.body = JSON.stringify(ticketClass.getAllTickets(), null, 4);
            return;
        case 'ticketById':
            if (ctx.request.method == 'GET') {
                ctx.response.body = JSON.stringify(ticketFullClass.getTicketById(ctx.request.query.id), null, 4);
            } else if (ctx.request.method == 'DELETE') {
                if (ticketFullClass.getTicketById(ctx.request.query.id)) {
                    ctx.response.body = JSON.stringify(ticketFullClass.deleteTicket(ctx.request.query.id), null, 4);
                }
            } else if (ctx.request.method === 'PUT') {
                ctx.response.body = JSON.stringify(ticketFullClass.editTicket(ctx.request.query.id, ctx.request.body), null, 4);
            }
            return;
        case 'createTicket':
            ctx.response.body = ticketFullClass.createTicket(
                ctx.request.body.name,
                ctx.request.body.description
            );
            return;
        default:
            ctx.response.status = 404;
            return;
    }
    next();
});



const port = process.env.PORT || 3000;
const server = http.createServer(app.callback())

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});