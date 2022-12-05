const MONTHS = {
  enero: 0,
  febrero: 1,
  marzo: 2,
  abril: 3,
  mayo: 4,
  junio: 5,
  julio: 6,
  agosto: 7,
  septiembre: 8,
  octubre: 9,
  noviembre: 10,
  diciembre: 11,
};

const locale = "es";
const yearDate = 2022;

(() => {
  const form = document.getElementById("myForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    // console.log(formData);
    const { month } = Object.fromEntries(formData);
    const { isExists, month: monthName } = monthExists(month);
    if (isExists) {
      createTable(monthName, yearDate);
    } else {
      const div = document.getElementById("renderTable");
      div.innerText = "El dato introducido no es un mes";
    }
  });

  const monthExists = (month) => {
    month = MONTHS[month.toLowerCase()];
    return {
      isExists: month !== undefined && month >= 0 && month <= 11,
      month,
    };
  };

  const createTable = (month, year) => {
    console.log(month);
    console.log(year);
    const div = document.getElementById("renderTable");
    div.innerText = "";

    const container = document.createElement("div");
    container.classList.add("boxCalendar");
    const intl = new Intl.DateTimeFormat(locale, { month: "long" });
    const monthName = intl.format(new Date(year, month));
    const title = document.createElement("h1");
    title.innerText = `${monthName} ${year}`;

    div.append(title);
    getDaysWeek(locale, container);

    //Month Year Number
    const monthNumber = month;
    const yearNumber = year;
    getDaysMonth(monthNumber, yearNumber, container);
    div.append(container);
  };

  const getDaysWeek = (locale, container) => {
    const intl = new Intl.DateTimeFormat(locale, { weekday: "long" });
    [...Array(7).keys()].map((day) => {
      const dayBox = document.createElement("div");
      dayBox.classList.add("day-name");
      dayBox.innerText = intl.format(new Date(1973, 0, day + 1));
      container.append(dayBox);
    });
  };

  const getDaysMonth = (month, year, container) => {
    console.log("getDaysMonth: " + month, year);
    const dayMonth = new Date(year, month + 1, 0).getDate();
    console.log("Dias del mes: " + dayMonth);
    const startOn = new Date(year, month, 1).getDay();

    printDaysMonth(dayMonth, container, startOn);
  };
  //Imprimos los dias del mes
  const printDaysMonth = (dayMonth, container, startOn) => {
    for (let i = 0; i < dayMonth; i++) {
      const divDays = document.createElement("div");
      divDays.classList.add("divDays");
      if(i === 0){
        divDays.style.gridColumnStart = startOn;
      }
      divDays.innerText = i + 1;
      container.append(divDays);
    }
  };
})();
