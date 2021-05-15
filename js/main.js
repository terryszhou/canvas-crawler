console.log("Hello")

const movementDisplay = document.getElementById("movement")
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext('2d')

// // CREATES A RECTANGLE
// // Fill Color
// ctx.fillStyle = 'white';
// // Line Color
// ctx.strokeStyle = 'red';
// // Line width
// ctx.lineWidth = 5;

// // CREATES A RECTANGLE OF THE SPECIFIED DIMENSIONS
// ctx.fillRect(10, 10, 100, 100);
// ctx.strokeRect(10, 10, 100, 100);

// SETS CANVAS ATTRIBUTES TO CSS STANDARDS
canvas.setAttribute("height", getComputedStyle(canvas)["height"])
canvas.setAttribute("width", getComputedStyle(canvas)["width"])

// // DRAWS A BOX
// function drawBox(x, y, size, color){
//     ctx.fillStyle = color;
//     ctx.fillRect(x, y, size, size);
// }

// // DRAWS A BOX ON CLICK
// canvas.addEventListener("click", function(e) {
//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     drawBox(e.offsetX, e.offsetY, 50, 'green');
// });

// DRAWS HERO ON CLICK
// canvas.addEventListener("click", function(e) {
//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     hero.x = e.offsetX
//     hero.y = e.offsetY
//     hero.render(e.offsetX, e.offsetY, 50, 'green');
// });

// CREATES A CLASS FUNCTION FOR GENERATING PLAYER & NPC OBJECTS
class Crawler{
    constructor(x, y, color, width, height) {
      this.x = x
      this.y = y
      this.color = color
      this.width = width
      this.height = height
      this.alive = true
    }
    render() {
      ctx.fillStyle = this.color
      ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

// USES THE CRAWLER CLASS FUNCTION TO GENERATE NEW OBJECTS
let rando = new Crawler(5, 5, 'purple', 40, 140)
let ogre = new Crawler(500, 150, "#bada55", 100, 150)
let hero = new Crawler(100, 200, "hotpink", 40, 40,)

// WIPES GAMEBOARD, RERUNS VARIABLES, & REPOPULATES.
function gameLoop() {
    // Clear the Cavas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //Display the X and Y coordinates of our hero
    movementDisplay.textContent = `X: ${hero.x} Y: ${hero.y}`
    // Check of the ogre is alive
    if (ogre.alive) {
        ogre.render()
        // TODO: detectHit
    }
    hero.render()
    // console.log("It works!")
}

// LOOPS WHOLE GAME CYCLE EVERY 60 MILLISECONDS
let runGame = setInterval(gameLoop, 60)

// MOVEMENT FUNCTION (IF-ELSE CONDITIONALS)
function movementHandler(e) {
  if (e.keyCode === 87)  {
    hero.y -= 10
  } else if (e.keyCode === 65) {
    hero.x -= 10
  } else if (e.keyCode === 83) {
    hero.y += 10
  } else if (e.keyCode ===68) {
    hero.x += 10
  }
}

// OR MOVEMENT FUNCTION (SWITCH)

// function movementHandler(e) {
//   switch (e.keyCode) {
//     case (87):
//       hero.y -= 10
//       break
//     case (65):
//       hero.x -= 10
//       break
//     case (83):
//       hero.y += 10
//       break
//     case (68):
//       hero.x += 10
//   }
// }

document.addEventListener('keydown', movementHandler);