console.log("Hello")

const movementDisplay = document.getElementById("movement")
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext('2d')

canvas.setAttribute("height", getComputedStyle(canvas)["height"])
canvas.setAttribute("width", getComputedStyle(canvas)["width"])

let runGame = setInterval(gameLoop, 60)

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

let rando = new Crawler(5, 5, 'purple', 40, 140)
let ogre = new Crawler(500, 150, "#bada55", 100, 150)
let hero = new Crawler(100, 200, "hotpink", 40, 40,)

var Keys = {
  up: false,
  down: false,
  left: false,
  right: false,
}

window.onkeydown = function(e) {
  var kc = e.keyCode
  e.preventDefault()

  if(kc === 37 || kc === 65) Keys.left = true;
  if(kc === 38 || kc === 87) Keys.up = true;
  if(kc === 39 || kc === 68) Keys.right = true;
  if(kc === 40 || kc === 83) Keys.down = true;

  // placing the move function here rather than in the gameLoop makes the movement much jerkier.
  // move()
}

window.onkeyup = function(e) {
  var kc = e.keyCode
  e.preventDefault()

  if(kc === 37 || kc === 65) Keys.left = false;
  if(kc === 38 || kc === 87) Keys.up = false;
  if(kc === 39 || kc === 68) Keys.right = false;
  if(kc === 40 || kc === 83) Keys.down = false;
}

function move() {
  const speed = 10
  if(Keys.up) {
    hero.y -= speed
  } else if(Keys.down) {
    hero.y += speed
  } else if(Keys.left) {
    hero.x -= speed
  } else if(Keys.right) {
    hero.x += speed
  }
}

function ogreMove() {
  const ogreSpeed = 5
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  move()
  movementDisplay.textContent = `X: ${hero.x} Y: ${hero.y}`
  detectHit()
  if (ogre.alive) {
      ogre.render()
  }
  hero.render()
}

function detectHit() {
  if (
    hero.x + hero.width >= ogre.x &&
    hero.x <= ogre.x + ogre.width &&
    hero.y <= ogre.y + ogre.height &&
    hero.y + hero.
    height >= ogre.y
    ) {
      endGame()
    }
}

function endGame() {
  ogre.alive = false
  clearInterval(runGame)
  movementDisplay.innerText = "YOU KILLED THE OGRE!"
}


// DEFECTIVES

// DIAGONAL MOVEMENT SOLUTION --> Creates slow, jerky movement. Also: render bug.
// var map = {}

// onkeydown = onkeyup = function(e) {
//   map[e.keyCode] = e.type == "keydown"
//   console.log(map)
//   const speed = 10
//   if (e.keyCode === 87 || e.keyCode === 38)  {
//     hero.y -= speed
//   } else if (e.keyCode === 65 || e.keyCode === 37) {
//     hero.x -= speed
//   } else if (e.keyCode === 83 || e.keyCode === 40) {
//     hero.y += speed
//   } else if (e.keyCode ===68 || e.keyCode === 39) {
//     hero.x += speed
// }
// }

// BASIC MOVEMENT --> creates slow, jerky movement with a startup delay
// document.addEventListener('keydown', movementHandler)

// function movementHandler(e) {
//   const speed = 10
//   if (e.keyCode === 87 || e.keyCode === 38)  {
//     hero.y -= speed
//   } else if (e.keyCode === 65 || e.keyCode === 37) {
//     hero.x -= speed
//   } else if (e.keyCode === 83 || e.keyCode === 40) {
//     hero.y += speed
//   } else if (e.keyCode ===68 || e.keyCode === 39) {
//     hero.x += speed
//   }
// }
