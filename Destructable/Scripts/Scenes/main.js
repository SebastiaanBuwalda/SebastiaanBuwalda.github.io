var game  = new Phaser.Game(990, 480, Phaser.CANVAS, '');
game.state.add('Game', Game);
game.state.start('Game');
