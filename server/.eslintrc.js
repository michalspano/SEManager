module.exports = {
    "env": {
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2020
    },
    "rules": {
        "no-console": "off",
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        // Don't enforce the use of single quotes. Intrinsically, double quotes indicate a string,
        // and single quotes indicate a character. This can be misleading to some developers.
        // "quotes": [
        //     "error",
        //     "single"
        // ],
        "semi": [
            "error",
            "always"
        ]
    }
};  