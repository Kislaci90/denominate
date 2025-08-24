import React from 'react';
import { Snackbar, Alert, Button } from '@mui/material';
import {translate} from "../i18n";
import {theme} from "../utils/theme";

interface CookieBannerProps {
    showCookieNotice: boolean;
    onAccept: () => void;
    language: string;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ showCookieNotice, onAccept, language }) => (
    <Snackbar
        open={showCookieNotice}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
        <Alert
            sx={{
                bgcolor: theme.palette.primary.main,
                color: '#fff',
                boxShadow: 2,
                fontSize: '1rem',
                py: 1,
                px: 4,
                borderRadius: 2,
            }}
            action={
                <Button
                    color="inherit"
                    size="medium"
                    onClick={onAccept}
                    sx={{
                        color: theme.palette.primary.main,
                        bgcolor: '#fff',
                        border: '1px solid ' + theme.palette.primary.main,
                        '&:hover': {
                            bgcolor: '#f5f5f5',
                        },
                    }}
                >
                    Accept
                </Button>
            }
        >
            {translate.cookie[language]}
        </Alert>
    </Snackbar>
);

export default CookieBanner;