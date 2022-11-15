'use strict';
/*  selecting elements */
const btnNewGame = document.querySelector('.new-game');
const btnRollDice = document.querySelector('.roll-dice');
const btnHold = document.querySelector('.hold');
const dice = document.querySelector('.dice');

let totalScore = 0;
let Score = 0;
let currPlayer = 1;
/* ********************************************************** */
let Player = document.querySelector('.player-1');
let PlayerCurrentScore = document.querySelector('.current-score-1');
let PlayerTotalScore = document.querySelector('.total-score-1');

/* implementing random dice */
const SecretDice = function () {
  return Math.trunc(Math.random() * 6 + 1);
};
/* ----------------------- Functions --------------------------------------------- */
const currentPlayerStateChange = function () {
  currPlayer = currPlayer === 1 ? 2 : 1;
  Player = document.querySelector(`.player-${currPlayer}`);
  PlayerCurrentScore = document.querySelector(`.current-score-${currPlayer}`);
  PlayerTotalScore = document.querySelector(`.total-score-${currPlayer}`);
};
const switchPlayer = function () {
  Score = 0;
  PlayerCurrentScore.textContent = Score;
  Player.classList.remove('current-player');
  currentPlayerStateChange();
  Player.classList.add('current-player');
  totalScore = Number(PlayerTotalScore.textContent);
};
const resetAll = function () {
  Score = 0;
  totalScore = 0;
  dice.classList.add('hidden');
  Player.classList.remove('winner');
  if (currPlayer !== 1) {
    Player.classList.remove('current-player');
    currentPlayerStateChange();
    Player.classList.add('current-player');
  }
  // rest totalscores & current scores
  let temp = document.querySelectorAll('.player__total-score');
  for (let i = 0; i < temp.length; i++) temp[i].textContent = totalScore;
  temp = document.querySelectorAll('.current-score');
  for (let i = 0; i < temp.length; i++) temp[i].textContent = Score;
};
/* ----------------------- EVENTS --------------------------------------------- */
/* ****** button roll dice event ****** */
btnRollDice.addEventListener('click', function () {
  if (totalScore >= 100) return;
  dice.classList.remove('hidden'); /* make the dice visible */
  const SecretDiceResult = SecretDice();
  dice.src = `dice-${SecretDiceResult}.png`;
  if (SecretDiceResult !== 1) {
    Score += SecretDiceResult;
    PlayerCurrentScore.textContent = Score;
  } else {
    switchPlayer();
  }
});
/* ****** button  Hold event ****** */
btnHold.addEventListener('click', function () {
  if (totalScore < 100) totalScore += Score;
  if (totalScore < 100) {
    PlayerTotalScore.textContent = totalScore;
    switchPlayer();
  } else {
    PlayerTotalScore.textContent = totalScore;
    dice.classList.add('hidden');
    Player.classList.add('winner');
  }
});
/* button new game event ;;*/
btnNewGame.addEventListener('click', resetAll);
