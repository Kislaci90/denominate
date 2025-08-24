import React from "react";
import {Box, Divider, Paper, Typography} from "@mui/material";
import {theme} from "../utils/theme";

const CookiePolicy: React.FC = () => (
    <Box sx={{display: "flex", justifyContent: "center", alignItems: "flex-start", pt: 6}}>
        <Paper elevation={1} sx={{p: {xs: 2, sm: 4}, maxWidth: 700, width: "100%", borderRadius: 2}}>
            <Typography variant="h4" color={theme.palette.primary.main} gutterBottom>
                Our Use of Cookies
            </Typography>
            <Divider sx={{mb: 3}}/>
            <Typography variant="body1" paragraph>
                This application uses cookies to enhance your experience and remember your preferences. Cookies are
                small text files stored on your device.
            </Typography>
            <Typography variant="body1" paragraph>
                You can manage or disable cookies in your browser settings at any time. Disabling cookies may affect
                some features of the application.
            </Typography>
            <Typography variant="body1" paragraph>
                For questions about our cookie usage, contact us at <span
                style={{color: theme.palette.primary.main}}>support@example.com</span>.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{mt: 4}}>
                Last updated: June 2024
            </Typography>
        </Paper>
    </Box>
);

export default CookiePolicy;