import Phaser from "phaser";
import { LoadingScene } from "./scenes/LoadingScene";
import { ResponsiveScaler } from "../utilities";
import { GameScene } from "./scenes/GameScene";

export class Game extends Phaser.Game {
  constructor(canvas: HTMLCanvasElement) {
    super({
      type: Phaser.WEBGL,
      canvas: canvas,
      width: window.innerWidth,
      height: window.innerHeight,
      physics: {
        default: "arcade",
        arcade: {
          debug: false,
        }
      },
      autoFocus: true,
      scene: [
        LoadingScene,
        GameScene
      ],
      render: {
        antialiasGL: true,
        roundPixels: true,
        transparent: true,
      },
      disableContextMenu: true,
    });

    ResponsiveScaler.registerResizeHandler({
      handler: () => {
        this.scale.resize(window.innerWidth, window.innerHeight);
      },
      neverResetHandler: true, // Constructor will not run again when game restarts.
    });
  }

  public destroy(removeCanvas: boolean, noReturn?: boolean): void {
    super.destroy(removeCanvas, noReturn);
    ResponsiveScaler.reset();
  }
}
