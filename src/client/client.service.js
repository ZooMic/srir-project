const request = require('request');
const fs = require('fs');

 /**
 * Represents a file to read.
 * @method
 * @name readFile
 * @param {string} path - The file to read.
 * @param {string} encode - Represents unicode standard.
 */
const readFile = filePath => fs.readFileSync(filePath, 'utf8');

 /**
 * Send method.
 * @method
 * @name sendFile
 * @param {string} url
 * @param {object} file - The task file
 * @param {integer} data - The data to send to the task
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