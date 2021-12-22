
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

function sortColumn(td) {
    const table = document.querySelector("tbody");
    const allArrows = document.querySelectorAll(".arrow");
    for (let i = 0; i < allArrows.length; i++) {
        if (td == allArrows[i]) continue;
        if (allArrows[i].classList.contains("active")) allArrows[i].classList.remove("active");
    }
    if (!td.classList.contains("active")) {
        let oldTr = document.querySelectorAll("tr");
        let allTr = document.querySelectorAll("tr");
        let position = getPosTd(td.parentNode);
        let masTd = [];
        let masWords = [];
        td.classList.add("active");
        let map = new Map();
        if (!isNaN(parseFloat(allTr[1].querySelectorAll("td")[position].innerText))) {
            
            for (let i = 1; i < allTr.length; i++) {
                map.set(allTr[i].querySelectorAll("td")[position], parseFloat(allTr[i].querySelectorAll("td")[position].innerText));
            }
            mapAsc = new Map([...map.entries()].sort((a, b) => a[1] - b[1]));
        } else {

            for (let i = 1; i < allTr.length; i++) {
                map.set(allTr[i].querySelectorAll("td")[position], allTr[i].querySelectorAll("td")[position].innerText);
            }
            mapAsc = new Map([...map.entries()].sort());
            
        }
        
        
        const table = document.querySelector("tbody");
        for (let i = 1; i < document.querySelectorAll("tr").length; i++) {
            document.querySelectorAll("tr")[i].remove();
        }
        for (let elem of mapAsc.keys()) {
            table.append(elem.parentNode);
        }
        
    }
    else {
        let tempTr = document.querySelectorAll("tr");
        for (let i = 1; i < tempTr.length; i++) {
            tempTr[i].remove();
        }
        td.classList.remove("active");
        for (let i = 1; i < oldTr.length; i++) {
            table.append(oldTr[i]);
        }
        
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
        buttonChange.innerHTML = "Отмена";
        document.getElementById("justButton").style.display = 'block';
        // document.getElementById("resetButton").style.display = 'block';
        access += 1;
        let allTr = document.querySelectorAll('tr');
        for (let i = 0; i < allTr.length; i++) {
            let allTd = allTr[i].querySelectorAll('td');
            for (let j = 0; j < allTd.length; j++) {
                allTd[j].setAttribute("style", "padding: 0;");
                let tdText = allTd[j].innerText;
                allTd[j].innerText = '';
                const tempP = document.createElement("p");
                let tempInput = document.createElement('input');
                tempInput.setAttribute('name', 'ourInput');
                tempInput.setAttribute('style', 'background-color: rgba(220, 220, 255, 0.2); border-width: 0; height: 100%;');
                tempInput.classList.add('form-control');
                tempInput.value = tdText;
                tempP.append(tempInput);
                allTd[j].append(tempP);     
            }
        agent.setAttribute('value', oldTr[0].querySelectorAll('td').length);
        }
    } else if (squareAccess == 0) {
        document.getElementById("justButton").style.display = 'none';
        // document.getElementById("resetButton").style.display = 'none';
        buttonChange.innerHTML = "Изменить"
        access -= 1;
        let allTr = document.querySelectorAll('tr');
        for (let i = 0; i < allTr.length; i++) {
            let allTd = allTr[i].querySelectorAll('td');
            for (let j = 0; j < allTd.length; j++) {
                allTd[j].setAttribute("style", "");
                let tdText = String(allTd[j].childNodes[0].childNodes[0].value).trim();
                allTd[j].childNodes[0].remove();
                allTd[j].append(document.createElement("p"));
                allTd[j].childNodes[0].innerHTML = tdText;
            }
        }
        createSort();
    }
});
/*-------------------------------------*/


/*-----------Кнопка "отмена"-----------*/

// let resetButton = document.getElementById("resetButton");
// resetButton.addEventListener('click', ResetTable);

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

