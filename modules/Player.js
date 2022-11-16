import { checkBorderCollision } from '../utils/collisionDetection.js'

export default class Player {
  constructor(ctx, x, y, width, height) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.velocity = 0
    this.directions = []
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

  getVelocity() {
    if (this.directions.length === 2 || this.directions.length === 0) this.velocity = 0
    else if (this.directions.includes('up')) this.velocity = -5
    else if (this.directions.includes('down')) this.velocity = 5
  }

  addDirection(direction) {
    if (!this.directions.includes(direction)) this.directions.push(direction)
    this.getVelocity()
  }

  removeDirection(direction) {
    this.directions = this.directions.filter(dir => dir !== direction)
    this.getVelocity()
  }
}
