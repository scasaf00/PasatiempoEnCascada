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

