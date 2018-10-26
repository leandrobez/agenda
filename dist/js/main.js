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
(gridDays = null),
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
  (cronogram = null),
  (contentCronogram = []);

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

/**download agenda  */
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
  return false;*/
};

/**show o form search */
const eventCreate = index => {
  elTimeCurrent = index;
  timeCurrent = itemList[index].getAttribute('data-start');
  let calendarSearch = document.querySelector('.il-calendar--search');
  calendarSearch.classList.add('il-calendar--search__show');
};

/**remove event created */
const eventEdit = index => {
  alert('vou editar esse evento');
  //let decision = confirm('Realmente deseja fechar os eventos desse dia e salvar na agenda?');
};

/**remove event created */
const eventRemove = (index, el) => {
  let whooErase = el.parentElement;
  let containerAlert = document.querySelector('.il-alert');
  let alertInfo = document.querySelector('.il-alert p');
  let decision = confirm('Realmente deseja remover esse evento?');
  if (decision) {
    let newEvents = [];
    let events = cronogram.events;
    events.forEach((event, key) => {
      if (key !== index) {
        newEvents.push(events[key]);
      }
    });
    cronogram.events = newEvents;
    whooErase.classList.remove('il-add--expand');
    whooErase.innerHTML = `<i class="mdi mdi-12px mdi-plus" onClick="eventCreate(${index})" title="Clique para criar um evento nesse horário"></i>
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
      <i class="mdi mdi-12px mdi-plus" onClick="eventCreate(${index})" title="Clique para criar um evento nesse horário"></i>
      <div class="il-event--content">
      <div class="il-event--caption">
      </div>
      </div>
      </li>`;
    hour++;
    index++;
  }
  labelTime += `<li class="il-add" data-start="${hour}">
      <i class="mdi mdi-12px mdi-plus" onClick="eventCreate(${index})" title="Clique para criar um evento nesse horário"></i>
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
  let newEvent = `<i class="mdi mdi-12px mdi-minus" onClick="eventRemove(${elTimeCurrent},this)" title="Clique para remover esse evento"></i>
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
  //el.classList.add('checked');
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
    console.log(cronogram);
  }
  setTagEvent(newCronogram, key);
  /*let tempContent = [
    //month: window.localStorage.getItem('monthCurrent'),
    cronogram.cronogram
  ]*/

  //contentCronogram.push(tempContent)
  //contentCronogram = cronogram
  //console.log(cronogram);
};

let btnSave = document.getElementById('btn-save');
btnSave.addEventListener('click', () => {
  let containerAlert = document.querySelector('.il-alert');
  let alertInfo = document.querySelector('.il-alert p');
  let decision = confirm(
    'Realmente deseja fechar os eventos desse dia e salvar na agenda?'
  );
  if (decision) {
    alertInfo.innerHTML =
      'Os eventos do dia 26 de Outubro forma salvos na sua agenda.';
    containerAlert.classList.add('il-alert--show');
    containerAlert.classList.add('il-alert--posisione');
    setTimeout(() => {
      alertInfo.innerHTML = 'O arquivo foi salvo com sucesso.';
      containerAlert.classList.remove('il-alert--show');
      containerAlert.classList.remove('il-alert--posisione');
    }, 4000);
  }
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

/**chech confi situation */
const checkConfig = () => {
  let currentTime = getCurrentTime();
  if (window.localStorage.getItem('config')) {
    let config = JSON.parse(window.localStorage.getItem('config'));
    /**check if store today is not igual present day  */
    if (currentTime.todayDay !== config.todayDay) {
      saveLocal(currentTime, true);
    }
  } else {
    /**store in local storage */
    saveLocal(currentTime, false);
  }
  /** clear the current month when app start*/
  window.localStorage.removeItem('monthCurrent');
  /**set the present month */
  window.localStorage.setItem('monthCurrent', currentTime.todayMonth);
  /**set the current day */
  window.localStorage.setItem('dayCurrent', currentTime.todayDay);
};

/**check month current situation */
const checkMonthCurrent = next => {
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
};

/**inicialize scheduler */
const myScheduler = gridDays => {
  setWeekDays(calendarStructure.weekLabels);
  let newScheduler = new scheduler(gridDays, calendarStructure);
  if (!next && !prev) {
    checkConfig();
    newScheduler.displayCalendar();
  } else {
    checkMonthCurrent(next);
    newScheduler.displayChangeCalendar();
  }
};

/**when DOM is ready start app */
document.addEventListener(
  'DOMContentLoaded',
  () => {
    gridDays = getGridDays();
    next = false;
    prev = false;
    dataBankJSON();
    makeTimeline();
    makeButtonsTimeline();
    myScheduler(gridDays);
  },
  false
);
