
function ThemeInitializer() {
  try {
    const stored = localStorage.getItem("notes-theme-v1");
    const theme: string = stored ? JSON.parse(stored) : "light";

    document.documentElement.classList.toggle("dark",theme === "dark",);
  } catch {
    document.documentElement.classList.remove("dark");
  }

  return null;
}

export default ThemeInitializer;