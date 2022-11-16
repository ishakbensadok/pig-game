'use strict';
/*  selecting elements */
const btnNewGame = document.querySelector('.new-game');
const btnRollDice = document.querySelector('.roll-dice');
const btnHold = document.querySelector('.hold');
const dice = document.querySelector('.dice');

let totalScore = 0;
let Score = 0;
let currPlayer = 1;
let playing = true;
let Player = document.querySelector('.player-1');
/* ----------------------- Functions --------------------------------------------- */
const switchPlayer = function () {
  Score = 0;
  Player.querySelector('.current-score').textContent = Score;
  Player.classList.remove('current-player');
  currPlayer = currPlayer === 1 ? 2 : 1;
  Player = document.querySelector(`.player-${currPlayer}`);
  Player.classList.add('current-player');
  totalScore = Number(Player.querySelector('.total-score').textContent);
};
const resetAll = function () {
  Score = 0;
  totalScore = 0;
  playing = true;
  dice.classList.add('hidden');
  Player.classList.remove('winner');
  Player.classList.remove('current-player');
  currPlayer = 1;
  Player = document.querySelector(`.player-${currPlayer}`);
  Player.classList.add('current-player');
  // rest totalscores & current scores
  let temp = document.querySelectorAll('.total-score');
  for (let i = 0; i < temp.length; i++) temp[i].textContent = totalScore;
  temp = document.querySelectorAll('.current-score');
  for (let i = 0; i < temp.length; i++) temp[i].textContent = Score;
};
/* ----------------------- EVENTS --------------------------------------------- */
/* ****** button roll dice event ****** */
btnRollDice.addEventListener('click', function () {
  if (playing) {
    dice.classList.remove('hidden'); /* make the dice visible */
    const SecretDice = Math.trunc(Math.random() * 6 + 1);
    dice.src = `dice-${SecretDice}.png`;
    if (SecretDice !== 1) {
      Score += SecretDice;
      Player.querySelector('.current-score').textContent = Score;
    } else switchPlayer();
  }
});
/* ****** button  Hold event ****** */
btnHold.addEventListener('click', function () {
  if (playing) {
    totalScore += Score;
    Player.querySelector('.total-score').textContent = totalScore;
    if (totalScore < 100) switchPlayer();
    else {
      dice.classList.add('hidden');
      Player.classList.add('winner');
      Player.classList.remove('current-player');
      playing = false;
    }
  }
});
/* button new game event ;;*/
btnNewGame.addEventListener('click', resetAll);

