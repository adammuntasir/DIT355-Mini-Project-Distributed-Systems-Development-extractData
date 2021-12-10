//Reference: https://www.npmjs.com/package/mqtt

//Setup of subscriber
var mqtt = require('mqtt');
var options = { qos: 1, keepalive: 0, reconnectPeriod: 50000 };
var access = require('../../global_values')
ip = access.ip_address;
port = access.port;
options = access.options;
var client = mqtt.connect('tcp://' + ip + ':' + port, options);
const EventEmitter = require('events'); //This is a build in class in Node.js required to listen to events such as an incoming MQTT message
const emitter = new EventEmitter(); //Creating an new emitter that forwards incoming MQTT messages as events

var subscriber = {

    eventListener: emitter, //This will export our emitter and include it in the module that index.js requires

    start: function() {

        //Called when client is connected
        client.on('connect', function() {
            console.log('Status: Subscriber is connected to broker')
            startSubscription();
        });

        //Called when client is disconnected
        client.on('disconnect', function() {
            console.log('Status: Subscriber has been disconnected')
            client.reconnect();
        })

        //Called when client is reconnecting
        client.on('reconnect', function() {
            console.log('Status: Subscriber is reconnecting')
        })

        //Called when client is offline
        client.on('offline', function() {
            console.log('Status: Subscriber is offline')
            client.reconnect();
        })

        //Called when client receives a message
        client.on('message', function(topic, message) {
            emitter.emit('mqttRecieved', topic, message);
        })

    }
}

function startSubscription() {
    client.subscribe(access.sendToExtractData);
}

module.exports = subscriber