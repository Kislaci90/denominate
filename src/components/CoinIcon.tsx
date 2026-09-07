import React, {useId} from 'react';

interface CoinIconProps {
    value: string | number;
    width?: number;
    height?: number;
    color: string;
    style?: React.CSSProperties;
}

const CoinIcon: React.FC<CoinIconProps> = ({value, width = 34, height = 34, style, color}) => {
    const gradId = `coin-sheen-${useId()}`;

    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 34 34"
            fill="none"
            xmlns="https://www.w3.org/2000/svg"
            style={style}
            role="img"
            aria-label={String(value)}
        >
            <defs>
                <radialGradient id={gradId} cx="35%" cy="30%" r="75%">
                    <stop offset="0" stopColor="#fff" stopOpacity="0.55"/>
                    <stop offset="0.55" stopColor="#fff" stopOpacity="0.05"/>
                    <stop offset="1" stopColor="#000" stopOpacity="0.2"/>
                </radialGradient>
            </defs>
            <circle cx="17" cy="17" r="15.5" fill={color} stroke="#20261F" strokeOpacity="0.35" strokeWidth="1"/>
            <circle cx="17" cy="17" r="12.5" fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="1"/>
            <circle cx="17" cy="17" r="15.5" fill={`url(#${gradId})`}/>
            <text
                x="17"
                y="21.5"
                textAnchor="middle"
                fontSize="9.5"
                fontWeight="700"
                fill="#fff"
                style={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    textShadow: '0 1px 2px rgba(0,0,0,0.45)',
                    letterSpacing: 0.2,
                }}
                aria-hidden="true"
            >
                {value}
            </text>
        </svg>
    );
};

export default CoinIcon;
