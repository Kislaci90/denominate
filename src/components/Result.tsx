import React from 'react';
import {Box, Card, Container, Typography} from '@mui/material';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import ResultTableView from './ResultTableView';
import {DenominateResult} from "../logic/denomination";
import {Currency} from "../logic/currencies";
import {translate} from "../i18n";


type Props = {
    isValid: boolean,
    denominationResult: DenominateResult[],
    selectedCurrency: Currency,
    amount: number,
    language: string,
    ref?: React.RefObject<HTMLDivElement | null>
};

const renderContent = (isValid: boolean, denominationResult: DenominateResult[], amount: number, language: string, selectedCurrency: Currency) => {
    if (!isValid) {
        return (
            <Box sx={{textAlign: 'center', py: 4, color: 'text.secondary'}}>
                <EmojiObjectsIcon color="disabled" sx={{fontSize: 48, mb: 1}}/>
                <Typography variant="subtitle1">
                    {translate.enterToSee[language]}
                </Typography>
            </Box>
        );
    }

    return (
        <ResultTableView
            denominationResult={denominationResult}
            selectedCurrency={selectedCurrency}
            amount={amount}
            language={language}
        />
    );
};

const ResultArea: React.FC<Props> = ({
                                         isValid,
                                         denominationResult,
                                         selectedCurrency,
                                         amount,
                                         language,
                                         ref
                                     }) => (
    <Container maxWidth="md" sx={{mt: 2}} ref={ref}>
        <Card elevation={8} className="result-area-card">
            <Box sx={{display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between'}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <EmojiObjectsIcon color="primary" sx={{fontSize: 28, mr: 1}}/>
                    <Typography variant="h5" fontWeight={700} sx={{letterSpacing: 0.5}}>
                        {translate.result[language]}
                    </Typography>
                </Box>
            </Box>
            {
                renderContent(isValid, denominationResult, amount, language, selectedCurrency)
            }
        </Card>
    </Container>
);

export default ResultArea;