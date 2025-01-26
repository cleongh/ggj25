import defaultTextStyle from '../defaultFont';

export default class Credits extends Phaser.Scene {
    goback: Phaser.GameObjects.Text;
    constructor() {
        super('credits');
    }


    create() {        
        let sfx_click = this.sound.add("sfx_click", {volume: 2.0});

        this.goback = this.add.text(100, 100, "Menu!").setInteractive();
        this.goback.on('pointerdown', () => {
            sfx_click.play()
            this.scene.start('main-menu')
        });

        const titleFont = { ...defaultTextStyle, fontSize: 53 };
        const peopleFont = { ...defaultTextStyle, fontSize: 16 };
    
        this.add.image(0, 0, "creditsBackground").setOrigin(0, 0).setTint(0xffffff);
    
        this.add.text(this.cameras.main.width / 2, 100, "Los enfadaos", titleFont).
          setOrigin(0.5, 0.5);



        this.add.text(100, 170, "Antonio\nCalvo\n(Progra)", peopleFont).
        setOrigin(0, 0);

        this.add.text(100, 290, "Pablo\nGutierrez\n(Progra)", peopleFont).
        setOrigin(0, 0);

        this.add.text(100, 410, "Ana\nRuiz\n(Progra)", peopleFont).
        setOrigin(0, 0);


        this.add.text(360, 170, "Carlos\nLeón\n(Diseño)", peopleFont).
        setOrigin(0, 0);

        this.add.text(360, 290, "María\nSachez\n(Sonido)", peopleFont).
        setOrigin(0, 0);

        this.add.text(360, 410, "Guillermo\nJiménez\n(Arte)", peopleFont).
        setOrigin(0, 0);

        this.add.text(590, 170, "Alejandro\nVillar\n(Provider)", peopleFont).
        setOrigin(0, 0);

        this.add.text(590, 290, "Ismael\nSagredo\n(Arte)", peopleFont).
        setOrigin(0, 0);

        this.add.text(10, this.cameras.main.height - 50, "Volver al menú", defaultTextStyle).setInteractive().on('pointerdown', () => {
            this.scene.start('main-menu');
        }).setOrigin(0, 0.5);
    }
}

