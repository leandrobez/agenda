/**variable for start app */
let next,
  prev = false,
  bank = null;
(settings = {
  container: document.querySelector('.il-calendar--container'),
  calendar: document.querySelector('.il-calendar--front'),
  divWeeks: document.querySelector('.il-weeks'),
  weekDays: document.querySelector('.il-weeks--days'),
  days: document.querySelector('.il-weeks .il-week--item span'),
  choices: false
}),
  (gridDays = null),
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
  (btnNext = document.getElementById('next-month')),
  (btnPrev = document.getElementById('prev-month')),
  (btnSave = document.getElementById('btn-save')),
  (btnEdit = document.getElementById('btn-edit')),
  (itemList = null),
  (eventstoDo = null),
  (cronogram = null),
  (agenda = []);

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

/**save events collection */
const saveAgenda = () => {
  let containerAlert = document.querySelector('.il-alert');
  let alertInfo = document.querySelector('.il-alert p');
  let currentCronogram = cronogram;
  let newAgendaMonth = {
    month: window.localStorage.getItem('monthCurrent'),
    cronogram: null
  };
  newAgendaMonth.cronogram = new Array();
  newAgendaMonth.cronogram.push(currentCronogram);
  agenda.push(newAgendaMonth);
  let data = JSON.stringify(agenda);
  if (!window.localStorage.getItem('agenda')) {
    window.localStorage.setItem('agenda', data);
  } else {
    alert('jácriada a agenda');
  }
  alertInfo.innerHTML =
    'Os eventos do dia ' +
    window.localStorage.getItem('dayCurrent') +
    ' foram salvos na sua agenda.';
  containerAlert.classList.add('il-alert--show');
  containerAlert.classList.add('il-alert--posisione');
  setTimeout(() => {
    alertInfo.innerHTML = 'O arquivo foi salvo com sucesso.';
    containerAlert.classList.remove('il-alert--show');
    containerAlert.classList.remove('il-alert--posisione');
  }, 4000);
};

/**store data to localStorage */
const saveConfig = (config, force) => {
  let data = JSON.stringify(config);
  if (!window.localStorage.getItem('config')) {
    window.localStorage.setItem('config', data);
  } else if (force) {
    window.localStorage.setItem('config', data);
  }
  return;
};

/**download agenda  *
const saveJSON = () => {
  let data = [
    {
      month: '10',
      events: [{ day: '25', cronogram: cronogram }]
    }
  ];
  let html5il = {};
  html5il.webdb.db = null;

  html5il.webdb.open = () => {
    var dbSize = 5 * 1024 * 1024; // 5MB
    html5il.webdb.db = openDatabase(
      'Agenda',
      '1',
      'Agenda de Carga e Descarga',
      dbSize
    );
  };

  html5il.webdb.onError = (tx, e) => {
    alert('There has been an error: ' + e.message);
  };

  html5il.webdb.onSuccess = (tx, r) => {
    // re-render the data.
    // loadTodoItems is defined in Step 4a
    html5il.webdb.getAllTodoItems(loadTodoItems);
  };
  /*let dataJSON = JSON.stringify(data);
  let a = document.createElement('a');
  let newFile = new Blob([dataJSON], { type: 'JSON' });
  a.href = URL.createObjectURL(newFile);
  a.download = 'agenda.json';
  if (a.click()) {
    return true;
  }
  return false;*
};*/

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
      <i class="mdi mdi-12px mdi-plus" onClick="eventCreate(${index})" title="Clique para criar um evento as ${hour}:00"></i>
      <div class="il-event--content">
      <div class="il-event--caption">
      </div>
      </div>
      </li>`;
    hour++;
    index++;
  }
  labelTime += `<li class="il-add" data-start="${hour}">
      <i class="mdi mdi-12px mdi-plus" onClick="eventCreate(${index})" title="Clique para criar um evento as ${hour}:00"></i>
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

