export class Mystery extends Phaser.Scene {
   constructor() {
      super('Mystery');
   }

   init(data) {
      this.player = data.player;
      this.chest = data.chest;
      this.questionLayer = data.layer;
      this.map = data.map;
      this.myCam = data.myCam;
      this.cameras = data.cameras;
      this.maze = data.maze;
      this.collider = data.collider;
   }

   preload() {
      this.answerFrame = this.add.group();
      this.answerContent = this.add.group();
   }

   create() {
      this.player.active = false;
      this.createFrame();
      this.loadQuestion();
   }

   createFrame() {
      this.questionFrame = this.add.image(400, 100, 'frame').setScale(1.5);
      this.questionFrame.visible = true;
      this.answerFrame.clear(true);

      let answerFrameX = [this.questionFrame.x - 150, this.questionFrame.x + 150];
      let answerFrameY = [this.questionFrame.y + 115, this.questionFrame.y + 185];

      for (let i = 0; i < 2; i++) {
         let X = (i % 2 == 0?  answerFrameX[0] : answerFrameX[1]);
         let Y = (i < 2 ? answerFrameY[0]: answerFrameY[1]);
         let frame =  this.add.image(X, Y, 'frame').setScale(0.7);
         frame.setInteractive({ cursor: 'url(./assets/Game/cursor/Link.cur), pointer'});
         frame.on("pointerover", () => {
            frame.setTint(0xff0000);
         });
         frame.on("pointerout", () => {
            frame.clearTint();
         });
         this.answerFrame.add(frame);
      }
   }

   loadQuestion() {
      const questionFormat = { font: 'bold 20px Arial', fill: '#ffffff', align: 'left', 
         stroke: "#000000", strokeThickness: 4,
         wordWrap: { width: 500, useAdvancedWrap: true } 
      }; // text format cho câu hỏi

      const answerFormat = { font: 'bold 18px Arial', fill: '#ffffff', align: 'left', stroke: "#000000",
         stroke: "#000000", strokeThickness: 4,
         wordWrap: { width: 220, useAdvancedWrap: true } 
      }; // text format cho câu trả lời

      // Question content
      const questionX = this.questionFrame.x - 250;
      const questionY = this.questionFrame.y - 45;
      const question = "Đây là mystery box, nếu mở ra bạn sẽ được một hiệu ứng ngẫu nhiên có thể là bất lợi hoặc có lợi. Bạn có muốn mở?"

      this.questionText = this.add.text(questionX, questionY, question, questionFormat);

      const offsetX = 90, offsetY = 13;

      const answers = ["Có", "Không"];

      for (let i = 0; i < this.answerFrame.getLength(); i++) {
         let frame = this.answerFrame.getChildren(0)[i];
         let text = this.add.text(frame.x - offsetX, frame.y - offsetY, answers[i], answerFormat);
         this.answerContent.add(text);
         frame.on("pointerup", () => {
            const accepted = (i == 0? true : false);
            // Xử lý đáp án
            this.getAnswer(accepted);
         }, this)
      }  
   }

   replaceChest(chest) {
      var tiles = this.map.getTilesWithin(chest.x - 1, chest.y - 1, 3, 3, {
         isColliding: true,
      }, this.questionLayer);

      tiles.forEach(tile => {
         tile.index = tile.index + 40;
         tile.properties.collides = false;
      })
      this.questionLayer.setCollisionByProperty({collides: false}, false);
   }

   zoomUp() {
      this.tweens.add({
         targets: this.cameras.main,
         zoom: this.cameras.main.zoom * 2.5,
         ease: 'Power3',
         duration: 45000,
         repeat: 0,
         onComplete: function() {
            this.cameras.main.zoom = 2;
         },
         callbackScope: this,
      }) 
   }

   speedUp() {
      this.tweens.add({
         targets: this.player,
         speed: this.player.speed * 3.2,
         ease: 'Power1',
         duration: 35000,
         repeat: 0,
         onStart: function() {
            if (this.game.registry.get('sound'))
            this.sound.play('speedup', {volume: 0.3});
         },
         onComplete: function() {
            this.player.speed = 120
         },
         callbackScope: this,
      }) 
   }

   zoomDown() {
      this.tweens.add({
         targets: this.cameras.main,
         zoom: this.cameras.main.zoom * 0.3,
         ease: 'Power3',
         duration: 45000,
         repeat: 0,
         onComplete: function() {
            this.cameras.main.zoom = 2;
         },
         callbackScope: this,
      }) 
   }

   speedDown() {
      this.tweens.add({
         targets: this.player,
         speed: this.player.speed * 0.5,
         ease: 'Power1',
         duration: 35000,
         repeat: 0,
         onStart: function() {
            if (this.game.registry.get('sound'))
            this.sound.play('speedup', {volume: 0.3});
         },
         onComplete: function() {
            this.player.speed = 120
         },
         callbackScope: this,
      }) 
   }

