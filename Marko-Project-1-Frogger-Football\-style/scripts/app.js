function init() {
  
  // ? elements
  //grid container
  const grid = document.querySelector('#grid')

  // GRID 12x9
  const width = 12
  const height = 9
  const cellCount = height * width
  const cells = [] //array which holds all cells
  let countTimer
  let time = 500

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

    countTimer = setInterval(() => {
      // console.log('setInterval check')
      for (let i = 0; i < englishPlayerPosition.length; i++) {
        let currentDefenderPosition = englishPlayerPosition[i]

        removeEnglishPlayer(currentDefenderPosition)

        if (i === 0) {
          // accessing goalkeeper
          // console.log(`moving goalkeeper. currentDefenderPosition: ${currentDefenderPosition}`)
          currentDefenderPosition = currentDefenderPosition === 17 ? 18 : 17
          englishPlayerPosition[i] = currentDefenderPosition
        } else if (i > 0 && i < 5) {
          //accessing defensive line
          console.log('defensive line active')
          if (currentDefenderPosition % 3 === 1) {
            // accessing central defender position to randomly move right or left
            if (Math.floor(Math.random() * 2) === 0) {
              currentDefenderPosition -= 1
              englishPlayerPosition[i] = currentDefenderPosition
            } else {
              currentDefenderPosition += 1
              englishPlayerPosition[i] = currentDefenderPosition              
            }
          } else if (currentDefenderPosition % 3 === 0) {
            //left position
            currentDefenderPosition += 1
            englishPlayerPosition[i] = currentDefenderPosition
          } else if (currentDefenderPosition % 3 === 2) {
            // right position
            currentDefenderPosition -= 1
            englishPlayerPosition[i] = currentDefenderPosition
          }
        } else {
          // accessing mids and forwards who are both in a line of 3.
          if (currentDefenderPosition % 4 === 1) {
            if (Math.floor(Math.random() * 2) === 0) {
              currentDefenderPosition -= 1
              englishPlayerPosition[i] = currentDefenderPosition
            } else {
              currentDefenderPosition +=1
              englishPlayerPosition[i] = currentDefenderPosition
            }
          }
          else if (currentDefenderPosition % 4 === 2) {
            if (Math.floor(Math.random() * 2) === 0) {
              currentDefenderPosition -= 1
              englishPlayerPosition[i] = currentDefenderPosition
            } else {
              currentDefenderPosition += 1
              englishPlayerPosition[i] = currentDefenderPosition
            }
          } else if (currentDefenderPosition % 4 === 0) {
            currentDefenderPosition += 1
            englishPlayerPosition[i] = currentDefenderPosition
          } else if (currentDefenderPosition % 4 === 3) {
            currentDefenderPosition -= 1
            englishPlayerPosition[i] = currentDefenderPosition
          }
          
        }

        addEnglishPlayer(currentDefenderPosition)
      }
    }, time)
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
  }


  // ? events
  // key press event (using keydown for rapid acceleration
  document.addEventListener('keydown', executeKeyDown)
  createGrid()

}






document.addEventListener('DOMContentLoaded', init)


// function to run game {
// function for defenders moving - they are not moving, they are flashing on and off
// every second square, so you have a defender in every cell but they give the appeareance
// of moving
// just move defenders using remove and add functions using setInterval method
// }