import React, {RefObject} from 'react';
import {Box, IconButton, InputAdornment, TextField, Tooltip} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import {translate} from "../i18n";

type Props = {
    value: string;
    language: string;
    onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onClear: () => void;
    inputRef: RefObject<HTMLInputElement | null>;
};

const AmountInput: React.FC<Props> = ({
                                          value,
                                          language,
                                          onAmountChange,
                                          onKeyDown,
                                          onClear,
                                          inputRef
                                      }) => {
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
        }}>
            <Tooltip title={translate.inputTooltip[language]} arrow placement="top">
                <TextField
                    className="amount-input"
                    type="text"
                    label={translate.inputLabel[language]}
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
                        endAdornment: (
                            <InputAdornment position="end">
                                {value ? (
                                    <Tooltip title={translate.clear[language]} arrow>
                                        <IconButton
                                            size="small"
                                            onClick={onClear}
                                            aria-label={translate.clear[language]}
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