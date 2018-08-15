var ip_addr = "";
function getIP(json) {
  ip_addr = json.ip;
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
  var form = document.getElementById("ramadan-eid-survey");
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
  data.formGoogleSheetName = form.dataset.sheet || "Survey"; // default sheet name
  data.formGoogleSendEmail = form.dataset.Email || ""; // no email by default

  return data;
}

// Checks the form for completion and ensures consistency of data
function checkCompletion(data) {
  var valid = true;

  if(valid &&
     !document.getElementById('locality_monroe_murrys').checked &&
     !document.getElementById('locality_pitt').checked &&
     !document.getElementById('locality_north').checked &&
     !document.getElementById('locality_south_west').checked &&
     !document.getElementById('locality_visitor').checked ) {

    document.getElementById('residence_alert').style.display = "block";
    valid = false;
  }

  if(valid &&
     !document.getElementById('daily_iftar_daily').checked &&
     !document.getElementById('daily_iftar_weekends').checked &&
     !document.getElementById('daily_iftar_often').checked &&
     !document.getElementById('daily_iftar_infrequently').checked &&
     !document.getElementById('daily_iftar_none').checked ) {

    document.getElementById('daily_iftar_alert').style.display = "block";
    valid = false;
  }

  if(valid &&
     !document.getElementById('iftar_pref_daily').checked &&
     !document.getElementById('iftar_pref_weekends').checked &&
     !document.getElementById('iftar_pref_both').checked ) {

    document.getElementById('iftar_pref_alert').style.display = "block";
    valid = false;
  }

  if(valid &&
     !document.getElementById('support_iftars_yes').checked &&
     !document.getElementById('support_iftars_no').checked ) {

    document.getElementById('support_iftars_alert').style.display = "block";
    valid = false;
  }

  if(valid &&
     !document.getElementById('eid_experience_yes').checked &&
     !document.getElementById('eid_experience_no').checked ) {

    document.getElementById('eid_experience_alert').style.display = "block";
    valid = false;
  }

  if(valid &&
     !document.getElementById('eid_announcements_excel').checked &&
     !document.getElementById('eid_announcements_good').checked &&
     !document.getElementById('eid_announcements_avg').checked &&
     !document.getElementById('eid_announcements_below_avg').checked &&
     !document.getElementById('eid_announcements_poor').checked &&
     !document.getElementById('eid_announcements_not_appl').checked ) {

    document.getElementById('eid_items_alert').style.display = "block";
    valid = false;
  }

  if(valid &&
     !document.getElementById('eid_parking_arrangements_excel').checked &&
     !document.getElementById('eid_parking_arrangements_good').checked &&
     !document.getElementById('eid_parking_arrangements_avg').checked &&
     !document.getElementById('eid_parking_arrangements_below_avg').checked &&
     !document.getElementById('eid_parking_arrangements_poor').checked &&
     !document.getElementById('eid_parking_arrangements_not_appl').checked ) {

    document.getElementById('eid_items_alert').style.display = "block";
    valid = false;
  }

  if(valid &&
     !document.getElementById('eid_prayer_arrangements_excel').checked &&
     !document.getElementById('eid_prayer_arrangements_good').checked &&
     !document.getElementById('eid_prayer_arrangements_avg').checked &&
     !document.getElementById('eid_prayer_arrangements_below_avg').checked &&
     !document.getElementById('eid_prayer_arrangements_poor').checked &&
     !document.getElementById('eid_prayer_arrangements_not_appl').checked ) {

    document.getElementById('eid_items_alert').style.display = "block";
    valid = false;
  }

  if(valid &&
     !document.getElementById('first_eid_khutba_excel').checked &&
     !document.getElementById('first_eid_khutba_good').checked &&
     !document.getElementById('first_eid_khutba_avg').checked &&
     !document.getElementById('first_eid_khutba_below_avg').checked &&
     !document.getElementById('first_eid_khutba_poor').checked &&
     !document.getElementById('first_eid_khutba_not_appl').checked ) {

    document.getElementById('eid_items_alert').style.display = "block";
    valid = false;
  }

  if(valid &&
     !document.getElementById('second_eid_khutba_excel').checked &&
     !document.getElementById('second_eid_khutba_good').checked &&
     !document.getElementById('second_eid_khutba_avg').checked &&
     !document.getElementById('second_eid_khutba_below_avg').checked &&
     !document.getElementById('second_eid_khutba_poor').checked &&
     !document.getElementById('second_eid_khutba_not_appl').checked ) {

    document.getElementById('eid_items_alert').style.display = "block";
    valid = false;
  }

  if(valid &&
     !document.getElementById('eid_food_vendors_excel').checked &&
     !document.getElementById('eid_food_vendors_good').checked &&
     !document.getElementById('eid_food_vendors_avg').checked &&
     !document.getElementById('eid_food_vendors_below_avg').checked &&
     !document.getElementById('eid_food_vendors_poor').checked &&
     !document.getElementById('eid_food_vendors_not_appl').checked ) {

    document.getElementById('eid_items_alert').style.display = "block";
    valid = false;
  }

  if(valid &&
     !document.getElementById('eid_kids_activities_excel').checked &&
     !document.getElementById('eid_kids_activities_good').checked &&
     !document.getElementById('eid_kids_activities_avg').checked &&
     !document.getElementById('eid_kids_activities_below_avg').checked &&
     !document.getElementById('eid_kids_activities_poor').checked &&
     !document.getElementById('eid_kids_activities_not_appl').checked ) {

    document.getElementById('eid_items_alert').style.display = "block";
    valid = false;
  }

  if(valid &&
     !document.getElementById('eid_signage_excel').checked &&
     !document.getElementById('eid_signage_good').checked &&
     !document.getElementById('eid_signage_avg').checked &&
     !document.getElementById('eid_signage_below_avg').checked &&
     !document.getElementById('eid_signage_poor').checked &&
     !document.getElementById('eid_signage_not_appl').checked ) {

    document.getElementById('eid_items_alert').style.display = "block";
    valid = false;
  }

  if(valid &&
     !document.getElementById('ramadan_iftar_arrangements_excel').checked &&
     !document.getElementById('ramadan_iftar_arrangements_good').checked &&
     !document.getElementById('ramadan_iftar_arrangements_avg').checked &&
     !document.getElementById('ramadan_iftar_arrangements_below_avg').checked &&
     !document.getElementById('ramadan_iftar_arrangements_poor').checked &&
     !document.getElementById('ramadan_iftar_arrangements_not_appl').checked ) {

    document.getElementById('ramadan_items_alert').style.display = "block";
    valid = false;
  }

  if(valid &&
     !document.getElementById('ramadan_cleanliness_excel').checked &&
     !document.getElementById('ramadan_cleanliness_good').checked &&
     !document.getElementById('ramadan_cleanliness_avg').checked &&
     !document.getElementById('ramadan_cleanliness_below_avg').checked &&
     !document.getElementById('ramadan_cleanliness_poor').checked &&
     !document.getElementById('ramadan_cleanliness_not_appl').checked ) {

    document.getElementById('ramadan_items_alert').style.display = "block";
    valid = false;
  }

  if(valid &&
     !document.getElementById('ramadan_taraweeh_excel').checked &&
     !document.getElementById('ramadan_taraweeh_good').checked &&
     !document.getElementById('ramadan_taraweeh_avg').checked &&
     !document.getElementById('ramadan_taraweeh_below_avg').checked &&
     !document.getElementById('ramadan_taraweeh_poor').checked &&
     !document.getElementById('ramadan_taraweeh_not_appl').checked ) {

    document.getElementById('ramadan_items_alert').style.display = "block";
    valid = false;
  }

  if(valid &&
     !document.getElementById('ramadan_taraweeh_reflection_excel').checked &&
     !document.getElementById('ramadan_taraweeh_reflection_good').checked &&
     !document.getElementById('ramadan_taraweeh_reflection_avg').checked &&
     !document.getElementById('ramadan_taraweeh_reflection_below_avg').checked &&
     !document.getElementById('ramadan_taraweeh_reflection_poor').checked &&
     !document.getElementById('ramadan_taraweeh_reflection_not_appl').checked ) {

    document.getElementById('ramadan_items_alert').style.display = "block";
    valid = false;
  }

  if(valid &&
     !document.getElementById('ramadan_quran_reflections_excel').checked &&
     !document.getElementById('ramadan_quran_reflections_good').checked &&
     !document.getElementById('ramadan_quran_reflections_avg').checked &&
     !document.getElementById('ramadan_quran_reflections_below_avg').checked &&
     !document.getElementById('ramadan_quran_reflections_poor').checked &&
     !document.getElementById('ramadan_quran_reflections_not_appl').checked ) {

    document.getElementById('ramadan_items_alert').style.display = "block";
    valid = false;
  }

  if(valid &&
     !document.getElementById('ramadan_fajr_reflection_excel').checked &&
     !document.getElementById('ramadan_fajr_reflection_good').checked &&
     !document.getElementById('ramadan_fajr_reflection_avg').checked &&
     !document.getElementById('ramadan_fajr_reflection_below_avg').checked &&
     !document.getElementById('ramadan_fajr_reflection_poor').checked &&
     !document.getElementById('ramadan_fajr_reflection_not_appl').checked ) {

    document.getElementById('ramadan_items_alert').style.display = "block";
    valid = false;
  }

  if(valid &&
     !document.getElementById('ramadan_tahajjud_excel').checked &&
     !document.getElementById('ramadan_tahajjud_good').checked &&
     !document.getElementById('ramadan_tahajjud_avg').checked &&
     !document.getElementById('ramadan_tahajjud_below_avg').checked &&
     !document.getElementById('ramadan_tahajjud_poor').checked &&
     !document.getElementById('ramadan_tahajjud_not_appl').checked ) {

    document.getElementById('ramadan_items_alert').style.display = "block";
    valid = false;
  }

  if(valid &&
     !document.getElementById('ramadan_interfaith_iftar_excel').checked &&
     !document.getElementById('ramadan_interfaith_iftar_good').checked &&
     !document.getElementById('ramadan_interfaith_iftar_avg').checked &&
     !document.getElementById('ramadan_interfaith_iftar_below_avg').checked &&
     !document.getElementById('ramadan_interfaith_iftar_poor').checked &&
     !document.getElementById('ramadan_interfaith_iftar_not_appl').checked ) {

    document.getElementById('ramadan_items_alert').style.display = "block";
    valid = false;
  }

  if(valid &&
     !document.getElementById('ramadan_khatmul_quran_excel').checked &&
     !document.getElementById('ramadan_khatmul_quran_good').checked &&
     !document.getElementById('ramadan_khatmul_quran_avg').checked &&
     !document.getElementById('ramadan_khatmul_quran_below_avg').checked &&
     !document.getElementById('ramadan_khatmul_quran_poor').checked &&
     !document.getElementById('ramadan_khatmul_quran_not_appl').checked ) {

    document.getElementById('ramadan_items_alert').style.display = "block";
    valid = false;
  }

  if(valid &&
     !document.getElementById('ramadan_prayer_hall_excel').checked &&
     !document.getElementById('ramadan_prayer_hall_good').checked &&
     !document.getElementById('ramadan_prayer_hall_avg').checked &&
     !document.getElementById('ramadan_prayer_hall_below_avg').checked &&
     !document.getElementById('ramadan_prayer_hall_poor').checked &&
     !document.getElementById('ramadan_prayer_hall_not_appl').checked ) {

    document.getElementById('ramadan_items_alert').style.display = "block";
    valid = false;
  }

  if(valid &&
     !document.getElementById('ramadan_babysitting_excel').checked &&
     !document.getElementById('ramadan_babysitting_good').checked &&
     !document.getElementById('ramadan_babysitting_avg').checked &&
     !document.getElementById('ramadan_babysitting_below_avg').checked &&
     !document.getElementById('ramadan_babysitting_poor').checked &&
     !document.getElementById('ramadan_babysitting_not_appl').checked ) {

    document.getElementById('ramadan_items_alert').style.display = "block";
    valid = false;
  }

  if(valid &&
     !document.getElementById('ramadan_announcements_excel').checked &&
     !document.getElementById('ramadan_announcements_good').checked &&
     !document.getElementById('ramadan_announcements_avg').checked &&
     !document.getElementById('ramadan_announcements_below_avg').checked &&
     !document.getElementById('ramadan_announcements_poor').checked &&
     !document.getElementById('ramadan_announcements_not_appl').checked ) {

    document.getElementById('ramadan_items_alert').style.display = "block";
    valid = false;
  }

  if(valid && document.getElementById('comment_future_ramadan_eid').value === "") {

    document.getElementById('comment_future_ramadan_eid').className += " border border-danger";
    document.getElementById('comment_future_ramadan_eid_alert').style.display = "block";
    valid = false;
  }

  if(valid &&
     !document.getElementById('membership_yes').checked &&
     !document.getElementById('membership_no').checked ) {

    document.getElementById('membership_alert').style.display = "block";
    valid = false;
  }

  if(!valid) {
    document.getElementById('submit_alert').style.display = "block";
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
      console.log(xhr.status, xhr.statusText)
      console.log(xhr.responseText);

      // Parse the response text and look for "result":"error"
      var result = JSON.parse(xhr.responseText);
      if(result['result'] === 'success') {
        // Display the survey submitted page
        document.location.replace('http://www.mccgp.org/survey-submitted.html');
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
  var form = document.getElementById('ramadan-eid-survey');
  form.addEventListener("submit", handleFormSubmit, false);
};

document.addEventListener('DOMContentLoaded', loaded, false);

// ============================================================== //
// Reset Eventlisteners: Restore original state when the control is clicked

// Residence
document.getElementById("locality_monroe_murrys").addEventListener("click", function() {
  document.getElementById("residence_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("locality_pitt").addEventListener("click", function() {
  document.getElementById("residence_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("locality_north").addEventListener("click", function() {
  document.getElementById("residence_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("locality_south_west").addEventListener("click", function() {
  document.getElementById("residence_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("locality_visitor").addEventListener("click", function() {
  document.getElementById("residence_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Daily Iftars Frequency
document.getElementById("daily_iftar_daily").addEventListener("click", function() {
  document.getElementById("daily_iftar_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("daily_iftar_weekends").addEventListener("click", function() {
  document.getElementById("daily_iftar_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("daily_iftar_often").addEventListener("click", function() {
  document.getElementById("daily_iftar_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("daily_iftar_infrequently").addEventListener("click", function() {
  document.getElementById("daily_iftar_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("daily_iftar_none").addEventListener("click", function() {
  document.getElementById("daily_iftar_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Iftar Preference
document.getElementById("iftar_pref_daily").addEventListener("click", function() {
  document.getElementById("iftar_pref_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("iftar_pref_weekends").addEventListener("click", function() {
  document.getElementById("iftar_pref_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("iftar_pref_both").addEventListener("click", function() {
  document.getElementById("iftar_pref_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Financial Support?
document.getElementById("support_iftars_yes").addEventListener("click", function() {
  document.getElementById("support_iftars_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("support_iftars_no").addEventListener("click", function() {
  document.getElementById("support_iftars_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Memorable Eid Experience
document.getElementById("eid_experience_yes").addEventListener("click", function() {
  document.getElementById("eid_experience_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("eid_experience_no").addEventListener("click", function() {
  document.getElementById("eid_experience_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Eid Announcements
document.getElementById("eid_announcements_excel").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("eid_announcements_good").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("eid_announcements_avg").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("eid_announcements_below_avg").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("eid_announcements_poor").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("eid_announcements_not_appl").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Parking Arrangements
document.getElementById("eid_parking_arrangements_excel").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("eid_parking_arrangements_good").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("eid_parking_arrangements_avg").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("eid_parking_arrangements_below_avg").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("eid_parking_arrangements_poor").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("eid_parking_arrangements_not_appl").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Prayer Arrangements
document.getElementById("eid_prayer_arrangements_excel").addEventListener("click", function() {
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("eid_prayer_arrangements_good").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("eid_prayer_arrangements_avg").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("eid_prayer_arrangements_below_avg").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("eid_prayer_arrangements_poor").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("eid_prayer_arrangements_not_appl").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
  document.getElementById("eid_items_alert").style.display = "none";
});

// First Khutba
document.getElementById("first_eid_khutba_excel").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("first_eid_khutba_good").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("first_eid_khutba_avg").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("first_eid_khutba_below_avg").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("first_eid_khutba_poor").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("first_eid_khutba_not_appl").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Second Khutba
document.getElementById("second_eid_khutba_excel").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("second_eid_khutba_good").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("second_eid_khutba_avg").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("second_eid_khutba_below_avg").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("second_eid_khutba_poor").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("second_eid_khutba_not_appl").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Food Vendors
document.getElementById("eid_food_vendors_excel").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("eid_food_vendors_good").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("eid_food_vendors_avg").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("eid_food_vendors_below_avg").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("eid_food_vendors_poor").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("eid_food_vendors_not_appl").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Kids Activities
document.getElementById("eid_kids_activities_excel").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("eid_kids_activities_good").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("eid_kids_activities_avg").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("eid_kids_activities_below_avg").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("eid_kids_activities_poor").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("eid_kids_activities_not_appl").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Signage
document.getElementById("eid_signage_excel").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("eid_signage_good").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("eid_signage_avg").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("eid_signage_below_avg").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("eid_signage_poor").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("eid_signage_not_appl").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Cleanliness
document.getElementById("eid_cleanliness_excel").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("eid_cleanliness_good").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("eid_cleanliness_avg").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("eid_cleanliness_below_avg").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("eid_cleanliness_poor").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("eid_cleanliness_not_appl").addEventListener("click", function() {
  document.getElementById("eid_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});


// Ramadan Iftar Arrangements
document.getElementById("ramadan_iftar_arrangements_excel").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_iftar_arrangements_good").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_iftar_arrangements_avg").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_iftar_arrangements_below_avg").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_iftar_arrangements_poor").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_iftar_arrangements_not_appl").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Ramadan Cleanliness
document.getElementById("ramadan_cleanliness_excel").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_cleanliness_good").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_cleanliness_avg").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_cleanliness_below_avg").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_cleanliness_poor").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_cleanliness_not_appl").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Ramadan Taraweeh
document.getElementById("ramadan_taraweeh_excel").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_taraweeh_good").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_taraweeh_avg").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_taraweeh_below_avg").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_taraweeh_poor").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_taraweeh_not_appl").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Ramadan Taraweeh Reflections
document.getElementById("ramadan_taraweeh_reflection_excel").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_taraweeh_reflection_good").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_taraweeh_reflection_avg").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_taraweeh_reflection_below_avg").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_taraweeh_reflection_poor").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_taraweeh_reflection_not_appl").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Ramadan Quran Reflections
document.getElementById("ramadan_quran_reflections_excel").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_quran_reflections_good").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_quran_reflections_avg").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_quran_reflections_below_avg").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_quran_reflections_poor").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_quran_reflections_not_appl").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Ramadan Fajr Reflections
document.getElementById("ramadan_fajr_reflection_excel").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_fajr_reflection_good").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_fajr_reflection_avg").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_fajr_reflection_below_avg").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_fajr_reflection_poor").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_fajr_reflection_not_appl").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Ramadan Tahajjud
document.getElementById("ramadan_tahajjud_excel").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_tahajjud_good").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_tahajjud_avg").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_tahajjud_below_avg").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_tahajjud_poor").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_tahajjud_not_appl").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Ramadan Interfaith Iftar
document.getElementById("ramadan_interfaith_iftar_excel").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_interfaith_iftar_good").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_interfaith_iftar_avg").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_interfaith_iftar_below_avg").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_interfaith_iftar_poor").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_interfaith_iftar_not_appl").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Ramadan Khatmul Quran
document.getElementById("ramadan_khatmul_quran_excel").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_khatmul_quran_good").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_khatmul_quran_avg").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_khatmul_quran_below_avg").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_khatmul_quran_poor").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_khatmul_quran_not_appl").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Ramadan Prayer Hall Ambience
document.getElementById("ramadan_prayer_hall_excel").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_prayer_hall_good").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_prayer_hall_avg").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_prayer_hall_below_avg").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_prayer_hall_poor").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_prayer_hall_not_appl").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Ramadan Babysitting
document.getElementById("ramadan_babysitting_excel").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_babysitting_good").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_babysitting_avg").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_babysitting_below_avg").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_babysitting_poor").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_babysitting_not_appl").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Ramadan Announcements
document.getElementById("ramadan_announcements_excel").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_announcements_good").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_announcements_avg").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_announcements_below_avg").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_announcements_poor").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("ramadan_announcements_not_appl").addEventListener("click", function() {
  document.getElementById("ramadan_items_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});


// Future Ramadan Eid Comment
document.getElementById("comment_future_ramadan_eid").addEventListener("keypress", function() {
  document.getElementById('comment_future_ramadan_eid').classList.remove("border");
  document.getElementById('comment_future_ramadan_eid').classList.remove("border-danger");
  document.getElementById("comment_future_ramadan_eid_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});

// Member
document.getElementById("membership_yes").addEventListener("click", function() {
  document.getElementById("membership_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});
document.getElementById("membership_no").addEventListener("click", function() {
  document.getElementById("membership_alert").style.display = "none";
  document.getElementById('submit_alert').style.display = "none";
});



// ============================================================== //
