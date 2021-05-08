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

export async function handleEventResponse(userId: string, eventId: string, match: boolean) {
    const userData = db.collections('users').doc(userId);
    let data = await userData.get();
    if (!data.exists) {
        console.log('User does not exist');
    } else {
        let events: Array<string>;
        if (match) {
            events = data['matched-events'];
            events.push(eventId);
            data['matched-events'] = events;
        } else {
            events = data['non-matched-events'];
            events.push(eventId);
            data['non-matched-events'] = events;
        }
        await userData.set(data);
        console.log(`Updated user data: ${data}`);
    }
}

export function checkAuth(req: Request, res: Response, next: NextFunction) {  
    if (req.headers.authtoken) {
        admin.auth().verifyIdToken(req.headers.authtoken)
            .then(() => {
            next()
        }).catch(() => {
            res.status(403).send('unauthorized')
        })
    } else {
        res.status(403).send('unauthorized')
    }
}