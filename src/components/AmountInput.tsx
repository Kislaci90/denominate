import React, {RefObject} from 'react';
import {Box, IconButton, InputAdornment, MenuItem, Select, TextField, Tooltip} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ClearIcon from '@mui/icons-material/Clear';

type Currency = {
    code: string;
    label: string;
    symbol: string;
    flag: string;
};

type Props = {
    value: string;
    currency: string;
    pendingCurrency: string;
    currencies: Currency[];
    t: any;
    language: string;
    onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCurrencyChange: (e: any) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onClear: () => void;
    inputRef: RefObject<HTMLInputElement | null>;
    isValid: boolean;
};

const AmountInput: React.FC<Props> = ({
                                          value,
                                          currency,
                                          pendingCurrency,
                                          currencies,
                                          t,
                                          language,
                                          onAmountChange,
                                          onCurrencyChange,
                                          onKeyDown,
                                          onClear,
                                          inputRef,
                                          isValid
                                      }) => {
    const selectedCurrency = currencies.find(c => c.code === (pendingCurrency || currency));
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center'
        }}>
            <Tooltip title={t.inputTooltip[language]} arrow placement="top">
                <TextField
                    className="amount-input"
                    label={t.inputLabel[language]}
                    value={value}
                    onChange={onAmountChange}
                    onKeyDown={onKeyDown}
                    sx={{
                        flex: 1,
                        minWidth: {xs: 260, sm: 340, md: 400},
                        maxWidth: 500,
                    }}
                    inputRef={inputRef}
                    aria-describedby="amount-helper-text"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start" sx={{p: 0}}>
                                <Select
                                    value={pendingCurrency || currency}
                                    onChange={onCurrencyChange}
                                    variant="standard"
                                    disableUnderline
                                    sx={{
                                        minWidth: { xs: 40, sm: 70, md: 90 },
                                        fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.2rem' },
                                        pl: { xs: 0, sm: 0.5 },
                                        pr: { xs: 0, sm: 0.5 },
                                        '& .MuiSelect-select': {
                                            gap: { xs: '0.1em', sm: '0.3em' }
                                        }
                                    }}
                                    renderValue={selected => {
                                        const c = currencies.find(cur => cur.code === selected);
                                        return c ? <>
                                            <Box
                                                component="span"
                                                sx={{
                                                    fontSize: {xs: '1rem', sm: '1.1rem', md: '1.2rem'},
                                                    mr: 1
                                                }}
                                            >
                                                {c.flag}
                                            </Box>
                                            <Box
                                                component="span"
                                                sx={{
                                                    fontSize: {xs: '1rem', sm: '1.1rem', md: '1.2rem'},
                                                    mr: 1
                                                }}
                                            >
                                                {c.code}
                                            </Box></> : selected;
                                    }}
                                    aria-label="Select currency"
                                >
                                    {currencies.map(c => (
                                        <MenuItem key={c.code} value={c.code}>
                                            <Box
                                                component="span"
                                                sx={{
                                                    fontSize: {xs: '1rem', sm: '1.1rem', md: '1.2rem'},
                                                    mr: 1
                                                }}
                                            >
                                                {c.flag}
                                            </Box>
                                            <Box
                                                component="span"
                                                sx={{
                                                    fontSize: {xs: '1rem', sm: '1.1rem', md: '1.2rem'},
                                                    mr: 1
                                                }}
                                            >
                                                {c.label}
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                {value ? (
                                    <Tooltip title={t.clear[language]} arrow>
                                        <IconButton
                                            size="small"
                                            onClick={onClear}
                                            aria-label={t.clear[language]}
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: 'rgba(108, 99, 255, 0.1)'
                                                }
                                            }}
                                        >
                                            <ClearIcon fontSize="small"/>
                                        </IconButton>
                                    </Tooltip>
                                ) : null}
                                <Tooltip title="Enter numbers only, use spaces for thousands" arrow>
                                    <InfoOutlinedIcon color="action" fontSize="small"/>
                                </Tooltip>
                            </InputAdornment>
                        ),
                        inputProps: {
                            inputMode: 'numeric',
                            pattern: '[0-9 ]*',
                            'aria-describedby': 'amount-helper-text'
                        }
                    }}
                />
            </Tooltip>
        </Box>
    );
};

export default AmountInput;