
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
createSort();

/*-------------------------------------*/
function createSort() {
    let allTableHead = document.querySelector(".table_head");
    let allFirstTd = allTableHead.querySelectorAll("td");
    for (let i = 0; i < allFirstTd.length; i++) {
        const div = document.createElement("div");
        div.classList.add("arrow");
        div.setAttribute("onclick", "sortColumn(this)");
        allFirstTd[i].append(div);
    }
}
/*-------------------------------------*/


/*---------Осторожно, говнокод---------*/
let columnSort = false;
function sortColumn(td) {
    const table = document.querySelector("tbody");
    if (!columnSort) {
        let oldTr = document.querySelectorAll("tr");
        let allTr = document.querySelectorAll("tr");
        let position = getPosTd(td.parentNode);
        let masTd = [];
        let masWords = [];
        let map = new Map();
        for (let i = 1; i < allTr.length; i++) {
            if (Number.isInteger(parseFloat(allTr[i].querySelectorAll("td")[position].innerText))) {
                map.set(allTr[i].querySelectorAll("td")[position], parseFloat(allTr[i].querySelectorAll("td")[position].innerText));
                continue;
            }
            map.set(allTr[i].querySelectorAll("td")[position], allTr[i].querySelectorAll("td")[position].innerText);
        }
        
        let mapAsc = new Map([...map.entries()].sort());
        console.log(mapAsc);
        const table = document.querySelector("tbody");
        for (let i = 1; i < document.querySelectorAll("tr").length; i++) {
            document.querySelectorAll("tr")[i].remove();
        }
        for (let elem of mapAsc.keys()) {
            table.append(elem.parentNode);
        }
        columnSort = true;
        td.style.transform = "rotate(-90deg)";
    } else {
        let tempTr = document.querySelectorAll("tr");
        for (let i = 1; i < tempTr.length; i++) {
            tempTr[i].remove();
        }
        for (let i = 1; i < oldTr.length; i++) {
            table.append(oldTr[i]);
        }
        columnSort = false;
        td.style.transform = "rotate(0deg)";
    }
}
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


