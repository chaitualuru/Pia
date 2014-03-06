if (document.getElementById('pia_container').getAttribute('data-session-id') != '0') {
	console.log("Pia was called in a previous session. Will not execute controls.js again.");
}
else {
	console.log("Pia is being initialized for the first time. Executing controls.js.");
	var mic = new Wit.Microphone(document.getElementById("pia_microphone"));

	var start_player = document.createElement('audio');
	start_player.id = "short_audio1";
	start_player.src = chrome.extension.getURL("../assets/sounds/start_recording.mp3");
	start_player.type = "audio/mpeg";
	document.body.appendChild(start_player);

	var stop_player = document.createElement('audio');
	stop_player.id = "short_audio2";
	stop_player.src = chrome.extension.getURL("../assets/sounds/stop_recording.mp3");
	stop_player.type = "audio/mpeg";
	document.body.appendChild(stop_player);


	var started = false;
	$(document).on('keydown', function(e) {
		var shortcutChecker = Number(document.getElementById('pia_container').getAttribute('data-session-id'))%1;
		if (shortcutChecker%1 == 0){
			if (e.which == 32) {
				e.preventDefault();
				if (started) {
					mic.stop();
					started = false;
				}
				else {
					mic.start();
					started = true;
				}
			}
		}
		else {
			;
		}
	});

	var info = function (msg) {
		document.getElementById("pia_info").innerHTML = msg;
	};
	mic.onready = function () {
		info("How can I help you today?");
		// mic.start();
	};

	mic.onaudiostart = function () {
		start_player.play();
		started = true;
		info("Recording started");
	};

	mic.onaudioend = function () {
		stop_player.play();
		started = false;
		// mic.stop();
		info("Recording stopped, processing started");
	};
	mic.onerror = function (err) {
		info("Error: " + err);
	};
	mic.onresult = function (msg_body, intent, entities) {
		started=false;
		var intent_string = intent;
		
		var ents = "";
		for (var k in entities) {
			var e = entities[k];

			if (!(e instanceof Array)) {
				ents += kv(k, e.value);
			} else {
				for (var i = 0; i < e.length; i++) {
					ents += kv(k, e[i].value);
				}
			}
		}

		var msg = kv("msg_body", msg_body);

		document.getElementById("pia_result").innerHTML = JSON.stringify(msg_body) + "\n";

		switch(intent_string) {
			case "search":
				var search_provider = entities.search_provider;
				var search_site;
				if (search_provider == null) {
					search_site = "";
				}
				else {
					search_site = search_provider.value;
				}
				if(entities.object_to_search == null) {
					document.getElementById("pia_result").innerHTML += "\nSorry, I didn't get that.";
				}
				else {
					switch(search_site) {
						case "wikipedia":
							var action_url = "http://en.wikipedia.org/w/index.php?search=" + entities.object_to_search.value;
							chrome.extension.sendRequest(action_url);
							break;
						case "imdb":
							var action_url = "http://www.imdb.com/find?q=" + entities.object_to_search.value;
							chrome.extension.sendRequest(action_url);
							break;
						case "wolfram":
							var action_url = "http://www.wolframalpha.com/input/?i=" + entities.object_to_search.value;
							chrome.extension.sendRequest(action_url);
							break;
						default:
							var action_url = "https://www.google.com/search?q=" + entities.object_to_search.value;
							chrome.extension.sendRequest(action_url);
					}
				}
			break;
			case "open":
				if((entities.website_to_open.value).indexOf(".") < 0) {
					var action_url = "http://" + entities.website_to_open.value + ".com";
					chrome.extension.sendRequest(action_url);
				}
				else {
					var action_url = "http://" + entities.website_to_open.value;
					chrome.extension.sendRequest(action_url);
				}
			break;
			case "play":
				var action_url = "http://www.youtube.com/results?search_query=" + entities.object_to_play.value;
				chrome.extension.sendRequest(action_url);
			break;
			case "direction":
				if (entities.origin == undefined) {
					var action_url = "http://maps.google.com/maps/?q=directions to" + " " + entities.destination.value;
					chrome.extension.sendRequest(action_url);
				}
				else {
					var action_url = "http://maps.google.com/maps/?q=directions from" + " " + entities.origin.value + " to " + entities.destination.value;
					chrome.extension.sendRequest(action_url);
				}
			break;
			case "weather":
				if(entities.loc_for_weather == undefined) {
					var action_url = "https://www.google.com/search?q=weather here";
					chrome.extension.sendRequest(action_url);
				}
				else{
					var action_url = "https://www.google.com/search?q=weather in" + " " +entities.loc_for_weather.value; 
					chrome.extension.sendRequest(action_url);
				}
				break;
			case "compose":
				if((entities.receiver_person == undefined) || (entities.receiver_website == undefined)) {
						document.getElementById("pia_result").innerHTML += "Sorry, I didn't get that.";  
				}
				else{
						var action_url = "mailto:" + entities.receiver_person.value + "@" + entities.receiver_website.value;
						chrome.extension.sendRequest(action_url);
				}
			break;
			case "hello":
					document.getElementById("pia_result").innerHTML += "";
			break;
			case "bye":
					document.getElementById("pia_result").innerHTML += "";
			break;
			case "compare_reviews":
					var movie = entities.movie_to_review.value;
					var action_url_youtube = "http://www.youtube.com/results?search_query=" + movie + " trailer";
					chrome.extension.sendRequest(action_url_youtube);
					var action_url_imdb = "http://www.imdb.com/find?q=" + movie;
					chrome.extension.sendRequest(action_url_imdb);
					var action_url_rt = "http://www.rottentomatoes.com/search/?search=" + movie;
					chrome.extension.sendRequest(action_url_rt);
			break;
			case "logout":
				var page = new String(document.URL);
				if (page.indexOf('mail.google.com') != -1) {
					document.getElementById('gb_71').click();
				}
				else if(page.indexOf('facebook.com') != -1) {
					document.getElementById('logout_form').submit();
				}
				else if(page.indexOf('bankofamerica.com') != -1) { 
					document.getElementsByName('onh_sign_off')[0].click();
				}
				else if(page.indexOf('github.com') != -1) {
					document.getElementById('logout').click();
				}
				else { 
					document.getElementById("pia_result").innerHTML += "\nCannot logout of this website.";
				}
			break;
			case "messages":
				var page = new String(document.URL);
				if(page.indexOf('facebook.com') != -1) {
					var url = String(window.location);
					window.location = url.replace(document.URL, 'https://www.facebook.com/messages');
				}
				else {
					document.getElementById("pia_result").innerHTML += "\nCannot get messages on this website.";
				}
			break;
			case "notifications":
				var page = new String(document.URL);
				if(page.indexOf('facebook.com') != -1) {
					var url = new String(window.location);
					window.location = url.replace(document.URL, 'https://www.facebook.com/notifications');
				}
				else {
					document.getElementById("pia_result").innerHTML += "\nCannot get notifications on this website.";
				}
			break;
			case "friends":
				var page = new String(document.URL);
				if(page.indexOf('facebook.com') != -1) {
					var url = new String(window.location);
					window.location = url.replace(document.URL, 'https://www.facebook.com/friends');
				}
				else {
					document.getElementById("pia_result").innerHTML += "\nCannot get friends on this website.";
				}
			break;
			case "events":
				var page = new String(document.URL);
				if(page.indexOf('facebook.com') != -1) {
					var url = new String(window.location);
					window.location = url.replace(document.URL, 'https://www.facebook.com/events');
				}
				else {
					document.getElementById("pia_result").innerHTML += "\nCannot get events on this website.";
				}
			break;
			case "settings":
				var page = new String(document.URL);
				if(page.indexOf('facebook.com') != -1) {
					var url = new String(window.location);
					window.location = url.replace(document.URL, 'https://www.facebook.com/settings');
				}
				else {
					document.getElementById("pia_result").innerHTML += "\nCannot get settings on this website.";
				}
			break;
			case "photos":
				var page = new String(document.URL);
				if(page.indexOf('facebook.com') != -1) {
					var url = new String(window.location);
					window.location = url.replace(document.URL, 'https://www.facebook.com/photos');
				}
				else {
					document.getElementById("pia_result").innerHTML += "\nCannot get photos on this website.";
				}
			break;
			case "home":
				var page = new String(document.URL);
				if(page.indexOf('facebook.com') != -1) {
					var url = new String(window.location);
					window.location = url.replace(document.URL, 'https://www.facebook.com/');
				}
				else {
					document.getElementById("pia_result").innerHTML += "\nCannot get to home on this website.";
				}
			break;
			case "new_tab":
				chrome.extension.sendRequest('https://www.google.com');
			break;
			case "news":
				var google_news = entities.news_to_get.value;
				var action_url = 'https://www.google.com/search?q=news&gs_l=nws#q=' + google_news + '&tbm=nws';
				chrome.extension.sendRequest(action_url);
			break;
			case "images":
				var google_images = entities.images_to_get.value;
				var action_url = 'https://www.google.com/search?q=' + google_images + '&tbm=isch';
				chrome.extension.sendRequest(action_url);
			break;
			default:
				document.getElementById("pia_result").innerHTML += "\nSorry, I didn't get that.";
		}

	};

	mic.connect("UBYUD4AJGNWOWURYNFECWVA3DOQJXDHT");
	// mic.start();
	// mic.stop();

	function kv (k, v) {
		if (toString.call(v) !== "[object String]") {
			v = JSON.stringify(v);
		}
		return k + "=" + v + "\n";
	}
}
