import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Box, Chip, Divider} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Props = {
    t: any;
    language: string;
    anyDisabled: boolean;
    pendingCurrency: string;
    currency: string;
    enabledDenoms: number[];
    saveEnabledDenoms: (newDenoms: number[]) => void;
    getDenominationsForCurrency: (cur: string) => number[];
    currencies: Array<{ code: string; icon: React.JSX.Element }>;
};

const Customize: React.FC<Props> = ({
                                        t,
                                        language,
                                        anyDisabled,
                                        pendingCurrency,
                                        currency,
                                        enabledDenoms,
                                        saveEnabledDenoms,
                                        getDenominationsForCurrency,
                                        currencies,
                                    }) => {

    const chipCurrency = pendingCurrency || currency;
    const denominations = getDenominationsForCurrency(chipCurrency);
    let coinStartIdx = 0;
    if (chipCurrency === 'EUR') coinStartIdx = denominations.findIndex(d => d < 5);
    else if (chipCurrency === 'USD') coinStartIdx = denominations.findIndex(d => d < 1);
    else if (chipCurrency === 'HUF') coinStartIdx = denominations.findIndex(d => d <= 200);
    const bills = denominations.slice(0, coinStartIdx === -1 ? denominations.length : coinStartIdx);
    const coins = denominations.slice(coinStartIdx === -1 ? denominations.length : coinStartIdx);
    const chipCurrencyObj = currencies.find(c => c.code === chipCurrency);

    return (
        <Accordion sx={{
            maxWidth: {xs: 300, sm: 400, md: 600},
            width: '100%',
            margin: '18px auto 0px auto',
            borderRadius: '28px',
            boxShadow: '0 8px 32px 0 rgba(108,99,255,0.16)',
            bgcolor: 'rgba(255,255,255,0.85)',
            border: '1.5px solid #e0e7ff',
            padding: '1.2rem 1.2rem 1.2rem 1.2rem',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            '&:before': { display: 'none' },
            overflow: 'visible',
        }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ fontSize: 26, color: '#6C63FF' }} />}
                sx={{
                    fontWeight: 700,
                    fontSize: '1.01rem',
                    color: 'primary.main',
                    bgcolor: 'transparent',
                    borderRadius: '24px',
                    px: 0,
                    py: 0.5,
                    minHeight: 0,
                    mb: 1.2,
                    '& .MuiAccordionSummary-content': { my: 0.5, display: 'flex', alignItems: 'center', gap: 1 }
                }}
            >
                <SettingsIcon sx={{ fontSize: 20, color: '#6C63FF', mr: 1 }} />
                {t.customizeTitle[language]}
                {anyDisabled && (
                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 1, color: 'info.main', fontWeight: 400, fontSize: '0.60em', gap: 0.5, opacity: 0.85 }}>
                        <InfoOutlinedIcon sx={{ fontSize: 16, color: 'info.main', mb: '1px' }} />
                        <span>
              {language === 'hu' ? 'Egy vagy több címlet le van tiltva.' : language === 'de' ? 'Mindestens ein Schein oder eine Münze ist deaktiviert.' : 'One or more denominations are disabled.'}
            </span>
                    </Box>
                )}
            </AccordionSummary>
            <Divider sx={{ m: 0, borderColor: '#e0e7ff', mb: 2 }} />
            <AccordionDetails sx={{ px: 0, py: 0, bgcolor: 'transparent' }}>
                <div style={{ textAlign: 'center', margin: '10px 0 0 0', color: '#555', fontSize: '1.05rem', fontWeight: 500 }}>
                    {t.customizeDesc[language]}
                </div>
                <div>
                    <div style={{ margin: '22px 0 8px 0', textAlign: 'center' }}>
            <span style={{ fontWeight: 700, color: '#6C63FF', fontSize: '1.08rem', letterSpacing: 1 }}>
              {t.bills[language]}
            </span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginBottom: 18 }}>
                        {bills.map(denom => (
                            <Chip
                                key={denom}
                                label={String(denom)}
                                color={enabledDenoms.includes(denom) ? 'primary' : 'default'}
                                variant={enabledDenoms.includes(denom) ? 'filled' : 'outlined'}
                                size="small"
                                onClick={() => {
                                    if (enabledDenoms.includes(denom)) {
                                        saveEnabledDenoms(enabledDenoms.filter(d => d !== denom));
                                    } else {
                                        saveEnabledDenoms([...enabledDenoms, denom]);
                                    }
                                }}
                                sx={{
                                    fontWeight: 700,
                                    fontSize: '0.95rem',
                                    opacity: enabledDenoms.includes(denom) ? 1 : 0.5,
                                    px: 1,
                                    py: 0.2,
                                    borderRadius: 2,
                                    cursor: 'pointer',
                                    userSelect: 'none',
                                    transition: 'background 0.15s',
                                    boxShadow: enabledDenoms.includes(denom) ? 2 : 0,
                                    '&:hover': { background: enabledDenoms.includes(denom) ? '#6C63FF22' : '#eee' }
                                }}
                                icon={chipCurrencyObj?.icon}
                            />
                        ))}
                    </div>
                    <div style={{ margin: '28px 0 8px 0', textAlign: 'center' }}>
            <span style={{ fontWeight: 700, color: '#6C63FF', fontSize: '1.08rem', letterSpacing: 1 }}>
              {t.coins[language]}
            </span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
                        {coins.map(denom => (
                            <Chip
                                key={denom}
                                label={String(denom)}
                                color={enabledDenoms.includes(denom) ? 'primary' : 'default'}
                                variant={enabledDenoms.includes(denom) ? 'filled' : 'outlined'}
                                size="small"
                                onClick={() => {
                                    if (enabledDenoms.includes(denom)) {
                                        saveEnabledDenoms(enabledDenoms.filter(d => d !== denom));
                                    } else {
                                        saveEnabledDenoms([...enabledDenoms, denom]);
                                    }
                                }}
                                sx={{
                                    fontWeight: 700,
                                    fontSize: '0.95rem',
                                    opacity: enabledDenoms.includes(denom) ? 1 : 0.5,
                                    px: 1,
                                    py: 0.2,
                                    borderRadius: 2,
                                    cursor: 'pointer',
                                    userSelect: 'none',
                                    boxShadow: enabledDenoms.includes(denom) ? 2 : 0,
                                    '&:hover': { background: enabledDenoms.includes(denom) ? '#6C63FF22' : '#eee' }
                                }}
                                icon={chipCurrencyObj?.icon}
                            />
                        ))}
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>
    );
};

export default Customize;