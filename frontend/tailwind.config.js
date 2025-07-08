/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // If using App Router
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1', // primary
          '50': '#eef2ff',    // Example: primary-50 (Tailwind generates shades, but can be explicit)
          '100': '#e0e7ff',   // Example: primary-100
          '500': '#6366f1',   // Example: primary-500 (same as DEFAULT)
          '600': '#4f46e5',   // Example: primary-600 (darker shade for hover)
          '700': '#4338ca',   // Example: primary-700
        },
        secondary: {
          DEFAULT: '#8b5cf6', // secondary
          // You can add shades for secondary as well if needed
        },
        dark: '#1e293b',      // dark
        light: '#f8fafc',     // light

        // Explicitly define color shades used in the HTML if not covered by default Tailwind shades
        // Example: bg-primary-100, bg-purple-100, text-green-600, etc.
        // Tailwind's default color palette is quite extensive.
        // Many of these (like green-600, blue-600) will work out of the box.
        // Custom ones from the original <script> block:
        // primary: '#6366f1' -> already defined
        // secondary: '#8b5cf6' -> already defined
        // dark: '#1e293b' -> already defined
        // light: '#f8fafc' -> already defined

        // Specific shades from HTML that might need explicit definition if not standard:
        // primary-50: (used for active mobile menu link)
        // primary-500: (used for focus rings)
        // primary-700: (used for button hover)

        // purple-100 (used for stats card bg)
        'purple-100': '#f3e8ff', // (A common shade for purple, adjust if your original purple-100 was different)
        // green-100, green-600, green-800
        // blue-100, blue-600
        // red-100, red-600
        // yellow-100, yellow-600, yellow-400
        // gray-100, gray-600
        // These are typically available in Tailwind by default.
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
