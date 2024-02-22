/* eslint-disable prettier/prettier */
module.exports = {
    root: true,
    extends: [
        'universe/native',
        'universe/web',
        'universe/node',
        // '@react-native',
    ],
    // 👇thêm dòng bên dưới  
    "rules": {
        "prettier/prettier": ["error", { "endOfLine": "auto" }]
    }
    //FIXME: fix LF/CRLF VS Code
};