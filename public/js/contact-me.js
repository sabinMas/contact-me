// validating the inputs 
document.querySelectorAll("input, textarea").forEach(el => {
  el.addEventListener("invalid", function () {
    this.setCustomValidity("Please fill out this field correctly.");
  });

  el.addEventListener("input", function () {
    this.setCustomValidity("");
  });
});
