var subscriber = require('./src/subscriber.js');
var publisher = require('./src/publisher.js');
var logic = require('./src/logic.js');

subscriber.start(); //starts the subscriber.js module
publisher.start; //starts the publisher.js module


subscriber.eventListener.on("mqttRecieved", function(topic, payload) {

    console.log("the payload is " + (payload))
    var messageExtracted = logic.extractData(payload)
    if (messageExtracted == undefined) {
        var readyToBePublished = JSON.stringify(payload)

    } else {
        console.log("the message is " + messageExtracted)
            // var readyToBePublished = JSON.stringify(messageExtracted)
    }
    publisher.publish("ramzimkoqaz1984qwe4", messageExtracted)

})