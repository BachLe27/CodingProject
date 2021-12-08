
export class Lv1 extends Phaser.Scene {
   constructor() {
      super('Lv1');
   }

   preload() {
      // this.load.tilemapTiledJSON("map", "./assets/Game/Lv1/Lv1.json");
      this.load.json("questions", "./assets/Game/Lv1/questionLv1.json");
      this.load.tilemapTiledJSON("map", "./assets/Game/Lv1/map1.json");
    }

   create() {
      
      this.game.registry.set('time', 60);
      this.game.registry.set('running', true);
      this.game.registry.set('penalty', 0);
   
      this.game.registry.set('curQuestion', 0);
      this.game.registry.set('totalChest', 5);

      this.game.registry.set('hasKey', false);
      this.game.registry.set('level', 1);

      // this.scene.launch('SoundButton');
      this.scene.launch('Quest');

      this.createTileMap();
      this.createPlayer();

      this.virus = this.physics.add.sprite(64 + 16, 64 + 48, 'virus');
      this.virus.play('move');
      
      this.physics.add.collider(this.virus, this.maze);
      this.virus.setBounce(1);
      this.virus.active = false;
      
      
      this.physics.add.collider(this.player, this.virus, (player, virus) => {
         this.hurtPlayer(player);
         this.move(virus);
      });

      this.scene.launch('Tutorial', {player: this.player}, this);
      this.setPhysics();

      // Cau hoi
      this.data = this.game.cache.json.entries.entries.questions;
   
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

   hurtPlayer(player) {
      player.disableBody(true, true);
      player.active = false;
      if (this.game.registry.get('sound')) this.sound.play('hurt');
      // this.resetPlayer();
      this.time.addEvent({
         delay: 500,
         callback: this.resetPlayer,
         callbackScope: this,
         loop: false,
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

   move(virus) {
      virus.setVelocity(0, 70);
   }

   createPlayer() {

      this.playerX = 64 + 16;
      this.playerY = 64 + 16;

      this.player = this.physics.add.sprite(this.playerX, this.playerY - 5, 'female');

      this.player.active = true;
      this.haveKey = false;

      this.myCam = this.cameras.main;
      this.myCam.startFollow(this.player);
      this.cameras.main.setZoom(2);
   }

   createTileMap() {
      this.map = this.add.tilemap('map');
      const terrain = this.map.addTilesetImage('terrain_atlas', 'terrain-img');
      const chest = this.map.addTilesetImage('chest', 'chest-img');
      const maze = this.map.addTilesetImage('terrain_atlas', 'terrain-img');
      const key = this.map.addTilesetImage('key', 'key-img');

      this.groundLayer = this.map.createLayer('ground', terrain);
      this.maze = this.map.createLayer('maze', terrain);
      this.questionLayer = this.map.createLayer('chest', chest);
      this.keyLayer = this.map.createLayer('key', key);

      this.keyLayer.visible = false;
   }

   setPhysics() {
      this.groundLayer.setCollisionByProperty({collides: true});
      this.questionLayer.setCollisionByProperty({collides: true});
      this.keyLayer.setCollisionByProperty({collides: true});
      this.maze.setCollisionByProperty({collides: true});

      this.physics.add.collider(this.player, this.groundLayer);
      this.physics.add.collider(this.player, this.maze);
      

      this.physics.add.collider(this.player, this.questionLayer, 
         (player, chest) => {
            this.scene.launch('Question', {
               question: this.data, 
               player: this.player,
               chest: chest,
               layer: this.questionLayer,
               map: this.map,
            }, 
            this);
         }, null, this
      );

      // const debugGraphics = this.add.graphics().setAlpha(0.75);
      // this.questionLayer.renderDebug(debugGraphics, {
      //    tileColor: null, // Color of non-colliding tiles
      //    collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      //    faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
      // });
   }


   getKey(key) {
      this.game.registry.set('hasKey', true);
      if (this.game.registry.get('sound'))
         this.sound.play('key');
      var tiles = this.map.getTilesWithin(key.x - 1, key.y - 1, 3, 3, {
         isColliding: true,
      }, this.keyLayer);
      tiles.forEach(tile => {
         tile.visible = false;
         tile.properties.collides = false;
      })
      this.keyLayer.setCollisionByProperty({collides: false}, false);
   }


   update() {
      // movement
      var x = 0, y = 0;
      const speed = 120;
      if ( (this.cursors["up"].isDown || this.cursors["w"].isDown) && this.player.active) {
         this.player.play("up");
         y -= speed;
      }
      if ( (this.cursors["down"].isDown || this.cursors["s"].isDown) && this.player.active) {
         this.player.play("down");
         y += speed; 
      }
      if ( (this.cursors["right"].isDown || this.cursors["d"].isDown) && this.player.active) {
         this.player.play("right");
         x += speed;
      }
      if ( (this.cursors["left"].isDown || this.cursors["a"].isDown) && this.player.active) {
         this.player.play("left");
         x -= speed;
      }
      this.player.setVelocity(x, y);


      if (this.game.registry.get('curQuestion') == this.game.registry.get('totalChest')) {
         this.keyLayer.visible = true;
         this.physics.add.collider(
            this.player, this.keyLayer, (player, key) => this.getKey(key),
         null, this);
      }

      if(this.virus.active)
         this.move(this.virus);
   }
}