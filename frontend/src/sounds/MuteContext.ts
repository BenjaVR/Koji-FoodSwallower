import React, { useState } from "react";

interface IMuteContext {
  isMuted: boolean;
  setMuted: (newMuteState: boolean) => void;
}

export const MuteContext = React.createContext<IMuteContext>({
  isMuted: false,
  setMuted: () => { console.log("test?") }
});

export function useLocalStorageMuteContextProvider(): IMuteContext {
  const localStorageKey = "MUTE_STATE";

  const valueInLocalStorage = localStorage.getItem(localStorageKey) ?? "false";
  const parsedValueInLocalStorage = function () {
    try {
      return JSON.parse(valueInLocalStorage);
    } catch (ex) {
      return false;
    }
  }();

  const [isMuted, setMuted] = useState(parsedValueInLocalStorage);

  Howler.mute(isMuted);

  return {
    isMuted,
    setMuted: (newMuteState) => {
      Howler.mute(newMuteState);
      setMuted(newMuteState);
      localStorage.setItem(localStorageKey, JSON.stringify(newMuteState));
    }
  };
}
