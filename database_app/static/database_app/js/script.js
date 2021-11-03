// Создание кнопки для добавления столбца
let allTr = document.querySelectorAll("tr");
const buttonColumn = document.createElement('td');
buttonColumn.classList.add("buttonColumn");
buttonColumn.style.visibility = 'hidden';
allTr[0].append(buttonColumn);
/*-------------------------------------*/

buttonColumn.addEventListener('click', function() {
    let allTr = document.querySelectorAll("tr");
    for (let i = 0; i < allTr.length; i++) {
        let newTd = document.createElement('td');
        let input = document.createElement('input');
        newTd.append(input);
        if (i == 0) {
            let allTd = allTr[i].querySelectorAll('td');
            allTd[allTd.length - 2].after(newTd);
        } else {
            allTr[i].append(newTd);
        }

    }
});


const buttonRow = document.querySelector('.buttonRow');
buttonRow.addEventListener('click', function() {
    let newTr = document.createElement('tr');
    let lastTr = document.querySelectorAll('tr')[document.querySelectorAll('tr').length - 1];
    lastTr.after(newTr);
    for (let i = 0; i < lastTr.querySelectorAll('td').length; i++) {
        let newTd = document.createElement('td');
        let input = document.createElement('input');
        newTd.append(input);
        newTr.append(newTd);
    }
});

buttonColumn.addEventListener('click', function() {

})

const buttonChange = document.querySelector(".button_change");
let access = 0;

buttonChange.addEventListener('click', function() {
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
                if (allTd[j].className != 'buttonColumn') {
                    let tdText = String(allTd[j].childNodes[0].value).trim();
                    allTd[j].childNodes[0].remove();
                    allTd[j].innerHTML = tdText;
                }
            }
        }
    }
});


