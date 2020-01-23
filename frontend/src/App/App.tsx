import React from "react";
import { useBackgroundMusic } from "./useBackgroundMusic";

/**
 * TODO:
 *  - Manage background music, image ...
 *  - Show global UI elements (mute button)
 *  - Manage different screens (main menu, game, leaderboard, help ...)
 *  - Register modals system (for e.g. pause menu, game over & submit to leaderboard ...)
 *  - Splash screen (progress for loading all assets, should integrate with the game!)
 */
const App: React.FC = () => {
  const { isLoaded, isMuted, setMuted } = useBackgroundMusic();

  return (
    <>
      <h1>Hello, World!</h1>
      {!isLoaded && <h2>Loading...</h2>}
      {isLoaded && <button onClick={() => setMuted(!isMuted)}>Toggle mute{isMuted
        ? " (MUTED)"
        : ""}</button>}
    </>
  );
};

export default App;
