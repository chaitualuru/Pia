  var mic = new Wit.Microphone(document.getElementById("microphone"));
  var info = function (msg) {
    document.getElementById("info").innerHTML = msg;
  };
  mic.onready = function () {
    info("Microphone is ready to record");
  };
  mic.onaudiostart = function () {
    info("Recording started");
  };
  mic.onaudioend = function () {
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

    document.getElementById("result").innerHTML = intent_string;
    document.getElementById("result").innerHTML += ents;
    document.getElementById("result").innerHTML += msg;

    // if (intent_string === "intent=search\n") {
    //   var action_url = "https://www.google.com/search?q=" + JSON.stringify(entities.object_to_search.value);
    //   chrome.extension.sendRequest(action_url);
    // }

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
        var action_url = "http://" + entities.website_to_open.value;
        chrome.extension.sendRequest(action_url);
        break;
      case "direction":
        if (entities.origin == undefined) {
          var action_url = "http://maps.google.com/maps/?q=directions to" + " " + entities.destination.value;
          chrome.extension.sendRequest(action_url);
        }
        else {
          var action_url = "http://maps.google.com/maps/?q=directions from" + " " + entities.origin.value + "to" + " " + entities.destination.value;
          chrome.extension.sendRequest(action_url);
        }
        break;
      default:
        document.getElementById("result").innerHTML += "Sorry, I didn't get that.";
    }

  };

  mic.connect("ANE6UVZT4KEVXY457UBHJ7XTDAEYAS3J");
  // mic.start();
  // mic.stop();

  function kv (k, v) {
    if (toString.call(v) !== "[object String]") {
      v = JSON.stringify(v);
    }
    return k + "=" + v + "\n";
  }