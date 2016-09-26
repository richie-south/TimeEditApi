'use strict';
const scrape = require('./scrape/app.js');
const dataParser = require('./dataParser.js');

const _search = html => {
  if(!dataParser.isValidSearch(html)){
    throw 'Invalid search';
  }
  return dataParser.getSearchData(html);
};

const getScheduleByScheduleUrl = url => {
  const s = scrape(url);
  return new Promise((resolve, reject) => {
    if(s.isUrlTypeHtml()){
      s.getHtml(url)
        .then(html => dataParser.getSearchId(html))
        .then(id => {
          const jsonUrl = s.replaceHtmlUrlWithJson();
          s.getHtml(jsonUrl)
            .then(jsonString => JSON.parse(jsonString))
            .then(parsedJson => resolve(dataParser.buildSchedule(parsedJson, id)))
            .catch(reject);
        })
        .catch(reject);
    }else{
      s.getHtml(url)
        .then(jsonString => JSON.parse(jsonString))
        .then(parsedJson => resolve(dataParser.buildSchedule(parsedJson)))
        .catch(reject);
    }
  });
};

/**
 * [gets types name and types value in array]
 * @param  {[string]} url [timeedit url]
 * @return {[promise]}     [array of object with all types]
 */
const getAllTypes = url => {
  const s =  scrape(url);
  return new Promise((resolve, reject) => {
    s.getHtml(s.getTypeURL())
      .then(html => resolve(dataParser.getTypes(html)))
      .catch(reject);
  });
};

/**
 * [check if x exsits]
 * @param  {[object]} scraper [initilized scraper object]
 * @param  {[string / array of strings]} id [text for what you want to search for]
 * @return {[promise]}    [search result]
 */
const search = scraper => id =>
  new Promise((resolve, reject) => {
    scraper.getHtml(scraper.getSearchURL(id))
      .then(html =>  _search(html))
      .then(searchData => resolve(searchData))
      .catch(reject);
  });

/**
 * [schedule over multible days]
 * @param  {[object]} _getSchedule [initilized _getSchedule object]
 * @param  {[string / array of strings]} id     [name of thing]
 * @return {[promise]}        [schedule over multible days]
 */
const getSchedule = _getSchedule => id =>
  new Promise((resolve, reject) => {
    _getSchedule(id)
      .then(data => JSON.parse(data))
      .then(parsedData => resolve(dataParser.buildSchedule(parsedData, id)))
      .catch(reject);
  });

/**
 * [gets todays schedule]
 * @param  {[object]} _getSchedule [initilized _getSchedule object]
 * @param  {[string / array of strings]} id     [name of a thing]
 * @return {[promise]}        [todays schedule]
 */
const getTodaysSchedule = _getSchedule => id =>
  new Promise((resolve, reject) => {
    _getSchedule(id)
      .then(data => JSON.parse(data))
      .then(parsedData => resolve(dataParser.buildTodaysSchedule(parsedData, id)))
      .catch(reject);
  });

/**
 * [gets schedule for multible days un parsed]
 * @param  {[object]} scraper [initilized scraper object]
 * @param  {[string / array of strings]} id     [name of a thing]
 * @return {[promise]} [unpased schedule over multible days]
 */
const _getSchedule = scraper => id =>
  new Promise((resolve, reject) => {
    scraper.getHtml(scraper.getSearchURL(id))
      .then(html => _search(html))
      .then(searchData => searchData.map(a => a.id))
      .then(dataIds => scraper.getHtml(scraper.getScheduleURL(dataIds)))
      .then(jsonString => resolve(jsonString))
      .catch(reject);
  });

const getScheduleByItemId = scraper => itemId =>
  new Promise((resolve, reject) => {
      scraper.getHtml(scraper.getScheduleURL(itemId))
        .then(jsonString => resolve(jsonString))
        .catch(reject);
  });

const api = (url, types) => {
  const scraper = scrape(url, types);

  return {
    getSchedule: getSchedule(_getSchedule(scraper)),
    getTodaysSchedule: getTodaysSchedule(_getSchedule(scraper)),
    search: search(scraper),
    getScheduleByItemId: getScheduleByItemId(scraper),

    getAllTypes,
    getScheduleByScheduleUrl
  };
};

module.exports = api;
