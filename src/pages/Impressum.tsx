import React from "react";
import {Box, Divider, Paper, Typography} from "@mui/material";
import {theme} from "../utils/theme";

const Impressum: React.FC = () => (
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
                Impressum
            </Typography>
            <Divider sx={{mb: 3}}/>
            <Typography variant="body1" paragraph>
                Company Name: Example GmbH
            </Typography>
            <Typography variant="body1" paragraph>
                Address: Example Street 1, 12345 Example City, Country
            </Typography>
            <Typography variant="body1" paragraph>
                Phone: +49 123 456789<br/>
                Email: <span style={{color: theme.palette.primary.main}}>support@example.com</span>
            </Typography>
            <Typography variant="body1" paragraph>
                Managing Director: John Doe
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{mt: 4}}>
                Last updated: June 2024
            </Typography>
        </Paper>
    </Box>
);

export default Impressum;