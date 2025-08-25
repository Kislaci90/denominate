import React, {useEffect, useState} from 'react';
import Home from './pages/Home';
import {BrowserRouter} from "react-router-dom";
import {theme} from "./utils/theme";
import Footer from "./components/Footer";
import {ThemeProvider} from "@mui/material/styles";
import {Helmet} from "react-helmet";
import TopBar from "./components/TopBar";
import CookieBanner from "./components/CookieBanner";
import Cookies from "js-cookie";
import {initGA, trackPageview} from "./utils/analytics";
import './i18n';

const App: React.FC = () => {

    const [showCookieNotice, setShowCookieNotice] = useState(false);

    function handleAcceptCookies() {
        Cookies.set('cookie_consent', 'true', {expires: 365});
        setShowCookieNotice(false);
        initGA();
        trackPageview(window.location.pathname);
    }

    useEffect(() => {
        if (!Cookies.get('cookie_consent')) {
            setShowCookieNotice(true);
        }
    }, []);

    return (
        <BrowserRouter>
            <Helmet>
                <title>Felvaltom!</title>
                <meta name="description"
                      content="Quickly calculate currency denominations. Supports HUF, EUR, and more."/>
                <meta property="og:title" content="Felvaltom!"/>
                <meta property="og:description" content="Quickly calculate currency denominations."/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://felvaltom.eu"/>
            </Helmet>
                <ThemeProvider theme={theme}>
                    <TopBar/>
                    <Home/>
                    <Footer/>
                    <CookieBanner showCookieNotice={showCookieNotice} onAccept={handleAcceptCookies}/>
                </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;