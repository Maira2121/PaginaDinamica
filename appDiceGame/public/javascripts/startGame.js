// variables y constantes
const btnStart = document.getElementById("btn-start-game")
const gamers = document.querySelectorAll("#gamers-container .gamer-item")
//función para generar un número aleatorio del 1 al 6.
function generateRandomNumber() {
    return Math.floor(Math.random() * 6) + 1;
}
// función que se conecta con el controlador para actualizar el juego una vez jugado.
function saveGame (gamerId, gamerName, scores) {
    const gameIdElement = document.getElementById("idGame");
    const idGame = gameIdElement.value;
    const data = { id: gamerId, name: gamerName, scores }

    fetch("/game/update/" + idGame, {
        method: "put",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
        
    })
        .then(function (response) {
            response
                .text()
                .then(function (text) {
                    if (text) {
                        alert(text);
                        window.location.href = "/games"
                    } else {
                        alert("No se guardó el registro");
                    }
                })
                .catch(function () { });
        })
        .catch(function (error) { });
}

// programando el evento clic del botó iniciar.
btnStart.onclick = function () {
    const gamersScores = []
    let max = 0;
    for (let i = 0; i < gamers.length; i++) {
        let gamer = gamers[i];
        let score = gamer.querySelector(".score");
        let rollDice = generateRandomNumber();
        score.innerHTML = rollDice;
        gamersScores.push(rollDice)
    }
    gamersScores.forEach(function(number){
        if (number > max){
            max = number;
        }
    })
    // función para establecer lo que debe hacer en el tiempo de espera
    setTimeout(() => {
        let counter = 0;
        gamersScores.forEach(function(number){
            if (number === max) {
                counter++;
            }
        })
        if (counter>=2){
            alert("¡Empate! Vuelve a tirar los dados.");
        }else {
            let winnerIndex = gamersScores.findIndex(function (num) {
                return num === max;
            })
            console.log(gamersScores)
            const winnerElemnt = gamers[winnerIndex];
            const winnerName = winnerElemnt.querySelector(".gamer-name")
            const name = winnerName.innerText;
            const id = winnerElemnt.querySelector(".idGamer");
            saveGame(id.value, name, gamersScores)
        }
    }, 50);
}