import { createRoot } from "react-dom/client";
import App from "./App";

import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "./theme";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <ThemeProvider theme={darkTheme}>
      {" "}
      <App />
    </ThemeProvider>
  </RecoilRoot>
);
