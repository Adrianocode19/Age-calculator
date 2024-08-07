const inputs = document.querySelectorAll(".input-camp");
const labels = document.querySelectorAll(".date-label");
const alerts = document.querySelectorAll(".alert");

const btnCalc = document.getElementById("btn");

const years = document.getElementById("result-years");
const months = document.getElementById("result-months");
const days = document.getElementById("result-days");

let currentDate = new Date();

const verify = () => {
    let hasError = false;

    const isValidDate = (day, month, year) => {
        const date = new Date(year, month - 1, day);
        return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
    };

    inputs.forEach((input, index) => {
        if (input.value.length <= 0) {
            input.classList.add("alert-input");
            labels[index].classList.add("alert-label");
            alerts[index].innerHTML = "This field is required";
            hasError = true;
            return;
        }
        if (index === 0) {
            if (input.value > 31) {
                input.classList.add("alert-input");
                labels[index].classList.add("alert-label");
                alerts[index].innerHTML = "Must be a valid day";
                hasError = true;
                return;
            }
        }
        if (index === 1) {
            if (input.value > 12) {
                input.classList.add("alert-input");
                labels[index].classList.add("alert-label");
                alerts[index].innerHTML = "Must be a valid month";
                hasError = true;
                return;
            }
        }
        if (index === 2) {
            if (input.value > 2024) {
                input.classList.add("alert-input");
                labels[index].classList.add("alert-label");
                alerts[index].innerHTML = "Must be a valid year";
                hasError = true;
                return;
            }
        }

        if (!hasError) {
            input.classList.remove("alert-input");
            labels[index].classList.remove("alert-label");
            alerts[index].innerHTML = "";
        }
    });

    if (!hasError) {
        const day = parseInt(inputs[0].value);
        const month = parseInt(inputs[1].value);
        const year = parseInt(inputs[2].value);

        if (!isValidDate(day, month, year)) {
            inputs.forEach((input, index) => {
                input.classList.add("alert-input");
                labels[index].classList.add("alert-label");
                alerts[0].innerHTML = "Must be a valid date";
            });
            hasError = true;
        }
    }

    if (!hasError) {
        calc();
    }
};

const calc = () => {
    let day = parseInt(inputs[0].value);
    let month = parseInt(inputs[1].value);
    let year = parseInt(inputs[2].value);

    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();

    let ageYears = currentYear - year;
    let ageMonths = currentMonth - month;
    let ageDays = currentDay - day;

    if (ageDays < 0) {
        ageDays += new Date(currentYear, currentMonth, 0).getDate();
        ageMonths--;
    }

    if (ageMonths < 0) {
        ageMonths += 12;
        ageYears--;
    }

    years.innerHTML = `${ageYears}`;
    months.innerHTML = `${ageMonths}`;
    days.innerHTML = `${ageDays}`;
};

btnCalc.addEventListener("click", () => verify());