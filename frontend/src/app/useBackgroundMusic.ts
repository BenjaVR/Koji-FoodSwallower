import { Howl } from "howler";
import { useEffect, useState } from "react";

const backgroundMusicMap: {
  [musicUrl: string]: Howl;
} = {};

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

export const useBackgroundMusic = (musicUrl: string) => {
  const [isLoaded, setLoaded] = useState(backgroundMusicMap[musicUrl]?.state() === "loaded" ?? false);
  const [isMuted, setMuted] = useState(fetchMuteStateFromLocalStorage());

  useEffect(() => {
    if (backgroundMusicMap[musicUrl] === undefined) {
      backgroundMusicMap[musicUrl] = new Howl({
        src: [musicUrl],
        autoplay: true,
        loop: true,
        mute: isMuted,
      });
      backgroundMusicMap[musicUrl].once("load", () => {
        setLoaded(true);
      });
    } else {
      if (backgroundMusicMap[musicUrl].state() === "loaded") {
        setLoaded(true);
      } else {
        backgroundMusicMap[musicUrl].once("load", () => {
          setLoaded(true);
        });
      }
    }

    backgroundMusicMap[musicUrl].mute(isMuted);
    storeMuteStateInLocalStorage(isMuted);
  }, [isMuted]);

  return {
    isMuted,
    setMuted,
    isLoaded
  };
};
