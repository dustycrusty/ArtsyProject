 var firebaseConfig = {
    apiKey: "AIzaSyC7F0sCwf7wqYwODvDfzjHnIFPRW-aESRg",
    authDomain: "artsy-5acbc.firebaseapp.com",
    databaseURL: "https://artsy-5acbc.firebaseio.com",
    projectId: "artsy-5acbc",
    storageBucket: "artsy-5acbc.appspot.com",
    messagingSenderId: "789405158188",
    appId: "1:789405158188:web:cff23550a9544d98c47a89",
    measurementId: "G-HBDD2CLLRN"
  };

  firebase.initializeApp(firebaseConfig);
    firebase.analytics();

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

// Create a storage reference from our storage service
var storageRef = storage.ref();
