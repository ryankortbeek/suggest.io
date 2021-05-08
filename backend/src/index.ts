import express from 'express';
import {getEvents, getMatchedEvents} from './api';
import {handleEventResponse} from './db_handler';

// Routing
const app = express();
const https = require('https');
const fs = require('fs');

app.get('/', (_, res) => {
    console.log('Welcome to suggest.io!')
    res.send('Welcome to suggest.io!');
})

app.get('/events', (req, res) => {
    console.log('getting events');
    res.json(getEvents());
})

app.get('/matched_events/:userId', (req, res) => {
    console.log('getting matched events... ' + req.params);
    res.json(getMatchedEvents(req.params['userId']));
})

app.post('/match', (req, res) => {
    console.log(req.body);
    handleEventResponse(req.body.userId, req.body.eventId, req.body.isMatch);
})

var options = {
    key: fs.readFileSync('test/fixtures/keys/key.pem'),
    cert: fs.readFileSync('test/fixtures/keys/key-cert.pem')
}

https.createServer(options, app).listen(3000, () => {
    console.log('The application is listening on port 3000!');
})