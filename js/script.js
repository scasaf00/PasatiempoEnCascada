const btn = document.querySelector(".btn");

btn.addEventListener("mousemove", (e) =>{
    const xPos = e.pageX - e.target.offsetLeft;
    const yPos = e.pageY - e.target.offsetTop;

    e.target.style.setProperty("--x", `${xPos}px`);
    e.target.style.setProperty("--y", `${yPos}px`);
});

btn.addEventListener("onclick", (e) =>{
    e.
})

function agora(){
    window.open("https://agora.unileon.es")
}

function cambiarTema(){



    let theme = document.getElementById("tema");

    if (theme.getAttribute("href") === "../css/darkMode.css"){
        theme.href = "../css/lightMode.css";
    }else {
        theme.href = "../css/darkMode.css";
    }
}

var localStorage = false;

function cookie(){
    localStorage = confirm("Esta pagina puede utilizar cookies propias para el guardado local de su pasatiempo.");
}

function borrarCookie(){

}