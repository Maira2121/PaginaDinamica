//variables y constantes
const form = document.getElementById("frmCreateGame");
const btnViewGame= document.getElementById("btnViewGame");
const g1 = document.getElementById("gamer1");
const g2 = document.getElementById("gamer2");
const g3 = document.getElementById("gamer3");

// estableciendo lo que debe hacer el evento submit del formulario.
form.addEventListener("submit", (event) => {
    event.preventDefault();
    gamer1 = g1.value;
    gamer2 = g2.value;
    gamer3 = g3.value;
    fetch("/createGame", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gamer1, gamer2, gamer3 }),

    }).then(response => response.json())
      .then(data => {
            console.log(data);
            window.location.replace(`/${data._id}/startGame`)
        }).catch(error => console.error(error));

});


