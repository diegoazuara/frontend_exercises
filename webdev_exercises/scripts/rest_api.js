var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the crurrent tab


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

    var value = $('#star_wars-films option:selected').val();

    if (value >= 0) {
      showCharacters(data, value);

    }

  });
}


function showCharacters(data, value) {

  var option = document.createElement('option');
  for (count = 1; count < data.results[0].characters.length; count++) {
    option.text = data.results[value].characters[count];
    dropdownCharacters.add(option);
  }

  /*if (document.getElementById('selectid').value == "val" + count)
    var option = document.createElement('option');
  option.text = data.results[count].title;
  option.setAttribute("value", count);
  dropdown.add(option);*/
}



var nextBtn = document.getElementById("nextBtn");
nextBtn.addEventListener("click", function() {
  nextPrev(1)
});

var prevBtn = document.getElementById("prevBtn");
prevBtn.addEventListener("click", function() {
  nextPrev(-1)
})

var stepFirst = document.getElementById("step-1");
stepFirst.addEventListener("click", function() {
  stepShow(0)
})

var stepSecond = document.getElementById("step-2");
stepSecond.addEventListener("click", function() {
  stepShow(1)
})

var stepThird = document.getElementById("step-3");
stepThird.addEventListener("click", function() {
  stepShow(2)
})

var stepFourth = document.getElementById("step-4");
stepFourth.addEventListener("click", function() {
  stepShow(3)
})

function showTab(currentTab) {
  // This function will display the specified tab of the form...
  var tabs = document.getElementsByClassName("tab");
  tabs[currentTab].style.display = "block";

  //... and fix the Previous/Next buttons:
  if (currentTab == 0) {
    document.getElementById("prevBtn").style.display = "inline";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (currentTab == (tabs.length - 1)) {
    document.getElementById("nextBtn").textContent = "Submit";
  } else {
    document.getElementById("nextBtn").textContent = "Next";
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(currentTab)
}

function fixStepIndicator(currentTab) {
  // This function removes the "active" class of all steps...
  var i, steps = document.getElementsByClassName("step");
  for (i = 0; i < steps.length; i++) {
    steps[i].className = steps[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  steps[currentTab].className += " active";
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var tabs = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  tabs[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= tabs.length) {
    // ... the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function stepShow(n) {
  // This function will figure out which tab to display

  var tabs = document.getElementsByClassName("tab");

  // You can get back to previous steps but you can't skip a step
  if (n < currentTab) {
    // Hide the current tab:
    tabs[currentTab].style.display = "none";
    // Changes current tab according to the step circle:
    currentTab = n;
    // Display the correct tab:
    showTab(currentTab);
  } else {
    if (!validateForm()) return false;
  }

  // Hide the current tab:
  tabs[currentTab].style.display = "none";
  // Changes current tab to the corrrect step circle
  currentTab = n;
  // Display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var tabs, formInputs, count, valid = true;
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;


  tabs = document.getElementsByClassName("tab");
  formInputs = tabs[currentTab].getElementsByClassName("form-input");
  z = document.getElementById('email').value;

  // Validates password

  if (currentTab == 0) {
    if (document.getElementById('password').value.length < 8) {
      formInputs[2].className += " invalid";
      valid = false;
    } else {

      if (document.getElementById('password').value ==
        document.getElementById('confirm_password').value) {
        valid = true;
      } else {
        formInputs[3].className += " invalid";
        valid = false;
      }
    }

  }


  // A loop that checks every input field in the current tab:
  for (count = 0; count < formInputs.length; count++) {
    // If a field is empty...
    if (formInputs[count].value == "") {
      // add an "invalid" class to the field:
      formInputs[count].className += " invalid";
      // and set the current valid status to false
      valid = false;
    }
  }

  // Validates email
  if (reg.test(z) == false) {
    formInputs[1].className += " invalid";
    valid = false;
  }

  return valid;
}