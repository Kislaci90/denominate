import React from 'react';
import {Box, Button, Typography} from '@mui/material';
import {translate} from "../i18n";

type Props = {
    pendingAmountIsValid: boolean;
    handleDenominate: () => void;
    language: string;
};

const DenominateButton: React.FC<Props> = ({ pendingAmountIsValid, handleDenominate, language }) => (
    <>
        <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            <Button
                variant="contained"
                color="primary"
                sx={{
                    borderRadius: 3,
                    fontWeight: 700,
                    px: 5,
                    py: 2,
                    boxShadow: 3,
                    minWidth: {xs: 200, sm: 240},
                    fontSize: '1.25rem',
                    height: 64,
                    mt: 1,
                    '&:hover': {
                        boxShadow: 4,
                        transform: 'translateY(-1px)',
                        transition: 'all 0.2s ease'
                    },
                    '&:disabled': {
                        opacity: 0.6,
                        transform: 'none'
                    }
                }}
                disabled={!pendingAmountIsValid}
                onClick={handleDenominate}
                aria-describedby="denominate-helper-text"
            >
                {translate.denominate[language]}
            </Button>
        </Box>
        <Typography
            id="amount-helper-text"
            variant="caption"
            sx={{
                color: 'text.secondary',
                textAlign: 'center',
                fontSize: '0.85rem'
            }}
        >
            {pendingAmountIsValid ? translate.denominateHelper[language] : translate.denominateHelperInvalid[language]}
        </Typography>
    </>
);

export default DenominateButton;