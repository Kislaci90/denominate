import {useEffect, useRef} from 'react';
import {Alert, Button, Box} from '@mui/material';
import {theme} from "../utils/theme";
import {useTranslation} from "react-i18next";

interface CookieBannerProps {
    showCookieNotice: boolean;
    onAccept: () => void;
    onDecline: () => void;
    onHeightChange: (height: number) => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({showCookieNotice, onAccept, onDecline, onHeightChange}) => {
    const {t} = useTranslation();
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!showCookieNotice) {
            onHeightChange(0);
            return;
        }
        const el = barRef.current;
        if (!el) return;
        const report = () => onHeightChange(el.offsetHeight);
        report();
        const observer = new ResizeObserver(report);
        observer.observe(el);
        return () => observer.disconnect();
    }, [showCookieNotice, onHeightChange]);

    if (!showCookieNotice) return null;

    return (
        <Alert
            ref={barRef}
            severity="info"
            icon={false}
            sx={{
                position: 'fixed',
                left: 0,
                right: 0,
                bottom: 0,
                boxSizing: 'border-box',
                zIndex: theme.zIndex.snackbar,
                borderRadius: 0,
                bgcolor: theme.palette.primary.main,
                color: '#fff',
                boxShadow: '0 -2px 12px rgba(0,0,0,0.2)',
                py: 1.2,
                px: {xs: 2, sm: 4},
                alignItems: {xs: 'flex-start', sm: 'center'},
                flexDirection: {xs: 'column', sm: 'row'},
                gap: 1.5,
                '& .MuiAlert-message': {flex: 1, fontSize: '0.9rem', py: 0},
                '& .MuiAlert-action': {m: 0, p: 0, alignSelf: {xs: 'stretch', sm: 'center'}}
            }}
            action={
                <Box sx={{
                    display: 'flex',
                    gap: 1,
                    width: {xs: '100%', sm: 'auto'},
                    justifyContent: {xs: 'flex-end', sm: 'flex-start'}
                }}>
                    <Button
                        color="inherit"
                        size="medium"
                        onClick={onDecline}
                        sx={{
                            color: '#fff',
                            border: '1px solid #fff',
                            bgcolor: 'transparent',
                            whiteSpace: 'nowrap',
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
                            whiteSpace: 'nowrap',
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
    );
};

export default CookieBanner;
