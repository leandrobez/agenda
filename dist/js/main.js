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
  (elTimeCurrent = null),
  (timelineList = document.querySelector('.il-timeline--list')),
  (timeAddEvents = document.querySelector('.il-add--events')),
  (timeLineConfig = {
    start: 7,
    end: 17
  }),
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
  (itemList = null),
  (eventstoDo = null),
  (cronogram = []);

/**Class eventsToDo - make events for app */
class eventsToDo {
  constructor(databank) {
    this.databank = databank;
  }

  setEvents(events) {
    this.events = events;
  }

  setAgenda(agenda) {
    let tempAgenda = [];
    if (agenda) {
      tempAgenda.push(agenda);
    }
    this.agenda = tempAgenda;
    /*if (agenda == '') {
      this.agenda = [
        {
          month: '',
          events: [
            {
              day: '',
              cronogram: [
                {
                  start: '',
                  details: {
                    cod: '',
                    client: '',
                    transport: ''
                  }
                }
              ]
            }
          ]
        }
      ];
    } else {
      this.agenda = agenda;
    }*/
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

  generateEvent(start, client) {
    let target = 'Carga';
    let transport = 'Caminhão';
    let tara = '14ton';
    target = prompt(
      'Que tipo da ação será realizada? Carga ou Descarga',
      target
    );
    transport = prompt('Qual o tipo de transporte?', transport);
    tara = prompt('Qual a tonelagem?', tara);
    let newEvent = {
      start: start,
      target: target,
      transport: transport,
      tara: tara,
      cod: client.cod.replace(/\s/g, ''),
      client: client.cliente.replace(/\s/g, ''),
      status: 'previsto'
    };
    //this.setEvents(newEvent);
    //this.makeAgenda();
    return newEvent;
  }

  makeAgenda() {
    //this.setAgenda('');
    let config = JSON.parse(window.localStorage.getItem('config'));
    let events = this.events;
    let newAgenda = {
      month: config.todayMonth,
      events: [
        {
          day: config.todayDay,
          cronogram: [
            {
              start: events.start,
              details: {
                cod: events.cod.replace(/\s/g, ''),
                client: events.client.replace(/\s/g, ''),
                transport: events.transport,
                target: events.target,
                tara: events.tara
              }
            }
          ]
        }
      ]
    };
    this.setAgenda(newAgenda);
    console.log(this.agenda);
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

/**show o form search */
const eventCreate = index => {
  elTimeCurrent = index;
  timeCurrent = itemList[index].getAttribute('data-start');
  let calendarSearch = document.querySelector('.il-calendar--search');
  calendarSearch.classList.add('il-calendar--search__show');
  //console.log(itemList[index]);
};

/**remove event created */
const removeEvent = index => {
  alert('vou remover');
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

/**make buttons for timelines */
const makeButtonsTimeline = () => {
  let total = timeLineConfig.end - timeLineConfig.start + 1;
  let labelTime = '';
  let hour = timeLineConfig.start;
  let index = 0;
  for (var i = 1; i < total; i++) {
    labelTime += `<li class="il-add" data-start="${hour}">
      <i class="mdi mdi-12px mdi-plus" onClick="eventCreate(${index})"></i>
      <div class="il-event--content">
      <div class="il-event--caption">
      </div>
      </div>
      </li>`;
    hour++;
    index++;
  }
  labelTime += `<li class="il-add" data-start="${hour}">
      <i class="mdi mdi-12px mdi-plus" onClick="eventCreate(${index})"></i>
      <div class="il-event--content">
      <div class="il-event--caption">
      </div>
      </div>
      </li>`;
  if (labelTime) {
    timeAddEvents.innerHTML = labelTime;
    itemList = document.querySelectorAll('.il-add');
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

/**remove the search form */
const removeFormSearch = () => {
  let resultContainer = document.querySelector('.il-search--result');
  let calendarSearch = document.querySelector('.il-calendar--search');
  setTimeout(() => {
    resultContainer.classList.remove('has-result');
    resultContainer.innerHTML = '';
    calendarSearch.classList.remove('il-calendar--search__show');
  }, 500);
};

/**set present client for scheduler */
const setCliente = (el, key) => {
  let client = bank[key];
  el.classList.add('checked');
  removeFormSearch();
  let newEvent = '';
  let toDo = eventstoDo.generateEvent(timeCurrent, client);
  let element = itemList[elTimeCurrent];
  let newCronogram = {
    start: toDo.start,
    event: {
      target: toDo.target,
      transport: toDo.transport,
      tara: toDo.tara,
      cod: toDo.cod,
      client: toDo.client,
      status: toDo.status
    }
  };
  cronogram.push(newCronogram);
  element.classList.add('il-add--expand');
  newEvent += `<i class="mdi mdi-12px mdi-minus" onClick="eventRemove(${elTimeCurrent})"></i>
  <div class="il-event--content il-event--show">
    <table class="il-table">
      <thead>
        <tr>
            <th>Cod</th>
            <th>Nome</th>
            <th>Início</th>
            <th>Tarefa</th>
            <th>Transporte</th>
            <th>Ton</th>
            <th>Status</th>
            <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${toDo.cod}</td>
          <td>${toDo.client}</td>
          <td>${toDo.start}:00 hr</td>
          <td>${toDo.target}</td>
          <td>${toDo.transport}</td>
          <td>${toDo.tara}</td>
          <td>${toDo.status}</td>
          <td><a href="#" class="il-link">editar</a></td>
        </tr>
      </tbody>
    </table>
  </div>`;
  element.innerHTML = newEvent;
  console.log(cronogram);
};

let btnSave = document.getElementById('btn-save');
btnSave.addEventListener('click', () => {
  alert('salvarei a genda no bd ou vou criar um');
});

/**navegate to next month */
btnNext.addEventListener('click', () => {
  next = true;
  prev = false;
  myScheduler(gridDays);
});

/**navegate to prev month */
btnPrev.addEventListener('click', () => {
  next = false;
  prev = true;
  myScheduler(gridDays);
});

/**close form search */
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

/**require result form search */
inputSearch.addEventListener('keyup', () => {
  let value = inputSearch.value;
  let resultContainer = document.querySelector('.il-search--result');
  let result = '';
  if (value.length > 3) {
    /**ready for search */
    let searchs = eventstoDo.search(value);
    if (searchs.length > 0) {
      resultContainer.classList.add('has-result');
      searchs.forEach(search => {
        result += `<div class="il-search--result__row">
          <span>${search.cod} - ${search.cliente}</span>
          <i class="mdi mdi-12px mdi-check il-checkbox" onClick="setCliente(this,${
            search.key
          })"></i>
          </div>`;
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

/**when DOM is ready start app */
document.addEventListener(
  'DOMContentLoaded',
  () => {
    next = false;
    prev = false;
    dataBankJSON();
    makeTimeline();
    makeButtonsTimeline();
    myScheduler(gridDays);
  },
  false
);
