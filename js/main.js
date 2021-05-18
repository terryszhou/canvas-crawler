console.log("Hello")

const movementDisplay = document.getElementById("movement")
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext('2d')

canvas.setAttribute("height", getComputedStyle(canvas)["height"])
canvas.setAttribute("width", getComputedStyle(canvas)["width"])

let frameCount = 0
let score = 0
let runGame = setInterval(gameLoop, 60)

var walls = []

walls.push({
    x: canvas.width - 170,
    y: 40,
    width: 10,
    height: 40
  },
  {
    x: canvas.width - 250,
    y: 80,
    width: 20,
    height: 20
  }
)

function drawWalls() {
  ctx.fillStyle = 'grey'

  for(i = 0; i < walls.length; i++){
    ctx.fillRect(walls[i].x, walls[i].y, walls[i].width, walls[i].height)
  }
}

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

let ogres = [new Crawler(Math.random() * canvas.width, Math.random() * canvas.height, "#bada55", 20, 20)]
let hero = new Crawler(100, 200, "hotpink", 20, 20,)
// let bullet = new Crawler(hero.x, hero.y, 'purple', 2, 2)

let keys = []
window.addEventListener("keydown", function (e) {
  keys[e.keyCode] = true
})
window.addEventListener("keyup", function (e) {
  keys[e.keyCode] = false
})

function move() {
  const speed = 8
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

function detectWalls() {
  for (i = 0; i < walls.length; i++)
  
}

function createOgres() {
  if (ogres.length < 4) {
    ogres.push(new Crawler(Math.random() * canvas.width, Math.random() * canvas.height, "#bada55", 20, 20))
    ogres.forEach(ogre => {
      ogre.render()
    })
  }
}

function attack() {
  if(keys[32]) {
    hero.color = "blue"
  } else {
    hero.color = "hotpink"
  }
}
 
function ogreMove(ogre) {
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

function detectHit(ogre) {
  if (
    hero.x + hero.width >= ogre.x &&
    hero.x <= ogre.x + ogre.width &&
    hero.y <= ogre.y + ogre.height &&
    hero.y + hero.height >= ogre.y
    ) {
      endGame(ogre)
    }
}

function detectWalls(wall) {
  if (
    hero.x + hero.width >= wall.x &&
    hero.x <= wall.x + wall.width &&
    hero.y <= wall.y + wall.height &&
    hero.y + hero.height >= wall.y
    ) {
      hero.x = wall.x
      hero.y = wall.y
    }
}

function endGame(ogre) {
  if(keys[32]) {
  ogre.alive = false
  clearInterval(runGame)
  movementDisplay.innerText = "YOU WIN!"
  } else {
  hero.alive = false
  clearInterval(runGame)
  movementDisplay.innerText = "YOU WERE KILLED BY THE OGRE!"
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawWalls()
  frameCount++
  if (frameCount % 100 === 0) {
    createOgres()
  }
  const speed = 8
  // for (j = 0; j < walls.length; j++) {
  //   detectWalls(walls[j])
  // }
  move()
  attack()
  movementDisplay.textContent = `X: ${hero.x} Y: ${hero.y}`
  
  for (i = 0; i < ogres.length; i++) {
    if (ogres[i].alive) {
      ogreMove(ogres[i])
      detectHit(ogres[i])
      ogres[i].render()
    }
  }
  hero.render()
}


// DEFECTIVES

// HITS INVISIBLE WALLS
// function move() {
//   const speed = 8
//   for (i = 0; i < walls.length; i++) {
//     if((keys[38] || keys[87]) && hero.y > 0 && hero.y > walls[i].y + walls[i].height) {
//       hero.y -= speed
//     } else if((keys[40] || keys[83]) && hero.y + hero.height < canvas.height && hero.y + hero.height < walls[i].y) { 
//       hero.y += speed
//     } else if((keys[37] || keys[65]) && hero.x > 0 && hero.x > walls[i].x + walls[i].width) {
//       hero.x -= speed
//     } else if((keys[39] || keys[68]) && hero.x + hero.width < canvas.width && hero.x + hero.width < walls[i].x) {
//       hero.x += speed
//     }
//   }
// }

// SMOOTH MOVEMENT, SHORT CODE, NO DIAGONALS
// window.addEventListener("keydown", keysPressed, false)
// window.addEventListener("keyup", keysReleased, false)

// var keys = []

// function keysPressed(e) {
//   keys[e.keyCode] = true
// }
// function keysReleased(e) {
//   keys[e.keyCode] = false
// }

// function move() {
//   const speed = 8
//   if((keys[38] || keys[87]) && hero.y > 0) {
//     hero.y -= speed
//   } else if((keys[40] || keys[83]) && hero.y + hero.height < canvas.height) { 
//     hero.y += speed
//   } else if((keys[37] || keys[65]) && hero.x > 0) {
//     hero.x -= speed
//   } else if((keys[39] || keys[68]) && hero.x + hero.width < canvas.width) {
//     hero.x += speed
//   }
// }

// SMOOTH MOVEMENT. LONG FORM, MORE RELIANT ON TRUE/FALSE STATEMENTS.
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
