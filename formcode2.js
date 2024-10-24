$("#bacf-submit").css("cursor", "not-allowed");
$("#bacf-submit").css("opacity", "0.25");

let bookACallValid = false;
let isRecaptchaValid = true; // Declare isRecaptchaValid as a global variable

// Function to check if a string is empty
function isEmpty(str) {
  return str.trim() === "";
}

// Function to check if an email is valid
function isValidEmail(email) {
  // Regular expression to validate email format
  var emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}

// Function to check the reCAPTCHA status and return true or false
function isRecaptchaFilled() {
  const response = grecaptcha.getResponse();
  return response.length !== 0;
}

// Set an interval to continuously check the reCAPTCHA status every 1 second (adjust the interval as needed)
setInterval(function () {
  isRecaptchaValid = isRecaptchaFilled();
  // console.log(isRecaptchaValid);
  // check if isRecaptchaValid is true, if so, print "yes its true"
  if (isRecaptchaValid) {
    // console.log("yes its true");
    bacfEnableSubmitButton();
    if (window.location.href.indexOf("contact-us") > -1) {
      cfEnableSubmitButton(); //
    }
  } else {
    bacfEnableSubmitButton();
    if (window.location.href.indexOf("contact-us") > -1) {
      cfEnableSubmitButton(); //
    }
  }
}, 1000);

// Enable/disable submit button based on form validity
function bacfEnableSubmitButton() {
  var firstName = $("#bacf-first-name").val();
  var lastName = $("#bacf-last-name").val();
  var company = $("#bacf-company").val();
  var location = $("#bacf-location").val();
  var email = $("#bacf-email").val();
  var phone = $("#bacf-phone").val();
  var bestTimeToCall = $("#bacf-time").val();
  var interestedIn = $("#bacf-interested-in").val();

  var isFormValid =
    !isEmpty(firstName) &&
    !isEmpty(lastName) &&
    !isEmpty(company) &&
    !isEmpty(location) &&
    !isEmpty(email) &&
    isValidEmail(email) &&
    !isEmpty(phone) &&
    !isEmpty(bestTimeToCall) &&
    !isEmpty(interestedIn) &&
    isRecaptchaValid;

  if (isFormValid) {
    $("#bacf-submit").css("cursor", "pointer");
    $("#bacf-submit").css("opacity", "1");
    bookACallValid = true;
    // console.log("bookACallValid is true");
  } else {
    $("#bacf-submit").css("cursor", "not-allowed");
    $("#bacf-submit").css("opacity", "0.25");
    bookACallValid = false;
    // console.log("bookACallValid is still false");
  }
}

// Add event listeners to input fields and select options for form validation
$("#bacf-first-name").on("input", bacfEnableSubmitButton);
$("#bacf-last-name").on("input", bacfEnableSubmitButton);
$("#bacf-company").on("input", bacfEnableSubmitButton);
$("#bacf-location").on("change", bacfEnableSubmitButton);
$("#bacf-email").on("input", bacfEnableSubmitButton);
$("#bacf-phone").on("input", bacfEnableSubmitButton);
$("#bacf-time").on("change", bacfEnableSubmitButton);
$("#bacf-interested-in").on("change", bacfEnableSubmitButton);

// If #bacf-submit is clicked, check if bookACallValid is true, do nothing; otherwise, prevent default
$("#bacf-submit").click(function (e) {
  if (!bookACallValid) {
    e.preventDefault();
  } else {
    // Click on #book-a-call-submit (salesforce form)
    $("#book-a-call-submit").click();
  }
});

// If a number is entered in #bacf-first-name or #bacf-last_name, remove it immediately
$("#bacf-first-name").on("input", function () {
  var str = $(this).val();
  var newStr = str.replace(/[0-9]/g, "");
  $(this).val(newStr);
});

$("#bacf-last_name").on("input", function () {
  var str = $(this).val();
  var newStr = str.replace(/[0-9]/g, "");
  $(this).val(newStr);
});

$("#bacf-phone").on("input", function () {
  // Make sure to remove all non-numeric characters but allow + and space
  var str = $(this).val();
  var newStr = str.replace(/[^0-9\+\s]/g, "");
  $(this).val(newStr);
});

/*
 *
 *
 *
 *
 *
 *
 *
 *
 */

