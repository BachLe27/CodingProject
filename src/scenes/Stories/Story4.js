
export class Story4 extends Phaser.Scene {
   constructor() {
      super('Story4');
   }

   init(data) {
      this.score = data.score;
  }

   preload() {      
      this.load.image('4-1','./assets/Story/Chapter4/1.png');
      this.load.image('4-2','./assets/Story/Chapter4/2.png');
      this.load.image('4-3','./assets/Story/Chapter4/3.png');
      this.load.image('4-4','./assets/Story/Chapter4/4.png');
      this.load.image('4-5','./assets/Story/Chapter4/5.png');
      this.load.image('4-6','./assets/Story/Chapter4/6.png');
      this.load.image('4-7','./assets/Story/Chapter4/7.png');
      this.load.image('4-8','./assets/Story/Chapter4/8.png');
      this.load.image('4-9','./assets/Story/Chapter4/9.png');
   }

   create() {
      var { width, height } = this.sys.game.canvas;
      
      this.content = [
         "Qua quá trình nghiên cứu và tìm hiểu, Vân và Nam đã phát hiện ra 1 sự thật bất ngờ: Virus này là virus nhân tạo.", "",
         "Trước cú sốc này, có quá nhiều nghi vấn được đặt ra với Vân. Vân và Nam chẳng có thời gian nghĩ nhiều nữa, phương án tốt nhất bây giờ chính là tìm ra người đã chế tạo ra con virus. Họ nhanh chóng gói ghém đồ đạc lên đường với hi vọng tìm ra manh mối về kẻ bí ẩn", "",
         "Lửa gần rơm lâu ngày cũng bén, cùng nghiên cứu và làm việc với nhau 1 khoảng thời gian, cuối cùng thì Vân và Nam cũng nảy sinh tình cảm và đến với nhau. Và may mắn thay, cuộc điều tra về kẻ bí ẩn đang ngày càng tiến triển và sẽ sớm tìm ra hắn. Vân hạnh phúc tột cùng vì sắp tìm ra chân tướng và vì Nam.", "Một hôm, Vân trở về nhà, thấy nhà cửa toang hoang như vừa có ai đó đột nhập","Cô liền chạy thẳng vào nhà nhưng chẳng thấy Nam đâu, chỉ thấy trên bàn 1 mẩu giấy",
         "", "Mất đi Nam, Vân lại càng có thêm động lực tìm ra kẻ bí ẩn kia..."
      ]

      this.image = this.add.image(width/2, height/2, '4-1');

      this.format = { 
         font: "bold 20px Arial", fill: "#FBFF00" , align: 'center', 
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
      if (this.cnt == 10) {
         this.scene.start('Lv4', {score: this.score}, this);
      }
      this.image.destroy();

      if (this.image2 != undefined) this.image2.destroy();

      this.text.destroy();

      if (this.cnt == 2 || this.cnt == 4) {
         this.image = this.add.image(width/2 - 150, height/2 - 30, `4-${this.cnt}`).setScale(0.8);
         this.cnt++;
         this.image2 = this.add.image(width/2 + 130, height/2 - 30, `4-${this.cnt}`).setScale(0.8);
         this.text = this.add.text(120, 520, this.content[this.cnt-1], this.format);

         this.tweens.add({
            targets: this.text,
            y: 430,
            duration: 1000,
         })
      }
      else {
         this.image = this.add.image(width/2, height/2, `4-${this.cnt}`);
         this.text = this.add.text(120, 520, this.content[this.cnt-1], this.format);
         this.tweens.add({
            targets: this.text,
            y: 440,
            duration: 1000,
         })
      }
      
   }

   update() {

      // if (this.spacebar.isDown) {
      //    this.scene.start('End', {score: this.score}, this);
      // }
      
   }
}