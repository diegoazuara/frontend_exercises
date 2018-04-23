var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the crurrent tab

var btn = document.getElementById("nextBtn");
btn.addEventListener("click", function() {
  nextPrev(1)
}); //Function(){} for it to run after clicking


function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";

  //... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").textContent = "Submit";
  } else {
    document.getElementById("nextBtn").textContent = "Next";
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n)
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= x.length) {
    // ... the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;


  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByClassName("form__input");
  z = document.getElementById('email').value;

  // Validates password

  if (currentTab == 0) {
    if (document.getElementById('password').value.length < 8) {
      y[2].className += " invalid";
      valid = false;
    } else {

      if (document.getElementById('password').value ==
        document.getElementById('confirm_password').value) {
        valid = true;
      } else {
        y[3].className += " invalid";
        valid = false;
      }
    }

  }


  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false
      valid = false;
    }
  }

  // Validates email
  if (reg.test(z) == false) {
    y[1].className += " invalid";
    valid = false;
  }

  return valid;
}