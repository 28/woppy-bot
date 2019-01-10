const characterDisplayDelay = 750;
let running = false;
let intervalId = 0;

function activate() {
    if (!running) {
        clear();
        running = true;

        const zipCode = getZipCode();
        const dataProvider = getWeather(zipCode);
        $('#activated-label').show();
        displayZipCode(zipCode, function () {
            $.when(dataProvider).done(function () {
                let data = dataProvider.responseJSON;
                if (data.query.results === null) {
                    alert("Location not found: " + zipCode + "!");
                } else {
                    $('#weather-info-container').html('<h2>' + data.query.results.channel.item.title + '</h2>' + extractCData(data.query.results.channel.item.description));
                    running = false;
                }
            });
        });
    }
}

function extractCData(cdata) {
    return cdata.substr(0, (cdata.length - 3)).substr(9, cdata.length);
}

function displayZipCode(zipCode, onDone) {
    const chars = zipCode.split('');
    const zipCodeCharacterNumber = chars.length;
    let i = 0;
    intervalId = setInterval(function () {
        const $zip = $('#zip-code-container');
        const existingText = $zip.children('p').text();
        $zip.children('p').text(existingText + chars[i++]);
        if (i >= zipCodeCharacterNumber) {
            clearInterval(intervalId);
            onDone();
        }
    }, characterDisplayDelay);
}

function clear() {
    $('#zip-code-container').children('p').empty();
    $('#weather-info-container').empty();
    $('#activated-label').hide();
}
