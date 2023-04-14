      var etatLed1 = false;
      var etatLed2 = false;
      var etatLed3 = false;

      
      // Create a client instance
      var client = new Paho.MQTT.Client('broker.mqttdashboard.com', 8000, 'clientId-fP2HyPL6Lr');

      // set callback handlers
      client.onConnectionLost = onConnectionLost;
      client.onMessageArrived = onMessageArrived;

      // connect the client
      client.connect({ onSuccess: onConnect });

      // called when the client connects
      function onConnect() {
        console.log('Connected to MQTT broker');
        // subscribe to the topic
        client.subscribe('isen16/button');
        client.subscribe('isen16/temp');

      }

      // called when the client loses its connection
      function onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
          console.log('Connection lost:', responseObject.errorMessage);
        }
      }

      // called when a message arrives
      function onMessageArrived(message) {
            console.log("Received message: " + message.payloadString);
            var jsonData = JSON.parse(message.payloadString);
            console.log(jsonData);
            const now = new Date();
            try {
                if(jsonData.hasOwnProperty("id")){
                    //reception message button
                    var buttonId = jsonData["id"];
                    console.log("Button " + buttonId + " pressed");
                    // update la valeur du bouton + date
                    document.getElementById("buttonPressed").innerHTML = buttonId;
                    document.getElementById("dateButtonPressed").innerHTML = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'});

                }
                if(jsonData.hasOwnProperty("value")){
                    //reception message temp
                    var valueTemp = jsonData["value"];
                    console.log("value temp " + valueTemp);
                    // update la valeur de la temperature + date
                    document.getElementById("valueTemp").innerHTML = valueTemp;
                    document.getElementById("dateTemp").innerHTML = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'});

                }

            } catch (error) {
                console.log("Failed to parse JSON data: " + error);
            }
        }

        // function to toggle LED 1
function toggleLed1() {
  if(etatLed1==false){
    var message = {
    id: 1,
    state: 1
  };
  //la LED etait OFF et on vient de l'allumer
  document.getElementById("etatLed1").innerHTML = "🟦 LED 1 est <strong>ON</strong>";
  }else{
    var message = {
    id: 1,
    state: 0
  };
      //la LED etait ON et on vient de eteindre
      document.getElementById("etatLed1").innerHTML = "🟦 LED 1 est <strong>OFF</strong>";
  }

  message = new Paho.MQTT.Message(JSON.stringify(message));
  message.destinationName = "isen16/led";
  client.send(message);
  etatLed1 = !etatLed1;

}

function toggleLed2() {
  if(etatLed2==false){
    var message = {
    id: 2,
    state: 1
  };
  //la LED etait OFF et on vient de l'allumer
  document.getElementById("etatLed2").innerHTML = "🟩 LED 2 est <strong>ON</strong>";
  }else{
    var message = {
    id: 2,
    state: 0
  };
      //la LED etait ON et on vient de eteindre
      document.getElementById("etatLed2").innerHTML = "🟩 LED 2 est <strong>OFF</strong>";
  }

  message = new Paho.MQTT.Message(JSON.stringify(message));
  message.destinationName = "isen16/led";
  client.send(message);

  etatLed2 = !etatLed2;

}

function toggleLed3() {
  if(etatLed3==false){
    var message = {
    id: 3,
    state: 1
  };
  //la LED etait OFF et on vient de l'allumer
  document.getElementById("etatLed3").innerHTML = "🟥 LED 3 est <strong>ON</strong>";
  }else{
    var message = {
    id: 3,
    state: 0
  };
      //la LED etait ON et on vient de eteindre
      document.getElementById("etatLed3").innerHTML = "🟥 LED 3 est <strong>OFF</strong>";
  }

  message = new Paho.MQTT.Message(JSON.stringify(message));
  message.destinationName = "isen16/led";
  client.send(message);

  etatLed3 = !etatLed3;

  
}

function getTemp() {
  //1ere etape demande temp
  alert("Demande temperature envoyée, veuillez patienter...");
  var message = {
    request: 1
    };
  message = new Paho.MQTT.Message(JSON.stringify(message));
  message.destinationName = "isen16/getTemp";
  client.send(message);
  console.log("Demande temperature envoy�e");

}