   breakWall() {

      // var collider = this.physics.add.collider(this.player, this.maze)
      this.collider.active = false;
      this.tweens.add({
         targets: this.collider,
         active: false,
         ease: 'Power1',
         duration: 30000,
         repeat: 0,
         onStart: function() {
            this.player.alpha = 0.6;
         },
         onComplete: function() {
            this.collider.active = true;
            this.player.alpha = 1;
         },
         callbackScope: this,
      }) 
   }

   resetPlayer() {
      var x = 64 + 16;
      var y = 64 + 16;
      this.player.enableBody(true, x, y, true, true);

      this.player.alpha = 0.5;

      var tween = this.tweens.add({
         targets: this.player,
         y: y,
         ease: 'Power1',
         duration: 1500,
         repeat: 0,
         onComplete: function() {
            this.player.alpha = 1;
         },
         callbackScope: this,
      })
   }

   nextLevel() {
      this.scene.launch("Congrats", {
         player: this.player
      });
   }

   gameover() {
      this.scene.launch("GameOver", {noti: "Bạn đã quá chậm, đại dịch đã bùng nổ và không còn gì có thể ngăn chặn !!"}, this);
   }

   getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
   }

   moreTime() {
      var giveTime = this.getRndInteger(20, 90);

      const noti = `+ ${giveTime} giây`
      const notiFormat = { font: 'Bold 25px Arial', fill: 'white', align: 'left', 
         wordWrap: { width: 200, useAdvancedWrap: true } 
      };

      const notiText = this.add.text(800/2 - 50, 600/2 - 50, noti, notiFormat);
      this.tweens.add({
         targets: notiText, 
         y: notiText.y - 25,
         duration: 1200,
         onComplete: function(){
            notiText.destroy();
         },   
         onCompleteScope: this
      })

      this.game.registry.set('penalty', -giveTime); 


   }

   lessTime() {
      var giveTime = this.getRndInteger(15, 60);

      const noti = `- ${giveTime} giây`
      const notiFormat = { font: 'Bold 25px Arial', fill: 'white', align: 'left', 
         wordWrap: { width: 200, useAdvancedWrap: true } 
      };

      const notiText = this.add.text(800/2 - 50, 600/2 - 50, noti, notiFormat);
      this.tweens.add({
         targets: notiText, 
         y: notiText.y - 25,
         duration: 1200,
         onComplete: function(){
            notiText.destroy();
         },   
         onCompleteScope: this
      })

      this.game.registry.set('penalty', giveTime); 
   }

   haveKey() {
      this.game.registry.set('hasKey', true); 

      const noti = `Bạn nhận được chìa khoá`
      const notiFormat = { font: 'Bold 25px Arial', fill: 'white', align: 'left', 
         wordWrap: { width: 200, useAdvancedWrap: true } 
      };

      const notiText = this.add.text(800/2 - 50, 600/2 - 50, noti, notiFormat);
      this.tweens.add({
         targets: notiText, 
         y: notiText.y - 25,
         duration: 1200,
         onComplete: function(){
            notiText.destroy();
         },   
         onCompleteScope: this
      })
   }

   getAnswer(accepted) {
      this.questionFrame.destroy();
      this.questionText.destroy();
      this.answerFrame.clear(true, true);
      this.answerContent.clear(true, true);
      this.player.active = true; 

      // Đổi trạng thái của chest
      if (accepted) {
         this.replaceChest(this.chest);
         if (this.game.registry.get('sound')) this.sound.play('play');

         var random = this.getRndInteger(1, 10);
         // random = 10;
      
         switch (random) {
            case 1:
               this.zoomUp(); // Bị zoom 45s
               break;
            case 2: 
               this.speedUp(); // Tăng tốc độ trong 35s
               break;
            case 3: 
               this.breakWall(); // Đi xuyên tường 30s
               break;
            case 4: 
               this.speedDown(); // giảm tốc độ 35s
               break;
            case 5: 
               this.resetPlayer(); // Về vị trí spawn
               break;
            case 6:
               this.nextLevel(); // Nhảy level
               break;
            case 7:
               this.gameover(); // Game Over
               break;
            case 8: 
               this.moreTime(); // thêm thời gian
               break;
            case 9: 
               this.lessTime(); // Trừ thời gian
               break;
            case 10:
               this.haveKey(); // Có chìa khoá
               break;
            case 11: 
               this.zoomDown();
               break;
            default:
               break;
         }
      } else {
         if (this.game.registry.get('sound'))
            this.sound.play('wrong');
         // this.scene.stop('Mystery');
      }
   }

   update() {
      
   }
}