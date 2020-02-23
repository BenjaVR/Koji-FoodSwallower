import { BaseScene } from "../infrastructure/BaseScene";
import { GameAssetsLoader } from "./GameAssetsLoader";

export class LoadingScene extends BaseScene {
  public preload(): void {
    GameAssetsLoader.isLoading = true;

    // TODO: load game assets here

    this.load.on("progress", (progress: number) => {
      GameAssetsLoader.loadingPercentage = progress * 100;
    });
    this.load.on("fileprogress", (file: Phaser.Loader.File) => {
      GameAssetsLoader.loadingText = `Loading asset: ${file.src}`;
    });
    this.load.on("complete", () => {
      GameAssetsLoader.isLoading = false;
    });
  }

  public update(time: number, delta: number): void {
    // TODO: start the game scene
  }

  public create(): void {
    const size = new Phaser.Structs.Size(100, 200);

    const radius = 40;
    const centerX = this.cameras.main.displayWidth / 2 + (radius / 2);
    const centerY = this.cameras.main.displayHeight / 2 + (radius / 2);
    this.add.circle(centerX, centerY, radius, 0x222222, 1);
  }
}
