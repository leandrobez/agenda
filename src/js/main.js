/**to do
 * 1 .identificar o dia de hoje
 * 2 armazenar em local Storage
 * 3 recupera de local Storage
 * 4 iniciar o pedio a clase scheduler
 * 5 Buscar a estrutura do calendário
 * 6 receber do arquivo scheduler as variaveis quando o DOM carregou
 * 7 verificar se estar navegando no calendário
 */

/**variaveis par a inicialização */
let next,
  prev = false;
(gridDays = getGridDays()),
  (settings = {
    container: document.querySelector('.il-calendar--container'),
    calendar: document.querySelector('.il-calendar--front'),
    divWeeks: document.querySelector('.il-weeks'),
    days: document.querySelector('.il-weeks .il-week--item span'),
    weekDays: document.querySelector('.il-weeks--days'),
    form: document.querySelector('.il-back'),
    input: document.querySelector('.il-calendar--back input'),
    buttons: document.querySelector('.il-calendar--back button'),
    choices: false
  });

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

const saveLocal = (config, force) => {
  let data = JSON.stringify(config);
  if (!window.localStorage.getItem('config')) {
    window.localStorage.setItem('config', data);
  } else if (force) {
    window.localStorage.setItem('config', data);
  }
  //console.log(window.localStorage.getItem('config'))
  return;
};

/**Class scheduler */

class scheduler {
  /**todo do
   * 1 construtor precisa da esturuta de deias
   */
  constructor(calendar, calendarStructure) {
    this.calendar = calendar;
    this.calendarStructure = calendarStructure;
  }

  setCurrentConfig(currentConfig) {
    this.currentConfig = currentConfig;
  }

  setTodayCurrent(d) {
    this.todayCurrent = d;
  }

  setMonthCurrent(m) {
    this.monthCurrent = m;
  }

  setLabels() {
    let year = document.querySelector('.il-current--date h1.il-year'),
      today = document.querySelector('.il-current--date h1.il-today'),
      labelData = document.getElementById('il-data');
    labelData.innerText = this.getLabelData();
    year.innerText = this.currentConfig.todayYear;
    today.innerText =
      this.currentConfig.todayDay +
      ' de ' +
      this.getMonthLabel(false, this.currentConfig.todayMonth);
    return;
  }

  getMonthLabel(short, m) {
    if (short) {
      return this.calendarStructure.monthLabels.short[m - 1];
    }
    return this.calendarStructure.monthLabels.long[m - 1];
  }

  getLabelData() {
    let label =
      'Data atual: ' +
      this.currentConfig.todayDay +
      '/' +
      this.currentConfig.todayMonth +
      '/' +
      this.currentConfig.todayYear +
      ' Hora: ' +
      this.currentConfig.todayNow +
      ':' +
      this.currentConfig.toadyMin;
    return label;
  }

  /**retorna a breviatura do mes */
  getMonthKey(m) {
    return this.calendarStructure.monthLabels.short[m - 1];
  }

  /**resgata o currentTime de Local Storage */
  getCurrentConfig() {
    let data = window.localStorage.getItem('config');
    let config = JSON.parse(data);
    return config;
  }

  /**display month' days */
  makeWeeks(month) {
    let weeks = this.calendar[month].weekDays;
    let today = this.currentConfig.todayDay;
    let items = '';
    let html = '';
    weeks.forEach(week => {
      html = '<div class="il-week--item">';
      week.forEach(day => {
        if (day == today) {
          html += `<span class="il-today">${day}</span>`;
        } else {
          html += `<span>${day}</span>`;
        }
      });

      html += '</div>';
      items += html;
    });
    settings.divWeeks.innerHTML = items;
    //settings.days.addEventListener('click', () => {});
    //console.log(items);
  }

  checkCurrentMont(m) {
    //console.log()
    let storageConfig = JSON.parse(window.localStorage.getItem('config'));
    if (storageConfig.todayMonth == m) {
      return storageConfig.todayDay;
    }
    return false;
  }

  /**display Calendar */
  displayCalendar() {
    let currentConfig = this.getCurrentConfig();
    this.setCurrentConfig(currentConfig);
    let month = currentConfig.todayMonth;
    let day = currentConfig.todayDay;
    this.setMonthCurrent(month);
    this.setTodayCurrent(day);
    let monthKey = this.getMonthKey(month);
    this.setLabels();
    this.makeWeeks(monthKey);
  }

  /**display NextCalendar */
  displayChangeCalendar() {
    let currentConfig = this.getCurrentConfig();
    let nextMonth = JSON.parse(window.localStorage.getItem('monthCurrent'));
    let check = this.checkCurrentMont(nextMonth);
    if (!check) {
      this.setTodayCurrent(1);
      currentConfig.todayDay = 1;
    } else {
      this.setTodayCurrent(check);
      currentConfig.todayDay = check;
    }
    this.setMonthCurrent(nextMonth);
    currentConfig.todayMonth = nextMonth;
    /**nova configuração do calendario */
    this.setCurrentConfig(currentConfig);
    let monthKey = this.getMonthKey(nextMonth);
    this.setLabels();
    this.makeWeeks(monthKey);
  }
}

