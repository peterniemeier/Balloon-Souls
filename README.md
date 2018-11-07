# Balloon Souls

## Background and Overview
Balloon Souls is a tribute to classic, black-box, games for the Nintendo Entertainment System, "bullet hell" style shooters, and the Souls series games by From Software. It is essentially the manifestation of my love for games: difficulty, fairness, good design, and... FUN!

Javascript Canvas will do the heavy lifting for this project.

At its most basic, the objective of Balloon Souls is to stay alive for as long as you can while accumulating the highest personal score.
The player will avoid stars... and avoid being eaten by a fish if they are too close to the water at the bottom of the canvas/play area (tbd y position).
How you compare to others is irrelevant. Personal satisfaction can only come from surmounting your previous accomplishments. Additionally, someone will just find a way to cheat won't they?

## Functionality and MVP Features

Title Screen:
The title screen displays the name of the game, game controls, and prompts the user to start a new game by tapping the screen or pressing the corresponding key.

Mobile version:
Resize the canvas for mobile when the user accesses the site on mobile. Render alternate game control instructions while on mobile.
Render an element to handle player movement while on mobile (will be an invisible box which changes player x position if pressed and held).

Stars:
appear at random y positions within a specified range. They all begin at a specified x position beyond the left boundary of the canvas / play area. Their x position increases each frame at varying "speeds".
 Bonus functionality could be clusters of stars moving in deliberate patterns.
 Stars spawn at varying rates.
 Stars stop spawning for 300 frames or 5 seconds every 3600 frames or 60 seconds.

Balloons:
Balloons are worth 10 points each to start.
Balloons appear at random y positions within a specified range. They all begin at a specified x position beyond the left boundary of the canvas / play area. Their x position increases each frame. The score will += the balloon value when collided with. Balloons that are collected before they reach the edge of the screen are added to a balloon streak.
If balloon streak reaches 10, balloon point value increases by 10 points each. If any balloon is not collected, balloon streak is reset.

Collision:
Collision will be checked on each frame to determine if the corresponding hit box which moves with the position of the player's sprite shares any location of a hit box which corresponds to the sprite of a balloon, star, fish, or bubble.

Floating:
When the game begins, the player will spawn in a static location. Their y position will decrease continually. A player may increase their y position by pressing the corresponding "flap" button or tapping the screen. A player may change their x position by pressing the corresponding key or by pressing and holding in the corresponding area of the canvas/play area.

Point system:
* Score increases on each frame (1 pt. per frame.)
* Balloons grant points when collided with
  * Balloons grant increasingly more points after 10 balloons are collected sequentially (10, 20, 30, etc).
* "Grazing" - Coming close to a star or fish without colliding with either. Graze points are awarded after passing the corresponding object and can not be granted more than once (object is added to object hash). Multiple "grazes" in a row cause a streak which grants additional points for each additional graze in the streak. (2 -> 4 -> 6, etc.) Graze streak decays at the rate of 1x multiplier per 30 frames or half a second.

Sound effects:
* The game has title screen music which may be muted.
* The game has gameplay music which may be muted.
* The game sfx may be muted.
* The game has sfx for by star collision.
* The game has sfx for fish spawning.
* The game has sfx for fish collision.
* The game has sfx for balloon collection.
* The game has sfx for a new tier of balloon points being activated.
* The game has sfx for acquiring points via grazing.

Fish:
* If the player enters an area within a certain y position and remains within that position, a fish may spawn at the player's x position anywhere between 0 and 1800 frames or 0 and 30 seconds.
The Fish's x position will equal the player's x position and will increase it's y position until it reaches a specified height before lowering it's y position to it's starting y position (bottom of canvas / play area) or until it collides with the player.

Background:
A tiled background image increases x position every frame.
If background image does not contain water, there will also be a tiled water image that is at the bottom of the canvas /play area.

Bubbles:
Bonus: Bubbles spawn within a determined range of x positions. They always spawn at the lowest y position (bottom of the canvas / play area). They always move at the same speed and they move at an agle of 90 degrees so their x and y positions increment at the same rate. They have a .00001% chance to randomly appear on each frame and not before 7200 frames or 120 seconds and not if a bubble has spawned within 7200 frames or 120 seconds ago. A bubble awards 500 points when collided with and stops star movement for 5 seconds.

