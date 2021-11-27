var subscriber = require('./src/subscriber.js');
var publisher = require('./src/publisher.js');
var logic = require('./src/logic.js');
var indexChecker = new Array();
var takenCoordinatesRed = new Array();
var bookedCoordinates = new Array();
var stringTaken = "0";
var allJSON = logic.sendWholeJson();
var time
var readyForBookingDate
var arrayOfMaps = new Array()
var instantRed

subscriber.start(); //starts the subscriber.js module
publisher.start(); //starts the publisher.js module


subscriber.eventListener.on("mqttRecieved", function(topic, payload) {
    try {
        if (payload.length < 50) {

            extractRetreiveTopic = logic.extractRetreiveTopic(payload)
            readyForBookingDate = logic.extractDateForBooking(payload)
            time = logic.hourMinute(payload)
            console.log(time)

            takenCoordinatesRed = [
                [22.942625, 33.685255]
            ]

            for (var i = 0; i < arrayOfMaps.length; i++) {
                arrayOfMaps[i].forEach(function(value, key) { // get all values in the array 

                    if (key == extractRetreiveTopic) { // each time we check for the topic from visualizer 
                        takenCoordinatesRed.push(value) // we will send the pure coordinate values to Visualizers each time 
                    }
                })
            }

            var newObject = { takenData: takenCoordinatesRed }
            var sendThis = JSON.stringify(newObject)
            var wholeJson = JSON.stringify(allJSON)

            var newJSON = ("[" + wholeJson + "," +
                sendThis + "]")

            publisher.publish(newJSON)
        } else {
            var dentistData = logic.extractDentistData(payload, readyForBookingDate) // booking payload load length is about 70

            var takenDate = logic.storeChosenOnes(dentistData)

            if (indexChecker.includes(takenDate)) { // MUST INCLUDE THE USERID
                console.log("the date is taken")

                var userId = logic.extractUserId(payload)
                var requestId = logic.extractRequestId(payload)

                // publisher.publish(stringTaken) DONT UNCOMMENT
                publisher.publish(JSON.stringify({
                    userId,
                    requestId,
                    time: "none"
                }))
            } else if (!indexChecker.includes(takenDate)) {
                console.log("the date is NOT taken")

                indexChecker.push(takenDate)

                var userId = logic.extractUserId(payload)
                var requestId = logic.extractRequestId(payload)
                var coordinates = logic.extractDentistCoordinates(payload)

                publisher.publish(JSON.stringify({
                    userId,
                    requestId,
                    time
                }))

                bookedCoordinates.push(JSON.stringify(coordinates))
                var fullTime = logic.extractClientTime(payload)
                allTimesAndCoordinates = new Map([
                    [fullTime, coordinates]
                ]);

                arrayOfMaps.push(allTimesAndCoordinates)
                for (var i = 0; i < arrayOfMaps.length; i++) {
                    console.log(arrayOfMaps[i])
                }

                if (allTimesAndCoordinates.get(fullTime)) {
                    console.log(allTimesAndCoordinates.get(fullTime))
                    instantRed = (allTimesAndCoordinates.get(fullTime))
                    takenCoordinatesRed.push(instantRed)
                } else {
                    console.log("its not in the map")
                }

            }

        }
    } catch (error) {
        console.log(error.message)
    }
})