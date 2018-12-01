# Snake #

This game and rules behind it, are defined by its name, being my fist game made after a self thought logic.

Logic behind it: <br>
-We are having an array named "Snake" on every snake movement,for example "Up" move ,we are adding in the head of snake array(First element)
an object with same x coordonates, but with y coordonate incrased by one, and we are deleting the last element from snake array (tail). 
We are using this concept for snake animation. <br>
-Every time snake eats the apple, the max number of snake array elements (his length) is increasing by one. <br>
-If snake is hitting his own body, or is going outside the screen size, we are respawning the snake, with length = initial length.


In development I used: Html, Css, JavaScript, Bootstrap and Html Canvas.


Project Link: http://vasilache-andrei.herokuapp.com/snake

Portofolio: http://vasilache-andrei.herokuapp.com/

<img src="http://vasilache-andrei.herokuapp.com/portofolioGifs/snake.gif">

