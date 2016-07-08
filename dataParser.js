'use strict';
const cheerio = require('cheerio');

const _loadHtml =  html => cheerio.load(html);

const _getTodaysDate = () => new Date();

const _parseDate =  dateString => new Date(dateString);

const getSearchData = html => {
    let $ = _loadHtml(html);
    let dataIds = $('.searchObject').map((i, elem) => {
        return {
            id: $(elem).data('id'),
            name: $(elem).data('name')
        };
    }).get();
    return dataIds.length > 0 ? dataIds : dataIds[0];
};

const getTypes = html => {
    let $ = _loadHtml(html);
    let types = $('#fancytypeselector option').map((i, elem) => {
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
    let $ = _loadHtml(html);
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
        .map((reservation) => {
            return {
                booking: {
                    time:{
                        startDate: reservation.startdate,
                        startTime: reservation.starttime,
                        endDate: reservation.enddate,
                        endTime: reservation.endtime
                    },
                    id,
                    bookingId: reservation.id,
                    columns: reservation.columns
                }
            };
        });
};

/**
 * [todays room schedule information]
 * @param  {[object]} object [cherio html object]
 * @return {[object]}        [only todays room schedule information]
 */
const buildTodaysSchedule = (object, id) => {
    let todaysSchedule = buildSchedule(object, id)
        .filter((reservation) => {
            let reservationDate = _parseDate(reservation.booking.time.startDate);
            let todaysDate = _getTodaysDate();

            return reservationDate.getFullYear() === todaysDate.getFullYear() &&
                reservationDate.getMonth() === todaysDate.getMonth() &&
                reservationDate.getDate() === todaysDate.getDate();
        });
    return todaysSchedule.length > 0 ? todaysSchedule : [{ id }] ;
};

const isValidSearch =  html => {
    let $ = _loadHtml(html);
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
