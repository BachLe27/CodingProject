
export class Story2 extends Phaser.Scene {
   constructor() {
      super('Story2');
   }

   init(data) {
      this.score = data.score;
  }

   preload() {      
      this.load.image('2-1','./assets/Story/Chapter2/1.png');
      this.load.image('2-2','./assets/Story/Chapter2/2.png');
      this.load.image('2-3','./assets/Story/Chapter2/3.png');
      this.load.image('2-4','./assets/Story/Chapter2/4.png');
      this.load.image('2-5','./assets/Story/Chapter2/5.png');
   }

   create() {
      var { width, height } = this.sys.game.canvas;
      
      this.content = [
         "Sau bao ngày chiến đấu anh dũng, cả tổ đội ngày nào chỉ còn mỗi mình Vân sống sót. Cuối cùng, cô cũng tìm ra vaccine để chống virus...",
         "Nhờ có Vân mà cuộc sống bình yên trên thế giới mới được khôi phục trở lại...",
         "Nhưng bình yên chỉ được 1 thời gian ngắn ngủi, con virus quái ác đã quay lại với biến thể Omicron, mạnh gấp 7749 lần những biến thể trước...",
         "Một lần nữa, sứ mệnh cao cả gọi tên Vân",
         "Lần này, Vân yêu cầu chỉ 1 mình cô làm việc, có lẽ vì tổn thương mất đồng đội của cô vẫn chưa nguôi..."
      ]

      this.image = this.add.image(width/2, height/2, '2-1').setScale(1, 0.8);

      this.format = { 
         font: "bold 20px Arial", fill: "#ffffff" , align: 'center', 
         wordWrap: { width: 580, useAdvancedWrap: true },
         stroke: "#000000", strokeThickness: 4,
      }  

      this.cnt = 1;

      this.text = this.add.text(120, 560, this.content[0], this.format);
      
      this.tweens.add({
         targets: this.text,
         y: 500,
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
         this.scene.start('Lv2', {score: this.score}, this);
      }
      this.image.destroy();
      
      this.image = this.add.image(width/2, height/2, `2-${this.cnt}`).setScale(1, 0.8);

      this.text.destroy();

      this.text = this.add.text(120, 560, this.content[this.cnt-1], this.format);
      
      this.tweens.add({
         targets: this.text,
         y: 500,
         duration: 1000,
         // ease: 'Linear',
      })
   }

   update() {

      // if (this.spacebar.isDown) {
      //    this.scene.start('Story3', {score: this.score}, this);
      // }
      
   }
}