import { BaseScene } from "../infrastructure/BaseScene";
import { GameAssetsLoader } from "./GameAssetsLoader";

export class LoadingScene extends BaseScene {
  public preload(): void {
    GameAssetsLoader.isLoading = true;

    let i = 0;
    const interval = window.setInterval(() => {
      GameAssetsLoader.loadingPercentage = ++i * 20;
    }, 200);
    window.setTimeout(() => {
      window.clearInterval(interval);
      GameAssetsLoader.isLoading = false;
    }, 1000);

    // TODO: launch the external loading indicator
    this.load.on("progress", (progress: number) => {
      // TODO: update the loading percentage on the external loading indicator
      console.log(Math.round(progress * 100) + "%");
    });
    this.load.on("fileprogress", (file: Phaser.Loader.File) => {
      // TODO: update the text on the external loading indicator
      console.log(`Loading asset: ${file.src}`);
    });
    this.load.on("complete", () => {
      // TODO: hide the external loading indicator
      console.log("done!");
    });
  }

  public update(time: number, delta: number): void {
    // TODO: start the game(menu) scene
  }

  public create(): void {
    const size = new Phaser.Structs.Size(100, 200);

    const radius = 40;
    const centerX = this.cameras.main.displayWidth / 2 + (radius / 2);
    const centerY = this.cameras.main.displayHeight / 2 + (radius / 2);
    this.add.circle(centerX, centerY, radius, 0x222222, 1);
  }
}
