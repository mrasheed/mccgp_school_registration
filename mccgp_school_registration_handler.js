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

  var fields = Object.keys(elements).map(function (k) {
    if (elements[k].name !== undefined) {
      return elements[k].name;
      // special case for Edge's html collection
    } else if (elements[k].length > 0) {
      return elements[k].item(0).name;
    }
  }).filter(function (item, pos, self) {
    return self.indexOf(item) == pos && item;
  });

  var data = {};
  fields.forEach(function (k) {
    data[k] = elements[k].value;
    var str = ""; // declare empty string outside of loop to allow
    // it to be appended to for each item in the loop
    if (elements[k].type === "checkbox") { // special case for Edge's html collection
      if (elements[k].checked) {
        data[k] = "Yes";
      } else {
        data[k] = "No";
      }
      /*str = str + elements[k].checked + ", "; // take the string and append
                                              // the current checked value to
                                              // the end of it, along with
                                              // a comma and a space
      data[k] = str.slice(0, -2); // remove the last comma and space
                                  // from the string to make the output
                                  // prettier in the spreadsheet*/
    } else if (elements[k].length) {
      for (var i = 0; i < elements[k].length; i++) {
        if (elements[k].item(i).checked) {
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
  document.getElementById("tuition_alert").style.display = "none";
  document.getElementById("activities_alert").style.display = "none";
  document.getElementById("volunteer_alert").style.display = "none";
  document.getElementById("parent_support_agreement_alert").style.display = "none";
  document.getElementById("parent_pledge_alert").style.display = "none";
  document.getElementById("covid_screening_alert").style.display = "none";
  document.getElementById("covid_guidelines_alert").style.display = "none";
  document.getElementById("release_mccgp_liability_alert").style.display = "none";
  document.getElementById("release_mccgp_other_alert").style.display = "none";
  document.getElementById("field_trip_permission_alert").style.display = "none";
  document.getElementById("release_mccgp_photo_alert").style.display = "none";
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
  if (!child_checks("child1", true)) {
    valid = false;
  }

  if (!child_checks("child2", false)) {
    valid = false;
  }

  if (!child_checks("child3", false)) {
    valid = false;
  }

  if (!child_empty("child3") && child_empty("child2")) {
    document.getElementById('child2_alert').style.display = "block";
    valid = false;
  }

  if (!child_checks("child4", false)) {
    valid = false;
  }

  if (!child_empty("child4")) {

    if (child_empty("child2")) {
      document.getElementById('child2_alert').style.display = "block";
      valid = false;
    }

    if (child_empty("child3")) {
      document.getElementById('child3_alert').style.display = "block";
      valid = false;
    }
  }

  // Parent checks
  if (!parent_checks("mother")) {

    valid = false;
  }

  if (!parent_checks("father")) {

    valid = false;
  }

  // Residence Verification
  if (document.getElementById('address_id').value === "") {

    document.getElementById('address_id').className += " border border-danger";
    document.getElementById('address_alert').style.display = "block";
    valid = false;
  }

  if (document.getElementById('city_id').value === "") {

    document.getElementById('city_id').className += " border border-danger";
    document.getElementById('city_alert').style.display = "block";
    valid = false;
  }

  if (document.getElementById('zip_id').value === "" ||
    !valid_zip(document.getElementById('zip_id').value)) {

    document.getElementById('zip_id').className += " border border-danger";
    document.getElementById('zip_alert').style.display = "block";
    valid = false;
  }

  if (document.getElementById('home_phone_id').value === "" ||
    !valid_phone(document.getElementById('home_phone_id').value)) {

    document.getElementById('home_phone_id').className += " border border-danger";
    document.getElementById('home_phone_alert').style.display = "block";
    valid = false;
  }

  // Important Information Verification
  if (document.getElementById('emergency_name_id').value === "") {

    document.getElementById('emergency_name_id').className += " border border-danger";
    document.getElementById('emergency_name_alert').style.display = "block";
    valid = false;
  }

  if (document.getElementById('emergency_phone_id').value === "" ||
    !valid_phone(document.getElementById('emergency_phone_id').value)) {

    document.getElementById('emergency_phone_id').className += " border border-danger";
    document.getElementById('emergency_phone_alert').style.display = "block";
    valid = false;
  }

  if (!document.getElementById('member_yes_id').checked &&
    !document.getElementById('member_no_id').checked) {

    document.getElementById('member_alert').style.display = "block";
    valid = false;
  }

  if (!document.getElementById("tuition_yes_id").checked &&
    !document.getElementById("tuition_no_id").checked) {

    document.getElementById('tuition_alert').style.display = "block";
    valid = false;
  }

  if (!document.getElementById("activities_lunch_id").checked ||
    !document.getElementById("activities_bake_sale_id").checked ||
    !document.getElementById("activities_recess_id").checked ||
    !document.getElementById("activities_after_school_cleanup_id").checked ||
    !document.getElementById("activities_calendar_id").checked) {

    document.getElementById('activities_alert').style.display = "block";
    valid = false;
  }

  if (document.getElementById("volunteer_quran_assistant_id").checked &&
    document.getElementById("volunteer_quran_age_range_id").value === "") {

    document.getElementById('volunteer_alert').style.display = "block";
    valid = false;
  }

  if (document.getElementById("volunteer_islam_assistant_id").checked &&
    document.getElementById("volunteer_islam_age_range_id").value === "") {

    document.getElementById('volunteer_alert').style.display = "block";
    valid = false;
  }

  if (!document.getElementById("parent_support_agreement_id").checked) {

    document.getElementById('parent_support_agreement_alert').style.display = "block";
    valid = false;
  }

  if (!document.getElementById("covid_screening_id").checked) {

    document.getElementById('covid_screening_alert').style.display = "block";
    valid = false;
  }

  if (!document.getElementById("covid_guidelines_id").checked) {

    document.getElementById('covid_guidelines_alert').style.display = "block";
    valid = false;
  }

  if (!document.getElementById("parent_pledge_instill_islamic_values_id").checked ||
    !document.getElementById("parent_pledge_regular_attendance_id").checked ||
    !document.getElementById("parent_pledge_reinforce_learning_id").checked ||
    !document.getElementById("parent_pledge_active_participation_id").checked ||
    !document.getElementById("parent_pledge_regular_communication_id").checked) {

    document.getElementById('parent_pledge_alert').style.display = "block";
    valid = false;
  }

  if (!document.getElementById("release_mccgp_liability_id").checked) {

    document.getElementById('release_mccgp_liability_alert').style.display = "block";
    valid = false;
  }

  if (!document.getElementById("release_mccgp_money_damages_id").checked ||
    !document.getElementById("release_mccgp_all_damages_id").checked ||
    !document.getElementById("release_mccgp_other_id").checked) {

    document.getElementById('release_mccgp_other_alert').style.display = "block";
    valid = false;
  }

  if (!document.getElementById("field_trip_permission_id").checked) {

    document.getElementById('field_trip_permission_alert').style.display = "block";
    valid = false;
  }

  if (!document.getElementById("release_mccgp_photo_id").checked) {

    document.getElementById('release_mccgp_photo_alert').style.display = "block";
    valid = false;
  }

  if (document.getElementById('sign_id').value === "") {

    document.getElementById('sign_id').className += " border border-danger";
    document.getElementById('sign_alert').style.display = "block";
    valid = false;
  }

  return valid;
}

function child_empty(field_name) {
  var sel = document.getElementById(field_name + '_prev_level_id');
  if (document.getElementById(field_name + '_first_name_id').value === "" &&
    document.getElementById(field_name + '_last_name_id').value === "" &&
    !document.getElementById(field_name + '_gender_male').checked &&
    !document.getElementById(field_name + '_gender_female').checked &&
    document.getElementById(field_name + '_dob_id').value === "" &&
    sel.options[sel.selectedIndex].text === "") {

    return true;
  }

  return false;
}

function child_checks(field_name, mandatory) {
  var valid = true;
  // If all are empty, then we're good as this is optional category
  if (!mandatory && child_empty(field_name)) {

    return valid;
  }

  if (document.getElementById(field_name + '_first_name_id').value === "") {

    document.getElementById(field_name + '_first_name_id').className += " border border-danger";
    document.getElementById(field_name + '_first_name_alert').style.display = "block";
    valid = false;
  }

  if (document.getElementById(field_name + '_last_name_id').value === "") {

    document.getElementById(field_name + '_last_name_id').className += " border border-danger";
    document.getElementById(field_name + '_last_name_alert').style.display = "block";
    valid = false;
  }

  if (!document.getElementById(field_name + '_gender_male').checked &&
    !document.getElementById(field_name + '_gender_female').checked) {

    document.getElementById(field_name + '_gender_alert').style.display = "block";
    valid = false;
  }

  if (document.getElementById(field_name + '_dob_id').value === "") {
    document.getElementById(field_name + '_dob_id').className += " border border-danger";

    document.getElementById(field_name + '_dob_alert').style.display = "block";
    valid = false;
  }

  sel = document.getElementById(field_name + '_prev_level_id');
  if (sel.options[sel.selectedIndex].text === "") {
    document.getElementById(field_name + '_prev_level_alert').style.display = "block";
    valid = false;
  }

  return valid;
}

function parent_checks(field_name) {
  var valid = true;
  if (document.getElementById(field_name + '_first_name_id').value === "") {

    document.getElementById(field_name + '_first_name_id').className += " border border-danger";
    document.getElementById(field_name + '_first_name_alert').style.display = "block";
    valid = false;
  }

  if (document.getElementById(field_name + '_last_name_id').value === "") {

    document.getElementById(field_name + '_last_name_id').className += " border border-danger";
    document.getElementById(field_name + '_last_name_alert').style.display = "block";
    valid = false;
  }

  if (document.getElementById(field_name + '_phone_id').value === "" ||
    !valid_phone(document.getElementById(field_name + '_phone_id').value)) {

    document.getElementById(field_name + '_phone_id').className += " border border-danger";
    document.getElementById(field_name + '_phone_alert').style.display = "block";
    valid = false;
  }

  if (document.getElementById(field_name + '_email_id').value === "" ||
    !valid_email(document.getElementById(field_name + '_email_id').value)) {

    document.getElementById(field_name + '_email_id').className += " border border-danger";
    document.getElementById(field_name + '_email_alert').style.display = "block";
    valid = false;
  }

  return valid;
}

// Fill the form with prior registration data that was returned
function fill_form(result) {
  // First, reset the fields in case previously filled.
  reset_fields();

  document.getElementById("info_found_alert_id").style.display = "block";

  document.getElementById("child1_first_name_id").value = result["Child1_First_Name"];
  document.getElementById("child1_last_name_id").value = result["Child1_Last_Name"];
  if (result["Child1_Gender"] === "Male") {
    document.getElementById("child1_gender_male").checked = true;
  }
  else if (result["Child1_Gender"] === "Female") {
    document.getElementById("child1_gender_female").checked = true;
  }
  document.getElementById("child1_dob_id").value = result["Child1_DOB"];

  document.getElementById("child2_first_name_id").value = result["Child2_First_Name"];
  document.getElementById("child2_last_name_id").value = result["Child2_Last_Name"];
  if (result["Child2_Gender"] === "Male") {
    document.getElementById("child2_gender_male").checked = true;
  }
  else if (result["Child2_Gender"] === "Female") {
    document.getElementById("child2_gender_female").checked = true;
  }
  document.getElementById("child2_dob_id").value = result["Child2_DOB"];

  document.getElementById("child3_first_name_id").value = result["Child3_First_Name"];
  document.getElementById("child3_last_name_id").value = result["Child3_Last_Name"];
  if (result["Child3_Gender"] === "Male") {
    document.getElementById("child3_gender_male").checked = true;
  }
  else if (result["Child3_Gender"] === "Female") {
    document.getElementById("child3_gender_female").checked = true;
  }
  document.getElementById("child3_dob_id").value = result["Child3_DOB"];

  document.getElementById("child4_first_name_id").value = result["Child4_First_Name"];
  document.getElementById("child4_last_name_id").value = result["Child4_Last_Name"];
  if (result["Child4_Gender"] === "Male") {
    document.getElementById("child4_gender_male").checked = true;
  }
  else if (result["Child4_Gender"] === "Female") {
    document.getElementById("child4_gender_female").checked = true;
  }
  document.getElementById("child4_dob_id").value = result["Child4_DOB"];

  document.getElementById("mother_first_name_id").value = result["Mother_First_Name"];
  document.getElementById("mother_last_name_id").value = result["Mother_Last_Name"];
  document.getElementById("mother_phone_id").value = result["Mother_Phone"];
  document.getElementById("mother_email_id").value = result["Mother_Email"];

  document.getElementById("father_first_name_id").value = result["Father_First_Name"];
  document.getElementById("father_last_name_id").value = result["Father_Last_Name"];
  document.getElementById("father_phone_id").value = result["Father_Phone"]
  document.getElementById("father_email_id").value = result["Father_Email"];

  document.getElementById("address_id").value = result["Address"];
  document.getElementById("city_id").value = result["City"];
  document.getElementById("zip_id").value = result["Zip"];
  document.getElementById("home_phone_id").value = result["Home_Phone"];

  document.getElementById("emergency_name_id").value = result["Emergency_Contact"];
  document.getElementById("emergency_phone_id").value = result["Emergency_Phone"];
}

// Handles form submit withtout any jquery. This is the main handler called
// when the user presses the submit button
function handle_form_submit(event) {
  event.preventDefault();           // we are submitting via xhr below

  var data = get_form_data();         // get the values submitted in the form

  // If form isn't complete, don't proceed
  if (!check_completion(data)) {
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
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {

      // Debug logging
      console.log(xhr.status, xhr.statusText)
      console.log(xhr.responseText);

      // Parse the response text and look for "result":"error"
      var result = JSON.parse(xhr.responseText);
      if (result['result'] === 'success') {
        // Display the error page if error was returned
        document.location.replace('http://www.mccgp.org/school-registration-success.html');
      } else if (result['result'] === 'already_registered') {
        // Display already registered page
        document.location.replace('http://www.mccgp.org/school-already-registered.html');
      } else {
        // Display the error page if error was returned
        document.location.replace('http://www.mccgp.org/school-registration-error.html');
      }
    }
    return;
  };

  // url encode form data for sending as post data
  var encoded = Object.keys(data).map(function (k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  }).join('&')
  xhr.send(encoded);
}

// Checks if the registration exists for the given email
function check_registration(event) {
  event.preventDefault();           // we are submitting via xhr below

  const email = document.getElementById("email_id").value;

  if (document.getElementById('registered_yes').checked &&
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
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Debug logging
      console.log(xhr.status, xhr.statusText)
      console.log(xhr.responseText);

      // Parse the response text and look for "result":"error"
      var result = JSON.parse(xhr.responseText);
      if (result['result'] === 'success') {
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
      else {
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
  var encoded = Object.keys(data).map(function (k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  }).join('&')
  xhr.send(encoded);
}

// Reset the form fields
function reset_fields() {
  document.getElementById("child1_first_name_id").value = "";
  document.getElementById("child1_last_name_id").value = "";
  document.getElementById("child1_gender_male").checked = false;
  document.getElementById("child1_gender_female").checked = false;
  document.getElementById("child1_dob_id").value = "";
  document.getElementById("child1_prev_level_id").selectedIndex = 0;

  document.getElementById("child2_first_name_id").value = "";
  document.getElementById("child2_last_name_id").value = "";
  document.getElementById("child2_gender_male").checked = false;
  document.getElementById("child2_gender_female").checked = false;
  document.getElementById("child2_dob_id").value = "";
  document.getElementById("child2_prev_level_id").selectedIndex = 0;

  document.getElementById("child3_first_name_id").value = "";
  document.getElementById("child3_last_name_id").value = "";
  document.getElementById("child3_gender_male").checked = false;
  document.getElementById("child3_gender_female").checked = false;
  document.getElementById("child3_dob_id").value = "";
  document.getElementById("child3_prev_level_id").selectedIndex = 0;

  document.getElementById("child4_first_name_id").value = "";
  document.getElementById("child4_last_name_id").value = "";
  document.getElementById("child4_gender_male").checked = false;
  document.getElementById("child4_gender_female").checked = false;
  document.getElementById("child4_dob_id").value = "";
  document.getElementById("child4_prev_level_id").selectedIndex = 0;

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
  document.getElementById("tuition_yes_id").checked = false;
  document.getElementById("tuition_no_id").checked = false;
  document.getElementById("activities_lunch_id").checked = false;
  document.getElementById("activities_bake_sale_id").checked = false;
  document.getElementById("activities_recess_id").checked = false;
  document.getElementById("activities_after_school_cleanup_id").checked = false;
  document.getElementById("activities_calendar_id").checked = false;
  document.getElementById("volunteer_quran_assistant_id").checked = false;
  document.getElementById("volunteer_islam_assistant_id").checked = false;
  document.getElementById("volunteer_quran_age_range_id").value = "";
  document.getElementById("volunteer_islam_age_range_id").value = "";
  document.getElementById("parent_support_agreement_id").checked = false;
  document.getElementById("parent_pledge_instill_islamic_values_id").checked = false;
  document.getElementById("parent_pledge_regular_attendance_id").checked = false;
  document.getElementById("parent_pledge_reinforce_learning_id").checked = false;
  document.getElementById("parent_pledge_active_participation_id").checked = false;
  document.getElementById("parent_pledge_regular_communication_id").checked = false;
  document.getElementById("covid_screening_id").checked = false;
  document.getElementById("covid_guidelines_id").checked = false;
  document.getElementById("release_mccgp_liability_id").checked = false;
  document.getElementById("release_mccgp_money_damages_id").checked = false;
  document.getElementById("release_mccgp_all_damages_id").checked = false;
  document.getElementById("release_mccgp_other_id").checked = false;
  document.getElementById("field_trip_permission_id").checked = false;
  document.getElementById("release_mccgp_photo_id").checked = false;

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
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }

  document.getElementById("todays_date_id").value = mm + '/' + dd + '/' + yyyy;
};

document.addEventListener('DOMContentLoaded', loaded, false);

// Registered click
document.getElementById("registered_yes").addEventListener("click", function () {
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
document.getElementById("registered_no").addEventListener("click", function () {
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
document.getElementById("signup_id").addEventListener("click", function () {
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
document.getElementById("email_id").addEventListener("keyup", function () {
  document.getElementById("email_id").classList.remove("border");
  document.getElementById("email_id").classList.remove("border-danger");
  document.getElementById("email_alert").style.display = "none";
  document.getElementById("info_not_found_alert_id").style.display = "none";

  if (document.getElementById("email_id").value === "") {
    document.getElementById("check_registration_btn_id").disabled = true;
  }
  else {
    document.getElementById("check_registration_btn_id").disabled = false;
  }
});

// *************************************************************** //
// Event listeners for keypresses and clicks. This resets the alerts and
// enables form submission

// Child1
document.getElementById("child1_first_name_id").addEventListener("keyup", function () {
  document.getElementById("child1_first_name_id").classList.remove("border");
  document.getElementById("child1_first_name_id").classList.remove("border-danger");
  document.getElementById("child1_first_name_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child1_last_name_id").addEventListener("keyup", function () {
  document.getElementById("child1_last_name_id").classList.remove("border");
  document.getElementById("child1_last_name_id").classList.remove("border-danger");
  document.getElementById("child1_last_name_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child1_gender_male").addEventListener("click", function () {
  document.getElementById("child1_gender_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child1_gender_female").addEventListener("click", function () {
  document.getElementById("child1_gender_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child1_dob_id").addEventListener("keyup", function () {
  document.getElementById("child1_dob_id").classList.remove("border");
  document.getElementById("child1_dob_id").classList.remove("border-danger");
  document.getElementById("child1_dob_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child1_prev_level_id").addEventListener("keyup", function () {
  document.getElementById("child1_prev_level_id").classList.remove("border");
  document.getElementById("child1_prev_level_id").classList.remove("border-danger");
  document.getElementById("child1_prev_level_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child1_prev_level_id").addEventListener("click", function () {
  document.getElementById("child1_prev_level_id").classList.remove("border");
  document.getElementById("child1_prev_level_id").classList.remove("border-danger");
  document.getElementById("child1_prev_level_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Child2
document.getElementById("child2_first_name_id").addEventListener("keyup", function () {
  document.getElementById("child2_first_name_id").classList.remove("border");
  document.getElementById("child2_first_name_id").classList.remove("border-danger");
  document.getElementById("child2_first_name_alert").style.display = "none";
  document.getElementById("child2_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child2_last_name_id").addEventListener("keyup", function () {
  document.getElementById("child2_last_name_id").classList.remove("border");
  document.getElementById("child2_last_name_id").classList.remove("border-danger");
  document.getElementById("child2_last_name_alert").style.display = "none";
  document.getElementById("child2_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child2_gender_male").addEventListener("click", function () {
  document.getElementById("child2_gender_alert").style.display = "none";
  document.getElementById("child2_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child2_gender_female").addEventListener("click", function () {
  document.getElementById("child2_gender_alert").style.display = "none";
  document.getElementById("child2_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child2_dob_id").addEventListener("keyup", function () {
  document.getElementById("child2_dob_id").classList.remove("border");
  document.getElementById("child2_dob_id").classList.remove("border-danger");
  document.getElementById("child2_dob_alert").style.display = "none";
  document.getElementById("child2_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child2_prev_level_id").addEventListener("keyup", function () {
  document.getElementById("child2_prev_level_id").classList.remove("border");
  document.getElementById("child2_prev_level_id").classList.remove("border-danger");
  document.getElementById("child2_prev_level_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child2_prev_level_id").addEventListener("click", function () {
  document.getElementById("child2_prev_level_id").classList.remove("border");
  document.getElementById("child2_prev_level_id").classList.remove("border-danger");
  document.getElementById("child2_prev_level_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Child3
document.getElementById("child3_first_name_id").addEventListener("keyup", function () {
  document.getElementById("child3_first_name_id").classList.remove("border");
  document.getElementById("child3_first_name_id").classList.remove("border-danger");
  document.getElementById("child3_first_name_alert").style.display = "none";
  document.getElementById("child3_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child3_last_name_id").addEventListener("keyup", function () {
  document.getElementById("child3_last_name_id").classList.remove("border");
  document.getElementById("child3_last_name_id").classList.remove("border-danger");
  document.getElementById("child3_last_name_alert").style.display = "none";
  document.getElementById("child3_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child3_gender_male").addEventListener("click", function () {
  document.getElementById("child3_gender_alert").style.display = "none";
  document.getElementById("child3_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child3_gender_female").addEventListener("click", function () {
  document.getElementById("child3_gender_alert").style.display = "none";
  document.getElementById("child3_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child3_dob_id").addEventListener("keyup", function () {
  document.getElementById("child3_dob_id").classList.remove("border");
  document.getElementById("child3_dob_id").classList.remove("border-danger");
  document.getElementById("child3_dob_alert").style.display = "none";
  document.getElementById("child3_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child3_prev_level_id").addEventListener("keyup", function () {
  document.getElementById("child3_prev_level_id").classList.remove("border");
  document.getElementById("child3_prev_level_id").classList.remove("border-danger");
  document.getElementById("child3_prev_level_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child3_prev_level_id").addEventListener("click", function () {
  document.getElementById("child3_prev_level_id").classList.remove("border");
  document.getElementById("child3_prev_level_id").classList.remove("border-danger");
  document.getElementById("child3_prev_level_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Child4
document.getElementById("child4_first_name_id").addEventListener("keyup", function () {
  document.getElementById("child4_first_name_id").classList.remove("border");
  document.getElementById("child4_first_name_id").classList.remove("border-danger");
  document.getElementById("child4_first_name_alert").style.display = "none";
  document.getElementById("child4_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child4_last_name_id").addEventListener("keyup", function () {
  document.getElementById("child4_last_name_id").classList.remove("border");
  document.getElementById("child4_last_name_id").classList.remove("border-danger");
  document.getElementById("child4_last_name_alert").style.display = "none";
  document.getElementById("child4_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child4_gender_male").addEventListener("click", function () {
  document.getElementById("child4_gender_alert").style.display = "none";
  document.getElementById("child4_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child4_gender_female").addEventListener("click", function () {
  document.getElementById("child4_gender_alert").style.display = "none";
  document.getElementById("child4_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child4_dob_id").addEventListener("keyup", function () {
  document.getElementById("child4_dob_id").classList.remove("border");
  document.getElementById("child4_dob_id").classList.remove("border-danger");
  document.getElementById("child4_dob_alert").style.display = "none";
  document.getElementById("child4_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child4_prev_level_id").addEventListener("keyup", function () {
  document.getElementById("child4_prev_level_id").classList.remove("border");
  document.getElementById("child4_prev_level_id").classList.remove("border-danger");
  document.getElementById("child4_prev_level_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("child4_prev_level_id").addEventListener("click", function () {
  document.getElementById("child4_prev_level_id").classList.remove("border");
  document.getElementById("child4_prev_level_id").classList.remove("border-danger");
  document.getElementById("child4_prev_level_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Mother
document.getElementById("mother_first_name_id").addEventListener("keyup", function () {
  document.getElementById("mother_first_name_id").classList.remove("border");
  document.getElementById("mother_first_name_id").classList.remove("border-danger");
  document.getElementById("mother_first_name_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("mother_last_name_id").addEventListener("keyup", function () {
  document.getElementById("mother_last_name_id").classList.remove("border");
  document.getElementById("mother_last_name_id").classList.remove("border-danger");
  document.getElementById("mother_last_name_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("mother_phone_id").addEventListener("keyup", function () {
  document.getElementById("mother_phone_id").classList.remove("border");
  document.getElementById("mother_phone_id").classList.remove("border-danger");
  document.getElementById("mother_phone_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("mother_email_id").addEventListener("keyup", function () {
  document.getElementById("mother_email_id").classList.remove("border");
  document.getElementById("mother_email_id").classList.remove("border-danger");
  document.getElementById("mother_email_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Father
document.getElementById("father_first_name_id").addEventListener("keyup", function () {
  document.getElementById("father_first_name_id").classList.remove("border");
  document.getElementById("father_first_name_id").classList.remove("border-danger");
  document.getElementById("father_first_name_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("father_last_name_id").addEventListener("keyup", function () {
  document.getElementById("father_last_name_id").classList.remove("border");
  document.getElementById("father_last_name_id").classList.remove("border-danger");
  document.getElementById("father_last_name_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("father_phone_id").addEventListener("keyup", function () {
  document.getElementById("father_phone_id").classList.remove("border");
  document.getElementById("father_phone_id").classList.remove("border-danger");
  document.getElementById("father_phone_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("father_email_id").addEventListener("keyup", function () {
  document.getElementById("father_email_id").classList.remove("border");
  document.getElementById("father_email_id").classList.remove("border-danger");
  document.getElementById("father_email_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Residence
document.getElementById("address_id").addEventListener("keyup", function () {
  document.getElementById("address_id").classList.remove("border");
  document.getElementById("address_id").classList.remove("border-danger");
  document.getElementById("address_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("city_id").addEventListener("keyup", function () {
  document.getElementById("city_id").classList.remove("border");
  document.getElementById("city_id").classList.remove("border-danger");
  document.getElementById("city_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("zip_id").addEventListener("keyup", function () {
  document.getElementById("zip_id").classList.remove("border");
  document.getElementById("zip_id").classList.remove("border-danger");
  document.getElementById("zip_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("home_phone_id").addEventListener("keyup", function () {
  document.getElementById("home_phone_id").classList.remove("border");
  document.getElementById("home_phone_id").classList.remove("border-danger");
  document.getElementById("home_phone_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Important Information
document.getElementById("emergency_name_id").addEventListener("keyup", function () {
  document.getElementById("emergency_name_id").classList.remove("border");
  document.getElementById("emergency_name_id").classList.remove("border-danger");
  document.getElementById("emergency_name_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("emergency_phone_id").addEventListener("keyup", function () {
  document.getElementById("emergency_phone_id").classList.remove("border");
  document.getElementById("emergency_phone_id").classList.remove("border-danger");
  document.getElementById("emergency_phone_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("member_yes_id").addEventListener("click", function () {
  document.getElementById("member_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("member_no_id").addEventListener("click", function () {
  document.getElementById("member_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("tuition_yes_id").addEventListener("click", function () {
  document.getElementById("tuition_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("tuition_no_id").addEventListener("click", function () {
  document.getElementById("tuition_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("activities_lunch_id").addEventListener("click", function () {
  document.getElementById("activities_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("activities_bake_sale_id").addEventListener("click", function () {
  document.getElementById("activities_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("activities_recess_id").addEventListener("click", function () {
  document.getElementById("activities_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("activities_after_school_cleanup_id").addEventListener("click", function () {
  document.getElementById("activities_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("activities_calendar_id").addEventListener("click", function () {
  document.getElementById("activities_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("volunteer_quran_assistant_id").addEventListener("click", function () {
  if (this.checked) {
    document.getElementById("volunteer_quran_range_section").style.display = "block";
  }
  else {
    document.getElementById("volunteer_quran_range_section").style.display = "none";
  }
  document.getElementById("volunteer_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("volunteer_islam_assistant_id").addEventListener("click", function () {
  if (this.checked) {
    document.getElementById("volunteer_islam_range_section").style.display = "block";
  }
  else {
    document.getElementById("volunteer_islam_range_section").style.display = "none";
  }
  document.getElementById("volunteer_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("volunteer_quran_age_range_id").addEventListener("keyup", function () {
  document.getElementById("volunteer_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("volunteer_islam_age_range_id").addEventListener("keyup", function () {
  document.getElementById("volunteer_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("parent_support_agreement_id").addEventListener("click", function () {
  document.getElementById("parent_support_agreement_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("parent_pledge_instill_islamic_values_id").addEventListener("click", function () {
  document.getElementById("parent_pledge_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("parent_pledge_regular_attendance_id").addEventListener("click", function () {
  document.getElementById("parent_pledge_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("parent_pledge_reinforce_learning_id").addEventListener("click", function () {
  document.getElementById("parent_pledge_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("parent_pledge_active_participation_id").addEventListener("click", function () {
  document.getElementById("parent_pledge_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("parent_pledge_regular_communication_id").addEventListener("click", function () {
  document.getElementById("parent_pledge_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Covid Agreement
document.getElementById("covid_screening_id").addEventListener("click", function () {
  document.getElementById("covid_screening_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("covid_guidelines_id").addEventListener("click", function () {
  document.getElementById("covid_guidelines_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Release and Waivers Statement
document.getElementById("release_mccgp_liability_id").addEventListener("click", function () {
  document.getElementById("release_mccgp_liability_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("release_mccgp_money_damages_id").addEventListener("click", function () {
  document.getElementById("release_mccgp_other_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("release_mccgp_all_damages_id").addEventListener("click", function () {
  document.getElementById("release_mccgp_other_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("release_mccgp_other_id").addEventListener("click", function () {
  document.getElementById("release_mccgp_other_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("field_trip_permission_id").addEventListener("click", function () {
  document.getElementById("field_trip_permission_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("release_mccgp_photo_id").addEventListener("click", function () {
  document.getElementById("release_mccgp_photo_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Signature
document.getElementById("sign_id").addEventListener("keyup", function () {
  document.getElementById("sign_id").classList.remove("border");
  document.getElementById("sign_id").classList.remove("border-danger");
  document.getElementById("sign_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// *************************************************************** //
