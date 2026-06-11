/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,html}", // adjust paths for your project
    ],
    theme: {
        extend: {
            fontFamily: {
                // poppins: ["Poppins", "sans-serif"],
                // exo: ["'Exo 2'", "sans-serif"],
                exo: ["var(--font-exo2"],
                // inter: ["var(--font-inter)"],
                // bricolage: ["var(--font-bricolage)"],
            },
        },
    },
    plugins: [],
}
