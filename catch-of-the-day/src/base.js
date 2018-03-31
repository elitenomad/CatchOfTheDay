import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBxLvzayWWvDpd4pxt8W9V20Hymf65hOKs",
    authDomain: "catchoftheday-b0a67.firebaseapp.com",
    databaseURL: "https://catchoftheday-b0a67.firebaseio.com",
    projectId: "catchoftheday-b0a67",
    storageBucket: "catchoftheday-b0a67.appspot.com",
    messagingSenderId: "738814811766"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;


