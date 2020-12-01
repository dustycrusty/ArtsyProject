function getUploadData(){
    console.log(user);
    const useruidsaved = user.uid;
    db.collection('users').doc(user.uid).get().then(function(doc) {

        console.log(doc.data());
        var data = doc.data();
        var arts = data.arts;
        for (var i = 0; i< arts.length; ++i) {

            db.collection('arts').doc(arts[i]).get().then(function(val) {
                if (val.exists){
                    var artdata = val.data();
                    console.log("updating View...");
                    
                    var content = "Title: " + artdata.title + ",\nprice: " + artdata.expectedPrice + ",\ndimension: " + artdata.dimension;
                    var dat = 
                        {
                            cellContent: content,
                            artsuid: val.id,
                            useridsave: useruidsaved
                        };
                    console.log(dat);
                    var template = document.getElementById("cell-template").textContent;
                    var html = Mustache.render(template, dat);

                var tr_element = document.createElement("tr");

                tr_element.innerHTML = html;

                document.getElementById("table-body-main").appendChild(tr_element);
                };
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        }

            // uploadData.push(val);
    })
};

function onDeleteItemClick(btn) {
    console.log(btn.getAttribute('data-content'));
    var tempid = btn.getAttribute('data-content');
    var useruidsaved = btn.getAttribute('data-uid');
    console.log(useruidsaved);
    db.collection("users").doc(useruidsaved).update({
        arts: firebase.firestore.FieldValue.arrayRemove(tempid)
    }).catch(function(error) {console.log(error.message)});
    
    db.collection('arts').doc(tempid).delete().then(function() {
        console.log("Document successfully deleted!");
        window.location.reload();
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });

};

// async function getSingleArtData(artid){
//     let artdoc = await ;
    
//             if (artdoc.exists) {
//                 console.log("Document data:", artdoc.data());
//                 var artdata = artdoc.data();
//                 var content = "Title: " + artdata.title + "\nprice: " + artdata.expectedPrice + "\ndimension: " + artdata.dimension;
//                 var dat = 
//                     {
//                         cellContent: content,
//                         artsuid: arts[i]
//                     };
//                 return dat;
//             } else {
//                 // doc.data() will be undefined in this case
//                 console.log("No such document!");
//             }
//         }).catch(function(error) {
//             console.log("Error getting document:", error);
//         });
// }

