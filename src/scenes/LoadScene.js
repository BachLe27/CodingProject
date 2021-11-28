
export class LoadScene extends Phaser.Scene {
   constructor() {
      super('LoadScene');
   }

   preload() {
      this.load.spritesheet('charactor', "assets/Charactor/male.png", {
         frameWidth: 32,
         frameHeight: 32
      });
      
   }

   create() {
      this.anims.create({
         key: "down", 
         frames: this.anims.generateFrameNumbers("charactor", {frames: [0, 1, 2]}),
         frameRate: 10,
         repeat: 1
      })

      this.anims.create({
         key: "left", 
         frames: this.anims.generateFrameNumbers("charactor", {frames: [3, 4, 5]}),
         frameRate: 10,
         repeat: 1
      })

      this.anims.create({
         key: "right", 
         frames: this.anims.generateFrameNumbers("charactor", {frames: [6, 7, 8]}),
         frameRate: 10,
         repeat: 1
      })
      
      this.anims.create({
         key: "up", 
         frames: this.anims.generateFrameNumbers("charactor", {frames: [9, 10, 11]}),
         frameRate: 10,
         repeat: 1
      })
   }
   
   update() {
      this.scene.start('Lv1');
   }
}