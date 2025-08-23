import {DenominateResult} from "./denomination";
import {Currency} from "./currencies";

export type HistoryEntry = {
    amount: number;
    time: string;
    currency: Currency;
    denominationResult: DenominateResult[];
};

export function showHistoryEntriesAsList(historyEntry: HistoryEntry) {
    return historyEntry.denominationResult.map((item: any, i: number) => `${item.count} × ${item.denomination.value}${historyEntry.currency.symbol}`).join(', ');
}