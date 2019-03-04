const weatherUrl = "https://woppy-bot-server.herokuapp.com/weather";
const characterDisplayDelay = 750;

let running = false;
let intervalId = 0;

function getWeather() {
    return $.get(weatherUrl);
}

function activate() {
    if (!running) {
        clear();
        running = true;

        const dataProvider = getWeather();
        displayActivating();

        $.when(dataProvider).then(function () {
            let data = dataProvider.responseJSON;
            if (data === {}) {
                displayError();
                running = false;
            } else {
                let zipCode = data.zip;
                displayZipCode(zipCode, function () {
                    displayWeather(data);
                    running = false;
                })
            }
        }, function () {
            displayError();
            running = false;
        });
    }
}

function displayZipCode(zipCode, onDone) {
    displayActivated();
    const chars = zipCode.split('');
    const zipCodeCharacterNumber = chars.length;
    let i = 0;
    intervalId = setInterval(function () {
        const $zip = $('#zip-code-container');
        const existingText = $zip.children('h2').text();
        $zip.children('h2').text(existingText + chars[i++]);
        if (i >= zipCodeCharacterNumber) {
            clearInterval(intervalId);
            onDone();
        }
    }, characterDisplayDelay);
}

function displayError() {
    let l = $('#activated-label');
    l.text("Error happened, please try again later...")
}

function displayActivated() {
    let l = $('#activated-label');
    l.text("Woppy activated!");
}

function displayActivating() {
    let l = $('#activated-label');
    l.text("Woppy activating...");
    l.show();
}

function clear() {
    $('#zip-code-container').children('h2').empty();
    $('#weather-info-container').hide();
    $('#activated-label').hide();
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function displayWeather(data) {
    $('#city-info').text(data.name + ", " + data.stateCode);
    $('#time-info').text(new Date(data.dt).toDateString());
    $('#icon').attr("src", data.weather[0].icon);
    $('#desc-info').text(capitalize(data.weather[0].description));
    $('#temp-info').text(data.main.temp + " °F");
    $('#press-info').text(data.main.pressure + " hPa");
    $('#hum-info').text(data.main.humidity + " %");
    $('#weather-info-container').show();
}
