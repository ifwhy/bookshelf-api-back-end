import jsdoc from "eslint-plugin-jsdoc";

export default [
    {
        files: ["src/**/*.js"], // Fokus hanya pada file .js di folder src
        plugins: {
            jsdoc: jsdoc
        },
        rules: {
            // Aturan JSDoc
            "jsdoc/require-description": "error",
            "jsdoc/check-values": "error",
        }
    }
];
