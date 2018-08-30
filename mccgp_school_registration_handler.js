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
  data["IP Address"] = ip_addr;
  data.formDataNameOrder = JSON.stringify(fields);
  data.formGoogleSheetName = form.dataset.sheet || "Registration"; // default sheet name
  data.formGoogleSendEmail = form.dataset.Email || ""; // no email by default

  return data;
}

// Reset all alerts.
function reset_alerts() {
  document.getElementById("child1_first_name_alert").style.display = "none";
  document.getElementById("child1_first_name_id").classList.remove("border");
  document.getElementById("child1_first_name_id").classList.remove("border-danger");
  document.getElementById("child1_last_name_alert").style.display = "none";
  document.getElementById("child1_last_name_id").classList.remove("border");
  document.getElementById("child1_last_name_id").classList.remove("border-danger");
  document.getElementById("child1_gender_alert").style.display = "none";
  document.getElementById("child1_dob_alert").style.display = "none";
  document.getElementById("child1_dob_id").classList.remove("border");
  document.getElementById("child1_dob_id").classList.remove("border-danger");
  document.getElementById("child2_first_name_alert").style.display = "none";
  document.getElementById("child2_first_name_id").classList.remove("border");
  document.getElementById("child2_first_name_id").classList.remove("border-danger");
  document.getElementById("child2_last_name_alert").style.display = "none";
  document.getElementById("child2_last_name_id").classList.remove("border");
  document.getElementById("child2_last_name_id").classList.remove("border-danger");
  document.getElementById("child2_gender_alert").style.display = "none";
  document.getElementById("child2_dob_alert").style.display = "none";
  document.getElementById("child2_dob_id").classList.remove("border");
  document.getElementById("child2_dob_id").classList.remove("border-danger");
  document.getElementById("child3_first_name_alert").style.display = "none";
  document.getElementById("child3_first_name_id").classList.remove("border");
  document.getElementById("child3_first_name_id").classList.remove("border-danger");
  document.getElementById("child3_last_name_alert").style.display = "none";
  document.getElementById("child3_last_name_id").classList.remove("border");
  document.getElementById("child3_last_name_id").classList.remove("border-danger");
  document.getElementById("child3_gender_alert").style.display = "none";
  document.getElementById("child3_dob_alert").style.display = "none";
  document.getElementById("child3_dob_id").classList.remove("border");
  document.getElementById("child3_dob_id").classList.remove("border-danger");
  document.getElementById("child4_first_name_alert").style.display = "none";
  document.getElementById("child4_first_name_id").classList.remove("border");
  document.getElementById("child4_first_name_id").classList.remove("border-danger");
  document.getElementById("child4_last_name_alert").style.display = "none";
  document.getElementById("child4_last_name_id").classList.remove("border");
  document.getElementById("child4_last_name_id").classList.remove("border-danger");
  document.getElementById("child4_gender_alert").style.display = "none";
  document.getElementById("child4_dob_alert").style.display = "none";
  document.getElementById("child4_dob_id").classList.remove("border");
  document.getElementById("child4_dob_id").classList.remove("border-danger");
  document.getElementById("child2_alert").style.display = "none";
  document.getElementById("child3_alert").style.display = "none";
  document.getElementById("child4_alert").style.display = "none";
  document.getElementById("mother_first_name_alert").style.display = "none";
  document.getElementById("mother_first_name_id").classList.remove("border");
  document.getElementById("mother_first_name_id").classList.remove("border-danger");
  document.getElementById("mother_last_name_alert").style.display = "none";
  document.getElementById("mother_last_name_id").classList.remove("border");
  document.getElementById("mother_last_name_id").classList.remove("border-danger");
  document.getElementById("mother_phone_alert").style.display = "none";
  document.getElementById("mother_phone_id").classList.remove("border");
  document.getElementById("mother_phone_id").classList.remove("border-danger");
  document.getElementById("mother_email_alert").style.display = "none";
  document.getElementById("mother_email_id").classList.remove("border");
  document.getElementById("mother_email_id").classList.remove("border-danger");
  document.getElementById("father_first_name_alert").style.display = "none";
  document.getElementById("father_first_name_id").classList.remove("border");
  document.getElementById("father_first_name_id").classList.remove("border-danger");
  document.getElementById("father_last_name_alert").style.display = "none";
  document.getElementById("father_last_name_id").classList.remove("border");
  document.getElementById("father_last_name_id").classList.remove("border-danger");
  document.getElementById("father_phone_alert").style.display = "none";
  document.getElementById("father_phone_id").classList.remove("border");
  document.getElementById("father_phone_id").classList.remove("border-danger");
  document.getElementById("father_email_alert").style.display = "none";
  document.getElementById("father_email_id").classList.remove("border");
  document.getElementById("father_email_id").classList.remove("border-danger");
  document.getElementById("address_alert").style.display = "none";
  document.getElementById("address_id").classList.remove("border");
  document.getElementById("address_id").classList.remove("border-danger");
  document.getElementById("city_alert").style.display = "none";
  document.getElementById("city_id").classList.remove("border");
  document.getElementById("city_id").classList.remove("border-danger");
  document.getElementById("zip_alert").style.display = "none";
  document.getElementById("zip_id").classList.remove("border");
  document.getElementById("zip_id").classList.remove("border-danger");
  document.getElementById("home_phone_alert").style.display = "none";
  document.getElementById("home_phone_id").classList.remove("border");
  document.getElementById("home_phone_id").classList.remove("border-danger");
  document.getElementById("emergency_name_alert").style.display = "none";
  document.getElementById("emergency_name_id").classList.remove("border");
  document.getElementById("emergency_name_id").classList.remove("border-danger");
  document.getElementById("emergency_phone_alert").style.display = "none";
  document.getElementById("emergency_phone_id").classList.remove("border");
  document.getElementById("emergency_phone_id").classList.remove("border-danger");
  document.getElementById("member_alert").style.display = "none";
  document.getElementById("handbook_signup_alert").style.display = "none";
  document.getElementById("volunteeer_alert").style.display = "none";
  document.getElementById("sign_alert").style.display = "none";
  document.getElementById("sign_id").classList.remove("border");
  document.getElementById("sign_id").classList.remove("border-danger");
  document.getElementById("submit_alert").style.display = "none";
}

