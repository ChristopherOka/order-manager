/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "dropdown-arrow": "url(/images/icons/dropdown_arrow.png)",
            },
            colors: {
                default: {
                    100: "#fafafa",
                    900: "#161616",
                },
            },
            fontFamily: {
                "source-sans-pro": ["Source Sans Pro", "sans-serif"],
            },
            keyframes: {
                slideOut: {
                    "0%": { transform: "translateY(-35px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "100%" },
                },
                popIn: {
                    "0%": { height: "0", width: "0", opacity: "0" },
                    "100%": {
                        height: "1.25rem",
                        width: "1.25rem",
                        opacity: "100%",
                    },
                },
                popOut: {
                    "0%": {
                        height: "1.25rem",
                        width: "1.25rem",
                        opacity: "100%",
                    },
                    "100%": { height: "0", width: "0", opacity: "0" },
                },
                delayAppear: {
                    "0%": { opacity: "0" },
                    "50%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                modalAppear: {
                    "0%": { transform: "scaleY(0) scaleX(0)" },
                    "100%": { transform: "scaleY(1) scaleX(1)" },
                },
                modalDisappear: {
                    "0%": { transform: "scaleY(1) scaleX(1)" },
                    "100%": { transform: "scaleY(0) scaleX(0)" },
                },
                modalBackgroundDisappear: {
                    "0%": {},
                    "100%": { visibility: "hidden" },
                },
                frontTileFlip: {
                    "0%": { transform: "rotateY(0deg)", visibility: "visible" },
                    "100%": {
                        transform: "rotateY(90deg)",
                        visibility: "hidden",
                    },
                },
                backTileFlip: {
                    "0%": {
                        transform: "rotateY(270deg)",
                        visibility: "hidden",
                    },
                    "100%": {
                        transform: "rotateY(360deg)",
                        visibility: "visible",
                    },
                },
                openX: {
                    "0%": { transform: "scaleX(0)" },
                    "100%": { transform: "scaleX(1)" },
                },
                closeX: {
                    "0%": { transform: "scaleX(1)" },
                    "100%": { transform: "scaleX(0)" },
                },
                fadeInOut: {
                    "0%": { opacity: "0", transform: "scale(1)" },
                    "20%": { opacity: "1", transform: "scale(1.1)" },
                    "60%": { opacity: "1", transform: "scale(1)" },
                    "100%": { opacity: "0", transform: "scale(1)" },
                },
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                fadeOut: {
                    "0%": { opacity: "1" },
                    "100%": { opacity: "0" },
                },
            },
            animation: {
                slideOut: "slideOut 0.3s ease",
                popIn: "popIn 0.2s ease",
                popOut: "popOut 0.2s ease forwards",
                delayAppear: "delayAppear 0.3s ease",
                modalAppear: "modalAppear 0.3s ease forwards",
                modalDisappear: "modalDisappear 0.3s ease forwards",
                modalBackgroundDisappear:
                    "modalBackgroundDisappear 0.3s ease forwards",
                frontTileFlip: "frontTileFlip 0.4s ease-in forwards",
                backTileFlip: "backTileFlip 0.4s ease-out both",
                openX: "openX 0.3s ease forwards",
                closeX: "closeX 0.3s ease forwards",
                fadeInOut: "fadeInOut 1.5s ease-in-out forwards",
                fadeIn: "fadeIn 0.3s ease-in-out forwards",
                fadeOut: "fadeOut 0.3s ease-in-out forwards",
            },
            boxShadow: {
                "3xl": "0 0 12px 0px rgba(0, 0, 0, 0.3)",
                top: "0 -4px 8px 0 rgba(0, 0, 0, 0.3)",
                box: "0 0 14px 0px rgba(0, 0, 0, 0.2)",
            },
            screens: {
                print: { raw: "print" },
            },
        },
    },
    plugins: [require("tailwindcss-animation-delay")],
};
