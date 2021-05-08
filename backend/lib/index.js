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
app.use('/', function (req, res, next) {
    db_handler_1.checkAuth(req, res, next);
});
app.get('/', function (_, res) {
    console.log('Welcome to suggest.io!');
    res.json({ message: 'Welcome to suggest.io!' });
});
app.get('/events', function (req, res) {
    console.log('getting events');
    res.json(api_1.getEvents());
});
app.get('/matched_events/:userId', function (req, res) {
    console.log('getting matched events... ' + req.params);
    res.json(api_1.getMatchedEvents(req.params['userId']));
});
app.post('/match', function (req, res) {
    console.log(req.body);
    db_handler_1.handleEventResponse(req.body.userId, req.body.eventId, req.body.isMatch);
});
app.post('/sign_up', function (req, res) {
    console.log(req.body);
    db_handler_1.handleEventResponse(req.body.userId, req.body.eventId, req.body.isMatch);
});
var options = {
    key: fs.readFileSync('test/fixtures/keys/key.pem'),
    cert: fs.readFileSync('test/fixtures/keys/key-cert.pem')
};
// https.createServer(options, app).listen(3000, () => {
// console.log('The application is listening on port 3000!');
// })
// app.listen(3000, hostname, () => {
app.listen(3000, function () {
    console.log('The application is listening on port 3000!');
});
