"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var api_1 = require("./api");
var db_handler_1 = require("./db_handler");
// Routing
var app = express_1.default();
var https = require('https');
var fs = require('fs');
// app.use('/', (req, res, next) => {
//     checkAuth(req, res, next)
// })
app.get('/', function (_, res) {
    console.log('Welcome to suggest.io!');
    res.json({ message: 'Welcome to suggest.io!' });
});
app.get('/events/location/:latitude-:longitude-:radius', function (req, res) {
    console.log('GET events');
    console.log(req.params);
    api_1.getEvents(req.params['latitude'], req.params['longitude'], req.params['radius']).then(function (val) {
        res.json(val);
    });
});
app.get('/matched-events/user/:userId', function (req, res) {
    console.log('GET matched events');
    console.log(req.params);
    res.json(api_1.getMatchedEvents(req.params['userId']));
});
app.post('/match', function (req, res) {
    console.log('POST match');
    console.log(req.body);
    db_handler_1.handleEventResponse(req.body.userId, req.body.eventId, req.body.isMatch);
});
app.get('/user/:userId', function (req, res) {
    console.log('matched event ids');
    db_handler_1.getMatchedEventIds(req.params['userId']).then(function (val) { console.log(val); }, function (rej) { console.log(rej); }).catch(function (e) { return console.log(e); });
});
// HTTPS stuff
// const options = {
//     key: fs.readFileSync('test/fixtures/keys/key.pem'),
//     cert: fs.readFileSync('test/fixtures/keys/key-cert.pem')
// }
// https.createServer(options, app).listen(3000, () => {
//     console.log('The application is listening on port 3000!');
// })
app.listen(3000, function () {
    console.log('The application is listening on port 3000!');
});
