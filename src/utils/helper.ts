export function formatNumberByLanguage(language: string, value: number) {
    return new Intl.NumberFormat(language).format(value)
}

export function getNumberSeparators(language: string) {
    const parts = new Intl.NumberFormat(language).formatToParts(1234.5);
    return {
        group: parts.find(p => p.type === 'group')?.value ?? ',',
        decimal: parts.find(p => p.type === 'decimal')?.value ?? '.',
    };
}

/**
 * Formats a canonical raw amount string (digits with an optional single "."
 * decimal separator) into a locale-grouped display string, e.g. "100000000"
 * -> "100.000.000" for "de", "100 000 000" for "hu".
 */
export function formatAmountForInput(raw: string, language: string): string {
    if (!raw) return raw;
    const {decimal} = getNumberSeparators(language);
    const dotIndex = raw.indexOf('.');
    const intPart = dotIndex === -1 ? raw : raw.slice(0, dotIndex);
    const decPart = dotIndex === -1 ? undefined : raw.slice(dotIndex + 1);
    const groupedInt = intPart === '' ? '' : new Intl.NumberFormat(language, {maximumFractionDigits: 0}).format(BigInt(intPart));
    return decPart === undefined ? groupedInt : `${groupedInt}${decimal}${decPart}`;
}

/**
 * Reverses formatAmountForInput: strips the locale's grouping separator and
 * normalizes whichever decimal separator the user typed (the locale's own,
 * or "." / "," as a fallback) to a canonical ".".
 */
export function parseAmountInput(displayValue: string, language: string): string {
    const {group, decimal} = getNumberSeparators(language);
    let result = '';
    let seenDecimal = false;
    for (const ch of displayValue) {
        if (ch >= '0' && ch <= '9') {
            result += ch;
            continue;
        }
        if (seenDecimal) continue;
        const isDecimalChar = ch === decimal || ((ch === '.' || ch === ',') && ch !== group);
        if (isDecimalChar) {
            result += '.';
            seenDecimal = true;
        }
    }
    return result;
}

/**
 * Finds the character index in a formatted string right after having
 * consumed `rawLength` "canonical" characters (digits, plus the locale's
 * decimal separator counted as one unit standing in for the raw "."). Group
 * separators are skipped over without being counted. This intentionally
 * lands the caret *after* a freshly-typed decimal separator (not before it),
 * so the next digit typed lands in the fraction, not the integer part.
 */
export function caretIndexForRawLength(formatted: string, rawLength: number, decimalChar: string): number {
    if (rawLength <= 0) return 0;
    let seen = 0;
    for (let i = 0; i < formatted.length; i++) {
        const ch = formatted[i];
        if ((ch >= '0' && ch <= '9') || ch === decimalChar) {
            seen++;
            if (seen === rawLength) return i + 1;
        }
    }
    return formatted.length;
}
