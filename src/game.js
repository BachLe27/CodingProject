/** @type {import("./types/phaser")} */
/** @type {import("./types/matter")} */

import { MainMenu } from "./scenes/MainMenu.js";
import { SoundButton } from "./scenes/UI/SoundButton.js";

import { LoadScene } from "./scenes/LoadScene.js";
import { LastScene } from "./scenes/LastScene.js";
import { HighScore } from "./scenes/UI/HighScore.js";

import { Story1 } from "./scenes/Stories/Story1.js";
import { Story2 } from "./scenes/Stories/Story2.js";
import { Story3 } from "./scenes/Stories/Story3.js";
import { Story4 } from "./scenes/Stories/Story4.js";

import { Lv1 } from "./scenes/Levels/Lv1.js";
import { Lv2 } from './scenes/Levels/Lv2.js'
import { Lv3 } from './scenes/Levels/Lv3.js'
import { Lv4 } from './scenes/Levels/Lv4.js'
import { Story5 } from './scenes/Stories/Story5.js'

import {Question} from './scenes/UI/Question.js';
import {Quest} from './scenes/UI/Quest.js';
import {Tutorial} from './scenes/UI/Tutorial.js';
import {Timer} from './scenes/UI/Timer.js';
import {GameOver} from './scenes/UI/GameOver.js';

var config = {
   type: Phaser.AUTO,
   width: 800,
   height: 600,
   backgroundColor: 0x000000,
   scene: [
      MainMenu, 
      Story1, 
      LoadScene, 
      Lv1, Story2, 
      Lv2, Story3,
      Lv3, Story4, 
      Lv4, Story5, 
      LastScene, HighScore, 
      SoundButton, Question, Quest, Tutorial, Timer, GameOver
   ],
   // scene:[Test, Gui],

   pixelArt: true,
   physics: {
      default: "arcade",
      arcade: {
         debug: true,
         gravity: { y: 0 },
      }
   }
};

var game = new Phaser.Game(config);