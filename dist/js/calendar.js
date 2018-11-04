const calendarStructure = {
  totalDays: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  monthLabels: {
    long: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ],
    short: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez'
    ]
  },
  weekLabels: {
    long: [
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
      'Domingo'
    ],
    short: ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
    otherShort: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
  }
};

/**generate days of the week */
const setWeekDays = week => {
  let config = window.localStorage.getItem('config') ? true : false;
  if (config) {
    let containerDays = document.querySelector('.il-weeks--days');
    let days = week.otherShort;
    let labelDays = '';
    days.forEach(day => {
      labelDays += `<li>${day}</li>`;
    });
    containerDays.innerHTML = labelDays;
    return;
  }
  return false;
};

/**run seconds, minutes, day, month and year in the present day */
const getCurrentTime = () => {
  let today = new Date();
  return {
    todayDay: today.getDate(),
    todayMonth: today.getMonth() + 1,
    todayYear: today.getFullYear(),
    todayNow: today.getHours(),
    toadyMin: today.getMinutes()
  };
};

/*generate days grids*
const getGridDays = () => {
  let gridDays = [];
  let weekDays = [];
  let gridWeek = [];
  calendarStructure.totalDays.forEach((days, index) => {
    let month = calendarStructure.monthLabels.short[index];
    let j = 0;
    let i;
    let keyDay;
    let week = [];
    let div = 0;
    for (i = 0; i < days; i++) {
      keyDay = i + 1;
      week.push(keyDay);
      div = keyDay % 7;
      if (div == 0) {
        gridWeek[j] = week;
        weekDays.push(gridWeek[j]);
        week = [];
        j++;
      }
    }
    if (div != 0 && div <= 3) {
      let next = j + 1;
      let excetion = 35 - days;
      for (i = 1; i <= excetion; i++) {
        week.push(i);
      }
      gridWeek[next] = week;
      weekDays.push(gridWeek[next]);
    }
    gridDays[month] = { weekDays };
    weekDays = [];
  });
  return gridDays;
};*/

const searchPrevs = (y, date) => {
  let pos = new Date(y, date, 1).getDay();
  if (date == 0) {
    lastDayOfMonthPrev = new Date(y, date, 0).getDate();
  } else {
    lastDayOfMonthPrev = new Date(y, date - 1, 0).getDate();
  }
  let nrPrevs = 0;
  let firstPrev = null;
  let prevs = null;
  if (pos != 0) {
    nrPrevs = pos;

    prevs = new Array();
    firstPrev = lastDayOfMonthPrev - (pos - 1);
    for (var i = 0; i < nrPrevs; i++) {
      prevs[i] = firstPrev + i;
    }
  }
  return prevs;
};

const createListDate = () => {
  let today = new Date(),
    y = today.getFullYear(),
    month = null,
    months = [],
    monthsConfig = [];
  for (date = 0; date < 12; date++) {
    if (date == 0) {
      lastDayOfPrevMonth = new Date(y, 0, 0).getDate();
    } else {
      lastDayOfPrevMonth = new Date(y, date, 0).getDate();
    }
    (month = calendarStructure.monthLabels.short[date]),
      (lastDayOfMonth = new Date(y, date + 1, 0).getDate()),
      (weekConfig = new Array()),
      (weekTemp = null);
    let prevs = searchPrevs(y, date);
    if (prevs) {
      weekConfig = prevs;
    }
    for (var d = 1; d <= lastDayOfMonth; d++) {
      weekConfig.push(d);
    }

    weekTemp = weekConfig;
    let weeks = weekTemp.length;
    let count = 0;
    let start = 0;
    let nrElements = 7;
    let restElement = weeks % 7;
    let countArrays = (weeks - restElement) / 7;
    let arrayTruncate = new Array();
    if (countArrays > 0) {
      for (var i = 0; i <= countArrays - 1; i++) {
        arrayTruncate[i] = weekConfig.splice(start, nrElements);
        weekConfig = weekTemp;
        count = i;
      }
      arrayTruncate[count + 1] = weekConfig;
      if (arrayTruncate[count + 1].length < 7) {
        let rest = 7 - arrayTruncate[count + 1].length;
        for (let r = 1; r <= rest; r++) {
          arrayTruncate[count + 1][arrayTruncate[count + 1].length] = r;
        }
      }
    }

    months[month] = {
      weekday: arrayTruncate,
      lastDayOfM: lastDayOfMonth
    };
  }
  return months;
};
