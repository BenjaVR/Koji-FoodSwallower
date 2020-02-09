import Phaser from "phaser";
import { LoadingScene } from "./loading/LoadingScene";

export class FoodSwallowerGame extends Phaser.Game {
  constructor(canvas: HTMLCanvasElement) {
    super({
      type: Phaser.WEBGL,
      canvas: canvas,
      scale: {
        mode: Phaser.Scale.FIT
      },
      autoFocus: true,
      scene: [
        LoadingScene
      ],
      render: {
        antialiasGL: true,
        roundPixels: true,
        transparent: true,
      },
      disableContextMenu: true,
    });
  }
}
