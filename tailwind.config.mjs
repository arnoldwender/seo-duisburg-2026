import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f0f7',
          100: '#cce1ef',
          200: '#99c3df',
          300: '#66a5cf',
          400: '#3387bf',
          500: '#004d96',
          600: '#004485',
          700: '#003b74',
          800: '#003263',
          900: '#002242',
          950: '#001831',
        },
        accent: {
          50: '#fff7f0',
          100: '#ffefe0',
          200: '#ffd4b3',
          300: '#ffb980',
          400: '#f9934d',
          500: '#f28821',
          600: '#db6b09',
          700: '#b65707',
          800: '#914505',
          900: '#6c3303',
          950: '#471f01',
        },
        gray: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        }
      },
      fontFamily: {
        sans: defaultTheme.fontFamily.sans,
      },
      keyframes: {
        fadeIn: {
          from: {
            opacity: '0',
            transform: 'translateY(-1rem)'
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        fadeOut: {
          from: {
            opacity: '1',
            transform: 'translateY(0)'
          },
          to: {
            opacity: '0',
            transform: 'translateY(-1rem)'
          }
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out forwards',
        'fade-out': 'fadeOut 0.2s ease-out forwards'
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.gray.700'),
            '--tw-prose-headings': theme('colors.gray.900'),
            '--tw-prose-links': theme('colors.primary.700'),
            '--tw-prose-bold': theme('colors.gray.900'),
            '--tw-prose-counters': theme('colors.gray.600'),
            '--tw-prose-bullets': theme('colors.gray.400'),
            '--tw-prose-quotes': theme('colors.gray.900'),
            '--tw-prose-quote-borders': theme('colors.gray.200'),
            '--tw-prose-captions': theme('colors.gray.600'),
            '--tw-prose-code': theme('colors.gray.900'),
            '--tw-prose-pre-code': theme('colors.gray.200'),
            '--tw-prose-pre-bg': theme('colors.gray.800'),
            '--tw-prose-hr': theme('colors.gray.200'),
            '--tw-prose-th-borders': theme('colors.gray.300'),
            '--tw-prose-td-borders': theme('colors.gray.200'),
          },
          dark: {
            css: {
              '--tw-prose-body': theme('colors.gray.300'),
              '--tw-prose-headings': theme('colors.white'),
              '--tw-prose-links': theme('colors.primary.400'),
              '--tw-prose-bold': theme('colors.white'),
              '--tw-prose-counters': theme('colors.gray.400'),
              '--tw-prose-bullets': theme('colors.gray.600'),
              '--tw-prose-quotes': theme('colors.gray.100'),
              '--tw-prose-quote-borders': theme('colors.gray.700'),
              '--tw-prose-captions': theme('colors.gray.400'),
              '--tw-prose-code': theme('colors.white'),
              '--tw-prose-pre-code': theme('colors.gray.300'),
              '--tw-prose-pre-bg': theme('colors.gray.800'),
              '--tw-prose-hr': theme('colors.gray.700'),
              '--tw-prose-th-borders': theme('colors.gray.700'),
              '--tw-prose-td-borders': theme('colors.gray.800'),
            }
          }
        }
      })
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ]
}