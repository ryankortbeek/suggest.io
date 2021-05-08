import {Request, Response, NextFunction} from 'express';

// DB stuff
const serviceAccount = require('../firebase-admin/service-account.json');

const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://project-391038625508.firebaseio.com' // may not be needed
});

const db = admin.firestore();

export function handleEventResponse(userId: string, eventId: string, match: boolean) {

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