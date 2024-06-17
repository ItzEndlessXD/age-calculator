window.onload = () => {

inputDay = document.getElementById("dayInput")

inputMonth = document.getElementById("monthInput")

inputYear = document.getElementById("yearInput")

const outputYear = document.getElementById("outputYear")

const outputMonth = document.getElementById("outputMonth")

const outputDay = document.getElementById("outputDay")

errorLabelDisplays = [
    document.getElementById("labelDay"),
    document.getElementById("labelMonth"),
    document.getElementById("labelYear")
]

errorInputDisplays = [
    inputDay,
    inputMonth,
    inputYear
]

errorDisplays = [
    document.getElementById("errorDay"),
    document.getElementById("errorMonth"),
    document.getElementById("errorYear")
]
    
    inputYear.oninput = function() {
        if (inputYear.value > 0 && inputYear.value <= currentDate.getFullYear()) {
            yearValue = Number(inputYear.value)
            errorFixed(2)
        }else if(inputYear.value > currentDate.getFullYear() || inputYear.value < 1) {
            errorMsg = "Must be a valid year"
            errorPopup(2, errorMsg)
        }
    }
    inputMonth.oninput = function() {
        if (inputMonth.value > 0 && inputMonth.value <= 12) {
            monthValue = Number(inputMonth.value)
            errorFixed(1)
        }else if(inputMonth.value < 1 || inputMonth.value > 12) {
            errorMsg = "Must be a valid month"
            errorPopup(1, errorMsg)
        }
    }
    inputDay.oninput = function() {
        if (inputDay.value > 0 && inputDay.value <= months[inputMonth.value - 1]) {
            dayValue = Number(inputDay.value)
            errorFixed(0)
        }else if(inputDay.value < 1 || inputDay.value > months[inputMonth.value - 1]) {
            errorMsg = "Must be a valid date"
            errorPopup(0, errorMsg)
        }
    }

}
let inputDay;

let inputMonth;

let inputYear;

//delcare empty array
let errorLabelDisplays = [];
let errorInputDisplays = [];
let errorDisplays = [];
//java script methods
const currentDate = new Date();
let current = {
    year: currentDate.getFullYear(),
    month: 1 + currentDate.getMonth(),
    day: currentDate.getDate()
}
let dayValue = 0;
let monthValue = 0;
let yearValue = 0;
let ageYear;
let ageMonth;
let ageDay;
let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
function displayValues() {
    if (inputYear.value > 0 && inputYear.value <= currentDate.getFullYear() &&
        inputMonth.value > 0 && inputMonth.value <= 12 &&
        inputDay.value > 0 && inputDay.value <= months[inputMonth.value - 1]) {

        if (dayValue > current.day) {
            current.day = current.day + months[current.month - 1]
            current.month--;
            current.day++;
        }
        if (monthValue > current.month) {
            current.month = current.month + 12;
            current.year--;
        }
        ageDay = current.day - dayValue;
        ageMonth = current.month - monthValue;
        ageYear = current.year - yearValue;
        outputYear.textContent = ageYear;
        outputMonth.textContent = ageMonth;
        outputDay.textContent = ageDay;

        for(let i = 0;i < 3; i++) {
            errorFixed(i)
        }

        resetValues()
    }else {
        errorMsg = "A valid dates are required"
        for(let i = 0; i < 3; i++) {
            errorPopup(i, errorMsg)
        }
    }
}
function resetValues() {
    ageDay = 0;
    ageMonth = 0;
    ageYear = 0;
    current = {
        year: currentDate.getFullYear(),
        month: 1 + currentDate.getMonth(),
        day: currentDate.getDate()
    }
}
function errorPopup(index, msg) {
    errorDisplays[index].classList.add("errorPopup")
    errorDisplays[index].innerHTML = msg;
    errorInputDisplays[index].style.outlineColor = "hsl(0, 100%, 67%)";
    errorLabelDisplays[index].style.color = "hsl(0, 100%, 67%)";
}
function errorFixed(index) {
    errorDisplays[index].classList.remove("errorPopup")
    errorDisplays[index].innerHTML = null;
    errorInputDisplays[index].style.outlineColor = "hsl(0, 1%, 44%)";
    errorLabelDisplays[index].style.color = "#D8EFD3";
}