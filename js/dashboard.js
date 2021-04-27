const html = document.documentElement;
const body = document.body;
const menuLinks = document.querySelectorAll(".admin-menu a");
const collapseBtn = document.querySelector(".admin-menu .collapse-btn");
const switchInput = document.querySelector(".switch input");
const switchLabel = document.querySelector(".switch label");
const switchLabelText = switchLabel.querySelector("span:last-child");
const collapsedClass = "collapsed";
const lightModeClass = "light-mode";
const clueTimes = 3;
const table = document.getElementById('pastime');

/*TOGGLE HEADER STATE*/
collapseBtn.addEventListener("click", function () {
    body.classList.toggle(collapsedClass);
    this.getAttribute("aria-expanded") === "true"
        ? this.setAttribute("aria-expanded", "false")
        : this.setAttribute("aria-expanded", "true");
    this.getAttribute("aria-label") === "collapse menu"
        ? this.setAttribute("aria-label", "expand menu")
        : this.setAttribute("aria-label", "collapse menu");
});

/*SHOW TOOLTIP ON MENU LINK HOVER*/
for (const link of menuLinks) {
    link.addEventListener("mouseenter", function () {
        if (
            body.classList.contains(collapsedClass) &&
            window.matchMedia("(min-width: 768px)").matches
        ) {
            const tooltip = this.querySelector("span").textContent;
            this.setAttribute("title", tooltip);
        } else {
            this.removeAttribute("title");
        }
    });
}

/*TOGGLE LIGHT/DARK MODE*/
if (localStorage.getItem("dark-mode") === "false") {
    html.classList.add(lightModeClass);
    switchInput.checked = false;
    switchLabelText.textContent = "Light";
}

switchInput.addEventListener("input", function () {
    html.classList.toggle(lightModeClass);
    if (html.classList.contains(lightModeClass)) {
        switchLabelText.textContent = "Light";
        localStorage.setItem("dark-mode", "false");
    } else {
        switchLabelText.textContent = "Dark";
        localStorage.setItem("dark-mode", "true");
    }
});

/* PRACTICE SCRIPT */
let http_request = false;
let dictionary = null;
let temp_clues = clueTimes;

function readDictionary(){
    http_request = false;
    if (window.XMLHttpRequest) {
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/xml');
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }
    if (!http_request) {
        alert('Falla :( No es posible crear una instancia XMLHTTP');
        return false;
    }
    http_request.onreadystatechange = loadContent;
    http_request.open('GET', 'https://ordenalfabetix.unileon.es/aw/diccionario.txt', true);
    http_request.send();
}

function loadContent() {

    if (http_request.readyState === 4) {
        if (http_request.status === 200) {
            dictionary = http_request.responseText;
        } else {
            alert('Hubo problemas con la petición.');
        }
    }

    document.getElementById('counter').innerHTML = temp_clues;
}

function searchClue(){

    let searchTerm = document.getElementById('searchterm').value.toLowerCase();
    let out = [];
    let flag = [];

    searchTerm = Array.from(searchTerm);

    if(searchTerm.length === 0){
        document.getElementById('cluesArea').innerHTML = 'Cadena de busqueda erronea';
        return null;
    }

    if(temp_clues === 0) {
        alert('No te quedan pistas :(');
        document.getElementById('cluesArea').innerHTML = "";
        return null;
    }


    const clues = dictionary.split('\n');
    for(let i = 0; i < clues.length; i++){
        flag.splice(0, flag.length);
        for(let j = 0; j < searchTerm.length; j++){
            if(!clues[i].includes(searchTerm[j]))
                flag.push(1);
        }

        if(flag.length === 0)
            out.push(clues[i]);
    }

    document.getElementById('cluesArea').innerHTML = out.join('\n');
    temp_clues -= 1;
    document.getElementById('counter').innerHTML = temp_clues;
}

function readTable(){

    const tableRows = table.rows;
    console.log(tableRows);
    for(let i = 0; i < tableRows.length; i++){
        for(let j = 0; j < tableRows[i].children.length -1 ; j++){
            console.log(tableRows[i].children[j].children[0].value);
        }
    }
}

function checkWord(row){
    let word = [];
    for(let i = 0; i < table.rows[row].children.length -1; i++){
        word.push(table.rows[row].children[i].children[0].value);
    }
    word = word.join('').toLowerCase();

    switch (row) {
        case 0:
            if(word === 'clan'){
                for(let i = 0; i < table.rows[row].children.length - 1; i++){
                    table.rows[row].children[i].children[0].style.backgroundColor = '#c3f6c3';
                }
            }else{
                for(let i = 0; i < table.rows[row].children.length - 1; i++) {
                    table.rows[row].children[i].children[0].style.backgroundColor = '#f5b3be';
                }
            }
            break;
        case 5:
            if(word === 'pena'){
                for(let i = 0; i < table.rows[row].children.length - 1; i++){
                    table.rows[row].children[i].children[0].style.backgroundColor = '#c3f6c3';
                }
            }else{
                for(let i = 0; i < table.rows[row].children.length - 1; i++) {
                    table.rows[row].children[i].children[0].style.backgroundColor = '#f5b3be';
                }
            }
            break;
        case 6:
            if(word === 'remato'){
                for(let i = 0; i < table.rows[row].children.length - 1; i++){
                    table.rows[row].children[i].children[0].style.backgroundColor = '#c3f6c3';
                }
            }else{
                for(let i = 0; i < table.rows[row].children.length - 1; i++) {
                    table.rows[row].children[i].children[0].style.backgroundColor = '#f5b3be';
                }
            }
            break;
        case 11:
            if(word === 'torero'){
                for(let i = 0; i < table.rows[row].children.length - 1; i++){
                    table.rows[row].children[i].children[0].style.backgroundColor = '#c3f6c3';
                }
            }else{
                for(let i = 0; i < table.rows[row].children.length - 1; i++) {
                    table.rows[row].children[i].children[0].style.backgroundColor = '#f5b3be';
                }
            }
            break;
        default:
            if(checkDictionary(word) && checkPrevious(word, row)){
                for(let i = 0; i < table.rows[row].children.length - 1; i++){
                    table.rows[row].children[i].children[0].style.backgroundColor = '#c3f6c3';
                }
            }else{
                for(let i = 0; i < table.rows[row].children.length - 1; i++) {
                    table.rows[row].children[i].children[0].style.backgroundColor = '#f5b3be';
                }
            }
    }
}

function checkDictionary(word) {
    let words = dictionary.split('\n');
    for(let i = 0; i < words.length; i++){
        if(word === words[i])
            return true;
    }
    return false;
}

function checkPrevious(word, row){
//TODO
}

function nextCell(row, pos){
    if (event.keyCode !== 8) {
        switch (row) {
            case 0: //Next
            case 1: //Next
            case 2: //Next
            case 3: //Next
            case 4: //Next
            case 5:
                if (pos !== 3) {
                    table.rows[row].children[pos + 1].children[0].focus();
                } else if (pos === 3) {
                    table.rows[row + 1].children[0].children[0].focus();
                }
                break;
            case 6: //Next
            case 7: //Next
            case 8: //Next
            case 9: //Next
            case 10:
                if (pos !== 5) {
                    table.rows[row].children[pos + 1].children[0].focus();
                } else if (pos === 5) {
                    table.rows[row + 1].children[0].children[0].focus();
                }
                break;
            case 11:
                if (pos !== 5) {
                    table.rows[row].children[pos + 1].children[0].focus();
                } else if (pos === 5) {
                    table.rows[0].children[0].children[0].focus();
                }
                break;
        }
    }
}



