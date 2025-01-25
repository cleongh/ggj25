import Phaser from 'phaser';

// Iconos de los tokens
import physical from "../assets/tokens/physical.png"
import relationships from "../assets/tokens/relationships.png"
import work from "../assets/tokens/work.png"

/**
 * List of character names. We are assuming that character spritesheets are: 
 * - 4 128x128 frames
 * - named <character name>.png
 * - stored under /assets/characters
 *
 * Then, on boot.js, we will: 
 * - load their spritesheets on `preload()`
 * - create the idle animation for each caracter on `create()`. This animation will be named "idle_<character name>"
 */
let characterNames = ["mrbuble", "mrbatpat", "mrmagoo"]

/**
 * Escena para la precarga de los assets que se usarán en el juego.
 * Esta escena se puede mejorar añadiendo una imagen del juego y una 
 * barra de progreso de carga de los assets
 * @see {@link https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/} como ejemplo
 * sobre cómo hacer una barra de progreso.
 */
export default class Boot extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'boot' });
  }

  /**
   * Carga de los assets del juego
   */
  preload() {
    // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
    //this.load.setPath('assets/sprites/');
    // this.load.image('platform', platform);

    this.load.image("physical", physical)
    this.load.image("relationships", relationships)
    this.load.image("work", work)

    // Load character spritesheets
    this.load.path = 'ggj25/assets/characters/';
    characterNames.forEach((enemyName) => {
      console.log("Loading png for ", enemyName)
      this.load.spritesheet(enemyName, enemyName + ".png", { frameWidth: 128, frameHeight: 128 })
    })

  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    // this.scene.start('card-combat');
    // this.scene.start('main-menu');

    // Create character idle animations
    characterNames.forEach((enemyName) => {
      console.log("creating idle animation for enemy ", enemyName)
      this.anims.create({
        key: 'idle_' + enemyName,
        frames: this.anims.generateFrameNumbers(enemyName, { start: 0, end: 3 }),
        frameRate: 6,
        repeat: -1
      })
    })

    this.scene.start('map');
  }
}
