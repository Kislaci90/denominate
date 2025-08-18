import React from 'react';
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import BillIcon from './BillIcon';
import CoinIcon from './CoinIcon';

type BreakdownItem = {
    value: number;
    color: string;
    count: number;
    isCoin: boolean;
};

type Currency = {
    symbol: string;
};

type Props = {
    breakdown: BreakdownItem[];
    selectedCurrency?: Currency | undefined;
    formattedAmount: string;
    translate: any;
    language: string;
};

const ResultTableView: React.FC<Props> = ({
                                              breakdown,
                                              selectedCurrency,
                                              formattedAmount,
                                              translate,
                                              language
                                          }) => (
    <>
       <Box className={"result-area-summary"}>

       </Box>
        <div className="result-area-summary">
            <span className="result-amount-value">{formattedAmount}</span> {translate.resultSummary[language]('', selectedCurrency?.symbol)}
        </div>
        <div className="result-area-divider"/>
        <TableContainer component={Paper}
                        sx={{ borderRadius: 3, boxShadow: 0, mb: 2, overflow: 'hidden' }}>
            <Table size="medium" aria-label="denomination table">
                <TableBody>
                    {breakdown.filter(item => !item.isCoin).length > 0 && (
                        <TableRow>
                            <TableCell colSpan={1} className="result-table-header">{translate.bills[language]}</TableCell>
                            <TableCell colSpan={1} align="right" className="result-table-header">{translate.quantity[language]}</TableCell>
                            <TableCell colSpan={1} align="right" className="result-table-header">{translate.subResult[language]}</TableCell>
                        </TableRow>
                    )}
                    {breakdown.filter(item => !item.isCoin).map((item) => (
                        <TableRow key={`bill-table-${item.value}`} className="result-table-row">
                            <TableCell component="th" scope="row">
                                <BillIcon
                                    value={item.value}
                                    color={item.color}
                                    width={40}
                                    height={25}
                                    style={{
                                        verticalAlign: 'middle',
                                        marginRight: 8,
                                        borderRadius: 6,
                                        background: '#fff'
                                    }}
                                />
                                {item.value} {selectedCurrency?.symbol}
                            </TableCell>
                            <TableCell align="right" className="result-table-cell" >{item.count}</TableCell>
                            <TableCell align="right" className="result-table-cell" >
                                {new Intl.NumberFormat(language === 'de' ? 'de-DE' : language === 'hu' ? 'hu-HU' : 'en-US').format(item.value * item.count)} {selectedCurrency?.symbol}
                            </TableCell>
                        </TableRow>
                    ))}
                    {breakdown.filter(item => item.isCoin).length > 0 && (
                        <TableRow>
                            <TableCell colSpan={1} className="result-table-header">{translate.coins[language]}</TableCell>
                            <TableCell colSpan={1} align="right" className="result-table-header">{translate.quantity[language]}</TableCell>
                            <TableCell colSpan={1} align="right" className="result-table-header">{translate.subResult[language]}</TableCell>
                        </TableRow>
                    )}
                    {breakdown.filter(item => item.isCoin).map((item) => (
                        <TableRow key={`coin-table-${item.value}`} className="result-table-row">
                            <TableCell component="th" scope="row">
                                <CoinIcon
                                    value={item.value}
                                    color={item.color}
                                    width={24}
                                    height={24}
                                    style={{
                                        verticalAlign: 'middle',
                                        marginRight: 8,
                                        borderRadius: 6,
                                        background: '#fff'
                                    }}
                                />
                                {item.value} {selectedCurrency?.symbol}
                            </TableCell>
                            <TableCell align="right" className="result-table-cell" >{item.count}</TableCell>
                            <TableCell align="right" className="result-table-cell" >
                                {new Intl.NumberFormat(language === 'de' ? 'de-DE' : language === 'hu' ? 'hu-HU' : 'en-US').format(item.value * item.count)} {selectedCurrency?.symbol}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>
);

export default ResultTableView;