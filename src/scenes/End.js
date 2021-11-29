
export class End extends Phaser.Scene {
   constructor() {
      super('End');
   }

   preload() {
      
   }

   create() {
      var { width, height } = this.sys.game.canvas;
      
      const notiFormat = { font: 'bold 50px Arial', fill: 'white', align: 'left', 
         wordWrap: { width: 600, useAdvancedWrap: true } 
      };
      
      this.add.text(50, 50, "Cuối cùng, thế giới cũng được bình yên trở lại, chỉ có trái tim Vân là tan vỡ 💔........", notiFormat);
      this.add.text(width - 350, height - 100, "Ấn space để bỏ qua cốt truyện...", {font: "20px Arial"});
      this.spacebar = this.input.keyboard.addKey('space');
   }
   
}