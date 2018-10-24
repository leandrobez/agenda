/**to do
 * 1 .identificar o dia de hoje
 * 2 armazenar em local Storage
 * 3 recupera de local Storage
 * 4 iniciar o pedio a clase scheduler
 * 5 Buscar a estrutura do calendário
 * 6 receber do arquivo scheduler as variaveis quando o DOM carregou
 * 7 verificar se estar navegando no calendário
 */

/**variable for start app */
let next,
  prev = false,
  bank = null;
(gridDays = getGridDays()),
  (settings = {
    container: document.querySelector('.il-calendar--container'),
    calendar: document.querySelector('.il-calendar--front'),
    divWeeks: document.querySelector('.il-weeks'),
    weekDays: document.querySelector('.il-weeks--days'),
    days: document.querySelector('.il-weeks .il-week--item span'),
    choices: false
  }),
  (timeCurrent = null),
  (timelineList = document.querySelector('.il-timeline--list')),
  (timeLineConfig = {
    start: 7,
    end: 17
  }),
  (events = [
    {
      start: '07:00',
      end: '07:30',
      status: 'carga',
      type: 'caminhão'
    },
    {
      start: '08:00',
      end: '08:30',
      status: 'descarga',
      type: 'bitrem'
    }
  ]),
  (oldItem = ''),
  (inputSearch = document.querySelector('.il-input--seach')),
  (btnSearch = document.getElementById('btn-search')),
  (btnFormClose = document.getElementById('il-form-close')),
  /*(btnDocaAdd1 = document.getElementById('add-doca1')),
  (btnDocaAdd2 = document.getElementById('add-doca2')),
  (btnDocaAdd3 = document.getElementById('add-doca3')),
  (btnDocaAdd4 = document.getElementById('add-doca4')),*/
  (btnNext = document.getElementById('next-month')),
  (btnPrev = document.getElementById('prev-month')),
  (eventstoDo = null);


  /**Class eventsToDo - make events for app */
class eventsToDo {
  constructor(databank) {
    this.databank = databank;
  }

  setEvents(events) {
    this.events = events;
  }

  getOldEvent() {
    let events = this.events;
    let oldItem = '';
    for (var x = 0; x < events.length; x++) {
      if (events[x].status) {
        oldItem = `<div class="il-doca--item">
              <span class="il-status">${events[x].status}</span>
              <span class="il-type">${events[x].type}</span></div>`;
        oldItem += oldItem;
      }
    }
    return oldItem;
  }

  setNew() {
    let events = this.events;
    let indice = events.length - 1;
    events[indice].start = prompt('Previsão de início', events[indice].start);
    events[indice].end = prompt('Previsão de término', events[indice].end);
    events[indice].status = prompt('Carga ou descarga', events[indice].status);
    events[indice].type = prompt(
      'Camionete, caminhão ...',
      events[indice].type
    );
    this.events = events;
  }

  search(value) {
    let datas = this.databank;
    let str = null;
    let result = [];
    datas.forEach((item, index) => {
      str = item.cliente.search(value.toUpperCase());
      if (str == 0) {
        datas[index].key = index;
        result.push(datas[index]);
      }
    });
    return result;
  }

  generateEvent(start) {
    //console.log(this.databank)
    let target = 'Carregar';
    let transport = 'Caminhão';
    let tara = '14ton';
    start = prompt('Hora do início', start);
    target = prompt(
      'Que tipo da ação será realizada? Carga ou Descarga',
      target
    );
    transport = prompt('Qual o tipo de transporte?', transport);
    tara = prompt('Qual a tonelagem?', tara);
    return {
      start: start,
      target: target,
      transport: transport,
      tara: tara
    };
  }

  makeEvent(doca) {
    let oldItem = this.getOldEvent();
    let events = this.events;
    let event = events[events.length - 1];
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
  }
}

/**import  dataBanc from '../bd/dataBanc.json' */
const dataBankJSON = () => {
  let url = './bd/databank.json';
  axios
    .get(url)
    .then(response => {
      bank = response.data;
      eventstoDo = new eventsToDo(bank);
    })
    .catch(err => {
      console.log(err);
    });
};

/**store data to localStorage */
const saveLocal = (config, force) => {
  let data = JSON.stringify(config);
  if (!window.localStorage.getItem('config')) {
    window.localStorage.setItem('config', data);
  } else if (force) {
    window.localStorage.setItem('config', data);
  }
  return;
};

