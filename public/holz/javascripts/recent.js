let map = null;

function sendReqForAccountInfo() {
   // TODO
}

function accountInfoSuccess(data, textSatus, jqXHR) {
   // TODO
}

function accountInfoError(jqXHR, textStatus, errorThrown) {
   // TODO
}


function getRecentPotholes() {
   // TODO
}

function displayMostRecentPothole(data, textSatus, jqXHR) {
   // TODO
}

// Executes once the google map api is loaded, and then sets up the handler's and calls
// getRecentPotholes() to display the recent potholes
function initRecent() {
    // Allow the user to refresh by clicking a button.
    $("#refreshRecent").click(getRecentPotholes);
    getRecentPotholes();
}

// Handle authentication on page load
$(function() {
   // If there's no authToken stored, redirect user to the signin page (i.e., index.html)
   if (!window.localStorage.getItem("authToken")) {
      window.location.replace("index.html");
   }
});
