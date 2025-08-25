import React from "react";
import {Box, Divider, Paper, Typography} from "@mui/material";
import {theme} from "../utils/theme";
import {useTranslation} from "react-i18next";

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
                    {t('impressum')}
                </Typography>
                <Divider sx={{mb: 3}}/>
                <Typography variant="body1">
                    {t('impressumTypography')}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{mt: 4}}>
                    Last updated: Aug 2025
                </Typography>
            </Paper>
        </Box>
    );
};

export default Impressum;