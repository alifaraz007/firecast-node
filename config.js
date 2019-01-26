const admin = require('firebase-admin');
const serviceAccount = require('./ali-cafe-firebase-adminsdk-xo5wd-88dbbdcfa3.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ali-cafe.firebaseio.com"
});
const settings = {/* your settings... */ timestampsInSnapshots: true };
admin.firestore().settings(settings);

const db = admin.firestore();
module.exports = db;