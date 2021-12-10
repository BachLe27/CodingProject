export class Timer extends Phaser.Scene {
   constructor() {
      super('Timer');
   }

   init(data) {
      this.player = data.player;
   }

   create() {
      this.initialTime = this.game.registry.get('time');
      this.running = this.game.registry.get('running');

      this.format = {
         font: "bold 20px Arial", fill: "#ffffff", 
         stroke: "#000000", strokeThickness: 4,
      }

      this.text = this.add.text(32, 550, "Time: " + this.formatTime(this.initialTime), this.format);

      // Each 1000 ms call onEvent

      this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
      // console.log(this.time);
   }

   formatTime(seconds){
      // Minutes
      var minutes = Math.floor(seconds/60);
      // Seconds
      var partInSeconds = seconds%60;
      // Adds left zeros to seconds
      partInSeconds = partInSeconds.toString().padStart(2,'0');
      // Returns formated time
      return `${minutes}:${partInSeconds}`;
   }

   onEvent ()
   {
      this.initialTime -= 1; // One second
      const penalty = this.game.registry.get('penalty');

      if (penalty != 0) {
         this.initialTime -= penalty;
         this.game.registry.set('penalty', 0);
      }

      if (this.initialTime <= 10) {
         this.format.fill = "#ff0000";
         this.text.setStyle(this.format);
         // console.log(this.text.style);
      }
      if (this.initialTime <= 0) 
      {
         this.player.active = false;
         this.scene.start('GameOver', {noti: "Bạn đã quá chậm, đại dịch đã bùng nổ và không còn gì có thể ngăn chặn !!"}, this);
      }
      this.text.setText("Time: " + this.formatTime(this.initialTime));
   }

   update() {
      this.running = this.game.registry.get('running');
      if (this.running == false) {
         this.scene.stop('Timer');
         var score = this.game.registry.get('score');
         this.game.registry.set('score', score + this.game.registry.get('time') - this.initialTime);
         console.log(this.game.registry.get('score'));
      }
   }
}