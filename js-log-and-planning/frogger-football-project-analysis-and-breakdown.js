// TODO: JAVASCRIPT break down for Football-frogger project.

// ? ---------------------------------------------------------------------

//TODO: (1) ----------------- set up initialization of page ------------------

//TODO (1a) create initialization function upon browser window loading
//* (1b at bottom of page) call the function at the bottom of the Javascript

// ? ---------------------------------------------------------------------

//TODO: (2) ---------------- Create variables/elements -------------------

//TODO: (2a) HEADER elements
//* Create global variables for score; star/end buttons; level buttons; grid
//* access elements from INDEX.html

//TODO: (2b) Create GRID CELLS variables/elements
//* create GRID variables and CELLS array.

//TODO: (2c) Create CHARACTER elements/variables for GRID
//* Kovacic: (a) create KovacicClass variable to be used in CSS; (b) KovacicStartPosition for grid Display; (c) let kovacicCurrentPosition (will be moving in executeKeyDown function) = kovacicStartPosition
//* English players: (a) create englishPlayerClass to be used in CSS; (b) create englishPlayerPosition[] array; (c) assign 11 array positions
//* assign array positions for englishPlayerPosition[] starting positions.

//TODO: (2d) Create TIME variables for keeping track of game time
//* timer; timerEnglishPlayerSpeed; liveTimeTimer; time

// ? ---------------------------------------------------------------------

//TODO: (3) ------------------ initial GRID creation EXECUTION ----------------------

//TODO: (3a) executions for adding/removing CHARACTERS to/from STARTING GRID
//* Functions for adding/removing previously created classes for characters to give 'moving' appearance.
//* originally, these functions are used to set the positions of characters on the grid. After they are used ofr a 'moving' appearance.

//TODO: (3b) Execution for creating starting Grid
//* function which is called as soon as browser window is loaded.
//* disable endButton() and startButton()
//* for Loop iterating for less than the cellCount; create cell variable = document.createElement('div')
//* appendChild and push to back of cells array
//* add characters to their starting positions: Kovacic, English players, Goal.

//TODO: (3c) Execution for ASSIGNING levels to play game at:
//* enable startButton as level has been chosen
//* set time variable according to level chosen

// ? ---------------------------------------------------------------------

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


//TODO: (4b) ENDING the game
//* document.removeEventListener('keydown', executeKeyDown)
//* disable end button and (keep startButton disabled)
//* window alert with end result.
//* reset spanScore's to 0.
//* clearInterval for 'timerEnglishPlayerSpeed' and 'liveTimeTimer'
//* removeKovacic(kovacicCurrentPosition); place in kovacicStartPosition; addKovacic(kovacicCurrentPosition).
//* reset timer.innerHTML to 00:00

//TODO: (4c) Kovacic MOVEMENT using arrow keys
//* variable for event.keycode; set left, right, up, down keys as variables for number key codes.
//* removeKovacic(kovacicCurrentPosition)
//* if/else statements for arrow key pressed and consequent movement of Kovacic; separate window alerts for incorrect key and moving out of grid - move Kovacic to starting position.
//* addKovacic(kovacicCurrentPosition)
//* call collisionEnglandScore() and croatiaScore() functions

//TODO: (4d) COLLISION = England scores!
//* for loop to iterate through all English players in array
//* if statement - englishPlayerPosition[i] === kovacicCurrentPosition:
//* if true: window alert: England scores; update spanScore; return Kovacic to starting position.

//TODO: (4e) Kovacic reaches position 5 or 6 = Croatia scores!
//* if statement kovacicCurrentPosition === 5 or 6:
//* update spanScore; window alert: Croatia scores; return Kovacic to starting position.

//TODO: (4f) Timer function
//* 1. create currentTime variable and extract innerHTML from timer
//* 2. create array currentTimeArray separate the two strings in the array using split(':')
//* 3. create variables for mili and sec as numbers for the two strings (using parseInt())
//* 4. using if/else statementsincrement the right side (milliseconds) by 1 every 0.01 second, until 59 is reached, then increment sec by 1.
//* 5. update timer.innerHTML to a string
//* 6. nex if statement to call endGame() function once sec >= 9

// ? ---------------------------------------------------------------------

//TODO: (5) Code to prevent screen from moving upon using arrow keys
//* used this code from a google search = https://social.msdn.microsoft.com/Forums/en-US/3a66e3ce-df06-4309-b047-64cf7aa5ffec/how-to-disable-scroll-bar-moving-when-arrow-key-press-down?forum=asphtmlcssjavascript
//* Disables screen from scrolling up and down when pressing arrow keys

// ? ---------------------------------------------------------------------

//TODO: (6) Call functions
//* createGrid called as needed for visual start to ganme.
//* addEventListener on click for startGame(), endGame() and levelChosen() functions

// ? ---------------------------------------------------------------------

//TODO: (1b) call the initialization function for window browser at the bottom of the Javascript
//* (1a at top of page) create initialization function upon browser window loading
