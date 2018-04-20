document.getElementById("hide").addEventListener("click", hideGrid);

function hideGrid() {
  var x = document.getElementById("grid");
  if (x.style.display === "none") {
    x.style.display = "grid";
    document.getElementById("message").innerHTML = "";

  } else {
    x.style.display = "none";
    document.getElementById("message").innerHTML = "Click on the button again to show grid";
  }
}
