
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
var db = firebase.firestore();
var storage = firebase.storage();
var storageRef = storage.ref();
 

var initApp = function() {
  document.getElementById('sign-out').addEventListener('click', function() {
    firebase.auth().signOut();
  });
  document.getElementById('delete-account').addEventListener(
      'click', function() {
        deleteAccount();
      });
    
    var user = firebase.auth().currentUser;
    if (user) {
        handleSignedInUser();
    }
    else {
        handleSignedOutUser();
    }

};


var handleSignedInUser = function(user) {
  // document.getElementById('profileRef').style.display = 'block';
  // document.getElementById('profileCollapsible').style.display = 'block';
  // document.getElementById('sign-in').style.display = "none";
  //   document.getElementById('sign-in-nav-button').style.display = "none";
    
    document.getElementById('nav-right-section').innerHTML = 
        `<div class="d-flex flex-column align-items-xl-end">
                        <a id="profileRef" class="collapsible">Profile</a> 
                        <div id="profileCollapsible" class="collapsible-content" >
                            <div> <a href="Market.html">Market</a>
                            <div> <a href="manageUpload.html">Manage Uploads</a>
                            <div> <a href="uploadForm.html">Upload Work</a> </div>
                            <div> <a href="Setting.html">Setting</a></div>
                            <div> <a onclick="signOut()">Logout</a> </div>
                        </div>
                    </div>`
    
    collapsible();
};


/**
 * Displays the UI for a signed out user.
 */
var handleSignedOutUser = function() {
  //  document.getElementById('profileRef').style.display = 'none';
  // document.getElementById('profileCollapsible').style.display = 'none';
  // document.getElementById('sign-in').style.display = "block";
  //   document.getElementById('sign-in-nav-button').style.display = "block";
    
    document.getElementById('nav-right-section').innerHTML ='<a id= "sign-in" href= "signin.html">Sign In</a>'
    
    
    
};

// Listen to change in auth state so it displays the correct UI for when
// the user is signed in or not.
firebase.auth().onAuthStateChanged(function(user) {
  user ? handleSignedInUser(user) : handleSignedOutUser();
});

function login() {
    
    var email = document.getElementById('emailField').value;
    var pass = document.getElementById('passField').value;
    firebase.auth().signInWithEmailAndPassword(email, pass).then(function(user) {
          var emailVerified = user.user.emailVerified;
        if (emailVerified == false) {
            firebase.auth().signOut();
            var alert = document.getElementById('alert-box');
            var msg = document.getElementById('errorMessage');
            msg.innerText = "Please check your email inbox and verify your account.";
        
            alert.style.display = 'block';
            
        }
        else {
            window.location.replace('/index.html');
        }
          
            
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
       
        var alert = document.getElementById('alert-box');
        var msg = document.getElementById('errorMessage');
        msg.innerText = errorMessage;
        
        alert.style.display = 'block';
    });
};

function signUp() {
    var email = document.getElementById('emailField').value;
    var pass = document.getElementById('passField').value;
    firebase.auth().createUserWithEmailAndPassword(email, pass).then(function(user) {
        user.user.sendEmailVerification()
                .then(firebase.auth().signOut())
                .then(function() {                                 window.location.replace('/SignUpComplete.html');
                   })
                .catch(function(error) {
   var errorCode = error.code;
          var errorMessage = error.message;
       
        var alert = document.getElementById('alert-box');
        var msg = document.getElementById('errorMessage');
        msg.innerText = errorMessage;
        
        alert.style.display = 'block';
})
        
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
       
        var alert = document.getElementById('alert-box');
        var msg = document.getElementById('errorMessage');
        msg.innerText = errorMessage;
        
        alert.style.display = 'block';
    });
};

function signOut() {
    firebase.auth().signOut().then(function() {
        window.location.replace('/index.html');
}).catch(function(error) {
   var errorCode = error.code;
          var errorMessage = error.message;
       
        var alert = document.getElementById('alert-box');
        var msg = document.getElementById('errorMessage');
        msg.innerText = errorMessage;
        
        alert.style.display = 'block';
});
};

window.addEventListener('load', initApp);
firebase.analytics();
