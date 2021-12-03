
export class HighScore extends Phaser.Scene {
   constructor() {
      super('HighScore');
   }
  
   init(data) {
      this.LastScene = data.LastScene; 
      this.score = data.score;
   }

   preload() {
      this.load.image('highscore', './assets/Game/highscore.png');
      this.load.image('close', './assets/MainMenu/image/close.png');
      this.load.image('tryagain', './assets/Game/tryagain.png');
   }

   zeroPad(number, size) {
      var stringNumber = String(number);
      while (stringNumber.length < (size || 2)) {
         stringNumber = "0" + stringNumber;
      }
      return stringNumber;
   }

   create() {
      this.add.image(400, 300, 'highscore').setScale(0.5);
      
      const close = this.add.image(600, 100, 'close').setOrigin(0,0).setScale(0.25); 

      close.setInteractive({ cursor: 'url(./assets/Game/cursor/Link.cur), pointer'});
      if (this.LastScene == false) {
         close.on('pointerup', () => {
            this.scene.stop('HighScore')
         }, this);   
      } else {
         close.setInteractive(false);
         close.setInteractive({useHandPointer: false});

         this.tryagain = this.add.image(400, 555, 'tryagain').setScale(0.3);
         this.tryagain.setInteractive({ cursor: 'url(./assets/Game/cursor/Link.cur), pointer'});
         this.tryagain.on("pointerup", () => {
            location.reload();
         }, this)
      }
      
      var highscore = JSON.parse(localStorage.getItem('highscore'));
      // console.log(highscore.player);

      var format = { font: 'Bold 32px Courier', fill: '#ffffff', align: 'center' };

      for (let i = 0; i < Math.min(5, highscore.player.length); i++) {
         this.add.text(180, 180 + 68 * i, highscore.player[i].name, format);
         this.add.text(500, 180 + 68 * i, this.zeroPad(highscore.player[i].score, 6), format);
        
      }
   }

}