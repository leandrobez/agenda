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
    short: ['S', 'T', 'Q', 'Q', 'S', 'S', 'D']
  }
};

/**generate days of the week */
const setWeekDays = week => {
  let containerDays = document.querySelector('.il-weeks--days');
  let days = week.short;
  let labelDays = '';
  days.forEach(day => {
    labelDays += `<li>${day}</li>`;
  });
  containerDays.innerHTML = labelDays;
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

/*generate days grids*/
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
      let next = j+1;
      let excetion = 35 - days ;//days - (j*7);
      //let restDay= j*7;
      for (i = 1; i <= excetion; i++) {
        //restDay++
        week.push(i);
        //console.log(restDay)
      }
      gridWeek[next] = week;
      weekDays.push(gridWeek[next]);
    }
    gridDays[month] = {weekDays};
    weekDays = [];
  });
  return gridDays;
};