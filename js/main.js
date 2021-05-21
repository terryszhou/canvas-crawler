console.log("Hello")

const movementDisplay = document.getElementById("movement")
const gameStatus = document.getElementById("status")
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext('2d')

canvas.setAttribute("height", getComputedStyle(canvas)["height"])
canvas.setAttribute("width", getComputedStyle(canvas)["width"])

// VARIABLES AND CONSTRUCTORS
let frameCount = 0
let seconds = 12
let runGame
let runCountDown
let countDisplay = document.getElementById("countdown")
let titlescreenBtn = document.getElementById("titlescreen")
let playgameBtn = document.getElementById("playgame")
let meowBtn = document.getElementById("meow")

var walls = []

walls.push({
    x: 240,
    y: 0,
    width: 20,
    height: 100
  },
  {
    x: 60,
    y: 80,
    width: 180,
    height: 20
  },
  {
    x: 60,
    y: 100,
    width: 20,
    height: 200
  },
  {
    x: 60,
    y: 280,
    width: 300,
    height: 20
  },
  {
    x: 340,
    y: 180,
    width: 20,
    height: 120
  },
  {
    x: 340,
    y: 160,
    width: 120,
    height: 20
  },
  {
    x: 440,
    y: 60,
    width: 20,
    height: 100
  },
  {
    x: 540,
    y: 0,
    width: 20,
    height: 140
  },
  {
    x: 500,
    y: 140,
    width: 60,
    height: 20
  },
  {
    x: 500,
    y: 160,
    width: 20,
    height: 100
  },
  {
    x: 700,
    y: 0,
    width: 20,
    height: 80
  },
  {
    x: 500,
    y: 300,
    width: 20,
    height: 60
  },
  {
    x: 440,
    y: 300,
    width: 180,
    height: 20
  },
  {
    x: 600,
    y: 240,
    width: 20,
    height: 80
  },
  {
    x: 700,
    y: 160,
    width: 100,
    height: 20
  },
  {
    x: 600,
    y: 220,
    width: 60,
    height: 20
  },
  {
    x: 380,
    y: 60,
    width: 60,
    height: 20
  },
  {
    x: 190,
    y: 300,
    width: 20,
    height: 40
  },
  {
    x: 740,
    y: 280,
    width: 60,
    height: 20
  },
  {
    x: 300,
    y: 340,
    width: 80,
    height: 20
  }
)

class Sound {
  constructor(audioSrc) {
  this.sound = document.createElement("audio");
  this.sound.src = audioSrc;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  this.sound.volume = 0.25
  document.body.appendChild(this.sound);
  }
  play() {
    this.sound.play();
  }
  stop() {
    this.sound.pause();
  }
}

let titleMusic = new Sound("../audio/Origami Repetika - Kind Gentle Beautiful Person.mp3")

class Crawler{
    constructor(imgSrc, x, y, color, width, height, facing) {
      this.img = new Image()
      this.imgSrc = imgSrc
      this.x = x
      this.y = y
      this.color = color
      this.width = width
      this.height = height
      this.alive = true
      this.facing = null
    }

