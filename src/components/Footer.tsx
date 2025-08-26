import React from 'react';
import {Box, Divider, Link} from '@mui/material';
import {useTranslation} from "react-i18next";

const Footer: React.FC = () => {
    const {t} = useTranslation();

    return (
        <Box component="footer" sx={{p: 2, textAlign: 'center', bgcolor: '#f5f5f5', mt: 4}}>
            © {new Date().getFullYear()} Felvaltom Kalkulator;
            <Divider sx={{m:3}}/>
            <Link href="/privacy-policy" sx={{mx: 1}}>{t('privacyPolicy.title')}</Link>
            <Link href="/cookie-policy" sx={{mx: 1}}>{t('cookiePolicy.title')}</Link>
            <Link href="/terms-of-use" sx={{mx: 1}}>{t('termsOfUse.title')}</Link>
            <Link href="/impressum" sx={{mx: 1}}>{t('impressum.title')}</Link>
        </Box>
    )
};

export default Footer;