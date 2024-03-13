function showMessage(input, message, type) {
    const error = input.parentNode.querySelector(".error");
    error.innerText = message;
    input.classList.remove("success", "error");
    input.classList.add(type ? "success" : "error");
    return type;
  }
  
  let popup = document.getElementById("popup");
  
  // function to open and close pop up using the .open-popup class in css
  function openpopup(){
    popup.classList.add("open-popup")
  }
  
  function closepopup(){
    popup.classList.remove("open-popup")
  }
  
  // getting information for the pop up
  function updatePopupContent() {
    const firstname = form.elements["firstname"].value;
    const email = form.elements["email"].value;
    const password = form.elements["password"].value;
    const postal = form.elements["postal"].value;
    const city = form.elements["city"].value;
  
    const Ipop = document.getElementById("infopop");
    Ipop.innerHTML = `
        <p><b>Name:</b> ${firstname}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Password:</b> ${password}</p>
        <p><b>City:</b>${city}</p>
        <p><b>Postal Code:</b> ${postal}</p>
    `;
  }
  
  // Toggle password function with the eye
  const togglePassword = document.querySelector("#togglePassword");
          const password = document.querySelector("#password");
   
          togglePassword.addEventListener("click", function () {
              // toggle the type attribute
              const type = password.getAttribute("type") === "password" ? "text" : "password";
              password.setAttribute("type", type);
             
              // toggle the icon
              this.classList.toggle("bi-eye");
          });
   
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
  
  //Password Validation
  function validatePassword(input, requiredMsg) {
    if (!hasValue(input, requiredMsg)) {
        return false;
    }
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/;
    const password = input.value.trim();
    if (!passwordRegex.test(password)) {
      return showError(input, "Password must be atleast 6 characters, contain at least one digit,and one special character");
    }
    return showSuccess(input);
  }
  
  //Postal code validation
  function validatePost(input, requiredMsg) {
    if (!hasValue(input, requiredMsg)) {
        return false;
    }
    const postalRegex = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$|(^\d{5}$)|(^\d{5}-\d{4}$)/i ;
    const postal = input.value.trim();
    
    if (!postalRegex.test(postal)) {
      return showError(input, "invalid postal code format");
    }
    return showSuccess(input);
  }
  
  //Email validation
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
  const POSTAL_REQUIRED = "Please enter your postal code";
  const POSTAL_INVALID = "Invalid postal code format"
  const CITY_REQUIRED = "Please select your city";
  
  form.addEventListener("submit", function (event) {
    event.preventDefault();
  
    let nameValid = hasValue(form.elements["firstname"], NAME_REQUIRED);
    let emailValid = validateEmail(form.elements["email"], EMAIL_REQUIRED, EMAIL_INVALID);
    let passwordValid = validatePassword(form.elements["password"], PASSWORD_REQUIRED);
    let confirmValid = validatePassword(form.elements["Cpassword"], CONFIRMPASSWORD_REQUIRED);
    let postalValid = validatePost(form.elements["postal"],POSTAL_REQUIRED,POSTAL_INVALID);
    let cityValid = hasValue(form.elements["city"],CITY_REQUIRED);
  
    if (form.elements["password"].value !== form.elements["Cpassword"].value) {
        confirmValid = showError(form.elements["Cpassword"], PASSWORDS_NOT_MATCHING);
    }
  
    if (nameValid && emailValid && passwordValid && confirmValid && postalValid && cityValid) {
      // infofunction();
      updatePopupContent();
        openpopup();
       
        // alert("No form was posted, this is just a DOM practice");
        // form.reset();
    }else{
      closepopup();
    }
  });
  