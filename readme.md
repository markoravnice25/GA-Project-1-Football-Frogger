## General Assembly Software Engineering Immersive (March - July 2022)

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

This is my first project after 2 weeks of the General Assembly software enginnering immersive program (which lasts for 13 weeks in total). I had 6 days to submit the final product.

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
1) The football players with no-background images sourced from the internet.
2) A generic football field and goal.

## **JavaScript**
The JavaScript is sectioned out as follows:

1) Global variables created: including an array of English players; time variables for setInterval() method; localStorage for high scores.

2) Initaial Creation of grid functions:
- Functions for adding and removing all characters to and from their current grid position.
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

This for loop is part of the startGame() function. Its pourpose is to remove footballers from their current grid position and simultaneously add that footballer to another grid on the left or right giving the appearance of moving footballers. A let variable is declared 'currentDefenderPosition' and it is passed into the removeEnglishPlayer() function so that the footballer is 'removed' from their position in the grid at the start of the for loop. At the end of the for loop the currentDefenderPosition is passed into the addEnglishPlayer() function and the footballer is 'added' to another grid position specified during the control flow (if/else statements). There are 108 grid positions in total (0-107) - 12 grids per row with 9 rows.
The for loop separates the rows of English footballers into three categories:
* Only 1 footballer in the row (Goalkeeper row): In this instance a ternary is used as the Goalkeeper can only be in grid position 17 or 18, hence the Goalkeeper is added to the grid position in which he currently isn't.
* 4 footballers in the row (defensive line row): The modulus function is used to find the current position of the defensive player. As there are 12 grids in the row with 4 players, each one of the players can 'move between 3 grid positions. When they are on the outer left or outer right, the control flow logic adds that footballer back to the centre position of the three; however, if the player is in the central position, we use the (Math.floor(Math.random() * 2) === 0) method on line 237 to randomly add the footballer to either the left or right position relative to his current position.
* 3 footballers in a row (midfield and attacking line): The logic here is the same as for the defensive line, with the only difference being that each player now covers for grid positions, meaning that there are 2 central positions from which to use the (Math.floor(Math.random() * 2) === 0) method to randomly add the footballer to either the left or right position relative to his current position.

<img width="1210" alt="Screen Shot 2022-06-29 at 10 33 22 am" src="https://user-images.githubusercontent.com/101732786/176390949-99aaa69d-4442-4786-a4f4-09caa37d6012.png">


## **Key learnings**
* How to use Flex-box
* Using Div's as containers for easier CSS
* LocalStorage to set high score
* SetInterval() method
* SetItem() and getItem() to create high score in localStorage.
* Creating screen overlay

## **Challenges**
* CSS - how to have images taken from the internet aligned when they have different properties.
* The timer - when something is in the same div container it makes micro-movements as the timer's digits change. To solve this, I moved the timer into it's own block.

## **Bugs**
* No obvious bugs

## **Future improvements**
* BETTER USE OF CSS and STYLING in General - definitely needed to improve the styling.
* Add audio and new dynamic screens for key events - goals scored and game finished. 
* More regualar git add/commit/push to git hub with clear comments.
* Have all English players with their own character/player.
* Allow for 2 player game - Where the second option is for an English player to attack the Croatian defence.
* Function to pick which footballer you want to dribble with.
* Time-limit for player dribbling to make it more difficult and prevent dribbling around the sides (which is easier).
* Change window alerts to a div with better styling.

