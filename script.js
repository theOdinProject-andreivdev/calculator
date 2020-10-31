const buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
  button.addEventListener("click", buttonEffect);
  button.addEventListener("transitionend", buttonRemoveEffect);
  console.log("t");
});

function buttonEffect(e) {
  this.classList.add("buttonEffect");
}

function buttonRemoveEffect(e) {
  this.classList.remove("buttonEffect");
}
