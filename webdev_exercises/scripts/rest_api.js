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

var inputHomeworld = document.getElementById("homeworld");
var inputBirthYear = document.getElementById("birth_year");
var inputGender = document.getElementById("gender");
var inputHairColor = document.getElementById("hair_color");
var inputHeight = document.getElementById("height");
var inputMass = document.getElementById("mass");

$("input").attr('readonly', true);

// Displays more information about the app
var showBtn = document.getElementById("showBtn");
showBtn.addEventListener("click", function() {
  $("#showBtn").hide();
  $(".form-container").hide();
  $('.container-more-info').show();
});

var homePageBtn = document.getElementById("homePageBtn");
homePageBtn.addEventListener("click", function() {
  window.location = "rest_api_lp.html";
})

// ...Go back to the app
var goBack = document.getElementById("goBack");
goBack.addEventListener("click", function() {
  $("#showBtn").show();
  $(".container-more-info").hide();
  $(".form-container").show();
});


var promise = new Promise(function(resolve, reject) {
  // Perform an asynchronous HTTP (Ajax) request inside a JavaScript promise.
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
      //Passes the object to the resolve function
      resolve(object);
    },

    error: function(xhr, textStatus, error) {

      //Passes the xhr status to the reject function
      reject(xhr.status)

    }
  });
});


promise.then(function(object) {
  // Success
  addFilms(object.data);

}).catch(function(error) {
  //Error
  alert("Error: " + error);
})

function addFilms(data) {
  //Adds films to dropdownlist

  var data = data;
  var count;

  for (count = 0; count < data.results.length; count++) {
    var option = document.createElement('option');
    option.text = data.results[count].title;
    option.setAttribute("value", count);
    dropdownFilms.add(option);
  }

  var selectedOption = document.getElementById("star_wars-films");
  selectedOption.addEventListener("change", function() {

    //If you select a new movie the character dropdownlist will reset to 0 options
    dropdownCharacters.length = 0;
    var defaultOptionCharacter = document.createElement('option');
    defaultOptionCharacter.text = 'Choose Character...';
    dropdownCharacters.add(defaultOptionCharacter);

    //...and character information fields will become empty
    inputHomeworld.value = "";
    inputBirthYear.value = "";
    inputGender.value = "";
    inputHairColor.value = "";
    inputHeight.value = "";
    inputMass.value = "";

    $('input').prop('disabled', true);


    var value = $('#star_wars-films option:selected').val();

    //If you select a movie the select character dropdownlist will be enabled, if not it will be disabled
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

    inputHomeworld.value = "";
    inputBirthYear.value = "";
    inputGender.value = "";
    inputHairColor.value = "";
    inputHeight.value = "";
    inputMass.value = "";

    if (selectedOption.selectedIndex > 0) {

      $('input').prop('disabled', false);
      showInfo();

    } else {
      $('input').prop('disabled', true);
    }

  });

  // Needs to be "let" for it to exist in $.getJSON
  for (let count = 0; count < data.results[value].characters.length; count++) {

    // Because JSON returns urls on the characters array, you need to use .getJSON to get the characters names
    var characterUrl = data.results[value].characters[count];

    $.getJSON(characterUrl, function(data) {

      var characterName = data.name;
      var characterHomeworld = data.homeworld;
      var characterBirthYear = data.birth_year;
      var characterGender = data.gender;
      var characterHairColor = data.hair_color;
      var characterHeight = data.height;
      var characterMass = data.mass;

      var option = document.createElement('option');
      option.text = characterName;
      option.setAttribute("value", count);
      option.setAttribute("birth_year", characterBirthYear);
      option.setAttribute("gender", characterGender);
      option.setAttribute("hair_color", characterHairColor);
      option.setAttribute("height", characterHeight);
      option.setAttribute("mass", characterMass);

      dropdownCharacters.add(option);

      $.getJSON(characterHomeworld, function(data) {

        var characterHomeworldText = data.name;
        option.setAttribute("homeworld", characterHomeworldText);

      });


    });

  }

}


function showInfo() {

  //Shows info of the character after button has been clicked

  //Assigns the text of the data-attributes to new variables
  var characterHomeworld = $('#star_wars-characters option:selected').attr("homeworld");
  var characterBirthYear = $('#star_wars-characters option:selected').attr("birth_year");
  var characterGender = $('#star_wars-characters option:selected').attr("gender");
  var characterHairColor = $('#star_wars-characters option:selected').attr("hair_color");
  var characterHeight = $('#star_wars-characters option:selected').attr("height");
  var characterMass = $('#star_wars-characters option:selected').attr("mass");

  //Assigns the inputs to new variables
  var inputHomeworld = document.getElementById("homeworld");
  var inputBirthYear = document.getElementById("birth_year");
  var inputGender = document.getElementById("gender");
  var inputHairColor = document.getElementById("hair_color");
  var inputHeight = document.getElementById("height");
  var inputMass = document.getElementById("mass");

  //Changes the value of the inputs
  inputHomeworld.value = characterHomeworld;
  inputBirthYear.value = characterBirthYear;
  inputGender.value = characterGender;
  inputHairColor.value = characterHairColor;
  inputHeight.value = characterHeight;
  inputMass.value = characterMass;

}