// Checks the form for completion and ensures consistency of data
function check_completion(data) {

  reset_alerts();

  var valid = true;

  // Perform child checks. The last three are optional, and are performed in a
  // different way. The second boolean parameter indicates if the category
  // is mandatory (true) or not (false)
  if(!child_checks("child1", true)) {
    valid = false;
  }

  if(!child_checks("child2", false)) {
    valid = false;
  }

  if(!child_checks("child3", false)) {
    valid = false;
  }

  if(!child_empty("child3") && child_empty("child2")) {
    document.getElementById('child2_alert').style.display = "block";
    valid = false;
  }

  if(!child_checks("child4", false)) {
    valid = false;
  }

  if(!child_empty("child4")) {

    if(child_empty("child2")) {
      document.getElementById('child2_alert').style.display = "block";
      valid = false;
    }

    if(child_empty("child3")) {
      document.getElementById('child3_alert').style.display = "block";
      valid = false;
    }
  }

  // Parent checks
  if(!parent_checks("mother")) {

    valid = false;
  }

  if(!parent_checks("father")) {

    valid = false;
  }

  // Residence Verification
  if(document.getElementById('address_id').value === "") {

    document.getElementById('address_id').className += " border border-danger";
    document.getElementById('address_alert').style.display = "block";
    valid = false;
  }

  if(document.getElementById('city_id').value === "") {

    document.getElementById('city_id').className += " border border-danger";
    document.getElementById('city_alert').style.display = "block";
    valid = false;
  }

  if(document.getElementById('zip_id').value === "" ||
     !valid_zip(document.getElementById('zip_id').value)) {

    document.getElementById('zip_id').className += " border border-danger";
    document.getElementById('zip_alert').style.display = "block";
    valid = false;
  }

  if(document.getElementById('home_phone_id').value === "" ||
     !valid_phone(document.getElementById('home_phone_id').value)) {

    document.getElementById('home_phone_id').className += " border border-danger";
    document.getElementById('home_phone_alert').style.display = "block";
    valid = false;
  }

  // Important Information Verification
  if(document.getElementById('emergency_name_id').value === "") {

    document.getElementById('emergency_name_id').className += " border border-danger";
    document.getElementById('emergency_name_alert').style.display = "block";
    valid = false;
  }

  if(document.getElementById('emergency_phone_id').value === "" ||
    !valid_phone(document.getElementById('emergency_phone_id').value)) {

    document.getElementById('emergency_phone_id').className += " border border-danger";
    document.getElementById('emergency_phone_alert').style.display = "block";
    valid = false;
  }

  if(!document.getElementById('member_yes_id').checked &&
     !document.getElementById('member_no_id').checked) {

    document.getElementById('member_alert').style.display = "block";
    valid = false;
  }

  if(!document.getElementById("parent_handbook_id").checked ||
     !document.getElementById("signups_id").checked) {

    document.getElementById('handbook_signup_alert').style.display = "block";
    valid = false;
  }

  if(document.getElementById('sign_id').value === "") {

    document.getElementById('sign_id').className += " border border-danger";
    document.getElementById('sign_alert').style.display = "block";
    valid = false;
  }

  return valid;
}

