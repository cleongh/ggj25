import Phaser from "phaser";

// Iconos de los tokens
import physical from "../assets/tokens/physical.png";
import relationships from "../assets/tokens/relationships.png";
import work from "../assets/tokens/work.png";
import mainMenuBackground from "../assets/menu.png";
import tokens from "../assets/tokens/tokens.png"
import { levelDefinitions } from "../src/data/levelDefinitions";
import bg from "../assets/background.png"
import playerCard from '../assets/cards/playerCard.png'
import backCard from '../assets/cards/backCard.png'
import enemyCard from '../assets/cards/enemyCard.png'

import checked_node from '../assets/checked_node.png'
import empty_node from '../assets/empty_node.png'
import fight_node from '../assets/fight_node.png'
import health_node from '../assets/health_node.png'

/**
 * List of character names. We are assuming that character spritesheets are:
 * - 4 128x128 frames
 * - named <character name>.png
 * - stored under /assets/characters
 *
 * Then, on boot.js, we will:
 * - load their spritesheets on `preload()`
 * - create the idle animation for each caracter on `create()`. This animation will be named "idle_<character name>"
 *
 * MrDrop is a known exception that has 144x128 dimensions and 5 frames.
 */
let characterNames = ["mrbatpat", "mrbuble", "mrdrop", "mrmagoo"];

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
    super({ key: "boot" });
  }

  /**
   * Carga de los assets del juego
   */
  preload() {
    // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
    //this.load.setPath('assets/sprites/');
    // this.load.image('platform', platform);

    this.load.image("physical", physical);
    this.load.image("relationships", relationships);
    this.load.image("bg", bg);
    this.load.image("work", work);
    this.load.image("menuBackground", mainMenuBackground);

    this.load.image("playerCard", playerCard)
    this.load.image("backCard", backCard)
    this.load.image("enemyCard", enemyCard)

    this.load.image('checked_node', checked_node)
    this.load.image('empty_node', empty_node)
    this.load.image('fight_node', fight_node)
    this.load.image('health_node', health_node)

    this.load.spritesheet("tokens", tokens, { frameWidth: 16, frameHeight: 16 });

    // Load character spritesheets
    this.load.path = "ggj25/assets/characters/";
    characterNames.forEach((name) => {
      let width = name == "mrdrop" ? 144 : 128;
      this.load.spritesheet(name, name + ".png", {
        frameWidth: width,
        frameHeight: 128,
      });
    });
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    // this.scene.start('card-combat');
    // this.scene.start('main-menu');

    // Create character idle animations
    characterNames.forEach((name) => {
      let frames = name == "mrdrop" ? 5 : 4;
      this.anims.create({
        key: "idle_" + name,
        frames: this.anims.generateFrameNumbers(name, {
          start: 0,
          end: frames - 1,
        }),
        frameRate: 6,
        repeat: -1,
      });
    });

    // this.scene.start("map", levelDefinitions["level01"]);
    // this.scene.start("map");
    this.scene.start("main-menu");

  }
}
