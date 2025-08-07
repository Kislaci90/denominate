import React from 'react';

interface CoinIconProps {
  value: string | number;
  width?: number;
  height?: number;
  color: string;
  style?: React.CSSProperties;
}

const CoinIcon: React.FC<CoinIconProps> = ({ value, width = 28, height = 28, style, color }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
    role="img"
  >
    <circle cx="14" cy="14" r="13" fill={color} stroke="#3F3D56" strokeWidth="0.5" />
    <text
      x="14"
      y="18"
      textAnchor="middle"
      fontSize="10"
      fontWeight="bold"
      fill="#fff"
      style={{
        fontFamily: 'inherit',
        textShadow: '0 1px 2px #3F3D56',
        letterSpacing: 0.5,
      }}
      aria-hidden="true"
    >
      {value}
    </text>
  </svg>
);

export default CoinIcon;