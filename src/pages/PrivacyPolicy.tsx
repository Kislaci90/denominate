import React from "react";
import {Box, Divider, List, ListItem, Paper, Typography} from "@mui/material";
import {theme} from "../utils/theme";
import {useTranslation} from "react-i18next";
import { LockPerson } from "@mui/icons-material";

const PrivacyPolicy: React.FC = () => {
    const {t} = useTranslation();

    return (
    <Box sx={{display: "flex", justifyContent: "center", alignItems: "flex-start", pt: 6}}>
        <Paper elevation={1} sx={{
            p: {xs: 3, sm: 5},
            maxWidth: 800,
            width: "100%",
            bgcolor: "background.paper",
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
        }}>
            <Typography variant="h4" color={theme.palette.primary.main} gutterBottom>
                <LockPerson  fontSize="large"></LockPerson> {t('privacyPolicy.title')}
            </Typography>
            <strong>{t('privacyPolicy.title')} - felvaltom.eu</strong>

            <Typography variant="body2" color="text.secondary" sx={{mb: 4}}>
                Last updated: Aug 2025
            </Typography>

            <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
                {t('privacyPolicy.intro')}
            </Typography>

            <Divider sx={{mb: 3}}/>

            <Typography variant="h5" color={theme.palette.primary.main} gutterBottom>
                {t('privacyPolicy.dataControllerData.title')}
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
                <List dense sx={{
                    listStyleType: 'disc',
                    listStylePosition: 'inside'
                }}>
                    <ListItem sx={{ display: 'list-item' }}><strong>{t('privacyPolicy.dataControllerData.name')}</strong> {t('privacyPolicy.dataControllerData.individual')}</ListItem>
                    <ListItem sx={{ display: 'list-item' }}><strong>{t('privacyPolicy.dataControllerData.email')}</strong> info@felvaltom.eu </ListItem>
                    <ListItem sx={{ display: 'list-item' }}><strong>{t('privacyPolicy.dataControllerData.webpage')}</strong> https://felvaltom.eu </ListItem>
                </List>
            </Typography>

            <Typography variant="h5" color={theme.palette.primary.main} gutterBottom>
                {t('privacyPolicy.collectedData.title')}
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
                <List dense sx={{
                    listStyleType: 'disc',
                    listStylePosition: 'inside'
                }}>
                    <ListItem sx={{ display: 'list-item' }}>{t('privacyPolicy.collectedData.ip')}</ListItem>
                    <ListItem sx={{ display: 'list-item' }}>{t('privacyPolicy.collectedData.browserData')} </ListItem>
                </List>
                {t('privacyPolicy.collectedData.important')}
            </Typography>

            <Typography variant="h5" color={theme.palette.primary.main} gutterBottom>
                {t('privacyPolicy.goalOfDataProcessing.title')}
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
                <List dense sx={{
                    listStyleType: 'disc',
                    listStylePosition: 'inside'
                }}>
                    <ListItem sx={{ display: 'list-item' }}>{t('privacyPolicy.goalOfDataProcessing.working')} </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>{t('privacyPolicy.goalOfDataProcessing.statistics')} </ListItem>
                </List>
            </Typography>

            <Typography variant="h5" color={theme.palette.primary.main} gutterBottom>
                {t('privacyPolicy.dataForwarding.title')}
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
                {t('privacyPolicy.dataForwarding.content')}
            </Typography>

            <Typography variant="h5" color={theme.palette.primary.main} gutterBottom>
                {t('privacyPolicy.dataRetention.title')}
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
                {t('privacyPolicy.dataRetention.content')}
            </Typography>

            <Typography variant="h5" color={theme.palette.primary.main} gutterBottom>
                {t('privacyPolicy.userRights.title')}
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
                {t('privacyPolicy.userRights.content')}
                <List dense sx={{
                    listStyleType: 'disc',
                    listStylePosition: 'inside'
                }}>
                    <ListItem sx={{ display: 'list-item' }}>{t('privacyPolicy.userRights.request')} </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>{t('privacyPolicy.userRights.denies')} </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>{t('privacyPolicy.userRights.complain')} </ListItem>
                </List>
            </Typography>

        </Paper>
    </Box>
    );
};

export default PrivacyPolicy;