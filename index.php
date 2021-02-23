<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no" />
    <title>Credit-calc</title>
    <link rel="stylesheet" href="./public/css/main.css">
</head>
<body>
    <div class="wrapper">
        <div class="header">
            <div class="container">
                <div class="header-wrap">
                    <div class="header-left">
                        <p class="header-left-text">Джон Уик</p>
                    </div>
                    <div class="header-right">
                        <a class="header-right-text" href="tel:">+7-999-999-99-76</a>
                        <a class="header-right-text" href="mailto:">mail here</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="container">
                <div class="block-wrap">
                    <form method="post" class="formElem" >
                        <input class="input-field" type="text" id="amountCredit" name="amountCredit" placeholder="Сумма кредита.">
                        <input class="input-field" type="text" id="timeCredit" name="timeCredit" placeholder="Срок в годах.">
                        <input class="input-field" type="text" id="percentRate" name="percentRate" placeholder="Процентная ставка, % в год.">
                        <input class="input-field" type="text" required id="fullName" name="fullName" placeholder="ФИО">
                        <input class="input-field" type="tel" maxlength="11" required id="tel" name="tel" placeholder="Номер телефона">
                        <div class="calc-btn-wrap">
                            <div class="calc-btn"> Рассчитать</div>
                        </div>
                        <div class="calc-result">
                            <p class="result-text ">Ежемесячный платеж: <span class="monthly-payment"></span></p>
                            <p class="result-text ">Сумма выплаченных процентов: <span class="sum-paid-percent"></p>
                            <p class="result-text ">Дата последнего платежа: <span class="last-pay-date"></p>
                        </div>
                        <input type="submit" value="Оставить заявку" class="submit-app">
                    </form>
                    <div class="show-btn-wrap">
                        <button class="show-table-btn"> Вывести график платежей</button>
                    </div>
                    <div class="table-container"></div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="container">
                <div class="footer-wrap">
                    <div class="header-left">
                        <p class="header-left-text">Джон Уик</p>
                    </div>
                    <div class="header-right">
                        <a class="header-right-text" href="tel:">+7-999-999-99-76</a>
                        <a class="header-right-text" href="mailto:">mail here</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="./public/js/old.js"></script>
    <script src="./public/js/bundle.js"></script>
</body>
</html>