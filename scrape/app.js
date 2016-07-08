'use strict';
const request = require('request');
const scrape = require('./scrape');
const urlValidation = require('./urlValidation');
const urlBuilder = require('./urlBuilder');

const app = (url, types) => {
    if(!urlValidation.isValidUrl(url)){
        throw 'Invalid url';
    }

    return {
        getHtml: scrape.getHtml,
        isUrlTypeHtml: urlValidation.isUrlTypeHtml.bind(null, url),

        replaceHtmlUrlWithJson: urlBuilder.replaceHtmlUrlWithJson.bind(null, url),
        getTypeURL: urlBuilder.getTypeURL.bind(null, url),
        getSearchURL: urlBuilder.getSearchURL.bind(null, url, types),
        getScheduleURL: urlBuilder.getScheduleURL.bind(null, url),
    };
};

module.exports = app;
