import express from 'express';
import {getEvents, getMatchedEvents} from './api';
import {checkAuth, handleEventResponse, getMatchedEventIds} from './db_handler';

// Routing
const app = express();
const https = require('https');
const fs = require('fs');

// app.use('/', (req, res, next) => {
//     checkAuth(req, res, next)
// })

app.get('/', (_, res) => {
    console.log('Welcome to suggest.io!');
    res.json({message: 'Welcome to suggest.io!'});
})

app.get('/events/location/:latitude-:longitude-:radius', (req, res) => {
    console.log('GET events');
    console.log(req.params);
    getEvents(req.params['latitude'], req.params['longitude'], req.params['radius']).then((val) => {
        val == null ? res.json(`No events found for Latitude: ${req.params['latitude']}, Longitude: ${req.params['longitude']}, Radius: ${req.params['radius']}`) : res.json(val)
    })
})

app.get('/matched_events/:userId', (req, res) => {
    console.log('GET matched events... ' + req.params);
    console.log(req.params);
    getMatchedEvents(req.params['userId']).then((val) => {
        val == null ? res.json(`No matched events for user ID: ${req.params['userId']}`) : res.json(val)
    })
})

app.post('/match', (req, res) => {
    console.log('POST match');
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