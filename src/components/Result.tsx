// denominate/src/components/ResultArea.tsx
import React from 'react';
import {Box, Card, Container, Typography} from '@mui/material';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import ResultTableView from './ResultTableView';

type BreakdownItem = {
    value: number;
    color: string;
    count: number;
    isCoin: boolean;
};

type Currency = {
    symbol: string;
    flag?: string;
};

type Props = {
    isValid: boolean;
    breakdown: BreakdownItem[];
    selectedCurrency?: Currency;
    formattedAmount: string;
    translate: any;
    language: string;
};

const renderContent = (isValid: boolean, breakdown: BreakdownItem[], formattedAmount: string, translate: any, language: string, selectedCurrency?: Currency) => {
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
            breakdown={breakdown}
            selectedCurrency={selectedCurrency}
            formattedAmount={formattedAmount}
            translate={translate}
            language={language}
        />
    );
};

const ResultArea: React.FC<Props> = ({
                                         isValid,
                                         breakdown,
                                         selectedCurrency,
                                         formattedAmount,
                                         translate,
                                         language
                                     }) => (
    <Container maxWidth="md" sx={{mt: 2}}>
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
                renderContent(isValid, breakdown, formattedAmount, translate, language, selectedCurrency)
            }
        </Card>
    </Container>
);

export default ResultArea;