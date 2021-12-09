export class Congrats extends Phaser.Scene {
   constructor() {
      super('Congrats');
   }

   init(data) {
      this.player = data.player;
   }

   preload() {
      
   }

   create() {
      this.game.registry.set('running', false);
      this.level = this.game.registry.get('level');

      this.player.active = false;
      
      const notiFormat = { font: 'bold 25px Arial', fill: 'black', align: 'center', 
         wordWrap: { width: 300, useAdvancedWrap: true } 
      };
      const frame = this.add.image(800 / 2, 600 / 2, 'frame');
      const noti = [
         "Bạn đã tìm được vaccine chống virus", 
         "Bạn đã tìm được kháng thể chống lại virus",
         "Virus corona là do con người tạo ra...", 
         "Bạn đã tìm được tung tích của kẻ tạo ra virus..." 
      ];

      const notiText = this.add.text(frame.x - frame.width/3, frame.y - frame.height/3 + 3, noti[this.level - 1], notiFormat);
      
      const btn = this.add.image(460, 355, 'btn').setScale(0.6).setOrigin(0, 0);
      const btnText = this.add.text(485, 356, 'Tiếp tục', {
         font: 'bold 16px Arial', align: 'center',
         stroke: "#000000", strokeThickness: 4,
      });

      this.sound.play('win');

      btn.setInteractive({ cursor: 'url(./assets/Game/cursor/Link.cur), pointer'});

      btn.on("pointerup", () => {
         this.scene.stop(`Lv${this.level}`);
         this.scene.stop('Quest');
         this.scene.stop('Timer');
         this.scene.stop("Question");
         this.scene.start(`Story${this.level + 1}`);
       
      })
   }

   update() {
      
   }
}