    render() {
      this.img.src = this.imgSrc
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
}

let ogres = [new Crawler("../img/ghostwhite.png", Math.random() * canvas.width, Math.random() * canvas.height, "#bada55", 20, 20, null)]
let quicksands = [
  new Crawler("../img/quicksandtile.png", 720, 60, "saddlebrown", 80, 20),
  new Crawler("../img/quicksandtile.png", 690, 260, "saddlebrown", 50, 60),
  new Crawler("../img/quicksandtile.png", 160, 150, "saddlebrown", 100, 80),
  new Crawler("../img/quicksandtile.png", 170, 300, "saddlebrown", 20, 40),
  new Crawler("../img/quicksandtile.png", 190, 340, "saddlebrown", 20, 20),
  new Crawler("../img/quicksandtile.png", 210, 300, "saddlebrown", 20, 40),
  new Crawler("../img/quicksandtile.png", 460, 140, "saddlebrown", 40, 20),
  new Crawler("../img/quicksandtile.png", 600, 30, "saddlebrown", 40, 80),
  new Crawler("../img/quicksandtile.png", 500, 360, "saddlebrown", 20, 60),
  new Crawler("../img/quicksandtile.png", 0, 260, "saddlebrown", 30, 40),
  new Crawler("../img/quicksandtile.png", 30, 180, "saddlebrown", 30, 40),
  new Crawler("../img/quicksandtile.png", 0, 100, "saddlebrown", 30, 40)
]
let hero = new Crawler("../img/catneutral.png", 100, 200, "hotpink", 20, 20)
let exit = new Crawler("../img/doorlocked.png", 180, 5, "white", 60, 60)
let latchkey = new Crawler("../img/782285-middle.png", 760, 20, "gold", 20, 20)

let keys = []
window.addEventListener("keydown", function (e) {
  keys[e.keyCode] = true
})
window.addEventListener("keyup", function (e) {
  keys[e.keyCode] = false
})

function drawWalls() {
  var walltile = new Image()
  walltile.src = "../img/walltile.png"
  for(i = 0; i < walls.length; i++){
    var walltilepat = ctx.createPattern(walltile, "repeat")
    ctx.fillStyle = walltilepat
    ctx.fillRect(walls[i].x, walls[i].y, walls[i].width, walls[i].height)
  }
}

// PLAYER FUNCTIONS
function move() {
  const speed = 16
  if((keys[38] || keys[87]) && hero.y > 0) {
    hero.y -= speed
    hero.facing = "north"
      if (frameCount % 2 == 0) {
        hero.imgSrc = "../img/catnorth1.png"
        // hero.imgSrc = "../img/hoodkidup1.png"
      } else {
        hero.imgSrc = "../img/catnorth2.png"
        // hero.imgSrc = "../img/hoodkidup2.png"
      }
  } else if((keys[40] || keys[83]) && hero.y + hero.height < canvas.height) { 
    hero.y += speed
    hero.facing = "south"
      if (frameCount % 2 == 0) {
        hero.imgSrc = "../img/catsouth1.png"
        // hero.imgSrc = "../img/hoodkiddown1.png"
      } else {
        hero.imgSrc = "../img/catsouth2.png"
        // hero.imgSrc = "../img/hoodkiddown2.png"
      }
  } else if((keys[37] || keys[65]) && hero.x > 0) {
    hero.x -= speed
    hero.facing = "west"
      if (frameCount % 2 == 0) {
        hero.imgSrc = "../img/catwest1.png"
        // hero.imgSrc = "../img/hoodkidleft1.png"
      } else {
        hero.imgSrc = "../img/catwest2.png"
        // hero.imgSrc = "../img/hoodkidleft2.png"

      }
  } else if((keys[39] || keys[68]) && hero.x + hero.width < canvas.width) {
    hero.x += speed
    hero.facing = "east"
      if (frameCount % 2 == 0) {
        hero.imgSrc = "../img/cateast1.png"
        // hero.imgSrc = "../img/hoodkidright1.png"
      } else {
        hero.imgSrc = "../img/cateast2.png"
        // hero.imgSrc = "../img/hoodkidright2.png"

      }
  } else {
    hero.imgSrc = "../img/catneutral.png"
    // hero.imgSrc = "../img/hoodkidneutral.png"
  }
}

function detectWalls(hero, wall) {
  let speed = 9
    if (
      hero.x + hero.width >= wall.x &&
      hero.x <= wall.x + wall.width &&
      hero.y <= wall.y + wall.height &&
      hero.y + hero.height >= wall.y
      ) { 
          if (hero.facing == "north" && hero.y <= wall.y + wall.height) {
            hero.y += speed
          } else if (hero.facing == "south" && hero.y + hero.height >= wall.y) { 
            hero.y -= speed
          } else if (hero.facing == "west" && hero.x <= wall.x + wall.width) {
            hero.x += speed
          } else if (hero.facing == "east" && hero.x + hero.width >= wall.x) {
            hero.x -= speed
          }
        }
}

function detectQuickSands(hero, quicksand) {
  let speed = 4
    if (
      hero.x + hero.width >= quicksand.x &&
      hero.x <= quicksand.x + quicksand.width &&
      hero.y <= quicksand.y + quicksand.height &&
      hero.y + hero.height >= quicksand.y
      ) { 
          if (hero.facing == "north" && hero.y <= quicksand.y + quicksand.height) {
            hero.y += speed
          } else if (hero.facing == "south" && hero.y + hero.height >= quicksand.y) { 
            hero.y -= speed
          } else if (hero.facing == "west" && hero.x <= quicksand.x + quicksand.width) {
            hero.x += speed
          } else if (hero.facing == "east" && hero.x + hero.width >= quicksand.x) {
            hero.x -= speed
          }
        } 
}

// ENEMY FUNCTIONS
function createOgres() {
  if (ogres.length < 4) {
    let apparition = new Sound("../audio/zapsplat_horror_ghost_evp_eerie_male_lo_fi_glitchy_vocalisation_breathy_001_58828.mp3")
    apparition.play()
    ogres.push(new Crawler("../img/ghostwhite.png", Math.random() * canvas.width, Math.random() * canvas.height, "#bada55", 20, 20))
    ogres.forEach(ogre => {
      ogre.render()
    })
  }
}

function ogreMove(ogre) {
  let diffX = hero.x - ogre.x
  let diffY = hero.y - ogre.y
  let speed = 3
  let randomNum = Math.floor((Math.random()*3)*(Math.random() < 0.5 ? -1 : 1))
  if (diffX > 0 && diffX < 120 && ogre.x + ogre.width < canvas.width) {
    ogre.x += speed
    ogre.color = "red"
    ogre.imgSrc = "../img/ghostblackeast.png"
  } else if (diffX > 120 && ogre.x + ogre.width < canvas.width && ogre.x > 0 && ogre.y > 0 && ogre.y + ogre.height < canvas.height) {
    ogre.x += randomNum
    ogre.y += randomNum
    ogre.color = "#bada55"
    ogre.imgSrc = "../img/ghostwhite.png"
  }
  if (diffX < 0 && diffX > -120 && ogre.x > 0) {
    ogre.x -= speed
    ogre.color = "red"
    ogre.imgSrc = "../img/ghostblackwest.png"
  } else if (diffX < -120 && ogre.x + ogre.width < canvas.width && ogre.x > 0 && ogre.y > 0 && ogre.y + ogre.height < canvas.height) {
    ogre.x -= randomNum
    ogre.y -= randomNum
    ogre.color = "#bada55"
    ogre.imgSrc = "../img/ghostwhite.png"
  }
  if (diffY > 0 && diffY < 120 && ogre.y + ogre.height < canvas.height) {
    ogre.y += speed
    ogre.color = "red"
    ogre.imgSrc = "../img/ghostblacksouth.png"
  } else if (diffY > 120 && ogre.x + ogre.width < canvas.width && ogre.x > 0 && ogre.y > 0 && ogre.y + ogre.height < canvas.height) {
    ogre.x += randomNum
    ogre.y += randomNum
    ogre.color = "#bada55"
    ogre.imgSrc = "../img/ghostwhite.png"
  }
  if (diffY < 0 && diffY > -120 && ogre.y > 0) {
    ogre.y -= speed
    ogre.color = "red"
    ogre.imgSrc = "../img/ghostblacknorth.png"
  } else if (diffY < -120 && ogre.x + ogre.width < canvas.width && ogre.x > 0 && ogre.y > 0 && ogre.y + ogre.height < canvas.height) {
    ogre.x -= randomNum
    ogre.y -= randomNum
    ogre.color = "#bada55"
    ogre.imgSrc = "../img/ghostwhite.png"
  }
}

function detectHit(ogre) {
  if (
    hero.x + hero.width >= ogre.x &&
    hero.x <= ogre.x + ogre.width &&
    hero.y <= ogre.y + ogre.height &&
    hero.y + hero.height >= ogre.y
    ) {
      hero.alive = false
      // hero.imgSrc = "../img/catdead.png"
      clearInterval(runGame)
      clearInterval(runCountDown)
      gameStatus.innerText = "DEAD!"
    }
}

// LATCHKEY FUNCTIONS
function respawnLatchKey() {
  latchkey.x = Math.random() * canvas.width - 10
  latchkey.y = Math.random() * canvas.height - 10
}

function checkLatchKeyWall(latchkey, wall) {
  if (
    latchkey.x + latchkey.width >= wall.x &&
    latchkey.x <= wall.x + wall.width &&
    latchkey.y <= wall.y + wall.height &&
    latchkey.y + latchkey.height >= wall.y
    ) {
      latchkey.x = 760
      latchkey.y = 20
    } 
}

function countDown() {
  seconds--
  if (latchkey.alive) {
    if (seconds == 0) {
      seconds = 12
    }
    countDisplay.innerText = seconds
  } else {
      countDisplay.innerText = "KEY GET!!"
  }
}

function getLatchKey() {
  if (
    hero.x + hero.width >= latchkey.x &&
    hero.x <= latchkey.x + latchkey.width &&
    hero.y <= latchkey.y + latchkey.height &&
    hero.y + hero.height >= latchkey.y
    ) {
      gameStatus.innerText = "GOT KEY!"
      countDisplay.innerText = "KEY GET!!"
      if (frameCount % 2 == 0) {
        exit.imgSrc = "../img/dooropen.png"
      } else {
        exit.imgSrc = "../img/dooropen2.png"
      }
      let keyGet = new Sound("../audio/zapsplat_bells_small_hand_bell_ring_in_water_weird_cartoon_tone_001_61906.mp3")
      keyGet.play()
      hero.color = "gold"
      latchkey.alive = false
    }
}

function winGame() {
  let speed = 8
  if (
    hero.x + hero.width >= exit.x &&
    hero.x <= exit.x + exit.width &&
    hero.y <= exit.y + exit.height &&
    hero.y + hero.height >= exit.y
    ) {
      if (hero.color == "hotpink") {
        if (hero.facing == "north" && hero.y <= exit.y + exit.height) {
          hero.y += speed
        } else if (hero.facing == "south" && hero.y + hero.height >= exit.y) { 
          hero.y -= speed
        } else if (hero.facing == "west" && hero.x <= exit.x + exit.width) {
          hero.x += speed
        } else if (hero.facing == "east" && hero.x + hero.width >= exit.x) {
          hero.x -= speed
        }
        exit.color = "crimson"
        gameStatus.innerText = "GET KEY!"
      } else {
        exit.color = "white"
      }
      if (hero.color == "gold") {
        hero.alive = false
        clearInterval(runGame)
        clearInterval(runCountDown)
        gameStatus.innerText = "WIN!!"
        ctx.font = "80px 'Press Start 2P', monospace"
        ctx.fillStyle = "hotpink"
        ctx.fillText("¡WAOW!", 170, 245)
        let waow = new Sound("../audio/anime-wow-sound-effect.mp3")
        waow.play()
      }
    }
}

// BUTTON FUNCTIONS
titleInit()

meowBtn.addEventListener("click", () => {
  let meowArray = 
  [
    new Sound("../audio/noisecreations_SFX-NCFREE02_Cat-Meow_x2.mp3"),
    new Sound("../audio/Blastwave_FX_CatMeow_SFXB.203.mp3"), 
    new Sound("../audio/zapsplat_animals_cat_kitten_meow_006_30182.mp3"),
    new Sound("../audio/animals_cat_meow_002.mp3"),
    new Sound("../audio/zapsplat_animals_dog_puppy_several_weeks_old_single_bark_ridgeback_cross_bullmastiff_010_56165.mp3")
  ]
  let index = Math.floor(Math.random() * 1000) % meowArray.length
  meowArray[index].play()
})

titlescreenBtn.addEventListener("click", () => {
  clearInterval(runGame)
  clearInterval(runCountDown)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  titleInit()
})

function titleInit() {
  titleMusic.play()
  ctx.font = "60px 'Press Start 2P', monospace"
  ctx.fillStyle = "goldenrod"
  ctx.fillText("CAT CRAWLER", 75, 200)
  ctx.font = "20px 'Press Start 2P', monospace"
  ctx.fillStyle = "goldenrod"
  ctx.fillText("Help Dungeon-Cat escape!", 180, 250)
  ctx.fillText("Avoid ghosts!", 280, 300)
  ctx.font = "15px 'Press Start 2P', monospace"
  ctx.fillStyle = "goldenrod"
  ctx.fillText("WASD or Arrow Keys", 265, 390)
  titlescreenBtn.innerText = ""
  gameStatus.innerText = ""
  playgameBtn.innerText = "PLAY GAME!"
  countDisplay.innerText = ""
  movementDisplay.innerText = ""
  meowBtn.innerText = ""
}

playgameBtn.addEventListener("click", () => {
  let ninthLife = new Sound("../audio/noisecreations_SFX-NCFREE02_MoaningCat.mp3")
  ninthLife.play()
  titleMusic.stop()
  frameCount = 0
  seconds = 12
  playgameBtn.innerText = "RESET GAME!"
  meowBtn.innerText = "MEOW!"
  titlescreenBtn.innerText = "TITLE SCREEN"
  gameStatus.innerText = "ESCAPE!"
  countDisplay.innerText = 12
  ogres = [new Crawler("../img/ghostwhite.png", Math.random() * canvas.width, Math.random() * canvas.height, "#bada55", 20, 20, null)]
  hero = new Crawler("../img/catneutral.png", 100, 200, "hotpink", 20, 20)
  exit = new Crawler("../img/doorlocked.png", 180, 5, "white", 60, 60)
  latchkey = new Crawler("../img/782285-middle.png", 760, 20, "gold", 20, 20)
  clearInterval(runGame)
  clearInterval(runCountDown)
  gameInit()
})

// GAME LOOP
function gameInit() {
  runGame = setInterval(gameLoop, 60)
  runCountDown = setInterval(countDown, 1000)
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawWalls()
  frameCount++
  exit.render()
  for (k = 0; k < quicksands.length; k++) {
    quicksands[k].render()
    detectQuickSands(hero, quicksands[k])
  }
  // PLAYER FUNCTIONS
  move()
  getLatchKey()
  winGame()
  for (j = 0; j < walls.length; j++) {
    detectWalls(hero, walls[j])

    if (frameCount % 200 === 0) {
      respawnLatchKey()
    }
    checkLatchKeyWall(latchkey, walls[j])
  }
  movementDisplay.textContent = `X: ${hero.x} Y: ${hero.y}`
  // ENEMY FUNCTIONS
  if (frameCount % 100 === 0) {
    createOgres()
  }
  for (i = 0; i < ogres.length; i++) {
    ogreMove(ogres[i])
    detectHit(ogres[i])
      ogres[i].render()
  }
  // RENDERING FUNCTIONS
  if (hero.alive) {
    hero.render()
  }
  if (latchkey.alive) {
    latchkey.render()
  }
}