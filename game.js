// game.js
// Noah Shoap
// 7-5-23
// Implements rock, paper, scissors in JS console

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

function game() {

  // Setup outcomes map.
  setupOutcomes()

  let winCount = 0
  let lossCount = 0
  let drawCount = 0

  for (let i = 0; i < 5; ++i) {
    let playerSelection = prompt("Rock, Paper, or Scissors?")
    let computerSelection = getComputerChoice()

    let outcome = playRound(playerSelection, computerSelection)

    switch (outcome) {
      case 0:
        console.log(`${playerSelection} ties ${computerSelection}.  Draw!`)
        ++drawCount
        break
      case 1:
        console.log(`${playerSelection} beats ${computerSelection}.  You won this round!`)
        ++winCount
        break
      case 2:
        console.log(`${computerSelection} beats ${playerSelection}.  You lost this round.`)
        ++lossCount
        break
      default:
        console.log('You broke the game.')
        break
    }
  }

  console.log(`You finished a record of ${winCount} wins, ${lossCount} losses, and ${drawCount} draws.  Play again soon!`)
}

game()
