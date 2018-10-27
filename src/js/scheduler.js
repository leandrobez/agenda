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

  /**crete multiples strinf for html element use */
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

  /**create a string fotm use in front end */
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

  /**display month' days */
  makeWeeks(month) {
    let weeks = this.calendar[month].weekDays;
    let totalWeeks = weeks.length;
    let today = this.currentConfig.todayDay;
    let items = '';
    let html = '';

    weeks.forEach((week, index) => {
      if (totalWeeks != 4) {
        let limit = this.calendarStructure.totalDays[
          window.localStorage.getItem('monthCurrent')
        ];
      }
      html = '<div class="il-week--item">';
      week.forEach(day => {
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
            html += `<span onclick="changeDay(${day},this)" >${day}</span>`;
          }
        }
      });
      html += '</div>';
      items += html;
    });
    settings.divWeeks.innerHTML = items;
  }

  /**check if the current month is igual to calendar */
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
