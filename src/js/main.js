let userCreditSum = document.querySelector('#amountCredit'),
userTimeCredit = document.querySelector('#timeCredit'),
userPercentRate = document.querySelector('#percentRate'),
userFullName = document.querySelector('#fullName'),
userTel = document.querySelector('#tel');

let calcBtn = document.querySelector('.calc-btn'),
submitAppBtn = document.querySelector('.submit-app'),
showTableBtn = document.querySelector('.show-table-btn');

let tableContainer = document.querySelector('.table-container');
let form = document.querySelector('.formElem');

let numberInput = [userCreditSum, userTimeCredit, userPercentRate];
let nowDate = new Date();
let dateIndex = getStartDate(nowDate);
// let monthIndex = dateIndex.month;
let resultArr = [];
let arrBalance = [];
let totalObj = {
    'totalPays' : 0,
    'totalPerc' : 0,
    'totalCredit' : 0
};

numberInput.forEach(el => {
    el.addEventListener('input', function () {
        let regExp = /[\d{0,}]$/; 
        let expression = this.value;
        if (!regExp.test(expression)) {
            el.value = expression.substring(0, expression.length - 1);
        }
    });
});

function makeTable (arr, block, total) {
    let data = arr;

    let html = '<table border="1" cellpadding="3" style="margin-top: 30px; margin-bottom: 30px">';

    html += '<tr>';
    html += '<td style="text-align: center; padding: 5px">' + 'Дата' + '</td>'
    html += '<td style="text-align: center; padding: 5px">' + 'Ежемесячный платёж, руб.' + '</td>';
    html += '<td style="text-align: center; padding: 5px">' + 'Погашение процентов, руб.' + ' руб.</td>';
    html += '<td style="text-align: center; padding: 5px">' + 'Погашение кредита, руб.'  + ' руб.</td>';
    html += '<td style="text-align: center; padding: 5px">' + 'Остаток долга, руб.' + ' </td>';
    html += '</tr>';

    for(let i = 0; i < data.length; i++)
    {
        html += '<tr>';
        html += '<td style="text-align: center; padding: 5px">' + data[i].date + '</td>'
        html += '<td style="text-align: center; padding: 5px">' + data[i].monthPay + '</td>';
        html += '<td style="text-align: center; padding: 5px">' + data[i].percentRepay + ' </td>';
        html += '<td style="text-align: center; padding: 5px">' + data[i].loanRepay  + ' </td>';
        html += '<td style="text-align: center; padding: 5px">' + data[i].balance + ' </td>';
        html += '</tr>';
    }

    html += '<tr>';
    html += '<td style="text-align: center; padding: 5px">' + 'Итого' + '</td>'
    html += '<td style="text-align: center; padding: 5px">' + total.totalPays.toFixed(2) + '</td>';
    html += '<td style="text-align: center; padding: 5px">' + total.totalPerc.toFixed(2) + ' руб.</td>';
    html += '<td style="text-align: center; padding: 5px">' + total.totalCredit.toFixed(2) +' руб.</td>';
    html += '<td style="text-align: center; padding: 5px">' + ' </td>';
    html += '</tr>';

    block.innerHTML = html + '</table>';
    data.date = "";
};


function calcAllPay (creditBody, monthlyRate, monthlyPayment, total, i) {
    let perc = (creditBody * monthlyRate).toFixed(2);
    let loanBody = (monthlyPayment - perc).toFixed(2);
    let debt = (+creditBody - +loanBody).toFixed(2);
    let obj = {
        'date' : new Date(dateIndex.year, dateIndex.month , dateIndex.day).toLocaleDateString(),
        'monthPay' : +monthlyPayment,
        'percentRepay' : +perc,
        'loanRepay' : loanBody,
        'balance' : +debt,
    };

    total.totalPays += obj.monthPay;
    total.totalPerc += obj.percentRepay;
    total.totalCredit += +obj.loanRepay;
    resultArr.push(obj);
    dateIndex.month++;
    i--;

    if (i > 0) {
        return calcAllPay(obj.balance, monthlyRate, monthlyPayment, total, i)
    }
}

