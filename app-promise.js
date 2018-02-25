const yargs = require('yargs');
const axios = require('axios');
const fileAccess = require('./file_access/file-access.js');

const argv = yargs
    .options({
        a: {
            demand: false,
            alias: 'address',
            describe: 'Address to get weather for',
            string: true
        },
        d: {
            demand: false,
            alias: 'default',
            describe: 'Set default address',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var getAddress = (argv) => {
    return new Promise((resolve, reject) => {
        if (argv.address) {
            resolve({
                location: argv.address
            });
        } else if (argv.default) {
            fileAccess.saveDefault(argv.default).then((response) => {
                resolve({
                    location: argv.address
                });
            });
        } else {
            fileAccess.getDefault().then((response) => {
                resolve(response);
            });
        }
    });
};

getAddress(argv).then((response) => {
    var address = response.location;
    var encodedAddress = encodeURIComponent(address);
    var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyADA_yTBbzkAwB8k7UxHqVHoMf3EYAhf3A`;
    return axios.get(geocodeUrl);
}).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address');
    }
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/2cd0e209e9b747ab231e30cc9a11f73f/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}, it feels like ${apparentTemperature}`);
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API server');
    } else {
        console.log(e.message);
    }
});
