import React from "react";
import Koji from "@withkoji/vcc";
import { useBackgroundMusic } from "./useBackgroundMusic";
import Background from "./Background";
import Loading from "./Loading";

/**
 * TODO:
 *  - Show global UI elements (mute button)
 *  - Manage different screens (main menu, game, leaderboard, help ...)
 *  - Register modals system (for e.g. pause menu, game over & submit to leaderboard ...)
 *  - Splash screen (progress for loading all assets, should integrate with the game!)
 */
const App: React.FC = () => {
  const { isLoaded, isMuted, setMuted } = useBackgroundMusic(Koji.config.sounds.backgroundMusic);

  if (!isLoaded) {
    return withBackground(
      <Loading icon={Koji.config.ui.loading.icon}
               isSpinning={Koji.config.ui.loading.isSpinning} />
    );
  }

  return (
    withBackground(
      <>
        <h1>Hello, World!</h1>
        {!isLoaded && <h2>Loading...</h2>}
        {isLoaded && <button onClick={() => setMuted(!isMuted)}>Toggle mute{isMuted
          ? " (MUTED)"
          : ""}</button>}
      </>
    )
  );
};

function withBackground(jsx: React.ReactElement): React.ReactElement {
  return <Background imageUrl={Koji.config.ui.background.image} backupColorHex={Koji.config.ui.background.color}>
    {jsx}
  </Background>;
}

export default App;
