import React from "react";
import {Box, Divider, Paper, Typography} from "@mui/material";
import {theme} from "../utils/theme";

const PrivacyPolicy: React.FC = () => (
    <Box sx={{display: "flex", justifyContent: "center", alignItems: "flex-start", pt: 6}}>
        <Paper elevation={1} sx={{p: {xs: 2, sm: 4}, maxWidth: 700, width: "100%", borderRadius: 2}}>
            <Typography variant="h4" color={theme.palette.primary.main} gutterBottom>
                Your Privacy Matters
            </Typography>
            <Divider sx={{mb: 3}}/>
            <Typography variant="body1" paragraph>
                We value your privacy. This application does not collect personal data except for analytics purposes to
                improve user experience.
            </Typography>
            <Typography variant="body1" paragraph>
                Cookies may be used to remember your preferences. You can manage cookie settings at any time.
            </Typography>
            <Typography variant="body1" paragraph>
                For questions about your data, please contact us at <span
                style={{color: theme.palette.primary.main}}>support@example.com</span>.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{mt: 4}}>
                Last updated: June 2024
            </Typography>
        </Paper>
    </Box>
);

export default PrivacyPolicy;