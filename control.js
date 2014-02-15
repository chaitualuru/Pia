var mic = new Wit.Microphone(document.getElementById("microphone"));
    // var err = "I did not understand!"
    var info = function (msg) {
      document.getElementById("info").innerHTML = msg;
    };
    info("Adding random text!");
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
    mic.onresult = function (intent, entities, msg) {

      var r = kv("intent", intent);
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

      var m = kv("message", msg);

      document.getElementById("result").innerHTML = r;
      document.getElementById('result').innerHTML += ents;
      document.getElementById("result").innerHTML += m;
      if (r === "intent=search\n"){
        window.open("https://www.google.com/search?q=" + JSON.stringify(entities.object_to_search.value));
      }
      else{
        ;
      }
      console.log(r);
      console.log(ents);
      console.log(m);
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



//     if (window.jQuery) {  
//     console.log('loaded');
// } else {
//     // jQuery is not loaded
// }