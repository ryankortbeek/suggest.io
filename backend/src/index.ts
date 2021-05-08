import express from 'express';
import {getEvents, getMatchedEvents} from './api';
import {handleEventResponse, checkAuth} from './db_handler';

// Routing
const app = express();
const https = require('https');
const fs = require('fs');

app.use('/', (req, res, next) => {
    checkAuth(req, res, next)
})

app.get('/', (_, res) => {
    console.log('Welcome to suggest.io!')
    res.json({message: 'Welcome to suggest.io!'});
})

app.get('/events', (req, res) => {
    console.log('getting events');
    getEvents("53.53216861500475", "-113.57363822706881", "40000").then((val) => {
        res.json(val)
    })
})

app.get('/matched_events/:userId', (req, res) => {
    console.log(`getting matched events... ${req.params}`);
    res.json(getMatchedEvents(req.params['userId']));
})

app.post('/match', (req, res) => {
    console.log(req.body);
    handleEventResponse(req.body.userId, req.body.eventId, req.body.isMatch);
})

// HTTPS stuff
// const options = {
//     key: fs.readFileSync('test/fixtures/keys/key.pem'),
//     cert: fs.readFileSync('test/fixtures/keys/key-cert.pem')
// }

// https.createServer(options, app).listen(3000, () => {
//     console.log('The application is listening on port 3000!');
// })

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})