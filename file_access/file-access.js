const fs = require('fs');

var getDefault = () => {
    var defaultString = fs.readFileSync('default-data.json');
    return JSON.parse(defaultString);
};

var saveDefault = (location) => {
    fs.writeFileSync('default-data.json', JSON.stringify(location));
};

module.exports = {
    getDefault,
    saveDefault
}