
invadersApp.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;
};

invadersApp.MainMenu.prototype = {

	create: function () {

		this.music = this.add.audio('titleMusic');
		//this.music.play('', 0, 1, true, true);


        var textTop = invadersApp.utils.addText(this, this.game.width / 2, 50, 'CITIUS PROUDLY PRESENTS:' , 2);
        textTop.alpha = 0;

        //var companyText = this.add.bitmapText(this.game.width / 2, 50, 'minecraftia', 'CiTIUS PROUDLY PRESENTS:', 16);
        //companyText.anchor.x = 0.5;

        /*
		var presentsText = this.add.bitmapText(this.game.width / 2, companyText.y + 30, 'minecraftia', 'PROUDLY PRESENTS:', 16);
        presentsText.anchor.x = 0.5;
        */

        var titleYPos = this.game.height / 3;
		var title = this.add.sprite(this.game.width / 2, -100, 'title');
		title.anchor.setTo(0.5, 0.5);

        /*
		var copyright = this.add.sprite(this.game.width / 2, this.game.height - 30, 'copyright');
        copyright.anchor.setTo(0.5, 0.5);*/

		var logo = this.add.sprite(this.game.width / 2, this.game.height - 60, 'logo');
		logo.anchor.setTo(0.5, 0.5);
		logo.scale.setTo(0.6, 0.6);
        logo.visible = false;

		//var titleText = this.add.bitmapText(this.game.width / 2, 50, 'minecraftia', 'CiTIUS INVADERS', 50);
		//titleText.anchor.x = 0.5;
        var textPressStart = invadersApp.utils.addText(this, this.game.width / 2, titleYPos + 200, 'PRESS START', 2);
        textPressStart.img.visible = false;

		//var startEntry = this.addMenuEntry('START GAME', titleYPos + 160, this.startGame);
		//this.addMenuEntry('CONFIGURE', startEntry.y + 40);

        var textCopyright = invadersApp.utils.addText(this, this.game.width / 2, logo.y + 40, 'CENTRO SINGULAR DE INVESTIGACION EN TECNOLOXIAS DA INFORMACION', 1);
        textCopyright.img.visible = false;



        var tweenPresents = this.game.add.tween(textTop).to( { alpha: 1 }, 800, Phaser.Easing.Linear.None, false, 200);
        var tweenTitle = this.game.add.tween(title).to( { y: this.game.height / 3 }, 1200, Phaser.Easing.Bounce.Out, false);
        tweenPresents.chain(tweenTitle);

        tweenPresents.onComplete.add(function () {
            // Play music
            this.music.play('', 0, 1, true, true);
        }, this);

        tweenTitle.onComplete.add(function () {
            // Show bottom info
            logo.visible = true;
            textCopyright.img.visible = true;
            textPressStart.img.visible = true;

            // Start blinking event for 'PRESS START'
            this.game.time.events.loop(Phaser.Timer.HALF, function () {
                textPressStart.img.visible = !textPressStart.img.visible;
            }, this);

            //this.music.play('', 0, 1, true, true);

        }, this);

        // Start animated chain
        tweenPresents.start();

        this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(function () {
            this.startGame();
        }, this);
	},

	update: function () {

	},

	startGame: function (pointer) {
		this.music.stop();
		this.state.start('Game');
	}

};
