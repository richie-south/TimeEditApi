'use strict';
const cheerio = require('cheerio');

const _loadHtml =  html => cheerio.load(html);

const _parseDate =  dateString => new Date(dateString);

const getSearchData = html => {
  const $ = _loadHtml(html);
  const dataIds = $('.searchObject')
    .map((i, elem) => {
      return {
        id: $(elem).data('id'),
        name: $(elem).data('name')
      };
  }).get();
  return dataIds.length > 0 ? dataIds : dataIds[0];
};

const getTypes = html => {
  const $ = _loadHtml(html);
  const types = $('#fancytypeselector option')
    .map((i, elem) => {
      return {
        name: $(elem).text(),
        value: $(elem).val()
      };
  }).get();
  return types;
};

/**
 * [gets name of searched item]
 * @param  {[string]} html [html to load into cherrio]
 * @return {[string]}      [searched item name]
 */
const getSearchId = html => {
  const $ = _loadHtml(html);
  return $('#searchTextWide').text().trim();
};

/**
 * [sorts schedule infromation]
 * @param  {[object]} object [cherio html object]
 * @param  {[string]} id     []
 * @return {[object]}        [sorted schedule infromation]
 */
const buildSchedule = (object, id) => {
  id = id || null;
  if(!object.hasOwnProperty('reservations')){ throw 'Invalid search result'; }
  return object.reservations
    .map(reservation => {
      return {
        time:{
          startDate: reservation.startdate,
          startTime: reservation.starttime,
          endDate: reservation.enddate,
          endTime: reservation.endtime
        },
        searchId: id,
        bookingId: reservation.id,
        columns: reservation.columns
      };
  });
};

/**
 * [todays room schedule information]
 * @param  {[object]} object [cherio html object]
 * @return {[object]}        [only todays room schedule information]
 */
const buildTodaysSchedule = (object, id) => {
  const todaysSchedule = buildSchedule(object, id)
    .filter((reservation) => {
      const reservationDate = _parseDate(reservation.time.startDate);
      const todaysDate = new Date();
      return reservationDate.getFullYear() === todaysDate.getFullYear() &&
        reservationDate.getMonth() === todaysDate.getMonth() &&
        reservationDate.getDate() === todaysDate.getDate();
    });
  return todaysSchedule.length > 0 ? todaysSchedule : null;
};

const isValidSearch =  html => {
  const $ = _loadHtml(html);
  return $('.searchObject').hasOwnProperty('0');
};

module.exports = {
  isValidSearch,
  buildTodaysSchedule,
  buildSchedule,
  getSearchId,
  getTypes,
  getSearchData
};
