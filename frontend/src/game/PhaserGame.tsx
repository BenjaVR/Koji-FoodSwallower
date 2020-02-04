import React, { useEffect, useRef } from "react";
import { FoodSwallowerGame } from "./FoodSwallowerGame";
import { useGameAssetsLoader } from "./loading/useGameAssetsLoader";

export const PhaserGame: React.FC = () => {
  const { areAssetsLoading } = useGameAssetsLoader();
  const gameCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (gameCanvasRef.current === null) {
      return;
    }
    new FoodSwallowerGame(gameCanvasRef.current);
  }, [gameCanvasRef]);

  const display = areAssetsLoading
    ? "none"
    : "block";
  return (
    <canvas style={{ display }} ref={gameCanvasRef} />
  );
};
