// http://links.mead.io/api-fix

const yargs = require('yargs');
const axios = require('axios');


const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key={REDACTED}=${encodedAddress}`;


axios.get(geocodeUrl).then((response) =>{
  if (response.data.status = 'ZERO_RESULTS'){
    throw new Error('Unable to find that address');
  }

  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weathUrl = `https://api.darksky.net/forecast/{REDACTED}/${lat},${lng}`
  console.log(response.data.results[0].formatted_address);
  return axios.get(weathUrl)
}).then((responce) =>{
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
}).catch((e) =>{
  if (e.code === 'ENOTFOUND'){
    console.log('Unable to connect to servers.');
  } else{
    console.log(e.message);
  }
});