const setTagEvent = (newCronogram, key) => {
  let element = itemList[elTimeCurrent];
  let timeCurrent = element.getAttribute('data-start');

  let newEvent = `<i class="mdi mdi-12px mdi-minus" onClick="eventRemove(${elTimeCurrent},this,false)" title="Clique para remover o evento das ${timeCurrent}:00"></i>
  <div class="il-event--content il-event--show">
    <table class="il-table il-event--head">
      <thead>
          <tr>
              <th class="il-td--med">Cod</th>
              <th class="il-td--big">Nome</th>
              <th class="il-td--small">Início</th>
              <th class="il-td--small">Tarefa</th>
              <th class="il-td--small">Transporte</th>
              <th class="il-td--small">Ton</th>
              <th class="il-td--small">Status</th>
              <th class="il-td--small">Ação</th>
          </tr>
      </thead>
      <tbody>
        <tr>
          <td>${newCronogram.details.cod}</td>
          <td>${newCronogram.details.client}</td>
          <td>${newCronogram.start}:00 hr</td>
          <td>${newCronogram.details.target}</td>
          <td>${newCronogram.details.transport}</td>
          <td>${newCronogram.details.tara}</td>
          <td>${newCronogram.details.status}</td>
          <td><a href="#" onClick="eventEdit(${key})" class="il-link">editar</a></td>
        </tr>
      </tbody>
    </table>
  </div>`;
  element.classList.add('il-add--expand');
  element.innerHTML = newEvent;
};

/**set present client for scheduler */
const setCronogram = key => {
  let dayCurrent = window.localStorage.getItem('dayCurrent');
  let newCronogram = eventstoDo.generateEvent(timeCurrent, key);
  eventstoDo.removeFormSearch();
  if (!cronogram) {
    cronogram = { day: dayCurrent, events: [newCronogram] };
  } else {
    let events = cronogram.events;
    if (cronogram.day === dayCurrent) {
      events.push(newCronogram);
    } else {
      alert('novo dia escolhido na agenda');
    }
  }
  setTagEvent(newCronogram, key);
};

/**show o form search */
const eventCreate = index => {
  elTimeCurrent = index;
  timeCurrent = itemList[index].getAttribute('data-start');
  let calendarSearch = document.querySelector('.il-calendar--search');
  calendarSearch.classList.add('il-calendar--search__show');
};

/**Crud dos eventos */
/**event edit -- talvez seja melhor colocar na classe event */
const eventEdit = key => {
  let formEdit = document.querySelector('.il-calendar--edit');
  let form = document.getElementById('il-event');
  let eventField = cronogram.events[key];
  let fields = form.children[0];
  formEdit.classList.add('il-calendar--edit__show');
  let eventKey = document.getElementById('event-key');
  eventKey.value = key;
  fields.children[0].value = eventField.start;
  fields.children[1].value = eventField.details.target;
  fields.children[2].value = eventField.details.status;
  fields.children[3].value = eventField.details.transport;
  fields.children[4].value = eventField.details.tara;
  fields.children[5].value = eventField.details.client;
  /*
  eventstoDo.editEvent(key, event);
  eventstoDo.setNew()
  */
};

/**remove event created */
const eventRemove = (index, el, force) => {
  let whooErase = el.parentElement;
  let containerAlert = document.querySelector('.il-alert');
  let alertInfo = document.querySelector('.il-alert p');
  let decision = null;
  timeCurrent = itemList[index].getAttribute('data-start');
  if (force) {
    decision = true;
  } else {
    decision = confirm('Realmente deseja remover esse evento?');
  }
  if (decision && cronogram) {
    let newEvents = [];
    let events = cronogram.events;
    events.forEach((event, key) => {
      if (key !== index) {
        newEvents.push(events[key]);
      }
    });
    cronogram.events = newEvents;
    whooErase.classList.remove('il-add--expand');
    whooErase.innerHTML = `<i class="mdi mdi-12px mdi-plus" onClick="eventCreate(${index})" title="Clique para criar um evento as ${timeCurrent}:00"></i>
    <div class="il-event--content">
    <div class="il-event--caption">
    </div>
    </div>`;
    alertInfo.innerHTML = 'O evento solicitado foi removido da agenda.';
    containerAlert.classList.add('il-alert--show');
    containerAlert.classList.add('il-alert--posisione');
    setTimeout(() => {
      alertInfo.innerHTML = 'O arquivo foi salvo com sucesso.';
      containerAlert.classList.remove('il-alert--show');
      containerAlert.classList.remove('il-alert--posisione');
    }, 4000);
  }
};

