import {Snackbar, Alert, Button} from '@mui/material';
import {theme} from "../utils/theme";
import {useTranslation} from "react-i18next";

interface CookieBannerProps {
    showCookieNotice: boolean;
    onAccept: () => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({showCookieNotice, onAccept}) => {
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
                {t('cookie')}
            </Alert>
        </Snackbar>
    );
};

export default CookieBanner;