/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        canvas: '#fafaf9',
        surface: '#ffffff',
        neutral: '#f6f5f3',
        charcoal: '#18181b',
        muted: '#71717a',
        subtle: '#a1a1aa',
        terracotta: {
          DEFAULT: '#c2410c',
          hover: '#9a3412',
          light: '#fff7ed'
        },
        onyx: '#09090b',
        hairline: 'rgba(0, 0, 0, 0.08)'
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif']
      },
      borderRadius: {
        card: '14px',
        stage: '12px'
      },
      maxWidth: {
        container: '1280px'
      }
    }
  },
  plugins: []
};