function getMonthsCount ( num ) {
    return num * 12;
}

function getMonthlyRate (percentRate) {
    let res = +percentRate / (100 * 12);
    return +res.toFixed(6)
}

function getMonthlyPayment (creditSum, monthsRate, months) {
    return (creditSum * (monthsRate + monthsRate/(Math.pow((monthsRate + 1), months) - 1))).toFixed(2)
}

function getStartDate (dateObj) {
    let startDate = {
        'year' : dateObj.getFullYear(),
        'month' : dateObj.getMonth(),
        'day' : dateObj.getDate()
    }
    return startDate
}

function getLastDate (dateObj, timeCredit) {
    dateObj.setFullYear(dateObj.getFullYear() + timeCredit);
    let date = {
        'year' : dateObj.getFullYear(),
        'month' : dateObj.getMonth(),
        'day' : dateObj.getDate()
    };
    return date
}

calcBtn.addEventListener ('click', function () {
    let date = new Date();
    let creditBody = +userCreditSum.value;
    let countMonths = getMonthsCount(+userTimeCredit.value);
    let percentRate = +userPercentRate.value; 
    let monthlyRate = getMonthlyRate(percentRate);

    let lastPayDate = getLastDate(date, +userTimeCredit.value);
    let lastPayText = document.querySelector('.last-pay-date');
    lastPayText.innerText = `${lastPayDate.day}` + '.' + `${lastPayDate.month}` + '.' + `${lastPayDate.year}` + ' г.';

    let monthlyPayText = document.querySelector('.monthly-payment');
    let monthlyPayment = getMonthlyPayment(creditBody, monthlyRate, countMonths);
    monthlyPayText.innerText = monthlyPayment + " р/мес";

    resultArr = [];
    totalObj.totalPays = 0;
    totalObj.totalPerc = 0;
    totalObj.totalCredit = 0;
    calcAllPay(creditBody, monthlyRate, monthlyPayment, totalObj, countMonths);
    let percSumText = document.querySelector('.sum-paid-percent');
    let percSum = totalObj.totalPerc.toFixed(2);
    percSumText.innerText = percSum + " р";

    dateIndex.month = dateIndex.month - countMonths;
});

showTableBtn.addEventListener('click', function () {
    let creditBody = +userCreditSum.value;
    let countMonths = getMonthsCount(+userTimeCredit.value);
    let percentRate = +userPercentRate.value;
    let monthlyRate = getMonthlyRate(percentRate);
    let monthlyPayment = getMonthlyPayment(creditBody, monthlyRate, countMonths);

    resultArr = [];
    totalObj.totalPays = 0;
    totalObj.totalPerc = 0;
    totalObj.totalCredit = 0;
    calcAllPay(creditBody, monthlyRate, monthlyPayment, totalObj, countMonths);
    dateIndex.month = dateIndex.month - countMonths;
    makeTable(resultArr, tableContainer, totalObj);
});

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let formData = new FormData(form);
    formData.append("table", JSON.stringify(resultArr));
    formData.append("total", JSON.stringify(totalObj));
    for(let pair of formData.entries()) {
        console.log(pair[0]+ ', '+ pair[1]); 
    }
    let request = new XMLHttpRequest();
    request.open("POST", "/helpers/helper.php");
    request.onload = function() {
        if (request.status != 200) {
            console.log( 'Ошибка: ' + request.status);
            return;
        }  
        alert(request.responseText);
    };
    request.onerror = function() {
        console.log("it is not a HTTP error");
    }
    request.upload.onprogress = function(event) {
        console.log(`Отправлено ${event.loaded} из ${event.total} байт`);
    };
    request.send(formData);
})
