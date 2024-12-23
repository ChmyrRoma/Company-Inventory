import pluginJs from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        languageOptions: {
            globals: {
                ...globals.browser,
                jest: 'readonly',
            },
            parser: tsParser,
        },
        plugins: {
            react: pluginReact,
            prettier: prettierPlugin,
            'simple-import-sort': simpleImportSort,
            '@typescript-eslint': tsPlugin,
        },
        rules: {
            ...pluginJs.configs.recommended.rules,
            ...tsPlugin.configs.recommended.rules,
            ...pluginReact.configs.flat.recommended.rules,
            'react/react-in-jsx-scope': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            'prettier/prettier': 'error',
            'simple-import-sort/exports': 'error',
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        ['^react', '^@?\\w'],
                        ['^(@|components)(/.*|$)'],
                        ['^\\u0000'],
                        ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                        ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                        ['^.+\\.?(css)$'],
                    ],
                },
            ],
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
];
