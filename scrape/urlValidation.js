'use strict';

/**
 * [checks if url is infact an url]
 * @param {[url]} url [string]
 * @return {[boolean]}
 */
const isValidUrl = url => {
  let timeeditReg = new RegExp('timeedit');
  let urlReg = new RegExp('^(https?:\\/\\/)?'+
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+
  '((\\d{1,3}\\.){3}\\d{1,3}))'+
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
  '(\\?[;&a-z\\d%_.~+=-]*)?'+
  '(\\#[-a-z\\d_]*)?$','i');
  if(!urlReg.test(url)){
      return false;
  }
  if(!url.match(timeeditReg)){
      return false;
  }
  return true;
};

/**
 * [checks if url has html in it]
 * @return {Boolean}
 */
const isUrlTypeHtml = url => {
  let reg = new RegExp('html');
  return url.match(reg);
};

module.exports = {
  isValidUrl,
  isUrlTypeHtml
};
