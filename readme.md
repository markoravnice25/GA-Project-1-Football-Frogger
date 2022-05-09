# Project 1: World Cup Croatia vs England

This is my first game after 2 weeks of the General Assembly software enginnering immersive program (which goes for 13 weeks total).

## **Game link**

https://markoravnice25.github.io/GAProject-1-Football-Frogger/

World Cup Croatia vs England is based on the Frogger game. The objective is to use Croatian and Chelsea player Mateo Kovacic using the arrow keys to score in England's goal, which is situated in grid positions 5 and 6.

England gets a goal if they intercept Kovacic. If Kovacic moves out of play or the player uses a key other than an arrow key, Kovacic is returned to his starting position (grid 101).

There are three levels to the game with higher levels moving the English defenders faster; and there is a timer of 54 seconds - this can be varied according to player taste.

<br/>


A wireframe was first designed for the screen overlay:

<img width="827" alt="wireframe for overlay design" src="https://user-images.githubusercontent.com/101732786/167477281-2fabbcca-3cbf-4b5f-a79f-41a5119cd70b.png">

Followed by a wireframe for the main game screen: 

/Users/markofilipovic/development/PROJECTS/Project-one/images/wireframe-draft-1 Marko-Project-1-png.png

The end products were fairly similar to the originally envisioned design.

Screen overlay:

/Users/markofilipovic/development/PROJECTS/Project-one/images/overlay-screen.png

Main game screen:

/Users/markofilipovic/development/PROJECTS/Project-one/images/main-screen.png

<br/>

## **Technologies used**

## **HTML**
* 2 main screens were designed - an overlay and a main game screen.

The overlay allows the player to pick a level (amateur, professional or world-class) and then start the game.

Upon clicking the start button, the player is moved onto the game screen, where English players are set up in a football style 1-4-3-3 system within a field of 108 grids.

## **CSS**
* CSS was used at a fairly basic level, the overlay screen had a few boxed images and the buttons were styled in a basic and consistent way using flex-box
* The main game screen was also simple, using flex-box to have the timer, game scores and end button logically spaced.
* On the field some images were used including:
- The football players were no-background images sourced from the internet.
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

## **Future improvements**
* more regualar git add/commit/push to git hub with clear comments.
* have all English players with their own character/player.
* Allow for 2 player game - Where the second option is for an English player to attack the Croatian defence.
* function to pick which footballer you want to dribble with.
* time-limit for player dribbling to make it more difficult and prevent dribbling around the sides (which is easier).
* change window alerts to a div with better styling.
* Add audio and new screens for key events - goals scored and game finished. 
* BETTER USE OF CSS and STYLING in General.

## **Bugs**
* no obvious bugs
