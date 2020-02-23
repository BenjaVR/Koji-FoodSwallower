import React from "react";
import Koji from "@withkoji/vcc";
import Background from "./Background";
import Loading from "./Loading";
import { PhaserGame } from "../game";
import { useGameAssetsLoader } from "../game/loading/useGameAssetsLoader";
import styles from "./App.module.scss";
import { MuteContext, useBackgroundMusic } from "../sounds";
import { useLocalStorageMuteContextProvider } from "../sounds/MuteContext";

export const App: React.FC = () => {
  const { isLoaded, isMuted, setMuted } = useBackgroundMusic(Koji.config.sounds.backgroundMusic);
  const { areAssetsLoading, assetsLoadingPercentage } = useGameAssetsLoader();

  if (!isLoaded) {
    return withAppWrapper(
      <Loading
        icon={Koji.config.ui.loading.icon}
        isSpinning={Koji.config.ui.loading.isSpinning}
      />
    );
  }

  return (
    withAppWrapper(
      <>
        <h1>Hello, World!</h1>
        {!isLoaded && <h2>Loading...</h2>}
        {areAssetsLoading && <h3>Loading game assets... ({assetsLoadingPercentage}%)</h3>}
        {isLoaded &&
        <>
          <div className={styles.overlayContainer}>
            <button onClick={() => setMuted(!isMuted)}>Toggle mute{isMuted
              ? " (MUTED)"
              : ""}</button>
          </div>
          <div className={styles.gameContainer}>
            <PhaserGame />
          </div>
        </>
        }
      </>
    )
  );
};

function withAppWrapper(jsx: React.ReactElement): React.ReactElement {
  const muteContext = useLocalStorageMuteContextProvider();

  return (
    <MuteContext.Provider value={muteContext}>
      <Background
        imageUrl={Koji.config.ui.background.image}
        backupColorHex={Koji.config.ui.background.color}
      >
        {jsx}
      </Background>
    </MuteContext.Provider>
  );
}
