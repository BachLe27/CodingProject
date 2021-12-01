
export class LastScene extends Phaser.Scene {
   constructor() {
      super('LastScene');
   }

   init(data) {
      this.score = data.score || 0;
   }

   preload() {
      
   }

   zeroPad(number, size) {
      var stringNumber = String(number);
      while (stringNumber.length < (size || 2)) {
         stringNumber = "0" + stringNumber;
      }
      return stringNumber;
   }

   create() {
      var { width, height } = this.sys.game.canvas;

      var scoreboard = this.add.image(800/2, 600/2, 'scoreboard');

      var btn = this.add.image(345, 375, 'ok').setOrigin(0, 0);
      btn.setInteractive({ cursor: 'url(assets/Game/cursor/Link.cur), pointer'});

      // Sau khi luu ten
      
      this.add.text(290, 160, 'Your Score:', { font: 'Bold 32px Courier', fill: '#ffffff', align: 'center' });
      
      this.add.text(310, 205, this.zeroPad(this.score, 6), { font: 'Bold 48px Courier', fill: '#ffffff', align: 'center' });

      this.add.text(250, 270, 'Enter your name:', { font: '32px Courier', fill: '#ffffff' });

      var textEntry = this.add.text(318, 328, '', { font: 'Bold 32px Courier', fill: '#ffffff' });

      this.input.keyboard.on('keydown', function (event) {

         if (event.keyCode === 8 && textEntry.text.length > 0)
         {
               textEntry.text = textEntry.text.substr(0, textEntry.text.length - 1);
         }
         else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode <= 90))
         {
            if (textEntry.text.length < 8)
               var char = event.key || '';
               textEntry.text += char.toUpperCase();
         }
      });


      btn.on('pointerup', () => {
         // THEM DIEM
         btn.destroy();
         var highscore = JSON.parse(localStorage.getItem('highscore'));

         var info = {
            name: textEntry.text,
            score: this.score
         }

         if (this.score <= highscore.player.at(-1).score) {
            highscore.player.push(info);
            
         } else {
            for (let i = 0; i < highscore.player.length; i++) {
               // console.log(this.score, highscore.player[i].score);
               if (this.score > highscore.player[i].score) {
                  // console.log('added');
                  highscore.player.splice(i, 0, info);
                  break;
               }
            }
         }

         localStorage.setItem('highscore', JSON.stringify(highscore));

         this.sound.play('play');
         this.scene.sleep('LastScene');
         this.scene.launch('HighScore', {LastScene: true, score: this.score});

      }, this);
   }

   update() {
      
   }
   
}