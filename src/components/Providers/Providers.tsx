import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { GlobalStyles } from "@/components/GlobalStyles";
import { theme } from "@/theme";
import { LoadingProvider } from "./LoadingProvider";
import { DefinitionProvider } from "../Definition";
import { LayoutProvider } from "./LayoutProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <LayoutProvider>
          <LoadingProvider>
            <DefinitionProvider>{children}</DefinitionProvider>
          </LoadingProvider>
        </LayoutProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};
