
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App";
import ThemeInitializer from "./components/ThemeInitializer";
import { ThemeProvider } from "./contexts/ThemeContext";
import { NotesProvider } from "./contexts/NotesContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <ThemeInitializer />

      <NotesProvider>
        <App />
      </NotesProvider>
    </ThemeProvider>
  </StrictMode>,
);