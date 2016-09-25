// Consumes month num, first day, and number of
// consecutive days in that month remaining in greg month
// produces object with days, len, month, representing that
// lunar month WITHIN the confines of the gregorian month
function lunarMonth(month, start, len, totalLen) {
  this.month = month;
  this.days = [];
  this.len = len;
  this.totalLen = totalLen;
  for (var date = start, count = 0; count < len; count++, date++) {
    this.days[count] = date;
  }
}
var lunarCalendar = {
  2016: [
    [new lunarMonth(11,22,9,30), new lunarMonth(12,1,22,29)],
    [new lunarMonth(12,23,7,29), new lunarMonth(1,1,22,30)],
    [new lunarMonth(1,23,8,30), new lunarMonth(2,1,23,29)],
    [new lunarMonth(2,24,6,29), new lunarMonth(3,1,24,30)],
    [new lunarMonth(3,25,6,30), new lunarMonth(4,1,25,29)],
    [new lunarMonth(4,26,4,29), new lunarMonth(5,1,26,29)],
    [new lunarMonth(5,27,3,29), new lunarMonth(6,1,28,30)],
    [new lunarMonth(6,29,2,30), new lunarMonth(7,1,29,29)],
    [new lunarMonth(8,1,30,30)],
    [new lunarMonth(9,1,30,30), new lunarMonth(10,1,1,29)],
    [new lunarMonth(10,2,28,29), new lunarMonth(11,1,2,30)],
    [new lunarMonth(11,3,28,30), new lunarMonth(12,1,3,30)]
  ],
  2017: [
    [new lunarMonth(12,4,27,30), new lunarMonth(1,1,4,29)],
    [new lunarMonth(1,5,25,29), new lunarMonth(3,1,3,30)],
    [new lunarMonth(2,4,27,30), new lunarMonth(3,1,4,29)],
    [new lunarMonth(3,5,25,29), new lunarMonth(4,1,5,30)],
    [new lunarMonth(4,6,25,30), new lunarMonth(5,1,6,29)],
    [new lunarMonth(5,7,23,29), new lunarMonth(6,1,7,29)],
    [new lunarMonth(6,8,22,29), new lunarMonth(6,1,9,30)],
    [new lunarMonth(6,10,21,30), new lunarMonth(7,1,10,29)],
    [new lunarMonth(7,11,19,29), new lunarMonth(8,1,11,30)],
    [new lunarMonth(8,12,19,30), new lunarMonth(9,1,12,29)],
    [new lunarMonth(9,13,17,29), new lunarMonth(10,1,13,30)],
    [new lunarMonth(10,14,17,30), new lunarMonth(11,1,14,30)]
  ]
};
var twentyNine = [1,8,14,15,18,23,24,27,28,29];
var thirty = [1,8,14,15,18,23,24,28,29,30];
// veganDays.january = function() {
//
// }

var easter = {
  2014: {month: 3, date: 20},
  2015: {month: 3, date: 5},
  2016: {month: 2, date: 27},
  2017: {month: 3, date: 16},
  2018: {month: 3, date: 1},
  2019: {month: 3, date: 21},
  2020: {month: 3, date: 12},
  2021: {month: 3, date: 4},
};

// Consumes date of week of first day of month (0-6, sat-sun)
// and day of week + week of holiday
// (e.g. third monday -> day=1, week=2)
// outputs date of holiday (1-31)
function getHoliday(firstDay, day, week) {
  var difference;
  if(firstDay >= day) {difference = firstDay - day;}
  // else if (firstDay == day) {difference = 7;}
  else if (firstDay < day) {difference = 7 - (day - firstDay);}
  var holidayDate;
  if (firstDay <= day) {
    holidayDate = (week * 7) - difference + 1;
  }
  else if (firstDay > day) {
    holidayDate = (week + 1) * 7 - difference + 1;
  }
  return holidayDate;
}

