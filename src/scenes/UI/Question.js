export class Question extends Phaser.Scene {
   constructor() {
      super('Question');
   }
   
   init(data) {
      this.question = data.question;
      this.player = data.player;
      this.chest = data.chest;
      this.questionLayer = data.layer;
      this.map = data.map;
   }

   preload() {
   
   }

   create() {
      this.level = this.game.registry.get('level');
      this.curQuestion = this.game.registry.get('curQuestion');
      this.answerFrame = this.add.group();
      this.answerContent = this.add.group();
      this.hasKey = this.game.registry.get('hasKey');
      this.loadQuestion();
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

   loadQuestion() {
      let chest = this.chest;

      if (chest.properties.lastChest == true) 
      {
         if (this.hasKey) {

            this.game.registry.set('running', false);
            this.player.active = false;
            this.replaceChest(chest);
            const notiFormat = { font: 'bold 25px Arial', fill: 'black', align: 'center', 
               wordWrap: { width: 300, useAdvancedWrap: true } 
            };
            const frame = this.add.image(800 / 2, 600 / 2, 'frame');
            const noti = [
               "Bạn đã tìm được vaccine chống virus", 
               "Bạn đã tìm được kháng thể chống lại virus",
               "Virus corona là do con người tạo ra...", 
               "Bạn đã tìm được tung tích của kẻ tạo ra virus..." 
            ];


            const notiText = this.add.text(frame.x - frame.width/3, frame.y - frame.height/3 + 3, noti[this.level - 1], notiFormat);
            
            const btn = this.add.image(460, 355, 'btn').setScale(0.6).setOrigin(0, 0);
            const btnText = this.add.text(485, 356, 'Tiếp tục', {
               font: 'bold 16px Arial', align: 'center',
               stroke: "#000000", strokeThickness: 4,
            });

            this.sound.play('win');

            btn.setInteractive({ cursor: 'url(./assets/Game/cursor/Link.cur), pointer'});

            btn.on("pointerup", () => {
               this.scene.stop(`Lv${this.level}`);
               this.scene.stop('Quest');
               this.scene.stop('Timer');
               this.scene.stop("Question");
               this.scene.start(`Story${this.level + 1}`);
            })
         } 
         
         else {
            const notiFormat = { font: '20px Arial', fill: 'white', align: 'center', 
               wordWrap: { width: 200, useAdvancedWrap: true } 
            };
            
            const noti = "Bạn cần chìa khoá để mở rương vàng";
            const notiText = this.add.text(800/2 - 100, 600/2 - 80, noti, notiFormat);

            this.tweens.add({
               targets: notiText, 
               y: notiText.y,
               duration: 1000,
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
         this.loadContent();
      }
   }


   loadFrame() {
      this.questionFrame = this.add.image(400, 100, 'frame').setScale(1.5);
      this.questionFrame.visible = true;
      this.answerFrame.clear(true);

      let answerFrameX = [this.questionFrame.x - 150, this.questionFrame.x + 150];
      let answerFrameY = [this.questionFrame.y + 115, this.questionFrame.y + 185];

      for (let i = 0; i < 4; i++) {

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

   loadContent() {
      
      const questionFormat = { font: 'bold 20px Arial', fill: '#ffffff', align: 'left', 
         stroke: "#000000", strokeThickness: 4,
         wordWrap: { width: 500, useAdvancedWrap: true } 
      }; // text format cho câu hỏi

      const answerFormat = { font: 'bold 15px Arial', fill: '#ffffff', align: 'left', stroke: "#000000",
         stroke: "#000000", strokeThickness: 4,
         wordWrap: { width: 220, useAdvancedWrap: true } 
      }; // text format cho câu trả lời

      // Question content
      const questionX = this.questionFrame.x - 250;
      const questionY = this.questionFrame.y - 40;
      const question = this.question[this.curQuestion];
      // console.log(this.question);
      
      this.questionText = this.add.text(questionX, questionY, question.content, questionFormat);
      // Answer content

      const offsetX = 120, offsetY = 20;
      const answers = this.shuffle(question.answers);
      // console.log(answers);
      for (let i = 0; i < this.answerFrame.getLength(); i++) {
         let frame = this.answerFrame.getChildren(0)[i];
         let text = this.add.text(frame.x - offsetX, frame.y - offsetY, question.answers[i].content, answerFormat);
         this.answerContent.add(text);
         frame.on("pointerup", () => {
            const isCorrect = question.answers[i].isCorrect;
            // Xử lý đáp án
            this.getAnswer(isCorrect);
         }, this)
      }  
   }


   shuffle(array) {
      let currentIndex = array.length,  randomIndex;
    
      // While there remain elements to shuffle...
      while (currentIndex != 0) {
    
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }
    
      return array;
    }

   getAnswer(isCorrect) {
      const noti = (isCorrect? "Đúng rồi" : "Trừ 5 giây");
      const notiFormat = { font: 'Bold 25px Arial', fill: 'white', align: 'left', 
         wordWrap: { width: 200, useAdvancedWrap: true } 
      };

      const notiText = this.add.text(800/2 - 50, 600/2 - 50, noti, notiFormat);
      this.tweens.add({
         targets: notiText, 
         y: notiText.y - 25,
         duration: 800,
         onComplete: function(){
            notiText.destroy();
         },   
         onCompleteScope: this
      })

      // Xoá khung và chữ
      this.questionFrame.destroy();
      this.questionText.destroy();
      this.answerFrame.clear(true, true);
      this.answerContent.clear(true, true);
      this.player.active = true; 

      // Đổi trạng thái của chest
      if (isCorrect) {
         this.replaceChest(this.chest);
         if (this.game.registry.get('sound'))
            this.sound.play('play');
         this.game.registry.set('curQuestion', this.curQuestion + 1);
      } else {
         // this.questionLayer.replaceByIndex(this.chest.index, this.chest.index - 10, this.chest.x, this.chest.y, 1, 1);
         if (this.game.registry.get('sound'))
            this.sound.play('wrong');
         this.game.registry.set('penalty', 5);
         // this.physics.
      }
   }


   
}