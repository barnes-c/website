import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

export default {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{ts,tsx,mdx}"],
    theme: { extend: {} },
    plugins: [
        typography,
        forms,
    ],
} satisfies Config;
