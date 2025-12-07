// tailwind.config.js (CJS)
import scrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        // If you use a src/ folder, include these too:
        "./src/app/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
        "./src/pages/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            padding: {
                'safe-top': 'env(safe-area-inset-top)',
            },
            fontFamily: {
                gothic: ['"field-gothic-xxcondensed"', 'sans-serif'],
                montserrat: ["var(--font-montserrat-700)", "sans-serif"],
            },
            colors: {
                primary: {
                    DEFAULT: '#3B82F6',   // Electric Blue
                    light: '#60A5FA',
                    dark:  '#1E40AF',
                },
                accent: {
                    pink:   '#EC4899',    // Hot Pink
                    lime:   '#A3E635',    // Lime Green
                    violet: '#8B5CF6',    // Deep Violet
                },
                background: {
                    DEFAULT: '#F5F3FF',   // Light Lavender
                    dark:    '#EDE9FE',
                },
                text: {
                    DEFAULT: '#111827',   // Graphite
                    light:   '#374151',
                },
            },
        },
    },
    plugins: [scrollbar],
    safelist: [
        // existing
        'py-4','text-[#3D9149]','text-[#F299FF]','text-[#EC7000]','text-[40px]','md:text-[40px]',
        'text-[20px]','text-[148px]','list-disc','leading-none','md:text-[148px]','text-[64px]',

        // new brand tokens
        'bg-primary','bg-primary-light','bg-primary-dark',
        'bg-accent-pink','bg-accent','bg-accent-violet',
        'bg-background','bg-background-dark',
        'text-primary','text-accent-pink','text-accent-lime','text-accent-violet',
        'text-text','text-text-light',
        'hover:bg-primary','hover:bg-primary-dark','hover:bg-accent-pink','hover:bg-accent','hover:bg-accent-violet',
        'border-primary','border-accent-pink','border-accent-lime','border-accent-violet',
    ],
};