/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'Menlo', 'monospace'],
      },
      colors: {
        bluebrand: '#0A6CFF',
        cyanbrand: '#22D3EE',
        ink: '#0B1220',
        slatecopy: '#64748B',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(11,18,32,.04),0 8px 22px rgba(11,18,32,.05)',
        glow: '0 14px 50px rgba(10,108,255,.28)',
      },
    },
  },
  plugins: [],
};
