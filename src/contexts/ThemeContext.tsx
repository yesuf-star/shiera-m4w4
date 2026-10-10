
import {createContext,useContext,useEffect,useMemo, type ReactNode,} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined,);

export function ThemeProvider({children,}: {children: ReactNode;}) {
  const [theme, setTheme] = useLocalStorage<Theme>("notes-theme-v1","light",);

  useEffect(() => {
    document.documentElement.classList.toggle("dark",theme === "dark",);
  
    }, [theme]);

  function toggleTheme() {
    setTheme((current) =>current === "light" ? "dark" : "light",);
  }

  const value = useMemo(() => ({ theme, toggleTheme }),
  
       [theme],
      );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}