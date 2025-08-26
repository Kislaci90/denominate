import React from "react";
import {Box, Divider, List, ListItem, Paper, Typography} from "@mui/material";
import {theme} from "../utils/theme";
import {useTranslation} from "react-i18next";
import { Cookie } from "@mui/icons-material";

const CookiePolicy: React.FC = () => {
    const {t} = useTranslation();

    return (
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "flex-start", pt: 6}}>
            <Paper
                elevation={1}
                sx={{
                    p: {xs: 3, sm: 5},
                    maxWidth: 800,
                    width: "100%",
                    bgcolor: "background.paper",
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                }}>
                <Typography variant="h4" color={theme.palette.primary.main} gutterBottom>
                    <Cookie  fontSize="large"></Cookie> {t('cookiePolicy.title')}
                </Typography>
                <strong>{t('cookiePolicy.title')} - felvaltom.eu</strong>

                <Typography variant="body2" color="text.secondary" sx={{mb: 4}}>
                    Last updated: Aug 2025
                </Typography>

                <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
                    {t('cookiePolicy.intro')}
                </Typography>

                <Divider sx={{mb: 3}}/>

                <Typography variant="h5" color={theme.palette.primary.main} gutterBottom>
                    1. {t('cookiePolicy.whatAreCookies.title')}
                </Typography>
                <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
                    {t('cookiePolicy.whatAreCookies.content')}
                </Typography>

                <Typography variant="h5" color={theme.palette.primary.main} gutterBottom>
                    2. {t('cookiePolicy.whatCookiesWeUse.title')}
                </Typography>
                <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
                    <List dense sx={{
                        listStyleType: 'disc',
                        listStylePosition: 'inside'
                    }}>
                        <ListItem sx={{ display: 'list-item' }}>{t('cookiePolicy.whatCookiesWeUse.basicCookie')}</ListItem>
                        <ListItem sx={{ display: 'list-item' }}>{t('cookiePolicy.whatCookiesWeUse.analyticsCookie')}</ListItem>
                    </List>
                </Typography>

                <Typography variant="h5" color={theme.palette.primary.main} gutterBottom>
                    3. {t('cookiePolicy.managingCookies.title')}
                </Typography>
                <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
                    {t('cookiePolicy.managingCookies.content')}
                </Typography>

                <Typography variant="h5" color={theme.palette.primary.main} gutterBottom>
                    4. {t('cookiePolicy.googleAnalytics.title')}
                </Typography>
                <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
                    {t('cookiePolicy.googleAnalytics.content')} <a href='https://policies.google.com/privacy'>https://policies.google.com/privacy</a>
                </Typography>

            </Paper>
        </Box>
    );
};

export default CookiePolicy;