import { BaseScene } from "../infrastructure/BaseScene";
import { GameAssetsLoader } from "./GameAssetsLoader";

export class LoadingScene extends BaseScene {
  preload(): void {
    GameAssetsLoader.isLoading = true;

    let i = 0;
    const interval = window.setInterval(() => {
      GameAssetsLoader.loadingPercentage = ++i * 4;
    }, 200);
    window.setTimeout(() => {
      window.clearInterval(interval);
      GameAssetsLoader.isLoading = false;
    }, 5000);

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

  update(time: number, delta: number): void {
    // TODO: start the game(menu) scene
  }
}
