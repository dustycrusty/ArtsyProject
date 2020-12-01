function getUserData() {
    var user = firebase.auth().currentUser;

    if (user != null) {
      user.providerData.forEach(function (profile) {
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
        return user;
      });
    };
};

function changeUsername() {
   var user = firebase.auth().currentUser;
    var username = document.getElementById("usernameField").value;
    user.updateProfile({
      displayName: username
    }).then(function() {
        alert("Update Successful.");
    }).catch(function(error) {
        alert("Error Occurred." + error.message);
    });
};

// function changeProfilePic() {
//      var user = firebase.auth().currentUser;
    
//     user.updateProfile({
//       displayName: picurl
//     }).then(function() {
//         alert("Update Successful.")
//     }).catch(function(error) {
//         alert("Error Occurred." + error.message)
//     });
// }

function sendPasswordResetEmail() {
    var auth = firebase.auth();
    auth.sendPasswordResetEmail(auth.currentUser.email)
        .then(function() {
        alert("Password reset email is sent.");
    }).catch(function(error) {
        alert(error.message);
});
};

function uploadFormNav() {
    const name = firebase.auth().currentUser.displayName;
    if (name == null) {
        alert("Please set your name in setting.");
    }
    else {
        window.location.replace('/uploadForm.html');
    }
};

function formValidate(file, title, description, expectedPrice, dimension) {
  console.log(file);
    if (file != null && title != null && title != "" && description != null && description != "" && expectedPrice != null && expectedPrice != "") {
        return true;
    }
    else {
        return false;
    }
};

function uploadForm() {
    showModal();
    var file = document.getElementById("image").files[0];
    var dimension = document.getElementById("dimension").value;
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;
    var expectedPrice = document.getElementById("expectedPrice").value;
    console.log(file, dimension, title, description, expectedPrice);
    if (formValidate(file, title, description, expectedPrice , dimension)) {
      var ref = db.collection("arts").doc();
      uploadImage(file, ref.id, ref);
    }
    else {
        alert("Some fields are empty.");
        closeModal();
    }
};

function uploadImage(file, uid, ref) {

// Upload file and metadata to the object 'images/mountains.jpg'
var uploadTask = storageRef.child(uid + "/" + file.name).put(file);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  function(snapshot) {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function(error) {

  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      alert('Unauthorized access.');
          break;

    case 'storage/canceled':
      // User canceled the upload
          alert('Canceled upload.');
      break;

    case 'storage/unknown':
    alert('unknown error occurred.');
      // Unknown error occurred, inspect error.serverResponse
      break;
  }
}, function() {
  // Upload completed successfully, now we can get the download URL
  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    console.log('File available at', downloadURL);

            var dimension = document.getElementById("dimension").value;
            var title = document.getElementById("title").value;
            var description = document.getElementById("description").value;
            var expectedPrice = document.getElementById("expectedPrice").value;
            var name = firebase.auth().currentUser.displayName;
            var useruid = firebase.auth().currentUser.uid;
            var email = firebase.auth().currentUser.email;
            var pool = email.split("@")[1];
            console.log(typeof(name), typeof(uid), typeof(email), typeof(pool), typeof(downloadURL));
             var userRef = db.collection('users').doc(useruid);
                console.log(userRef.id);
            console.log(uid);
            userRef.update({arts: firebase.firestore.FieldValue.arrayUnion(uid)}).then(function() {
                console.log("done");
            }).catch( function(error) {
               console.log(error.message); 
                userRef.set({
                    arts:[uid]
                }).then(function() {
                    console.log("add done");
                }).catch( function(error) {
                    console.log(error.message);
                })
            });
                                                
            
      
            ref.set({
                title: title,
                description: description,
                expectedPrice: expectedPrice,
                email: email,
                pool: pool,
                dimension: dimension,
                image: downloadURL
            })
                .then(function() {
            alert('success!');
                closeModal();
                var elements = document.getElementsByTagName("input");
                for (var i=0; i < elements.length; i++) {
                  if (elements[i].type == "text") {
                    elements[i].value = "";
                  }
                }
                var secondElements = document.getElementsByTagName("textarea");
                for (var i=0; i < secondElements.length; i++) {
                  if (secondElements[i].type == "textarea") {
                    secondElements[i].value = "";
                  }
                }
        })
        .catch(function(error) {
            alert(error.message);
                closeModal();
        });

      
  });
});
};