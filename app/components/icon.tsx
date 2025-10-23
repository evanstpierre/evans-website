// components/Icon.tsx
import React from "react";
import classNames from "classnames";

type IconProps = {
  name: string;
  fill?: 0 | 1;
  weight?: number;
  grade?: number;
  opticalSize?: number;
  className?: string;
};

const Icon: React.FC<IconProps> = ({
  name,
  fill = 0,
  weight = 400,
  grade = 0,
  opticalSize = 48,
  className = "",
}) => {
  const style = {
    fontVariationSettings: `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${opticalSize}`,
  };

  return (
    <span
      className={classNames("material-symbols-outlined", className)}
      style={style}
    >
      {name}
    </span>
  );
};

export default Icon;