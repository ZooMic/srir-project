const request = require('request');
const fs = require('fs');

const readFile = filePath => fs.readFileSync(filePath, 'utf8');

const sendFile = (url, file, data) =>
    new Promise((resolve, reject) => {
        request.post({
            url,
            body: { task: file, data },
            json: true,
        }, (error, resp, body) => {
            if (error) {
                reject(error);
            } else {
                resolve(body);
            }
        });
    });

module.exports = { readFile, sendFile };