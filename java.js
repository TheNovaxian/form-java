function showMessage(input, message, type) {
  const error = input.parentNode.querySelector(".error");
  error.innerText = message;
  input.classList.remove("success", "error");
  input.classList.add(type ? "success" : "error");
  return type;
}

function showError(input, message) {
  return showMessage(input, message, false);
}

function showSuccess(input) {
  return showMessage(input, "", true);
}

function hasValue(input, message) {
  if (input.value.trim() === "") {
      return showError(input, message);
  }
  return showSuccess(input);
}

function validatePassword(input, requiredMsg) {
  if (!hasValue(input, requiredMsg)) {
      return false;
  }
  return true;
}

function validateEmail(input, requiredMsg, invalidMsg) {
  if (!hasValue(input, requiredMsg)) {
      return false;
  }
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const email = input.value.trim();
  if (!emailRegex.test(email)) {
      return showError(input, invalidMsg);
  }
  return showSuccess(input);
}

const form = document.querySelector("form");

const NAME_REQUIRED = "Please enter your name";
const EMAIL_REQUIRED = "Please enter your email";
const EMAIL_INVALID = "Please enter a correct email address format";
const PASSWORD_REQUIRED = "Please enter a password";
const CONFIRMPASSWORD_REQUIRED = "Please confirm your password";
const PASSWORDS_NOT_MATCHING = "Passwords do not match";

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let nameValid = hasValue(form.elements["firstname"], NAME_REQUIRED);
  let emailValid = validateEmail(form.elements["email"], EMAIL_REQUIRED, EMAIL_INVALID);
  let passwordValid = validatePassword(form.elements["password"], PASSWORD_REQUIRED);
  let confirmValid = validatePassword(form.elements["Cpassword"], CONFIRMPASSWORD_REQUIRED);

  if (form.elements["password"].value !== form.elements["Cpassword"].value) {
      confirmValid = showError(form.elements["Cpassword"], PASSWORDS_NOT_MATCHING);
  }

  if (nameValid && emailValid && passwordValid && confirmValid) {
      alert("No form was posted, this is just a DOM practice");
  }
});
