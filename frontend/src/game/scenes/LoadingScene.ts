import { BaseScene } from "./BaseScene";
import { GameAssetsLoader } from "../loading/GameAssetsLoader";

export class LoadingScene extends BaseScene {
  public static readonly KEY = "LoadingScene";

  constructor() {
    super({ key: LoadingScene.KEY });
  }

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

  public create(): void {
    // TODO
  }

  public update(time: number, delta: number): void {
    // TODO: start the game scene
  }
}
