var ip_addr = "";
function get_ip(json) {
  ip_addr = json.ip;
}

function valid_email(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function valid_zip(zip) {
  var re = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
  return re.test(zip)
}

function valid_phone(phone) {
  var re = /^(\()?[2-9]{1}\d{2}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
  return re.test(phone);
}

function is_number(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

// get all data in form and return object
function get_form_data() {
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
function check_completion(data) {
  var valid = true;

  if(valid &&
     document.getElementById('registered_yes').checked &&
     (document.getElementById('email_id').value === "" || !validEmail(data.email))) {

    document.getElementById('email_id').className += " border border-danger";
    document.getElementById('email_alert').style.display = "block";
    valid = false;
  }

  return valid;
}

// Fill the form with prior registration data that was returned
function fill_form(result)
{
  // First, reset the fields in case previously filled.
  reset_fields();

  document.getElementById("info_found_alert_id").style.display = "block";

  document.getElementById("child1_first_name_id").value = result["Child1 First Name"];
  document.getElementById("child1_last_name_id").value = result["Child1 Last Name"];
  if(result["Child1 Gender"] === "Male")
  {
    document.getElementById("child1_gender_male").checked = true;
  }
  else if(result["Child1 Gender"] === "Female")
  {
    document.getElementById("child1_gender_female").checked = true;
  }
  document.getElementById("child1_dob_id").value = result["Child1 Date of Birth"];

  document.getElementById("child2_first_name_id").value = result["Child2 First Name"];
  document.getElementById("child2_last_name_id").value = result["Child2 Last Name"];
  if(result["Child2 Gender"] === "Male")
  {
    document.getElementById("child2_gender_male").checked = true;
  }
  else if(result["Child2 Gender"] === "Female")
  {
    document.getElementById("child2_gender_female").checked = true;
  }
  document.getElementById("child2_dob_id").value = result["Child2 Date of Birth"];

  document.getElementById("child3_first_name_id").value = result["Child3 First Name"];
  document.getElementById("child3_last_name_id").value = result["Child3 Last Name"];
  if(result["Child3 Gender"] === "Male")
  {
    document.getElementById("child3_gender_male").checked = true;
  }
  else if(result["Child3 Gender"] === "Female")
  {
    document.getElementById("child3_gender_female").checked = true;
  }
  document.getElementById("child3_dob_id").value = result["Child3 Date of Birth"];

  document.getElementById("child4_first_name_id").value = result["Child4 First Name"];
  document.getElementById("child4_last_name_id").value = result["Child4 Last Name"];
  if(result["Child4 Gender"] === "Male")
  {
    document.getElementById("child4_gender_male").checked = true;
  }
  else if(result["Child4 Gender"] === "Female")
  {
    document.getElementById("child4_gender_female").checked = true;
  }
  document.getElementById("child4_dob_id").value = result["Child4 Date of Birth"];

  document.getElementById("mother_first_name_id").value = result["Parent First Name"];
  document.getElementById("mother_last_name_id").value = result["Parent Last Name"];
  document.getElementById("mother_phone_id").value = result["Cell Phone Number"]
  document.getElementById("mother_email_id").value = result["Email"];

  document.getElementById("father_first_name_id").value = "";
  document.getElementById("father_last_name_id").value = "";
  document.getElementById("father_phone_id").value = "";
  document.getElementById("father_email_id").value = "";

  document.getElementById("address_id").value = result["Address"];
  document.getElementById("city_id").value = result["City"];
  document.getElementById("zip_id").value = result["Zip"];
  document.getElementById("home_phone_id").value = result["Home Phone Number"];

  document.getElementById("emergency_name_id").value = result["Emergency Contact"];
  document.getElementById("emergency_phone_id").value = result["Emergency Contact Phone"];
}

// Handles form submit withtout any jquery. This is the main handler called
// when the user presses the submit button
function handle_form_submit(event) {
  event.preventDefault();           // we are submitting via xhr below

  var data = get_form_data();         // get the values submitted in the form

  // If form isn't complete, don't proceed
  if(!check_completion(data)) {
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
        fill_form(result);
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

// Checks if the registration exists for the given email
function check_registration(event) {
  event.preventDefault();           // we are submitting via xhr below

  const email = document.getElementById("email_id").value;

  if(document.getElementById('registered_yes').checked &&
     (email === "" || !valid_email(email))) {

    document.getElementById('email_id').className += " border border-danger";
    document.getElementById('email_alert').style.display = "block";

    return;
  }

  // Form is ready to for submission

  // Disable the go button to prevent the user from taking any further action
  document.getElementById('check_registration_btn_id').disabled = true;

  var url = event.target.action;
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200)
    {
      // Debug logging
      console.log(xhr.status, xhr.statusText)
      console.log(xhr.responseText);

      // Parse the response text and look for "result":"error"
      var result = JSON.parse(xhr.responseText);
      if(result['result'] === 'success')
      {
        // Success. We have data to display on the registration form
        fill_form(result);

        // Hide all the entire check registration form.
        document.getElementById("mccgp-school-registration-check").hidden = true;

        // Display the registration form and information found alert
        document.getElementById("info_found_alert_id").style.display = "block";

        document.getElementById('mccgp-school-registration').hidden = false;
      }
      else
      {
        // We didn't find any data for this email
        document.getElementById("info_not_found_alert_id").style.display = "block";

        // Enable the go button and clear the email field
        document.getElementById('check_registration_btn_id').disabled = false;
        document.getElementById('email_id').value = "";
      }
    }
    return;
  };

  var data = {};
  data['email'] = email;

  // url encode form data for sending as post data
  var encoded = Object.keys(data).map(function(k)
  {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  }).join('&')
  xhr.send(encoded);
}

// Reset the form fields
function reset_fields()
{
  document.getElementById("child1_first_name_id").value = "";
  document.getElementById("child1_last_name_id").value = "";
  document.getElementById("child1_gender_male").checked = false;
  document.getElementById("child1_gender_female").checked = false;
  document.getElementById("child1_dob_id").value = "";

  document.getElementById("child2_first_name_id").value = "";
  document.getElementById("child2_last_name_id").value = "";
  document.getElementById("child2_gender_male").checked = false;
  document.getElementById("child2_gender_female").checked = false;
  document.getElementById("child2_dob_id").value = "";

  document.getElementById("child3_first_name_id").value = "";
  document.getElementById("child3_last_name_id").value = "";
  document.getElementById("child3_gender_male").checked = false;
  document.getElementById("child3_gender_female").checked = false;
  document.getElementById("child3_dob_id").value = "";

  document.getElementById("child4_first_name_id").value = "";
  document.getElementById("child4_last_name_id").value = "";
  document.getElementById("child4_gender_male").checked = false;
  document.getElementById("child4_gender_female").checked = false;
  document.getElementById("child4_dob_id").value = "";

  document.getElementById("mother_first_name_id").value = "";
  document.getElementById("mother_last_name_id").value = "";
  document.getElementById("mother_phone_id").value = "";
  document.getElementById("mother_email_id").value = "";

  document.getElementById("father_first_name_id").value = "";
  document.getElementById("father_last_name_id").value = "";
  document.getElementById("father_phone_id").value = "";
  document.getElementById("father_email_id").value = "";

  document.getElementById("address_id").value = "";
  document.getElementById("city_id").value = "";
  document.getElementById("zip_id").value = "";
  document.getElementById("home_phone_id").value = "";

  document.getElementById("emergency_name_id").value = "";
  document.getElementById("emergency_phone_id").value = "";
  document.getElementById("member_yes_id").checked = false;
  document.getElementById("member_no_id").checked = false;
  document.getElementById("parent_handbook_id").checked = false;
  document.getElementById("signups_id").checked = false;
  document.getElementById("volunteeer_arabic_id").checked = false;
  document.getElementById("volunteeer_islam_id").checked = false;
  document.getElementById("volunteeer_sub_id").checked = false;

  document.getElementById("sign_id").value = "";
}

// Event listeners
function loaded() {
  // bind to the submit event of our form
  var check_form = document.getElementById('mccgp-school-registration-check');
  check_form.addEventListener("submit", check_registration, false);

  var register_form = document.getElementById('mccgp-school-registration');
  register_form.addEventListener("submit", handle_form_submit, false);

  register_form.hidden = true;

  document.getElementById("info_found_alert_id").style.display = "none";
  document.getElementById("info_not_found_alert_id").style.display = "none";
  document.getElementById("not_registered_id").style.display = "none";

  // Set today's Date
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();
  if(dd < 10)
  {
    dd = '0' + dd;
  }

  if(mm < 10)
  {
    mm = '0' + mm;
  }

  document.getElementById("todays_date_id").value = mm + '/' + dd + '/' + yyyy;
};

document.addEventListener('DOMContentLoaded', loaded, false);

// Registered click
document.getElementById("registered_yes").addEventListener("click", function() {
  document.getElementById("email_section").style.display = "block";
  document.getElementById("check_registration_btn_id").hidden = false;
  document.getElementById("check_registration_btn_id").disabled = true;
  document.getElementById("email_id").value = "";
  document.getElementById("caption_id").innerHTML = "Let's check if you've registered with us before ...";
  document.getElementById("mccgp-school-registration").hidden = true;
  document.getElementById("info_found_alert_id").style.display = "none";
  document.getElementById("info_not_found_alert_id").style.display = "none";
  document.getElementById("not_registered_id").style.display = "none";
});

// Not registered click
document.getElementById("registered_no").addEventListener("click", function() {
  document.getElementById("email_section").style.display = "none";
  document.getElementById("email_id").value = "";
  document.getElementById("check_registration_btn_id").hidden = true;
  document.getElementById("submit-form").disabled = false;
  document.getElementById("caption_id").innerHTML = "Please fill and submit the form to register ...";

  document.getElementById('mccgp-school-registration').hidden = false;

  document.getElementById("info_found_alert_id").style.display = "none";
  document.getElementById("info_not_found_alert_id").style.display = "none";

  document.getElementById("not_registered_id").style.display = "block";
});

// sign up button click
document.getElementById("signup_id").addEventListener("click", function() {
  document.getElementById("email_section").style.display = "none";
  document.getElementById("email_id").value = "";
  document.getElementById("check_registration_btn_id").hidden = true;
  document.getElementById("caption_id").innerHTML = "Please fill and submit the form to register ...";
  document.getElementById("registered_yes").checked = false;
  document.getElementById("registered_no").checked = false;

  document.getElementById('mccgp-school-registration').hidden = false;
  document.getElementById("info_found_alert_id").style.display = "none";
  document.getElementById("info_not_found_alert_id").style.display = "none";
  document.getElementById("not_registered_id").style.display = "block";
});

// First Name
/*document.getElementById("first_name_txt").addEventListener("keypress", function() {
  document.getElementById('first_name_txt').classList.remove("border");
  document.getElementById('first_name_txt').classList.remove("border-danger");
  document.getElementById("first_name_alert").style.display = "none";
});*/

// Email
document.getElementById("email_id").addEventListener("keyup", function() {
  document.getElementById("email_id").classList.remove("border");
  document.getElementById("email_id").classList.remove("border-danger");
  document.getElementById("email_alert").style.display = "none";
  document.getElementById("info_not_found_alert_id").style.display = "none";

  if(document.getElementById("email_id").value === "")
  {
    document.getElementById("check_registration_btn_id").disabled = true;
  }
  else
  {
    document.getElementById("check_registration_btn_id").disabled = false;
  }
});


/*
function display_form()
{
  // Setup elements on the page; reset them to their default statusText
  document.getElementById("info_found_alert_id").style.display = "block";
  document.getElementById("info_not_found_alert_id").style.display = "block";
  document.getElementById("not_registered_id").style.display = "none";
  document.getElementById("first_child_info_id").style.display = "block";
  document.getElementById("second_child_info_id").style.display = "block";
  document.getElementById("third_child_info_id").style.display = "block";
  document.getElementById("fourth_child_info_id").style.display = "block";
  document.getElementById("mother_info_id").style.display = "block";
  document.getElementById("father_info_id").style.display = "block";
  document.getElementById("residence_info_id").style.display = "block";
  document.getElementById("important_info_id").style.display = "block";
  document.getElementById("sign_and_date_id").style.display = "block";
  document.getElementById("submit-form").hidden = false;
}

function hide_form()
{
  // Setup elements on the page; reset them to their default statusText
  document.getElementById("info_found_alert_id").style.display = "none";
  document.getElementById("info_not_found_alert_id").style.display = "none";
  document.getElementById("not_registered_id").style.display = "none";
  document.getElementById("first_child_info_id").style.display = "none";
  document.getElementById("second_child_info_id").style.display = "none";
  document.getElementById("third_child_info_id").style.display = "none";
  document.getElementById("fourth_child_info_id").style.display = "none";
  document.getElementById("mother_info_id").style.display = "none";
  document.getElementById("father_info_id").style.display = "none";
  document.getElementById("residence_info_id").style.display = "none";
  document.getElementById("important_info_id").style.display = "none";
  document.getElementById("sign_and_date_id").style.display = "none";
  document.getElementById("submit-form").hidden = true;
}
*/
// ============================================================== //
