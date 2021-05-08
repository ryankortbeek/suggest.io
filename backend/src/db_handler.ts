// DB stuff
const admin = require('firebase-admin');

const serviceAccount = require('../firebase-admin/service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();