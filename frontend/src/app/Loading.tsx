import React from "react";
import classNames from "classnames";
import styles from "./Loading.module.scss";

interface IProps {
  icon: string;
  isSpinning: boolean;
}

const Loading: React.FC<IProps> = ({
  icon,
  isSpinning
}) => {
  const iconClassNames = classNames({
    [styles.spinning]: isSpinning,
    [styles.icon]: true
  });
  return <div className={styles.overlay}>
    <img alt="Loading icon" src={icon} className={iconClassNames} />
  </div>;
};

export default Loading;
