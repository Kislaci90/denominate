import React from 'react';

interface BillIconProps {
    value: string | number;
    color: string;
    width?: number;
    height?: number;
    style?: React.CSSProperties;
}

const BillIcon: React.FC<BillIconProps> = ({value, width = 40, height = 24, style, color}) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 40 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={style}
        role="img"
    >
        <rect x="1" y="1" width="38" height="22" rx="4" fill={color} stroke="#3F3D56" strokeWidth="0.5"/>
        <text
            x="20"
            y="16"
            textAnchor="middle"
            fontSize="9"
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

export default BillIcon; 