Demo:
Bonus: If no game is started after 600 frames or 10 seconds, a demo game begins and the player is controlled by AI (bad AI). The demo is cancelled and the user is returned to the title screen on any key press or screen tap.

# Wireframes

![](https://github.com/peterniemeier/test/blob/master/ui4.jpg)

***


![](https://github.com/peterniemeier/test/blob/master/ui5.jpg)


***


![](https://github.com/peterniemeier/test/blob/master/ui6.jpg)


***


# Architecture and Technologies

Javascript Canvas will be used for the ease of animating and displaying sprites.
The remaining game logic will all be handled using javascript.
The entire project will exist on one page and will utilize HTML and CSS.

# Score, SFX, CREDITS

Credit Kevin MacLeod
Game.OST1 = new Audio("../assets/temp/Call to Adventure.mp3");

Credit Yukinori Kikuchi, Developer CAVE, Publisher Capcom
Game.OST2 = new Audio("../assets/temp/Progear Music - All Ages War -Last Boss Stage-.mp3");

Credit Hisayoshi Ogura, Publisher THQ, Developer Taito
Game.OST3 = new Audio("../assets/temp/G-Darius - 12 - Kimera II (PS1).mp3");

Credit Mark Miller, Developer Shiny Entertainment, Publisher Interplay Entertainment
Game.OST4 = new Audio("../assets/temp/Earthworm Jim OST - Banjo Race.mp3");

Credit David Wise, Developer Rare, Publisher Tradewest/Masaya Games
Game.OST5 = new Audio("../assets/temp/Battletoads (NES) Music - Turbo Tunnel Part 2.mp3");

Credit Keiji Yamagishi/Ryuichi Nitta, Publisher/Developer Tecmo
Game.OST6 = new Audio("../assets/temp/Ninja Gaiden (NES) Music - Boss Battle.mp3");

Credit Hiroshige Tonomura, Publisher/Developer Capcom
Game.OST7 = new Audio("../assets/temp/Duck Tales (NES) Music - Moon Stage.mp3");

Credit Composers Yasuaki Fujita, Harumi Fujita, Developer/Publisher Capcom
Game.OST8 = new Audio("../assets/temp/Best VGM 303 - Mega Man 3 - Snake Man Stage.mp3");

Credit Jun Funahashi, Publisher Ultra Games, Developer Konami
Game.OST9 = new Audio("../assets/temp/Teenage Mutant Ninja Turtles (NES) Music - Underwater Bombs.mp3");

Credits Masanori Adachi/Taro Kudo, Publisher/Developer Konami
Game.OST10 = new Audio("../assets/temp/Super Castlevania IV OST Stage 6 The Chandeliers (6-2).mp3");

Credit Hitoshi Sakimoto, Masaharu Iwata, Hayato Matsuo, Nobuo Uematsu, Publisher/Developer Square Enix
Game.OST11 = new Audio("../assets/temp/Final Fantasy XII - Clash On The Big Bridge FFXII Version.mp3");

Credit Nobuo Uematsu, Publisher/Developer Square
Game.OST12 = new Audio("../assets/temp/Final Fantasy III (SNES) Music - Ultros Opera Battle.mp3");

Credit Yumiko Kanki Naoto Ishida, Publisher/Developer Nintendo
Game.OST13 = new Audio("../assets/temp/F-Zero (SNES) Music - Mute City.mp3");

Credit David Wise, Developer Rare, Publisher Nintendo
Game.OST14 = new Audio("../assets/temp/Donkey Kong Country OST 13 Life in the Mines.mp3");

Pickup/Drink/Died SFX - Credit:
Foley Recordist, Kazushige Sato (DiMAGIC)
Foley Artists, Shunsuke Hongo (Ventuno Inc.)
Publisher Namco Bandai Games, Developer FromSoftware

# Timeline

* Monday:
Asset generation (images/audio).
* Tuesday: Canvas initialization, title screen, game initialization, scrolling background.
* Wednesday: Player creation, balloon creation, star creation, fish creation.
* Thursday: Collision.
* Friday: Score mechanics.
* Saturday: Mobile mechanics.
* Sunday: Controls and page styling.
