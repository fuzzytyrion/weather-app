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
    return new Promise((resolve, reject) => {
        fs.writeFile('default-data.json', (error) => {
            if (error) {
                reject('error!');
            } else {
                resolve('good times!');
            }
        });
    })
    
};

module.exports = {
    getDefault,
    saveDefault
}