import { useEffect } from "react";

const setTheme = (theme) => {
  const r = document.querySelector(":root");
  [
    "color-bg",
    "color-fg",
    "color-accent",
    "image-filter",
    "logo-fg",
    "logo-bg",
    "logo-shadow",
    "logo-pre-inner-shadow",
    "flueron-filter",
  ].forEach((v) => {
    r.style.setProperty("--default-" + v, "var(--" + theme + "-" + v + ")");
  });
  localStorage.setItem("theme", theme);
};

const ThemeToggle = () => {
  useEffect(() => {
    const defaultTheme = "light";
    setTheme(
      localStorage.getItem("theme")
        ? localStorage.getItem("theme")
        : defaultTheme
    );
  });

  return (
    <div id="color-toggle" className="toggle">
      <input
        id="color-checkbox"
        className="toggle-checkbox"
        type="checkbox"
        onChange={(e) => {
          if (e.target.checked) {
            setTheme("dark");
          } else {
            setTheme("light");
          }
        }}
      />
      <label htmlFor="color-checkbox"></label>
    </div>
  );
};

export default ThemeToggle;
