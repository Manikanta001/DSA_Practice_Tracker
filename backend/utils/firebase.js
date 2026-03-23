const admin = require('firebase-admin');

let db = null;
let auth = null;

// Initialize Firebase Admin SDK
try {
  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  };

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  db = admin.firestore();
  auth = admin.auth();
  console.log('Firebase initialized successfully');
} catch (error) {
  console.warn('Firebase initialization failed:', error.message);
  console.warn('Please configure valid Firebase credentials in .env file');
  console.warn('The server will start but Firebase-dependent routes will not work');
}

module.exports = { admin, db, auth };
