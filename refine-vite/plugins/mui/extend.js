const base = {
    _app: {
        refineProps: ["notificationProvider={useNotificationProvider}"],
        import: [
            `import CssBaseline from "@mui/material/CssBaseline";`,
            `import GlobalStyles from "@mui/material/GlobalStyles";`,
        ],
        refineMuiImports: [
            "useNotificationProvider",
            "RefineSnackbarProvider",
            "ThemedLayoutV2",
        ],
        localImport: [
            `import { ColorModeContextProvider } from "./contexts/color-mode";`,
            `import { Header } from "./components/header";`,
        ],
        wrapper: [
            ["<ColorModeContextProvider>", "</ColorModeContextProvider>"],
            [`<CssBaseline />`, ``],
            [
                `<GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />`,
                ``,
            ],
            [`<RefineSnackbarProvider>`, `</RefineSnackbarProvider>`],
        ],
    },
};

module.exports = {
    extend() {
        return base;
    },
};
