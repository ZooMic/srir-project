const request = require('request');
const fs = require('fs');

/**
 * Tries to open and read task file referenced by file path
 * @param {string} filePath - path to task file
 * @returns {string} file
 */
const readFile = filePath => fs.readFileSync(filePath, 'utf8');

/**
 * Sends task file and task data via HTTP POST method
 * @param {string} url - url to the endpoint
 * @param {string} file - task file (parsed as a string/JSON)
 * @param {object} data - task data
 * @returns {Promise<any>}
 */
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