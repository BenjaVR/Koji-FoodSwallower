import React, { CSSProperties } from "react";
import styles from "./Background.module.scss";

interface IProps {
  imageUrl?: string;
  backupColorHex: string;
}

const Background: React.FC<IProps> = ({
  children,
  imageUrl,
  backupColorHex
}) => {
  const imageBackgroundCss: CSSProperties = {
    background: `url(${imageUrl}) no-repeat center center fixed`,
    backgroundSize: "cover"
  };
  const colorBackgroundCss: CSSProperties = {
    backgroundColor: backupColorHex
  };

  const css = imageUrl === undefined
    ? colorBackgroundCss
    : imageBackgroundCss;

  return <div className={styles.fullscreenBackground} style={css}>{children}</div>;
};

export default Background;
