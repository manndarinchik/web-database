/*---------------Поиск-----------------*/
const search = document.getElementById("search");
search.addEventListener('click', function() {
    let input = document.getElementById("input");
    let allTr = document.querySelectorAll("tr");
    let len = allTr[0].querySelectorAll("td");
    for (let i = 1; i < allTr.length; i++) {
        let masOfTd = allTr[i].querySelectorAll("td");
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
/*-------------------------------------*/


/*-------------------------------------*/
const cancelButton = document.getElementById("cancel");
cancelButton.addEventListener('click', function() {
    let allTr = document.querySelectorAll("tr");
    for (let i = 0; i < allTr.length; i++) {
        allTr[i].style.display = "table-row";
    }
    let input = document.getElementById("input");
    input.value = '';
    buttonChange.style.display = "inline-block";
});
/*-------------------------------------*/


/*-------Изначальная таблица-----------*/
let table = document.querySelector("table");
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
    let table = document.querySelector("table")
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
    let table = document.querySelector("table")
});
/*-------------------------------------*/


/*----------Удаление строки-----------*/
const deleteRow = document.getElementById("deleteRow");
deleteRow.addEventListener('click', function() {
    let lastTr = document.querySelectorAll('tr')[document.querySelectorAll("tr").length - 1];
    lastTr.remove();
    let table = document.querySelector("table");
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
    let table = document.querySelector("table");
});
/*-------------------------------------*/


/*----Режим редактирования/просмотра----*/
const buttonChange = document.getElementById("button_change");
let access = 0;
buttonChange.addEventListener('click', function() {
    if (access % 2 == 0 && squareAccess == 0) {
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
                tempInput.value = tdText;
                allTd[j].append(tempInput);     
            }
        agent.setAttribute('value', oldTr[0].querySelectorAll('td').length);
        }
    } else if (squareAccess == 0) {
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
    }
});
/*-------------------------------------*/


/*-----------Кнопка "отмена"-----------*/

let resetButton = document.getElementById("resetButton");
resetButton.addEventListener('click', function() {
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
});

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


/*-------------------------------------*/
function buttons() {
    let button = document.createElement("button");
    button.style.width = "20px";
    button.setAttribute("type", "button")
    button.style.height = "20px";
    button.style.backgroundColor = "green";
    button.style.position = "absolute";
    return button;
}
/*
function dualButton(button, location) {
    const addButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    
    addButton.setAttribute("type", "button");
    deleteButton.setAttribute("type", "button");
    
    addButton.style.backgroundColor = "green";
    
    deleteButton.style.backgroundColor = "red";


    location.append(addButton);
    location.append(deleteButton);

}
*/
function show(obj) {
    let allTr = document.querySelectorAll("tr");
    const ourTr = allTr[getPosTr(obj.closest("td"))];
    let newTr = document.createElement("tr");
    switch (obj.getAttribute("id")) {
        
        case "right":
            for (let i = 0; i < allTr.length; i++) {
                let ourTd = allTr[i].querySelectorAll("td")[getPosTd(obj.closest("td"))];
                let newTd = document.createElement("td");
                ourTd.after(newTd);
            }
            break;
        
        case "left":
            const position = getPosTd(obj.closest("td"))
            for (let i = 0; i < allTr.length; i++) {
                let ourTd = allTr[i].querySelectorAll("td")[position];
                let newTd = document.createElement("td");
                ourTd.before(newTd);
            }
            break;

        case "top":
            for (let i = 0; i < allTr[0].querySelectorAll("td").length; i++) {
                newTr.append(document.createElement("td"));
            }
            ourTr.before(newTr)
            break;

        case "bottom":
            for (let i = 0; i < allTr[0].querySelectorAll("td").length; i++) {
                newTr.append(document.createElement("td"));
            }
            ourTr.after(newTr);
            break;

    }
}

function makeButtons(xCords, yCords, obj) {
    // Справа xCords + 15; yCords - 10
    // Слева xCords - 45; yCords - 10
    // Сверху xCords - 10; yCords - 35
    // Снизу xCords - 10; yCords + 15
    x = [xCords + 15, xCords - 35, xCords - 10, xCords - 10];
    y = [yCords - 10, yCords - 10, yCords - 35, yCords + 15];
    id = ["right", "left", "top", "bottom"];
    for (let i = 0; i < 4; i++) {
        
        let button = buttons();
        button.style.left = `${x[i]}px`;
        button.style.top = `${y[i]}px`;
        button.setAttribute("id", id[i]);
        button.setAttribute("onclick", "show(this)");
        button.style.zIndex = '1000';
        obj.append(button);

    }
    
}

let squareAccess = 0;
document.body.addEventListener('click', function(event) {
    let td = event.target;
    if (td.tagName == "BUTTON") {
        return;
    }
    if (td.closest("td") && access == 0) {
        if (squareAccess == 0 && access == 0) {
            td.style.transition = ".2s";
            td.classList.add("dark");
            activeGray = td;
            td.style.position = "relative";
            makeButtons(event.clientX - td.offsetLeft, event.clientY - td.offsetTop, td);
            squareAccess += 1;
        } else {
            deleteStyles();
        }
    } else if (squareAccess == 1 && access == 0){
        deleteStyles();
    }
});

function deleteStyles() {
    document.getElementById("top").remove();
    document.getElementById("left").remove();
    document.getElementById("right").remove();
    document.getElementById("bottom").remove();
    activeGray.classList.remove("dark");
    squareAccess -= 1;
}

function getPosTr(td) {
    tr = td.closest("tr")
    let allTr = document.querySelectorAll("tr");
    for (let i = 0; i < allTr.length; i++) {
        if (allTr[i] == tr) {
            return i;
        }
    }
    return undefined;
}

function getPosTd(td) {
    let allTr = document.querySelectorAll("tr");
    for (let i = 0; i < allTr[0].querySelectorAll("td").length; i++) {
        if (td == allTr[getPosTr(td)].querySelectorAll("td")[i]) {
            return i;
        }
    }
    return undefined;
}