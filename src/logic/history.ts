import type {DenominateResult} from "./denomination";
import type {Currency} from "./currencies";

export type HistoryEntry = {
    amount: number;
    time: string;
    currency: Currency;
    denominationResult: DenominateResult[];
};

export function showHistoryEntriesAsList(historyEntry: HistoryEntry) {
    return historyEntry.denominationResult.map((item: DenominateResult) => `${item.count} × ${item.denomination.value}${historyEntry.currency.symbol}`).join(', ');
}