var holidays = {};
holidays.january = function(firstDay) {
  var holidayList = [];
  holidayList.push(
    {date: 1, day: "New Year's Day"}
  );
  return holidayList;
};
holidays.february = function(firstDay) {
  var holidayList = [];
  holidayList.push(
    {date: getHoliday(firstDay, 1, 2), day: "Family Day"}
  );
  return holidayList;
};
holidays.march = function(firstDay) {
  var holidayList = [];
  if (easter[setYear].month == 2 || easter[setYear].date <= 2) {
    holidayList.push(
      {date: (easter[setYear].month == 2) ? (easter[setYear].date - 2) : (daysInMonth - 2 + easter[setYear].date), day: "Good Friday"}
    );
  }
  if (easter[setYear].month == 2 && (easter[setYear].date < daysInMonth)) {
    holidayList.push(
      {date: (easter[setYear].date + 1), day: "Easter Monday"}
    );
  }
  holidayList.push()
  return holidayList;
};
holidays.april = function(firstDay) {
  var holidayList = [];
  if (easter[setYear].month == 3 || easter[setYear].date == daysIn(2, setYear)) {
    holidayList.push(
      {date: (easter[setYear].month == 3) ?
        (easter[setYear].date + 1) : 1, day: "Easter Monday"}
    );
  }
  return holidayList;
};
holidays.may = function(firstDay) {
  var holidayList = []
  var vicDate;
  var vicStart = new Date(setYear, 4, 24).getDay();
  if (vicStart == 1) {
    vicDate = 24;
  }
  else if (vicStart != 1) {
    var difference = (vicStart == 0) ? 6 : (vicStart - 1);
    vicDate = 24 - difference;
  }
  holidayList.push(
    {date: vicDate, day: "Victoria Day"}
  );
  return holidayList;
};
holidays.june = function(firstDay) {
  var holidayList = [];
  return holidayList;
};
holidays.july = function(firstDay) {
  var holidayList = [];
  holidayList.push(
    {date: 1, day: "Canada Day"}
  );
  return holidayList;
};
holidays.august = function(firstDay) {
  var holidayList = [];
  holidayList.push(
    {date: getHoliday(firstDay,1,0), day: "Civic Holiday"}
  );
  return holidayList;
};
holidays.september = function(firstDay) {
  var holidayList = [];
  holidayList.push(
    {date: getHoliday(firstDay,1,0), day: "Labour Day"}
  );
  return holidayList;
};
holidays.october = function(firstDay) {
  var holidayList = [];
  holidayList.push(
    {date: getHoliday(firstDay,1,1), day: "Thanksgiving"}
  );
  return holidayList;
};
holidays.november = function(firstDay) {
  var holidayList = [];
  holidayList.push(
    {date: 11, day: "Remembrance Day"}
  );
  return holidayList;
};
holidays.december = function(firstDay) {
  var holidayList = [];
  holidayList.push(
    {date: 25, day: "Christmas Day"}
  );
  holidayList.push(
    {date: 26, day: "Boxing Day"}
  );
  return holidayList;
};

var lunarHolidays = [
  [{date: 1, day: "Chinese New Year<br>Birthday of Maitreya Buddha"}],
  [{date: 19, day: "Birthday of Avalokitsvera Bodhisattva"},
   {date: 21, day: "Birthday of Samantabhadra Bodhisattva"}],
  [],
  [{date: 4, day: "Birthday of Manjushri Bodhisattva"},
   {date: 8, day: "Birthday of Buddha Sakyamuni"}],
  [],
  [{date: 3, day: "Birthday of Skanda Bodhisattva"}],
  [{date: 30, day: "Birthday of Kshitigarbha Bodhisattva"}],
  [],
  [{date: 30, day: "Birthday of Bhaisajyaguru Buddha"}],
  [],
  [{date: 17, day: "Birthday of Amitabha Buddha"}],
  []
];






var test5 = {
  val: "test5",
  val2: "dfsaf"
}
/*1ed34104-a3a0-4984-bf10-a3917b9b223d HolidayAPI key*/
/*https://holidayapi.com/v1/holidays?key=1ed34104-a3a0-4984-bf10-a3917b9b223d&country=CA&year=2016&month=10*/
