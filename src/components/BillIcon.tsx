import React, {useId} from 'react';

interface BillIconProps {
    value: string | number;
    color: string;
    width?: number;
    height?: number;
    style?: React.CSSProperties;
}

const BillIcon: React.FC<BillIconProps> = ({value, width = 52, height = 32, style, color}) => {
    const gradId = `bill-sheen-${useId()}`;

    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 52 32"
            fill="none"
            xmlns="https://www.w3.org/2000/svg"
            style={style}
            role="img"
            aria-label={String(value)}
        >
            <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#fff" stopOpacity="0.35"/>
                    <stop offset="0.55" stopColor="#fff" stopOpacity="0"/>
                    <stop offset="1" stopColor="#000" stopOpacity="0.16"/>
                </linearGradient>
            </defs>
            <rect x="1" y="1" width="50" height="30" rx="5" fill={color} stroke="#20261F" strokeOpacity="0.35"
                  strokeWidth="1"/>
            <rect x="4" y="4" width="44" height="24" rx="3" fill="none" stroke="#fff" strokeOpacity="0.55"
                  strokeWidth="1"/>
            <rect x="1" y="1" width="50" height="30" rx="5" fill={`url(#${gradId})`}/>
            <text
                x="26"
                y="20"
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill="#fff"
                style={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    textShadow: '0 1px 2px rgba(0,0,0,0.45)',
                    letterSpacing: 0.3,
                }}
                aria-hidden="true"
            >
                {value}
            </text>
        </svg>
    );
};

export default BillIcon;
