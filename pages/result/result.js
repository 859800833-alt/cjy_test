// result.js
Page({
  data: {
    score: 0,
    evaluation: ''
  },

  onLoad(options) {
    const score = parseInt(options.score || 0);
    const evaluation = this.getEvaluation(score);
    
    this.setData({
      score,
      evaluation
    });
  },

  getEvaluation(score) {
    if (score >= 15) return '太棒了！猜词达人！';
    if (score >= 10) return '不错哦！继续加油！';
    if (score >= 5) return '表现不错！再接再厉！';
    return '继续加油！下次会更好！';
  },

  restartGame() {
    wx.navigateTo({
      url: '/pages/game/game'
    });
  },

  goHome() {
    wx.navigateBack({
      delta: 2
    });
  }
})

