const request = require("request");

const url =
  // "https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/37.8267,-122.4233";
  "http://api.weatherstack.com/current?access_key=17522fcc4e88343d792ab6a5a3ad7e01&query=Sukabumi&units=m";

request({ url: url, json: true }, (error, response) => {
  console.log(
    response.body.current.weather_descriptions[0] +
      ". It is currently " +
      response.body.current.temperature +
      " degress out. There is a " +
      response.body.current.precip +
      "% chance of rain."
  );
});
