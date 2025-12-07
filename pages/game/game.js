// game.js
const TOTAL_TIME = 60;
const words = [
  "手机", "电脑", "书本", "水杯", "眼镜", "手表", "钥匙", "钱包",
  "苹果", "香蕉", "西瓜", "葡萄", "橙子", "草莓", "菠萝", "芒果", 
  "跑步", "游泳", "跳舞", "唱歌", "画画", "写字", "读书", "睡觉",
  "汽车", "飞机", "火车", "轮船", "自行车", "摩托车", "公交车", "地铁"
];

Page({
  data: {
    timeLeft: TOTAL_TIME,
    progress: 100,
    correctCount: 0,
    currentWord: "",
    isWordVisible: false,
    timer: null
  },

  onLoad() {
    this.startGame();
  },

  onUnload() {
    this.clearTimer();
  },

  startGame() {
    this.setData({
      timeLeft: TOTAL_TIME,
      progress: 100,
      correctCount: 0,
      isWordVisible: false
    });
    this.getRandomWord();
    this.startTimer();
  },

  startTimer() {
    this.clearTimer();
    const timer = setInterval(() => {
      const timeLeft = this.data.timeLeft - 1;
      const progress = (timeLeft / TOTAL_TIME) * 100;
      
      if (timeLeft <= 0) {
        this.clearTimer();
        this.gameOver();
        return;
      }

      this.setData({
        timeLeft,
        progress
      });
    }, 1000);

    this.setData({ timer });
  },

  clearTimer() {
    if (this.data.timer) {
      clearInterval(this.data.timer);
      this.setData({ timer: null });
    }
  },

  getRandomWord(shouldShow = false) {
    const randomIndex = Math.floor(Math.random() * words.length);
    this.setData({
      currentWord: words[randomIndex],
      isWordVisible: shouldShow
    });
  },

  toggleWordVisibility() {
    this.setData({
      isWordVisible: !this.data.isWordVisible
    });
  },

  handleCorrect() {
    this.setData({
      correctCount: this.data.correctCount + 1
    });
    // 点击正确后直接显示下一个词
    this.getRandomWord(true);
  },

  handleSkip() {
    // 点击跳过后直接显示下一个词
    this.getRandomWord(true);
  },

  handleEndGame() {
    // 结束游戏
    wx.showModal({
      title: '确认结束',
      content: '确定要结束游戏吗？',
      success: (res) => {
        if (res.confirm) {
          this.clearTimer();
          this.gameOver();
        }
      }
    });
  },

  gameOver() {
    this.clearTimer();
    wx.navigateTo({
      url: "/pages/result/result?score=" + this.data.correctCount
    });
  }
})

