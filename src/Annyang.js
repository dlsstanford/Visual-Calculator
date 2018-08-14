import annyang from "annyang";

class Annyang {
  // 1
  isSupported() {
    return annyang !== null;
  }

  // 2
  start() {
    if (annyang) {
      annyang.start();
    }
  }

  // 3
  abort() {
    if (annyang) {
      annyang.abort();
    }
  }

  // 4
  resume() {
    if (annyang) {
      annyang.resume();
    }
  }

  // 5
  addCommands(voiceAdd, voiceSubtract, voiceFoo, randomBox) {
    if (annyang) {
      annyang.addCommands({
        'add *number1 + *number2' : (number1, number2) => voiceAdd(number1, number2),
        'subtract *number1 - *number2' : (number1, number2) => voiceSubtract(number1, number2),
        'multiply *number1 and *number2 by *number3' : (number1, number2, number3) => voiceFoo(number1, number2, number3),
        randomize: function() {
          randomBox();
        }
      });
    }
  }

  // 6
  addCallback(engineCallback, resultCallback) {
    if (annyang) {
      annyang.addCallback("start", event => engineCallback("on"));
      annyang.addCallback("soundstart", event => engineCallback("listening"));
      annyang.addCallback("end", event => engineCallback("off"));
      annyang.addCallback("error", event => engineCallback(event.error));
      annyang.addCallback("errorNetwork", event =>
        engineCallback("network error")
      );
      annyang.addCallback("errorPermissionBlocked", event =>
        engineCallback("permission blocked")
      );
      annyang.addCallback("errorPermissionDenied", event =>
        engineCallback("permission denied")
      );
      annyang.addCallback("result", event => resultCallback(event));
    }
  }
}

// 7
export default new Annyang();
