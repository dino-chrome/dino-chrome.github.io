GameOverPanel.prototype.draw = function() {
  var dimensions = GameOverPanel.dimensions;
  var centerX = this.canvasDimensions.WIDTH / 2;
  var textSourceX = dimensions.TEXT_X;
  var textSourceY = dimensions.TEXT_Y;
  var textSourceWidth = dimensions.TEXT_WIDTH;
  var textSourceHeight = dimensions.TEXT_HEIGHT;
  var textTargetX = Math.round(centerX - (dimensions.TEXT_WIDTH / 2));
  var textTargetY = Math.round((this.canvasDimensions.HEIGHT - 25) / 3);
  var textTargetWidth = dimensions.TEXT_WIDTH;
  var textTargetHeight = dimensions.TEXT_HEIGHT;
  var restartSourceWidth = dimensions.RESTART_WIDTH;
  var restartSourceHeight = dimensions.RESTART_HEIGHT;
  var restartTargetX = centerX - (dimensions.RESTART_WIDTH / 2);
  var restartTargetY = this.canvasDimensions.HEIGHT / 2;
  if (IS_HIDPI) {
    textSourceY *= 2;
    textSourceX *= 2;
    textSourceWidth *= 2;
    textSourceHeight *= 2;
    restartSourceWidth *= 2;
    restartSourceHeight *= 2;
  }
  // Custom GitHub message
  this.canvasCtx.fillStyle = '#C9D1D9';
  this.canvasCtx.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif';
  this.canvasCtx.fillText('Merge Conflict Detected!', centerX - 70, textTargetY - 20);
  // Original Game Over text
  this.canvasCtx.drawImage(this.textSprite,
    textSourceX, textSourceY, textSourceWidth, textSourceHeight,
    textTargetX, textTargetY, textTargetWidth, textTargetHeight);
  this.canvasCtx.drawImage(this.restartImg, 0, 0,
    restartSourceWidth, restartSourceHeight,
    restartTargetX, restartTargetY, dimensions.RESTART_WIDTH,
    dimensions.RESTART_HEIGHT);
};
