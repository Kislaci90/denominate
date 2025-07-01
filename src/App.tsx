// If you see a type error for MUI, run: npm install --save-dev @types/react @types/react-dom
import React, { useState, useEffect, useRef } from 'react';
import { AppBar, Toolbar, Typography, TextField, MenuItem, Select, FormControl, InputLabel, Box, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Container, InputAdornment, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, Checkbox, FormGroup, FormControlLabel, IconButton, ListSubheader, Divider, Chip, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import EuroIcon from '@mui/icons-material/Euro';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LanguageIcon from '@mui/icons-material/Language';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Tooltip from '@mui/material/Tooltip';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SettingsIcon from '@mui/icons-material/Settings';
import Cookies from 'js-cookie';
import './App.css';
import StarIcon from '@mui/icons-material/Star';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalculateIcon from '@mui/icons-material/Calculate';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import TableRowsIcon from '@mui/icons-material/TableRows';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import BillIcon from './BillIcon';
import CoinIcon from './CoinIcon';

const currencies = [
  { code: 'EUR', label: 'Euro', symbol: '€', icon: <EuroIcon />, flag: '🇪🇺' },
  { code: 'USD', label: 'Dollar', symbol: '$', icon: <AttachMoneyIcon />, flag: '🇺🇸' },
  { code: 'HUF', label: 'Forint', symbol: 'Ft', icon: <AccountBalanceWalletIcon />, flag: '🇭🇺' },
  // Future: add more currencies with icons
];

const languages = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
  { code: 'hu', label: 'Magyar' },
  // Future: add more languages
];

// Denominations for each currency
const EUR_DENOMINATIONS = [500, 200, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01];
const USD_DENOMINATIONS = [100, 50, 20, 10, 5, 2, 1, 0.5, 0.25, 0.1, 0.05, 0.01];
const HUF_DENOMINATIONS = [20000, 10000, 5000, 2000, 1000, 500, 200, 100, 50, 20, 10, 5];

function denominate(amount: number, currency: string): { value: number; count: number; isCoin: boolean }[] {
  let denominations: number[] = [];
  let coinStartIdx = 0;
  switch (currency) {
    case 'EUR':
      denominations = EUR_DENOMINATIONS;
      coinStartIdx = denominations.findIndex(d => d < 5);
      break;
    case 'USD':
      denominations = USD_DENOMINATIONS;
      coinStartIdx = denominations.findIndex(d => d < 1);
      break;
    case 'HUF':
      denominations = HUF_DENOMINATIONS;
      coinStartIdx = denominations.findIndex(d => d <= 200);
      break;
    default:
      return [];
  }
  let remaining = currency === 'EUR' || currency === 'USD' ? Math.round(amount * 100) : amount;
  const result: { value: number; count: number; isCoin: boolean }[] = [];
  for (let i = 0; i < denominations.length; i++) {
    const denom = denominations[i];
    const denomValue = (currency === 'EUR' || currency === 'USD') ? Math.round(denom * 100) : denom;
    const count = Math.floor(remaining / denomValue);
    if (count > 0) {
      result.push({ value: denom, count, isCoin: i >= coinStartIdx });
      remaining -= count * denomValue;
    }
  }
  return result;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#6C63FF', // Blue-violet
      contrastText: '#fff',
    },
    secondary: {
      main: '#FF6F91', // Soft pink
    },
    background: {
      default: '#F8F9FB', // Off-white
      paper: '#fff',
    },
    info: {
      main: '#6C63FF',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#6C63FF',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#fff',
          border: '1.5px solid #ecebfa',
          boxShadow: '0 8px 32px 0 rgba(108, 99, 255, 0.10)',
        },
      },
    },
  },
});

// Helper to get SVG image path for a denomination
function getDenomImage(_currency: string, _value: number, isCoin: boolean) {
  return isCoin ? '/coin.svg' : '/bill.svg';
}

const getDenominationsForCurrency = (cur: string) => {
  switch (cur) {
    case 'EUR': return EUR_DENOMINATIONS;
    case 'USD': return USD_DENOMINATIONS;
    case 'HUF': return HUF_DENOMINATIONS;
    default: return [];
  }
};

function denominateFiltered(amount: number, currency: string, enabled: number[]): { value: number; count: number; isCoin: boolean }[] {
  let denominations: number[] = getDenominationsForCurrency(currency).filter((d: number) => enabled.includes(d));
  let coinStartIdx = 0;
  switch (currency) {
    case 'EUR': coinStartIdx = denominations.findIndex(d => d < 5); break;
    case 'USD': coinStartIdx = denominations.findIndex(d => d < 1); break;
    case 'HUF': coinStartIdx = denominations.findIndex(d => d <= 200); break;
    default: return [];
  }
  let remaining = currency === 'EUR' || currency === 'USD' ? Math.round(amount * 100) : amount;
  const result: { value: number; count: number; isCoin: boolean }[] = [];
  for (let i = 0; i < denominations.length; i++) {
    const denom = denominations[i];
    const denomValue = (currency === 'EUR' || currency === 'USD') ? Math.round(denom * 100) : denom;
    const count = Math.floor(remaining / denomValue);
    if (count > 0) {
      result.push({ value: denom, count, isCoin: i >= coinStartIdx });
      remaining -= count * denomValue;
    }
  }
  return result;
}

