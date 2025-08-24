import React from "react";
import {Box, Divider, Paper, Typography} from "@mui/material";
import {theme} from "../utils/theme";

const TermsOfUse: React.FC = () => (
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
                Terms of Use
            </Typography>
            <Divider sx={{mb: 3}}/>
            <Typography variant="body1" paragraph>
                By using this application, you agree to comply with all applicable laws and regulations. The content
                provided is for informational purposes only.
            </Typography>
            <Typography variant="body1" paragraph>
                You are responsible for maintaining the confidentiality of your account and for all activities that
                occur under your account.
            </Typography>
            <Typography variant="body1" paragraph>
                For questions regarding these terms, contact us at <span
                style={{color: theme.palette.primary.main}}>support@example.com</span>.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{mt: 4}}>
                Last updated: June 2024
            </Typography>
        </Paper>
    </Box>
);

export default TermsOfUse;