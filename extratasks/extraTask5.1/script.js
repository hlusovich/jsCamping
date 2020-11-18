function createCalendar(elem, year, month) {
    let fragment = `<table><caption>Календарь</caption><tr>`;
    const daysArray = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
    daysArray.map(item => {
        fragment += `<th>${item}</th>`;
    });
    fragment += `</tr>`;
    const day = new Date(year, month - 1).getDay() || 7;
    const monthDaysCount = 32 - new Date(year, month - 1, 32).getDate();
    let tableInner = `<tr>`;
    tableInner += `<td></td>`.repeat(day - 1);

    let count = day - 1;
    const customMnemonic = `</tr><tr>`;
    for (let i = 1; i <= monthDaysCount; i++) {
        count++;
        if (count === 29) {
            tableInner += `<tr>`;
        }
        tableInner += `<td>${i}</td>`;
        if (count % 7 === 0 && count !== 28) {
            tableInner += customMnemonic;
        }

    }
    const tableInnerArray = tableInner.split("<tr>");
    let  countOfEmptyCell = 8 - tableInnerArray[tableInnerArray.length - 1].split("</td>").length;
    if (countOfEmptyCell === 7) {
        countOfEmptyCell = 0;
    }
    tableInner += `${`<td></td>`.repeat(countOfEmptyCell)}</tr></table>`;
    elem.innerHTML += fragment + tableInner;
    const table = document.querySelector("table");
    table.setAttribute("border", "1");
    table.style.width = "100%";
    table.cellpadding = "5";

}

const calendar = document.getElementById("calendar");