// Types for translation functions
type AmountSymbolFn = (amt: string | number, sym: string) => string;

// Translation object
const t: {
  heroTitle: Record<string, string>,
  heroSubtitle: Record<string, string>,
  features: Array<{ icon: React.JSX.Element, title: Record<string, string>, desc: Record<string, string> }>,
  inputLabel: Record<string, string>,
  inputTooltip: Record<string, string>,
  clear: Record<string, string>,
  denominate: Record<string, string>,
  denominateHelper: Record<string, string>,
  denominateHelperInvalid: Record<string, string>,
  customizeTitle: Record<string, string>,
  customizeDesc: Record<string, string>,
  bills: Record<string, string>,
  coins: Record<string, string>,
  result: Record<string, string>,
  resultSummary: Record<string, AmountSymbolFn>,
  totalBills: Record<string, string>,
  totalCoins: Record<string, string>,
  history: Record<string, string>,
  clearHistory: Record<string, string>,
  noBreakdown: Record<string, string>,
  loadFromHistory: Record<string, AmountSymbolFn>,
  enterToSee: Record<string, string>,
} = {
  heroTitle: {
    en: 'Denomination Calculator',
    de: 'Stückelungsrechner',
    hu: 'Címlet Kalkulátor',
  },
  heroSubtitle: {
    en: 'Instantly break down any amount into the optimal set of bills and coins. Fast, customizable, and accessible for EUR, USD, and HUF.',
    de: 'Teile jeden Betrag sofort in die optimale Kombination aus Scheinen und Münzen auf. Schnell, anpassbar und barrierefrei für EUR, USD und HUF.',
    hu: 'Bármilyen összeget azonnal bonts le a legoptimálisabb bankjegyekre és érmékre. Gyors, testreszabható és akadálymentes EUR, USD és HUF esetén.',
  },
  features: [
    {
      icon: <SpeedIcon className="landing-feature-icon" />, 
      title: { en: 'Instant, Accurate Results', de: 'Sofortige, präzise Ergebnisse', hu: 'Azonali, pontos eredmények' },
      desc: {
        en: 'Get the optimal breakdown of any amount in EUR, USD, or HUF—instantly and with perfect accuracy.',
        de: 'Erhalte sofort die optimale Aufteilung eines Betrags in EUR, USD oder HUF – schnell und präzise.',
        hu: 'Kapd meg bármely összeg optimális bontását EUR, USD vagy HUF pénznemben – azonnal és pontosan.',
      }
    },
    {
      icon: <SettingsIcon className="landing-feature-icon" />, 
      title: { en: 'Customizable & Persistent', de: 'Anpassbar & dauerhaft', hu: 'Testreszabható & megőrzött beállítások' },
      desc: {
        en: 'Choose which bills and coins are available. Your preferences and history are saved for next time.',
        de: 'Wähle verfügbare Scheine und Münzen. Deine Einstellungen und Historie werden gespeichert.',
        hu: 'Válaszd ki, mely címletek elérhetők. Beállításaid és előzményeid elmentésre kerülnek.',
      }
    },
    {
      icon: <EmojiObjectsIcon className="landing-feature-icon" />, 
      title: { en: 'Modern, Accessible Design', de: 'Modernes, barrierefreies Design', hu: 'Modern, akadálymentes dizájn' },
      desc: {
        en: 'Enjoy a beautiful, accessible interface with keyboard navigation, high contrast, and responsive layout.',
        de: 'Genieße eine schöne, barrierefreie Oberfläche mit Tastaturnavigation, hohem Kontrast und responsivem Layout.',
        hu: 'Élvezd a szép, akadálymentes felületet billentyűzetes navigációval, nagy kontraszttal és reszponzív elrendezéssel.',
      }
    },
  ],
  inputLabel: { en: 'Amount', de: 'Betrag', hu: 'Összeg' },
  inputTooltip: { en: 'Enter the amount you want to denominate', de: 'Gib den zu stückelnden Betrag ein', hu: 'Add meg a felbontandó összeget' },
  clear: { en: 'Clear', de: 'Löschen', hu: 'Törlés' },
  denominate: { en: 'Denominate', de: 'Stückeln', hu: 'Felbontás' },
  denominateHelper: {
    en: 'Press Enter or click Denominate to calculate',
    de: 'Drücke Enter oder klicke auf Stückeln zum Berechnen',
    hu: 'Nyomj Entert vagy kattints a Felbontásra a számításhoz',
  },
  denominateHelperInvalid: {
    en: 'Enter a valid amount to continue',
    de: 'Gib einen gültigen Betrag ein',
    hu: 'Adj meg egy érvényes összeget a folytatáshoz',
  },
  customizeTitle: { en: 'Customize Bills & Coins', de: 'Scheine & Münzen anpassen', hu: 'Címletek testreszabása' },
  customizeDesc: {
    en: 'Click bills or coins below to enable or disable them for denomination.',
    de: 'Klicke auf Scheine oder Münzen, um sie für die Stückelung zu aktivieren oder deaktivieren.',
    hu: 'Kattints a címletekre, hogy engedélyezd vagy letiltsd őket a felbontáshoz.',
  },
  bills: { en: 'Bills', de: 'Scheine', hu: 'Bankjegyek' },
  coins: { en: 'Coins', de: 'Münzen', hu: 'Érmék' },
  result: { en: 'Result', de: 'Ergebnis', hu: 'Eredmény' },
  resultSummary: {
    en: (amt: string | number, sym: string) => `${amt} ${sym} can be split into:`,
    de: (amt: string | number, sym: string) => `${amt} ${sym} kann aufgeteilt werden in:`,
    hu: (amt: string | number, sym: string) => `${amt} ${sym} felbontható a következőkre:`,
  },
  totalBills: { en: 'Total bills', de: 'Anzahl Scheine', hu: 'Bankjegyek összesen' },
  totalCoins: { en: 'Total coins', de: 'Anzahl Münzen', hu: 'Érmék összesen' },
  history: { en: 'History', de: 'Verlauf', hu: 'Előzmények' },
  clearHistory: { en: 'Clear', de: 'Löschen', hu: 'Törlés' },
  noBreakdown: { en: 'No breakdown', de: 'Keine Aufteilung', hu: 'Nincs bontás' },
  loadFromHistory: {
    en: (amt: string | number, sym: string) => `Load ${amt} ${sym} from history`,
    de: (amt: string | number, sym: string) => `${amt} ${sym} aus dem Verlauf laden`,
    hu: (amt: string | number, sym: string) => `${amt} ${sym} betöltése az előzményekből`,
  },
  enterToSee: {
    en: 'Enter an amount and currency to see the breakdown.',
    de: 'Gib einen Betrag und eine Währung ein, um die Aufteilung zu sehen.',
    hu: 'Adj meg egy összeget és pénznemet a bontáshoz.',
  },
};

