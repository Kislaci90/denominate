import React from 'react';
import {Box, Divider, Link} from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';
import {useTranslation} from "react-i18next";

const Footer: React.FC = () => {
    const {t} = useTranslation();

    return (
        <Box component="footer" sx={{
            py: 3,
            px: 2,
            textAlign: 'center',
            bgcolor: '#123024',
            color: '#D9C79A',
            borderTop: '2px solid #AD8A3D',
            mt: 4,
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '0.82rem',
            letterSpacing: 0.3,
        }}>
            © {new Date().getFullYear()} Felvaltom Kalkulator
            <Divider sx={{my: 2, borderColor: 'rgba(173, 138, 61, 0.35)'}}/>
            {[
                {to: '/privacy-policy', label: t('privacyPolicy.title')},
                {to: '/cookie-policy', label: t('cookiePolicy.title')},
                {to: '/terms-of-use', label: t('termsOfUse.title')},
                {to: '/impressum', label: t('impressum.title')},
            ].map(({to, label}) => (
                <Link
                    key={to}
                    component={RouterLink}
                    to={to}
                    sx={{
                        mx: 1,
                        color: '#D9C79A',
                        '&:hover': {color: '#F5EEDC'},
                    }}
                >
                    {label}
                </Link>
            ))}
        </Box>
    )
};

export default Footer;