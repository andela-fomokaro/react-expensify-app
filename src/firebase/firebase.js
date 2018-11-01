import * as firebase from 'firebase';


const config = {
  apiKey: "AIzaSyADK83zDrjuqzEDvZKtDUSB2qexoqv7nXo",
  authDomain: "expensify-19c49.firebaseapp.com",
  databaseURL: "https://expensify-19c49.firebaseio.com",
  projectId: "expensify-19c49",
  storageBucket: "expensify-19c49.appspot.com",
  messagingSenderId: "524840705266"
};

firebase.initializeApp(config);

const database = firebase.database();

database.ref().set({
  name: 'Omokaro Faith',
  age: 100,
  isMarried: false,
  location: {
    city: 'Ikeja',
    country: 'Nigeria',
  }
}).then(() => {
  console.log('Data is saved');
}).catch(error => {
  console.log('Data rejected', error);
});

database.ref('attributes').set({
  height: 73,
  weight: 150
}).then(() => {
  console.log('Yaaay this was successful');
}).catch(error => {
  console.log('this was rejected', error);
});

database.ref('isMarried').remove().then(() => {
  console.log('this was successful');
}).catch(e => {
  console.log(e);
});