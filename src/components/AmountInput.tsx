import React, {type RefObject} from 'react';
import {Box, IconButton, InputAdornment, TextField, Tooltip} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import {useTranslation} from "react-i18next";

type Props = {
    value: string,
    onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    onClear: () => void,
    inputRef: RefObject<HTMLInputElement | null>,
    isValid?: boolean
};

const AmountInput: React.FC<Props> = ({
                                          value,
                                          onAmountChange,
                                          onKeyDown,
                                          onClear,
                                          inputRef,
                                          isValid
                                      }) => {

    const { t } = useTranslation();

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
        }}>
            <Tooltip title={t('inputTooltip')} arrow placement="top">
                <TextField
                    className="amount-input"
                    type="text"
                    label={t('inputLabel')}
                    value={value}
                    onChange={onAmountChange}
                    onKeyDown={onKeyDown}
                    sx={{
                        flex: 1,
                        minWidth: {xs: 260, sm: 340, md: 400},
                    }}
                    inputRef={inputRef}
                    aria-describedby="amount-helper-text"
                    InputProps={{
                        error: isValid === false,
                        endAdornment: (
                            <InputAdornment position="end">
                                {value ? (
                                    <Tooltip title={t('clear')} arrow>
                                        <IconButton
                                            size="small"
                                            onClick={onClear}
                                            aria-label={t('clear')}
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
                            </InputAdornment>
                        ),
                        inputProps: {
                            inputMode: 'decimal',
                            pattern: '[0-9]*[.,]?[0-9]*',
                            'aria-describedby': 'amount-helper-text'
                        }
                    }}
                />
            </Tooltip>
        </Box>
    );
};

export default AmountInput;