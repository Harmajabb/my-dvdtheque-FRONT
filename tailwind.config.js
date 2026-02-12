/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#2C3E50',      // Bleu foncé
        'primary-light': '#52525b',
        'primary-dark': '#27272a',
        
        accent: {
          DEFAULT: '#E74C3C',    // Rouge
          hover: '#A93226',
        },
        
        success: '#27AE60',
        warning: '#F39C12',
        danger: '#DC2626',
        
        'bg-dark': '#18181B',
        'bg-darker': '#0F0F10',
        
        // ===== shadcn =====
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      
      fontFamily: {
        primary: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      
      fontSize: {
        xs: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
        sm: 'clamp(0.875rem, 0.85rem + 0.125vw, 1rem)',
        base: 'clamp(1rem, 0.95rem + 0.25vw, 1.125rem)',
        lg: 'clamp(1.125rem, 1rem + 0.625vw, 1.5rem)',
        xl: 'clamp(1.25rem, 1.1rem + 0.75vw, 1.75rem)',
        '2xl': 'clamp(1.5rem, 1.3rem + 1vw, 2.25rem)',
        '3xl': 'clamp(1.875rem, 1.5rem + 1.875vw, 3rem)',
        '4xl': 'clamp(2.25rem, 1.75rem + 2.5vw, 4rem)',
        '5xl': 'clamp(3.5rem, 15vw, 10rem)',
      },
      
      lineHeight: {
        tight: '1.25',
        normal: '1.5',
        relaxed: '1.75',
      },
      
      letterSpacing: {
        tight: '-0.04em',
        normal: '0',
        wide: '0.1em',
        wider: '0.15em',
        widest: '0.2em',
      },
      
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        full: '9999px',
      },
      
      boxShadow: {
        sm: '0 2px 4px rgba(0, 0, 0, 0.08)',
        md: '0 4px 6px rgba(0, 0, 0, 0.1)',
        lg: '0 8px 16px rgba(0, 0, 0, 0.12)',
        'glow-red': '0 0 20px rgba(231, 76, 60, 0.3)',
        'glow-red-lg': '0 0 30px rgba(231, 76, 60, 0.5)',
      },
      
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(24px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in-right': {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'bounce-custom': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(8px)',
          },
        },
        heartbeat: {
          '0%, 100%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.1)',
          },
        },
      },
      
      animation: {
        'fade-in': 'fade-in 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in-up': 'fade-in-up 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in-left': 'fade-in-left 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in-right': 'fade-in-right 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-slow': 'bounce-custom 2.5s ease-in-out infinite',
        heartbeat: 'heartbeat 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};