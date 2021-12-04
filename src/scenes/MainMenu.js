
export class MainMenu extends Phaser.Scene {
   constructor() {
      super('MainMenu');
   }

   preload() {
      this.load.image('logo', './assets/MainMenu/image/logo.png');
      this.load.image('play-btn', './assets/MainMenu/image/play-btn.png');
      this.load.image('highscore-btn', './assets/MainMenu/image/highscore-btn.png');
      this.load.image('choose', './assets/MainMenu/image/arrow.png');
      this.load.image("bg", "./assets/MainMenu/image/covid.jpg");
      this.load.audio("play", "./assets/MainMenu/audio/play.wav");
      this.load.image('scoreboard', './assets/Game/scoreboard.png');
      this.load.image('ok', './assets/Game/oke.png');
   }

   create() {

      this.input.setDefaultCursor('url(./assets/Game/cursor/Normal.cur), pointer');
      
      this.add.image(800/2, 600/2, 'bg');
      this.sound.mute = false;
      const playBtn = this.add.image(280, 450, 'play-btn').setScale(0.2);
      playBtn.setOrigin(0, 0);
      playBtn.setInteractive({ cursor: 'url(./assets/Game/cursor/Link.cur), pointer'});

      const highscoreBtn = this.add.image(530, 450, 'highscore-btn').setOrigin(0,0).setScale(0.35); 
      highscoreBtn.setInteractive({ cursor: 'url(./assets/Game/cursor/Link.cur), pointer'});

      highscoreBtn.on('pointerup', () => {
         this.scene.launch('HighScore', {LastScene: false});
         // playBtn.setVisible(false); 
      }, this)

      const choose = this.add.image(210, 450, 'choose');
      choose.setOrigin(0, 0);
      choose.setVisible(false);
      
      var highscore = localStorage.getItem('highscore');

      if (highscore == null) {
         var sample = {
            player: []
         }
         for (let i = 0; i < 5; i++) {
            sample.player.push({name: '', score: 0})
         };
         
         // console.log(sample);
         localStorage.setItem('highscore', JSON.stringify(sample));
      }


      this.scene.launch('Gui');

      // click and release
      playBtn.on("pointerup", () => {
         this.sound.play("play");
         this.scene.start("Story1");
      })
      
      // hoverring
      playBtn.on("pointerover", () => {
         choose.setVisible(true);
      })

      playBtn.on("pointerout", () => {
         choose.setVisible(false);
      })
   }
}