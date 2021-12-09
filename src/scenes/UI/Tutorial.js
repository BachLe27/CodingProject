export class Tutorial extends Phaser.Scene {
   constructor() {
      super('Tutorial');
   }

   init(data) {
      this.player = data.player;
   }


   preload() {
      
   }

   create() {
      this.player.active = false;
      // const frame = this.add.image(800/2, 600/2, 'frame').setScale(1.8);
      this.add.image(800/2, 600/2, 'tuto').setScale(0.5);

      // const noti = "Mỗi màn chơi sẽ có 1 rương vàng, rương vàng cần có chìa khoá để mở. Chìa khoá sẽ xuất hiện ngẫu nhiên trên bản đồ sau khi bạn trả lời đúng hết các câu hỏi ở các rương đỏ. Mở rương vàng để qua màn trong thời gian quy định.";

      // const notiFormat = { font: 'bold 23px Arial', fill: 'black', align: 'center', 
      //    wordWrap: { width: 580, useAdvancedWrap: true } 
      // };

      // const notiText = this.add.text(frame.x - frame.width/2 - 80, frame.y - frame.height/2 - 15, noti, notiFormat);
      
      const btn = this.add.image(510, 395, 'btn').setScale(0.8).setOrigin(0, 0);
      const btnText = this.add.text(552, 400, 'Tiếp tục', {
         font: 'bold 18px Arial', align: 'center',
         stroke: "#000000", strokeThickness: 4,
      });

      // this.sound.play('win');

      btn.setInteractive({ cursor: 'url(./assets/Game/cursor/Link.cur), pointer'});

      btn.on("pointerup", () => {
         if (this.game.registry.get('sound'))
            this.sound.play('play');
         this.player.active = true;
         this.scene.stop(`Tutorial`);
         this.scene.launch('Timer', { player: this.player }, this);
         // this.scene.start(`Lv1`, {score: this.score}, this);
      })
   }
}