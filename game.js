// game.js
// Noah Shoap
// 7-5-23
// Implements rock, paper, scissors in JS console

const winNode = document.querySelector(".wins")
const lossNode = document.querySelector(".losses")
const tieNode = document.querySelector(".ties")
const resultNode = document.querySelector(".result")

const buttons = document.getElementsByTagName("button")

for (const button of buttons) {
    button.addEventListener('click', buttonClicked);
}

const choices = ['Rock', 'Paper', 'Scissors']
const outcomeMap = new Map()

function getRandomInt(max = choices.length) {
  return Math.floor(Math.random() * max)
}

function getComputerChoice() {
  return choices[getRandomInt()]
}

function setupOutcomes() {
  outcomeMap.set('Scissors', 'Paper')
  outcomeMap.set('Paper', 'Rock')
  outcomeMap.set('Rock', 'Scissors')
}

function playRound(playerSelection, computerSelection) {
  // Validate that our player's choice is valid.
  if (outcomeMap.has(playerSelection) === false)
    throw new Error(`Choice ${playerSelection} is not a valid choice.`)

  // Check for a tie.
  if (playerSelection === computerSelection) {
    return 0
  }

  // Otherwise, check if we won or lost this round.
  if (outcomeMap.get(playerSelection) === computerSelection) {
    return 1
  } else {
    return 2
  }
}

// Setup outcomes map.
setupOutcomes()

let winCount = 0
let lossCount = 0
let drawCount = 0

function buttonClicked(event) {
    let playerSelection = this.dataset.value;
    let computerSelection = getComputerChoice();

    let outcome = playRound(playerSelection, computerSelection)

    resultNode.classList.remove('lost');
    resultNode.classList.remove('won');
    resultNode.classList.remove('draw');

    switch (outcome) {
        case 0:
            resultNode.innerText = `${playerSelection} ties ${computerSelection}.  Draw!`;
            resultNode.classList.add('draw');
            ++drawCount
            break
        case 1:
            resultNode.innerText = `${playerSelection} beats ${computerSelection}.  You won this round!`;
            resultNode.classList.add('won');
            ++winCount
            break
        case 2:
            resultNode.innerText = `${computerSelection} beats ${playerSelection}.  You lost this round.`;
            resultNode.classList.add('lost');
            ++lossCount
            break
        default:
            resultNode.innerText = `You broke the game.`
            break
    }

    winNode.innerText = `Wins ${winCount}`;
    lossNode.innerText = `Losses ${lossCount}`;
    tieNode.innerText = `Ties ${drawCount}`;
}