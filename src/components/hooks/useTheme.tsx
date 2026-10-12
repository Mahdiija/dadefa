import React from "react";

const useDetectDarkMode = () => {
  // یک راه ساده برای تشخیص تم دارک بر اساس کلاس 'dark' روی documentElement
  // در برنامه‌های پیچیده‌تر، از Context API یا state management استفاده کنید.
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          setIsDarkMode(document.documentElement.classList.contains("dark"));
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    // مقدار اولیه را هم چک می‌کنیم
    setIsDarkMode(document.documentElement.classList.contains("dark"));

    return () => observer.disconnect();
  }, []);

  return isDarkMode;
};
export default useDetectDarkMode;
