import React, { CSSProperties } from "react";

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
  const sharedCss: CSSProperties = {
    width: "100vw",
    height: "100vh",
    position: "absolute"
  };

  const css = imageUrl === undefined
    ? { ...colorBackgroundCss, ...sharedCss }
    : { ...imageBackgroundCss, ...sharedCss };

  return <div style={css}>{children}</div>;
};

export default Background;