/**make timelines */
const makeTimeline = () => {
  let total = timeLineConfig.end - timeLineConfig.start + 1;
  let labelTime = '';
  let hour = timeLineConfig.start;
  for (var i = 1; i < total * 2; i++) {
    if (i % 2 == 0) {
      hour--;
      labelTime += `<li><span>${hour}:30</span></li>`;
    } else {
      labelTime += `<li><span>${hour}:00</span></li>`;
    }
    hour++;
  }
  labelTime += `<li><span>${hour - 1}:30</span></li>`;
  if (labelTime) {
    timelineList.innerHTML = labelTime;
  }
};

/**inicialize scheduler */
const myScheduler = gridDays => {
  let newScheduler = new scheduler(gridDays, calendarStructure);
  if (!next && !prev) {
    /** clear the current month */
    window.localStorage.removeItem('monthCurrent');
    let currentTime = getCurrentTime();
    /**store in local storage */
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
    } else {
      if (nextMonth > 1) {
        window.localStorage.setItem('monthCurrent', nextMonth - 1);
      } else {
        window.localStorage.setItem('monthCurrent', 12);
      }
    }
    newScheduler.displayChangeCalendar();
  }
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

const setEvent = start => {
  timeCurrent = start;
  let calendarSearch = document.querySelector('.il-calendar--search');
  calendarSearch.classList.add('il-calendar--search__show');
};

const setCliente = (e, key) => {
  //console.log(e,bank[key])
  e.classList.add('checked');
  let resultContainer = document.querySelector('.il-search--result');
  let calendarSearch = document.querySelector('.il-calendar--search');
  setTimeout(() => {
    resultContainer.classList.remove('has-result');
    resultContainer.innerHTML = '';
    calendarSearch.classList.remove('il-calendar--search__show');
  }, 500);
  //let eventstoDo = new eventsToDo(bank);
  let toDo = eventstoDo.generateEvent(timeCurrent);
  let eventContent = document.querySelector('.il-event--content');
  let eventCaption = document.querySelector(
    '.il-event--content .il-event--caption'
  );
  eventCaption.innerHTML = `<span>Início: ${toDo.start}</span><span>Tarefa: ${
    toDo.target
  }</span><span>Transporte: ${toDo.transport}</span>`;
  eventContent.classList.add('il-event--show');
};

/**button for navegate calendar */
btnNext.addEventListener('click', () => {
  next = true;
  prev = false;
  myScheduler(gridDays);
});

btnPrev.addEventListener('click', () => {
  next = false;
  prev = true;
  myScheduler(gridDays);
});

btnFormClose.addEventListener('click', () => {
  let resultContainer = document.querySelector('.il-search--result');
  let calendarSearch = document.querySelector('.il-calendar--search');
  setTimeout(() => {
    resultContainer.classList.remove('has-result');
    resultContainer.innerHTML = '';
    inputSearch.value = '';
    calendarSearch.classList.remove('il-calendar--search__show');
  }, 500);
});

inputSearch.addEventListener('keyup', () => {
  let value = inputSearch.value;
  let resultContainer = document.querySelector('.il-search--result');
  let result = '';
  if (value.length > 3) {
    /**ready for search */
    let searchs = eventstoDo.search(value);
    if (searchs.length > 0) {
      resultContainer.classList.add('has-result');
      searchs.forEach((search) => {
        result += `<div class="il-search--result__row"><span>${search.cod} - ${
          search.cliente
        }</span><i class="mdi mdi-12px mdi-check il-checkbox" onClick="setCliente(this,${
          search.key
        })"></i></div>`;
      });

      resultContainer.innerHTML = result;
    } else {
      result = `<span>Nada encontrado!</span>`;
      resultContainer.innerHTML = result;
      setTimeout(() => {
        resultContainer.classList.remove('has-result');
        inputSearch.value = '';
        resultContainer.innerHTML = '';
      }, 4000);
    }
  }
  if (value == '') {
    setTimeout(() => {
      resultContainer.classList.remove('has-result');
      resultContainer.innerHTML = '';
    }, 500);
  }
});

let btnAddEvent = document.querySelectorAll('.il-add--events .il-add i');

btnAddEvent.forEach((e, index) => {
  let start = e.getAttribute('data-start');
  //console.log(start);
  e.addEventListener('click', () => {
    setEvent(start);
  });
});

/**when DOM is ready start app */
document.addEventListener(
  'DOMContentLoaded',
  () => {
    next = false;
    prev = false;
    dataBankJSON();
    makeTimeline();
    myScheduler(gridDays);
  },
  false
);
