export class Quest extends Phaser.Scene {
   constructor() {
      super('Quest');
   }

   preload() {
      
   }

   create() {
      this.totalChest = this.game.registry.get('totalChest');
      this.curChest = this.game.registry.get('curQuestion');

      this.add.image(740, 20, 'quest');
      this.add.image(668, 23, 'key-img');
      this.text = this.add.text(755, 15, this.curChest + '/' + this.totalChest);
      this.key = this.add.text(685, 15, 0 + '/' + 1);
   }

   update() {
      if (this.game.registry.get('curQuestion') != this.curChest) {
         this.curChest = this.game.registry.get('curQuestion');
         this.text.text = this.curChest + '/' + this.totalChest;
      }

      if (this.game.registry.get('hasKey') == true)  {
         this.key.text = 1 + '/' + 1;
      }
   }
}