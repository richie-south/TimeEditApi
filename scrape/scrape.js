'use strict';
const request = require('request');


 /**
 * [get html from site]
 * @param  {[string]} url [url to site]
 * @return {[string]}     [html in string]
 */
const getHtml = url =>
    new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                return resolve(body);
            }
            return reject(error);
        });
    });


module.exports = {
    getHtml,
};
