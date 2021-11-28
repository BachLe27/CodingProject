
export class MainMenu extends Phaser.Scene {
   constructor() {
      super('MainMenu');
   }

   preload() {
      this.load.image('logo', 'assets/MainMenu/image/logo.png');
      this.load.image('play-btn', 'assets/MainMenu/image/play-img.png');
      this.load.image('choose', 'assets/MainMenu/image/arrow.png');
      this.load.image("bg", "./assets/Game/bg.jpg");
   }

   create() {
      this.add.image(0, 0, 'bg').setOrigin(0,0);
      const logo = this.add.image(170, 100, 'logo');
      logo.setOrigin(0, 0);
      logo.setScale(2);

      const playBtn = this.add.image(270, 400, 'play-btn');
      playBtn.setOrigin(0, 0);
      playBtn.setInteractive();

      const choose = this.add.image(190, 440, 'choose');
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