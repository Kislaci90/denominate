import {createTheme} from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#2E7D32',
        },
        secondary: {
            main: '#E57373',
        },
        background: {
            default: '#F5F5F5',
            paper: '#FFFFFF',
        },
        info: {
            main: '#6C63FF',
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: '#2E7D32',
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