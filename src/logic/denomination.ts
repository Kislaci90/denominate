export type Denomination = {
    value: number;
    color: string;
    isCoin: boolean;
}

export type DenominateResult = {
    denomination: Denomination;
    count: number;
}

export const HUF_DENOMINATIONS: Denomination[] = [
    {value: 20000, color: '#9EC2B1', isCoin: false},
    {value: 10000, color: '#B4C69A', isCoin: false},
    {value: 5000, color: '#D1A69A', isCoin: false},
    {value: 2000, color: '#C9B6D6', isCoin: false},
    {value: 1000, color: '#A6D3E9', isCoin: false},
    {value: 500, color: '#F5D0A9', isCoin: false},
    {value: 200, color: '#D5B87A', isCoin: true},
    {value: 100, color: '#D5B87A', isCoin: true},
    {value: 50, color: '#C9B037', isCoin: true},
    {value: 20, color: '#CCCCCC', isCoin: true},
    {value: 10, color: '#999999', isCoin: true},
    {value: 5, color: '#A97142', isCoin: true}
];


export const EUR_DENOMINATIONS: Denomination[] = [
    {value: 500, color: '#C4A3BF', isCoin: false},
    {value: 200, color: '#D6C799', isCoin: false},
    {value: 50, color: '#F5D0A9', isCoin: false},
    {value: 100, color: '#A6C9A0', isCoin: false},
    {value: 20, color: '#A6B9E4', isCoin: false},
    {value: 10, color: '#D1A69A', isCoin: false},
    {value: 5, color: '#CCCCCC', isCoin: false},
    {value: 2, color: '#FFD700', isCoin: true},
    {value: 1, color: '#C0C0C0', isCoin: true},

    {value: 0.5, color: '#B8860B', isCoin: true},
    {value: 0.2, color: '#DAA520', isCoin: true},
    {value: 0.1, color: '#FFD700', isCoin: true},
    {value: 0.05, color: '#8B4513', isCoin: true},
    {value: 0.02, color: '#A0522D', isCoin: true},
    {value: 0.01, color: '#B87333', isCoin: true}
];


export const USD_DENOMINATIONS: Denomination[] = [
    { value: 100,  color: '#6A937A', isCoin: false },
    { value: 50,   color: '#7FAF96', isCoin: false },
    { value: 20,   color: '#8FC1A9', isCoin: false },
    { value: 10,   color: '#A7CBB5', isCoin: false },
    { value: 5,    color: '#BFD8C8', isCoin: false },
    { value: 2,    color: '#D2E4D8', isCoin: false },
    { value: 1,    color: '#E6F0EA', isCoin: false },

    { value: 1,    color: '#C0C0C0', isCoin: true },
    { value: 0.5,  color: '#FFD700', isCoin: true },
    { value: 0.25, color: '#DAA520', isCoin: true },
    { value: 0.1,  color: '#B8860B', isCoin: true },
    { value: 0.05, color: '#A0522D', isCoin: true },
    { value: 0.01, color: '#B87333', isCoin: true }
];

export function roundTo5or0(amount: number) {
    if (!Number.isInteger(amount)) {
        return amount;
    }

    let remainder = amount % 10;

    if (remainder <= 2 || remainder >=5 && remainder <= 7) return amount - (remainder % 5);

    return amount + (5 - (remainder % 5));
}

export function denominate(amount: number, currency: string): DenominateResult[] {
    let denominations = getDenominationsForCurrency(currency);

    let remaining = currency === 'EUR' || currency === 'USD' ? Math.round(amount * 100) : amount;

    const result: DenominateResult[] = [];

    for (const element of denominations) {
        const denomination = element;
        const denominationValue = (currency === 'EUR' || currency === 'USD') ? Math.round(denomination.value * 100) : denomination.value;
        const count = Math.floor(remaining / denominationValue);
        if (count > 0) {
            result.push({denomination, count});
            remaining -= count * denominationValue;
        }
    }
    return result;
}

function getDenominationsForCurrency(currency: string) {
    switch (currency) {
        case 'HUF':
            return HUF_DENOMINATIONS;
        case 'EUR':
            return EUR_DENOMINATIONS;
        case 'USD':
            return USD_DENOMINATIONS;
        default:
            console.error("There is no such currency:", currency);
            return [];
    }
}