function child_empty(field_name)
{
  if(document.getElementById(field_name + '_first_name_id').value === "" &&
     document.getElementById(field_name + '_last_name_id').value === "" &&
     !document.getElementById(field_name + '_gender_male').checked &&
     !document.getElementById(field_name + '_gender_female').checked &&
     document.getElementById(field_name + '_dob_id').value === "") {

       return true;
  }

  return false;
}

function child_checks(field_name, mandatory)
{
  var valid = true;
  // If all are empty, then we're good as this is optional category
  if(!mandatory && child_empty(field_name)) {

       return valid;
  }

  if(document.getElementById(field_name + '_first_name_id').value === "") {

    document.getElementById(field_name + '_first_name_id').className += " border border-danger";
    document.getElementById(field_name + '_first_name_alert').style.display = "block";
    valid = false;
  }

  if(document.getElementById(field_name + '_last_name_id').value === "") {

    document.getElementById(field_name + '_last_name_id').className += " border border-danger";
    document.getElementById(field_name + '_last_name_alert').style.display = "block";
    valid = false;
  }

  if(!document.getElementById(field_name + '_gender_male').checked &&
     !document.getElementById(field_name + '_gender_female').checked)  {

    document.getElementById(field_name + '_gender_alert').style.display = "block";
    valid = false;
  }

  if(document.getElementById(field_name + '_dob_id').value === "") {
    document.getElementById(field_name + '_dob_id').className += " border border-danger";

    document.getElementById(field_name + '_dob_alert').style.display = "block";
    valid = false;
  }

  return valid;
}

