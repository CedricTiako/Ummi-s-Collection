// Theme management using localStorage

// Define theme type
export type Theme = 'light' | 'dark';

// Set the theme on HTML element and in localStorage
export function setTheme(theme: Theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  localStorage.setItem('theme', theme);
  
  // Dispatch an event to notify the app that the theme has changed
  window.dispatchEvent(new CustomEvent('themeChange', { detail: theme }));
}

// Get the current theme
export function getTheme(): Theme {
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }
  
  // Check system preference if no theme is saved
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return systemPrefersDark ? 'dark' : 'light';
}

// Toggle between light and dark themes
export function toggleTheme() {
  const currentTheme = getTheme();
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  return newTheme;
}

// Initialize theme on page load
export function initializeTheme() {
  const theme = getTheme();
  setTheme(theme);
}