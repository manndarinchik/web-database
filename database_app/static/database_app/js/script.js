/*---------------Поиск-----------------*/
const search = document.getElementById("search");
search.addEventListener('click', function() {
    let input = document.getElementById("input");
    let allTr = document.querySelectorAll("tr");
    let len = allTr[0].querySelectorAll("td");
    console.log(input.value);
    for (let i = 0; i < allTr.length; i++) {
        let masOfTd = allTr[i].querySelectorAll("td")
        let access = false;
        for (let j = 0; j < masOfTd.length; j++) {
            if (masOfTd[j].textContent.trim().includes(input.value)) {
                access = true;
                break;
            }
        }
        if (access) {
            continue;
        } else {
            allTr[i].style.display = "none";
        }   
    }
    buttonChange.style.display = "none";
});

const cancelButton = document.getElementById("cancel");
cancelButton.addEventListener('click', function() {
    let allTr = document.querySelectorAll("tr");
    for (let i = 0; i < allTr.length; i++) {
        allTr[i].style.display = "table-row";
    }
    let input = document.getElementById("input");
    input.value = '';
    buttonChange.style.display = "inline-block";
})


/*-------Изначальная таблица-----------*/
const oldTr = document.querySelectorAll("tr");
const oldTd = oldTr[0].querySelectorAll("td");
/*-------------------------------------*/


/*Создание "агента", который передаёт информацию о кол-ве столбцов*/
const agent = document.querySelector('.agent');
agent.setAttribute('value', document.querySelectorAll("tr")[0].querySelectorAll('td').length);
/*-------------------------------------*/


/*---------Добавление колонки----------*/
const addColumn = document.getElementById("addColumn");
addColumn.addEventListener('click', function() {
    let allTr = document.querySelectorAll("tr");
    for (let i = 0; i < allTr.length; i++) {
        newColumn = document.createElement('td');
        newColumn.style.width = '200px';
        let input = document.createElement("input");
        input.setAttribute('name', 'ourInput');
        newColumn.append(input);
        allTr[i].append(newColumn);
    }
    agent.setAttribute('value', allTr[0].querySelectorAll('td').length);
});
/*-------------------------------------*/


/*----------Удаление колонки-----------*/
const deleteColumn = document.getElementById("deleteColumn");
deleteColumn.addEventListener('click', function() {
    let allTr = document.querySelectorAll("tr");
    for (let i = 0; i < allTr.length; i++) {
        let lastTd = allTr[i].querySelectorAll("td")[allTr[i].querySelectorAll("td").length - 1];
        agent.setAttribute('value', allTr[0].querySelectorAll('td').length);

        lastTd.remove();
    }
    agent.setAttribute('value', allTr[0].querySelectorAll('td').length);
});
/*-------------------------------------*/


/*----------Удаление строки-----------*/
const deleteRow = document.getElementById("deleteRow");
deleteRow.addEventListener('click', function() {
    let lastTr = document.querySelectorAll('tr')[document.querySelectorAll("tr").length - 1];
    lastTr.remove();
});
/*-------------------------------------*/


/*----------Добавление строки----------*/
const addRow = document.getElementById('addRow');
addRow.addEventListener('click', function() {
    let newTr = document.createElement('tr');
    let lastTr = document.querySelectorAll('tr')[document.querySelectorAll('tr').length - 1];
    lastTr.after(newTr);
    for (let i = 0; i < lastTr.querySelectorAll('td').length; i++) {
        let newTd = document.createElement('td');
        let input = document.createElement('input');
        input.setAttribute('name', 'ourInput');
        newTd.append(input);
        newTr.append(newTd);
    }
});
/*-------------------------------------*/


/*----Режим редактирования/просмотра----*/
const buttonChange = document.getElementById("button_change");
let access = 0;
buttonChange.addEventListener('click', function() {
    if (access % 2 == 0) {
        buttonChange.innerHTML = "Выйти"
        document.querySelector(".buttonsColumn").style.display = 'block';
        document.querySelector(".buttonsRow").style.display = 'block';
        document.getElementById("justButton").style.display = 'block';
        document.getElementById("resetButton").style.display = 'block';
        access += 1;
        let allTr = document.querySelectorAll('tr');
        for (let i = 0; i < allTr.length; i++) {
            let allTd = allTr[i].querySelectorAll('td');
            for (let j = 0; j < allTd.length; j++) {
                let tdText = String(allTd[j].innerHTML).trim();
                allTd[j].innerHTML = '';
                let tempInput = document.createElement('input');
                tempInput.setAttribute('name', 'ourInput');
                tempInput.setAttribute('style', 'background-color: rgba(220, 220, 255, 0.2);');
                tempInput.classList.add('form-control');
                tempInput.value = tdText;
                allTd[j].append(tempInput);     
            }
        }
    } else {
        document.querySelector(".buttonsColumn").style.display = 'none';
        document.querySelector(".buttonsRow").style.display = 'none';
        document.getElementById("justButton").style.display = 'none';
        document.getElementById("resetButton").style.display = 'none';
        buttonChange.innerHTML = "Изменить"
        access -= 1;
        let allTr = document.querySelectorAll('tr');
        for (let i = 0; i < allTr.length; i++) {
            let allTd = allTr[i].querySelectorAll('td');
            for (let j = 0; j < allTd.length; j++) {
                let tdText = String(allTd[j].childNodes[0].value).trim();
                allTd[j].childNodes[0].remove();
                allTd[j].innerHTML = tdText;
            }
        }

        ResetTable();
    }
});
/*-------------------------------------*/


/*-----------Кнопка "отмена"-----------*/

let resetButton = document.getElementById("resetButton");
resetButton.addEventListener('click', ResetTable);

function ResetTable(){
    let newTr = document.querySelectorAll("tr");
    if (newTr.length > oldTr.length) {
        for (let i = oldTr.length; i < newTr.length; i++) {
            newTr[i].remove();
        }
    }
    for (let i = 0; i < oldTr.length; i++) {
        let newTd = newTr[i].querySelectorAll("td");
        for (let j = oldTd.length; j < newTd.length; j++) {
            newTd[j].remove();  
        }
        
    }
    agent.setAttribute('value', oldTr[0].querySelectorAll('td').length);

    return;
}

/*-------------------------------------*/


/*-----------Отправка данных-----------*/
let submitButton = document.getElementById('justButton');
submitButton.addEventListener('submit', function(e) {
    e.preventDefault();
    const newForm = new FormData();  
    let row = agent.value;
    newForm.append(row)
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '');
    xhr.send(newForm);
});
/*-------------------------------------*/