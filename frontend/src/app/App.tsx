import React, { useContext, useEffect, useState } from "react";
import Koji from "@withkoji/vcc";
import Background from "./Background";
import Loading from "./Loading";
import { PhaserGame } from "../game";
import styles from "./App.module.scss";
import { MuteContext } from "../sounds";
import { useLocalStorageMuteContextProvider } from "../sounds/MuteContext";
import { AudioManager } from "../sounds/AudioManager";

export const App: React.FC = () => {
  const muteContextProvider = useLocalStorageMuteContextProvider();
  const [isLoading, setLoading] = useState(true);
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  useEffect(() => {
    AudioManager
      .loadAllSounds(percentage => setLoadingPercentage(percentage))
      .then(() => {
        setLoading(false);
        AudioManager.getSound("BackgroundMusic").play();
      });
  }, []);

  const app = isLoading
    ? <LoadingApp loadingPercentage={loadingPercentage} />
    : <LoadedApp />;

  return (
    <MuteContext.Provider value={muteContextProvider}>
      <Background
        imageUrl={Koji.config.ui.background.image}
        backupColorHex={Koji.config.ui.background.color}
      >
        {app}
      </Background>
    </MuteContext.Provider>
  )
};

interface ILoadingAppProps {
  loadingPercentage: number;
}

const LoadingApp: React.FC<ILoadingAppProps> = ({ loadingPercentage }) => {
  return (
      <Loading
        icon={Koji.config.ui.loading.icon}
        isSpinning={Koji.config.ui.loading.isSpinning}
        loadingText={`Loading... ${loadingPercentage}%`}
      />
  );
};

const LoadedApp: React.FC = () => {
  const muteContext = useContext(MuteContext);
  return (
    <>
      <h1>Hello, World!</h1>
      <div className={styles.overlayContainer}>
        <button onClick={() => muteContext.setMuted(!muteContext.isMuted)}>Toggle mute{muteContext.isMuted
          ? " (MUTED)"
          : ""}</button>
      </div>
      <div className={styles.gameContainer}>
        <PhaserGame />
      </div>
    </>
  );
};
