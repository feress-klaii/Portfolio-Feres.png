import { useEffect, useState } from "react";
import { getInitialTheme, applyTheme } from "../../motion/theme";
import "./ThemeToggle.css";

/** A pill switch between the site's native dark mode and the blueprint-vellum light mode. */
function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const isLight = theme === "light";

  return (
    <button
      className={`theme-toggle ${className}`}
      onClick={() => setTheme(isLight ? "dark" : "light")}
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      aria-pressed={isLight}
    >
      <span className={`theme-toggle-track${isLight ? " is-light" : ""}`}>
        <span className="theme-toggle-icon theme-toggle-icon-moon">☾</span>
        <span className="theme-toggle-icon theme-toggle-icon-sun">☀</span>
        <span className="theme-toggle-thumb" />
      </span>
    </button>
  );
}

export default ThemeToggle;
