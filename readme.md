# Project 1: World Cup Croatia vs England

Table of Contents:

* Project Overview
* Game Brief
* Planning
* Technologies Used
* Featured Code
* Key Learnings
* Challenges
* Bugs
* Future improvements
* Key Learnings

## **Project Overview**

This is my first project after 2 weeks of the General Assembly software enginnering immersive program (which goes for 13 weeks total).

World Cup Croatia vs England is a grid-based game modelled on the 1981 arcade action game Frogger. The objective is to use Croatian and Chelsea player Mateo Kovacic using the arrow keys to score in England's goal, which is situated in grid positions 5 and 6, whereas England gets a goal if they intercept Kovacic before he scores. If Kovacic moves out of play or the player uses a key other than an arrow key, the ball is considered out of play and Kovacic is returned to his starting position (grid 101).

There are three levels to the game with English defenders moving faster at each higher level; and there is a timer of 54 seconds which can be varied according to player taste.

Link: [Football-Frogger](https://markoravnice25.github.io/GAProject-1-Football-Frogger/)

Screen overlay:
<img width="1296" alt="overlay-screen" src="https://user-images.githubusercontent.com/101732786/167477643-8ccf6739-cff0-4ed8-9850-7bc224505a8f.png">

Main game screen:
<img width="1272" alt="main-screen" src="https://user-images.githubusercontent.com/101732786/167477765-733711a2-68e3-4638-b6ac-e96303b3ffd0.png">

<br/>

## Game Brief

* Render a grid based game in the browser
* Create a one-player game against the computer
* The 11 computer footballers move within their grid positions so that a whole row of grids can be covered at any time.
* The computer footballers can move randomly either left or right.
* Design logic for winning and losing and display this on the screen
* Create high score in local storage
* Create different levels to the game
* Include separate HTML, CSS and JavaScript files
* Deploy game online

## **Planning**

A basic wireframe was first designed for look of the screen overlay and main screen:

<img width="827" alt="wireframe for overlay design" src="https://user-images.githubusercontent.com/101732786/167477281-2fabbcca-3cbf-4b5f-a79f-41a5119cd70b.png">

Followed by a wireframe for the functionality of the main game screen - the original idea was to have two teams play against each other, but that proved too complicated to do within the time frame given for the project, so a frogger-style 1 player against a team was used:

![wireframe-draft-1 Marko-Project-1-png](https://user-images.githubusercontent.com/101732786/167477568-5c9755b7-ec4b-4873-b8c3-ba5ac58812f7.png)


The end products were fairly similar to the originally envisioned design, although an obvious difference was the user only controlling one player as opposed to 11 players as originally envisioned.

<br/>

## **Technologies used**

## **HTML**
* 2 main screens were designed - an overlay and a main game screen.
* The overlay allows the player to pick a level (amateur, professional or world-class) and then start the game.
* Upon clicking the start button, the player is moved onto the game screen, where English players are set up in a football style 1-4-3-3 system within a field of 108 grids.

## **CSS**
* CSS was used at a fairly basic level, the overlay screen had a few boxed images and the buttons were styled in a basic and consistent way using flex-box
* The main game screen was also simple, using flex-box to have the timer, game scores and end button logically spaced.
* On the field some images were used including:
- The football players with no-background images sourced from the internet.
- a generic football field and goal.

## **JavaScript**
* The JavaScript is sectioned out as follows:

1) Global variables created: including an array of English players; time variables for setInterval() method; localStorage for high scores.

2) Initaial Creation of grid functions:
- functions for adding and removing all characters to and from their current grid position.
- createGrid() function for creating the starting grid
- levelChosen() function for setting the movement speed of Englishplayers according to level chosen. 

3) Live game execution:
- startGame() function which moves the English defenders around in random fashion within their positioned zones on the field - (except the goalkeeper who moves between 2 squares only) defenders move randomly between 3 squares, mids and attackers between 4 squares.
- endGame() function which returns the player to the overlay screen and checks for high score, which is added to the local storage if achieved and displayed on the overlay screen.
- executeKeyDown() function for movement of main player using arrow keys, who is returned to starting position if moving out of field of play or pressing a key other than the arrow keys. Movement is achieved by using a removeKovacic() function from current square at the start of this function and addKovacic() function at the end of this function to a new square.
- collisionEnglandScore() function for a collission occuring when an English player and Kovacic occupy the same square at the same time. A goal is given to England and Kovacic is returned to the start.
- croatiaScore() A function for Croatia scoring when Kovacic reaches grid 5 or 6 (where the goal is).
- liveTime() function which sets the time before the game is over.

4) cancelArrowKeys() function to prevent screen from moving up and down when using arrow keys - although this is not needed as in the CSS we have fixed the screen to window size.

5) Events section where we call the createGrid() function and use addEventListener() to call the button functions.

## **Featured Code**

`  function startGame() {
    document.addEventListener('keydown', executeKeyDown) // called in startGame() function so that Kovacic can only move once game has started, not before
    startButton.disabled = true
    endButton.disabled = false

    timerLiveTime = setInterval(liveTime, 100)

    clearInterval(timerEnglishPlayerSpeed)
    timerEnglishPlayerSpeed = setInterval(() => {
      // console.log('setInterval check')

      removeGoalkeeper(currentGoalkeeperPosition)
      currentGoalkeeperPosition = (currentGoalkeeperPosition === 17 ? 18 : 17)
      addGoalkeeper(currentGoalkeeperPosition)

      for (let i = 0; i < englishPlayerPosition.length; i++) {
        let currentDefenderPosition = englishPlayerPosition[i]

        removeEnglishPlayer(currentDefenderPosition)

        // * 'if (i === 0)' doesn't execute as the function for addEnglishPlayer(englishPlayerPosition[0]) has been commented out - goalkeeper added instead.

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
    }, timeInterval)
    screenOverlay.style.display = 'none'
    screenMainGame.style.display = 'block'
  }`

## **Key learnings**
* How to use Flex-box
* using Div's as containers for easier CSS
* localStorage to set high score
* setInterval() method
* setItem() and getItem() to create high score in localStorage.
* creating screen overlay

## **Challenges**
* CSS - how to have images taken from the internet aligned when they have different properties.
* The timer - when something is in the same div container it makes micro-movements as the timer's digits change. To solve this, I moved the timer into it's own block.

## **Bugs**
* no obvious bugs

## **Future improvements**
* BETTER USE OF CSS and STYLING in General - definitely needed to improve the styling.
* Add audio and new dynamic screens for key events - goals scored and game finished. 
* more regualar git add/commit/push to git hub with clear comments.
* have all English players with their own character/player.
* Allow for 2 player game - Where the second option is for an English player to attack the Croatian defence.
* function to pick which footballer you want to dribble with.
* time-limit for player dribbling to make it more difficult and prevent dribbling around the sides (which is easier).
* change window alerts to a div with better styling.

