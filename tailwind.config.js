```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Scan all files in the app directory
    "./components/**/*.{js,ts,jsx,tsx}", // Scan components (if outside app)
    "./pages/**/*.{js,ts,jsx,tsx}", // Scan pages (if outside app)
  ],
  theme: {
    extend: {}, // Add custom theme extensions here if needed
  },
  plugins: [], // Add Tailwind plugins here if needed
};
```