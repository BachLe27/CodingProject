
export class MainMenu extends Phaser.Scene {
   constructor() {
      super('MainMenu');
   }

   preload() {
      this.load.image('logo', 'assets/MainMenu/image/logo.png');
      this.load.image('play-btn', 'assets/MainMenu/image/play-btn.png');
      this.load.image('choose', 'assets/MainMenu/image/arrow.png');
      this.load.image("bg", "./assets/MainMenu/image/covid.jpg");
   }

   create() {
      this.add.image(800/2, 600/2, 'bg');

      // const logo = this.add.image(30, 100, 'logo');
      // logo.setOrigin(0, 0);
      // logo.setScale(2);

      const playBtn = this.add.image(280, 450, 'play-btn').setScale(0.2);
      playBtn.setOrigin(0, 0);
      playBtn.setInteractive({useHandCursor: true});

      const choose = this.add.image(210, 450, 'choose');
      choose.setOrigin(0, 0);
      choose.setVisible(false);
      
      // click and release
      playBtn.on("pointerup", () => {
         this.scene.start("Story");
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