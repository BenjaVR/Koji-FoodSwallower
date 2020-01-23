import { Howl } from "howler";
import Koji from "@withkoji/vcc";
import { useEffect, useState } from "react";

let singletonBackgroundMusic: Howl | undefined;

function storeMuteStateInLocalStorage(isMuted: boolean) {
  localStorage.setItem("isMuted", JSON.stringify(isMuted));
}

function fetchMuteStateFromLocalStorage(): boolean {
  const defaultIsMuted = false;
  try {
    const localStorageContentString = localStorage.getItem("isMuted") ?? JSON.stringify(defaultIsMuted);
    return JSON.parse(localStorageContentString);
  } catch {
    // In case the local storage value is not valid JSON, make it the default (false) and persist it.
    storeMuteStateInLocalStorage(defaultIsMuted);
    return defaultIsMuted;
  }
}

export const useBackgroundMusic = () => {
  const [isLoaded, setLoaded] = useState(singletonBackgroundMusic?.state() === "loaded" ?? false);
  const [isMuted, setMuted] = useState(fetchMuteStateFromLocalStorage());

  useEffect(() => {
    if (singletonBackgroundMusic === undefined) {
      singletonBackgroundMusic = new Howl({
        src: [Koji.config.sounds.backgroundMusic],
        autoplay: true,
        loop: true,
        mute: isMuted,
      });
      singletonBackgroundMusic.once("load", () => {
        setLoaded(true);
      });
    } else {
      if (singletonBackgroundMusic.state() === "loaded") {
        setLoaded(true);
      } else {
        singletonBackgroundMusic.once("load", () => {
          setLoaded(true);
        });
      }
    }

    singletonBackgroundMusic.mute(isMuted);
    storeMuteStateInLocalStorage(isMuted);
  }, [isMuted]);

  return {
    isMuted,
    setMuted,
    isLoaded
  };
};
