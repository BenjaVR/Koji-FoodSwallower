import { Howl } from "howler";

export type SoundEffect =
  | "BackgroundMusic"
  | "GainPoint"
  | "LoseLife"
  | "UiClick"
  | "UiHover";

export class SoundEffectManager {
  private static isLoaded: boolean = false;
  private static howlMap: { [key: string]: Howl };

  public static getSound(sound: SoundEffect): Howl {
    if (!this.isLoaded) {
      throw new Error("Sounds are not loaded!");
    }
    const key = sound as string;
    const howl = this.howlMap[key];
    if (howl === undefined) {
      throw new Error("Sound does not exist!");
    }
    return howl;
  }

  public static loadAllSounds(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isLoaded) {
        return resolve();
      }
      Promise
        .all([
          this.registerSong("BackgroundMusic", { src: [] }) // TODO
          // TODO ...
        ])
        .then(() => resolve())
        .catch((ex) => reject(ex));
    });
  }

  private static registerSong(key: SoundEffect, properties: IHowlProperties): Promise<void> {
    return new Promise((resolve, reject) => {
      let howl: Howl;
      try {
        howl = new Howl(properties);
      } catch (ex) {
        return reject(ex);
      }
      this.howlMap[key] = howl;
      return resolve();
    });
  }
}