/*----Режим редактирования/просмотра----*/
const buttonChange = document.getElementById("button_change");
let access = 0;
buttonChange.addEventListener('click', function() {
    if (access % 2 == 0 && squareAccess == 0) {
        buttonChange.innerHTML = "Выйти";
        document.getElementById("justButton").style.display = 'block';
        document.getElementById("resetButton").style.display = 'block';
        access += 1;
        let allTr = document.querySelectorAll('tr');
        for (let i = 0; i < allTr.length; i++) {
            let allTd = allTr[i].querySelectorAll('td');
            for (let j = 0; j < allTd.length; j++) {
                let tdText = allTd[j].innerText;
                allTd[j].innerText = '';
                let tempInput = document.createElement('input');
                tempInput.setAttribute('name', 'ourInput');
                tempInput.value = tdText;
                allTd[j].append(tempInput);     
            }
        agent.setAttribute('value', oldTr[0].querySelectorAll('td').length);
        }
    } else if (squareAccess == 0) {
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
        createSort();
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
    const buttonWrapper = document.createElement("div");
    const choiceButton = document.createElement("button");
    const addButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const mas = [addButton, choiceButton, deleteButton];

    for (let i = 0; i < 3; i++) {
        mas[i].setAttribute("type", "button");
        buttonWrapper.append(mas[i]);
        if (i % 2 == 0) {
            mas[i].classList.add("hide")
        } else {
            mas[i].classList.add("choiceButton");
        }
    }
    buttonWrapper.classList.add("choiceButton__wrapper")
    return buttonWrapper
}

function toWrapper(ourWrapper) {
    const allWrappers = document.querySelectorAll(".choiceButton__wrapper");
    for (let i = 0; i < 4; i++) {
        if (allWrappers[i] == ourWrapper) {
            continue;
        }
        // Немножко наговнокодил
        allWrappers[i].childNodes[0].classList.remove("addButton");
        allWrappers[i].childNodes[0].classList.add("hide");
        allWrappers[i].childNodes[2].classList.remove("deleteButton");
        allWrappers[i].childNodes[2].classList.add("hide");
        allWrappers[i].childNodes[1].classList.remove("hide");
        allWrappers[i].childNodes[1].classList.add("choiceButton");
    }
}

function dualButton(wrapper) {
    for (let i = 0; i < 3; i++) {
        wrapper.childNodes[i].classList.toggle("hide");
    }

    toWrapper(wrapper)
    // И тут наговнокодил
    wrapper.childNodes[0].classList.toggle("addButton");
    wrapper.childNodes[0].setAttribute("id", wrapper.classList[1]);
    wrapper.childNodes[0].setAttribute("onclick", "show(this)");
    wrapper.childNodes[2].classList.toggle("deleteButton");
    wrapper.childNodes[2].setAttribute("id", wrapper.classList[1] + "Delete");
    wrapper.childNodes[2].setAttribute("onclick", "deleteRC(this)");

    
}

function deleteRC(obj) {
    const allTr = document.querySelectorAll("tr");
    function deleteRL(side) {
        const position = getPosTd(obj.closest("td"));
        for (let i = 0; i < allTr.length; i++) {
            if (side == "right") allTr[i].querySelectorAll("td")[position + 1].remove();
            else allTr[i].querySelectorAll("td")[position - 1].remove();
        }
    }
    function deleteTB(side) {
        if (side == "top") allTr[getPosTr(obj) - 1].remove();
        else allTr[getPosTr(obj) + 1].remove();
    }
    switch (obj.getAttribute("id")) {
        case "rightDelete":
            deleteRL("right");
            break;
        case "leftDelete":
            deleteRL("left");
            break;
        case "topDelete":
            deleteTB("top");
            break;
        case "bottomDelete":
            deleteTB("bottom");
            break;
    }
}

function show(obj) {
    const allTr = document.querySelectorAll("tr");
    function showRL(side) {
        const position = getPosTd(obj.closest("td"));
        console.log(position);
        for (let i = 0; i < allTr.length; i++) {
            let ourTd = allTr[i].querySelectorAll("td")[position];
            let newTd = document.createElement("td");
            if (side == "right") ourTd.after(newTd);
            else ourTd.before(newTd);
        }
    }
    function showTB(side) {
        const ourTr = allTr[getPosTr(obj.closest("td"))];
        const newTr = document.createElement("tr");
        for (let i = 0; i < allTr[0].querySelectorAll("td").length; i++) {
            newTr.append(document.createElement("td"));
        }
        if (side == "top") ourTr.before(newTr);
        else ourTr.after(newTr);
    }
    switch (obj.getAttribute("id")) {
        case "right":
            showRL("right");
            break;
        case "left":
            showRL("left");
            break;
        case "top":
            showTB("top");
            break;
        case "bottom":
            showTB("bottom");
            break;
    }
}

function makeButtons(xCords, yCords, obj) {
    // Справа xCords + 15; yCords - 10
    // Слева xCords - 65; yCords - 10
    // Сверху xCords - 25; yCords - 35
    // Снизу xCords - 25; yCords + 15
    x = [xCords + 15, xCords - 65, xCords - 25, xCords - 25];
    y = [yCords - 10, yCords - 10, yCords - 35, yCords + 15];
    pos = ["right", "left", "top", "bottom"];
    for (let i = 0; i < 4; i++) {
        
        let button = buttons();
        button.style.left = `${x[i]}px`;
        button.style.top = `${y[i]}px`;
        button.classList.add(pos[i]);
        button.setAttribute("onclick", "dualButton(this)");
        button.style.zIndex = '1000';
        obj.append(button);

    }
    
}

let squareAccess = 0;
document.body.addEventListener('click', function(event) {
    let td = event.target;
    if (td.tagName == "BUTTON" || td.closest("div").className == "arrow") {
        return;
    }
    if (td.closest("td") && access == 0) {
        if (squareAccess == 0 && access == 0) {
            td.style.transition = ".2s";
            td.classList.add("dark");
            activeGray = td;
            makeButtons(event.clientX - document.querySelector(".content").offsetLeft - td.offsetLeft - document.querySelector(".table-responsive").offsetLeft + document.querySelector(".table-responsive").scrollLeft, event.clientY - td.closest("tr").offsetTop, td);
            squareAccess += 1;
        } else {
            deleteStyles();
        }
    } else if (squareAccess == 1 && access == 0){
        deleteStyles();
    }
});

function deleteStyles() {
    let allButtons = document.querySelectorAll(".choiceButton__wrapper");
    for (let i = 0; i < 4; i++) {
        allButtons[i].remove();
    }
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