const buttonWidth = 50;
const buttonHeight = 20;
/*-------------------------------------*/
function buttons() {
    const buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add("choiceButton__wrapper");

    const choiceButton = document.createElement("button");
    choiceButton.classList.add('choiceButton', 'btn', 'btn-primary');
    choiceButton.setAttribute("type", "button");
    choiceButton.style.padding = '0';
    
    const addButton = document.createElement("button");
    addButton.classList.add('btn', 'btn-success');
    addButton.setAttribute("type", "button");
    addButton.style.padding = '0';
    addButton.innerHTML = "+"
    addButton.style.display = "none";

    const deleteButton = document.createElement("button");
    deleteButton.classList.add( 'btn', 'btn-danger');
    deleteButton.setAttribute("type", "button");
    deleteButton.style.padding = '0';
    deleteButton.innerHTML = "-"
    deleteButton.style.display = "none";

    buttonWrapper.append(addButton, choiceButton, deleteButton);
    
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
        // wrapper.childNodes[i].classList.toggle("hide");
        wrapper.childNodes[i].style.display = "inline-block";
    }
    // Убрать остальные кнопки после нажатия
    let allButtons = document.querySelectorAll(".choiceButton__wrapper");
    for (let i = 0; i < allButtons.length; ++i){
        if (allButtons[i].classList[1] != wrapper.classList[1]) {
            allButtons[i].classList.toggle("hide")
        }
    }

    toWrapper(wrapper)
    // И тут наговнокодил
    wrapper.childNodes[0].classList.toggle("addButton");
    wrapper.childNodes[0].setAttribute("id", wrapper.classList[1]);
    wrapper.childNodes[0].setAttribute("onclick", "show(this)");
    wrapper.childNodes[1].classList.toggle("hide");
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
    deleteStyles();
}

function show(obj) {
    const allTr = document.querySelectorAll("tr");
    function showRL(side) {
        const position = getPosTd(obj.closest("td"));
        
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
    deleteStyles();
}

function makeButtons(xCords, yCords, obj, xPos, yPos) {
    // Справа xCords + 15; yCords - 10
    // Слева xCords - 65; yCords - 10
    // Сверху xCords - 25; yCords - 35
    // Снизу xCords - 25; yCords + 15
    
    if (xPos - document.querySelector(".content_container").offsetLeft - document.querySelector(".table-responsive").offsetLeft < buttonWidth + 15) xCords = buttonWidth + 15;
    if (yPos - document.querySelector(".table-responsive").offsetTop < buttonHeight + 15) yCords = buttonHeight + 15;
    //console.log(xPos - document.querySelector(".content").offsetLeft - document.querySelector(".table-responsive").offsetLeft)
    if (xPos - document.querySelector(".content_container").offsetLeft - document.querySelector(".table-responsive").offsetLeft + buttonWidth + 15 > document.querySelector(".table-responsive").offsetWidth) xCords = obj.offsetWidth - 1 - buttonWidth - 15;
    if (yPos - document.querySelector(".table-responsive").offsetTop + buttonHeight + 10 > document.querySelector(".table-responsive").offsetHeight) yCords = obj.offsetHeight - buttonHeight - 15 - 1;
    const x = [xCords + 15, xCords - buttonWidth - 15, xCords - buttonWidth / 2, xCords - buttonWidth / 2];
    const y = [yCords - buttonHeight / 2, yCords - buttonHeight / 2, yCords - buttonHeight - 15, yCords + 15];
    const pos = ["right", "left", "top", "bottom"];
    const rotation = ["270deg", "90deg", "180deg", "V"]
    for (let i = 0; i < 4; i++) {
        
        let button = buttons();
        button.style.left = `${x[i]}px`;
        button.style.top = `${y[i]}px`;
        button.classList.add(pos[i]);
        button.setAttribute("onclick", "dualButton(this)");
        button.childNodes[1].innerHTML = "V"
        button.childNodes[1].style.rotate = rotation[i] ;
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
    if (td.closest("td") && access == 0 && td.closest("tr").className != "table_head") {
        if (squareAccess == 0 && access == 0) {
            td = td.closest("td");
            td.style.transition = ".2s";
            td.classList.add("dark");
            activeGray = td;
            makeButtons(event.clientX - document.querySelector(".content_container").offsetLeft 
                                    - td.offsetLeft 
                                    - document.querySelector(".table-responsive").offsetLeft 
                                    + document.querySelector(".table-responsive").scrollLeft,
                        event.clientY - td.parentNode.offsetTop
                                      - document.querySelector(".content_container").offsetTop
                                      - document.querySelector(".table-responsive").offsetTop, 
                        td, event.clientX, event.clientY);
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
    for (let i = 0; i < allButtons.length; i++) {
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
