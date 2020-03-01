import { Howl } from "howler";
import Koji from "@withkoji/vcc";
import { Simulate } from "react-dom/test-utils";
import load = Simulate.load;
import total = Phaser.Display.Canvas.CanvasPool.total;

export type SoundEffect =
  | "BackgroundMusic"
  | "GainPoint"
  | "LoseLife"
  | "GameOver"
  | "UiClick"
  | "UiHover";

export class AudioManager {
  private static isLoaded: boolean = false;
  private static howlMap: { [key: string]: Howl } = {};

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

  public static loadAllSounds(progressCallback: (loadedPercentage: number) => void): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isLoaded) {
        progressCallback(100);
        return resolve();
      }
      const songPromises = [
        this.registerSong("BackgroundMusic", { src: [Koji.config.sounds.backgroundMusic], loop: true }),
        this.registerSong("LoseLife", { src: [Koji.config.sounds.loseLife] }),
        this.registerSong("GainPoint", { src: [Koji.config.sounds.gainPoint] }),
        this.registerSong("GameOver", { src: [Koji.config.sounds.gameOver] }),
        this.registerSong("UiClick", { src: [Koji.config.sounds.uiClick] }),
        this.registerSong("UiHover", { src: [Koji.config.sounds.uiHover] }),
      ];
      let loaded = 0;
      let totalToLoad = songPromises.length;
      songPromises.forEach(songPromise => {
        songPromise.then(() => {
          const loadedPercentage = (++loaded / totalToLoad) * 100;
          progressCallback(Math.floor(loadedPercentage));
        });
      });
      Promise
        .all(songPromises)
        .then(() => {
          this.isLoaded = true;
          progressCallback(100);
          resolve();
        })
        .catch((ex) => reject(ex));
    });
  }

  private static registerSong(key: SoundEffect, properties: IHowlProperties): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.howlMap[key] = new Howl(properties)
          .once("load", () => {
            resolve();
          });
      } catch (ex) {
        return reject(ex);
      }
    });
  }
}
