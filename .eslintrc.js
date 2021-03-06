module.exports = {
    rules: {
        // A temporary hack related to IDE not resolving correct package.json
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/ban-types': 0,
        'react/prop-types': 0,
        'react/destructuring-assignment': 0,
        'react/jsx-props-no-spreading': 0,
        'react/jsx-curly-newline': 0,
        'react/jsx-wrap-multilines': 0,
        'react/jsx-one-expression-per-line': 0,
        'react/jsx-indent': 0,
        'react/jsx-indent-props': 0,
        'import/no-cycle': 0,
    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        createDefaultProgram: true,
    },
    settings: {
        'import/resolver': {
            // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
            node: {},
            webpack: {
                config: require.resolve('./configs/webpack.config.eslint.js'),
            },
        },
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
    },
};
