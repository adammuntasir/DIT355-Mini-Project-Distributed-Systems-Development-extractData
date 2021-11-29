var registry = require('../../registry')

var logic = {

    sendWholeJson() {
        return registry.jsonObject;
    },
    extractRetreiveTopic(message) {
        var chosenDate;
        //console.log('We received from Visualizer client choice: ' + message);
        chosenDate = message

        var bytesString = String.fromCharCode(...chosenDate) // https://programmingwithswift.com/how-to-convert-byte-array-to-string-with-javascript/ EQUAL TO STRING

        var splitUpString = bytesString.split('/');
        var year = (splitUpString[0])
        var month = (splitUpString[1])
        var day = (splitUpString[2])
        var hour = (splitUpString[4])
        var minute = (splitUpString[5])
        return year + "-" + month + "-" + day + " " + hour + ":" + minute
    },
    extractDateForBooking(message) {
        var chosenDate;
        //console.log('We received from Visualizer client choice: ' + message);
        chosenDate = message

        var bytesString = String.fromCharCode(...chosenDate)
        var splitUpString = bytesString.split('/');
        var year = (splitUpString[0])
        var month = (splitUpString[1])
        var day = (splitUpString[2])
        var dayName = (splitUpString[3])
        var hour = (splitUpString[4])
        var minute = (splitUpString[5])
        return year + month + day + dayName + hour + minute
    },
    extractUserId(message) {
        var parsed = JSON.parse(message)
        var userId = parsed.userId

        return userId
    },
    extractRequestId(message) {
        var parsed = JSON.parse(message)
        var requestId = parsed.requestId

        return requestId
    },
    hourMinute(message) {
        var chosenDate;
        console.log('We received from Visualizer client choice: ' + message);
        chosenDate = message

        var bytesString = String.fromCharCode(...chosenDate)
        var splitUpString = bytesString.split('/');
        var hour = (splitUpString[4])
        var minute = (splitUpString[5])
        console.log(hour + ":" + minute)
        return hour + ":" + minute
    },
    extractDentistData(message, dateFilledOut) {
        var parsed = JSON.parse(message) // when client clicks book in the marker
            //console.log(parsed)
        var id = parsed.dentistID
        var date = dateFilledOut
            //console.log(dateFilledOut)
            //var dateWithoutQuotes = date.replace(/"/g, ''); // remove the quotes 

        // the booking button will result in a payload that includes the dentist ID 

        return id + date
    },
    extractClientTime(message) {
        var parsed = JSON.parse(message) // when client clicks book in the marker

        var date = parsed.date
        return date;
    },
    extractDentistCoordinates(message) {
        var parsed = JSON.parse(message) // when client clicks book in the marker
        console.log(parsed)
        var coordinates = parsed.clientCoordinates
        return coordinates;
    },
    storeChosenOnes(data) {
        return data;
    }
}


module.exports = logic;