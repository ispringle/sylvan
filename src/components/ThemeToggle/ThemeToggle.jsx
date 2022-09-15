import { useEffect } from "react";

const setTheme = (theme) => {
  const r = document.querySelector(":root");
  [
    "color-bg",
    "color-fg",
    "color-accent",
    "image-filter",
    "inversion-filter",
  ].forEach((v) => {
    r.style.setProperty("--default-" + v, "var(--" + theme + "-" + v + ")");
  });
  // const toggle = document.getElementById("color-checkbox");
  // if (theme == "light") {
  //   toggle.checked ? (toggle.checked = false) : null;
  // }
  // if (theme == "dark") {
  //   toggle.checked ? null : (toggle.checked = false);
  // }
  localStorage.setItem("theme", theme);
};

const ThemeToggle = () => {
  useEffect(() => {
    const preference = window?.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const defaultTheme = preference || "light";
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
