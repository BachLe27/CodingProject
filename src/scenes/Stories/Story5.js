
export class Story5 extends Phaser.Scene {
   constructor() {
      super('Story5');
   }

   init(data) {
      this.score = data.score;
  }

   preload() {      
      this.load.image('end-1','./assets/Story/End/1.png');
      this.load.image('end-2','./assets/Story/End/2.png');
   }

   create() {
      var { width, height } = this.sys.game.canvas;
      
      this.content = [
         "Cuối cùng, cô đã tìm được tung tích của hắn. Bị phát hiện, hắn không lo sợ mà còn rất ung dung. Hắn tiết lộ rằng loại virus đó, hắn làm ra là để thay tự nhiên chọn lọc con người và nhằm trục lợi cá nhân, độc quyền thuốc chữa để thu về lợi nhuận.",
         "Vân không nhiều lời, trực tiếp bắn xuyên trái tim hắn. Cởi bỏ lớp mặt nạ, cô mới nhận ra đó là Nam, người yêu cô. Hóa ra, Nam đúng là nhà bác học điên thật :3. Cô đi ra chỗ chiếc két sắt chưa thuốc giải của con virus cô căm thù bấy lâu mà trong lòng cô thì nặng trĩu...", "Cuối cùng, thế giới cũng bình yên trở lại, chỉ có trái tim Vân là tan vỡ…💔"
      ]

      this.image = this.add.image(width/2, height/2, 'end-1');

      this.format = { 
         font: "bold 20px Arial", fill: "#FBFF00" , align: 'center', 
         wordWrap: { width: 580, useAdvancedWrap: true },
         stroke: "#000000", strokeThickness: 4,
      }  

      this.cnt = 1;

      this.text = this.add.text(120, 560, this.content[0], this.format);
      
      this.tweens.add({
         targets: this.text,
         y: 400,
         duration: 1000,
         ease: 'Linear',
      })
      
      this.add.text(800 - 130, 570, "Click để tiếp tục...", {font: "14px Arial"});

      this.spacebar = this.input.keyboard.addKey('space');
      

      this.input.on('pointerdown', () => this.next(), this)
   }

   next() {
      var { width, height } = this.sys.game.canvas;

      this.cnt++;
      if (this.cnt == 3) {
         this.image.destroy();
         this.text.destroy();

         this.text = this.add.text(140, 10, this.content[this.cnt-1], 
         {
            font: "bold 50px Arial", fill: "#ffffff" , align: 'center', 
            wordWrap: { width: 550, useAdvancedWrap: true },
            stroke: "#000000", strokeThickness: 4
         });

         this.tweens.add({
            targets: this.text,
            y: 200,
            duration: 1000,
            // ease: 'Linear',
         })
      }
      else if (this.cnt == 4) {
         this.scene.start('LastScene', {score: this.score}, this);
      }
      else {
         this.image.destroy();
      
         this.image = this.add.image(width/2, height/2, `end-${this.cnt}`);

         this.text.destroy();

         this.text = this.add.text(120, 560, this.content[this.cnt-1], this.format);
         
         this.tweens.add({
            targets: this.text,
            y: 400,
            duration: 1000,
            // ease: 'Linear',
         })
      }
      
   }

   update() {

      if (this.spacebar.isDown) {
         this.scene.start('LastScene', {score: this.score}, this);
      }
      
   }
}