module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "eqeqeq": 2,
        "no-self-compare": 2,
        "no-useless-concat": 2,
        "array-bracket-spacing": [2, "never"],
        "block-spacing": [2, "always"],
        "comma-spacing": [2, {before: false, after: true}],
        "camelcase": [2, {"properties": "always"}],
        "brace-style": [2, "stroustrup", { "allowSingleLine": true }],
        "comma-style": [2, "last"],
        "no-var": 2,
        "consistent-return": 2,
        "key-spacing": [2, {"beforeColon": false, "afterColon": true}],
        "semi-spacing": [2, {"before": false, "after": true}],
        "keyword-spacing": 2,
        "space-before-function-paren": [2, "never"],
        "semi": ["error", "always"],
        "import/no-relative-parent-imports": "error"
    }
};