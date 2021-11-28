
export class End extends Phaser.Scene {
   constructor() {
      super('End');
   }

   preload() {
      
   }

   create() {
      var { width, height } = this.sys.game.canvas;
      
      this.add.text(50, 50, "End.....", {font: "50px Arial"});
      this.add.text(width - 350, height - 100, "Ấn space để bỏ qua cốt truyện...", {font: "20px Arial"});
      this.spacebar = this.input.keyboard.addKey('space');
   }
   
}