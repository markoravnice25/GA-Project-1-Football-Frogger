//TODO: (1) ----------------- set up initialization of page ------------------

//TODO (1a) create initialization function upon browser window loading
//* (1b at bottom of page) call the function at the bottom of the Javascript

function init() {

  //TODO: (2) ---------------- Create variables/elements ---------------------
  
  //TODO: (2a) HEADER elements
  //* Create global variables for score; star/end buttons; level buttons
  //* access elements from INDEX.html

  const spanScoreCroatia = document.querySelector('#croatia-score')
  const spanScoreEngland = document.querySelector('#england-score')
  const startButton = document.querySelector('#start')
  const endButton = document.querySelector('#end')
  const levelOne = document.querySelector('#level-one')
  const levelTwo = document.querySelector('#level-two')
  const levelThree = document.querySelector('#level-three')

  //TODO: (2b) Create GRID CELLS variables/elements
  //* create GRID variables to create Grid and CELLS.
  
  const grid = document.querySelector('#grid')
  const width = 12
  const height = 9
  const cellCount = height * width
  const cells = [] //array which holds all cells

  //TODO: (2c) Create CHARACTER elements/variables for GRID
  //* Kovacic: (a) create KovacicClass variable to be used in CSS; (b) KovacicStartPosition for grid Display; (c) let kovacicCurrentPosition (will be moving in executeKeyDown function) = kovacicStartPosition
  //* English players: (a) create englishPlayerClass to be used in CSS; (b) create englishPlayerPosition[] array; (c) assign 11 array positions
  //* assign array positions for englishPlayerPosition[] starting positions.

  const goalClassLeft = 'goal-left'
  const goalLeftStartingPosition = 5
  const goalClassRight = 'goal-right'
  const goalRightStartingPosition = 6
  
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

  //TODO: (2d) Create TIME variables for keeping track of game time
  //* timer; timerEnglishPlayerSpeed; liveTimeTimer; time default is 700

  const timer = document.querySelector('#timer')
  let timerEnglishPlayerSpeed
  let liveTimeTimer
  let time = 700

  //TODO: (3) ------------------ initial GRID creation EXECUTION ----------------------

  //TODO: (3a) executions for adding/removing CHARACTERS to/from STARTING GRID
  //* Functions for adding/removing previously created classes for characters to give 'moving' appearance.
  //* originally, these functions are used to set the positions of characters on the grid. After they are used ofr a 'moving' appearance.

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

  //TODO: (3b) Execution for creating starting Grid
  //* function which is called as soon as browser window is loaded.
  //* disable endButton() and startButton()
  //* for Loop iterating for less than the cellCount; create cell variable = document.createElement('div')
  //* appendChild and push to back of cells array
  //* add characters to their starting positions: Kovacic, English players, Goal.


  function createGrid () {
    endButton.disabled = true
    startButton.disabled = true
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      // cell.innerText = i
      // cell.id = i
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

  //TODO: (3c) Execution for ASSIGNING levels to play game at:
  //* enable startButton as level has been chosen
  //* set time variable according to level chosen

  function levelOneChosen() {
    startButton.disabled = false
    time = 700
  }
  function levelTwoChosen() {
    time = 500
    startButton.disabled = false
  }
  function levelThreeChosen() {
    time = 300
    startButton.disabled = false
  }

  //TODO: (4) ------------------- LIVE GAME EXECUTIONS: ---------------------

  //TODO (4a) STARTING the game
  //* called by document.addEventListener('click', startButton)
  //* call executeKeyDown function upon keydown press for Kovacic movement
  //* disable start button, enable end button
  //* setInterval() for liveTimeTimer to display live time and end game at certain period.
  //* clearInterval for timerEnglishPlayerSpeed and then  assign setInterval to timerEnglishPlayerSpeed 
  //* for loop to loop through englishPlayerPosition.length; removeEnglishPlayer(currentDefenderPosition); use if/else statements to generate movement of English players; addEnglishPlayer(currentDefenderPosition)
  //* call collisionEnglandScore() function
  //* apply time variable at end of setInterval for speed of English player movement.

  function startGame() {
    document.addEventListener('keydown', executeKeyDown) // called in startGame() function so that Kovacic can only move once game has started, not before
    startButton.disabled = true
    endButton.disabled = false

    liveTimeTimer = setInterval(liveTime, 100)

    clearInterval(timerEnglishPlayerSpeed)
    timerEnglishPlayerSpeed = setInterval(() => {
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
            //left position - send player right
            currentDefenderPosition += 1
          } else if (currentDefenderPosition % 3 === 2) {
            // right position - send player left
            currentDefenderPosition -= 1
          }
        } else {
          // accessing mids and forwards who are both in a line of 3.
          if (currentDefenderPosition % 4 === 1) {
            currentDefenderPosition += (Math.floor(Math.random() * 2) === 0) ? -1 : 1
          } else if (currentDefenderPosition % 4 === 2) {
            currentDefenderPosition += (Math.floor(Math.random() * 2) === 0) ? -1 : 1
          } else if (currentDefenderPosition % 4 === 0) {
            currentDefenderPosition += 1
          } else if (currentDefenderPosition % 4 === 3) {
            currentDefenderPosition -= 1
          }
        }
        englishPlayerPosition[i] = currentDefenderPosition              
        addEnglishPlayer(currentDefenderPosition)
      }
      collisionEnglandScore()
    }, time)
  }

  //TODO: (4b) ENDING the game
  //* document.removeEventListener('keydown', executeKeyDown)
  //* disable end button and (keep startButton disabled)
  //* window alert with end result.
  //* reset spanScore's to 0.
  //* clearInterval for 'timerEnglishPlayerSpeed' and 'liveTimeTimer'
  //* removeKovacic(kovacicCurrentPosition); place in kovacicStartPosition; addKovacic(kovacicCurrentPosition).
  //* reset timer.innerHTML to 00:00

  function endGame () {
    document.removeEventListener('keydown', executeKeyDown)
    endButton.disabled = true
    window.alert(`the final score, Croatia: ${spanScoreCroatia.innerHTML} England: ${spanScoreEngland.innerHTML}`)
    spanScoreCroatia.innerHTML = 0
    spanScoreEngland.innerHTML = 0
    clearInterval(timerEnglishPlayerSpeed)
    clearInterval(liveTimeTimer)
    removeKovacic(kovacicCurrentPosition)
    kovacicCurrentPosition = kovacicStartPosition
    addKovacic(kovacicCurrentPosition)
    timer.innerHTML = '00:00'
  }

  //TODO: (4c) Kovacic MOVEMENT using arrow keys
  //* variable for event.keycode; set left, right, up, down keys as variables for number key codes.
  //* removeKovacic(kovacicCurrentPosition)
  //* if/else statements for arrow key pressed and consequent movement of Kovacic; separate window alerts for incorrect key and moving out of grid - move Kovacic to starting position.
  //* addKovacic(kovacicCurrentPosition)
  //* call collisionEnglandScore() and croatiaScore() functions

  function executeKeyDown(event) {
    const key = event.keyCode
    // console.log(key)
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
    } else if (key !== left && key !== up && key !== right && key !== down) {
      window.alert('FOUL! - please use only up, down, right or left arrow keys')
      kovacicCurrentPosition = kovacicStartPosition
      addKovacic(kovacicCurrentPosition)
    } else {
      window.alert('ball out of play! - You have been returned to the start position')
      kovacicCurrentPosition = kovacicStartPosition
      addKovacic(kovacicCurrentPosition)
    }

    addKovacic(kovacicCurrentPosition)
    collisionEnglandScore()
    croatiaScore()
  }

  //TODO: (4d) COLLISION = England scores!
  //* for loop to iterate through all English players in array
  //* if statement - englishPlayerPosition[i] === kovacicCurrentPosition:
  //* if true: window alert: England scores; update spanScore; return Kovacic to starting position.

  function collisionEnglandScore() {
    for (let i = 0; i < englishPlayerPosition.length; i++) {
      if (englishPlayerPosition[i] === kovacicCurrentPosition) {
        spanScoreEngland.innerHTML = parseInt(spanScoreEngland.innerHTML) + 1
        window.alert('Goal for England!')
        removeKovacic(kovacicCurrentPosition)
        kovacicCurrentPosition = kovacicStartPosition
        addKovacic(kovacicStartPosition)
      }
    }
  }

  //TODO: (4e) Kovacic reaches position 5 or 6 = Croatia scores!
  //* if statement kovacicCurrentPosition === 5 or 6:
  //* update spanScore; window alert: Croatia scores; return Kovacic to starting position.

  function croatiaScore() {
    if (kovacicCurrentPosition === 5 || kovacicCurrentPosition === 6) {
      spanScoreCroatia.innerHTML = parseInt(spanScoreCroatia.innerHTML) + 1
      removeKovacic(kovacicCurrentPosition)
      window.alert('Goal for Croatia!')
      kovacicCurrentPosition = kovacicStartPosition
      addKovacic(kovacicCurrentPosition)
    }
  }

  //TODO: (4f) Timer function
  //* 1. create currentTime variable and extract innerHTML from timer
  //* 2. create array currentTimeArray separate the two strings in the array using split(':')
  //* 3. create variables for mili and sec as numbers for the two strings (using parseInt())
  //* 4. using if/else statementsincrement the right side (milliseconds) by 1 every 0.01 second, until 59 is reached, then increment sec by 1.
  //* 5. update timer.innerHTML to a string
  //* 6. nex if statement to call endGame() function once sec >= 9

  function liveTime() {
    const currentTime = timer.innerHTML
    const currentTimeArray = currentTime.split(':')
    let mili = parseInt(currentTimeArray[1])
    let sec = parseInt(currentTimeArray[0])
    if (mili < 59) {
      mili += 1
    } else { // 4. increment left side (seconds) by 1 every second.
      mili = 0
      sec += 1
    }
    timer.innerHTML = `${sec.toString()}:${mili.toString()}`
    if (sec >= 9) {
      endGame()
    }
  }

  //TODO: (5) Code to prevent screen from moving upon using arrow keys
  //* used this code from a google search = https://social.msdn.microsoft.com/Forums/en-US/3a66e3ce-df06-4309-b047-64cf7aa5ffec/how-to-disable-scroll-bar-moving-when-arrow-key-press-down?forum=asphtmlcssjavascript
  //* Disables screen from scrolling up and down when pressing arrow keys

  document.onkeydown = cancelArrowKeys
  function cancelArrowKeys(e) {
    try {
      const e = window.event || e
      const key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0
      if (key === 37 || key === 38 || key === 39 || key === 40) {
        if (key === 13)
          document.getElementById('<%=btnFightPokemon.ClientID%>').click()
        if (key === 37)
          document.getElementById('<%=ImgBtnWest.ClientID%>').click()
        if (key === 38)
          document.getElementById('<%=ImgBtnNorth.ClientID%>').click()
        if (key === 39)
          document.getElementById('<%=ImgBtnEast.ClientID%>').click()
        if (key === 40)
          document.getElementById('<%=ImgBtnSouth.ClientID%>').click()
        event.returnValue = false
      }
    } catch (Exception) {
      return false
    }
  }

  //TODO: (6) Call functions
  //* createGrid called as needed for visual start to ganme.
  //* addEventListener on click for startGame(), endGame() and levelChosen() functions
  
  createGrid()
  startButton.addEventListener('click', startGame)
  endButton.addEventListener('click', endGame)
  levelOne.addEventListener('click', levelOneChosen)
  levelTwo.addEventListener('click', levelTwoChosen)
  levelThree.addEventListener('click', levelThreeChosen)
}

