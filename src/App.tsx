import React, {useEffect, useRef, useState} from 'react';
import {Box, useMediaQuery} from '@mui/material';
import EuroIcon from '@mui/icons-material/Euro';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Cookies from 'js-cookie';
import './App.css';
import TopBar from './components/TopBar';
import HistoryList from "./components/HistoryList";
import Customize from "./components/Customize";
import Hero from "./components/Hero";
import AmountInput from "./components/AmountInput";
import DenominateButton from "./components/DenominateButton";
import ResultArea from "./components/Result";
import {translate} from './i18n'; // Import your translation function

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

// Denominations for each currency
const HUF_DENOMINATIONS = [20000, 10000, 5000, 2000, 1000, 500, 200, 100, 50, 20, 10, 5];
const EUR_DENOMINATIONS = [500, 200, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01];
const USD_DENOMINATIONS = [100, 50, 20, 10, 5, 2, 1, 0.5, 0.25, 0.1, 0.05, 0.01];
const theme = createTheme({
    palette: {
        primary: {
            main: '#6C63FF', // Blue-violet
            contrastText: '#fff',
        },
        secondary: {
            main: '#FF6F91', // Soft pink
        },
        background: {
            default: '#F8F9FB', // Off-white
            paper: '#fff',
        },
        info: {
            main: '#6C63FF',
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: '#6C63FF',
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
        case 'USD':
            return USD_DENOMINATIONS;
        default:
            return [];
    }
};

function denominateFiltered(amount: number, currency: string, enabled: number[]): {
    value: number;
    count: number;
    isCoin: boolean
}[] {
    let denominations: number[] = getDenominationsForCurrency(currency).filter((d: number) => enabled.includes(d));
    let coinStartIdx = 0;
    switch (currency) {
        case 'EUR':
            coinStartIdx = denominations.findIndex(d => d < 5);
            break;
        case 'USD':
            coinStartIdx = denominations.findIndex(d => d < 1);
            break;
        case 'HUF':
            coinStartIdx = denominations.findIndex(d => d <= 200);
            break;
        default:
            return [];
    }
    let remaining = currency === 'EUR' || currency === 'USD' ? Math.round(amount * 100) : amount;
    const result: { value: number; count: number; isCoin: boolean }[] = [];
    for (let i = 0; i < denominations.length; i++) {
        const denom = denominations[i];
        const denomValue = (currency === 'EUR' || currency === 'USD') ? Math.round(denom * 100) : denom;
        const count = Math.floor(remaining / denomValue);
        if (count > 0) {
            result.push({value: denom, count, isCoin: i >= coinStartIdx});
            remaining -= count * denomValue;
        }
    }
    return result;
}

function App() {
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('EUR');
    const [language, setLanguage] = useState('en');
    const [customizeOpen, setCustomizeOpen] = useState(false);
    const [enabledDenoms, setEnabledDenoms] = useState<number[]>([]);
    const [history, setHistory] = useState<any[]>([]);
    const [pendingAmount, setPendingAmount] = useState('');
    const [pendingCurrency, setPendingCurrency] = useState('EUR');
    const amountInputRef = useRef<HTMLInputElement>(null);
    const [resultView, setResultView] = useState<'grid' | 'table'>('grid');

    const isMobile = useMediaQuery('(max-width:600px)');

    // Helper to format with thousands separators
    function formatAmountInput(value: string, lang: string) {
        // Remove all non-digit characters
        const digits = value.replace(/\D/g, '');
        if (!digits) return '';
        return new Intl.NumberFormat(lang === 'de' ? 'de-DE' : 'en-US').format(Number(digits));
    }

    // Handler for input change
    function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
        const raw = e.target.value.replace(/\D/g, '');
        setPendingAmount(formatAmountInput(raw, language));
    }

    function handleCurrencyChange(e: any) {
        setPendingCurrency(e.target.value as string);
    }

    function handleDenominate() {
        setAmount(pendingAmount);
        setCurrency(pendingCurrency);
    }

    function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            handleDenominate();
        }
    }

    // Parse and denominate
    const parsedAmount = parseInt(amount.replace(/\D/g, ''), 10);
    const isValid = !isNaN(parsedAmount) && parsedAmount > 0;
    let breakdown: { value: number; count: number; isCoin: boolean }[] = [];
    if (isValid) {
        breakdown = denominateFiltered(parsedAmount, currency, enabledDenoms);
    }
    const selectedCurrency = currencies.find(c => c.code === currency);

    // Format amount for visualization
    const formattedAmount = amount
        ? new Intl.NumberFormat(language === 'de' ? 'de-DE' : 'en-US').format(Number(amount.replace(/\D/g, '')))
        : '';

    // Open/close dialog
    const handleOpenCustomize = () => setCustomizeOpen(true);
    const handleCloseCustomize = () => setCustomizeOpen(false);

    // Load enabled denominations from cookies or default (all enabled)
    useEffect(() => {
        const cookieKey = `denoms_${currency}`;
        const cookie = Cookies.get(cookieKey);
        let denoms: number[] = [];
        switch (currency) {
            case 'EUR':
                denoms = EUR_DENOMINATIONS;
                break;
            case 'USD':
                denoms = USD_DENOMINATIONS;
                break;
            case 'HUF':
                denoms = HUF_DENOMINATIONS;
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
        setEnabledDenoms(denoms);
    }, [currency]);

    // Save enabled denominations to cookies
    const saveEnabledDenoms = (newDenoms: number[]) => {
        setEnabledDenoms(newDenoms);
        Cookies.set(`denoms_${currency}`, JSON.stringify(newDenoms), {expires: 365});
    };

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

    // For pending input
    const pendingParsedAmount = parseInt((pendingAmount || amount).replace(/\D/g, ''), 10);
    const pendingIsValid = !isNaN(pendingParsedAmount) && pendingParsedAmount > 0;

    const filteredDenominations = getDenominationsForCurrency(currency).filter((d: number) => enabledDenoms.includes(d));

    // Determine if any bill or coin is disabled for the current currency
    const chipCurrency = pendingCurrency || currency;
    const denoms = getDenominationsForCurrency(chipCurrency);
    const anyDisabled = denoms.some(d => !enabledDenoms.includes(d));

    return (
        <ThemeProvider theme={theme}>
            <TopBar
                language={language}
                setLanguage={setLanguage}
                languages={languages}
                t={translate}
            />

            <div className="landing-hero fade-in">

                <div className="landing-title">
                    {translate.heroTitle[language]}
                </div>

                {!isMobile && <Hero translate={translate} language={language}/>}

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
                        currency={currency}
                        pendingCurrency={pendingCurrency}
                        currencies={currencies}
                        t={translate}
                        language={language}
                        onAmountChange={handleAmountChange}
                        onCurrencyChange={handleCurrencyChange}
                        onKeyDown={handleInputKeyDown}
                        onClear={() => {
                            setPendingAmount('');
                            setAmount('');
                        }}
                        inputRef={amountInputRef}
                        isValid={pendingIsValid}
                    />
                    <DenominateButton
                        pendingIsValid={pendingIsValid}
                        handleDenominate={handleDenominate}
                        t={translate}
                        language={language}
                    />
                </Box>

                <Customize
                    t={translate}
                    language={language}
                    anyDisabled={anyDisabled}
                    pendingCurrency={pendingCurrency}
                    currency={currency}
                    enabledDenoms={enabledDenoms}
                    saveEnabledDenoms={saveEnabledDenoms}
                    getDenominationsForCurrency={getDenominationsForCurrency}
                    currencies={currencies}
                />

            </div>

            <ResultArea
                isValid={isValid}
                resultView={resultView}
                setResultView={val => setResultView(val)}
                breakdown={breakdown}
                currency={currency}
                selectedCurrency={selectedCurrency}
                formattedAmount={formattedAmount}
                t={translate}
                language={language}
            />

            {history.length > 0 && (
                <HistoryList
                    history={history}
                    t={translate}
                    language={language}
                    setHistory={setHistory}
                    setPendingAmount={setPendingAmount}
                    setPendingCurrency={setPendingCurrency}
                    amountInputRef={amountInputRef}
                    formatAmountInput={formatAmountInput}
                />
            )}
            <div className="footer">© {new Date().getFullYear()} Denomination Calculator &middot; Made with ❤️</div>
        </ThemeProvider>
    );
}

export default App;