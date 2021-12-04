export class Gui extends Phaser.Scene {
   constructor() {
      super('Gui');
   }
   
   preload() {
      this.load.image("music-on", "./assets/MainMenu/image/music-on.png");
      this.load.image("music-off", "./assets/MainMenu/image/music-off.png");
      this.load.image("sound-on", "./assets/MainMenu/image/sound-on.png");
      this.load.image("sound-off", "./assets/MainMenu/image/sound-off.png");
      this.load.audio("mainmenu-music", "./assets/MainMenu/audio/guitarist2.2.ogg");
   }

   create() {

      let music = this.sound.add('mainmenu-music');
      music.play({volume: 0.4, mute: false, loop: true});

      let musicOn =  this.add.image(10, 10, 'music-on').setOrigin(0,0).setScale(0.3);
      let musicOff =  this.add.image(10, 10, 'music-off').setOrigin(0,0).setScale(0.3);
      musicOff.setVisible(false);

      let soundOn = this.add.image(50, 10, 'sound-on').setOrigin(0,0).setScale(0.3);
      let soundOff = this.add.image(50, 10, 'sound-off').setOrigin(0,0).setScale(0.3);
      soundOff.setVisible(false);

      musicOn.setInteractive({ cursor: 'url(assets/Game/cursor/Link.cur), pointer'});

      musicOn.on('pointerup', () => {
         musicOn.setVisible(false);
         musicOff.setVisible(true);
         music.mute = true;
      }, this);

      musicOff.setInteractive({ cursor: 'url(./assets/Game/cursor/Link.cur), pointer'});

      musicOff.on('pointerup', () => {
         musicOn.setVisible(true);
         musicOff.setVisible(false);
         music.mute = false;
      }, this);


      soundOn.setInteractive({ cursor: 'url(./assets/Game/cursor/Link.cur), pointer'});

      soundOn.on('pointerup', () => {
         soundOn.setVisible(false);
         soundOff.setVisible(true);
         this.game.sound.mute = true;
      }, this);

      soundOff.setInteractive({ cursor: 'url(./assets/Game/cursor/Link.cur), pointer'});

      soundOff.on('pointerup', () => {
         soundOn.setVisible(true);
         soundOff.setVisible(false);
         this.game.sound.mute = false;
      }, this);
   }
}