//TODO: (1b) call the initialization function for window browser at the bottom of the Javascript
//* (1a at top of page) create initialization function upon browser window loading

document.addEventListener('DOMContentLoaded', init)


//TODO: --------------------- Running list of things to do: -------------------------

// * SOLVED ISSUES

// * function to run game
// * just move defenders using remove and add functions using setInterval method
// * refactor englishPlayerPosition[i] = currentDefenderPosition to one line rather than after every if statement.
// * refactor appicable code to ternary function.
// * Croatia score - add to spanScoreCroatia.innerHTML
// * hook up start buttons - disable start button after pressed
// * end button function to end game and allow for restart using start button - end button disabled until start button pressed
// * startGame function - (fixed by disabling start button after until end Game button is pressed) when doing it second time around the grid updates x2.
// * After endGame(), removeKovacic and addKovacic to starting position
// * prevent screen from moving up and down when pressing arrow keys for kovacic to move - USED code from web - https://social.msdn.microsoft.com/Forums/en-US/3a66e3ce-df06-4309-b047-64cf7aa5ffec/how-to-disable-scroll-bar-moving-when-arrow-key-press-down?forum=asphtmlcssjavascript
// * added window alerts for Croatia or England scoring and return Kovacic to starting position
// * removeKovacic - else condition for ball going out of play not working (fixed by changing else if statement from || to &&)
// * disable Kovacic from moving before starting game
// * Create an internal timer for 90 minutes
// * Create a timer which displays the running time and uses endGame() function to end the match
// * disabled endButton() upon creating grid so that only start button can be pressed when loading page
// * make a sumary of the javascript using comments (//TODO and //*) and refactor the code to suit, and so that I understand the big picture as it's getting a bit much!
// * Offer 3 levels of play - where setInterval is 700, 500, 300 for amateur, professional, world class respectively.


// ? PENDING ISSUES

// ? refactor collisionEnglandScore() to be forEach() = google javascript turn for loop into forEach - Doesn't seem to work, can't figure out why yet.


// ! NEXT TASKS:

// ! start styling the CSS
// ! Write a readme.md describing my game.

