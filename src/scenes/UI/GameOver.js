export class GameOver extends Phaser.Scene {
   constructor() {
      super('GameOver');
   }

   init(data) {
      this.noti = data.noti;
   }

   preload() {
      
   }

   create() {

      const frame = this.add.image(800/2, 600/2, 'frame').setScale(1.2);

      const noti = this.noti; 

      const notiFormat = { font: 'bold 23px Arial', fill: 'black', align: 'center', 
         wordWrap: { width: 440, useAdvancedWrap: true } 
      };

      const notiText = this.add.text(frame.x - frame.width/2 - 10, frame.y - frame.height/2 + 20, noti, notiFormat);
      
      const btn = this.add.image(470, 365, 'btn').setScale(0.6).setOrigin(0, 0);
      const btnText = this.add.text(496, 368, 'Chơi lại', {
         font: 'bold 16px Arial', align: 'center',
         stroke: "#000000", strokeThickness: 4,
      });
      
      btn.setInteractive({ cursor: 'url(./assets/Game/cursor/Link.cur), pointer'});
      btn.on("pointerup", () => {
         location.reload();
      })   
   }

   update() {
      
   }
}