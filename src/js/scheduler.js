/**Class scheduler */
class scheduler {
  /**todo do
   * 1 construtor precisa da esturuta de deias
   */
  constructor(calendar, calendarStructure) {
    this.calendar = calendar;
    this.calendarStructure = calendarStructure;
  }

  /**set the currentConfig */
  setCurrentConfig(currentConfig) {
    this.currentConfig = currentConfig;
  }

  /**set the current day */
  setTodayCurrent(d) {
    this.todayCurrent = d;
  }

  /**set the current month */
  setMonthCurrent(m) {
    this.monthCurrent = m;
  }

  /**crete multiples string for html element use */
  setLabels() {
    let year = document.querySelector('.il-current--date h1.il-year'),
      today = document.querySelector('.il-current--date h1.il-today'),
      labelData = document.getElementById('il-data'),
      labelEventDay = document.getElementById('event-day');
    labelData.innerText = this.getLabelData();
    labelEventDay.innerText = this.getCurrentEventDay();
    year.innerText = this.currentConfig.todayYear;
    today.innerText =
      this.currentConfig.todayDay +
      ' de ' +
      this.getMonthLabel(false, this.currentConfig.todayMonth);
    return;
  }

  /**get month label - short or long */
  getMonthLabel(short, m) {
    if (short) {
      return this.calendarStructure.monthLabels.short[m - 1];
    }
    return this.calendarStructure.monthLabels.long[m - 1];
  }

  /**create a string for use in front end */
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

  /**get a string for use in html element */
  getCurrentEventDay() {
    let label = this.todayCurrent + '/' + this.monthCurrent;
    return label;
  }

  /**return string month */
  getMonthKey(m) {
    return this.calendarStructure.monthLabels.short[m - 1];
  }

  /**get the current time from localStorage */
  getCurrentConfig() {
    let data = window.localStorage.getItem('config');
    let config = JSON.parse(data);
    return config;
  }

  /***Create scheduler for o day */
  saveScheduler(newCronogram, key) {
    //
  }

  /**display month's days */
  makeWeeks(month) {
    let weeks = this.calendar[month].weekday;
    //console.log(this.calendar[month])
    //let totalWeeks = weeks.length;
    let today = this.currentConfig.todayDay;
    let items = '';
    let html = '';
    let classToday = '';
    //let y = check.getFullYear();
    let lastDayOfM = this.calendar[month].lastDayOfM;
    weeks.forEach((week, index) => {
      html = '<div class="il-week--item">';
      week.forEach((day, key) => {
        if (today == day) {
          classToday = 'class="il-today"';
        } else {
          classToday = '';
        }
        switch (index) {
          case 0:
            let checkPrev = week[6];
            if (day > checkPrev) {
              html += `<span class="il-next--month" onclick="changeDay(${day},this)" >${day}</span>`;
            } else {
              html += `<span ${classToday} onclick="changeDay(${day},this)" >${day}</span>`;
            }
            break;
          case 1:
            html += `<span ${classToday} onclick="changeDay(${day},this)" >${day}</span>`;
            break;
          case 2:
            html += `<span ${classToday} onclick="changeDay(${day},this)" >${day}</span>`;
            break;
          case 3:
            html += `<span ${classToday} onclick="changeDay(${day},this)" >${day}</span>`;
            break;
          case 4:
            let checkNext = week[0];
            if (day < checkNext) {
              html += `<span class="il-next--month" onclick="changeDay(${day},this)">${day}</span>`;
            } else {
              html += `<span ${classToday} onclick="changeDay(${day},this)" >${day}</span>`;
            }
            break;
        }
      });
      html += '</div>';
      items += html;
    });
    settings.divWeeks.innerHTML = items;
    /*
    weeks.forEach((week, index) => {
      html = '<div class="il-week--item">';
      //if(week.length<7){
        //console.log(week)
      //}
      week.forEach((day, key) => {
        if (day == today && index == 0) {
          html += `<span class="il-today" onclick="changeDay(${day},this)" >${day}</span>`;
        } else {
          if (index == totalWeeks - 1) {
            if (day == 1 || day == 2 || day == 3 || day == 4 || day == 5) {
              html += `<span class="il-next--month" onclick="changeDay(${day},this)">${day}</span>`;
            } else {
              html += `<span onclick="changeDay(${day},this)" >${day}</span>`;
            }
          } else {
            //alert('oi')
            html += `<span onclick="changeDay(${day},this)" >${day}</span>`;
          }
        }
      });
      html += '</div>';
      items += html;
    });
    settings.divWeeks.innerHTML = items;*/
  }

  /**check if the current month is igual to calendar */
  checkCurrentMont(m) {
    let storageConfig = JSON.parse(window.localStorage.getItem('config'));
    if (storageConfig.todayMonth == m) {
      return storageConfig.todayDay;
    }
    return false;
  }

  /**display the Calendar */
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

  /**display next month to the Calendar **
  displayChangeCalendar() {

  }*/
}
