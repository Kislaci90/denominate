import React from 'react';
import {Box, Card, Container, Typography} from '@mui/material';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import ResultTableView from './ResultTableView';
import type {DenominateResult} from "../logic/denomination";
import type {Currency} from "../logic/currencies";
import {useTranslation} from "react-i18next";


type Props = {
    isValid: boolean,
    denominationResult: DenominateResult[],
    amount: number,
    selectedCurrency: Currency,
    ref?: React.RefObject<HTMLDivElement | null>
};

const renderContent = (isValid: boolean, denominationResult: DenominateResult[], amount: number, selectedCurrency: Currency, enterToSee: string) => {

    if (!isValid) {
        return (
            <Box sx={{textAlign: 'center', py: 4, color: 'text.secondary'}}>
                <EmojiObjectsIcon color="disabled" sx={{fontSize: 48, mb: 1}}/>
                <Typography variant="subtitle1">
                    {enterToSee}
                </Typography>
            </Box>
        );
    }

    return (
        <ResultTableView
            denominationResult={denominationResult}
            selectedCurrency={selectedCurrency}
            amount={amount}
        />
    );
};

const ResultArea: React.FC<Props> = ({
                                         isValid,
                                         denominationResult,
                                         selectedCurrency,
                                         amount,
                                         ref
                                     }) => {
    const {t} = useTranslation();

    return (
        <Container maxWidth="md" sx={{mt: 2}} ref={ref}>
            <Card elevation={8} className="result-area-card">
                <Box sx={{display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between'}}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <EmojiObjectsIcon color="primary" sx={{fontSize: 28, mr: 1}}/>
                        <Typography variant="h5" fontWeight={700} sx={{letterSpacing: 0.5}}>
                            {t('result')}
                        </Typography>
                    </Box>
                </Box>
                {
                    renderContent(isValid, denominationResult, amount, selectedCurrency, t('enterToSee'))
                }
            </Card>
        </Container>
    );
};

export default ResultArea;