import React from 'react';
import {
    Avatar,
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
import {formatNumberByLanguage} from "../utils/helper";
import {type HistoryEntry, showHistoryEntriesAsList} from "../logic/history";
import {useTranslation} from "react-i18next";


type Props = {
    history: HistoryEntry[],
    setHistory: (h: HistoryEntry[]) => void,
    setPendingAmount: (amt: string) => void,
    setAmount: (amt: number) => void,
    setCurrency: (cur: string) => void,
    resultAreaRef?: React.RefObject<HTMLDivElement | null>
};

const HistoryList: React.FC<Props> = ({
                                          history,
                                          setHistory,
                                          setPendingAmount,
                                          setAmount,
                                          setCurrency,
                                          resultAreaRef
                                      }) => {

    const {t, i18n} = useTranslation();

    return (
        <Container maxWidth="md" sx={{mt: 2}}>
            <Card elevation={8} className="history-card">
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1}}>
                    <ListSubheader component="div">
                        {t('history')}
                    </ListSubheader>
                    <Button size="small" color="secondary" variant="outlined" onClick={() => {
                        setHistory([]);
                        localStorage.removeItem('denomination_history');
                    }} className='delete-button'>
                        {t('clearHistory')}
                    </Button>
                </Box>

                <Divider className='devider'/>

                <List className="history-list">
                    {history.map((historyEntry, index) => (
                        <Tooltip
                            title={t('loadFromHistory', (formatNumberByLanguage(i18n.language, Number(historyEntry.amount)), historyEntry.currency.symbol))}
                            arrow key={index}>
                            <ListItem
                                alignItems="flex-start"
                                className="history-list-item"
                                onClick={() => {
                                    setPendingAmount(historyEntry.amount.toString());
                                    setAmount(historyEntry.amount);
                                    setCurrency(historyEntry.currency.code);
                                    setTimeout(() => {
                                        resultAreaRef?.current?.scrollIntoView({behavior: 'smooth', block: 'center'});
                                        resultAreaRef?.current?.focus();
                                    }, 100);
                                }}
                                tabIndex={0}
                                aria-label={t('loadFromHistory', (formatNumberByLanguage(i18n.language, Number(historyEntry.amount)), historyEntry.currency.symbol))}
                            >
                                <ListItemIcon className="history-list-item-icon" sx={{minWidth: 36}}>
                                <span style={{fontSize: 22}}>
                                    <Avatar
                                        src={historyEntry.currency.flagUrl}
                                        alt={historyEntry.currency.code}
                                        sx={{width: 24, height: 16, borderRadius: 0}}
                                    />
                                </span>
                                </ListItemIcon>
                                <ListItemText
                                    className="history-list-item-text"
                                    primary={<>
                                        <b>{formatNumberByLanguage(i18n.language, Number(historyEntry.amount))} {historyEntry.currency.symbol}</b>
                                        <span>({new Date(historyEntry.time).toLocaleString()})</span>
                                    </>}

                                    secondary={historyEntry.denominationResult && historyEntry.denominationResult.length > 0 ? (
                                        <span>{showHistoryEntriesAsList(historyEntry)}</span>
                                    ) : <span>{t('noBreakDown')}</span>}
                                />
                            </ListItem>
                        </Tooltip>
                    ))}
                </List>
            </Card>
        </Container>
    );
};

export default HistoryList;