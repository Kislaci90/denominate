import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Box, Typography} from '@mui/material';
import '../App.css';
import AmountInput from "../components/AmountInput";
import DenominateButton from "../components/DenominateButton";
import ResultArea from "../components/Result";
import {translate} from '../i18n';
import HistoryList from "../components/HistoryList";
import CurrencySelector from "../components/CurrencySelector";
import {denominate, DenominateResult} from "../logic/denomination";
import {currencies} from "../logic/currencies";
import {getLanguageByCode} from "../logic/language";
import {HistoryEntry} from "../logic/history";
import {ReactComponent as LogoSvg} from '../assets/logo.svg';
import {Route, Routes} from "react-router-dom";
import PrivacyPolicy from "./PrivacyPolicy";
import CookiePolicy from "./CookiePolicy";
import TermsOfUse from "./TermsOfUse";
import Impressum from "./Impressum";
import {theme} from "../utils/theme";


interface MainCalculatorProps {
    language: string
}

function MainCalculator({language}: Readonly<MainCalculatorProps>) {
    const [amount, setAmount] = useState(0);
    const [pendingAmount, setPendingAmount] = useState("0");
    const [currency, setCurrency] = useState('HUF');
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
    let denominateResults: DenominateResult[] = useMemo(() => {
        if (isValid) {
            return denominate(amount, currency);
        }
        return [];
    }, [amount, currency]);

    useEffect(() => {
        const stored = localStorage.getItem('denomination_history');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) setHistory(parsed);
            } catch {
            }
        }
    }, []);

    const selectedCurrency = currencies.find(c => c.code === currency) ?? currencies[0];

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
            localStorage.setItem('denomination_history', JSON.stringify(newHist));
            return newHist;
        });
    }, [amount, selectedCurrency, isValid, denominateResults]);

    return (
        <>
            <div className="landing-hero fade-in">

                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <LogoSvg width={80} height={80}/>

                    <Typography color={theme.palette.primary.main} variant="h1" component="h1" align="center">
                        {translate.heroTitle[language]}
                    </Typography>
                </Box>

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
        </>
    );
}

interface HomeProps {
    language: string
}

function Home({language}: Readonly<HomeProps>) {
    return (
        <Routes>
            <Route path="/" element={<MainCalculator language={language}/>}/>
            <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
            <Route path="/cookie-policy" element={<CookiePolicy/>}/>
            <Route path="/terms-of-use" element={<TermsOfUse/>}/>
            <Route path="/impressum" element={<Impressum/>}/>
        </Routes>
    );
}

export default Home;