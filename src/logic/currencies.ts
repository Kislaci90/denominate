export type Currency = {
    code: string;
    label: string;
    symbol: string;
    flagUrl: string;
};

export const currencies : Currency[] = [
    {
        code: 'HUF',
        label: 'Forint',
        symbol: 'Ft',
        flagUrl: 'https://flagcdn.com/w40/hu.png',
    },
    {
        code: 'EUR',
        label: 'Euro',
        symbol: '€',
        flagUrl: 'https://flagcdn.com/w40/eu.png',
    },
    {
        code: 'USD',
        label: 'Dollár',
        symbol: '$',
        flagUrl: 'https://flagcdn.com/w40/us.png',
    },
];
