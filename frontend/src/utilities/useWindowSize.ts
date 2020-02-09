import { useEffect, useState } from "react";

interface IUseWindowSizeResult {
  windowWidth: number;
  windowHeight: number;
}

/**
 * TODO: explain
 * TODO: debounce results (optional milliseconds to debounce?)
 */
export function useWindowSize(): IUseWindowSizeResult {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      if (windowWidth !== window.innerWidth) {
        setWindowWidth(window.innerWidth);
      }
      if (windowHeight !== window.innerHeight) {
        setWindowHeight(window.innerHeight);
      }
    };
    window.addEventListener("resize", handleResize);

    return function cleanup() {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth, setWindowWidth, windowHeight, setWindowHeight]);

  return {
    windowWidth,
    windowHeight
  };
}
