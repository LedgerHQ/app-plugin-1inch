// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    modulePaths: ['<rootDir>/src', '<rootDir>/tests'],

    moduleNameMapper: {
        '^jest$': '<rootDir>/jest.js',
    },

    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',

    globalSetup: '<rootDir>/globalsetup.js',

    // A list of paths to directories that Jest should use to search for files in
    roots: ['<rootDir>'],

    runner: 'jest-serial-runner',

    // The test environment that will be used for testing
    testEnvironment: 'node',

    // The glob patterns Jest uses to detect test files
    testMatch: [
        // '**/__tests__/**/*.[jt]s?(x)',
        // '**/?(*.)+(spec|test).[tj]s?(x)',
        // '**/?(*.)+(ispec|test).[tj]s?(x)',
        '**/V3/unoswap_known_ethereum.test*',
        '**/V3/unoswap_native_ethereum.test*',
        '**/V3/unoswap_unknown_ethereum.test*',
        '**/V3/unoswap_known_polygon.test*',
        '**/V3/unoswap_unknown_polygon.test*',
        '**/V3/unoswap_native_polygon.test*',
        '**/V3/swap_unknown_to_native_ethereum.test*',
        '**/V3/swap_known_to_known_polygon.test*',
        '**/V3/swap_native_to_known_polygon.test*',
        '**/V3/swap_unknown_to_known_polygon.test*',
        '**/V3/swap_known_to_unknown_ethereum.test*',
        '**/V3/swap_known_to_known_ethereum.test*',
        '**/V4/uniswap_v3_swap_polygon.test*',
        '**/V4/uniswap_v3_swap_ethereum.test*',
        '**/V4/unoswap_with_permit_ethereum.test*',
        '**/V4/unoswap_with_permit_polygon.test*',
        '**/V4/clipper_swap_ethereum.test*',
        '**/V4/clipper_swap_to_with_permit_ethereum.test*',
        '**/V4/uniswap_v3_swap_to_polygon.test*',
        '**/V4/uniswap_v3_swap_to_ethereum.test*',
        '**/V4/uniswap_v3_swap_to_with_permit_ethereum.test*',
        '**/V4/uniswap_v3_swap_to_with_permit_polygon.test*',
        '**/V4/fill_order_rfq_to_with_permit_ethereum.test*',
        '**/V4/fill_order_rfq_to_with_permit_polygon.test*',
        '**/V4/unoswap_native_ethereum.test*',
        '**/V4/unoswap_known_ethereum.test*',
        '**/V4/unoswap_unknown_ethereum.test*',
        '**/V4/unoswap_known_polygon.test*',
        '**/V4/unoswap_native_polygon.test*',
        '**/V4/unoswap_unknown_polygon.test*',
        '**/V4/swap_unknown_to_native_ethereum.test*',
        '**/V4/swap_known_to_unknown_polygon.test*',
        '**/V4/swap_known_to_known_polygon.test*',
        '**/V4/swap_known_to_native_polygon.test*',
        '**/V4/swap_known_to_known_ethereum.test*',
        // '**/V4/fill_order_rfq_polygon.test*',
        // '**/V4/fill_order_rfq_ethereum.test*',
    ],

    // Stop immediatly when a test fails
    bail: true,
};
