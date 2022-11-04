import { checkBorderCollision } from '../utils/collisionDetection.js'

export default class Ball {
  constructor(ctx, x, y, radius) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.radius = radius
    this.velocityX = 0
    this.velocityY = 0
  }

  draw() {
    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.fillStyle = 'rgb(255, 255, 255)'
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    this.ctx.fill()
    this.ctx.restore()
  }

  update() {
    this.x += this.velocityX
    this.y += this.velocityY

    if (checkBorderCollision(this.y - this.radius)) { // top
      // (window.gameLimits.top + this.radius) - (this.y - this.radius - window.gameLimits.top)
      this.y = 2 * (window.gameLimits.top + this.radius) - this.y
      this.velocityY *= -1
    } else if (checkBorderCollision(this.y + this.radius)) { // bottom
      // (window.gameLimits.bottom - this.radius) - (this.y + this.radius - window.gameLimits.bottom)
      this.y = 2 * (window.gameLimits.bottom - this.radius) - this.y
      this.velocityY *= -1
    }

    this.draw()
  }

  setNewVelocity(distY, maxContact) {
    this.velocityX = (4 / maxContact * distY + 5) * (this.velocityX < 0 ? 1 : -1) // min: ±5; max: ±9
    this.velocityY = (8 / maxContact * distY + 2) * (this.velocityY < 0 ? -1 : 1) // min: ±2; max: ±10
  }
}