/**chech confi situation */
const checkConfig = () => {
  let currentTime = getCurrentTime();
  if (window.localStorage.getItem('config')) {
    let config = JSON.parse(window.localStorage.getItem('config'));
    /**check if store today is not igual present day  */
    if (currentTime.todayDay !== config.todayDay) {
      saveConfig(currentTime, true);
    }
  } else {
    /**store in local storage */
    saveConfig(currentTime, false);
  }
  /** clear the current month when app start*/
  window.localStorage.removeItem('monthCurrent');
  /**set the present month */
  window.localStorage.setItem('monthCurrent', currentTime.todayMonth);
  /**set the current day */
  window.localStorage.setItem('dayCurrent', currentTime.todayDay);
};

/**check month current situation */
const checkMonthCurrent = () => {
  /**button clicked */
  let monthCurrent = window.localStorage.getItem('monthCurrent')
    ? JSON.parse(window.localStorage.getItem('monthCurrent'))
    : JSON.parse(window.localStorage.getItem('config'));
  return monthCurrent;
};

/**check current agenda */
const setCurrentAgenda = () => {
  let currentAgenda = window.localStorage.getItem('agenda');
  if (currentAgenda) {
    agenda = JSON.parse(currentAgenda);
  }
};

/**sincronize agenda to current day */
const sincronizeEvents = () => {
  let eventsShow = document.querySelectorAll(
    '.il-event--content.il-event--show'
  );
  let addEvents = document.querySelectorAll('.il-add--events .il-add');
  let tableShow = document.querySelectorAll(
    '.il-add--events .il-add.il-add--expand .il-table.il-event--head'
  );
  let currentDay = window.localStorage.getItem('dayCurrent');
  agenda.forEach((program, index) => {
    if (program.month == window.localStorage.getItem('monthCurrent')) {
      program.cronogram.forEach((event, key) => {
        if (event.day == currentDay) {
          let nrEvents = event.events.length;
          for (let i = 0; i < nrEvents; i++) {
            elTimeCurrent = i;
            itemList[i] = event.events[i].start;
            cronogram = program.cronogram[key];
            setTagEvent(event.events[i], i);
          }
        } else {
          cronogram = null;
          let allEvents = document.querySelectorAll('li.il-add--expand');
          allEvents.forEach((e, i) => {
            e.classList.remove('il-add--expand');
            e.innerHTML = `<i class="mdi mdi-12px mdi-plus" onClick="eventCreate(${index})" title="Clique para criar um evento nesse horário"></i>
            <div class="il-event--content">
            <div class="il-event--caption">
            </div>
            </div>`;
          });
        }
      });
    } else {
      eventsShow.forEach((events, key) => {
        if (addEvents[key].classList.contains('il-add--expand')) {
          addEvents[key].classList.remove('il-add--expand');
        }
        //console.log(tableShow[key])
        tableShow[key].classList.add('hidden-table');
        events.classList.remove('il-event--show');
      });
    }
  });
};

/**altera o dia corrente */
const changeDay = (day, el) => {
  //console.log(el
  let ilToday = document.querySelectorAll('.il-week--item span');
  //console.log(ilToday)
  ilToday.forEach(item => {
    if (item.classList.contains('il-today')) {
      //console.log(item)
      item.classList.remove('il-today');
    }
    //console.log(item)
  });
  el.classList.add('il-today');
  let dayCurrent = window.localStorage.getItem('dayCurrent');
  let monthCurrent = window.localStorage.getItem('monthCurrent');
  if (day != dayCurrent) {
    let newScheduler = new scheduler(gridDays, calendarStructure);
    let currentConfig = JSON.parse(window.localStorage.getItem('config'));
    currentConfig.todayDay = day;
    /**store in local storage */
    saveConfig(currentConfig, true);
    window.localStorage.setItem('dayCurrent', day);
    newScheduler.setCurrentConfig(currentConfig);
    newScheduler.setTodayCurrent(day);
    newScheduler.setMonthCurrent(monthCurrent);
    newScheduler.setLabels();
    setCurrentAgenda();
    if (agenda.length > 0) {
      sincronizeEvents();
    }
  }
};

