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
  const div = document.getElementById("renderTable");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    checkData(Object.fromEntries(formData));

    // if(!year && year < 1970){

    // }

    //Month && Year
    //  const { isExists, month: monthName } = monthExists(month);
    // if (isExists && isExistsYear) {
    //   createTable(monthName, yearName);
    // } else if (!isExists && isExistsYear) {
    //   getAllMonths(year);
    // }
    //div.innerText = " El dato introducido no es un mes ni un año";
  });
  const checkData = ({ month, year }) => {
    div.innerText = "";
    const isExistsYear = yearExists(year);
    if (!isExistsYear) {
      div.innerText = `El dato (${
        year ? year : "---"
      }) introducido no es un año valido.`;
      return;
    }

    const { isExistsMonth } = monthExists(month);
    if (month !== "" && !isExistsMonth) {
      div.innerText = `El dato (${
        month ? month : "---"
      }) introducido no es un mes valido.`;
      return;
    }
    createCalendar(year, month);
  };

  // Check Year
  const yearExists = (year) => {
    const n = Number(year);
    return year !== "" && !isNaN(n) && n >= 1970;
  };

  //Check Month
  const monthExists = (month) => {
    month = MONTHS[month.toLowerCase()];
    return {
      isExistsMonth: month !== undefined && month >= 0 && month <= 11,
      monthName: month,
    };
  };

  //Print All Months
  const getAllMonths = (year) => {
    const divAllMonths = document.createElement("div");
    for (let keys of Object.keys(MONTHS)) {
      divAllMonths.classList.add("divAllMonths");
      const p = document.createElement("p");
      p.innerText = " " + `${keys}`;
      divAllMonths.append(p);
      div.append(divAllMonths);

      printAllDaysMonths(year);
    }
  };

  //Imprimos los dias del mes
  //  const printDaysMonth = (dayMonth, container, startOn) => {
  //   for (let i = 0; i < dayMonth; i++) {
  //     const divDays = document.createElement("div");
  //     divDays.classList.add("divDays");
  //     if (i === 0) {
  //       divDays.style.gridColumnStart = startOn;
  //     }
  //     divDays.innerText = i + 1;
  //     container.append(divDays);
  //   }
  // };

  //Get All Days Months
  const printAllDaysMonths = (year) => {
    Object.values(MONTHS).forEach((val) => {
      const dayMonth = new Date(year, val + 1, 0).getDate();
      // const startOn = new Date(year, val, 1).getDay();
      for (let i = 0; i < dayMonth; i++) {
        const divAllDaysMonths = document.createElement("div");
        divAllDaysMonths.classList.add("DaysCss");
      }
    });
  };

  const createCalendar = (year, month) => {
    const div = document.getElementById("renderTable");
    div.innerText = "";
    const { isExistsMonth, monthName } = monthExists(month);
    if (isExistsMonth) {
      createTable(monthName, year);
    } else {
      for (let i = 0; i < 12; i++) {
        createTable(i, year);
      }
    }
  };

  //Pint Table Month
  const createTable = (month, year) => {
    console.log("Mes: " + month);
    console.log(year);
    const div = document.getElementById("renderTable");

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
      if (i === 0) {
        divDays.style.gridColumnStart = startOn;
      }
      divDays.innerText = i + 1;
      container.append(divDays);
    }
  };
})();
