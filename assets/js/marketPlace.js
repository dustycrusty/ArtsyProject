var bookmarkData = [];

db.collection("arts").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        bookmarkData.push(doc.data());
    });
}).then(function() {
        for (var i = 0; i < bookmarkData.length; ++i) {
            var template = document.getElementById("artwork-template").textContent;
            var html = Mustache.render(template, bookmarkData[i]);

            var div_element = document.createElement("div");
            div_element.classList.add('card-box');
            div_element.innerHTML = html;

            document.getElementById("artworks-dynamic").appendChild(div_element);
    };
});


