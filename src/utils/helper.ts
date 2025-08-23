import {Language} from "../logic/language";

export function formatNumberByLanguage(language: Language, value: number) {
    return new Intl.NumberFormat(language.longCode).format(value)
}