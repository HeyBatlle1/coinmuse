/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#1a202c', // Example dark blue/charcoal
        'secondary-gray': '#4a5568', // Example mid-gray
        'accent-blue': '#4299e1', // Example accent blue for highlights
        'light-text': '#f7fafc', // Light text for dark backgrounds
        'dark-text': '#1a202c', // Dark text for light backgrounds
      },
    },
  },
  plugins: [],
};
