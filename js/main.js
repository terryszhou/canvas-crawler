console.log("Hello")

const movementDisplay = document.getElementById("movement")
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext('2d')

canvas.setAttribute("height", getComputedStyle(canvas)["height"])
canvas.setAttribute("width", getComputedStyle(canvas)["width"])

let frameCount = 0
let score = 0
let runGame = setInterval(gameLoop, 60)
let heroFacing

var walls = []

walls.push({
    x: 240,
    y: 40,
    width: 20,
    height: 60
  },
  {
    x: 180,
    y: 80,
    width: 60,
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
    heroFacing = "north"
  } else if((keys[40] || keys[83]) && hero.y + hero.height < canvas.height) { 
    hero.y += speed
    heroFacing = "south"
  } else if((keys[37] || keys[65]) && hero.x > 0) {
    hero.x -= speed
    heroFacing = "west"
  } else if((keys[39] || keys[68]) && hero.x + hero.width < canvas.width) {
    hero.x += speed
    heroFacing = "east"
  }
}

function detectWalls(wall) {
  let speed = 8
      if (
        hero.x + hero.width >= wall.x &&
        hero.x <= wall.x + wall.width &&
        hero.y <= wall.y + wall.height &&
        hero.y + hero.height >= wall.y
      ) { 
          if (heroFacing == "north" && hero.y <= wall.y + wall.height) {
            hero.y += speed
          } else if (heroFacing == "south" && hero.y + hero.height >= wall.y) { 
            hero.y -= speed
          } else if (heroFacing == "west" && hero.x <= wall.x + wall.width) {
            hero.x += speed
          } else if (heroFacing == "east" && hero.x + hero.width >= wall.x) {
            hero.x -= speed
          }
        }
}

