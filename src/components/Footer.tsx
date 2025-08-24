import React from 'react';
import { Box, Link } from '@mui/material';

const Footer: React.FC = () => (
    <Box component="footer" sx={{ py: 2, textAlign: 'center', bgcolor: '#f5f5f5', mt: 4 }}>
        © {new Date().getFullYear()} Felvaltom Kalkulator &middot;
        <Link href="/privacy-policy" sx={{ mx: 1 }}>Privacy Policy</Link>
        <Link href="/cookie-policy" sx={{ mx: 1 }}>Cookie Policy</Link>
        <Link href="/terms-of-use" sx={{ mx: 1 }}>Terms of Use</Link>
        <Link href="/impressum" sx={{ mx: 1 }}>Impressum</Link>
    </Box>
);

export default Footer;