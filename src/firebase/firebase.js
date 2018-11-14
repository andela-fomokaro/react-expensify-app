import * as firebase from 'firebase';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, database, googleAuthProvider as default };

// used when we want to get data once
// database.ref().once('value')
// .then(snapshot => {
//   const val = snapshot.val();
//   console.log(val);
// }).catch(e => {
//   console.log('Error fetching data', e);
// });

// // used for continously getting data
// const onValueChange = database.ref().on('value', snapshot => {
//   console.log(snapshot.val());
// }, e => {
//   console.log('Error with data fetching', e);
// });

// Assignment
// database.ref().on('value', snapshot => {
//   const value = snapshot.val();
//   console.log(`${value.name} is a ${value.job.title} at ${value.job.company}`);
// }, e => {
//   console.log(e, ':) found');
// });

// Storing array structures.
// database.ref('expenses').push({
//   description: 'Sewage Bills',
//   note: 'Sewage empity',
//   amount: '$100',
//   createdAt: 'mon, 12, 2018'
// });

// database.ref('expenses')
//    .once('value')
//    .then(snapshot => {
//      const expenses = [];

//      snapshot.forEach(childSnapshot => {
//        expenses.push({
//          id: childSnapshot.key,
//          ...childSnapshot.val()
//        });
//      });
//      console.log(expenses);
//    });

// database.ref().on('value', snapshot => {
//   const expenses = [];
//   snapshot.forEach(childSnapshot => {
//     expenses.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val()
//     });
//   });
//   console.log(expenses);
//   });



// database.ref().set({
//   name: 'Omokaro Faith',
//   age: 100,
//   isMarried: false,
//   stressLevel: 6,
//   job: {
//     title: 'Software developer',
//     company: 'Google'
//   },
//   location: {
//     city: 'Philadelphia',
//     country: 'United State',
//   }
// }).then(() => {
//   console.log('Data is saved');
// }).catch(error => {
//   console.log('Data rejected', error);
// });

// // adding attributes
// database.ref('attributes').set({
//   height: 73,
//   weight: 150
// }).then(() => {
//   console.log('Yaaay this was successful');
// }).catch(error => {
//   console.log('this was rejected', error);
// });

// // removing attributes
// database.ref('isMarried').remove().then(() => {
//   console.log('this was successful');
// }).catch(e => {
//   console.log(e);
// });

// // updating attributes
// database.ref().update({
//   stressLevel: 9,
//   'job/company': 'Amazon',
//   'location/city': 'Seattle'
// });
