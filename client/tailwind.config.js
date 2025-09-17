/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      colors: {
        'editorial': {
          50: '#fefefe',
          100: '#fdfdfd',
          200: '#f9f9f9',
          300: '#f4f4f4',
          400: '#e8e8e8',
          500: '#d1d1d1',
          600: '#a8a8a8',
          700: '#7a7a7a',
          800: '#4a4a4a',
          900: '#1a1a1a',
        },
        'warm': {
          50: '#fefdfb',
          100: '#fdf9f3',
          200: '#faf2e6',
          300: '#f5e6d3',
          400: '#edd4b8',
          500: '#e2c19a',
          600: '#d4a574',
          700: '#c48a4f',
          800: '#b06f3a',
          900: '#9c5a2b',
        },
        'sage': {
          50: '#f7f8f7',
          100: '#eef1ee',
          200: '#dde3dd',
          300: '#c5d0c5',
          400: '#a8b8a8',
          500: '#8a9e8a',
          600: '#6d816d',
          700: '#556455',
          800: '#434d43',
          900: '#363d36',
        },
        'coral': {
          50: '#fff5f5',
          100: '#ffe8e8',
          200: '#ffd6d6',
          300: '#ffb3b3',
          400: '#ff8080',
          500: '#ff6b6b',
          600: '#ff5252',
          700: '#ff3838',
          800: '#ff1f1f',
          900: '#e60000',
        }
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      fontSize: {
        'hero': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'section': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.3' }],
        'body': ['1.125rem', { lineHeight: '1.7' }],
        'caption': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.05em' }],
      },
      boxShadow: {
        'editorial': '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
        'editorial-lg': '0 4px 6px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.06)',
        'editorial-xl': '0 10px 15px rgba(0, 0, 0, 0.05), 0 4px 6px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
