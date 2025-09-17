import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { GlobalStyles } from "@/components/GlobalStyles";
import { theme } from "@/theme";
import { LoadingProvider } from "./LoadingProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <LoadingProvider>{children}</LoadingProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};
