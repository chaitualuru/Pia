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

      for (var k in entities) {
        var e = entities[k];
        if (!(e instanceof Array)) {
          r += kv(k, e.value);
        } else {
          for (var i = 0; i < e.length; i++) {
            r += kv(k, e[i].value);
          }
        }
      }

      r += kv("message", msg);

      document.getElementById("result").innerHTML = r;
      console.log(r);
      console.log(confidence);
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