function App() {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('EUR');
  const [language, setLanguage] = useState('en');
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [enabledDenoms, setEnabledDenoms] = useState<number[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [pendingAmount, setPendingAmount] = useState('');
  const [pendingCurrency, setPendingCurrency] = useState('EUR');
  const amountInputRef = useRef<HTMLInputElement>(null);
  const [resultView, setResultView] = useState<'grid' | 'table'>('grid');

  // Helper to format with thousands separators
  function formatAmountInput(value: string, lang: string) {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    if (!digits) return '';
    return new Intl.NumberFormat(lang === 'de' ? 'de-DE' : 'en-US').format(Number(digits));
  }

  // Handler for input change
  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, '');
    setPendingAmount(formatAmountInput(raw, language));
  }

  function handleCurrencyChange(e: any) {
    setPendingCurrency(e.target.value as string);
  }

  function handleDenominate() {
    setAmount(pendingAmount);
    setCurrency(pendingCurrency);
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleDenominate();
    }
  }

  // Parse and denominate
  const parsedAmount = parseInt(amount.replace(/\D/g, ''), 10);
  const isValid = !isNaN(parsedAmount) && parsedAmount > 0;
  let breakdown: { value: number; count: number; isCoin: boolean }[] = [];
  if (isValid) {
    breakdown = denominateFiltered(parsedAmount, currency, enabledDenoms);
  }
  const selectedCurrency = currencies.find(c => c.code === currency);

  // Format amount for visualization
  const formattedAmount = amount
    ? new Intl.NumberFormat(language === 'de' ? 'de-DE' : 'en-US').format(Number(amount.replace(/\D/g, '')))
    : '';

  // Open/close dialog
  const handleOpenCustomize = () => setCustomizeOpen(true);
  const handleCloseCustomize = () => setCustomizeOpen(false);

  // Load enabled denominations from cookies or default (all enabled)
  useEffect(() => {
    const cookieKey = `denoms_${currency}`;
    const cookie = Cookies.get(cookieKey);
    let denoms: number[] = [];
    switch (currency) {
      case 'EUR': denoms = EUR_DENOMINATIONS; break;
      case 'USD': denoms = USD_DENOMINATIONS; break;
      case 'HUF': denoms = HUF_DENOMINATIONS; break;
    }
    if (cookie) {
      try {
        const parsed = JSON.parse(cookie);
        if (Array.isArray(parsed) && parsed.every((v) => typeof v === 'number')) {
          setEnabledDenoms(parsed);
          return;
        }
      } catch {}
    }
    setEnabledDenoms(denoms);
  }, [currency]);

  // Save enabled denominations to cookies
  const saveEnabledDenoms = (newDenoms: number[]) => {
    setEnabledDenoms(newDenoms);
    Cookies.set(`denoms_${currency}`, JSON.stringify(newDenoms), { expires: 365 });
  };

  // Load history from cookies on mount
  useEffect(() => {
    const cookie = Cookies.get('denom_history');
    if (cookie) {
      try {
        const parsed = JSON.parse(cookie);
        if (Array.isArray(parsed)) setHistory(parsed);
      } catch {}
    }
  }, []);

  // Add to history on valid calculation
  useEffect(() => {
    if (!isValid || !amount) return;
    const entry = {
      amount: parsedAmount,
      formatted: amount,
      currency,
      flag: selectedCurrency?.flag,
      symbol: selectedCurrency?.symbol,
      breakdown,
      time: new Date().toISOString(),
    };
    setHistory(prev => {
      const newHist = [entry, ...prev.filter(e => !(e.amount === entry.amount && e.currency === entry.currency)).slice(0, 9)];
      Cookies.set('denom_history', JSON.stringify(newHist), { expires: 365 });
      return newHist;
    });
    // eslint-disable-next-line
  }, [parsedAmount, currency]);

  // For pending input
  const pendingParsedAmount = parseInt((pendingAmount || amount).replace(/\D/g, ''), 10);
  const pendingIsValid = !isNaN(pendingParsedAmount) && pendingParsedAmount > 0;

  const filteredDenominations = getDenominationsForCurrency(currency).filter((d: number) => enabledDenoms.includes(d));

  // Determine if any bill or coin is disabled for the current currency
  const chipCurrency = pendingCurrency || currency;
  const denoms = getDenominationsForCurrency(chipCurrency);
  const anyDisabled = denoms.some(d => !enabledDenoms.includes(d));

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" elevation={2} sx={{ 
        background: 'linear-gradient(135deg, #6C63FF 0%, #5A52E5 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalculateIcon sx={{ fontSize: 28, color: 'white' }} />
            <Typography variant="h6" component="div" sx={{ 
              fontWeight: 700, 
              letterSpacing: 0.5,
              display: { xs: 'none', sm: 'block' }
            }}>
              {t.heroTitle[language]}
            </Typography>
            <Typography variant="h6" component="div" sx={{ 
              fontWeight: 700, 
              letterSpacing: 0.5,
              display: { xs: 'block', sm: 'none' }
            }}>
              DenomCalc
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                variant="standard"
                disableUnderline
                sx={{ 
                  color: 'white',
                  fontWeight: 600,
                  '& .MuiSelect-select': { 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 0.5,
                    py: 0.5
                  },
                  '& .MuiSvgIcon-root': { color: 'white' }
                }}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <LanguageIcon sx={{ fontSize: 18 }} />
                    {languages.find(l => l.code === selected)?.label}
                  </Box>
                )}
              >
                {languages.map((lang) => (
                  <MenuItem key={lang.code} value={lang.code} sx={{ py: 1 }}>
                    {lang.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Toolbar>
      </AppBar>

      <div className="landing-hero fade-in">
        <div className="landing-title">
          {t.heroTitle[language]}
        </div>
        <div className="landing-subtitle">
          {t.heroSubtitle[language]}
        </div>
        <div className="landing-features fade-in">
          {t.features.map((feature, index) => (
            <div className="landing-feature" key={index}>
              {feature.icon}
              <div className="landing-feature-title">
                {feature.title[language]}
              </div>
              <div className="landing-feature-desc">
                {feature.desc[language]}
              </div>
            </div>
          ))}
        </div>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: 2,
          width: '100%',
          maxWidth: 600,
          mx: 'auto',
          px: 2
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center'
          }}>
            <Tooltip title={t.inputTooltip[language]} arrow placement="top">
              <TextField
                className="amount-input"
                label={t.inputLabel[language]}
                value={pendingAmount || amount}
                onChange={handleAmountChange}
                onKeyDown={handleInputKeyDown}
                sx={{ 
                  flex: 1, 
                  minWidth: { xs: 260, sm: 340, md: 400 },
                  maxWidth: 500,
                  '& .MuiInputLabel-root': {
                    fontWeight: 600,
                    color: 'text.secondary'
                  },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                        borderWidth: 2
                      }
                    },
                    '&.Mui-focused': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                        borderWidth: 2
                      }
                    }
                  }
                }}
                inputRef={amountInputRef}
                aria-describedby="amount-helper-text"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ p: 0 }}>
                      <Select
                        value={pendingCurrency || currency}
                        onChange={handleCurrencyChange}
                        variant="standard"
                        disableUnderline
                        sx={{ 
                          minWidth: 70, 
                          fontWeight: 600, 
                          fontSize: '1.1rem', 
                          pl: 0.5, 
                          pr: 0.5, 
                          '& .MuiSelect-select': { 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '0.3em' 
                          } 
                        }}
                        renderValue={selected => {
                          const c = currencies.find(cur => cur.code === selected);
                          return c ? <><span style={{ fontSize: 20, marginRight: 4 }}>{c.flag}</span>{c.code}</> : selected;
                        }}
                        aria-label="Select currency"
                      >
                        {currencies.map(c => (
                          <MenuItem key={c.code} value={c.code}>
                            <span style={{ fontSize: 20, marginRight: 8 }}>{c.flag}</span>
                            {c.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {pendingAmount || amount ? (
                        <Tooltip title={t.clear[language]} arrow>
                          <IconButton 
                            size="small" 
                            onClick={() => { setPendingAmount(''); setAmount(''); }}
                            aria-label={t.clear[language]}
                            sx={{ 
                              '&:hover': { 
                                backgroundColor: 'rgba(108, 99, 255, 0.1)' 
                              }
                            }}
                          >
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      ) : null}
                      <Tooltip title="Enter numbers only, use spaces for thousands" arrow>
                        <InfoOutlinedIcon color="action" fontSize="small" />
                      </Tooltip>
                    </InputAdornment>
                  ),
                  inputProps: { 
                    inputMode: 'numeric', 
                    pattern: '[0-9 ]*',
                    'aria-describedby': 'amount-helper-text'
                  }
                }}
              />
            </Tooltip>
          </Box>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ 
                borderRadius: 3, 
                fontWeight: 700, 
                px: 5, 
                py: 2, 
                boxShadow: 3, 
                minWidth: { xs: 200, sm: 240 }, 
                fontSize: '1.25rem', 
                height: 64,
                mt: 1,
                '&:hover': {
                  boxShadow: 4,
                  transform: 'translateY(-1px)',
                  transition: 'all 0.2s ease'
                },
                '&:disabled': {
                  opacity: 0.6,
                  transform: 'none'
                }
              }}
              disabled={!pendingIsValid}
              onClick={handleDenominate}
              aria-describedby="denominate-helper-text"
            >
              {t.denominate[language]}
            </Button>
          </Box>
          <Typography 
            id="amount-helper-text" 
            variant="caption" 
            sx={{ 
              color: 'text.secondary',
              textAlign: 'center',
              fontSize: '0.85rem'
            }}
          >
            {pendingIsValid ? t.denominateHelper[language] : t.denominateHelperInvalid[language]}
          </Typography>
        </Box>
        <Accordion defaultExpanded sx={{
          maxWidth: 520,
          width: '100%',
          margin: '18px auto 0px auto',
          borderRadius: '28px',
          boxShadow: '0 8px 32px 0 rgba(108,99,255,0.16)',
          bgcolor: 'rgba(255,255,255,0.85)',
          border: '1.5px solid #e0e7ff',
          padding: '1.2rem 1.2rem 1.2rem 1.2rem',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          '&:before': { display: 'none' },
          overflow: 'visible',
        }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ fontSize: 26, color: '#6C63FF' }} />}
            sx={{
              fontWeight: 700,
              fontSize: '1.01rem',
              color: 'primary.main',
              bgcolor: 'transparent',
              borderRadius: '24px',
              px: 0,
              py: 0.5,
              minHeight: 0,
              mb: 1.2,
              '& .MuiAccordionSummary-content': { my: 0.5, display: 'flex', alignItems: 'center', gap: 1 }
            }}
          >
            <SettingsIcon sx={{ fontSize: 20, color: '#6C63FF', mr: 1 }} />
            {t.customizeTitle[language]}
            {anyDisabled && (
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 1, color: 'info.main', fontWeight: 400, fontSize: '0.60em', gap: 0.5, opacity: 0.85 }}>
                <InfoOutlinedIcon sx={{ fontSize: 16, color: 'info.main', mb: '1px' }} />
                <span>
                  {language === 'hu' ? 'Egy vagy több címlet le van tiltva.' : language === 'de' ? 'Mindestens ein Schein oder eine Münze ist deaktiviert.' : 'One or more denominations are disabled.'}
                </span>
              </Box>
            )}
          </AccordionSummary>
          <Divider sx={{ m: 0, borderColor: '#e0e7ff', mb: 2 }} />
          <AccordionDetails sx={{ px: 0, py: 0, bgcolor: 'transparent' }}>
            <div style={{ textAlign: 'center', margin: '10px 0 0 0', color: '#555', fontSize: '1.05rem', fontWeight: 500 }}>
              {t.customizeDesc[language]}
            </div>
            {(() => {
              const chipCurrency = pendingCurrency || currency;
              const denoms = getDenominationsForCurrency(chipCurrency);
              let coinStartIdx = 0;
              if (chipCurrency === 'EUR') coinStartIdx = denoms.findIndex(d => d < 5);
              else if (chipCurrency === 'USD') coinStartIdx = denoms.findIndex(d => d < 1);
              else if (chipCurrency === 'HUF') coinStartIdx = denoms.findIndex(d => d <= 200);
              const bills = denoms.slice(0, coinStartIdx === -1 ? denoms.length : coinStartIdx);
              const coins = denoms.slice(coinStartIdx === -1 ? denoms.length : coinStartIdx);
              const chipCurrencyObj = currencies.find(c => c.code === chipCurrency);
              return (
                <div>
                  <div style={{ margin: '22px 0 8px 0', textAlign: 'center' }}>
                    <span style={{ fontWeight: 700, color: '#6C63FF', fontSize: '1.08rem', letterSpacing: 1 }}>
                      {t.bills[language]}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginBottom: 18 }}>
                    {bills.map(denom => (
                      <Chip
                        key={denom}
                        label={String(denom)}
                        color={enabledDenoms.includes(denom) ? 'primary' : 'default'}
                        variant={enabledDenoms.includes(denom) ? 'filled' : 'outlined'}
                        size="small"
                        onClick={() => {
                          if (enabledDenoms.includes(denom)) {
                            saveEnabledDenoms(enabledDenoms.filter(d => d !== denom));
                          } else {
                            saveEnabledDenoms([...enabledDenoms, denom]);
                          }
                        }}
                        sx={{
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          opacity: enabledDenoms.includes(denom) ? 1 : 0.5,
                          px: 1,
                          py: 0.2,
                          borderRadius: 2,
                          cursor: 'pointer',
                          userSelect: 'none',
                          transition: 'background 0.15s',
                          boxShadow: enabledDenoms.includes(denom) ? 2 : 0,
                          '&:hover': { background: enabledDenoms.includes(denom) ? '#6C63FF22' : '#eee' }
                        }}
                        icon={chipCurrencyObj?.icon}
                      />
                    ))}
                  </div>
                  <div style={{ margin: '28px 0 8px 0', textAlign: 'center' }}>
                    <span style={{ fontWeight: 700, color: '#6C63FF', fontSize: '1.08rem', letterSpacing: 1 }}>
                      {t.coins[language]}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
                    {coins.map(denom => (
                      <Chip
                        key={denom}
                        label={String(denom)}
                        color={enabledDenoms.includes(denom) ? 'primary' : 'default'}
                        variant={enabledDenoms.includes(denom) ? 'filled' : 'outlined'}
                        size="small"
                        onClick={() => {
                          if (enabledDenoms.includes(denom)) {
                            saveEnabledDenoms(enabledDenoms.filter(d => d !== denom));
                          } else {
                            saveEnabledDenoms([...enabledDenoms, denom]);
                          }
                        }}
                        sx={{
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          opacity: enabledDenoms.includes(denom) ? 1 : 0.5,
                          px: 1,
                          py: 0.2,
                          borderRadius: 2,
                          cursor: 'pointer',
                          userSelect: 'none',
                          transition: 'background 0.15s',
                          boxShadow: enabledDenoms.includes(denom) ? 2 : 0,
                          '&:hover': { background: enabledDenoms.includes(denom) ? '#6C63FF22' : '#eee' }
                        }}
                        icon={chipCurrencyObj?.icon}
                      />
                    ))}
                  </div>
                </div>
              );
            })()}
          </AccordionDetails>
        </Accordion>
      </div>
      <Container maxWidth="sm" sx={{ mt: 2 }}>
        <Card elevation={8} className="result-area-card">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EmojiObjectsIcon color="primary" sx={{ fontSize: 28, mr: 1 }} />
              <Typography variant="h5" fontWeight={700} sx={{ letterSpacing: 0.5 }}>
                {t.result[language]}
              </Typography>
            </Box>
            <ToggleButtonGroup
              value={resultView}
              exclusive
              onChange={(_, val) => val && setResultView(val)}
              size="small"
              sx={{ ml: 2, background: '#f8f9fb', borderRadius: 2 }}
              aria-label="Result view switch"
            >
              <ToggleButton value="grid" aria-label="Grid view" sx={{ px: 1.5 }}>
                <ViewModuleIcon fontSize="small" />
              </ToggleButton>
              <ToggleButton value="table" aria-label="Table view" sx={{ px: 1.5 }}>
                <TableRowsIcon fontSize="small" />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          {isValid ? (
            resultView === 'grid' ? (
              <>
                <div className="result-area-summary">
                  {language === 'de' && (
                    <>
                      <span className="result-amount-value">{formattedAmount}</span> {selectedCurrency?.symbol} kann aufgeteilt werden in:
                    </>
                  )}
                  {language === 'hu' && (
                    <>
                      <span className="result-amount-value">{formattedAmount}</span> {selectedCurrency?.symbol} felbontható a következőkre:
                    </>
                  )}
                  {language === 'en' && (
                    <>
                      <span className="result-amount-value">{formattedAmount}</span> {selectedCurrency?.symbol} can be split into:
                    </>
                  )}
                </div>
                <div className="result-area-divider" />
                <div className="result-stack-area">
                  {/* Bills group (grid) */}
                  {breakdown.some(item => !item.isCoin) && (
                    <div style={{ width: '100%' }}>
                      <div className="result-stack-label">
                        {t.bills[language]}
                      </div>
                      <div className="result-grid-group">
                        {breakdown.filter(item => !item.isCoin).map((item, idx) => (
                          <div className="denom-grid-card" key={`bill-grid-${item.value}`}
                               tabIndex={0} aria-label={`${item.count} × ${item.value} ${selectedCurrency?.symbol}`}>
                            <BillIcon
                              value={item.value}
                              width={40}
                              height={24}
                              className={`denom-grid-img${currency === 'HUF' ? ' huf' : ''}`}
                              ariaLabel={`${item.value} ${selectedCurrency?.symbol}`}
                            />
                            <div className="denom-grid-count" style={{ fontSize: '0.93rem', padding: '0.18em 0.8em' }}>
                              × {item.count}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div style={{ textAlign: 'center', color: '#888', fontSize: '0.98rem', marginTop: 6, marginBottom: 18 }}>
                        {t.totalBills[language]}: {breakdown.filter(item => !item.isCoin).reduce((sum, item) => sum + item.count, 0)}
                      </div>
                    </div>
                  )}
                  {/* Coins group (grid) */}
                  {breakdown.some(item => item.isCoin) && (
                    <div style={{ width: '100%' }}>
                      <div className="result-stack-label">
                        {t.coins[language]}
                      </div>
                      <div className="result-grid-group">
                        {breakdown.filter(item => item.isCoin).map((item, idx) => (
                          <div className="denom-grid-card" key={`coin-grid-${item.value}`}
                               tabIndex={0} aria-label={`${item.count} × ${item.value} ${selectedCurrency?.symbol}`}>
                            <CoinIcon
                              value={item.value}
                              width={28}
                              height={28}
                              className={`denom-grid-img${currency === 'HUF' ? ' huf' : ''}`}
                              ariaLabel={`${item.value} ${selectedCurrency?.symbol}`}
                            />
                            <div className="denom-grid-count" style={{ fontSize: '0.93rem', padding: '0.18em 0.8em' }}>
                              × {item.count}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div style={{ textAlign: 'center', color: '#888', fontSize: '0.98rem', marginTop: 6, marginBottom: 8 }}>
                        {t.totalCoins[language]}: {breakdown.filter(item => item.isCoin).reduce((sum, item) => sum + item.count, 0)}
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              // Table view
              <>
                <div className="result-area-summary">
                  {language === 'de' && (
                    <>
                      <span className="result-amount-value">{formattedAmount}</span> {selectedCurrency?.symbol} kann aufgeteilt werden in:
                    </>
                  )}
                  {language === 'hu' && (
                    <>
                      <span className="result-amount-value">{formattedAmount}</span> {selectedCurrency?.symbol} felbontható a következőkre:
                    </>
                  )}
                  {language === 'en' && (
                    <>
                      <span className="result-amount-value">{formattedAmount}</span> {selectedCurrency?.symbol} can be split into:
                    </>
                  )}
                </div>
                <div className="result-area-divider" />
                <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 0, mb: 2, overflow: 'hidden' }}>
                  <Table size="small" aria-label="denomination table">
                    <TableHead>
                      <TableRow sx={{ background: '#f8f9fb' }}>
                        <TableCell sx={{ fontWeight: 700, fontSize: '1.08em', borderBottom: '2px solid #e0e7ff' }}>{t.bills[language]} / {t.coins[language]}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 700, fontSize: '1.08em', borderBottom: '2px solid #e0e7ff' }}>{t.denominate[language]}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 700, fontSize: '1.08em', borderBottom: '2px solid #e0e7ff' }}>{t.totalBills[language]}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* Bills */}
                      {breakdown.filter(item => !item.isCoin).length > 0 && (
                        <TableRow>
                          <TableCell colSpan={3} sx={{ fontWeight: 700, color: 'primary.main', bgcolor: '#f3f4fa', fontSize: '1.04em', borderTop: '2px solid #e0e7ff', borderBottom: '1.5px solid #e0e7ff', borderRadius: '12px 12px 0 0' }}>{t.bills[language]}</TableCell>
                        </TableRow>
                      )}
                      {breakdown.filter(item => !item.isCoin).map((item, idx) => (
                        <TableRow key={`bill-table-${item.value}`}
                          sx={{
                            '&:hover': { background: '#f8f9fb' },
                            transition: 'background 0.15s',
                          }}
                        >
                          <TableCell component="th" scope="row" sx={{ fontWeight: 500, fontSize: '1.04em', py: 1.1 }}>
                            <BillIcon
                              value={item.value}
                              width={32}
                              height={19}
                              style={{ verticalAlign: 'middle', marginRight: 8, borderRadius: 6, background: '#fff' }}
                              ariaLabel={`${item.value} ${selectedCurrency?.symbol}`}
                            />
                            {item.value} {selectedCurrency?.symbol}
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600, fontSize: '1.04em', py: 1.1 }}>{item.count}</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 500, fontSize: '1.04em', py: 1.1 }}>
                            {new Intl.NumberFormat(language === 'de' ? 'de-DE' : language === 'hu' ? 'hu-HU' : 'en-US').format(item.value * item.count)} {selectedCurrency?.symbol}
                          </TableCell>
                        </TableRow>
                      ))}
                      {/* Coins */}
                      {breakdown.filter(item => item.isCoin).length > 0 && (
                        <TableRow>
                          <TableCell colSpan={3} sx={{ fontWeight: 700, color: 'primary.main', bgcolor: '#f3f4fa', fontSize: '1.04em', borderTop: '2px solid #e0e7ff', borderBottom: '1.5px solid #e0e7ff', borderRadius: '12px 12px 0 0' }}>{t.coins[language]}</TableCell>
                        </TableRow>
                      )}
                      {breakdown.filter(item => item.isCoin).map((item, idx) => (
                        <TableRow key={`coin-table-${item.value}`}
                          sx={{
                            '&:hover': { background: '#f8f9fb' },
                            transition: 'background 0.15s',
                          }}
                        >
                          <TableCell component="th" scope="row" sx={{ fontWeight: 500, fontSize: '1.04em', py: 1.1 }}>
                            <CoinIcon
                              value={item.value}
                              width={24}
                              height={24}
                              style={{ verticalAlign: 'middle', marginRight: 8, borderRadius: 6, background: '#fff' }}
                              ariaLabel={`${item.value} ${selectedCurrency?.symbol}`}
                            />
                            {item.value} {selectedCurrency?.symbol}
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600, fontSize: '1.04em', py: 1.1 }}>{item.count}</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 500, fontSize: '1.04em', py: 1.1 }}>
                            {new Intl.NumberFormat(language === 'de' ? 'de-DE' : language === 'hu' ? 'hu-HU' : 'en-US').format(item.value * item.count)} {selectedCurrency?.symbol}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )
          ) : (
            <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
              <EmojiObjectsIcon color="disabled" sx={{ fontSize: 48, mb: 1 }} />
              <Typography variant="subtitle1">
                {t.enterToSee[language]}
              </Typography>
            </Box>
          )}
        </Card>
      </Container>
      {history.length > 0 && (
        <Container maxWidth="sm" sx={{ mt: 2 }}>
          <Card elevation={8} sx={{ borderRadius: 4, p: { xs: 1.5, sm: 3 }, boxShadow: '0 8px 32px 0 rgba(108,99,255,0.10)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <ListSubheader component="div" sx={{ fontWeight: 700, fontSize: '1.13rem', color: 'primary.main', bgcolor: 'transparent', px: 0, py: 0 }}>
                {t.history[language]}
              </ListSubheader>
              <Button size="small" color="secondary" variant="outlined" onClick={() => { setHistory([]); Cookies.remove('denom_history'); }} sx={{ ml: 2, textTransform: 'none', fontWeight: 600, borderRadius: 2, px: 2, py: 0.5 }}>
                {t.clearHistory[language]}
              </Button>
            </Box>
            <Divider sx={{ mb: 1.5, borderColor: '#e0e7ff' }} />
            <List sx={{ p: 0 }}>
              {history.map((h, idx) => (
                <Tooltip title={t.loadFromHistory[language](h.formatted, h.symbol || '')} arrow key={idx}>
                  <ListItem
                    alignItems="flex-start"
                    sx={{
                      mb: 1.2,
                      px: 1.2,
                      py: 1.1,
                      borderRadius: 3,
                      cursor: 'pointer',
                      transition: 'background 0.15s, box-shadow 0.15s',
                      '&:hover, &:focus': {
                        background: 'rgba(108,99,255,0.07)',
                        boxShadow: 2,
                        outline: 'none',
                      },
                      '&:active': {
                        background: 'rgba(108,99,255,0.13)',
                      },
                      border: '1.5px solid #f3f4fa',
                      boxShadow: 0,
                    }}
                    onClick={() => {
                      const rawValue = h.raw ? h.raw : h.formatted.replace(/[^\d]/g, '');
                      setPendingAmount(formatAmountInput(rawValue, language));
                      setPendingCurrency(h.currency);
                      setTimeout(() => {
                        amountInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        amountInputRef.current?.focus();
                      }, 100);
                    }}
                    tabIndex={0}
                    aria-label={t.loadFromHistory[language](h.formatted, h.symbol || '')}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <span style={{ fontSize: 22 }}>{h.flag}</span>
                    </ListItemIcon>
                    <ListItemText
                      primary={<>
                        <b style={{ fontWeight: 600, fontSize: '1.08em' }}>{h.formatted} {h.symbol}</b> <span style={{ color: '#888', fontSize: '0.97em', fontWeight: 400 }}>({new Date(h.time).toLocaleString()})</span>
                      </>}
                      secondary={h.breakdown && h.breakdown.length > 0 ? (
                        <span style={{ color: '#555', fontSize: '0.98em' }}>
                          {h.breakdown.slice(0, 4).map((item: any, i: number) => `${item.count} × ${item.value} ${h.symbol}`).join(', ')}
                          {h.breakdown.length > 4 ? '...' : ''}
                        </span>
                      ) : <span style={{ color: '#aaa', fontSize: '0.98em' }}>{t.noBreakdown[language]}</span>}
                    />
                  </ListItem>
                </Tooltip>
              ))}
            </List>
          </Card>
        </Container>
      )}
      <div className="footer">© {new Date().getFullYear()} Denomination Calculator &middot; Made with ❤️</div>
    </ThemeProvider>
  );
}

export default App;