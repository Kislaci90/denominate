import {Box, FormControl, MenuItem, Select} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import {useTranslation} from "react-i18next";

type Language = {
    code: string;
    label: string;
    longCode: string;
}

const languages: Language[] = [
    {code: 'hu', label: 'Magyar', longCode: 'hu-HU'},
    {code: 'en', label: 'English', longCode: 'en-US'},
    {code: 'de', label: 'Deutsch', longCode: 'de-DE'},
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
                        {lang.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default LanguageSelector;