function detectWalls(wall) {
  let speed = 8
      if (
        hero.x + hero.width >= wall.x &&
        hero.x <= wall.x + wall.width &&
        hero.y <= wall.y + wall.height &&
        hero.y + hero.height >= wall.y
      ) { 
          if (heroFacing == "north" && hero.y <= wall.y + wall.height) {
            hero.y += speed
          } else if (heroFacing == "south" && hero.y + hero.height >= wall.y) { 
            hero.y -= speed
          } else if (heroFacing == "west" && hero.x <= wall.x + wall.width) {
            hero.x += speed
          } else if (heroFacing == "east" && hero.x + hero.width >= wall.x) {
            hero.x -= speed
          }
        }
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
  move()
  for (j = 0; j < walls.length; j++) {
    detectWalls(walls[j])
  }
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

// LOWERED SPEED. UNEXPECTED 'QUICKSAND' EFFECT.
// function detectWalls(wall) {
//   let speed = 4
//       if (
//         hero.x + hero.width >= wall.x &&
//         hero.x <= wall.x + wall.width &&
//         hero.y <= wall.y + wall.height &&
//         hero.y + hero.height >= wall.y
//       ) { 
//           if (heroFacing == "north" && hero.y <= wall.y + wall.height) {
//             // hero.y = wall.y + wall.height
//             hero.y -= speed
//           } else if (heroFacing == "south" && hero.y + hero.height >= wall.y) { 
//             // hero.y = wall.y - hero.height
//             hero.y += speed
//           } else if (heroFacing == "west" && hero.x <= wall.x + wall.width) {
//             // hero.x = wall.x + wall.width
//             hero.x += speed
//           } else if (heroFacing == "east" && hero.x + hero.width >= wall.x) {
//             // hero.x = wall.x -hero.width
//             hero.x -= speed
//           }
//         }
// }

// DITTO BELOW
// function detectWalls(wall) {
//   if (
//     hero.x + hero.width >= wall.x &&
//     hero.x <= wall.x + wall.width &&
//     hero.y <= wall.y + wall.height &&
//     hero.y + hero.height >= wall.y
//   ) {
//   if(hero.y + hero.height >= wall.y && 
//     hero.x + hero.width >= wall.x && 
//     hero.x <= wall.x + wall.width &&
//     (keys[40] || keys[83])) {
//       hero.y = wall.y - hero.height
//     }
//   if(hero.y <= wall.y + wall.height &&
//     hero.x + hero.width >= wall.x &&
//     hero.x <= wall.x + wall.width && 
//     (keys[38] || keys[87])) {
//       hero.y = wall.y + wall.height
//     }
//   if(hero.x + hero.width >= wall.x &&
//     hero.y + hero.height >= wall.y &&
//     hero.y <= wall.y + wall.height &&
//     (keys[39] || keys[68])){
//       hero.x = wall.x - hero.width
//     }
//   if(hero.x <= wall.x + wall.width &&
//     hero.y + hero.height >= wall.y &&
//     hero.y <= wall.y + wall.height &&
//     (keys[37] || keys[65])) {
//       hero.x = wall.x + wall.width
//     }
//   }
// }

// DITTO BELOW
// function detectWalls(wall) {
//   let speed = 8
//       if (
//         hero.x + hero.width >= wall.x &&
//         hero.x <= wall.x + wall.width &&
//         hero.y <= wall.y + wall.height &&
//         hero.y + hero.height >= wall.y
//       ) { 
//           if ((!keys[40] || !keys[83]) && hero.y <= wall.y + wall.height) {
//             //up statement
//             hero.y = wall.y + wall.height
//           } else if ((!keys[38] || !keys[87]) && hero.y + hero.height >= wall.y) { 
//             //down statement
//             hero.y = wall.y - hero.height
//           } else if ((!keys[39] || !keys[68]) && hero.x <= wall.x + wall.width) {
//             //left statement
//             hero.x = wall.x + wall.width
//           } else if ((!keys[37] || !keys[65]) && hero.x + hero.width >= wall.x) {
//             //right statement
//             hero.x = wall.x -hero.width
//           }
//         }
// }

// WORKS FOR DIRECT CONTACT; SLIPS WHEN ALTERNATE AXIS INPUTS ARE DETECTED
// function detectWalls(wall) {
//   let speed = 8
//       if (
//         hero.x + hero.width >= wall.x &&
//         hero.x <= wall.x + wall.width &&
//         hero.y <= wall.y + wall.height &&
//         hero.y + hero.height >= wall.y
//       ) { 
//           if ((keys[38] || keys[87]) && hero.y <= wall.y + wall.height) {
//             hero.y = wall.y + wall.height
//           } else if ((keys[40] || keys[83]) && hero.y + hero.height >= wall.y) { 
//             hero.y = wall.y - hero.height
//           } else if ((keys[37] || keys[65]) && hero.x <= wall.x + wall.width) {
//             hero.x = wall.x + wall.width
//           } else if ((keys[39] || keys[68]) && hero.x + hero.width >= wall.x) {
//             hero.x = wall.x -hero.width
//           }
//         }
// }

// ZIPS HERO TO BOTTOM-RIGHT CORNER OF WALL UPON CONTACT
// -- Without nested conditional, does the same as above when invisible thresholds are crossed.
// function detectWalls(wall) {
//   let speed = 8
//       if (
//         hero.x + hero.width >= wall.x &&
//         hero.x <= wall.x + wall.width &&
//         hero.y <= wall.y + wall.height &&
//         hero.y + hero.height >= wall.y
//       ) 
//       {
//       if(hero.y + hero.height >= wall.y && 
//         hero.x + hero.width >= wall.x && 
//         hero.x <= wall.x + wall.width) {
//           speed = 0
//           hero.y = wall.y - hero.height
//         }
//       if(hero.y <= wall.y + wall.height &&
//         hero.x + hero.width >= wall.x &&
//         hero.x <= wall.x + wall.width) {
//           speed = 0
//           hero.y = wall.y + wall.height
//         }
//       if(hero.x + hero.width >= wall.x &&
//         hero.y + hero.height >= wall.y &&
//         hero.y <= wall.y + wall.height) {
//           speed = 0
//           hero.x = wall.x - hero.width
//         }
//       if(hero.x <= wall.x + wall.width &&
//         hero.y + hero.height >= wall.y &&
//         hero.y <= wall.y + wall.height) {
//           speed = 
//           hero.x = wall.x + wall.width
//         }
//       }
// }

// ONLY TRIGGERS FIRST NESTED CONDITIONAL
// -- Without nesting, teleports hero when crossing wall thresholdl regardless of location
// function detectWalls(wall) {
//   let speed = 8
//   let currentX = hero.x
//   let currentY = hero.y
//       // if (
//       //   hero.x + hero.width >= wall.x &&
//       //   hero.x <= wall.x + wall.width &&
//       //   hero.y <= wall.y + wall.height &&
//       //   hero.y + hero.height >= wall.y
//       // ) {
//       //     console.log(hero.height)
//       //     console.log(wall.y)
//       //     if (hero.y <= wall.y + wall.height) {
//       //       speed = 0
//       //       hero.y = wall.y + wall.height
//       //     } else if (hero.y + hero.height >= wall.y) { 
//       //       speed = 0
//       //       wall.y = hero.y + hero.height
//       //     } else if (hero.x <= wall.x + wall.width) {
//       //       speed = 0
//       //       hero.x = wall.x + wall.width
//       //     } else if (hero.x + hero.width >= wall.x) {
//       //       speed = 0
//       //       wall.x = hero.x + hero.width
//       //     }
//       //   }

// FREEZES ALL MOVEMENT
// function move(wall) {
//   const speed = 8
//       if (
//         hero.x + hero.width >= wall.x &&
//         hero.x <= wall.x + wall.width &&
//         hero.y <= wall.y + wall.height &&
//         hero.y + hero.height >= wall.y
//       ) {
//         if((keys[38] || keys[87]) && hero.y > 0 && hero.y >= wall.y + wall.height) {
//           hero.y -= speed
//         } else if((keys[40] || keys[83]) && hero.y + hero.height < canvas.height && hero.y + hero.height <= wall.y) { 
//           hero.y += speed
//         } else if((keys[37] || keys[65]) && hero.x > 0 && hero.x >= wall.x + wall.width) {
//           hero.x -= speed
//         } else if((keys[39] || keys[68]) && hero.x + hero.width < canvas.width && hero.x + hero.width <= wall.x) {
//           hero.x += speed
//         }
//         }
// }

//  SHOOTS HERO UPWARDS
// // function detectCanvasBounds() {
// //   const speed = 8
// //   if (hero.y > 0) {
// //     hero.y -= speed
// //   } else if (hero.y + hero.height < canvas.height) {
// //     hero.y += speed
// //   } else if (hero.x > 0) {
// //     hero.x -= speed
// //   } else if (hero.x + hero.width < canvas.width) {
// //     hero.x += speed
// //   }
// // }

// DETECTS HERO MOVEMENT THROUGH WALLS, BUT DOESN'T STOP IT.
// function detectWalls(wall) {
  //   if (
  //     hero.x + hero.width >= wall.x &&
  //     hero.x <= wall.x + wall.width &&
  //     hero.y <= wall.y + wall.height &&
  //     hero.y + hero.height >= wall.y
  //     ) {
  //       heroMovement = -heroMovement
  //       console.log(heroMovement)
  //     }
  // }

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
