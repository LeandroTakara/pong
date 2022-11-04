const checkBorderCollision = dot => 
  dot < window.gameLimits.top || dot > window.gameLimits.bottom

const outScreen = dot =>
  dot < window.gameLimits.left || dot > window.gameLimits.right

const checkPlayerBallCollision = (player, ball) => 
  Math.abs(ball.x - player.x) < ball.radius + player.width / 2 &&
  Math.abs(ball.y - player.y) < ball.radius + player.height / 2 &&
  (
    ball.velocityX < 0 
    ? ball.x > player.x + player.width / 2
    : ball.x < player.x - player.width / 2
  )

export {
  checkBorderCollision,
  outScreen,
  checkPlayerBallCollision
}
