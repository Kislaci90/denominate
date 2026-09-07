import React, {useEffect, useState} from 'react';
import Home from './pages/Home';
import {BrowserRouter} from "react-router-dom";
import {theme} from "./utils/theme";
import Footer from "./components/Footer";
import {ThemeProvider} from "@mui/material/styles";
import {Box} from "@mui/material";
import TopBar from "./components/TopBar";
import CookieBanner from "./components/CookieBanner";
import Cookies from "js-cookie";
import {initGA, trackPageview} from "./utils/analytics";
import {useTranslation} from "react-i18next";
import i18n from './i18n';

const App: React.FC = () => {

    const [showCookieNotice, setShowCookieNotice] = useState(false);
    const [cookieBannerHeight, setCookieBannerHeight] = useState(0);
    const {t} = useTranslation();

    function handleAcceptCookies() {
        Cookies.set('cookie_consent', 'true', {expires: 365});
        setShowCookieNotice(false);
        initGA();
        trackPageview(window.location.pathname);
    }

    function handleDeclineCookies() {
        Cookies.set('cookie_consent', 'false', {expires: 365});
        setShowCookieNotice(false);
    }

    useEffect(() => {
        if (!Cookies.get('cookie_consent')) {
            setShowCookieNotice(true);
        }
    }, []);

    useEffect(() => {
        document.documentElement.lang = i18n.language;
        const handleLanguageChanged = (lng: string) => {
            document.documentElement.lang = lng;
        };
        i18n.on('languageChanged', handleLanguageChanged);
        return () => {
            i18n.off('languageChanged', handleLanguageChanged);
        };
    }, []);

    return (
        <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <a href="#main-content" className="skip-link">{t('skipToContent')}</a>
                    <TopBar/>
                    <Box sx={{pb: showCookieNotice ? `${cookieBannerHeight}px` : 0, transition: 'padding-bottom 0.2s ease'}}>
                        <Box component="main" id="main-content" tabIndex={-1}>
                            <Home/>
                        </Box>
                        <Footer/>
                    </Box>
                    <CookieBanner
                        showCookieNotice={showCookieNotice}
                        onAccept={handleAcceptCookies}
                        onDecline={handleDeclineCookies}
                        onHeightChange={setCookieBannerHeight}
                    />
                </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;