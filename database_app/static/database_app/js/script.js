// Создание кнопки для добавления столбца
let allTr = document.querySelectorAll("tr");
const buttonColumn = document.createElement('td');
buttonColumn.classList.add("buttonColumn");
buttonColumn.style.visibility = 'hidden';
allTr[0].append(buttonColumn);
/*-------------------------------------*/
const agent = document.querySelector('.agent');
agent.setAttribute('value', allTr[0].querySelectorAll('td').length - 1);

buttonColumn.addEventListener('click', function() {
    let allTr = document.querySelectorAll("tr");
    for (let i = 0; i < allTr.length; i++) {
        let newTd = document.createElement('td');
        let input = document.createElement('input');
        input.setAttribute('name', 'ourInput');
        newTd.append(input);
        if (i == 0) {
            let allTd = allTr[i].querySelectorAll('td');
            allTd[allTd.length - 2].after(newTd);
            agent.setAttribute('value', allTr[0].querySelectorAll('td').length - 1);
        } else {
            allTr[i].append(newTd);
        }

    }
});


const buttonRow = document.getElementById('buttonRow');
buttonRow.addEventListener('click', function() {
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

buttonColumn.addEventListener('click', function() {

})

const buttonChange = document.getElementById("button_change");
const buttonCancel = document.getElementById("button_cancel");
let access = 0;

buttonCancel.addEventListener('click', function(){
    buttonChange.style.display = "inline-block";
    buttonCancel.style.display = "none";
    buttonRow.style.display = "none";
    butt.style.display = "none";

})

buttonChange.addEventListener('click', function() {
    buttonRow.style.display = "inline-block";
    buttonChange.style.display = "none";
    buttonCancel.style.display = "inline-block";
    butt.style.display = "inline-block";

    if (access % 2 == 0) {
        access += 1;
        buttonColumn.style.visibility = 'visible';
        buttonRow.style.display = 'block';
        let allTr = document.querySelectorAll('tr');
        for (let i = 0; i < allTr.length; i++) {
            let allTd = allTr[i].querySelectorAll('td');
            for (let j = 0; j < allTd.length; j++) {
                let tdText = String(allTd[j].innerHTML).trim();
                if (allTd[j].className != 'buttonColumn') {
                    allTd[j].innerHTML = '';
                    let tempInput = document.createElement('input');
                    tempInput.setAttribute('name', 'ourInput');
                    tempInput.value = tdText;
                    allTd[j].append(tempInput);
                }
            }
        }

    } else {
        access -= 1;
        buttonColumn.style.visibility = 'hidden';
        buttonRow.style.display = 'none';
        let allTr = document.querySelectorAll('tr');
        for (let i = 0; i < allTr.length; i++) {
            let allTd = allTr[i].querySelectorAll('td');
            for (let j = 0; j < allTd.length; j++) {
                if (allTd[j].id != 'buttonColumn') {
                    let tdText = String(allTd[j].childNodes[0].value).trim();
                    allTd[j].childNodes[0].remove();
                    allTd[j].innerHTML = tdText;
                }
            }
        }
    }
});

let butt = document.getElementById('justButton');


butt.addEventListener('submit', function(e) {
    e.preventDefault();
    
    //let csrf = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    const newForm = new FormData();
    
    let row = agent.value;

    newForm.append(row)

    
    const xhr = new XMLHttpRequest();

    xhr.open('POST', '');
    xhr.send(newForm);

    
})