const myScheduler = gridDays => {
  //dá o processo de montagem do calendário atrave´s da clase scheduller
  let newScheduler = new scheduler(gridDays, calendarStructure);
  if (!next && !prev) {
    /**TODO
     * 1  verificar o current time
     * 2 armazenar em local storage
     */
    /** clear o mes corrente */
    window.localStorage.removeItem('monthCurrent');
    let currentTime = getCurrentTime();
    saveLocal(currentTime, false);
    newScheduler.displayCalendar();
  } else {
    /**button clicked */
    let nextMonth = null;
    if (window.localStorage.getItem('monthCurrent')) {
      nextMonth = JSON.parse(window.localStorage.getItem('monthCurrent'));
    } else {
      nextMonth = JSON.parse(window.localStorage.getItem('config'));
      nextMonth = nextMonth.todayMonth;
    }
    if (next) {
      if (nextMonth < 12) {
        window.localStorage.setItem('monthCurrent', nextMonth + 1);
      } else {
        window.localStorage.setItem('monthCurrent', 1);
      }
      //newScheduler.displayNextCalendar();
    } else {
      if (nextMonth > 1) {
        window.localStorage.setItem('monthCurrent', nextMonth - 1);
      } else {
        window.localStorage.setItem('monthCurrent', 12);
      }
      //newScheduler.displayPrevCalendar();
    }
    newScheduler.displayChangeCalendar();
  }
};

/**button for navegate calendar */
let btnNext = document.getElementById('next-month');
btnNext.addEventListener('click', () => {
  next = true;
  prev = false;
  myScheduler(gridDays);
});
let btnPrev = document.getElementById('prev-month');
btnPrev.addEventListener('click', () => {
  next = false;
  prev = true;
  myScheduler(gridDays);
});

/**Timeline */
let timelineList = document.querySelector('.il-timeline--list');
let timeLineConfig = {
  start: 8,
  end: 18
};

const makeTimeline = () => {
  let total = timeLineConfig.end - timeLineConfig.start + 1;
  let labelTime = '';
  let hour = timeLineConfig.start;
  for (var i = 1; i < total * 2; i++) {
    if (i % 2 == 0) {
      hour--;
      //console.log(i, hour + ':30');
      labelTime += `<li><span>${hour}:30</span></li>`;
    } else {
      //console.log(i, hour + ':00');
      labelTime += `<li><span>${hour}:00</span></li>`;
    }
    hour++;
  }

  if (labelTime) {
    timelineList.innerHTML = labelTime;
  }
};

const makeEvent = (event, doca) => {
  console.log(event);
  let eventGroup1 = document.querySelector('.il-events--group.doca1');
  let eventGroup2 = document.querySelector('.il-events--group.doca2');
  let eventGroup3 = document.querySelector('.il-events--group.doca3');
  let eventGroup4 = document.querySelector('.il-events--group.doca4');

  let item = `<div class="il-doca--item">
      <span class="il-status">${event.status}</span>
      <span class="il-type">${event.type}</span>
  </div>`;
  switch (doca) {
    case 1:
      eventGroup1.innerHTML = `<div class="il-doca">${oldItem}${item}</div>`;
      break;
    case 2:
      eventGroup2.innerHTML = item;
      break;
    case 3:
      eventGroup3.innerHTML = item;
      break;
    case 4:
      eventGroup4.innerHTML = item;
      break;
  }
};
let events = [
  {
    start: '08:00',
    end: '08:30',
    status: 'carga',
    type: 'caminhão'
  },
  {
    start: '09:00',
    end: '09:30',
    status: 'descarga',
    type: 'caminhão'
  }
];
let oldItem = '';
let btnDocaAdd1 = document.getElementById('add-doca1');

btnDocaAdd1.addEventListener('click', () => {

  for (var x = 0; x < events.length; x++) {
    if(events[x].status){
      oldItem =  `<div class="il-doca--item">
          <span class="il-status">${events[x].status}</span>
          <span class="il-type">${events[x].type}</span></div>`;
      oldItem += oldItem;
    }
  }
  
  let indice = events.length - 1;
  events[indice].start = prompt('Previsão de início', events[indice].start);
  events[indice].end = prompt('Previsão de término', events[indice].end);
  events[indice].status = prompt('Carga ou descarga', events[indice].status);
  events[indice].type = prompt('Camionete, caminhão ...', events[indice].type)
  makeEvent(events[indice], 1);
});

document.addEventListener(
  'DOMContentLoaded',
  () => {
    next = false;
    prev = false;
    makeTimeline();
    myScheduler(gridDays);
  },
  false
);
