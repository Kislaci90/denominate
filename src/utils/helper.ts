export function formatNumberByLanguage(language: string, value: number) {
    return new Intl.NumberFormat(language).format(value)
}