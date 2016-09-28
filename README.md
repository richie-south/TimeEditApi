
# TimeEditApi
web scraper api to easy get schedule information from timeedit


#### Examples

```javascript
const timeEditApi = require('timeeditApi');

const timeEdit = timeEditApi(
    'https://se.timeedit.net/web/lnu/db1/schema1/', // url
    4                                               // type
);

// todays schedule
timeEdit.getTodaysSchedule('ny105')
    .then((roomSchedule) => {
        console.log(JSON.stringify(roomSchedule, null, 2));
    }).catch((er) => {
        console.log(er);
    });

// schedule by specific date: year, month, day
timeEdit.getScheduleByDate('ny105', new Date())
    .then((roomSchedule) => {
        console.log(JSON.stringify(roomSchedule, null, 2));
    }).catch((er) => {
        console.log(er);
    });

// full schedule
timeEdit.getSchedule('ny105')
    .then((schedule) => {
        console.log(JSON.stringify(schedule, null, 2));
    }).catch((er) => {
        console.log(er);
    });

// search and see if exists
timeEdit.search('ny105')
    .then((result) => {
        console.log(JSON.stringify(result, null, 2));
    }).catch((er) => {
        console.log(er);
    });

// get all the types available
timeEdit.getAllTypes(
        'https://se.timeedit.net/web/lnu/db1/schema1/')
    .then((result) => {
        console.log(JSON.stringify(result, null, 2));
    }).catch((er) => {
        console.log(er);
    });

// get schedule by schedule url
timeEdit.getScheduleByScheduleUrl(
        'https://se.timeedit.net/web/lnu/db1/schema1/s.html?i=6Y7XYQQ7wZ36QvZ5071875y7YQ8')
    .then((result) => {
        console.log(JSON.stringify(result, null, 2));
    }).catch((er) => {
        console.log(er);
    });

```
