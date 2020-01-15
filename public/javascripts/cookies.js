(function () {
	var button = document.querySelector("#cookieConsent button[data-cookie-string]");
	button.addEventListener("click", function (event) {
		  var d = new Date();
		  var cname = "cookieConsent";
		  var cvalue = true;
		  
		  //The number of days until the cookie should expire
		  var exdays = 90;
		  d.setTime(d.getTime() + (exdays*24*60*60*1000));
		  var expires = "expires="+ d.toUTCString();
		  document.cookie = cname + "=" + cvalue + ";" + expires + "";
		  var cookie_consent = document.querySelector("#cookie_consent_container");
		  cookie_consent.style.display = "none";
	}, false);
	
	function getCookie(cname) {
	  var name = cname + "=";
	  var decodedCookie = decodeURIComponent(document.cookie);
	  var ca = decodedCookie.split(';');
	  for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
		  c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
		  return c.substring(name.length, c.length);
		}
	  }
	  return "";
	}
	
	var cookie_consent = document.querySelector("#cookie_consent_container");
	var getCookieConsent = getCookie("cookieConsent");
	
	if (getCookieConsent == "") {
		cookie_consent.style.display = "block";
	}
})();