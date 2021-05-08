"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = exports.handleEventResponse = void 0;
// DB stuff
var serviceAccount = require('../firebase-admin/service-account.json');
var admin = require('firebase-admin');
admin.initializeApp({
    // credential: admin.credential.applicationDefault(),
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://project-391038625508.firebaseio.com' // may not be needed
});
var db = admin.firestore();
function handleEventResponse(userId, eventId, match) {
}
exports.handleEventResponse = handleEventResponse;
function checkAuth(req, res, next) {
    if (req.headers.authtoken) {
        admin.auth().verifyIdToken(req.headers.authtoken)
            .then(function () {
            next();
        }).catch(function () {
            res.status(403).send('unauthorized');
        });
    }
    else {
        res.status(403).send('unauthorized');
    }
}
exports.checkAuth = checkAuth;
