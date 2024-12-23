const config = {
    trailingComma: 'es5',
    semi: true,
    singleQuote: false,
    tabWidth: 4,
    printWidth: 120,
    overrides: [
        {
            files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
            options: {
                singleQuote: true,
            },
        },
    ],
};

export default config;
