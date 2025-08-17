import React from 'react';
import {
    Box,
    Button,
    Card,
    Container,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Tooltip
} from '@mui/material';
import Cookies from 'js-cookie';

type HistoryEntry = {
    formatted: string;
    symbol: string;
    flag: string;
    time: string;
    currency: string;
    breakdown: any[];
    raw?: string;
};

type Props = {
    history: HistoryEntry[];
    translate: any;
    language: string;
    setHistory: (h: HistoryEntry[]) => void;
    setPendingAmount: (amt: string) => void;
    setPendingCurrency: (cur: string) => void;
    amountInputRef: React.RefObject<HTMLInputElement | null>;
    formatAmountInput: (value: string, lang: string) => string;
};

function showHistoryEntriesAsList(historyEntry: HistoryEntry) {
    return historyEntry.breakdown.map((item: any, i: number) => `${item.count} × ${item.value} ${historyEntry.symbol}`).join(', ');
}

const HistoryList: React.FC<Props> = ({
                                          history,
                                          translate,
                                          language,
                                          setHistory,
                                          setPendingAmount,
                                          setPendingCurrency,
                                          amountInputRef,
                                          formatAmountInput,
                                      }) => (
    <Container maxWidth="md" sx={{mt: 2}}>
        <Card elevation={8} className="history-card">
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1}}>
                <ListSubheader component="div" >
                    {translate.history[language]}
                </ListSubheader>
                <Button size="small" color="secondary" variant="outlined" onClick={() => {
                    setHistory([]);
                    Cookies.remove('denom_history');
                }} className='delete-button'>
                    {translate.clearHistory[language]}
                </Button>
            </Box>

            <Divider className='devider'/>

            <List className="history-list">
                {history.map((historyEntry, index) => (
                    <Tooltip
                        title={translate.loadFromHistory[language](historyEntry.formatted, historyEntry.symbol || '')}
                        arrow key={index}>
                        <ListItem
                            alignItems="flex-start"
                            className="history-list-item"
                            onClick={() => {
                                const rawValue = historyEntry.raw ? historyEntry.raw : historyEntry.formatted.replace(/[^\d]/g, '');
                                setPendingAmount(formatAmountInput(rawValue, language));
                                setPendingCurrency(historyEntry.currency);
                                setTimeout(() => {
                                    amountInputRef?.current?.scrollIntoView({behavior: 'smooth', block: 'center'});
                                    amountInputRef?.current?.focus();
                                }, 100);
                            }}
                            tabIndex={0}
                            aria-label={translate.loadFromHistory[language](historyEntry.formatted, historyEntry.symbol || '')}
                        >
                            <ListItemIcon className="history-list-item-icon" sx={{minWidth: 36}}>
                                <span style={{fontSize: 22}}>{historyEntry.flag}</span>
                            </ListItemIcon>
                            <ListItemText
                                className="history-list-item-text"
                                primary={<>
                                    <b>{historyEntry.formatted} {historyEntry.symbol}</b>
                                    <span>({new Date(historyEntry.time).toLocaleString()})</span>
                                </>}

                                secondary={historyEntry.breakdown && historyEntry.breakdown.length > 0 ? (
                                    <span>{showHistoryEntriesAsList(historyEntry)}</span>
                                ) : <span>{translate.noBreakdown[language]}</span>}
                            />
                        </ListItem>
                    </Tooltip>
                ))}
            </List>
        </Card>
    </Container>
);

export default HistoryList;