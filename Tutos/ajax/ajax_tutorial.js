var btn = document.getElementById("btn");
var animalContainer = document.getElementById("animal-info");

btn.addEventListener("click", makeRequest);

function makeRequest() {
  //Creating an XMLHttpRequest Object
  ourRequest = new XMLHttpRequest();
  ourRequest.onreadystatechange = validate;
  ourRequest.open("GET", "https://learnwebcode.github.io/json-example/animals-1.json", true);
  ourRequest.send();
}

function validate() {
  // It differentiates between a successful and unsuccessful AJAX call by checking for a 200 OK response code.
  if (ourRequest.readyState === XMLHttpRequest.DONE) {
    if (ourRequest.status == 200) {
      // Returns the server response as a JavaScript Object / json
      var ourData = JSON.parse(ourRequest.responseText);
      //Sends ourData to the renderHTML function
      renderHTML(ourData);
    } else {
      // There was a error in the request
      alert('There was a problem with the request.');
    }
  }
}

function renderHTML(data) {
  var htmlString = '';

  for (var i = 0; i < data.length; i++) {
    htmlString += "<p>" + data[i].name + " is a " + data[i].species + " that likes " + data[i].foods.likes + '.</p>';
  }

  animalContainer.insertAdjacentHTML('beforeend', htmlString);
}