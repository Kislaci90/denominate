import React from 'react';
import {AppBar, Box, FormControl, Icon, MenuItem, Select, Toolbar, Typography} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import CalculateIcon from '@mui/icons-material/Calculate';

type Language = { code: string; label: string };
type Props = {
    language: string;
    setLanguage: (lang: string) => void;
    languages: Language[];
    t: any;
};

const TopBar: React.FC<Props> = ({ language, setLanguage, languages, t }) => (
    <AppBar position="static" elevation={2} sx={{
        background: 'linear-gradient(135deg, #2E7D32 0%, #2E7D32 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
    }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h6" component="div" sx={{
                    fontWeight: 700,
                    letterSpacing: 0.5,
                    display: { xs: 'none', sm: 'block' }
                }}>
                    {t.heroTitle[language]}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        variant="standard"
                        disableUnderline
                        sx={{
                            color: 'white',
                            fontWeight: 600,
                            '& .MuiSelect-select': {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                py: 0.5
                            },
                            '& .MuiSvgIcon-root': { color: 'white' }
                        }}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <LanguageIcon sx={{ fontSize: 18 }} />
                                {languages.find(l => l.code === selected)?.label}
                            </Box>
                        )}
                    >
                        {languages.map((lang) => (
                            <MenuItem key={lang.code} value={lang.code} sx={{ py: 1 }}>
                                {lang.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </Toolbar>
    </AppBar>
);

export default TopBar;