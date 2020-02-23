import { BaseScene } from "./BaseScene";

export class GameScene extends BaseScene {
  public static readonly KEY = "GameScene";

  constructor() {
    super({ key: GameScene.KEY });
  }
}
