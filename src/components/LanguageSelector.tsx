import {Avatar, Box, FormControl, MenuItem, Select} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import {useTranslation} from "react-i18next";
import React from "react";

type Language = {
    code: string;
    label: string;
    longCode: string;
    flagUrl: string;
}

const languages: Language[] = [
    {code: 'hu', label: 'Magyar', longCode: 'hu-HU', flagUrl: 'https://flagcdn.com/w40/hu.png',},
    {code: 'en', label: 'English', longCode: 'en-US', flagUrl: 'https://flagcdn.com/w40/us.png',},
    {code: 'de', label: 'Deutsch', longCode: 'de-DE', flagUrl: 'https://flagcdn.com/w40/de.png',},
];

const LanguageSelector = () => {
    const {i18n} = useTranslation();

    return (
        <FormControl size="small" sx={{minWidth: 120}}>
            <Select
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
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
                    '& .MuiSvgIcon-root': {color: 'white'}
                }}
                renderValue={(selected) => (
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 0.5}}>
                        <LanguageIcon sx={{fontSize: 18}}/>
                        {languages.find(l => l.code === selected)?.label}
                    </Box>
                )}
            >
                {languages.map((lang) => (
                    <MenuItem key={lang.code} value={lang.code} sx={{py: 1}}>
                        <Avatar
                            src={lang.flagUrl}
                            alt={lang.code}
                            sx={{width: 20, height: 14, borderRadius: 1, mr: 1}}
                        />
                        <span>{lang.label}</span>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default LanguageSelector;