const http = require('http');
const Koa = require('koa');
const cors = require('@koa/cors');
const { koaBody } = require('koa-body');
const WS = require('ws');

let chat = [];
let sessions = [];

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
    ctx.response.body = 'Server is running';
    next();
})

const port = process.env.PORT || 3000;
const server = http.createServer(app.callback())

const wsServer = new WS.Server({
    server
})

wsServer.on('connection', (ws) => {

    sessions.push({ user: '', connection: ws })

    ws.on('close', function () {

        const id = sessions.findIndex(session => session.connection === ws)
        const disconnectedUser = sessions[id].user

        sessions.splice(id, 1);

        sessions.forEach(session => {
            session.connection.send(JSON.stringify({
                userDisconnect: disconnectedUser
            }));
        })

    })

    ws.on('message', (msg) => {

        const session = sessions.find(session => session.connection === ws)
        const sessionUser = session.user
        const jsonData = JSON.parse(msg)

        if (jsonData.hasOwnProperty('available')) {
            const newUsername = jsonData.username
            const userExists = chat.some(user => user.username === newUsername);
            const available = !userExists;

            if (!userExists) {
                chat.push({
                    username: newUsername,
                    status: 'online',
                    messages: []
                });

                sessions.forEach(session => {
                    if (session.connection === ws) {
                        session.user = newUsername;
                    }
                })
            }

            Array.from(wsServer.clients)
                .filter(client => client.readyState === WS.OPEN)
                .forEach(client => client.send(JSON.stringify({
                    username: newUsername,
                    available: available
                })));

            return
        }

        const messages = chat.find(user => user.username === sessionUser).messages
        const message = JSON.parse(msg).message

        const date = new Date().toLocaleTimeString('ru-RU').substring(0, 5) + ' ' + new Date().toLocaleDateString('ru-RU')
        const eventData = JSON.stringify({ sessionUser, date, message })

        messages.push({ date, message })

        Array.from(wsServer.clients)
            .filter(client => client.readyState === WS.OPEN)
            .forEach(client => client.send(eventData));
    })

    sessions.forEach(session => {
        ws.send(JSON.stringify({ "user": session.user }))
    })

    chat.forEach(user => user.messages.forEach(message => {
        ws.send(JSON.stringify({ sessionUser: user.username, date: message.date, message: message.message }))
    }))
})

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});