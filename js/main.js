let codes;
let numberOfCodes;

function init() {
    $.get("data/zip.txt", function (data) {
        codes = data.split(',');
        numberOfCodes = codes.length;
    });
}

function getZipCode() {
    let randomIndex = Math.floor(Math.random() * ((numberOfCodes - 1) + 1));
    console.log(randomIndex);
    return codes[randomIndex];
}

function getWeather(zipCode) {
    return $.get(constructUrl(zipCode));
}

// function getWeather(zipCode) {
//     return {
//             'responseJSON': JSON.parse("{\"query\":{\"count\":1,\"created\":\"2018-12-21T23:11:32Z\",\"lang\":\"en-US\",\"results\":{\"channel\":{\"units\":{\"distance\":\"mi\",\"pressure\":\"in\",\"speed\":\"mph\",\"temperature\":\"F\"},\"title\":\"Yahoo! Weather - Decker, MI, US\",\"link\":\"http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/country/state/city-12778820/\",\"description\":\"Yahoo! Weather for Decker, MI, US\",\"language\":\"en-us\",\"lastBuildDate\":\"Fri, 21 Dec 2018 06:11 PM EST\",\"ttl\":\"60\",\"location\":{\"city\":\"Decker\",\"country\":\"United States\",\"region\":\" MI\"},\"wind\":{\"chill\":\"25\",\"direction\":\"325\",\"speed\":\"22\"},\"atmosphere\":{\"humidity\":\"92\",\"pressure\":\"971.0\",\"rising\":\"0\",\"visibility\":\"14.1\"},\"astronomy\":{\"sunrise\":\"7:59 am\",\"sunset\":\"4:58 pm\"},\"image\":{\"title\":\"Yahoo! Weather\",\"width\":\"142\",\"height\":\"18\",\"link\":\"http://weather.yahoo.com\",\"url\":\"http://l.yimg.com/a/i/brand/purplelogo//uh/us/news-wea.gif\"},\"item\":{\"title\":\"Conditions for Decker, MI, US at 05:00 PM EST\",\"lat\":\"43.508732\",\"long\":\"-83.059967\",\"link\":\"http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/country/state/city-12778820/\",\"pubDate\":\"Fri, 21 Dec 2018 05:00 PM EST\",\"condition\":{\"code\":\"26\",\"date\":\"Fri, 21 Dec 2018 05:00 PM EST\",\"temp\":\"35\",\"text\":\"Cloudy\"},\"forecast\":[{\"code\":\"5\",\"date\":\"21 Dec 2018\",\"day\":\"Fri\",\"high\":\"38\",\"low\":\"32\",\"text\":\"Rain And Snow\"},{\"code\":\"28\",\"date\":\"22 Dec 2018\",\"day\":\"Sat\",\"high\":\"31\",\"low\":\"24\",\"text\":\"Mostly Cloudy\"},{\"code\":\"26\",\"date\":\"23 Dec 2018\",\"day\":\"Sun\",\"high\":\"33\",\"low\":\"24\",\"text\":\"Cloudy\"},{\"code\":\"28\",\"date\":\"24 Dec 2018\",\"day\":\"Mon\",\"high\":\"30\",\"low\":\"24\",\"text\":\"Mostly Cloudy\"},{\"code\":\"30\",\"date\":\"25 Dec 2018\",\"day\":\"Tue\",\"high\":\"31\",\"low\":\"22\",\"text\":\"Partly Cloudy\"},{\"code\":\"30\",\"date\":\"26 Dec 2018\",\"day\":\"Wed\",\"high\":\"32\",\"low\":\"26\",\"text\":\"Partly Cloudy\"},{\"code\":\"16\",\"date\":\"27 Dec 2018\",\"day\":\"Thu\",\"high\":\"35\",\"low\":\"28\",\"text\":\"Snow\"},{\"code\":\"5\",\"date\":\"28 Dec 2018\",\"day\":\"Fri\",\"high\":\"36\",\"low\":\"31\",\"text\":\"Rain And Snow\"},{\"code\":\"28\",\"date\":\"29 Dec 2018\",\"day\":\"Sat\",\"high\":\"33\",\"low\":\"25\",\"text\":\"Mostly Cloudy\"},{\"code\":\"28\",\"date\":\"30 Dec 2018\",\"day\":\"Sun\",\"high\":\"27\",\"low\":\"21\",\"text\":\"Mostly Cloudy\"}],\"description\":\"<![CDATA[<img src=\\\"http://l.yimg.com/a/i/us/we/52/26.gif\\\"/>\\n<BR />\\n<b>Current Conditions:</b>\\n<BR />Cloudy\\n<BR />\\n<BR />\\n<b>Forecast:</b>\\n<BR /> Fri - Rain And Snow. High: 38Low: 32\\n<BR /> Sat - Mostly Cloudy. High: 31Low: 24\\n<BR /> Sun - Cloudy. High: 33Low: 24\\n<BR /> Mon - Mostly Cloudy. High: 30Low: 24\\n<BR /> Tue - Partly Cloudy. High: 31Low: 22\\n<BR />\\n<BR />\\n<a href=\\\"http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/country/state/city-12778820/\\\">Full Forecast at Yahoo! Weather</a>\\n<BR />\\n<BR />\\n<BR />\\n]]>\",\"guid\":{\"isPermaLink\":\"false\"}}}}}}")
//     }
// }

function constructUrl(zipCode) {
    return 'https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + zipCode + '")&format=json';
}
