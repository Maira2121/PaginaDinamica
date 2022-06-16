/**
 * Este archivo contiene las principales rutas de la aplicación.
 * @version 1.0.0
 * @module controller/index
 * @author Maira Bastdas Gómez <maira2121@gmail.com>.
 * @version 1.0.0
 * @since 1.0.0
 */
/**
 * Variales y constantes.
 */
var express = require('express');
var router = express.Router();


router.use(express.json());

/* se importa el modelo para que esté disponible para manipular los datos de la BD. */
require('./database');
const Game = require('../models/Game');

/* con esta función se obtiene la página de inicio. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Dice game' });
});

/* con esta función se obtiene y luego se muestra la página con el formulario para crear el juego. */
router.get('/createGame', (req, res, next) => {
  res.render('create', { title: 'Create game' })
});

/* con esta función se crean los juegos.
Recibe los datos enviados por el formulario a través de fetch y se almacenan en la BD */
router.post('/createGame', async (req, res, next) => {
  const { gamer1, gamer2, gamer3 } = req.body;
  const gamers = new Array;
  gamers.push({ name: gamer1 }, { name: gamer2 }, { name: gamer3 })
  const newGame = new Game({ gamers });
  await newGame
    .save()
    .then(result => res.json(result))
    .catch(err => res.json(err));

});

/**
 * Esta función actualiza los datos de un juego cuando ya se ha finalizado, adicionando el ganador
 * y los puntajes de cada jugador.
 */
router.put('/game/update/:id', async (req, res, next) =>{
  const id = req.params.id;
  const game = await Game.findById(id)  
    .then(function(game){
      game.winner ={ id: req.body.id, name: req.body.name }
      game.gamers[0].score = req.body.scores[0]
      game.gamers[1].score = req.body.scores[1]
      game.gamers[2].score = req.body.scores[2]
      game.inProgress = false;
      game.save()
        .then(function(){
          res.send("Felicidades "+game.winner.name+", eres el ganador!");
        })
        .catch(function(err){
          res.send(err)
        })
    })
    .catch(function(err){
      res.send(err)
    })
});

/**
 * Esta función muestra la página de la lista de juegos. 
 */
router.get('/games', async (req, res, next) => {
  const games = await Game.find();
  res.render('games', { games });
});

/**
 * Esta función muestra la página de un juego. 
 */
router.get('/game/:id', async (req, res, next) => {
  const id = req.params.id;
  const game = await Game.findById(id)
    .catch(err => res.json(err));
  res.render('game', { game, title: 'Game' })
})

/**
 * Esta función muestra la página para iniciar el juego. 
 */
router.get('/:id/startGame', async (req, res, next) => {
  const id = req.params.id;
  const game = await Game.findById(id)
  res.render('startGame', { game })

});

/**
 * Esta función muestra la página del ganador. 
 */
router.get('/game/:id/winner', async (req, res, next) => {
  const id = req.params.id;
  const game = await Game.findById(id)
  res.render('winner', { game })

});

/**
 * Se exporta el módulo
 */
module.exports = router;
