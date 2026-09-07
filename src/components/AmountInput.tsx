import React, {type RefObject, useLayoutEffect, useRef} from 'react';
import {Box, IconButton, InputAdornment, TextField, Tooltip} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import {useTranslation} from "react-i18next";
import {caretIndexForRawLength, formatAmountForInput, getNumberSeparators, parseAmountInput} from "../utils/helper";

type Props = {
    value: string,
    onAmountChange: (rawValue: string) => void,
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    onClear: () => void,
    inputRef: RefObject<HTMLInputElement | null>,
};

const AmountInput: React.FC<Props> = ({
                                          value,
                                          onAmountChange,
                                          onKeyDown,
                                          onClear,
                                          inputRef,
                                      }) => {

    const {t, i18n} = useTranslation();
    const pendingCaretRawLength = useRef<number | null>(null);
    const displayValue = formatAmountForInput(value, i18n.language);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const el = e.target;
        const caret = el.selectionStart ?? el.value.length;
        pendingCaretRawLength.current = parseAmountInput(el.value.slice(0, caret), i18n.language).length;
        onAmountChange(parseAmountInput(el.value, i18n.language));
    }

    useLayoutEffect(() => {
        if (pendingCaretRawLength.current === null) return;
        const el = inputRef.current;
        if (el) {
            const {decimal} = getNumberSeparators(i18n.language);
            const pos = caretIndexForRawLength(displayValue, pendingCaretRawLength.current, decimal);
            el.setSelectionRange(pos, pos);
        }
        pendingCaretRawLength.current = null;
    }, [displayValue, inputRef, i18n.language]);

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
                    value={displayValue}
                    onChange={handleChange}
                    onKeyDown={onKeyDown}
                    onFocus={(e) => e.target.select()}
                    placeholder="0"
                    sx={{
                        flex: 1,
                        minWidth: {xs: 260, sm: 340, md: 400},
                    }}
                    inputRef={inputRef}
                    aria-describedby="denominate-helper-text"
                    InputProps={{
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
                                                    backgroundColor: 'rgba(31, 75, 58, 0.1)'
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
                            'aria-describedby': 'denominate-helper-text'
                        }
                    }}
                />
            </Tooltip>
        </Box>
    );
};

export default AmountInput;
