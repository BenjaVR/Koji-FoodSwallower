import { useEffect, useState } from "react";
import { GameAssetsLoader } from "./GameAssetsLoader";

export function useGameAssetsLoader() {
  const [assetsLoadingText, setAssetsLoadingText] = useState(GameAssetsLoader.loadingText);
  const [assetsLoadingPercentage, setAssetsLoadingPercentage] = useState(GameAssetsLoader.loadingPercentage);
  const [areAssetsLoading, setAreAssetsLoading] = useState(GameAssetsLoader.isLoading);

  useEffect(() => {
    const loadingTextChanged = (newLoadingText: string): void => {
      setAssetsLoadingText(newLoadingText);
    };
    const loadingPercentageChanged = (newLoadingPercentage: number): void => {
      setAssetsLoadingPercentage(newLoadingPercentage);
    };
    const isLoadingChanged = (newIsLoading: boolean): void => {
      setAreAssetsLoading(newIsLoading);
    };

    GameAssetsLoader.registerLoadingTextChangeSubscriber(loadingTextChanged);
    GameAssetsLoader.registerLoadingPercentageChangeSubscriber(loadingPercentageChanged);
    GameAssetsLoader.registerIsLoadingChangeSubscriber(isLoadingChanged);

    return function cleanup() {
      GameAssetsLoader.removeLoadingTextChangeSubscriber(loadingTextChanged);
      GameAssetsLoader.removeLoadingPercentageChangeSubscriber(loadingPercentageChanged);
      GameAssetsLoader.removeIsLoadingChangeSubscriber(isLoadingChanged);
    };
  }, [setAssetsLoadingText, setAssetsLoadingPercentage, setAreAssetsLoading]);

  /**
   * Change the setters so they go through the singleton GameAssetsLoader.
   * State is updated through change events from the GameAssetsLoader.
   */
  return {
    assetsLoadingText,
    setAssetsLoadingText: (newAssetsLoadingText: string) => {
      GameAssetsLoader.loadingText = newAssetsLoadingText;
    },
    assetsLoadingPercentage,
    setAssetsLoadingPercentage: (newAssetsLoadingPercentage: number) => {
      GameAssetsLoader.loadingPercentage = newAssetsLoadingPercentage;
    },
    areAssetsLoading,
    setAreAssetsLoading: (newAreAssetsLoading: boolean) => {
      GameAssetsLoader.isLoading = newAreAssetsLoading;
    }
  };
}
