
export class Story3 extends Phaser.Scene {
   constructor() {
      super('Story3');
   }

   init(data) {
      this.score = data.score;
   }

   preload() {      
      this.load.image('3-1','./assets/Story/Chapter3/1.png');
      this.load.image('3-2','./assets/Story/Chapter3/2.png');
      this.load.image('3-3','./assets/Story/Chapter3/3.png');
      this.load.image('3-4','./assets/Story/Chapter3/4.png');
      this.load.image('3-5','./assets/Story/Chapter3/5.png');
   }

   create() {
      var { width, height } = this.sys.game.canvas;
      
      this.content = [
         "Vân đã gồng mình chiến đấu suốt một thời gian dài, tìm đủ mọi cách, mọi phương thuốc, kháng thể đều không có tác dụng hoặc chỉ được 1 thời gian rồi đâu lại vào đấy", "",
         "Lần này, Vân đã có 1 quyết định táo bạo và mạo hiểm: Đi tìm nguồn cơn con virus...", "",
         "Vân đã tới nhà Nam, 1 người bạn cũ, để nhờ tới sự giúp đỡ. Nam được mệnh danh là nhà bác học điên với những công trình nghiên cứu ảo ma và phát ngôn gây sốc. Tuy vậy, Vân vẫn biết và tin tưởng rằng Nam thực sự giỏi và chắc chắn sẽ giúp được mình....",
      ]

      this.image = this.add.image(width/2, height/2 - 20, '3-1');

      this.format = { 
         font: "bold 20px Arial", fill: "#ffffff" , align: 'center', 
         wordWrap: { width: 580, useAdvancedWrap: true },
         stroke: "#000000", strokeThickness: 4,
      }  

      this.cnt = 1;

      this.text = this.add.text(120, 560, this.content[0], this.format);
      
      this.tweens.add({
         targets: this.text,
         y: 460,
         duration: 1000,
         ease: 'Linear',
      })
      
      // this.add.text(800 - 130, 570, "Click để tiếp tục...", {font: "14px Arial"});

      this.spacebar = this.input.keyboard.addKey('space');
      

      this.input.on('pointerdown', () => this.next(), this)
   }

   next() {
      var { width, height } = this.sys.game.canvas;

      this.cnt++;
      if (this.cnt == 6) {
         this.scene.start('Lv3', {score: this.score}, this);
      }
      this.image.destroy();

      if (this.image2 != undefined) this.image2.destroy();

      if (this.cnt == 2 || this.cnt == 4) {
         this.image = this.add.image(width/2 - 150, height/2, `3-${this.cnt}`).setScale(1, 0.6);
         this.cnt++;
         this.image2 = this.add.image(width/2 + 130, height/2, `3-${this.cnt}`).setScale(1, 0.6);
      }
      else {
         this.image = this.add.image(width/2, height/2, `3-${this.cnt}`).setScale(1, 0.8);
      }

      this.text.destroy();

      this.text = this.add.text(120, 560, this.content[this.cnt-1], this.format);
      
      this.tweens.add({
         targets: this.text,
         y: 460,
         duration: 1000,
         // ease: 'Linear',
      })
   }

   update() {

      // if (this.spacebar.isDown) {
      //    this.scene.start('Story4', {score: this.score}, this);
      // }
      
   }
}