// denominate/src/components/ResultArea.tsx
import React from 'react';
import { Box, Card, Container, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import TableRowsIcon from '@mui/icons-material/TableRows';
import ResultGridView from './ResultGridView';
import ResultTableView from './ResultTableView';

type BreakdownItem = {
    value: number;
    count: number;
    isCoin: boolean;
};

type Currency = {
    symbol: string;
    flag?: string;
};

type Props = {
    isValid: boolean;
    resultView: 'grid' | 'table';
    setResultView: (view: 'grid' | 'table') => void;
    breakdown: BreakdownItem[];
    currency: string;
    selectedCurrency?: Currency;
    formattedAmount: string;
    t: any;
    language: string;
};

const ResultArea: React.FC<Props> = ({
                                         isValid,
                                         resultView,
                                         setResultView,
                                         breakdown,
                                         currency,
                                         selectedCurrency,
                                         formattedAmount,
                                         t,
                                         language
                                     }) => (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
        <Card elevation={8} className="result-area-card">
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <EmojiObjectsIcon color="primary" sx={{ fontSize: 28, mr: 1 }} />
                    <Typography variant="h5" fontWeight={700} sx={{ letterSpacing: 0.5 }}>
                        {t.result[language]}
                    </Typography>
                </Box>
                <ToggleButtonGroup
                    value={resultView}
                    exclusive
                    onChange={(_, val) => val && setResultView(val)}
                    size="small"
                    sx={{ ml: 2, background: '#f8f9fb', borderRadius: 2 }}
                    aria-label="Result view switch"
                >
                    <ToggleButton value="table" aria-label="Table view" sx={{ px: 1.5 }}>
                        <TableRowsIcon fontSize="small" />
                    </ToggleButton>
                    <ToggleButton value="grid" aria-label="Grid view" sx={{ px: 1.5 }}>
                        <ViewModuleIcon fontSize="small" />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
            {isValid ? (
                resultView === 'grid' ? (
                    <ResultGridView
                        breakdown={breakdown}
                        currency={currency}
                        selectedCurrency={selectedCurrency}
                        t={t}
                        language={language}
                    />
                ) : (
                    <ResultTableView
                        breakdown={breakdown}
                        currency={currency}
                        selectedCurrency={selectedCurrency}
                        formattedAmount={formattedAmount}
                        t={t}
                        language={language}
                    />
                )
            ) : (
                <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                    <EmojiObjectsIcon color="disabled" sx={{ fontSize: 48, mb: 1 }} />
                    <Typography variant="subtitle1">
                        {t.enterToSee[language]}
                    </Typography>
                </Box>
            )}
        </Card>
    </Container>
);

export default ResultArea;