function parent_checks(field_name)
{
  var valid = true;
  if(document.getElementById(field_name + '_first_name_id').value === "") {

    document.getElementById(field_name + '_first_name_id').className += " border border-danger";
    document.getElementById(field_name + '_first_name_alert').style.display = "block";
    valid = false;
  }

  if(document.getElementById(field_name + '_last_name_id').value === "") {

    document.getElementById(field_name + '_last_name_id').className += " border border-danger";
    document.getElementById(field_name + '_last_name_alert').style.display = "block";
    valid = false;
  }

  if(document.getElementById(field_name + '_phone_id').value === "" ||
    !valid_phone(document.getElementById(field_name + '_phone_id').value)) {

    document.getElementById(field_name + '_phone_id').className += " border border-danger";
    document.getElementById(field_name + '_phone_alert').style.display = "block";
    valid = false;
  }

  if(document.getElementById(field_name + '_email_id').value === "" ||
     !valid_email(document.getElementById(field_name + '_email_id').value)) {

    document.getElementById(field_name + '_email_id').className += " border border-danger";
    document.getElementById(field_name + '_email_alert').style.display = "block";
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
    document.getElementById('submit_alert').style.display = "block";
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
        // Display the error page if error was returned
        document.location.replace('http://www.mccgp.org/school-already-registered.html');
      } else {
        // Display the error page if error was returned
        document.location.replace('http://www.mccgp.org/school-already-registered.html');
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

        // Hide the entire check registration form.
        document.getElementById("mccgp-school-registration-check").hidden = true;

        // Display the information found alert
        document.getElementById("info_found_alert_id").style.display = "block";

        // Display the registration form
        document.getElementById('mccgp-school-registration').hidden = false;

        // Enable the submit button
        document.getElementById("submit-form").disabled = false;
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

  reset_alerts();
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

  reset_alerts();
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

// *************************************************************** //
// Event listeners for keypresses and clicks. This resets the alerts and
// enables form submission

// Child1
document.getElementById("child1_first_name_id").addEventListener("keyup", function() {
  document.getElementById("child1_first_name_id").classList.remove("border");
  document.getElementById("child1_first_name_id").classList.remove("border-danger");
  document.getElementById("child1_first_name_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child1_last_name_id").addEventListener("keyup", function() {
  document.getElementById("child1_last_name_id").classList.remove("border");
  document.getElementById("child1_last_name_id").classList.remove("border-danger");
  document.getElementById("child1_last_name_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child1_gender_male").addEventListener("click", function() {
  document.getElementById("child1_gender_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child1_gender_female").addEventListener("click", function() {
  document.getElementById("child1_gender_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child1_dob_id").addEventListener("keyup", function() {
  document.getElementById("child1_dob_id").classList.remove("border");
  document.getElementById("child1_dob_id").classList.remove("border-danger");
  document.getElementById("child1_dob_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Child2
document.getElementById("child2_first_name_id").addEventListener("keyup", function() {
  document.getElementById("child2_first_name_id").classList.remove("border");
  document.getElementById("child2_first_name_id").classList.remove("border-danger");
  document.getElementById("child2_first_name_alert").style.display = "none";
  document.getElementById("child2_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child2_last_name_id").addEventListener("keyup", function() {
  document.getElementById("child2_last_name_id").classList.remove("border");
  document.getElementById("child2_last_name_id").classList.remove("border-danger");
  document.getElementById("child2_last_name_alert").style.display = "none";
  document.getElementById("child2_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child2_gender_male").addEventListener("click", function() {
  document.getElementById("child2_gender_alert").style.display = "none";
  document.getElementById("child2_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child2_gender_female").addEventListener("click", function() {
  document.getElementById("child2_gender_alert").style.display = "none";
  document.getElementById("child2_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child2_dob_id").addEventListener("keyup", function() {
  document.getElementById("child2_dob_id").classList.remove("border");
  document.getElementById("child2_dob_id").classList.remove("border-danger");
  document.getElementById("child2_dob_alert").style.display = "none";
  document.getElementById("child2_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Child3
document.getElementById("child3_first_name_id").addEventListener("keyup", function() {
  document.getElementById("child3_first_name_id").classList.remove("border");
  document.getElementById("child3_first_name_id").classList.remove("border-danger");
  document.getElementById("child3_first_name_alert").style.display = "none";
  document.getElementById("child3_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child3_last_name_id").addEventListener("keyup", function() {
  document.getElementById("child3_last_name_id").classList.remove("border");
  document.getElementById("child3_last_name_id").classList.remove("border-danger");
  document.getElementById("child3_last_name_alert").style.display = "none";
  document.getElementById("child3_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child3_gender_male").addEventListener("click", function() {
  document.getElementById("child3_gender_alert").style.display = "none";
  document.getElementById("child3_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child3_gender_female").addEventListener("click", function() {
  document.getElementById("child3_gender_alert").style.display = "none";
  document.getElementById("child3_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child3_dob_id").addEventListener("keyup", function() {
  document.getElementById("child3_dob_id").classList.remove("border");
  document.getElementById("child3_dob_id").classList.remove("border-danger");
  document.getElementById("child3_dob_alert").style.display = "none";
  document.getElementById("child3_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Child4
document.getElementById("child4_first_name_id").addEventListener("keyup", function() {
  document.getElementById("child4_first_name_id").classList.remove("border");
  document.getElementById("child4_first_name_id").classList.remove("border-danger");
  document.getElementById("child4_first_name_alert").style.display = "none";
  document.getElementById("child4_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child4_last_name_id").addEventListener("keyup", function() {
  document.getElementById("child4_last_name_id").classList.remove("border");
  document.getElementById("child4_last_name_id").classList.remove("border-danger");
  document.getElementById("child4_last_name_alert").style.display = "none";
  document.getElementById("child4_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child4_gender_male").addEventListener("click", function() {
  document.getElementById("child4_gender_alert").style.display = "none";
  document.getElementById("child4_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child4_gender_female").addEventListener("click", function() {
  document.getElementById("child4_gender_alert").style.display = "none";
  document.getElementById("child4_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child4_dob_id").addEventListener("keyup", function() {
  document.getElementById("child4_dob_id").classList.remove("border");
  document.getElementById("child4_dob_id").classList.remove("border-danger");
  document.getElementById("child4_dob_alert").style.display = "none";
  document.getElementById("child4_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Mother
document.getElementById("mother_first_name_id").addEventListener("keyup", function() {
  document.getElementById("mother_first_name_id").classList.remove("border");
  document.getElementById("mother_first_name_id").classList.remove("border-danger");
  document.getElementById("mother_first_name_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("mother_last_name_id").addEventListener("keyup", function() {
  document.getElementById("mother_last_name_id").classList.remove("border");
  document.getElementById("mother_last_name_id").classList.remove("border-danger");
  document.getElementById("mother_last_name_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("mother_phone_id").addEventListener("keyup", function() {
  document.getElementById("mother_phone_id").classList.remove("border");
  document.getElementById("mother_phone_id").classList.remove("border-danger");
  document.getElementById("mother_phone_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("mother_email_id").addEventListener("keyup", function() {
  document.getElementById("mother_email_id").classList.remove("border");
  document.getElementById("mother_email_id").classList.remove("border-danger");
  document.getElementById("mother_email_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Father
document.getElementById("father_first_name_id").addEventListener("keyup", function() {
  document.getElementById("father_first_name_id").classList.remove("border");
  document.getElementById("father_first_name_id").classList.remove("border-danger");
  document.getElementById("father_first_name_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("father_last_name_id").addEventListener("keyup", function() {
  document.getElementById("father_last_name_id").classList.remove("border");
  document.getElementById("father_last_name_id").classList.remove("border-danger");
  document.getElementById("father_last_name_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("father_phone_id").addEventListener("keyup", function() {
  document.getElementById("father_phone_id").classList.remove("border");
  document.getElementById("father_phone_id").classList.remove("border-danger");
  document.getElementById("father_phone_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("father_email_id").addEventListener("keyup", function() {
  document.getElementById("father_email_id").classList.remove("border");
  document.getElementById("father_email_id").classList.remove("border-danger");
  document.getElementById("father_email_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Residence
document.getElementById("address_id").addEventListener("keyup", function() {
  document.getElementById("address_id").classList.remove("border");
  document.getElementById("address_id").classList.remove("border-danger");
  document.getElementById("address_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("city_id").addEventListener("keyup", function() {
  document.getElementById("city_id").classList.remove("border");
  document.getElementById("city_id").classList.remove("border-danger");
  document.getElementById("city_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("zip_id").addEventListener("keyup", function() {
  document.getElementById("zip_id").classList.remove("border");
  document.getElementById("zip_id").classList.remove("border-danger");
  document.getElementById("zip_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("home_phone_id").addEventListener("keyup", function() {
  document.getElementById("home_phone_id").classList.remove("border");
  document.getElementById("home_phone_id").classList.remove("border-danger");
  document.getElementById("home_phone_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Important Information
document.getElementById("emergency_name_id").addEventListener("keyup", function() {
  document.getElementById("emergency_name_id").classList.remove("border");
  document.getElementById("emergency_name_id").classList.remove("border-danger");
  document.getElementById("emergency_name_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("emergency_phone_id").addEventListener("keyup", function() {
  document.getElementById("emergency_phone_id").classList.remove("border");
  document.getElementById("emergency_phone_id").classList.remove("border-danger");
  document.getElementById("emergency_phone_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("member_yes_id").addEventListener("click", function() {
  document.getElementById("member_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("member_no_id").addEventListener("click", function() {
  document.getElementById("member_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("parent_handbook_id").addEventListener("click", function() {
  document.getElementById("handbook_signup_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("signups_id").addEventListener("click", function() {
  document.getElementById("handbook_signup_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("volunteeer_arabic_id").addEventListener("click", function() {
  document.getElementById("volunteeer_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("volunteeer_islam_id").addEventListener("click", function() {
  document.getElementById("volunteeer_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("volunteeer_sub_id").addEventListener("click", function() {
  document.getElementById("volunteeer_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Signature
document.getElementById("sign_id").addEventListener("keyup", function() {
  document.getElementById("sign_id").classList.remove("border");
  document.getElementById("sign_id").classList.remove("border-danger");
  document.getElementById("sign_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// *************************************************************** //
