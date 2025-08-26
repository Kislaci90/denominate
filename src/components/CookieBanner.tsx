import {Snackbar, Alert, Button, Box} from '@mui/material';
import {theme} from "../utils/theme";
import {useTranslation} from "react-i18next";

interface CookieBannerProps {
    showCookieNotice: boolean;
    onAccept: () => void;
    onDecline: () => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({showCookieNotice, onAccept, onDecline}) => {
    const { t } = useTranslation();

    return(
        <Snackbar
            open={showCookieNotice}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
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
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                            color="inherit"
                            size="medium"
                            onClick={onDecline}
                            sx={{
                                color: '#fff',
                                border: '1px solid #fff',
                                bgcolor: 'transparent',
                                '&:hover': {
                                    bgcolor: 'rgba(255,255,255,0.1)',
                                },
                            }}
                        >
                            {t('cookie.decline')}
                        </Button>
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
                            {t('cookie.accept')}
                        </Button>
                    </Box>
                }
            >
                {t('cookie.notification')}
            </Alert>
        </Snackbar>
    );
};

export default CookieBanner;