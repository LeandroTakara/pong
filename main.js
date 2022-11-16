import Player from './modules/Player.js'
import Ball from './modules/Ball.js'
import { checkPlayerBallCollision, outScreen } from './utils/collisionDetection.js'

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

const btnUp1 = document.getElementById('upBtn1')
const btnDown1 = document.getElementById('downBtn1')
const btnUp2 = document.getElementById('upBtn2')
const btnDown2 = document.getElementById('downBtn2')

const canvasSize = {
  width: canvas.width,
  height: canvas.height,
  halfWidth: canvas.width / 2,
  halfHeight: canvas.height / 2
}

const borderHeight = 10
const gameLimits = {
  top: borderHeight,
  bottom: canvasSize.height - borderHeight,
  left: 0,
  right: canvasSize.width
}
window['gameLimits'] = gameLimits

const stripes = 20
const gap = 10
const stripeSize = ((gameLimits.bottom - gameLimits.top) - gap * (stripes + 1)) / stripes

const player1 = new Player(ctx, 20, canvasSize.halfHeight, 12, 50)
const player2 = new Player(ctx, canvasSize.width - 20, canvasSize.halfHeight, 12, 50)
const ball = new Ball(ctx, canvasSize.halfWidth, canvasSize.halfHeight, 8)

const controls = {
  player1: ['KeyW', 'KeyS'],
  player2: ['ArrowUp', 'ArrowDown']
}

function getDirection(direction) {
  if (direction === 'KeyW' || direction === 'ArrowUp') return 'up'
  else if (direction === 'KeyS' || direction === 'ArrowDown') return 'down'
}

let p1Score = 0
let p2Score = 0
let animation = null

function startGame() {
  drawScene()
  drawScore()
  player1.draw()
  player2.draw()
  ball.draw()
  
  setTimeout(() => {
    const possibleVelocitiesX = [-4, -3, 3, 4]
    const possibleVelocitiesY = [-2, -1, 1, 2]
  
    ball.velocityX = possibleVelocitiesX[Math.floor(Math.random() * possibleVelocitiesX.length)]
    ball.velocityY = possibleVelocitiesY[Math.floor(Math.random() * possibleVelocitiesY.length)]

    animation = requestAnimationFrame(update)
  }, 3000)
}

function drawScene() {
  ctx.save()
  // black background
  ctx.fillRect(0, 0, canvasSize.width, canvasSize.height)
  
  //  borders
  ctx.fillStyle = 'rgb(255, 255, 255)'
  ctx.fillRect(0, 0, canvasSize.width, borderHeight)
  ctx.fillRect(0, gameLimits.bottom, canvasSize.width, borderHeight)
  ctx.fillRect(0, 0, 3, canvasSize.height)
  ctx.fillRect(canvasSize.width - 3, 0, 3, canvasSize.height)

  // draw stripes
  for (let i = 0; i < stripes; i++) {
    ctx.fillRect(
      canvasSize.halfWidth - stripeSize / 2,
      gameLimits.top + gap + i * (stripeSize + gap),
      stripeSize,
      stripeSize
    )
  }
  ctx.restore()
}

function drawScore() {
  ctx.save()
  ctx.fillStyle = 'rgb(255, 255, 255)'
  ctx.font = '40px Impact'
  ctx.textBaseline = 'center'
  ctx.textAlign = 'center'
  ctx.fillText(p1Score, canvasSize.halfWidth - 100, 100)
  ctx.fillText(p2Score, canvasSize.halfWidth + 100, 100)
  ctx.restore()
}

function update() {
  drawScene()
  drawScore()

  player1.update()
  player2.update()
  ball.update()

  if (outScreen(ball.x)) {
    cancelAnimationFrame(animation)

    setTimeout(() => {
      if (ball.x > gameLimits.right) p1Score++
      else p2Score++
      
      player1.x = 20
      player1.y = canvasSize.halfHeight
      
      player2.x = canvasSize.width - 20
      player2.y = canvasSize.halfHeight
      
      ball.x = canvasSize.halfWidth
      ball.y = canvasSize.halfHeight
      
      startGame()
    }, 1000)
  } else { 
    if (checkPlayerBallCollision(player1, ball)) {
      ball.x = player1.x + player1.width / 2 + ball.radius
      ball.setNewVelocity(Math.abs(ball.y - player1.y), (ball.radius + player2.height / 2))
    } else if (checkPlayerBallCollision(player2, ball)) {    
      ball.x = player2.x - player2.width / 2 - ball.radius
      ball.setNewVelocity(Math.abs(ball.y - player2.y), (ball.radius + player2.height / 2))
    }

    animation = requestAnimationFrame(update)
  }
}

startGame()

addEventListener('keydown', e => {
  const key = e.code
  if (controls.player1.includes(key)) {
    player1.addDirection(getDirection(key))
  } else if (controls.player2.includes(key)) {
    player2.addDirection(getDirection(key))
  }
})

addEventListener('keyup', e => {
  const key = e.code
  if (controls.player1.includes(key)) {
    player1.removeDirection(getDirection(key))
  } else if (controls.player2.includes(key)) {
    player2.removeDirection(getDirection(key))
  }
})

btnUp1.addEventListener('touchstart', () => player1.addDirection('up'))
btnDown1.addEventListener('touchstart', () => player1.addDirection('down'))
btnUp2.addEventListener('touchstart', () => player2.addDirection('up'))
btnDown2.addEventListener('touchstart', () => player2.addDirection('down'))

btnUp1.addEventListener('touchend', () => player1.removeDirection('up'))
btnDown1.addEventListener('touchend', () => player1.removeDirection('down'))
btnUp2.addEventListener('touchend', () => player2.removeDirection('up'))
btnDown2.addEventListener('touchend', () => player2.removeDirection('down'))

btnUp1.addEventListener('mousedown', () => player1.addDirection('up'))
btnDown1.addEventListener('mousedown', () => player1.addDirection('down'))
btnUp2.addEventListener('mousedown', () => player2.addDirection('up'))
btnDown2.addEventListener('mousedown', () => player2.addDirection('down'))

btnUp1.addEventListener('mouseup', () => player1.removeDirection('up'))
btnDown1.addEventListener('mouseup', () => player1.removeDirection('down'))
btnUp2.addEventListener('mouseup', () => player2.removeDirection('up'))
btnDown2.addEventListener('mouseup', () => player2.removeDirection('down'))
