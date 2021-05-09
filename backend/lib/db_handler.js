"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpUser = exports.getMatchedEventIds = exports.handleEventResponse = exports.checkAuth = void 0;
// DB stuff
var serviceAccount = require('../firebase-admin/service-account.json');
var admin = require('firebase-admin');
admin.initializeApp({
    // credential: admin.credential.applicationDefault(),
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://project-391038625508.firebaseio.com' // may not be needed
});
var db = admin.firestore();
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
function handleEventResponse(userId, eventId, match) {
    return __awaiter(this, void 0, void 0, function () {
        var userRef, doc, userData, events;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userRef = db.collection('users').doc(userId);
                    return [4 /*yield*/, userRef.get()];
                case 1:
                    doc = _a.sent();
                    if (!doc.exists) return [3 /*break*/, 3];
                    userData = doc.data();
                    events = void 0;
                    if (match) {
                        events = userData['matched-events'];
                        events.push(eventId);
                        userData['matched-events'] = events;
                    }
                    else {
                        events = userData['non-matched-events'];
                        events.push(eventId);
                        userData['non-matched-events'] = events;
                    }
                    return [4 /*yield*/, userRef.set(userData)];
                case 2:
                    _a.sent();
                    console.log('Updated user data:');
                    console.log(userData);
                    return [3 /*break*/, 4];
                case 3:
                    console.log('User does not exist');
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.handleEventResponse = handleEventResponse;
/**
 * Need to call this as seen below...
 * getMatchedEventIds(userId)
 *     .then((value) => {
 *          // handle return value here
 *     }, (reject) => {
 *          // handle rejection here
 *     })
 *     .catch((e) => {// handle error here})
 */
function getMatchedEventIds(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var userRef, doc, userData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userRef = db.collection('users').doc(userId);
                    return [4 /*yield*/, userRef.get()];
                case 1:
                    doc = _a.sent();
                    if (doc.exists) {
                        userData = doc.data();
                        console.log('Retreived matched event ids:');
                        console.log(userData);
                        console.log("For user: " + userId);
                        return [2 /*return*/, userData['matched-events']];
                    }
                    console.log('User does not exist');
                    return [2 /*return*/, null];
            }
        });
    });
}
exports.getMatchedEventIds = getMatchedEventIds;
function signUpUser(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.collection('users').doc(userId).set({
                        'matched-events': [],
                        'non-matched-events': []
                    })];
                case 1:
                    res = _a.sent();
                    console.log(res);
                    return [2 /*return*/, res];
            }
        });
    });
}
exports.signUpUser = signUpUser;
