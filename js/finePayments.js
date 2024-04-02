"use strict";
/**
Перед вами список полів. Це можна сказати пряме посилання на кожне із полів форми.
Якщо ви додасте до змінної .value (fineNumber.value) то отримаєте значення
яке зберігається в цьому полі.
 */
let fineNumber = document.getElementById("fineNumber");
let passport = document.getElementById("passport");
let creditCardNumber = document.getElementById("creditCardNumber");
let cvv = document.getElementById("cvv");
let amount = document.getElementById("amount");
let buttonSubmit = document.getElementById("payFine");

//Ця зміна містить всі дані які в нас зберігаються у файлі data
let DB = data.finesData;



/**
Вам необхідно реалізувати наступний функціонал.
Зробити валідацію до всіх полів
1. Номер та сума повинні бути однакові як в існуючого штрафу - якщо ні видавати
alert "Номер не співпадає" або " "

2. Паспортні дані у форматі - перші дві літери укр алфавіту, та 6 цифр.
Якщо не співпадає то видавати alert "Не вірний паспортний номер"

3. Номер кредитної карки 16 цифр -
якщо не співпадає то видавати alert "Не вірна кредитна картка"

4. cvv 3 цифри - якщо не співпадає то видавати alert "Не вірний cvv".

Якщо валідація проходить успішно, то виконати оплату,
 тобто вам потрібно видалити обєкт з DB
 */
buttonSubmit.addEventListener('click', payFine);

function payFine() {
    
    // Regulara expressions to validate passwort, credit card and cvv 
    const passportRegexp = /^[а-щьюяєїґії]{2}\d{6}$/i;
    const creditCardNumberRegexp = /^\d{16}$/;
    const cvvRegexp = /^\d{3}$/;

    // define error array will be populated during check
    let errors = [];

    // Find fine by id
    const fine = fineList.searchFines(fineNumber.value)[0];

    // if fine doen't exist 
    if (fine === undefined) {
        errors.push('Номер не співпадає');
    }


    if (!passportRegexp.test(passport.value)) {
        errors.push('Паспортний номер вірний');
    }

    if (!creditCardNumberRegexp.test(creditCardNumber.value)) {
        errors.push('Не вірна кредитна картка');
    }


    if (!cvvRegexp.test(cvv.value)) {
        errors.push('Не вірний cvv');
    }

    // Check user ammount with ammount in fine. 
    // Additionally make casting of user input, because it is string but price in fine is number
    if (fine && fine.сума !== parseInt(amount.value)) {
        errors.push('Сума не співпадає');
    }

    // goes through errors and ouput to the screen
    errors.forEach(error => alert(error));

    // if errors is empty it
    if (errors.length === 0) {

        // reasign a new value to fines db, by appling filter where exclude found fine before
        data.finesData = data.finesData.filter(dbFine => dbFine.номер !== fine.номер);

        alert('Оплата штрафу #'+fine.номер+' "'+fine.тип+'" виконана успішно!')
        

        // passport.value = '';
        // creditCardNumber.value = '';
        // cvv.value = '';
        
        // clear number and ammount field
        fineNumber.value = '';
        amount.value = '';
    }
}

function populateAmout() {
    const fine = fineList.searchFines(fineNumber.value)[0];

    // if fine was found by number, populate the amount field with the fine price
    if (fine) {
        amount.value = fine.сума;
    }
}

// add event listner to fineNumber field, when focus removed from element call the function populateAmout
fineNumber.addEventListener('focusout', populateAmout);