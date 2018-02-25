const fs = require('fs');

var getDefault = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('default-data.json', (error, data) => {
            var defaultJson = JSON.parse(data);
            resolve(defaultJson);
        });
    })
    // var defaultString = fs.readFile('default-data.json');
    // return JSON.parse(defaultString);
};

var saveDefault = (location) => {
    fs.writeFileSync('default-data.json', JSON.stringify(location));
};

module.exports = {
    getDefault,
    saveDefault
}