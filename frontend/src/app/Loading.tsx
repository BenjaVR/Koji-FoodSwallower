import React from "react";
import classNames from "classnames";
import styles from "./Loading.module.scss";

interface IProps {
  icon: string;
  isSpinning: boolean;
  loadingText?: string;
}

const Loading: React.FC<IProps> = ({
  icon,
  isSpinning,
  loadingText
}) => {
  const iconClassNames = classNames({
    [styles.spinning]: isSpinning,
    [styles.icon]: true
  });
  return <div className={styles.overlay}>
    <div className={styles.loadingWrapper}>
      <img alt="Loading icon" src={icon} className={iconClassNames} />
      <h1 className={styles.loadingText}>{loadingText}</h1>
    </div>
  </div>;
};

export default Loading;
