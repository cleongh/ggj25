import Boot from "./boot.js";
import Intro from "./Intro.ts";
import CombatRewardScene from "./scenes/CombatRewardScene.ts";
import Credits from "./scenes/Credits.ts";
import MainMenuScene from "./scenes/MainMenuScene.ts";
import MapScene from "./scenes/MapScene.ts";
import Phaser from "phaser";
import CardCombatScene from "./scenes/CardCombatScene";

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "juego",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
  },
  pixelArt: true,
  scene: [Boot, MainMenuScene, MapScene, Credits, Intro, CombatRewardScene, CardCombatScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 400 },
      debug: false,
    },
  },
};

new Phaser.Game(config);
