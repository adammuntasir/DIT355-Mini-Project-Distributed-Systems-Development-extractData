var logic = {
    extractData(message) {
        var chosenDate;
        console.log('We received from Visualizer client choice: ' + message);
        chosenDate = message

        var bytesString = String.fromCharCode(...chosenDate) // https://programmingwithswift.com/how-to-convert-byte-array-to-string-with-javascript/ EQUAL TO STRING
        var splitUpString = bytesString.split('/');
        var day = (splitUpString[3])
        var hour = (splitUpString[4])
        var minute = (splitUpString[5])
            //console.log(day)
        console.log(bytesString)


        return message

    }
}
module.exports = logic