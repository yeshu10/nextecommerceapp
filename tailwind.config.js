// tailwind.config.js
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {colors: {
      'custom-green': '#9de635',
    }
  },
    
  },
  plugins: [],
}
