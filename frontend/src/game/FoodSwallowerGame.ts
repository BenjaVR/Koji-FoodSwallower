import Phaser from "phaser";
import { LoadingScene } from "./loading/LoadingScene";

export class FoodSwallowerGame extends Phaser.Game {
  constructor(canvas: HTMLCanvasElement) {
    super({
      type: Phaser.WEBGL,
      canvas: canvas,
      width: 400,
      height: 400,
      scale: {
        mode: Phaser.Scale.ScaleModes.RESIZE,
        autoCenter: Phaser.Scale.Center.CENTER_BOTH
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
