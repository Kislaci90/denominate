import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Box, Typography} from '@mui/material';
import '../App.css';
import AmountInput from "../components/AmountInput";
import DenominateButton from "../components/DenominateButton";
import ResultArea from "../components/Result";
import HistoryList from "../components/HistoryList";
import CurrencySelector from "../components/CurrencySelector";
import {denominate, type DenominateResult, roundTo5or0} from "../logic/denomination";
import {currencies} from "../logic/currencies";
import type {HistoryEntry} from "../logic/history";
import {Route, Routes} from "react-router-dom";
import PrivacyPolicy from "./PrivacyPolicy";
import CookiePolicy from "./CookiePolicy";
import TermsOfUse from "./TermsOfUse";
import Impressum from "./Impressum";
import {theme} from "../utils/theme";
import {useTranslation} from "react-i18next";

function MainCalculator() {
    const [amount, setAmount] = useState(0);
    const [pendingAmount, setPendingAmount] = useState("0");
    const [isValidPendingAmount, setIsValidPendingAmount] = useState(true);
    const [currency, setCurrency] = useState('HUF');
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const {t, i18n} = useTranslation();
    const amountInputRef = useRef<HTMLInputElement>(null);
    const resultAreaRef = useRef<HTMLDivElement>(null);

    function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
        const regex = /^\d+(?:[.,]\d+)?$/;
        setIsValidPendingAmount(regex.test(e.target.value))
        setPendingAmount(e.target.value.replace(/[^0-9.,]/g, ''));
    }

    function handleDenominate() {
        setAmount(roundTo5or0(parseFloat(pendingAmount.replace(',', '.'))))
        amountInputRef.current?.select();
    }

    function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            handleDenominate();
        }
    }

    const isValid = pendingAmount !== '' && !isNaN(Number(pendingAmount.replace(',', '.'))) && Number(pendingAmount.replace(',', '.')) > 0;

    const denominateResults: DenominateResult[] = useMemo(() => {
        if (isValid) {
            return denominate(amount, currency);
        }
        return [];
    }, [isValid, amount, currency]);

    useEffect(() => {
        i18n.changeLanguage('hu');

        const stored = localStorage.getItem('denomination_history');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) setHistory(parsed);
            } catch { /* empty */
            }
        }
    }, [i18n]);

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

                <Box display="flex" alignItems="center" justifyContent="space-between" sx={{mb: 4}}>
                    {/*<Logo width={60} height={60}/>*/}

                    <Typography color={theme.palette.primary.main} variant="h2" component="h1" align="center">
                        {t('heroTitle')}
                    </Typography>
                </Box>

                <Box className="landing-feature" sx={{display: {xs: 'none', sm: 'block'}}}>
                    <Typography color="#666">
                        {t('heroSubtitle')}
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
                    <CurrencySelector currency={currency} onChange={setCurrency}/>

                    <AmountInput
                        value={pendingAmount}
                        isValid={isValidPendingAmount}
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
                    />
                </Box>

            </div>

            <ResultArea
                isValid={isValid}
                denominationResult={denominateResults}
                selectedCurrency={selectedCurrency}
                amount={amount}
                ref={resultAreaRef}
            />

            <HistoryList
                history={history}
                setHistory={setHistory}
                setPendingAmount={setPendingAmount}
                setAmount={setAmount}
                setCurrency={setCurrency}
                resultAreaRef={resultAreaRef}
            />
        </>
    );
}

function Home() {
    return (
        <Routes>
            <Route path="/" element={<MainCalculator/>}/>
            <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
            <Route path="/cookie-policy" element={<CookiePolicy/>}/>
            <Route path="/terms-of-use" element={<TermsOfUse/>}/>
            <Route path="/impressum" element={<Impressum/>}/>
        </Routes>
    );
}

export default Home;