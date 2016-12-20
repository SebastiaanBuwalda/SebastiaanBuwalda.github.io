   var Game = function(game) {
       this.bullet = null;
       this.player = null;
       this.background = null;
       this.land = null;

       this.power = 65;
       this.angleSetting = -15;

       this.isP1Turn = true;
       this.movementEnabled = true;
       this.keyReset = true;
       this.turnReset = true;

       this.P1Health = 100;
       this.P2Health = 100;
   };

   Game.prototype = {

       init: function() {

           this.game.renderer.renderSession.roundPixels = true;


           this.physics.startSystem(Phaser.Physics.ARCADE);
           this.physics.arcade.gravity.y = 150;

       },

       preload: function() {
           this.load.image('bullet', 'Assets/Images/bombas.png');
           this.load.image('background', 'Assets/Images/background.png');
           this.load.image('land', 'Assets/Images/land.png');
           this.load.image('gem', 'Assets/Images/gem.png');
           this.load.image('arrow', 'Assets/Images/arrow.png')
           this.load.image('explosion', 'Assets/Images/explode.png')

       },

       create: function() {

           this.upKey = this.input.keyboard.addKey(Phaser.Keyboard.UP);
           this.downKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
           this.leftKey = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
           this.rightKey = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
           this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
           this.oneKey = this.input.keyboard.addKey(Phaser.Keyboard.ONE);
           this.twoKey = this.input.keyboard.addKey(Phaser.Keyboard.TWO);

           this.background = this.add.sprite(0, 0, 'background');

           this.land = this.add.bitmapData(992, 480);
           this.land.draw('land');
           this.land.update();
           this.land.addToWorld();

           this.bullet = this.add.sprite(0, 0, 'bullet');
           this.bullet.anchor.setTo(0.5);
           this.bullet.exists = false;
           this.physics.arcade.enable(this.bullet);

           this.player = this.add.sprite(220, 382, 'gem');
           this.player.anchor.setTo(1);
           this.physics.arcade.enable(this.player);

           this.player2 = this.add.sprite(660, 365, 'gem');
           this.player2.anchor.setTo(1);
           this.physics.arcade.enable(this.player2);

           this.aimArrow = this.add.sprite(200, 200, 'arrow');
           this.aimArrow.anchor.setTo(0.5);
           this.aimArrow.alpha = 0.333;

           this.explosion = this.add.sprite(0, 0, 'explosion')
           this.explosion.exists = false;
           this.explosion.anchor.setTo(0.5);
           this.explosion.scale.setTo(2)
           this.physics.arcade.enable(this.explosion);

           this.powerText = this.add.text(16, 16, 'POWER: ' + this.power, {
               fontSize: '58px',
               fill: '#00000'
           });

           this.P1HText = this.add.text(16, 64, 'P1: ' + this.P1Health, {
               fontSize: '58px',
               fill: '#00000'
           });
           this.P2HText = this.add.text(16, 128, 'P2: ' + this.P2Health, {
               fontSize: '58px',
               fill: '#00000'
           });
           this.WinText = this.add.text(450, 200, '', {
               fontSize: '70px',
               fill: '#00000'
           });

       },

       bulletVsLand: function() {

           if (this.bullet.x < 0 || this.bullet.x > this.game.world.width || this.bullet.y > this.game.height) {
               this.removeBullet();
               return;
           }

           var x = Math.floor(this.bullet.x);
           var y = Math.floor(this.bullet.y);
           var rgba = this.land.getPixel(x, y);

           if (rgba.a > 0) {
               this.land.blendDestinationOut();
               this.land.circle(x, y, 50, 'rgba(0, 0, 0, 255');
               this.land.blendReset();
               this.land.update();
               this.removeBullet();
           }

       },

       terrainCollision: function(myObject) {
           var x = Math.floor(myObject.x);
           var y = Math.floor(myObject.y);
           var rgba = this.land.getPixel(x, y);
           if (rgba.a == 255) {
               myObject.reset(x, y);
           }
       },


       fire: function() {

           if (this.bullet.exists) {
               return;
           }
           if (this.isP1Turn) {
               this.bullet.reset(this.player.x - 10, this.player.y - 10);
           } else {
               this.bullet.reset(this.player2.x - 10, this.player2.y - 10);
           }
           this.turnReset = true;
           this.aimArrow.exists = false;
           this.physics.arcade.velocityFromRotation(this.aimArrow.rotation, this.power * 4.5, this.bullet.body.velocity);
           this.movementEnabled = false;

       },

       removeBullet: function() {

           this.explosion.exists = true;
           this.explosion.reset(this.bullet.x, this.bullet.y);
           this.bullet.kill();
           this.isP1Turn = !this.isP1Turn;
           this.aimArrow.exists = true;
           this.movementEnabled = true;
           this.time.events.add(Phaser.Timer.SECOND * 0.125, this.removeExplosion, this);
       },

       removeExplosion: function() {
           this.explosion.kill();
       },

       updatePower: function() {
           this.aimArrow.angle = this.angleSetting;
           if (this.upKey.isDown) {
               if (this.power < 100) {
                   this.power++;
                   this.powerText.text = 'POWER: ' + this.power;
               }
           } else if (this.downKey.isDown) {
               if (this.power > 30) {
                   this.power--;
                   this.powerText.text = 'POWER: ' + this.power;
               }
           } else if (this.leftKey.isDown) {
               if (this.angleSetting > -180) {
                   this.angleSetting--;
               }
           } else if (this.rightKey.isDown) {
               if (this.angleSetting < 0) {
                   this.angleSetting++;
               }
           }


       },

       updateHealth: function(myVar, damage, isP1Health) {
           myVar = myVar - damage;
           this.turnReset = false;
           if (isP1Health) {
               this.P1Health = myVar;
               this.P1HText.text = 'P1: ' + this.P1Health;
               if (this.P1Health <= 0) {
                 //In this case, player 1 wins
                   this.endGame("PLAYER 1 WINS!");
               }
           } else {
               this.P2Health = myVar;
               this.P2HText.text = 'P2: ' + this.P2Health;
               if (this.P2Health <= 0) {
                 //In this case, player 2 wins
                   this.endGame("PLAYER 2 WINS!");
               }
           }
       },

       endGame: function(winScreenText)
       {
         //When the game is over
         this.WinText.text = winScreenText;
         this.game.state.start('Game');
         this.power = 65;
         this.angleSetting = -15;

         this.isP1Turn = true;
         this.movementEnabled = true;
         this.keyReset = true;
         this.turnReset = true;

         this.P1Health = 100;
         this.P2Health = 100;
       },

       update: function() {
           if (this.turnReset) {
               this.physics.arcade.collide(this.player, this.explosion, function() {
                   this.updateHealth(this.P1Health, 25, true);
               }, null, this);
               this.physics.arcade.collide(this.player2, this.explosion, function() {
                   this.updateHealth(this.P2Health, 25, false);
               }, null, this);
           }
           this.terrainCollision(this.player);
           this.terrainCollision(this.player2);
           if (this.movementEnabled) {
               this.updatePower();
           }
           if (this.spaceKey.isDown && this.keyReset) {
               this.fire();
               this.keyReset = false;
           } else if (!this.spaceKey.isDown) {
               this.keyReset = true;
           }

           if (this.bullet.exists) {
               this.bulletVsLand();
           } else {
               if (this.isP1Turn) {
                   this.aimArrow.reset(this.player.x, this.player.y);
               } else {
                   this.aimArrow.reset(this.player2.x, this.player2.y);
               }
           }
       }

   };
