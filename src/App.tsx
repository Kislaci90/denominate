import React, {useEffect, useRef, useState} from 'react';
import {Box, Typography, useMediaQuery} from '@mui/material';
import EuroIcon from '@mui/icons-material/Euro';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Cookies from 'js-cookie';
import './App.css';
import TopBar from './components/TopBar';
import AmountInput from "./components/AmountInput";
import DenominateButton from "./components/DenominateButton";
import ResultArea from "./components/Result";
import {translate} from './i18n';
import HistoryList from "./components/HistoryList";
import {initGA, trackPageview} from "./utils/analytics"; // Import your translation function

const currencies = [
    {code: 'HUF', label: 'Forint', symbol: 'Ft', icon: <AccountBalanceWalletIcon/>, flag: '🇭🇺'},
    {code: 'EUR', label: 'Euro', symbol: '€', icon: <EuroIcon/>, flag: '🇪🇺'},
    {code: 'USD', label: 'Dollar', symbol: '$', icon: <AttachMoneyIcon/>, flag: '🇺🇸'},
    // Future: add more currencies with icons
];

const languages = [
    {code: 'hu', label: 'Magyar'},
    {code: 'en', label: 'English'},
    {code: 'de', label: 'Deutsch'},
];

type Denomination = {
    value: number;
    color: string;
}

// Denominations for each currency
const HUF_DENOMINATIONS: Denomination[] = [{value: 20000, color: '#9EC2B1'}, {
    value: 10000,
    color: '#B4C69A'
}, {value: 5000, color: '#D1A69A'}, {value: 2000, color: '#C9B6D6'}, {value: 1000, color: '#A6D3E9'}, {
    value: 500,
    color: '#F5D0A9'
}, {value: 200, color: '#D5B87A'}, {value: 100, color: '#D5B87A'}, {value: 50, color: '#C9B037'}, {
    value: 20,
    color: '#CCCCCC'
}, {value: 10, color: '#999999'}, {value: 5, color: '#A97142'}];
const EUR_DENOMINATIONS: Denomination[] = [{value: 500, color: '#B4C69A'}, {value: 200, color: '#B4C69A'}, {
    value: 100,
    color: '#B4C69A'
}, {value: 50, color: '#B4C69A'}, {value: 20, color: '#B4C69A'}, {value: 10, color: '#B4C69A'}, {
    value: 5,
    color: '#B4C69A'
}, {value: 2, color: '#B4C69A'}, {value: 1, color: '#B4C69A'}, {value: 0.5, color: '#B4C69A'}, {
    value: 0.2,
    color: '#B4C69A'
}, {value: 0.1, color: '#B4C69A'}, {value: 0.05, color: '#B4C69A'}, {value: 0.02, color: '#B4C69A'}, {
    value: 0.01,
    color: '#B4C69A'
}];
//const USD_DENOMINATIONS : Denomination[] = [{value:100, color: '#B4C69A'}, {value:50, color: '#B4C69A'}, {value:20, color: '#B4C69A'}, {value:10, color: '#B4C69A'}, {value:5, color: '#B4C69A'}, {value:10000, color: '#B4C69A'}, 1, 0.5, 0.25, 0.1, 0.05, 0.01];
const theme = createTheme({
    palette: {
        primary: {
            main: '#2E7D32',
        },
        secondary: {
            main: '#E57373',
        },
        background: {
            default: '#F5F5F5',
            paper: '#FFFFFF',
        },
        info: {
            main: '#6C63FF',
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: '#2E7D32',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    background: '#fff',
                    border: '1.5px solid #ecebfa',
                    boxShadow: '0 8px 32px 0 rgba(108, 99, 255, 0.10)',
                },
            },
        },
    },
});


const getDenominationsForCurrency = (cur: string) => {
    switch (cur) {
        case 'HUF':
            return HUF_DENOMINATIONS;
        case 'EUR':
            return EUR_DENOMINATIONS;
        // case 'USD':
        //     return USD_DENOMINATIONS;
        default:
            return [];
    }
};

function denominateFiltered(amount: number, currency: string, enabled: Denomination[]): {
    value: number;
    count: number;
    isCoin: boolean;
    color: string;
}[] {
    let denominations: Denomination[] = getDenominationsForCurrency(currency).filter((d: Denomination) => enabled.includes(d));
    let coinStartIdx = 0;
    switch (currency) {
        case 'EUR':
            coinStartIdx = denominations.findIndex(d => d.value < 5);
            break;
        case 'USD':
            coinStartIdx = denominations.findIndex(d => d.value < 1);
            break;
        case 'HUF':
            coinStartIdx = denominations.findIndex(d => d.value <= 200);
            break;
        default:
            return [];
    }
    let remaining = currency === 'EUR' || currency === 'USD' ? Math.round(amount * 100) : amount;
    const result: { value: number; count: number; isCoin: boolean, color: string }[] = [];
    for (let i = 0; i < denominations.length; i++) {
        const denomination = denominations[i];
        const denominationValue = (currency === 'EUR' || currency === 'USD') ? Math.round(denomination.value * 100) : denomination.value;
        const count = Math.floor(remaining / denominationValue);
        if (count > 0) {
            result.push({value: denominationValue, count, isCoin: i >= coinStartIdx, color: denomination.color});
            remaining -= count * denominationValue;
        }
    }
    return result;
}

