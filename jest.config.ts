export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                tsconfig: 'tsconfig.json',
            },
        ],
        '^.+\\.(png|jpg|jpeg|gif|svg)$': 'jest-transform-stub',
    },
    globals: {
        'ts-jest': {
            useESM: true,
        },
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts', '@testing-library/jest-dom'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    transformIgnorePatterns: ['/node_modules/(?!(@testing-library|react-redux)/)'],
};
