import Phaser from "phaser";

// Iconos de los tokens
import physical from "../assets/tokens/physical.png";
import relationships from "../assets/tokens/relationships.png";
import work from "../assets/tokens/work.png";
import mainMenuBackground from "../assets/menu.png";
import tokens from "../assets/tokens/tokens.png";
import { levelDefinitions } from "../src/data/levelDefinitions";
import bg from "../assets/background.png";
import creditbg from "../assets/credits.png"
import playerCard from "../assets/cards/playerCard.png";
import backCard from "../assets/cards/backCard.png";
import enemyCard from "../assets/cards/enemyCard.png";
import damage from "../assets/cards/damage.png";

import checked_node from "../assets/checked_node.png";
import empty_node from "../assets/empty_node.png";
import fight_node from "../assets/fight_node.png";
import health_node from "../assets/health_node.png";

import bubble_text_right from "../assets/bubble_text_right.png";
import bubble_text_left from "../assets/bubble_text_left.png";
import buble_real from "../assets/buble-real.png";
import smoke from "../assets/smoke.png";

import mrbatpat_animations from "../assets/characters/mrbatpat-animations.png"
import mrbuble_animations from "../assets/characters/mrbuble-animations.png"
import mrdrop_animations from "../assets/characters/mrdrop-animations.png"
import mrmagoo_animations from "../assets/characters/mrmagoo-animations.png"

import buble_audio from "../assets/buble.ogg";
import music_mainmenu from "../assets/music/MUSIC_MainMenuLoop.ogg";

import sfx_click from '../assets/sfx/SFX_click.wav'
import sfx_card from '../assets/sfx/SFX_card.wav'

/**
 * List of character names. We are assuming that character spritesheets are:
 * - 4 128x128 frames per row
 * - named <character name>.png
 * - stored under /assets/characters
 *
 * Then, on boot.js, we will:
 * - load their spritesheets on `preload()`. They will be named "<character name>-animations"
 * - create the idle animation for each caracter on `create()`. This animation will be named "idle_<character name>"
 * - create the talk animation for each caracter on `create()`. This animation will be named "talk_<character name>"
 *
 * MrDrop is a known exception that has 144x128 dimensions and 5 frames per row.
 */
let characterNames = ["mrbatpat", "mrbuble", "mrdrop", "mrmagoo"];

let characterAssets = {
  "mrbatpat": mrbatpat_animations,
  "mrbuble": mrbuble_animations, 
  "mrdrop": mrdrop_animations, 
  "mrmagoo": mrmagoo_animations
}

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

    // Audio ¿por qué no funcionas?
    this.load.audio("buble", buble_audio);
    this.load.audio("music_mainmenu", music_mainmenu);

    this.load.image("physical", physical);
    this.load.image("relationships", relationships);
    this.load.image("bg", bg);
    this.load.image("work", work);
    this.load.image("menuBackground", mainMenuBackground);
    this.load.image("emptyBackground", bg);
    this.load.image("creditsBackground", creditbg);

    this.load.image("realbuble", buble_real);

    this.load.image("playerCard", playerCard);
    this.load.image("backCard", backCard);
    this.load.image("enemyCard", enemyCard);

    this.load.image("checked_node", checked_node);
    this.load.image("empty_node", empty_node);
    this.load.image("fight_node", fight_node);
    this.load.image("health_node", health_node);

    this.load.image("damage", damage);

    this.load.audio("sfx_click", sfx_click);
    this.load.audio("sfx_card", sfx_card);

    this.load.spritesheet("bubble_text_right", bubble_text_right, {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("bubble_text_left", bubble_text_left, {
      frameWidth: 128,
      frameHeight: 128,
    });

    this.load.spritesheet("tokens", tokens, {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet("smoke", smoke, {
      frameWidth: 64,
      frameHeight: 64,
    });

    // Load character spritesheets

    characterNames.forEach((characterName) => {
      let width = characterName == "mrdrop" ? 144 : 128;
      let spriteName = characterName + "-animations";
      this.load.spritesheet(spriteName, characterAssets[characterName], {
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
    characterNames.forEach((characterName) => {
      let frames = characterName == "mrdrop" ? 5 : 4;
      let spriteName = characterName + "-animations";

      this.anims.create({
        key: "idle_" + spriteName,
        frames: this.anims.generateFrameNumbers(spriteName, {
          start: 0,
          end: frames - 1,
        }),
        frameRate: 6,
        repeat: -1,
      });
      this.anims.create({
        key: "talk_" + spriteName,
        frames: this.anims.generateFrameNumbers(spriteName, {
          start: frames,
          end: 2 * frames - 1,
        }),
        frameRate: 6,
        repeat: -1,
      });
    });

    this.anims.create({
      key: "idle_smoke",
      frames: this.anims.generateFrameNumbers("smoke", {
        start: 0,
        end: 3,
      }),
      frameRate: 4,
      repeat: -1,
    });

    // this.scene.start("map", levelDefinitions["level01"]);
    // this.scene.start("map");
    this.scene.start("main-menu");
  }
}
