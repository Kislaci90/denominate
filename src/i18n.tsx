import React from "react";
import SpeedIcon from "@mui/icons-material/Speed";
import SettingsIcon from "@mui/icons-material/Settings";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";

type AmountSymbolFn = (amt: string | number, sym: string) => string;

export const translate: {
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
        hu: 'Felváltom!',
    },
    heroSubtitle: {
        en: 'Instantly break down any amount into the optimal set of bills and coins. Fast, customizable, and accessible for EUR, USD, and HUF.',
        de: 'Teile jeden Betrag sofort in die optimale Kombination aus Scheinen und Münzen auf. Schnell, anpassbar und barrierefrei für EUR, USD und HUF.',
        hu: 'Bármilyen összeget azonnal bonts le a legoptimálisabb bankjegyekre és érmékre. Gyors, testreszabható és akadálymentes EUR, USD és HUF esetén.',
    },
    features: [
        {
            icon: <SpeedIcon className="landing-feature-icon"/>,
            title: {
                en: 'Instant, Accurate Results',
                de: 'Sofortige, präzise Ergebnisse',
                hu: 'Azonali, pontos eredmények'
            },
            desc: {
                en: 'Get the optimal breakdown of any amount in EUR, USD, or HUF—instantly and with perfect accuracy.',
                de: 'Erhalte sofort die optimale Aufteilung eines Betrags in EUR, USD oder HUF – schnell und präzise.',
                hu: 'Kapd meg bármely összeg optimális bontását EUR, USD vagy HUF pénznemben – azonnal és pontosan.',
            }
        },
        {
            icon: <SettingsIcon className="landing-feature-icon"/>,
            title: {
                en: 'Customizable & Persistent',
                de: 'Anpassbar & dauerhaft',
                hu: 'Testreszabható & megőrzött beállítások'
            },
            desc: {
                en: 'Choose which bills and coins are available. Your preferences and history are saved for next time.',
                de: 'Wähle verfügbare Scheine und Münzen. Deine Einstellungen und Historie werden gespeichert.',
                hu: 'Válaszd ki, mely címletek elérhetők. Beállításaid és előzményeid elmentésre kerülnek.',
            }
        },
        {
            icon: <EmojiObjectsIcon className="landing-feature-icon"/>,
            title: {
                en: 'Modern, Accessible Design',
                de: 'Modernes, barrierefreies Design',
                hu: 'Modern, akadálymentes dizájn'
            },
            desc: {
                en: 'Enjoy a beautiful, accessible interface with keyboard navigation, high contrast, and responsive layout.',
                de: 'Genieße eine schöne, barrierefreie Oberfläche mit Tastaturnavigation, hohem Kontrast und responsivem Layout.',
                hu: 'Élvezd a szép, akadálymentes felületet billentyűzetes navigációval, nagy kontraszttal és reszponzív elrendezéssel.',
            }
        },
    ],
    inputLabel: {en: 'Amount', de: 'Betrag', hu: 'Összeg'},
    inputTooltip: {
        en: 'Enter the amount you want to denominate',
        de: 'Gib den zu stückelnden Betrag ein',
        hu: 'Add meg a felbontandó összeget'
    },
    clear: {en: 'Clear', de: 'Löschen', hu: 'Törlés'},
    denominate: {en: 'Denominate', de: 'Stückeln', hu: 'Felbontás'},
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
    customizeTitle: {en: 'Customize Bills & Coins', de: 'Scheine & Münzen anpassen', hu: 'Címletek testreszabása'},
    customizeDesc: {
        en: 'Click bills or coins below to enable or disable them for denomination.',
        de: 'Klicke auf Scheine oder Münzen, um sie für die Stückelung zu aktivieren oder deaktivieren.',
        hu: 'Kattints a címletekre, hogy engedélyezd vagy letiltsd őket a felbontáshoz.',
    },
    bills: {en: 'Bills', de: 'Scheine', hu: 'Bankjegyek'},
    coins: {en: 'Coins', de: 'Münzen', hu: 'Érmék'},
    result: {en: 'Result', de: 'Ergebnis', hu: 'Eredmény'},
    resultSummary: {
        en: (amt: string | number, sym: string) => `${amt} ${sym} can be split into:`,
        de: (amt: string | number, sym: string) => `${amt} ${sym} kann aufgeteilt werden in:`,
        hu: (amt: string | number, sym: string) => `${amt} ${sym} felbontható a következőkre:`,
    },
    totalBills: {en: 'Total bills', de: 'Anzahl Scheine', hu: 'Ősszesen'},
    totalCoins: {en: 'Total coins', de: 'Anzahl Münzen', hu: 'Ősszesen'},
    history: {en: 'History', de: 'Verlauf', hu: 'Előzmények'},
    clearHistory: {en: 'Clear', de: 'Löschen', hu: 'Törlés'},
    noBreakdown: {en: 'No breakdown', de: 'Keine Aufteilung', hu: 'Nincs bontás'},
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