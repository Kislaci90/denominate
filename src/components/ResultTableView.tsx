import React from 'react';
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow} from '@mui/material';
import BillIcon from './BillIcon';
import CoinIcon from './CoinIcon';
import type {DenominateResult} from "../logic/denomination";
import type {Currency} from "../logic/currencies";
import {formatNumberByLanguage} from "../utils/helper";
import {useTranslation} from "react-i18next";

type Props = {
    denominationResult: DenominateResult[];
    selectedCurrency: Currency;
    amount: number;
};

const ResultTableView: React.FC<Props> = ({
                                              denominationResult,
                                              selectedCurrency,
                                              amount,
                                          }) => {

    const {i18n, t} = useTranslation();

    const bills = denominationResult.filter(item => !item.denomination.isCoin);
    const coins = denominationResult.filter(item => item.denomination.isCoin);

    return (
        <>
            <div className="result-area-summary">
            <span
                className="result-amount-value">{formatNumberByLanguage(i18n.language, amount)} {selectedCurrency.symbol}</span> {t('resultSummary')}
            </div>
            <div className="result-area-divider"/>
            <TableContainer component={Paper}
                            sx={{borderRadius: 2, boxShadow: 0, mb: 2, overflow: 'hidden'}}>
                <Table size="medium" aria-label="denomination table">
                    <TableBody>
                        {bills.length > 0 && (
                            <TableRow>
                                <TableCell colSpan={1}
                                           className="result-table-header">{t('bills')}</TableCell>
                                <TableCell colSpan={1} align="right"
                                           className="result-table-header">{t('quantity')}</TableCell>
                                <TableCell colSpan={1} align="right" sx={{ display: { xs: 'none', sm: 'table-cell' } }}
                                           className="result-table-header">{t('subResult')}</TableCell>
                            </TableRow>
                        )}
                        {bills.map((item, idx) => (
                            <TableRow key={`bill-table-${item.denomination.value}`} className="result-table-row"
                                      style={{animationDelay: `${idx * 60}ms`}}>
                                <TableCell component="th" scope="row">
                                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1.25}}>
                                        <BillIcon
                                            value={item.denomination.value}
                                            color={item.denomination.color}
                                        />
                                        <span>{item.denomination.value} {selectedCurrency.symbol}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right" className="result-table-cell result-table-number">{item.count}</TableCell>
                                <TableCell align="right" className="result-table-cell result-table-number" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                                    {formatNumberByLanguage(i18n.language, item.denomination.value * item.count)} {selectedCurrency.symbol}
                                </TableCell>
                            </TableRow>
                        ))}
                        {coins.length > 0 && (
                            <TableRow>
                                <TableCell colSpan={1}
                                           className="result-table-header">{t('coins')}</TableCell>
                                <TableCell colSpan={1} align="right"
                                           className="result-table-header">{t('quantity')}</TableCell>
                                <TableCell colSpan={1} align="right" sx={{ display: { xs: 'none', sm: 'table-cell' } }}
                                           className="result-table-header">{t('subResult')}</TableCell>
                            </TableRow>
                        )}
                        {coins.map((item, idx) => (
                            <TableRow key={`coin-table-${item.denomination.value}`} className="result-table-row"
                                      style={{animationDelay: `${(bills.length + idx) * 60}ms`}}>
                                <TableCell component="th" scope="row">
                                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1.25}}>
                                        <CoinIcon
                                            value={item.denomination.value}
                                            color={item.denomination.color}
                                        />
                                        <span>{item.denomination.value} {selectedCurrency.symbol}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right" className="result-table-cell result-table-number">{item.count}</TableCell>
                                <TableCell align="right" className="result-table-cell result-table-number" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                                    {formatNumberByLanguage(i18n.language, item.denomination.value * item.count)} {selectedCurrency.symbol}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default ResultTableView;
