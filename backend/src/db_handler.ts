// DB stuff
const serviceAccount = require('../firebase-admin/service-account.json');

const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

export function handleEventResponse(userId: string, eventId: string, match: boolean) {

}