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
                    {/* Bills */}
                    {breakdown.filter(item => !item.isCoin).length > 0 && (
                        <TableRow>
                            <TableCell colSpan={3} sx={{
                                fontWeight: 700,
                                color: 'primary.main',
                                bgcolor: '#f3f4fa',
                                fontSize: '1.04em',
                                borderTop: '2px solid #e0e7ff',
                                borderBottom: '1.5px solid #e0e7ff',
                                borderRadius: '12px 12px 0 0'
                            }}>{translate.bills[language]}</TableCell>
                        </TableRow>
                    )}
                    {breakdown.filter(item => !item.isCoin).map((item) => (
                        <TableRow key={`bill-table-${item.value}`}
                                  sx={{
                                      '&:hover': { background: '#f8f9fb' },
                                      transition: 'background 0.15s',
                                  }}
                        >
                            <TableCell component="th" scope="row"
                                       sx={{ fontWeight: 500, fontSize: '1.04em', py: 1.1 }}>
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
                            <TableCell align="right" sx={{
                                fontWeight: 600,
                                fontSize: '1.04em',
                                py: 1.1
                            }}>{item.count}</TableCell>
                            <TableCell align="right"
                                       sx={{ fontWeight: 600, fontSize: '1.04em', py: 1.1 }}>
                                {new Intl.NumberFormat(language === 'de' ? 'de-DE' : language === 'hu' ? 'hu-HU' : 'en-US').format(item.value * item.count)} {selectedCurrency?.symbol}
                            </TableCell>
                        </TableRow>
                    ))}
                    {/* Coins */}
                    {breakdown.filter(item => item.isCoin).length > 0 && (
                        <TableRow>
                            <TableCell colSpan={3} sx={{
                                fontWeight: 700,
                                color: 'primary.main',
                                bgcolor: '#f3f4fa',
                                fontSize: '1.04em',
                                borderTop: '2px solid #e0e7ff',
                                borderBottom: '1.5px solid #e0e7ff',
                                borderRadius: '12px 12px 0 0'
                            }}>{translate.coins[language]}</TableCell>
                        </TableRow>
                    )}
                    {breakdown.filter(item => item.isCoin).map((item) => (
                        <TableRow key={`coin-table-${item.value}`}
                                  sx={{
                                      '&:hover': { background: '#f8f9fb' },
                                      transition: 'background 0.15s',
                                  }}
                        >
                            <TableCell component="th" scope="row"
                                       sx={{ fontWeight: 500, fontSize: '1.04em', py: 1.1 }}>
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
                            <TableCell align="right" sx={{
                                fontWeight: 600,
                                fontSize: '1.04em',
                                py: 1.1
                            }}>{item.count}</TableCell>
                            <TableCell align="right"
                                       sx={{ fontWeight: 600, fontSize: '1.04em', py: 1.1 }}>
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