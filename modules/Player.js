import { checkBorderCollision } from '../utils/collisionDetection.js'

export default class Player {
  constructor(ctx, x, y, width, height) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.velocity = 0
  }

  draw() {
    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.fillStyle = 'rgb(255, 255, 255)'
    this.ctx.fillRect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    )
    this.ctx.fill()
    this.ctx.restore()
  }

  update() {
    this.y += this.velocity

    if (checkBorderCollision(this.y - this.height / 2)) // top
      this.y = window.gameLimits.top + this.height / 2
    else if (checkBorderCollision(this.y + this.height / 2)) // bottom
      this.y = window.gameLimits.bottom - this.height / 2

    this.draw()
  }

  setDirection(direction) {
    this.velocity = direction === 'up' ? -5 : 5
  }
}