// if user is in the contact page /contact-us
if (window.location.href.indexOf("contact-us") > -1) {
  $("#cf-submit").css("cursor", "not-allowed");
  $("#cf-submit").css("opacity", "0.25");

  let contactFormValid = false;

  // Enable/disable submit button based on form validity
  function cfEnableSubmitButton() {
    var firstName = $("#cf-first-name").val();
    var lastName = $("#cf-last-name").val();
    var company = $("#cf-company").val();
    var jobTitle = $("#cf-job-title").val();
    var email = $("#cf-email").val();
    var phone = $("#cf-phone").val();
    var location = $("#cf-location").val();
    var fleetSize = $("#cf-fleet-size").val();
    var time = $("#cf-time").val();
    var lease = $("#cf-lease").val();
    var anythingElse = $("#cf-anything-else").val();

    var isFormValid =
      !isEmpty(firstName) &&
      !isEmpty(lastName) &&
      !isEmpty(company) &&
      !isEmpty(jobTitle) &&
      !isEmpty(email) &&
      isValidEmail(email) &&
      !isEmpty(phone) &&
      !isEmpty(location) &&
      !isEmpty(fleetSize) &&
      !isEmpty(time) &&
      !isEmpty(lease) &&
      !isEmpty(anythingElse) &&
      isRecaptchaValid;

    if (isFormValid) {
      $("#cf-submit").css("cursor", "pointer");
      $("#cf-submit").css("opacity", "1");
      contactFormValid = true;
      // console.log("contactFormValid is true");
    } else {
      $("#cf-submit").css("cursor", "not-allowed");
      $("#cf-submit").css("opacity", "0.25");
      contactFormValid = false;
      // console.log("contactFormValid is still false");
    }
  }

  // Add event listeners to input fields and select options for form validation
  $("#cf-first-name").on("input", cfEnableSubmitButton);
  $("#cf-last-name").on("input", cfEnableSubmitButton);
  $("#cf-company").on("input", cfEnableSubmitButton);
  $("#cf-job-title").on("input", cfEnableSubmitButton);
  $("#cf-email").on("input", cfEnableSubmitButton);
  $("#cf-phone").on("input", cfEnableSubmitButton);
  $("#cf-location").on("change", cfEnableSubmitButton);
  $("#cf-fleet-size").on("input", cfEnableSubmitButton);
  $("#cf-time").on("change", cfEnableSubmitButton);
  $("#cf-lease").on("change", cfEnableSubmitButton);
  $("#cf-anything-else").on("input", cfEnableSubmitButton);

  //if #cf-submit is clicked, check if contactFormValid is true, do nothing, otherwise, prevent default
  $("#cf-submit").click(function (e) {
    if (contactFormValid == false) {
      e.preventDefault();
    } else {
      //click on #contact-submit (salesforce form)
      $("#contact-submit").click();
    }
  });

  //if a number is entered in #cf-first-name or #cf-last_name, remove it immediately
  $("#cf-first-name").on("input", function () {
    var str = $(this).val();
    var newStr = str.replace(/[0-9]/g, "");
    $(this).val(newStr);
  });

  $("#cf-last-name").on("input", function () {
    var str = $(this).val();
    var newStr = str.replace(/[0-9]/g, "");
    $(this).val(newStr);
  });

  $("#cf-phone").on("input", function () {
    //make sure to remove all non-numeric characters but allow + and space
    var str = $(this).val();
    var newStr = str.replace(/[^0-9\+\s]/g, "");
    $(this).val(newStr);
  });
}

/*
 *
 *
 *
 *
 *
 *
 */

//continuosly check if there's ?form-success=true in the current url
setInterval(function () {
  if (window.location.href.indexOf("form-success=true") > -1) {
    console.log("Form successfully sent");
    //remove ?form-success=true from the current url and keep the rest as it is, but dont refresh the page
    window.history.replaceState(
      {},
      document.title,
      "/" +
        window.location.href
          .substring(window.location.href.lastIndexOf("/") + 1)
          .split("?")[0]
    );
    alert("Form successfully sent!");
  }
}, 100);

//if #contactform is present
if ($("#contactform").length) {
  // Store the contact form HTML content
  var contactFormContent = $("#contactform").html();
  // console.log(contactFormContent);

  // Remove the contact form from the DOM when #bacf-from-contact is clicked
  $("#bacf-from-contact").click(function () {
    $("#contactform").remove();
  });

  // Add the contact form back to #cf-holder when #bcaf-close-icon is clicked
  $("#bcaf-close-icon").click(function () {
    // Check if the contact form element already exists
    if (!$("#contactform").length) {
      // Create a new contact form element and add the stored content
      $("<div>")
        .attr("id", "contactform")
        .html(contactFormContent)
        .appendTo("#cf-holder");
    }
  });
}