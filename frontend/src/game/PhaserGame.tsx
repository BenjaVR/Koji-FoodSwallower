import React, { useEffect, useRef } from "react";
import { FoodSwallowerGame } from "./FoodSwallowerGame";
import { useGameAssetsLoader } from "./loading/useGameAssetsLoader";
import classNames from "classnames";
import styles from "./PhaserGame.module.scss";

export const PhaserGame: React.FC = () => {
  const { areAssetsLoading } = useGameAssetsLoader();
  const gameCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (gameCanvasRef.current === null) {
      return;
    }
    new FoodSwallowerGame(gameCanvasRef.current);
  }, [gameCanvasRef]);

  return (
    <canvas className={classNames(styles.gameCanvas, { [styles.invisible]: areAssetsLoading })} ref={gameCanvasRef} />
  );
};