function App() {
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('HUF');
    const [language, setLanguage] = useState('hu');
    const [history, setHistory] = useState<any[]>([]);
    const [enabledDenoms, setEnabledDenoms] = useState<Denomination[]>([]);
    const [pendingAmount, setPendingAmount] = useState('0');
    const [pendingCurrency, setPendingCurrency] = useState('HUF');
    const amountInputRef = useRef<HTMLInputElement>(null);

    // Helper to format with thousands separators
    function formatAmountInput(value: string, lang: string) {
        // Remove all non-digit characters
        const digits = value.replace(/\D/g, '');
        if (!digits) return '0';
        return new Intl.NumberFormat(lang === 'de' ? 'de-DE' : 'en-US').format(Number(digits));
    }

    // Handler for input change
    function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
        const raw = e.target.value.replace(/\D/g, '');
        setPendingAmount(formatAmountInput(raw, language));
    }

    function handleDenominate() {
        setAmount(pendingAmount);
        setCurrency(pendingCurrency);
        amountInputRef.current?.select();
    }

    function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            handleDenominate();
        }
    }

    const parsedAmount = parseInt(amount.replace(/\D/g, ''), 10);
    const isValid = !isNaN(parsedAmount) && parsedAmount > 0;
    let breakdown: { value: number; count: number; isCoin: boolean, color: string }[] = [];
    if (isValid) {
        breakdown = denominateFiltered(parsedAmount, currency, enabledDenoms);
    }
    const selectedCurrency = currencies.find(c => c.code === currency);

    // Format amount for visualization
    const formattedAmount = amount
        ? new Intl.NumberFormat('hu-HU').format(Number(amount.replace(/\D/g, '')))
        : '';

    // Load enabled denominations from cookies or default (all enabled)
    useEffect(() => {
        const cookieKey = `denoms_${currency}`;
        const cookie = Cookies.get(cookieKey);
        let denominations: Denomination[] = [];
        switch (currency) {
            case 'EUR':
                denominations = EUR_DENOMINATIONS;
                break;
            // case 'USD':
            //     denominations = USD_DENOMINATIONS;
            //     break;
            case 'HUF':
                denominations = HUF_DENOMINATIONS;
                break;
        }
        if (cookie) {
            try {
                const parsed = JSON.parse(cookie);
                if (Array.isArray(parsed) && parsed.every((v) => typeof v === 'number')) {
                    setEnabledDenoms(parsed);
                    return;
                }
            } catch {
            }
        }
        setEnabledDenoms(denominations);
    }, [currency]);

    // Load history from cookies on mount
    useEffect(() => {
        const cookie = Cookies.get('denom_history');
        if (cookie) {
            try {
                const parsed = JSON.parse(cookie);
                if (Array.isArray(parsed)) setHistory(parsed);
            } catch {
            }
        }
    }, []);

    // Add to history on valid calculation
    useEffect(() => {
        if (!isValid || !amount) return;
        const entry = {
            amount: parsedAmount,
            formatted: amount,
            currency,
            flag: selectedCurrency?.flag,
            symbol: selectedCurrency?.symbol,
            breakdown,
            time: new Date().toISOString(),
        };
        setHistory(prev => {
            const newHist = [entry, ...prev.filter(e => !(e.amount === entry.amount && e.currency === entry.currency)).slice(0, 9)];
            Cookies.set('denom_history', JSON.stringify(newHist), {expires: 365});
            return newHist;
        });
        // eslint-disable-next-line
    }, [parsedAmount, currency]);

    useEffect(() => {
        initGA();
        trackPageview(window.location.pathname);
    }, []);

    // For pending input
    const pendingParsedAmount = parseInt((pendingAmount || amount).replace(/\D/g, ''), 10);
    const pendingIsValid = !isNaN(pendingParsedAmount) && pendingParsedAmount > 0;

    return (
        <ThemeProvider theme={theme}>
            <TopBar
                language={language}
                setLanguage={setLanguage}
                languages={languages}
                t={translate}
            />

            <div className="landing-hero fade-in">

                <Typography color={"primary"} variant="h2" component="h1" align="center" sx={{mb: 2}}>
                    {translate.heroTitle[language]}
                </Typography>

                <Box className="landing-feature">
                    <Typography color="#666">
                        {translate.heroSubtitle[language]}
                    </Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    width: '100%',
                    maxWidth: {xs: 300, sm: 400, md: 600},
                    mx: 'auto',
                    px: 2
                }}>
                    <AmountInput
                        value={pendingAmount || amount}
                        translate={translate}
                        language={language}
                        onAmountChange={handleAmountChange}
                        onKeyDown={handleInputKeyDown}
                        onClear={() => {
                            setPendingAmount('0');
                        }}
                        inputRef={amountInputRef}
                        isValid={pendingIsValid}
                    />
                    <DenominateButton
                        pendingIsValid={pendingIsValid}
                        handleDenominate={handleDenominate}
                        translate={translate}
                        language={language}
                    />
                </Box>

            </div>

            <ResultArea
                isValid={isValid}
                breakdown={breakdown}
                selectedCurrency={selectedCurrency}
                formattedAmount={formattedAmount}
                translate={translate}
                language={language}
            />

            <HistoryList
                history={history}
                translate={translate}
                language={language}
                setHistory={setHistory}
                setPendingAmount={setPendingAmount}
                setPendingCurrency={setPendingCurrency}
                amountInputRef={amountInputRef}
                formatAmountInput={formatAmountInput}
            />

            <div className="footer">© {new Date().getFullYear()} Denomination Calculator &middot; Made with ❤️</div>
        </ThemeProvider>
    );
}

export default App;