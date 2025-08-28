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

    return (
        <>
            <Box className={"result-area-summary"}>

            </Box>
            <div className="result-area-summary">
            <span
                className="result-amount-value">{formatNumberByLanguage(i18n.language, amount)} {selectedCurrency.symbol}</span> {t('resultSummary')}
            </div>
            <div className="result-area-divider"/>
            <TableContainer component={Paper}
                            sx={{borderRadius: 3, boxShadow: 0, mb: 2, overflow: 'hidden'}}>
                <Table size="medium" aria-label="denomination table">
                    <TableBody>
                        {denominationResult.filter(item => !item.denomination.isCoin).length > 0 && (
                            <TableRow>
                                <TableCell colSpan={1}
                                           className="result-table-header">{t('bills')}</TableCell>
                                <TableCell colSpan={1} align="right"
                                           className="result-table-header">{t('quantity')}</TableCell>
                                <TableCell colSpan={1} align="right" sx={{ display: { xs: 'none', sm: 'table-cell' } }}
                                           className="result-table-header">{t('subResult')}</TableCell>
                            </TableRow>
                        )}
                        {denominationResult.filter(item => !item.denomination.isCoin).map((item) => (
                            <TableRow key={`bill-table-${item.denomination.value}`} className="result-table-row">
                                <TableCell component="th" scope="row">
                                    <BillIcon
                                        value={item.denomination.value}
                                        color={item.denomination.color}
                                        width={40}
                                        height={25}
                                        style={{
                                            verticalAlign: 'middle',
                                            marginRight: 8,
                                            borderRadius: 6,
                                            background: '#fff'
                                        }}
                                    />
                                    {item.denomination.value} {selectedCurrency.symbol}
                                </TableCell>
                                <TableCell align="right" className="result-table-cell">{item.count}</TableCell>
                                <TableCell align="right" className="result-table-cell" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                                    {formatNumberByLanguage(i18n.language, item.denomination.value * item.count)} {selectedCurrency.symbol}
                                </TableCell>
                            </TableRow>
                        ))}
                        {denominationResult.filter(item => item.denomination.isCoin).length > 0 && (
                            <TableRow>
                                <TableCell colSpan={1}
                                           className="result-table-header">{t('coins')}</TableCell>
                                <TableCell colSpan={1} align="right"
                                           className="result-table-header">{t('quantity')}</TableCell>
                                <TableCell colSpan={1} align="right" sx={{ display: { xs: 'none', sm: 'table-cell' } }}
                                           className="result-table-header">{t('subResult')}</TableCell>
                            </TableRow>
                        )}
                        {denominationResult.filter(item => item.denomination.isCoin).map((item) => (
                            <TableRow key={`coin-table-${item.denomination.value}`} className="result-table-row">
                                <TableCell component="th" scope="row">
                                    <CoinIcon
                                        value={item.denomination.value}
                                        color={item.denomination.color}
                                        width={24}
                                        height={24}
                                        style={{
                                            verticalAlign: 'middle',
                                            marginRight: 8,
                                            borderRadius: 6,
                                            background: '#fff'
                                        }}
                                    />
                                    {item.denomination.value} {selectedCurrency.symbol}
                                </TableCell>
                                <TableCell align="right" className="result-table-cell">{item.count}</TableCell>
                                <TableCell align="right" className="result-table-cell" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
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