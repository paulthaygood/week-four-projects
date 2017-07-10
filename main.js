var PUBLIC_KEY = "ff39f453fbcf302f396dab1271a559db";
var PRIV_KEY = "5550a625705519b1a07f460bcfa2cef356a9e240";

function getMarvelResponse(character) {

  var ts = new Date().getTime();
  var hash = md5(ts + PRIV_KEY + PUBLIC_KEY).toString();
  var url = 'http://gateway.marvel.com:80/v1/public/characters';

  $.getJSON(url, {
    ts: ts,
    apikey: PUBLIC_KEY,
    hash: hash,
    name: character
    })
    .done(function(data) {

    for (var i = 0; i < data.data.results.length; i++) {

        var comic = data.data.results[i];

        var superhero = document.createElement("div");
        superhero.className += "superhero";

        var superhero_container = document.querySelector(".superhero_container");


        var small_container = document.createElement("div");
        small_container.className += "smallContainer";

        var picture = document.createElement("img");
        picture.src = comic.thumbnail.path + '.' + comic.thumbnail.extension;
        small_container.appendChild(picture);

        var name = document.createElement("p");
        name.className += "name";
        name.textContent = comic.name;
        small_container.appendChild(name);

        var description = document.createElement("p");
        description.className += "description";
        description.textContent = comic.description;
        small_container.appendChild(description);



        superhero_container.appendChild(small_container);
    }
    })
    .fail(function(err){
      console.log(err);
    });
};

getMarvelResponse("Spider-Man");
var charList = ['wolverine', 'hulk', 'iron man', 'captain america', 'daredevil', 'thor', 'storm'];
var randomChar = Math.floor(Math.random() * charList.length);
getMarvelResponse(charList[randomChar]);
