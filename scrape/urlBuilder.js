'use strict';

const scheduleUrl = 'ri.json?h=f&sid=3&p=0.m%2C12.n&objects=&ox=0&types=0&fe=0&h2=f';
const searchUrlExtension = 'objects.html?max=15&fr=t&partajax=t&im=f&sid=3&l=sv_SE&search_text=&types=';
const typeUrlExtension = 'ri1Q7.html';
const searchText = 'search_text=';
const objectsText = 'objects=';

const stringConcat = a => b => `${a}${b}`;
const stringConcatReverced = a => b => stringConcat(b)(a);

const getTypeURL = stringConcatReverced(typeUrlExtension);

/**
 * [adds types to searchUrlextensio ]
 */
const getSearchUrlExtension = types => stringConcat(searchUrlExtension)(types);

const replaceHtmlUrlWithJson = url => {
    let reg = new RegExp('html');
    return url.replace(reg, 'json');
};

/**
 * [adds url with searchUrlExtension and id]
 */
/**
 * [adds url with searchUrlExtension and id]
 * @param  {[function]} a [any function]
 * @param  {[string]} b [any string]
 * @param  {[function]} c [any function]
 * @return {[function]}   [se getSearchURL description]
 */
const makeSearchURL = (a, b, c) => {
    const d = a(b);

    return (url, types, id) => {
        let urlArray = c(types).split(b);
        return a(url)(urlArray.join(d(id)));
    };
};

/**
 * [creates a url that searches for specific id by specific type]
 * @param  {[string]} url       [url of timeedit]
 * @param  {[string]} types     [type of schedule]
 * @param  {[number/string]} id [id that should be searched for]
 * @return {[string]}             [url]
 */
const getSearchURL = makeSearchURL(stringConcat, searchText, getSearchUrlExtension);


/**
 * [makes a complete scheduleurl by joining it with url and dataIds]
 * @param  {[function]} a [any function]
 * @param  {[string]} b [any string]
 * @param  {[string]} c [any string]
 * @return {[function]}   [description]
 * @private
 */
const makeScheduleURL = (a, b, c) => {
    const d = a(c);

    return (url, dataIds) => {
        let urlArray = b.split(c);
        return a(url)(urlArray.join(d(dataIds)));
    };
};

/**
 * [makes url to specific schedule]
 * @param  {[function]} stringConcat [se function descripton]
 * @param  {[string]} scheduleUrl  [part of url]
 * @param  {[string]} objectsText  [part of url]
 * @return {[string]}              [url string, a url to a schedule]
 * @private
 */
const _getScheduleURL = makeScheduleURL(stringConcat, scheduleUrl, objectsText);

/**
 * [joins all arguments in array if args contains an array]
 * @private
 */
const joinAllArgumentsIfArray = fn => (...args) =>
    fn(...args.map(a => {
        if(Array.isArray(a)){
            return a.join();
        }
        return a;
    }));

/**
 * [uses makeScheudleUrl to make an url with multible schedules id's]
 * makeScheduleURL      [se function description]
 * @return {[string]}   [url that shows multible schedules]
 * @private
 */
const _getMultibleQueryScheduleURL = joinAllArgumentsIfArray(makeScheduleURL(stringConcat, scheduleUrl, objectsText));


/**
 * [runs one of two functions if dataIds is array or not]
 * @param  {[function]} a [anny function that can take 2 argumanets]
 * @param  {[function]} b [anny function that can take 2 argumanets]
 * @return {[result of a or b]}   [result of function a or b]
 * @private
 */
const doIfArrayOrNot = (a, b) => (url, dataIds) =>
    Array.isArray(dataIds) ?
        a(url, dataIds):
        b(url, dataIds);

/**
 * [doIfArrayOrNot description]
 * @param  {[function]} _getMultibleQueryScheduleURL [se function description]
 * @param  {[function]} _getScheduleURL              [se function description]
 * @return {[string]}                              [an schedule url]
 */
const getScheduleURL = doIfArrayOrNot(_getMultibleQueryScheduleURL, _getScheduleURL);


module.exports = {
    replaceHtmlUrlWithJson,
    getTypeURL,
    getSearchURL,
    getScheduleURL
};
