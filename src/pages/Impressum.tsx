import React from "react";
import {Box, Divider, List, ListItem, Paper, Typography} from "@mui/material";
import {theme} from "../utils/theme";
import {useTranslation} from "react-i18next";
import { Business } from "@mui/icons-material";

const Impressum: React.FC = () => {
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
                    <Business fontSize="large"></Business> {t('impressum.title')}
                </Typography>
                <strong>{t('impressum.title')} - felvaltom.eu</strong>

                <Typography variant="body2" color="text.secondary" sx={{mb: 4}}>
                    Last updated: Aug 2025
                </Typography>

                <Divider sx={{mb: 3}}/>

                <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
                    <List dense sx={{
                        listStyleType: 'disc',
                        listStylePosition: 'inside'
                    }}>
                        <ListItem sx={{ display: 'list-item' }}><strong>{t('impressum.operator')}</strong> {t('impressum.individual')} </ListItem>
                        <ListItem sx={{ display: 'list-item' }}><strong>{t('impressum.email')}</strong> info@felvaltom.eu </ListItem>
                        <ListItem sx={{ display: 'list-item' }}><strong>{t('impressum.webpage')}</strong> https://felvaltom.eu </ListItem>
                        <ListItem sx={{ display: 'list-item' }}><strong>{t('impressum.headquarters')}</strong> Budapest</ListItem>
                    </List>

                    {t('impressum.important')}
                </Typography>
            </Paper>
        </Box>
    );
};

export default Impressum;