/**inicialize scheduler */
const myScheduler = () => {
  dataBankJSON();
  makeTimeline();
  makeButtonsTimeline();
  setCurrentAgenda();
  let newGrid = new Array();
  newGrid = createListDate();
  if (agenda.length > 0) {
    sincronizeEvents();
  }
  if (!setWeekDays(calendarStructure.weekLabels)) {
    checkConfig();
  }
  let newScheduler = new scheduler(newGrid, calendarStructure);
  newScheduler.displayCalendar();
};

const changeScheduler = (n, p) => {
  let today = new Date();
  let month = today.getMonth() + 1;
  let monthCurrent = checkMonthCurrent();
  if (n && !p) {
    /**to front the calendar */
    if (monthCurrent < 12) {
      window.localStorage.setItem('monthCurrent', monthCurrent + 1);
      monthCurrent++;
    } else {
      window.localStorage.setItem('monthCurrent', 1);
      monthCurrent = 1;
    }
  } else {
    /**to back the calendar */
    if (monthCurrent == 1) {
      window.localStorage.setItem('monthCurrent', 12);
      monthCurrent = 12;
    } else {
      window.localStorage.setItem('monthCurrent', monthCurrent - 1);
      monthCurrent--;
    }
  }
  dataBankJSON();
  setCurrentAgenda();
  if (agenda.length > 0) {
    sincronizeEvents();
  }
  let data = {};
  if (month == monthCurrent) {
    data.todayDay = today.getDate();
    data.todayMonth = month;
  } else {
    data.todayDay = 1;
    data.todayMonth = monthCurrent;
  }
  data.todayYear = today.getFullYear();
  data.todayNow = today.getHours();
  data.todayMin = today.getMinutes();
  //**set the current day */
  window.localStorage.removeItem('dayCurrent');
  window.localStorage.setItem('dayCurrent', data.todayDay);
  window.localStorage.removeItem('config');
  window.localStorage.setItem('config', JSON.stringify(data));
  let newGrid = new Array();
  newGrid = createListDate();
  if (agenda.length > 0) {
    sincronizeEvents();
  }
  let newScheduler = new scheduler(newGrid, calendarStructure);
  newScheduler.displayCalendar();
};

/**EventListening */
btnEdit.addEventListener('click', e => {
  e.preventDefault();
  //
  //let elemEdit = timeAddEvents.children[key].children[1];
  let form = document.getElementById('il-event');
  let fields = form.children[0];
  let cronogramKey = document.getElementById('event-key').value;
  let eventField = cronogram.events[cronogramKey];

  eventField.start = fields.children[0].value;
  eventField.details.target = fields.children[1].value;
  eventField.details.status = fields.children[2].value;
  eventField.details.transport = fields.children[3].value;
  eventField.details.tara = fields.children[4].value;
  console.log(eventField)
});
/**btn for save agenda */
btnSave.addEventListener('click', () => {
  confirm('Realmente deseja fechar os eventos desse dia e salvar na agenda?')
    ? saveAgenda()
    : '';
});

/**navegate to next month */
btnNext.addEventListener('click', () => {
  changeScheduler(true, false);
});

/**navegate to prev month */
btnPrev.addEventListener('click', () => {
  changeScheduler(false, true);
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
  let btnSave = document.getElementById('btn-save');
  let btnEndDay = document.querySelector('.il-calendar--btn');
  let result = '';
  if (value.length > 3) {
    /**ready for search */
    let searchs = eventstoDo.search(value);
    if (searchs.length > 0) {
      resultContainer.classList.add('has-result');
      searchs.forEach(search => {
        result += `<div class="il-search--result__row" onClick="setCronogram(${
          search.key
        })">
          <span>[${search.cod}] - ${search.cliente}</span>
          </div>`;
      });
      inputSearch.value = '';
      resultContainer.innerHTML = result;
      setTimeout(() => {
        btnSave.innerHTML =
          'Fechar o dia ' +
          window.localStorage.getItem('dayCurrent') +
          '/' +
          window.localStorage.getItem('monthCurrent');
        btnEndDay.classList.add('il-btn--show');
      }, 2000);
    } else {
      result = `<div class="il-search--result__row"><span class="il-no-result">Nada encontrado!</span></div>`;
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
    //eventListener();
    if (!next && !prev) {
      myScheduler();
    }
  },
  false
);
