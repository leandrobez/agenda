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

  getCurrentEventDay() {
    let label = this.todayCurrent + '/' + this.monthCurrent;
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
