module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "plugin:jest-dom/recommended",
        "prettier",
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    settings: { react: { version: "18.2" } },
    plugins: ["react-refresh"],
    rules: {
        "react-refresh/only-export-components": [
            "warn",
            { allowConstantExport: true },
        ],
        "no-unused-vars": "error",
        "spaced-comment": [
            "error",
            "always",
            {
                line: {
                    markers: ["/"],
                    exceptions: ["-", "+"],
                },
                block: {
                    markers: ["!"],
                    exceptions: ["*"],
                    balanced: true,
                },
            },
        ],
        "react/prop-types": 0,
    },
};
