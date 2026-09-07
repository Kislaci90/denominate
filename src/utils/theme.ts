import {createTheme} from "@mui/material/styles";

export const fontDisplay = '"Fraunces", Georgia, serif';
export const fontBody = '"Inter", "Helvetica Neue", Arial, sans-serif';
export const fontMono = '"IBM Plex Mono", "SFMono-Regular", Menlo, monospace';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#1F4B3A',
            light: '#3B6E58',
            dark: '#123024',
            contrastText: '#F5EEDC',
        },
        secondary: {
            main: '#9A3324',
            contrastText: '#F5EEDC',
        },
        background: {
            default: '#F1E9D6',
            paper: '#FBF6EA',
        },
        info: {
            main: '#AD8A3D',
        },
        text: {
            primary: '#20261F',
            secondary: '#5B5849',
        },
    },
    shape: {
        borderRadius: 10,
    },
    typography: {
        fontFamily: fontBody,
        h1: {fontFamily: fontDisplay, fontWeight: 700},
        h2: {fontFamily: fontDisplay, fontWeight: 700},
        h3: {fontFamily: fontDisplay, fontWeight: 700},
        h4: {fontFamily: fontDisplay, fontWeight: 700},
        h5: {fontFamily: fontDisplay, fontWeight: 700},
        h6: {fontFamily: fontDisplay, fontWeight: 700},
        button: {fontFamily: fontBody, fontWeight: 700, letterSpacing: 0.3},
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: '#1F4B3A',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    background: '#FBF6EA',
                    border: '1px solid #DDC9A3',
                    boxShadow: '0 10px 30px 0 rgba(18, 48, 36, 0.12)',
                },
            },
        },
    },
});
