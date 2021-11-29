export class Lv3 extends Phaser.Scene {
   constructor() {
      super('Lv3');
   }

   init(data) {
      //  console.log(data);
       this.score = data.score;
   }
   
   preload() {
      this.load.tilemapTiledJSON("map3", "./assets/Game/Lv3/Lv3.json");
      this.load.json("questions3", "./assets/Game/Lv3/questionLv3.json");
    }

    create() {

      this.add.image(800/2, 600/2, 'game-bg');
      this.loadX = 144;
      this.loadY = 140;

      this.playerX = this.loadX + 48;
      this.playerY = this.loadY + 48;

      this.questionFrameX = this.loadX + 20;
      this.questionFrameY = this.loadY - 120;
      
      this.bonusScore = 100;

      this.scoreText = this.add.text(this.loadX, this.loadY +  10 * 32 + 5, "Điểm: " + this.score, {
         font: 'bold 25px Arial', fill: 'white'
      })

      this.map = this.add.tilemap('map3');
      const terrain = this.map.addTilesetImage('terrain', 'terrain-img');
      const chest = this.map.addTilesetImage('chest', 'chest-img');
      const key = this.map.addTilesetImage('key', 'key-img');

      this.groundLayer = this.map.createLayer('ground', terrain, this.loadX, this.loadY);
      this.questionLayer = this.map.createLayer('chest', chest, this.loadX, this.loadY);
      this.keyLayer = this.map.createLayer('key', key, this.loadX, this.loadY);

      this.player = this.physics.add.sprite(this.playerX, this.playerY, 'male');
      
      this.groundLayer.setCollisionByProperty({collides: true});
      this.questionLayer.setCollisionByProperty({collides: true});
      this.keyLayer.setCollisionByProperty({collides: true});

      this.physics.add.collider(this.player, this.groundLayer);

      this.physics.add.collider(
         this.player, this.keyLayer, () => this.getKey(),
      null, this);
 
      this.questionFrame = this.add.image(this.questionFrameX, this.questionFrameY, 'frame');

      this.questionFrame.setScale(1.2).setOrigin(0, 0);
      this.questionFrame.visible = false;

      this.answerFrame = this.add.group();
      this.answerContent = this.add.group();

      // Cau hoi
      this.data = this.game.cache.json.entries.entries.questions3;
      this.curQuestion = 0;

      // Cốt lõi
      this.physics.add.collider(
         this.player, this.questionLayer, () => this.loadQuestion(), null, this
      );

      // Control
      this.player.active = true;
      this.haveKey = false;
      this.lastChest = false;

      this.cursors = this.input.keyboard.addKeys(
         {
             "w": Phaser.Input.Keyboard.KeyCodes.W,
             "s": Phaser.Input.Keyboard.KeyCodes.S,
             "a": Phaser.Input.Keyboard.KeyCodes.A,
             "d": Phaser.Input.Keyboard.KeyCodes.D,

             "up": Phaser.Input.Keyboard.KeyCodes.UP,
             "down": Phaser.Input.Keyboard.KeyCodes.DOWN,
             "left": Phaser.Input.Keyboard.KeyCodes.LEFT,
             "right": Phaser.Input.Keyboard.KeyCodes.RIGHT
         }
      );
   }

   getTileAtPlayerX(player) {
      return parseInt((player.x - this.loadX) / 32);
   }

   getTileAtPlayerY(player) {
      return parseInt((player.y - this.loadY) / 32);
   }
   
   getTileNearPlayer(layer) {
      return this.map.getTilesWithin(
         this.getTileAtPlayerX(this.player) - 1, 
         this.getTileAtPlayerY(this.player) - 1, 
         3, 3, {
            isColliding: true,
         }, 
         layer
      )[0];
   }
   
   loadQuestion() {
      
      let chest = this.getTileNearPlayer(this.questionLayer);
      console.log(chest.index);
      // console.log(chest.index);
      if (chest != undefined && (chest.index == 1047 || chest.index == 1037) ) {
         if (this.haveKey) {
            this.player.active = false;
            
            this.questionLayer.replaceByIndex(chest.index, 1037, chest.x, chest.y, 1, 1);
            const notiFormat = { font: 'bold 25px Arial', fill: 'black', align: 'center', 
               wordWrap: { width: 300, useAdvancedWrap: true } 
            };

            const frame = this.add.image(800 / 2, 600 / 2, 'frame');

            const noti = "Người tạo ra virus là:";
            const notiText = this.add.text(frame.x - frame.width/3, frame.y - frame.height/3 + 3, noti, notiFormat);

            const btn = this.add.image(470, 355, 'btn').setScale(0.6).setOrigin(0, 0);
            const btnText = this.add.text(495, 360, 'Tiếp tục', {
               font: 'bold 16px Arial', align: 'center'
            });
            btn.setInteractive({useHandCursor: true});

            btn.on("pointerup", () => {
               this.scene.start("Story4", {score: this.score}, this);
            })
            
         } else {

            const notiFormat = { font: '15px Arial', fill: 'white', align: 'left', 
               wordWrap: { width: 100, useAdvancedWrap: true } 
            };
            
            const noti = "Bạn cần chìa khoá để mở hòm vàng";
            const notiText = this.add.text(this.player.x - 20, this.player.y - 70, noti, notiFormat);

            this.tweens.add({
               targets: this.notiText, 
               
               duration: 200,
               onComplete: function(){
                  notiText.destroy();
               },   
               onCompleteScope: this
            })
         }
      } else {
         // Frame
         this.player.active = false;
         this.loadFrame();
         // Content
         this.loadContent();
      }
   }

   loadFrame() {
      this.questionFrame.visible = true;
      this.answerFrame.clear(true);

      let answerFrameX = [this.questionFrameX, this.questionFrameX + 240];
      let answerFrameY = [this.questionFrameY + 125, this.questionFrameY + 185];

      for (let i = 0; i < this.data.questions[0].answers.length; i++) {

         let X = (i % 2 == 0?  answerFrameX[0] : answerFrameX[1]);
         let Y = (i < 2 ? answerFrameY[0]: answerFrameY[1]);

         let frame =  this.add.image(X, Y, 'frame').setScale(0.6).setOrigin(0, 0);
         frame.setInteractive({useHandCursor: true});

         frame.on("pointerover", () => {
            frame.setTint(0xff0000);
         });
         frame.on("pointerout", () => {
            frame.clearTint();
         });
         this.answerFrame.add(frame);
      }
   }

   loadContent() {

      const questionFormat = { font: 'bold 15px Arial', fill: 'white', align: 'left', 
         wordWrap: { width: 410, useAdvancedWrap: true } 
      }; // text format cho câu hỏi

      const answerFormat = { font: 'bold 15px Arial', fill: 'white', align: 'left', 
         wordWrap: { width: 200, useAdvancedWrap: true } 
      }; // text format cho câu trả lời

      // Question content
      const questionX = this.questionFrameX + 40;
      const questionY = this.questionFrameY + 30;
      const question = this.data.questions[this.curQuestion];
      this.questionText = this.add.text(questionX, questionY, question.content, questionFormat);

      // Answer content
      const offset = 20;

      for (let i = 0; i < this.answerFrame.getLength(); i++) {
         let frame = this.answerFrame.getChildren(0)[i];
         let text = this.add.text(frame.x + offset, frame.y + offset, question.answers[i].content, answerFormat);
         this.answerContent.add(text);

         frame.on("pointerup", () => {
            const isCorrect = question.answers[i].isCorrect;
            if (isCorrect) frame.setTint(0xffff00);
            else frame.setTint(0x111111);

            // Xử lý đáp án
            this.getAnswer(isCorrect);
         }, this)
      }  
   }

   getAnswer(isCorrect) {
      
      const noti = (isCorrect? "Đúng rồi" : "Sai rồi");
      const notiFormat = { font: '15px Arial', fill: 'white', align: 'left', 
         wordWrap: { width: 200, useAdvancedWrap: true } 
      };

      const notiText = this.add.text(this.player.x + 10, this.player.y + 20, noti, notiFormat);
      this.tweens.add({
         targets: notiText, 
         y: this.player.y - 25,
         duration: 800,
         onComplete: function(){
            notiText.destroy();
         },   
         onCompleteScope: this
      })

      // Xoá khung và chữ
      this.questionFrame.visible = false;
      this.questionText.destroy();
      this.answerFrame.clear(true, true);
      this.answerContent.clear(true, true);

      this.player.active = true; 

      if (isCorrect) {
         this.curQuestion++;
         this.score += this.bonusScore;
         this.scoreText.text = "Điểm: " + this.score;
         if (this.bonusScore == 0) this.bonusScore = 100;
      } else {
         if (this.bonusScore == 50) this.bonusScore = 0;
         if (this.bonusScore == 100) this.bonusScore = 50;
      }
      
      // Đổi trạng thái của chest
      let chest = this.getTileNearPlayer(this.questionLayer);
      console.log(chest);

      if (isCorrect) {
         this.questionLayer.replaceByIndex(chest.index, 1035, chest.x, chest.y, 1, 1);
         chest.properties.collides = false;
         this.questionLayer.setCollisionByProperty({collides: false}, false);
      } else {
         this.questionLayer.replaceByIndex(chest.index, 1025, chest.x, chest.y, 1, 1);
      }
   }

   getKey() {
      this.haveKey = true;
      let key = this.getTileNearPlayer(this.keyLayer);
      key.visible = false;
      key.properties.collides = false;
      this.keyLayer.setCollisionByProperty({collides: false}, false);
   }

   update() {
      // movement
      var x = 0, y = 0;
      const speed = 120;
      if ( (this.cursors["up"].isDown || this.cursors["w"].isDown) && this.player.active) {
         this.player.play("m-up");
         y -= speed;
      }
      if ( (this.cursors["down"].isDown || this.cursors["s"].isDown) && this.player.active) {
         this.player.play("m-down");
         y += speed; 
      }
      if ( (this.cursors["right"].isDown || this.cursors["d"].isDown) && this.player.active) {
         this.player.play("m-right");
         x += speed;
      }
      if ( (this.cursors["left"].isDown || this.cursors["a"].isDown) && this.player.active) {
         this.player.play("m-left");
         x -= speed;
      }
      this.player.setVelocity(x, y);
   }
}