
export class LoadScene extends Phaser.Scene {
   constructor() {
      super('LoadScene');
   }

   preload() {
      this.load.image('terrain-img', './assets/Game/terrain_atlas.png');
      this.load.image("chest-img", "./assets/Game/chest.png");
      this.load.image("frame", "./assets/Game/frame.png");
      this.load.image("key-img", "./assets/Game/key.png");
      this.load.image("btn", "./assets/Game/blue_button.png");
      this.load.image("game-bg", "./assets/Game/covid.jpg");
      this.load.audio("hurt", "./assets/Game/audio/pain.mp3");
      this.load.image("tuto", "./assets/Game/tuto.png");

      this.load.spritesheet("virus", "./assets/Game/virus.png", {
         frameWidth: 31,
         frameHeight: 30
      });

      this.load.audio('wrong', "./assets/Game/audio/wrong.mp3");
      this.load.audio('win', "./assets/Game/audio/win.wav");
      this.load.audio('key', "./assets/Game/audio/key.wav");

      this.load.image('quest', './assets/Game/treasure.png');

      this.load.spritesheet('female', "./assets/Charactor/Female.png", {
         frameWidth: 32,
         frameHeight: 32
      });
      
      this.load.spritesheet('male', "./assets/Charactor/Male.png", {
         frameWidth: 32,
         frameHeight: 32
      });

   }

   create() {
      this.game.registry.set('score', 0);
      
      this.scene.start('Lv3');
      
      this.anims.create({
         key: "move", 
         frames: this.anims.generateFrameNumbers("virus", {
            start: 0, end: 17
         }),
         frameRate: 20,
         repeat: -1
      });


      this.anims.create({
         key: "down", 
         frames: this.anims.generateFrameNumbers("female", {frames: [0, 1, 2]}),
         frameRate: 10,
         repeat: 1
      })

      this.anims.create({
         key: "left", 
         frames: this.anims.generateFrameNumbers("female", {frames: [3, 4, 5]}),
         frameRate: 10,
         repeat: 1
      })

      this.anims.create({
         key: "right", 
         frames: this.anims.generateFrameNumbers("female", {frames: [6, 7, 8]}),
         frameRate: 10,
         repeat: 1
      })
      
      this.anims.create({
         key: "up", 
         frames: this.anims.generateFrameNumbers("female", {frames: [9, 10, 11]}),
         frameRate: 10,
         repeat: 1
      })


      this.anims.create({
         key: "m-down", 
         frames: this.anims.generateFrameNumbers("male", {frames: [0, 1, 2]}),
         frameRate: 10,
         repeat: 1
      })

      this.anims.create({
         key: "m-left", 
         frames: this.anims.generateFrameNumbers("male", {frames: [3, 4, 5]}),
         frameRate: 10,
         repeat: 1
      })

      this.anims.create({
         key: "m-right", 
         frames: this.anims.generateFrameNumbers("male", {frames: [6, 7, 8]}),
         frameRate: 10,
         repeat: 1
      })
      
      this.anims.create({
         key: "m-up", 
         frames: this.anims.generateFrameNumbers("male", {frames: [9, 10, 11]}),
         frameRate: 10,
         repeat: 1
      })
   }
   
   update() {
      
   }
}