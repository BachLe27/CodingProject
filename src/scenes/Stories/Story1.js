
export class Story1 extends Phaser.Scene {
   constructor() {
      super('Story1');
   }

   preload() {
      this.load.image('1','./assets/Story/Chapter1/1.png');
      this.load.image('2','./assets/Story/Chapter1/2.png');
      this.load.image('3','./assets/Story/Chapter1/3.png');
      this.load.image('4','./assets/Story/Chapter1/4.png');
      this.load.image('5','./assets/Story/Chapter1/5.png');
      this.load.image('6','./assets/Story/Chapter1/6.png');
      this.load.image('7','./assets/Story/Chapter1/7.png');
      this.load.image('8','./assets/Story/Chapter1/8.png');
      this.load.image('9','./assets/Story/Chapter1/bcn.png');
      this.load.image('10','./assets/Story/Chapter1/10.png');
   }

   create() {
      var { width, height } = this.sys.game.canvas;
      
      this.content = [
         "Mọi chuyện bắt đầu vào tháng 12 năm 2019. Ở Vũ Hán, Trung Quốc mới xuất hiện 1 loại virus.",
         "Vũ Hán và các thành phố xung quanh đã nhanh chóng lockdown để ngăn chặn lây lan...",
         "Tuy nhiên, con virus này quả thực khác xa với những điều mà họ tưởng tượng, họ đã không thể ngăn chặn cơn bùng nổ...", "",
         "Vân là 1 sinh viên đại học năm 3 tại ĐH FPT Hà Nội. Ngoài việc xinh đẹp, thông minh và tài giỏi thì cô cũng chả có gì đặc biệt lắm", "", "Vân đã có nghe tin trên VTV nói về con virus này, nhưng cô cũng không quan tâm lắm. Cô tận hưởng cái Tết một cách vui vẻ...", "Điều gì đến cũng phải đến, con virus quái ác đã lan ra toàn thế giới với tốc độ chóng mặt, các ca tử vong tăng như điên. Liên Hợp Quốc đã cho gọi những người thông minh nhất thế giới nhằm tìm ra giải pháp ngăn chặn", "Và hiển nhiên, đội ngũ BCN của JS CLUB tại FPTU HN đã được gọi tên, họ là những cái tên mà chúng ta đã quá quen thuộc.", "Vân đã được giao nhiệm vụ làm leader của đội nhóm, nhằm tìm ra giải pháp cho đại dịch càng nhanh càng tốt..."
      ]

      this.image = this.add.image(width/2, height/2, '1').setScale(0.5);
      
      this.cnt = 1;

      this.format = { 
         font: "bold 20px Arial", fill: "#ffffff" , align: 'center', 
         wordWrap: { width: 580, useAdvancedWrap: true },
         stroke: "#000000", strokeThickness: 4,
      }  


      this.text = this.add.text(120, 560, this.content[0], this.format);
      
      this.tweens.add({
         targets: this.text,
         y: 480,
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
      if (this.cnt == 11) {
         // this.scene.stop('Story');
         this.scene.start('LoadScene');
      }
      this.image.destroy();
      if (this.image2 != undefined) this.image2.destroy();

      if (this.cnt == 4 || this.cnt == 6) {
         this.image = this.add.image(width/2 - 150, height/2, `${this.cnt}`).setScale(0.8, 0.7);
         this.cnt++;
         this.image2 = this.add.image(width/2 + 130, height/2, `${this.cnt}`).setScale(0.8, 0.7);
      }
      else {
         this.image = this.add.image(width/2, height/2, `${this.cnt}`).setScale(1, 0.7);
      }

      this.text.destroy();

      this.text = this.add.text(120, 560, this.content[this.cnt-1], this.format);
   
      this.tweens.add({
         targets: this.text,
         y: 480,
         duration: 1000,
         // ease: 'Linear',
      })
   }

   update() {

      // if (this.spacebar.isDown) {
      //    this.scene.start("LoadScene");
      // }
      
   }
}