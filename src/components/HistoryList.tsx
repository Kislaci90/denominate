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
    t: any;
    language: string;
    setHistory: (h: HistoryEntry[]) => void;
    setPendingAmount: (amt: string) => void;
    setPendingCurrency: (cur: string) => void;
    amountInputRef: React.RefObject<HTMLInputElement | null>;
    formatAmountInput: (value: string, lang: string) => string;
};

const HistoryList: React.FC<Props> = ({
                                          history,
                                          t,
                                          language,
                                          setHistory,
                                          setPendingAmount,
                                          setPendingCurrency,
                                          amountInputRef,
                                          formatAmountInput,
                                      }) => (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
        <Card elevation={8} sx={{ borderRadius: 4, p: { xs: 1.5, sm: 3 }, boxShadow: '0 8px 32px 0 rgba(108,99,255,0.10)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <ListSubheader component="div" sx={{ fontWeight: 700, fontSize: '1.13rem', color: 'primary.main', bgcolor: 'transparent', px: 0, py: 0 }}>
                    {t.history[language]}
                </ListSubheader>
                <Button size="small" color="secondary" variant="outlined" onClick={() => { setHistory([]); Cookies.remove('denom_history'); }} sx={{ ml: 2, textTransform: 'none', fontWeight: 600, borderRadius: 2, px: 2, py: 0.5 }}>
                    {t.clearHistory[language]}
                </Button>
            </Box>
            <Divider sx={{ mb: 1.5, borderColor: '#e0e7ff' }} />
            <List sx={{ p: 0 }}>
                {history.map((h, idx) => (
                    <Tooltip title={t.loadFromHistory[language](h.formatted, h.symbol || '')} arrow key={idx}>
                        <ListItem
                            alignItems="flex-start"
                            sx={{
                                mb: 1.2,
                                px: 1.2,
                                py: 1.1,
                                borderRadius: 3,
                                cursor: 'pointer',
                                transition: 'background 0.15s, box-shadow 0.15s',
                                '&:hover, &:focus': {
                                    background: 'rgba(108,99,255,0.07)',
                                    boxShadow: 2,
                                    outline: 'none',
                                },
                                '&:active': {
                                    background: 'rgba(108,99,255,0.13)',
                                },
                                border: '1.5px solid #f3f4fa',
                                boxShadow: 0,
                            }}
                            onClick={() => {
                                const rawValue = h.raw ? h.raw : h.formatted.replace(/[^\d]/g, '');
                                setPendingAmount(formatAmountInput(rawValue, language));
                                setPendingCurrency(h.currency);
                                setTimeout(() => {
                                    amountInputRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    amountInputRef?.current?.focus();
                                }, 100);
                            }}
                            tabIndex={0}
                            aria-label={t.loadFromHistory[language](h.formatted, h.symbol || '')}
                        >
                            <ListItemIcon sx={{ minWidth: 36 }}>
                                <span style={{ fontSize: 22 }}>{h.flag}</span>
                            </ListItemIcon>
                            <ListItemText
                                primary={<>
                                    <b style={{ fontWeight: 600, fontSize: '1.08em' }}>{h.formatted} {h.symbol}</b> <span style={{ color: '#888', fontSize: '0.97em', fontWeight: 400 }}>({new Date(h.time).toLocaleString()})</span>
                                </>}
                                secondary={h.breakdown && h.breakdown.length > 0 ? (
                                    <span style={{ color: '#555', fontSize: '0.98em' }}>
                    {h.breakdown.slice(0, 4).map((item: any, i: number) => `${item.count} × ${item.value} ${h.symbol}`).join(', ')}
                                        {h.breakdown.length > 4 ? '...' : ''}
                  </span>
                                ) : <span style={{ color: '#aaa', fontSize: '0.98em' }}>{t.noBreakdown[language]}</span>}
                            />
                        </ListItem>
                    </Tooltip>
                ))}
            </List>
        </Card>
    </Container>
);

export default HistoryList;