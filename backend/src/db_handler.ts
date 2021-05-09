import {Request, Response, NextFunction} from 'express';

export const DEFAULT_WEIGHTING: number = 61;
export const MIN_WEIGHT: number = 11;
const MAX_WEIGHT: number = 111;
const DELTA: number = 10;

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

export async function handleEventResponse(userId: string, eventId: string, match: boolean, category?: string) {
    const userRef = db.collection('users').doc(userId);
    let doc = await userRef.get();
    if (doc.exists) {
        let userData = doc.data();
        let match_status_key = (match) ? 'matched-events' : 'non-matched-events';
        // Updates events
        let events: Array<string> = userData[match_status_key];
        events.push(eventId);
        userData[match_status_key] = events;
        // Updates weights if a category is specified
        if (category != null) {
            let category_weights = userData['category-weights'];
            let delta = (match) ? DELTA : -DELTA;
            if (match) {
                if (category_weights[category] <= MAX_WEIGHT - DELTA) {category_weights[category] += DELTA}
            } else {
                if (category_weights[category_weights] >= MIN_WEIGHT + DELTA) {category_weights[category] -= DELTA}
            }
        }
        console.log('Updated user data:');
        console.log(userData);
        return await userRef.set(userData);
    } else {
        console.log(`userId: ${userId} does not exist`);
        return null;
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
    console.log(userId);
    const res = await db.collection('users').doc(userId).set({
        'matched-events': [],
        'non-matched-events': [],
        'category-weightings': {
            'music': DEFAULT_WEIGHTING,
            'visual-arts': DEFAULT_WEIGHTING,
            'performing-arts': DEFAULT_WEIGHTING,
            'film': DEFAULT_WEIGHTING,
            'lectures-books': DEFAULT_WEIGHTING,
            'fashion': DEFAULT_WEIGHTING,
            'food-and-drink': DEFAULT_WEIGHTING,
            'festivals-fairs': DEFAULT_WEIGHTING,
            'charities': DEFAULT_WEIGHTING,
            'sports-active-life': DEFAULT_WEIGHTING,
            'nightlife': DEFAULT_WEIGHTING,
            'kids-family': DEFAULT_WEIGHTING,
            'other': DEFAULT_WEIGHTING
        }
    });
    console.log(res);
    return res;
}

export async function getCategoryWeightings(userId: string) {
    const userRef = db.collection('users').doc(userId);
    let doc = await userRef.get();
    if (doc.exists) {
        let userData = doc.data();
        console.log('Retreived category weightings:');
        console.log(userData);
        console.log(`For user: ${userId}`);
        return userData['category-weightings'];
    }
    console.log('User does not exist');
    return null;
}
