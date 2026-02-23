module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,html,mdx}'],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        /* Text Colors */
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          quaternary: 'var(--text-quaternary)',
          muted: 'var(--text-muted)',
          light: 'var(--text-light)',
          disabled: 'var(--text-disabled)',
          white: 'var(--text-white)',
          'white-transparent': 'var(--text-white-transparent)',
        },

        /* Background Colors */
        background: {
          'overlay-dark': 'var(--bg-overlay-dark)',
          'dark-primary': 'var(--bg-dark-primary)',
          'dark-secondary': 'var(--bg-dark-secondary)',
          'dark-transparent': 'var(--bg-dark-transparent)',
          'gray-dark': 'var(--bg-gray-dark)',
          'accent-primary': 'var(--bg-accent-primary)',
          'gray-light': 'var(--bg-gray-light)',
          cream: 'var(--bg-cream)',
          'light-transparent': 'var(--bg-light-transparent)',
          'cream-secondary': 'var(--bg-cream-secondary)',
          'white-transparent': 'var(--bg-white-transparent)',
          white: 'var(--bg-white)',
        },

        /* Border Colors */
        border: {
          dark: 'var(--border-dark)',
          accent: 'var(--border-accent)',
          gray: 'var(--border-gray)',
          light: 'var(--border-light)',
          white: 'var(--border-white)',
        },

        /* Component-specific Colors */
        header: {
          background: 'var(--header-background)',
          text: 'var(--header-text)',
        },
        button: {
          'primary-bg': 'var(--button-primary-bg)',
          'primary-text': 'var(--button-primary-text)',
          'secondary-bg': 'var(--button-secondary-bg)',
          'secondary-text': 'var(--button-secondary-text)',
        },
        link: {
          'text-primary': 'var(--link-text-primary)',
          'text-secondary': 'var(--link-text-secondary)',
        },
        expandable: {
          'header-bg': 'var(--expandable-header-bg)',
          'header-text': 'var(--expandable-header-text)',
        },
        input: {
          background: 'var(--input-bg)',
          text: 'var(--input-text)',
        },
      },

      /* Typography */
      fontSize: {
        xs: 'var(--font-size-xs)',
        sm: 'var(--font-size-sm)',
        base: 'var(--font-size-base)',
        md: 'var(--font-size-md)',
        lg: 'var(--font-size-lg)',
        xl: 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)',
        '5xl': 'var(--font-size-5xl)',
        '6xl': 'var(--font-size-6xl)',
        '7xl': 'var(--font-size-7xl)',
      },

      fontWeight: {
        normal: 'var(--font-weight-normal)',
        medium: 'var(--font-weight-medium)',
        semibold: 'var(--font-weight-semibold)',
        bold: 'var(--font-weight-bold)',
      },

      lineHeight: {
        xs: 'var(--line-height-xs)',
        sm: 'var(--line-height-sm)',
        base: 'var(--line-height-base)',
        md: 'var(--line-height-md)',
        lg: 'var(--line-height-lg)',
        xl: 'var(--line-height-xl)',
        '2xl': 'var(--line-height-2xl)',
        '3xl': 'var(--line-height-3xl)',
        '4xl': 'var(--line-height-4xl)',
        '5xl': 'var(--line-height-5xl)',
      },

      /* Spacing */
      spacing: {
        xs: 'var(--margin-xs)',
        sm: 'var(--margin-sm)',
        base: 'var(--margin-base)',
        md: 'var(--margin-md)',
        lg: 'var(--margin-lg)',
        xl: 'var(--margin-xl)',
        '2xl': 'var(--margin-2xl)',
        '3xl': 'var(--margin-3xl)',
        '4xl': 'var(--margin-4xl)',
        '5xl': 'var(--margin-5xl)',
        '6xl': 'var(--margin-6xl)',
        '7xl': 'var(--margin-7xl)',
        '8xl': 'var(--margin-8xl)',
        '9xl': 'var(--margin-9xl)',
        '10xl': 'var(--margin-10xl)',
      },

      /* Border Radius */
      borderRadius: {
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        base: 'var(--radius-base)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
        '4xl': 'var(--radius-4xl)',
        full: 'var(--radius-full)',
      },

      /* Gap */
      gap: {
        xs: 'var(--gap-xs)',
        sm: 'var(--gap-sm)',
        base: 'var(--gap-base)',
        md: 'var(--gap-md)',
        lg: 'var(--gap-lg)',
        xl: 'var(--gap-xl)',
        '2xl': 'var(--gap-2xl)',
        '3xl': 'var(--gap-3xl)',
        '4xl': 'var(--gap-4xl)',
        '5xl': 'var(--gap-5xl)',
      },

      /* Font Families */
      fontFamily: {
        dm: ['DM Sans', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        plus: ['Plus Jakarta Sans', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
