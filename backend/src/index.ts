import e from 'express';
import express from 'express';
import {getEvents, getMatchedEvents} from './api';
import {checkAuth, handleEventResponse, signUpUser} from './db_handler';

// Routing
const app = express();
const https = require('https');
const fs = require('fs');

// app.use('/', (req, res, next) => {
//     checkAuth(req, res, next)
// })

app.get('/', (_, res) => {
    console.log('Welcome to suggest.io!');
    res.status(200).json({message: 'Welcome to suggest.io!'});
})

app.get('/events/user/:userId/location/:latitude-:longitude-:radius', (req, res) => {
    console.log('GET events');
    console.log(req.params);
    getEvents(req.params['userId'], req.params['latitude'], req.params['longitude'], req.params['radius'])
        .then((val) => {
            if (val == null) {
                console.log('No events found for specified parameters...')
                res.status(404).end();
            } else {
                console.log(val);
                res.status(200).json(val);
            }
        }, (rej) => {
            console.log(rej);
            res.status(404).end();
        })
        .catch((e) => {
            console.log(e);
            res.status(404).end();
        });
})

app.get('/matched-events/user/:userId', (req, res) => {
    console.log('GET matched events... ' + req.params);
    console.log(req.params);
    getMatchedEvents(req.params['userId'])
        .then((val) => {
            if (val == null) {
                console.log('No matched events for specified user...');
                res.status(404).end();
            } else {
                console.log(val);
                res.status(200).json(val);
            }
        }, (rej) => {
            console.log(rej);
            res.status(404).end();
        })
        .catch((e) => {
            console.log(e);
            res.status(404).end();
        });
})

app.post('/match', (req, res) => {
    console.log('POST match');
    console.log(req.body);
    if (req.body.length == 4) {
        handleEventResponse(req.body.userId, req.body.eventId, req.body.isMatch, req.body.eventCategory)
        .then((val) => {
            if (val == null) {res.status(404).end()} 
            else {res.status(200).end()}
        }, (rej) => {
            console.log(rej);
            res.status(404).end();
        })
        .catch((e) => {
            console.log(e);
            res.status(404).end();
        });
    } else {
        handleEventResponse(req.body.userId, req.body.eventId, req.body.isMatch)
        .then((val) => {
            if (val == null) {res.status(404).end()}
            else {res.status(200).end()}
        }, (rej) => {
            console.log(rej);
            res.status(404).end();
        })
        .catch((e) => {
            console.log(e);
            res.status(404).end();
        });
    }
})

app.post('/sign-up', (req, res) => {
    console.log('POST sign up');
    console.log(req.body);
    signUpUser(req.body.userId)
        .then((val) => {
            if (val == null) {res.status(404).end()}
            else {res.status(200).end()}
        }, (rej) => {
            console.log(rej);
            res.status(404).end();
        })
        .catch((e) => {
            console.log(e);
            res.status(404).end();
        });
})

// HTTPS stuff
// const options = {
//     key: fs.readFileSync('test/fixtures/keys/key.pem'),
//     cert: fs.readFileSync('test/fixtures/keys/key-cert.pem')
// }

// https.createServer(options, app).listen(3000, () => {
//     console.log('The application is listening on port 3000!');
// })

app.listen(process.env.PORT, () => {
  console.log('The application is listening on port' + process.env.PORT);
});
