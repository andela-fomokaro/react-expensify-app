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
});