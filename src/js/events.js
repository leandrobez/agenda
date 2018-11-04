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

  editEvent(indice, event) {
    //let events = this.events;
    //let indice = events.length - 1;
    //console.log(indice,event)
   // let agenda = window.localStorage.getItem('agenda');
   // console.log(agenda[0].cronogram[0].events[indice]);
  }

  editRemove(index, el) {
    alert('Eu vou remover o evento ' + index);
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

  /*editEvent(event) {
    client = prompt('Para que é esse evento',event.client);
    target = prompt('Que tipo da ação será realizada? Carga ou Descarga?',event.target);
    transport = prompt('Qual o tipo de transporte?', event.transport);
    tara =  prompt('',event.tara);
    target = prompt(
      'Que tipo da ação será realizada? Carga ou Descarga?',
      event.target
    );
    status = prompt(
      'Que status deseja utilizar?',
      event.status
    );
   
    let newEvent = {
      start: event.start,
      details: {
        target: target,
        transport: transport,
        tara: tara,
        cod: event.cod,
        client: client,
        status: 'previsto'
      }
    };
    return newEvent;
  }*/

  generateEvent(start, key) {
    let client = this.databank[key];
    let target = 'Carga';
    let transport = 'Caminhão';
    let tara = '14ton';
    target = prompt(
      'Que tipo da ação será realizada? Carga ou Descarga?',
      target
    );
    transport = prompt('Qual o tipo de transporte?', transport);
    tara = prompt('Qual a tonelagem?', tara);
    let newEvent = {
      start: start,
      details: {
        target: target,
        transport: transport,
        tara: tara,
        cod: client.cod.replace(/\s/g, ''),
        client: client.cliente.replace(/\s/g, ''),
        status: 'previsto'
      }
    };
    return newEvent;
  }

  /**remove the search form */
  removeFormSearch() {
    let resultContainer = document.querySelector('.il-search--result');
    let calendarSearch = document.querySelector('.il-calendar--search');
    setTimeout(() => {
      resultContainer.classList.remove('has-result');
      resultContainer.innerHTML = '';
      calendarSearch.classList.remove('il-calendar--search__show');
    }, 500);
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
