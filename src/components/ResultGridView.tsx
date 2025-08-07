import React from 'react';
import BillIcon from './BillIcon';
import CoinIcon from './CoinIcon';

type BreakdownItem = {
    value: number;
    count: number;
    isCoin: boolean;
};

type Currency = {
    symbol: string;
};

type Props = {
    breakdown: BreakdownItem[];
    currency: string;
    selectedCurrency?: Currency | undefined;
    t: any;
    language: string;
};

const ResultGridView: React.FC<Props> = ({ breakdown, currency, selectedCurrency, t, language }) => (
    <div>
        <div className="result-area-summary">
            <span className="result-amount-value">{}</span> {selectedCurrency?.symbol} {t.resultSummary[language]('', selectedCurrency?.symbol)}
        </div>
        <div className="result-area-divider"/>
        <div className="result-stack-area">
            {/* Bills group (grid) */}
            {breakdown.some(item => !item.isCoin) && (
                <div style={{width: '100%'}}>
                    <div className="result-stack-label">
                        {t.bills[language]}
                    </div>
                    <div className="result-grid-group">
                        {breakdown.filter(item => !item.isCoin).map((item) => (
                            <div className="denom-grid-card" key={`bill-grid-${item.value}`}
                                 tabIndex={0}
                                 aria-label={`${item.count} × ${item.value} ${selectedCurrency?.symbol}`}>
                                <BillIcon
                                    value={item.value}
                                    width={40}
                                    height={24}
                                    className={`denom-grid-img${currency === 'HUF' ? ' huf' : ''}`}
                                    ariaLabel={`${item.value} ${selectedCurrency?.symbol}`}
                                />
                                <div className="denom-grid-count"
                                     style={{fontSize: '0.93rem', padding: '0.18em 0.8em'}}>
                                    × {item.count}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{
                        textAlign: 'center',
                        color: '#888',
                        fontSize: '0.98rem',
                        marginTop: 6,
                        marginBottom: 18
                    }}>
                        {t.totalBills[language]}: {breakdown.filter(item => !item.isCoin).reduce((sum, item) => sum + item.count, 0)}
                    </div>
                </div>
            )}
            {/* Coins group (grid) */}
            {breakdown.some(item => item.isCoin) && (
                <div style={{width: '100%'}}>
                    <div className="result-stack-label">
                        {t.coins[language]}
                    </div>
                    <div className="result-grid-group">
                        {breakdown.filter(item => item.isCoin).map((item) => (
                            <div className="denom-grid-card" key={`coin-grid-${item.value}`}
                                 tabIndex={0}
                                 aria-label={`${item.count} × ${item.value} ${selectedCurrency?.symbol}`}>
                                <CoinIcon
                                    value={item.value}
                                    width={28}
                                    height={28}
                                    className={`denom-grid-img${currency === 'HUF' ? ' huf' : ''}`}
                                    ariaLabel={`${item.value} ${selectedCurrency?.symbol}`}
                                />
                                <div className="denom-grid-count"
                                     style={{fontSize: '0.93rem', padding: '0.18em 0.8em'}}>
                                    × {item.count}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{
                        textAlign: 'center',
                        color: '#888',
                        fontSize: '0.98rem',
                        marginTop: 6,
                        marginBottom: 8
                    }}>
                        {t.totalCoins[language]}: {breakdown.filter(item => item.isCoin).reduce((sum, item) => sum + item.count, 0)}
                    </div>
                </div>
            )}
        </div>
    </div>
);

export default ResultGridView;