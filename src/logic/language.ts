export type Language ={
    code: string;
    label: string;
    longCode: string;
}

export const languages : Language[] = [
    {code: 'hu', label: 'Magyar', longCode: 'hu-HU'},
    {code: 'en', label: 'English', longCode: 'en-US'},
    {code: 'de', label: 'Deutsch', longCode: 'de-DE'},
];

export const defaultLanguage = languages[0];

export function getLanguageByCode(code: string): Language {
    return languages.find(lang => lang.code === code) || defaultLanguage;
}