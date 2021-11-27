var subscriber = require('./src/subscriber.js');
var publisher = require('./src/publisher.js');
var logic = require('./src/logic.js');

subscriber.start(); //starts the subscriber.js module
publisher.start; //starts the publisher.js module


subscriber.eventListener.on("mqttRecieved", function(topic, payload) {


    publisher.publish("ramzimkoqaz1984qwe4", payload)

})