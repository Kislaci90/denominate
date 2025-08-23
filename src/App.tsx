import React, {useEffect, useRef, useState} from 'react';
import {Box, Typography} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Cookies from 'js-cookie';
import './App.css';
import TopBar from './components/TopBar';
import AmountInput from "./components/AmountInput";
import DenominateButton from "./components/DenominateButton";
import ResultArea from "./components/Result";
import {translate} from './i18n';
import HistoryList from "./components/HistoryList";
import {initGA, trackPageview} from "./utils/analytics";
import CurrencySelector from "./components/CurrencySelector";
import {denominate, DenominateResult} from "./logic/denomination";
import {currencies} from "./logic/currencies";
import {getLanguageByCode} from "./logic/language";
import {HistoryEntry} from "./logic/history";

const languages = [
    {code: 'hu', label: 'Magyar'},
    {code: 'en', label: 'English'},
    {code: 'de', label: 'Deutsch'},
];

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

function App() {
    const [amount, setAmount] = useState(0);
    const [pendingAmount, setPendingAmount] = useState("0");
    const [currency, setCurrency] = useState('HUF');
    const [language, setLanguage] = useState('hu');
    const [history, setHistory] = useState<any[]>([]);
    const amountInputRef = useRef<HTMLInputElement>(null);
    const resultAreaRef = useRef<HTMLDivElement>(null);

    function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPendingAmount(e.target.value.replace(/[^0-9.,]/g, ''));
    }

    function handleDenominate() {
        setAmount(parseFloat(pendingAmount.replace(',', '.')))
        amountInputRef.current?.select();
    }

    function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            handleDenominate();
        }
    }

    const isValid = pendingAmount !== '' && !isNaN(Number(pendingAmount.replace(',', '.'))) && Number(pendingAmount.replace(',', '.')) > 0;
    let denominateResults: DenominateResult[] = [];
    if (isValid) {
        denominateResults = denominate(amount, currency);
    }
    const selectedCurrency = currencies.find(c => c.code === currency) ?? currencies[0];

    useEffect(() => {
        const cookie = Cookies.get('denomination_history');
        if (cookie) {
            try {
                const parsed = JSON.parse(cookie);
                if (Array.isArray(parsed)) setHistory(parsed);
            } catch {
            }
        }
    }, []);

    useEffect(() => {
        if (!isValid || !amount) return;
        const entry: HistoryEntry = {
            amount: amount,
            time: new Date().toISOString(),
            currency: selectedCurrency,
            denominationResult: denominateResults,

        };
        setHistory(prev => {
            const newHist = [entry, ...prev.filter(e => !(e.amount === entry.amount && e.currency.code === entry.currency.code)).slice(0, 9)];
            Cookies.set('denomination_history', JSON.stringify(newHist), {expires: 365});
            return newHist;
        });
    }, [amount, selectedCurrency]);

    useEffect(() => {
        initGA();
        trackPageview(window.location.pathname);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <TopBar
                language={language}
                setLanguage={setLanguage}
                languages={languages}
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
                    <CurrencySelector currency={currency} onChange={setCurrency} language={language}/>

                    <AmountInput
                        value={pendingAmount}
                        language={language}
                        onAmountChange={handleAmountChange}
                        onKeyDown={handleInputKeyDown}
                        onClear={() => {
                            setAmount(0)
                            setPendingAmount("0");
                        }}
                        inputRef={amountInputRef}
                    />
                    <DenominateButton
                        pendingAmountIsValid={isValid}
                        handleDenominate={handleDenominate}
                        language={language}
                    />
                </Box>

            </div>

            <ResultArea
                isValid={isValid}
                denominationResult={denominateResults}
                selectedCurrency={selectedCurrency}
                amount={amount}
                language={language}
                ref={resultAreaRef}
            />

            <HistoryList
                history={history}
                language={getLanguageByCode(language)}
                setHistory={setHistory}
                setPendingAmount={setPendingAmount}
                setAmount={setAmount}
                setCurrency={setCurrency}
                resultAreaRef={resultAreaRef}
            />

            <div className="footer">© {new Date().getFullYear()} Denomination Calculator &middot; Made with ❤️</div>
        </ThemeProvider>
    );
}

export default App;