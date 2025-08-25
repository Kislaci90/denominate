import React from 'react';
import {AppBar, Box, Toolbar, Typography} from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';
import LanguageSelector from "./LanguageSelector";
import {useTranslation} from "react-i18next";

const TopBar: React.FC = () => {
    const {t} = useTranslation();

    return (
        <AppBar position="static" elevation={2} sx={{
            background: 'linear-gradient(135deg, #2E7D32 0%, #2E7D32 100%)',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
            <Toolbar sx={{justifyContent: 'space-between', px: {xs: 2, sm: 3}}}>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                    {/*<InverseLogoSvg width={40} height={40}/>*/}
                    <Typography variant="h6" component={RouterLink} to="/" sx={{
                        fontWeight: 700,
                        letterSpacing: 0.5,
                        textDecoration: 'none',
                        color: 'inherit',
                        display: {xs: 'none', sm: 'block'}
                    }}>
                        {t('heroTitle')}
                    </Typography>
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                    <LanguageSelector/>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;