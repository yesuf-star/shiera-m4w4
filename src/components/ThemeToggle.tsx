
import { useTheme } from "../contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="rounded-xl border border-slate-200 px-4 py-3 cursor-pointer text-sm font-medium transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-slate-700 dark:hover:bg-slate-800"
    >
      {theme === "light" ? "🌙 Dark mode" : "☀️ Light mode"}
    </button>
  );
}