import {Request, Response, NextFunction} from 'express';

// DB stuff
const serviceAccount = require('../firebase-admin/service-account.json');

const admin = require('firebase-admin');

admin.initializeApp({
    // credential: admin.credential.applicationDefault(),
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://project-391038625508.firebaseio.com' // may not be needed
});

const db = admin.firestore();

export function checkAuth(req: Request, res: Response, next: NextFunction) {  
    if (req.headers.authtoken) {
        admin.auth().verifyIdToken(req.headers.authtoken)
            .then(() => {
            next()
        }).catch(() => {
            res.status(403).send('unauthorized');
        })
    } else {
        res.status(403).send('unauthorized');
    }
}

export async function handleEventResponse(userId: string, eventId: string, match: boolean) {
    const userRef = db.collection('users').doc(userId);
    let doc = await userRef.get();
    if (doc.exists) {
        let userData = doc.data();
        let events: Array<string>;
        if (match) {
            events = userData['matched-events'];
            events.push(eventId);
            userData['matched-events'] = events;
        } else {
            events = userData['non-matched-events'];
            events.push(eventId);
            userData['non-matched-events'] = events;
        }
        await userRef.set(userData);
        console.log('Updated user data:');
        console.log(userData);
    } else {
        console.log('User does not exist');
    }
}

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
export async function getMatchedEventIds(userId: string) {
    const userRef = db.collection('users').doc(userId);
    let doc = await userRef.get();
    if (doc.exists) {
        let userData = doc.data();
        console.log('Retreived matched event ids:');
        console.log(userData);
        console.log(`For user: ${userId}`);
        return userData['matched-events'];
    }
    console.log('User does not exist');
    return null;
}

export async function signUpUser(userId: string) {
    const res = await db.collection('users').doc(userId).set({
        'matched-events': [],
        'non-matched-events': []
    });
    console.log(res);
    return res;
}
