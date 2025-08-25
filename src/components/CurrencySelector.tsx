import React from 'react';
import {Avatar, Box, FormControl, InputLabel, ListItemIcon, ListItemText, MenuItem, Select} from '@mui/material';
import {currencies} from "../logic/currencies";
import {useTranslation} from "react-i18next";

type Props = {
    currency: string;
    onChange: (lang: string) => void;
};

const CurrencySelector: React.FC<Props> = ({
                                               currency,
                                               onChange,
                                           }) => {
    const { t } = useTranslation();

    return (
        <FormControl fullWidth variant="outlined" size="small" className="currency-select-form-control">
            <InputLabel id="currency-label">{t('currencySelectLabel')}</InputLabel>
            <Select
                labelId="currency-label"
                value={currency}
                label={t('currencySelectLabel')}
                className="currency-select"
                onChange={(e) => onChange(e.target.value)}
                renderValue={(selected) => {
                    const selectedCurrency = currencies.find((c) => c.code === selected);
                    return (
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1}}>
                            <span>{selectedCurrency?.label}</span>
                            <Avatar
                                src={selectedCurrency?.flagUrl}
                                alt={selectedCurrency?.code}
                                sx={{width: 24, height: 16, borderRadius: 0}}
                            />
                        </Box>
                    );
                }}
            >
                {currencies.map(({code, label, flagUrl}) => (
                    <MenuItem key={code} value={code}>
                        <ListItemIcon sx={{minWidth: 36}}>
                            <Avatar
                                src={flagUrl}
                                alt={code}
                                sx={{width: 24, height: 16, borderRadius: 0}}
                            />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Box sx={{textAlign: 'right'}}>
                                    {label} ({code})
                                </Box>
                            }
                        />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default CurrencySelector;