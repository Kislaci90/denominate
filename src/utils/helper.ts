import {Language} from "../logic/language";

export function formatAmountInput(value: string, language: Language) {
    const digits = value.replace(/\D/g, '');
    if (!digits) return '0';
    return formatNumberByLanguage(language, Number(digits));
}

export function formatNumberByLanguage(language: Language, value: number) {
    return new Intl.NumberFormat(language.longCode).format(value)
}