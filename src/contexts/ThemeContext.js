'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Load theme from localStorage or default to light
    const stored = localStorage.getItem('theme') || 'light';
    setTheme(stored);
    document.documentElement.classList.add(stored);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);

    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);



















// 'use client';

// import { createContext, useContext, useEffect, useState } from 'react';

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState('light');

//   useEffect(() => {
//     const stored = localStorage.getItem('theme');
//     if (stored) {
//       setTheme(stored);
//       document.documentElement.classList.add(stored);
//     } else {
//       document.documentElement.classList.add('light');
//     }
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     document.documentElement.classList.remove(theme);
//     document.documentElement.classList.add(newTheme);
//     setTheme(newTheme);
//     localStorage.setItem('theme', newTheme);
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);
