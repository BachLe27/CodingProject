
export class LastScene extends Phaser.Scene {
   constructor() {
      super('LastScene');
   }

   init() {
      
   }

   preload() {
      
   }

   formatTime(seconds){
      // Minutes
      var minutes = Math.floor(seconds/60);
      // Seconds
      var partInSeconds = seconds%60;
      // Adds left zeros to seconds
      partInSeconds = partInSeconds.toString().padStart(2,'0');
      // Returns formated time
      return `${minutes}:${partInSeconds}`;
   }

   create() {
      var { width, height } = this.sys.game.canvas;
      this.bg = this.add.image(800/2, 600/2, 'game-bg').setScale(1, 0.9);
      var scoreboard = this.add.image(800/2, 600/2 - 5, 'scoreboard');

      var btn = this.add.image(315, 375, 'ok').setOrigin(0, 0);
      btn.setInteractive({ cursor: 'url(./assets/Game/cursor/Link.cur), pointer'});

      // Sau khi luu ten
      var score = this.game.registry.get('score');
      var time = this.formatTime(score);

      this.add.text(310, 160, 'Your Time:', { font: 'Bold 32px Courier', fill: '#ffffff', align: 'center' });
      
      this.add.text(340, 205, time, { font: 'Bold 48px Courier', fill: '#ffffff', align: 'center' });

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
            score: this.game.registry.get('score'),
         }

         if (this.game.registry.get('score') >= highscore.player.at(-1).score) {
            highscore.player.push(info);
            
         } else {
            for (let i = 0; i < highscore.player.length; i++) {
               // console.log(this.score, highscore.player[i].score);
               if (this.game.registry.get('score') < highscore.player[i].score) {
                  console.log('added');
                  highscore.player.splice(i, 0, info);
                  break;
               }
            }
         }

         localStorage.setItem('highscore', JSON.stringify(highscore));

         this.sound.play('play');
         this.scene.sleep('LastScene');
         this.scene.launch('HighScore', {LastScene: true});

      }, this);
   }

   update() {
      
   }
   
}