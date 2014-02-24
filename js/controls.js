if (document.getElementById('pia_container').getAttribute('data-session-id') != '0') {
	console.log("Pia was called in a previous session. Will not execute controls.js again.");
}
else {
	console.log("Pia is being initialized for the first time. Executing controls.js.");
	var mic = new Wit.Microphone(document.getElementById("pia_microphone"));
	var started = false;
	$(document).on('keydown', function(e) {
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
	});

	var info = function (msg) {
		document.getElementById("pia_info").innerHTML = msg;
	};
	mic.onready = function () {
		info("How can I help you today?");
	};
	mic.onaudiostart = function () {
		started = true;
		// playSound(chrome.extension.getURL('../assets/sounds/start_recording.mp3'));
		info("Recording started");
	};

	mic.onaudioend = function () {
		started = false;
		// playSound(chrome.extension.getURL('../assets/sounds/stop_recording.mp3'));
		info("Recording stopped, processing started");
	};
	mic.onerror = function (err) {
		info("Error: " + err);
	};
	mic.onresult = function (msg_body, intent, entities) {
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
				if (entities.search_provider == undefined) {
					var search_provider = "";
				}
				else {
					var search_provider = entities.search_provider.value;
				}
				switch(search_provider) {
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
						break;
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

	function playSound(soundfile) {
		document.getElementById('sound_container').innerHTML = "<embed src='" + soundfile + "' hidden='true' autostart='true' loop='false'/>";
	}
}
