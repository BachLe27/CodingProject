/** @type {import("./types/phaser")} */
/** @type {import("./types/matter")} */

import { MainMenu } from "./scenes/MainMenu.js";
import { LoadScene } from "./scenes/LoadScene.js";
import { Story } from "./scenes/Story.js";
import { Story2 } from "./scenes/Story2.js";
import { Story3 } from "./scenes/Story3.js";
import { Story4 } from "./scenes/Story4.js";
import { Lv1 } from "./scenes/Lv1.js";
import { Lv2 } from './scenes/Lv2.js'
import { Lv3 } from './scenes/Lv3.js'
import { Lv4 } from './scenes/Lv4.js'
import { End } from './scenes/End.js'

var config = {
   type: Phaser.AUTO,
   width: 800,
   height: 600,
   backgroundColor: 0x272822,
   scene: [MainMenu, Story, LoadScene, Lv1, Story2, Lv2, Story3, Lv3, Story4, Lv4, End],
   // scene: [LoadScene, Lv2],
   // scene: [Story4, Lv4, End],
   pixelArt: true,

   physics: {
      default: "arcade",
      arcade: {
         debug: false,
         gravity: { y: 0 },
      }
   }
};

var game = new Phaser.Game(config);