var today = new Date();
var curYear = today.getFullYear();
var curMonth = today.getMonth();
var setYear = curYear;
var setMonth = curMonth;
var setMonthHolidays;
var curDate = today.getDate();

var weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
var months = ['january','february','march','april','may','june','july','august', 'september','october','november','december'];
var lunarMonth;

function daysIn(month, year) {
  return [31, (year%4 === 0 ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}
var daysInMonth;

function fillTable(tableID) {
  var tableBodyCur = document.getElementById('tableWrap');
  var tableCur = document.querySelectorAll('tbody td');
  var gregCur = document.querySelectorAll('.greg');
  var luneCur = document.querySelectorAll('.lune');
  var infoCur = document.querySelectorAll('.info');
  var nodesToWipe = document.querySelectorAll('.sixNode, .tenNode');

  var firstOfMonth = new Date(setYear, setMonth, 1);
  var firstDay = firstOfMonth.getDay();
  lunarMonth = lunarCalendar[setYear][setMonth];

  daysInMonth = daysIn(setMonth, setYear);
  var holidayMonth = holidays[months[setMonth]](firstDay);
  var lunarHolMonth = lunarHolidays[lunarMonth[0].month - 1];
  // alert(lunarMonth[0].month - 1);
  var toggle = true;



  var dateCount = 0;
  var dateText = "";
  var dateTextLunar = "";
  var infoText = "";
  var monthNumLunar;
  var dateNumLunar;
  var monthLength;

  // tableBodyCur.style.opacity = 0;

  for (var i = 0; i < nodesToWipe.length; i++) {
    nodesToWipe[i].parentNode.removeChild(nodesToWipe[i]);
  }


  for (var count = 0; count < 42; count++) {
    if (firstDay > 0) {firstDay--;}
    else {dateCount += 1;}

    if (dateCount === 0 || dateCount > daysInMonth) {
      dateText = "";
      dateTextLunar = "";
      infoText = "";
      monthNumLunar = NaN;
      dateNumLunar = NaN;
      monthLength = NaN;
    }
    else {
      if (dateCount > lunarMonth[0].len) {
        monthNumLunar = lunarMonth[1].month;
        dateNumLunar = lunarMonth[1].days[dateCount - lunarMonth[0].len - 1];
        monthLength = lunarMonth[1].totalLen;
        if (toggle) {
          lunarHolMonth = lunarHolidays[lunarMonth[1].month - 1];
          // alert(lunarMonth[1].month - 1)
          toggle = false;
        }
      }
      else {
        monthNumLunar = lunarMonth[0].month;
        dateNumLunar = lunarMonth[0].days[dateCount -1];
        monthLength = lunarMonth[0].totalLen;
      }
      dateText = dateCount;
      dateTextLunar = monthNumLunar + "/" + dateNumLunar;
    }


    function addVegenText(veganDaySet) {
      var tenCheck = veganDaySet["tenVeganDays"].indexOf(dateNumLunar);
      var sixCheck = veganDaySet["sixVeganDays"].indexOf(dateNumLunar);
      if (tenCheck > -1) {
        var tenNode = document.createElement("div");
        tenNode.classList.add("tenNode");
        tenNode.innerHTML = "vegan (10)";
        tableCur[count].classList.add("vegen");
        tableCur[count].appendChild(tenNode);
      }
      if (sixCheck > -1) {
        var sixNode = document.createElement("div");
        sixNode.classList.add("sixNode");
        sixNode.innerHTML = "vegan (6)";
        tableCur[count].classList.add("vegen");
        tableCur[count].appendChild(sixNode);
      }
      if (tenCheck == -1 && sixCheck == -1) {
        tableCur[count].classList.remove("vegen");
      }
    }
    if (monthLength == 30) {
      addVegenText(thirty);
    }
    else if (monthLength == 29) {
      addVegenText(twentyNine);
    }

    function holidayFind(holidayArray, counter) {
      for(var c = 0; c < holidayArray.length; c++) {
        if (counter == holidayArray[c].date) {
          return holidayArray[c].day;
        }
      }
      return false;
    }

    var holidayOfDay = holidayFind(holidayMonth, dateCount);
    if (holidayOfDay) {
      infoText += "<br>" + holidayOfDay;
    }

    var lunarHolOfDay = holidayFind(lunarHolMonth, dateNumLunar);
    if (lunarHolOfDay) {
      infoText += "<br>" + lunarHolOfDay;
    }

    if (dateCount === curDate && setMonth === curMonth && setYear === curYear) {
      tableCur[count].classList.add("today");
    }
    else {
      tableCur[count].classList.remove("today");
    }
    if (dateText == "") {
      tableCur[count].classList.remove("active");
      tableCur[count].classList.remove("vegen");
    }
    else {
      tableCur[count].classList.add("active");
    }
    gregCur[count].innerHTML = dateText;
    luneCur[count].innerHTML = dateTextLunar;
    infoCur[count].innerHTML = infoText;

    infoText = "";
  }

  // window.setTimeout(opacityWait, 2500);
}

function opacityWait() {
  tableBodyCur.style.opacity = 1;
}

function prevClick() {
  if (setMonth === 0) {
    setMonth = 11;
    setYear--;
  }
  else {
    setMonth--;
  }

  updateIndicator();
  updateMonthBtn();
  fillTable();
}

function nextClick() {
  if (setMonth === 11) {
    setMonth = 0;
    setYear++;
  }
  else {
    setMonth++;
  }
  updateIndicator();
  updateMonthBtn();
  fillTable();
}

function updateIndicator() {
  var indicator = document.querySelector(".indicator");
  indicator.innerHTML = months[setMonth] + " " + setYear;
}

function updateMonthBtn() {
  var prevButton = document.querySelector(".leftBtn");
  var nextButton = document.querySelector(".rightBtn");
  var prevMonth = (setMonth > 0) ? (months[setMonth - 1]) : (months[11]);
  var nextMonth = (setMonth < 11) ? (months[setMonth + 1]) : (months[0]);
  prevButton.innerHTML = "<< " + prevMonth;
  nextButton.innerHTML = nextMonth + " >>";
}

function dateInfo(e) {
  var target;
  if (e.target.tagName == "DIV") {
    target = e.target.parentNode;
  }
  else {
    target = e.target;
  }
  var output = target.childNodes[1].innerHTML + " " + target.childNodes[2].innerHTML;
  alert(output);
  e.stopPropagation();
}

window.onload = function() {

  updateIndicator();
  updateMonthBtn();
  fillTable();

  var prevButton = document.querySelector(".leftBtn");
  var nextButton = document.querySelector(".rightBtn");
  prevButton.addEventListener("click", prevClick);
  nextButton.addEventListener("click", nextClick);

  var tableBody = document.querySelector("#tableWrap");
  tableBody.addEventListener("click", dateInfo, false);
}
