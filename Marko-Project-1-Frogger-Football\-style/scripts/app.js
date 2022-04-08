function init() {
  
  // ? elements
  //grid container
  const grid = document.querySelector('#grid')
  const spanScoreCroatia = document.querySelector('#croatia-score')
  const spanScoreEngland = document.querySelector('#england-score')
  const startButton = document.querySelector('#start')
  const endButton = document.querySelector('#end')


  // GRID 12x9
  const width = 12
  const height = 9
  const cellCount = height * width
  const cells = [] //array which holds all cells
  let countTimer
  const time = 500

  // ? Create Grid

  function createGrid () {
    // create all grid cells
    // add cells to array
    // append cells to grid
    for (let i = 0; i < cellCount; i++) {
      // create cell
      const cell = document.createElement('div')
      cell.innerText = i
      cell.id = i
      grid.appendChild(cell)
      cells.push(cell)
    }
    addKovacic(kovacicStartPosition)
    addEnglishPlayer(englishPlayerPosition[0])
    addEnglishPlayer(englishPlayerPosition[1])
    addEnglishPlayer(englishPlayerPosition[2])
    addEnglishPlayer(englishPlayerPosition[3])
    addEnglishPlayer(englishPlayerPosition[4])
    addEnglishPlayer(englishPlayerPosition[5])
    addEnglishPlayer(englishPlayerPosition[6])
    addEnglishPlayer(englishPlayerPosition[7])
    addEnglishPlayer(englishPlayerPosition[8])
    addEnglishPlayer(englishPlayerPosition[9])
    addEnglishPlayer(englishPlayerPosition[10])
    addGoalLeft(goalLeftStartingPosition)
    addGoalRight(goalRightStartingPosition)
  }

  function startGame() {
    startButton.disabled = true
    endButton.disabled = false
    clearInterval(countTimer)
    countTimer = setInterval(() => {
      // console.log('setInterval check')
      for (let i = 0; i < englishPlayerPosition.length; i++) {
        let currentDefenderPosition = englishPlayerPosition[i]

        removeEnglishPlayer(currentDefenderPosition)

        if (i === 0) {
          // accessing goalkeeper
          // console.log(`moving goalkeeper. currentDefenderPosition: ${currentDefenderPosition}`)
          currentDefenderPosition = (currentDefenderPosition === 17 ? 18 : 17)
        } else if (i > 0 && i < 5) {
          //accessing defensive line
          // console.log('defensive line active')
          if (currentDefenderPosition % 3 === 1) {
            currentDefenderPosition += (Math.floor(Math.random() * 2) === 0) ? -1 : 1
            // accessing central defender position to randomly move right or left
          } else if (currentDefenderPosition % 3 === 0) {
            //left position
            currentDefenderPosition += 1
          } else if (currentDefenderPosition % 3 === 2) {
            // right position
            currentDefenderPosition -= 1
          }
        } else {
          // accessing mids and forwards who are both in a line of 3.
          if (currentDefenderPosition % 4 === 1) {
            currentDefenderPosition += (Math.floor(Math.random() * 2) === 0) ? -1 : 1
          } else if (currentDefenderPosition % 4 === 2) {
            if (Math.floor(Math.random() * 2) === 0) {
              currentDefenderPosition -= 1
            } else {
              currentDefenderPosition += 1
            }
          } else if (currentDefenderPosition % 4 === 0) {
            currentDefenderPosition += 1
          } else if (currentDefenderPosition % 4 === 3) {
            currentDefenderPosition -= 1
          }
        }
        englishPlayerPosition[i] = currentDefenderPosition              
        addEnglishPlayer(currentDefenderPosition)
      }
      collision()
    }, time)
  }

  function endGame () {
    endButton.disabled = true
    startButton.disabled = false
    window.alert(`the final score, Croatia: ${spanScoreCroatia.innerHTML} England: ${spanScoreEngland.innerHTML}`)
    spanScoreCroatia.innerHTML = 0
    spanScoreEngland.innerHTML = 0
    clearInterval(countTimer)
  }


  // characters
  const kovacicClass = 'kovacic'
  const kovacicStartPosition = 101
  let kovacicCurrentPosition = kovacicStartPosition

  const englishPlayersClass = 'english-players'
  const englishPlayerPosition = []
  englishPlayerPosition[0] = 17
  englishPlayerPosition[1] = 37
  englishPlayerPosition[2] = 40
  englishPlayerPosition[3] = 43
  englishPlayerPosition[4] = 46
  englishPlayerPosition[5] = 62
  englishPlayerPosition[6] = 66
  englishPlayerPosition[7] = 70
  englishPlayerPosition[8] = 85
  englishPlayerPosition[9] = 89
  englishPlayerPosition[10] = 93

  const goalClassLeft = 'goal-left'
  const goalLeftStartingPosition = 5
  const goalClassRight = 'goal-right'
  const goalRightStartingPosition = 6

  // Add and remove character functions
  function addKovacic(position) {
    cells[position].classList.add(kovacicClass)
  }

  function removeKovacic(position) {
    cells[position].classList.remove(kovacicClass)
  }

  function addEnglishPlayer(position) {
    cells[position].classList.add(englishPlayersClass)
  }

  function removeEnglishPlayer(position) {
    cells[position].classList.remove(englishPlayersClass)
  }

  function addGoalLeft(position) {
    cells[position].classList.add(goalClassLeft)
  }

  function addGoalRight(position) {
    cells[position].classList.add(goalClassRight)
  }

  // ? Execution

  // 

  // executed on 'keydown'
  // when a key is pressed Kovacic will move in that direction
  //disable leaving the grid
  function executeKeyDown(event) {
    const key = event.keyCode
    console.log(key)
    const left = 37
    const up = 38
    const right = 39
    const down = 40

    removeKovacic(kovacicCurrentPosition)

    if (key === left && kovacicCurrentPosition % width !== 0) {
      kovacicCurrentPosition--
    } else if (key === up && kovacicCurrentPosition >= width) {
      kovacicCurrentPosition -= 12
    } else if (key === right && kovacicCurrentPosition % width !== width - 1) {
      kovacicCurrentPosition++
    } else if (key === down && kovacicCurrentPosition < width * 8) {
      kovacicCurrentPosition += 12
    } else {
      console.log('invalid key, press either up, dowm right, left')
    }

    addKovacic(kovacicCurrentPosition)
    collision()
    croatiaScore()
  }

  // add function for collision
  function collision() {
    for (let i = 0; i < englishPlayerPosition.length; i++) {
      if (englishPlayerPosition[i] === kovacicCurrentPosition) {
        spanScoreEngland.innerHTML = parseInt(spanScoreEngland.innerHTML) + 1
      }
    }
  }

  function croatiaScore() {
    if (kovacicCurrentPosition === 5 || kovacicCurrentPosition === 6) {
      spanScoreCroatia.innerHTML = parseInt(spanScoreCroatia.innerHTML) + 1
      removeKovacic(kovacicCurrentPosition)
      kovacicCurrentPosition = kovacicStartPosition
      addKovacic(kovacicCurrentPosition)
    }

  }

  // ? events
  

  // key press event (using keydown for rapid acceleration
  createGrid()
  document.addEventListener('keydown', executeKeyDown) 
  startButton.addEventListener('click', startGame)
  endButton.addEventListener('click', endGame)
}


document.addEventListener('DOMContentLoaded', init)


// * function to run game
// * function for defenders moving - they are not moving, they are flashing on and off
// * just move defenders using remove and add functions using setInterval method
// * refactor englishPlayerPosition[i] = currentDefenderPosition
// * Croatia score
// * hook up start buttons - disable start button after pressed
// * end button - triggers creategrid function again, end button disabled until start button pressed
// * startGame function - when doing it second time around the grid updates x2.

// ! ISSUES:
// ! prevent screen from moving up and down when pressing arrow keys for kovacic to move
// ! refactor collision() to be forEach() = google javascript turn for loop into forEach
// ! refactor appicable code to ternary function.
// ! Have a timer for 90 minutes
