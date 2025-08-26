import React from "react";
import {Box, Divider, Paper, Typography} from "@mui/material";
import {theme} from "../utils/theme";
import {useTranslation} from "react-i18next";
import {Description} from "@mui/icons-material";

const TermsOfUse: React.FC = () => {
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
                }}
            >
                <Typography variant="h4" color={theme.palette.primary.main} gutterBottom>
                    <Description fontSize="large"></Description> {t('termsOfUse.title')}
                </Typography>
                <strong>{t('termsOfUse.title')} - felvaltom.eu</strong>

                <Typography variant="body2" color="text.secondary" sx={{mb: 4}}>
                    Last updated: Aug 2025
                </Typography>

                <Divider sx={{mb: 3}}/>

                <Typography variant="h5" color={theme.palette.primary.main} gutterBottom>
                    1. {t('termsOfUse.serviceDescription.title')}
                </Typography>
                <Typography variant="body1" gutterBottom sx={{mb: 2}}>
                    {t('termsOfUse.serviceDescription.content')}
                </Typography>

                <Typography variant="h5" color={theme.palette.primary.main} gutterBottom>
                    2. {t('termsOfUse.LimitationOfLiability.title')}
                </Typography>
                <Typography variant="body1" gutterBottom sx={{mb: 2}}>
                    {t('termsOfUse.LimitationOfLiability.content')}
                </Typography>

                <Typography variant="h5" color={theme.palette.primary.main} gutterBottom>
                    3. {t('termsOfUse.userObligations.title')}
                </Typography>
                <Typography variant="body1" gutterBottom sx={{mb: 2}}>
                    {t('termsOfUse.userObligations.content')}
                </Typography>

                <Typography variant="h5" color={theme.palette.primary.main} gutterBottom>
                    4. {t('termsOfUse.intellectualProperty.title')}
                </Typography>
                <Typography variant="body1" gutterBottom sx={{mb: 2}}>
                    {t('termsOfUse.intellectualProperty.content')}
                </Typography>

                <Typography variant="h5" color={theme.palette.primary.main} gutterBottom>
                    5. {t('termsOfUse.changes.title')}
                </Typography>
                <Typography variant="body1" gutterBottom sx={{mb: 2}}>
                    {t('termsOfUse.changes.content')}
                </Typography>

            </Paper>
        </Box>
    )
};

export default TermsOfUse;