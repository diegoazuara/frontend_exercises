var dropdownFilms = document.getElementById('star_wars-films');
dropdownFilms.length = 0;

var defaultOption = document.createElement('option');
defaultOption.text = 'Choose Film...';

dropdownFilms.add(defaultOption);
dropdownFilms.selectedIndex = 0;

var dropdownCharacters = document.getElementById('star_wars-characters');
dropdownCharacters.length = 0;

var defaultOptionCharacter = document.createElement('option');
defaultOptionCharacter.text = 'Choose Character...';

dropdownCharacters.add(defaultOptionCharacter);
dropdownCharacters.selectedIndex = 0;


var promise = new Promise(function(resolve, reject) {
  $.ajax({
    url: 'https://swapi.co/api/films/',
    type: 'GET',
    dataType: 'json',
    success: function(data, textStatus, xhr) {
      var object = {
        data: data,
        "textStatus": textStatus,
        xhr: xhr

      }

      console.log(data);
      resolve(object);
    },

    error: function(xhr, textStatus, error) {
      reject(xhr.status)

    }
  });
});


promise.then(function(object) {

  addFilms(object.data);
  alert("Status: " + object.xhr.status);

}).catch(function(error) {

  alert("Error: " + error);

})

function addFilms(data) {

  var data = data;
  var count;

  //Adds option to dropdownlist
  for (count = 0; count < data.results.length; count++) {
    var option = document.createElement('option');
    option.text = data.results[count].title;
    option.setAttribute("value", count);
    dropdownFilms.add(option);
  }

  var selectedOption = document.getElementById("star_wars-films");
  selectedOption.addEventListener("change", function() {

    dropdownCharacters.length = 0;
    var defaultOptionCharacter = document.createElement('option');
    defaultOptionCharacter.text = 'Choose Character...';

    dropdownCharacters.add(defaultOptionCharacter);


    var value = $('#star_wars-films option:selected').val();

    if (value >= 0) {
      $('#star_wars-characters').prop('disabled', false); // If value is greater than 0, the next select is enabled.

      showCharacters(data, value);

    } else {
      $('#star_wars-characters').prop('disabled', true);
    }

  });
}


function showCharacters(data, value) {

  var selectedOption = document.getElementById("star_wars-characters");
  selectedOption.addEventListener("change", function() {


    /* if ($('#star_wars-characters').is(':disabled')) {
      console.log("disabled");
    } else {
      console.log("enabled");
    } */

    if (selectedOption.selectedIndex > 0) {

      console.log("enabled")
      $('#showBtn').prop('disabled', false);

    } else {
      console.log("disabled")
      $('#showBtn').prop('disabled', true);
    }

  });

  // Needs to be "let" for it to exist in $.getJSON
  for (let count = 0; count < data.results[value].characters.length; count++) {

    // Because JSON returns urls on the characters array, you need to use .getJSON to get the characters names
    var characterUrl = data.results[value].characters[count];


    $.getJSON(characterUrl, function(data) {

      var characterName = data.name;
      console.log(characterName);
      var option = document.createElement('option');
      option.text = characterName;
      option.setAttribute("value", count);
      dropdownCharacters.add(option);

    });

  }

}

function showInfo(data) {
  //showsInfo after button click

  var value = $('#star_wars-characters option:selected').val();


  for (let count = 0; count < data.results[value].characters.length; count++) {
    var characterUrl = data.results[value].characters[count];


    $.getJSON(characterUrl, function(data) {

      var characterHomeworld = data.homeworld;
      console.log(characterHomeworld);

    });
  }

  // agarrar el selected index y pasarlo a la url para bajar la info
  // var characterUrl = data.homeworld;
}