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
let ogre = new Crawler(500, 100, "#bada55", 40, 40)
let hero = new Crawler(100, 200, "hotpink", 40, 40,)

window.addEventListener("keydown", keysPressed, false)
window.addEventListener("keyup", keysReleased, false)

var keys = []

function keysPressed(e) {
  keys[e.keyCode] = true
}
function keysReleased(e) {
  keys[e.keyCode] = false
}

function move() {
  const speed = 10
  if((keys[38] || keys[87]) && hero.y > 0) {
    hero.y -= speed
  } else if((keys[40] || keys[83]) && hero.y + hero.height < canvas.height) { 
    hero.y += speed
  } else if((keys[37] || keys[65]) && hero.x > 0) {
    hero.x -= speed
  } else if((keys[39] || keys[68]) && hero.x + hero.width < canvas.width) {
    hero.x += speed
  }
}
 
function ogreMove() {
  let diffX = hero.x - ogre.x
  let diffY = hero.y - ogre.y
  let speed = 3

  if(diffX > 0) {
    ogre.x += speed
  } else {
    ogre.x -= speed
  }

  if (diffY > 0) {
    ogre.y += speed
  } else {
    ogre.y -= speed
  }
}


function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  move()
  ogreMove()
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
    hero.y + hero.height >= ogre.y
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

// OLD FORM FOR SMOOTH MOVEMENT. SINCE STREAMLINED.
// var Keys = {
//   up: false,
//   down: false,
//   left: false,
//   right: false,
// }

// window.onkeydown = function(e) {
//   e.preventDefault()
//   var kc = e.keyCode
//   if(kc === 37 || kc === 65) Keys.left = true;
//   if(kc === 38 || kc === 87) Keys.up = true;
//   if(kc === 39 || kc === 68) Keys.right = true;
//   if(kc === 40 || kc === 83) Keys.down = true;
// }

// window.onkeyup = function(e) {
//   e.preventDefault()
//   var kc = e.keyCode
//   if(kc === 37 || kc === 65) Keys.left = false;
//   if(kc === 38 || kc === 87) Keys.up = false;
//   if(kc === 39 || kc === 68) Keys.right = false;
//   if(kc === 40 || kc === 83) Keys.down = false;
// }

// function move() {
//   const speed = 10
//   if(Keys.up && hero.y > 0) {
//     hero.y -= speed
//   } else if(Keys.down && hero.y + hero.height < canvas.height) { 
//     hero.y += speed
//   } else if(Keys.left && hero.x > 0) {
//     hero.x -= speed
//   } else if(Keys.right && hero.x + hero.width < canvas.width) {
//     hero.x += speed
//   }
// }

// ALLOWS DIAGONAL MOVEMENT. STILL JERKY.
// window.addEventListener("keydown", keysPressed, false)
// window.addEventListener("keyup", keysReleased, false)

// var keys = []

// function keysPressed(e) {
//   const speed = 10
//   keys[e.keyCode] = true
//   if(keys[37]) {
//     hero.x -= speed
//   }
//   if(keys[38]) {
//     hero.y -= speed
//   }
//   if(keys[39]) {
//     hero.x += speed
//   }
//   if(keys[40]) {
//     hero.y += speed
//   }
// }

// function keysReleased(e) {
//   keys[e.keyCode] = false
// }


// OGRE MOVEMENT --> Favors first condition, unknown reason.
// function ogreMove() {
//   const speed = 5
//   let randomOgreKey = ogreKeys[Math.floor(Math.random() * ogreKeys.length)]
//   console.log(randomOgreKey)
//   if(randomOgreKey = "up" && ogre.y > 0) {
//     ogre.y -= speed
//   } else if (randomOgreKey = "down" && ogre.y + ogre.height < canvas.height) {
//     ogre.y += speed
//   } else if (randomOgreKey = "left" && ogre.x > 0) {
//     ogre.x -= speed
//   } else if (randomOgreKey = "right" && ogre.x + ogre.width < canvas.width) {
//     ogre.x += speed
//   }
// }

//  OGRE MOVEMENT --> Works, but is extremely juddery
// function ogreMove() {
//   const speed = 10
//   ogre.x += Math.floor(Math.random() * speed)
//   ogre.x -= Math.floor(Math.random() * speed)
//   ogre.y += Math.floor(Math.random() * speed)
//   ogre.y -= Math.floor(Math.random() * speed)
// }

// RANDOM OGRE STARTING POSITION
// let ogre = new Crawler(Math.floor(Math.random() * (canvas.width - 25)), Math.floor(Math.random() * (canvas.height - 25)), "#bada55", 100, 100)

// BOUNDED MOVEMENT, NESTED CONDITIONALS --> Functional, but replaced for readability)
// function move() {
//   const speed = 10
//   if(Keys.up) {
//     if(hero.y > 0) {
//     hero.y -= speed
//   }
// } else if(Keys.down) {
//   if(hero.y + hero.height < canvas.height) {
//     hero.y += speed
//   }
// } else if(Keys.left) {
//     if(hero.x > 0) {
//     hero.x -= speed
//   }
// } else if(Keys.right) {
//   if(hero.x + hero.width < canvas.width) {
//     hero.x += speed
//   }
// }
// }

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
