var ip_addr = "";
function getIP(json) {
  ip_addr = json.ip;
}

function validEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

// get all data in form and return object
function getFormData() {
  var form = document.getElementById("mccgp-school-registration");
  var elements = form.elements; // all form elements

  var fields = Object.keys(elements).map(function(k) {
    if(elements[k].name !== undefined) {
      return elements[k].name;
    // special case for Edge's html collection
    } else if(elements[k].length > 0) {
      return elements[k].item(0).name;
    }
  }).filter(function(item, pos, self) {
    return self.indexOf(item) == pos && item;
  });

  var data = {};
  fields.forEach(function(k) {
    data[k] = elements[k].value;
    var str = ""; // declare empty string outside of loop to allow
                  // it to be appended to for each item in the loop
    if(elements[k].type === "checkbox") { // special case for Edge's html collection
      str = str + elements[k].checked + ", "; // take the string and append
                                              // the current checked value to
                                              // the end of it, along with
                                              // a comma and a space
      data[k] = str.slice(0, -2); // remove the last comma and space
                                  // from the string to make the output
                                  // prettier in the spreadsheet
    } else if(elements[k].length) {
      for(var i = 0; i < elements[k].length; i++) {
        if(elements[k].item(i).checked) {
          str = str + elements[k].item(i).value + ", "; // same as above
          data[k] = str.slice(0, -2);
        }
      }
    }
  });

  // add form-specific values into the data
  data.IP_Address = ip_addr;
  data.formDataNameOrder = JSON.stringify(fields);
  data.formGoogleSheetName = form.dataset.sheet || "Registration"; // default sheet name
  data.formGoogleSendEmail = form.dataset.Email || ""; // no email by default

  return data;
}

// Checks the form for completion and ensures consistency of data
function checkCompletion(data) {
  var valid = true;

  if(valid &&
     document.getElementById('registered_yes').checked &&
     (document.getElementById('email_id').value === "" ||
      !validEmail(data.email))) {

    document.getElementById('email_id').className += " border border-danger";
    document.getElementById('email_alert').style.display = "block";
    valid = false;
  }

  return valid;
}

// Handles form submit withtout any jquery. This is the main handler called
// when the user presses the submit button
function handleFormSubmit(event) {
  event.preventDefault();           // we are submitting via xhr below

  var data = getFormData();         // get the values submitted in the form

  // If form isn't complete, don't proceed
  if(!checkCompletion(data)) {
    return false;
  }

  // Form is ready to for submission

  // Disable the submit button to prevent the user from submitting the form
  // more than one time.
  document.getElementById('submit-form').disabled = true;

  var url = event.target.action;
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {

      // Debug logging
      console.log(xhr.status, xhr.statusText)
      console.log(xhr.responseText);

      // Parse the response text and look for "result":"error"
      var result = JSON.parse(xhr.responseText);
      if(result['result'] === 'success') {
        // Display the survey submitted page
        document.getElementById("email_id").value = result["First Name"];
        //document.location.replace('mccgp_school_registration_form.html');
        document.getElementById("textbox_id").value = result["First Name"];
        alert(result["First Name"]);
      } else {
        // Display the error page if error was returned
        document.location.replace('http://www.mccgp.org/survey-already-submitted.html');
      }

    }
    return;
  };

  // url encode form data for sending as post data
  var encoded = Object.keys(data).map(function(k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  }).join('&')
  xhr.send(encoded);
}

// Event listeners
function loaded() {
  // bind to the submit event of our form
  var form = document.getElementById('mccgp-school-registration');
  form.addEventListener("submit", handleFormSubmit, false);
};

document.addEventListener('DOMContentLoaded', loaded, false);

// ============================================================== //
// Reset Eventlisteners: Restore original state when the control is clicked

// Have you registered?
document.getElementById("registered_yes").addEventListener("click", function() {
  document.getElementById("email_section").style.display = "block";
  document.getElementById("submit-form").disabled = false;

});

document.getElementById("registered_no").addEventListener("click", function() {
  document.getElementById("email_section").style.display = "none";
  document.getElementById("email_id").value = "";
  document.getElementById("submit-form").disabled = false;
});

// First Name
/*document.getElementById("first_name_txt").addEventListener("keypress", function() {
  document.getElementById('first_name_txt').classList.remove("border");
  document.getElementById('first_name_txt').classList.remove("border-danger");
  document.getElementById("first_name_alert").style.display = "none";
});*/

// Email
document.getElementById("email_id").addEventListener("keypress", function() {
  document.getElementById("email_id").classList.remove("border");
  document.getElementById("email_id").classList.remove("border-danger");
  document.getElementById("email_alert").style.display = "none";
});



// ============================================================== //
