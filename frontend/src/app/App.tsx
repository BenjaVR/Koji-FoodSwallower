import React from "react";
import Koji from "@withkoji/vcc";
import { useBackgroundMusic } from "./useBackgroundMusic";
import Background from "./Background";
import Loading from "./Loading";
import { PhaserGame } from "../game";
import { useGameAssetsLoader } from "../game/loading/useGameAssetsLoader";
import { useWindowSize } from "../utilities/useWindowSize";
import styles from "./App.module.scss";

/**
 * TODO:
 *  - Show global UI elements (mute button)
 *  - Manage different screens (main menu, game, leaderboard, help ...)
 *  - Register modals system (for e.g. pause menu, game over & submit to leaderboard ...)
 */
export const App: React.FC = () => {
  const { isLoaded, isMuted, setMuted } = useBackgroundMusic(Koji.config.sounds.backgroundMusic);
  const { areAssetsLoading, assetsLoadingPercentage } = useGameAssetsLoader();
  const { windowWidth, windowHeight } = useWindowSize();

  if (!isLoaded) {
    return withBackground(
      <Loading
        icon={Koji.config.ui.loading.icon}
        isSpinning={Koji.config.ui.loading.isSpinning}
      />
    );
  }

  return (
    withBackground(
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
            <PhaserGame gameWidth={windowWidth} gameHeight={windowHeight} />
          </div>
        </>}
      </>
    )
  );
};

function withBackground(jsx: React.ReactElement): React.ReactElement {
  return <Background imageUrl={Koji.config.ui.background.image} backupColorHex={Koji.config.ui.background.color}>
    {jsx}
  </Background>;
}
