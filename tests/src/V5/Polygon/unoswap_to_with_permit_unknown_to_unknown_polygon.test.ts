import {populateTransaction, processTest} from '../../test.fixture';

const contractName = 'AggregationRouterV5';

const testDirSuffix =
    'unoswap_to_with_permit_known_to_unknown_v5';  // <= directory to compare
                                                   // device snapshots to
const testNetwork = 'polygon';
const signedPlugin = false;

const contractAddr = '0x1111111254eeb25477b68fb85ed929f73a960582';
const chainID = 137;

// From :
// https://etherscan.io/tx/0x9f83fb7d6f0c5e9b2d071ee195ce5e6372c032ebb4c2b0b66c3e420228cb297f
// didn't find a transaction on polygon
const inputData =
    '0x3c15fd91000000000000000000000000f42fd5f1f398c8eb827d65bcf67007e89b992008000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb4800000000000000000000000000000000000000000000000000000002540be40000000000000000000000000000000000000000000000000000003775c8a10ff000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000000200000000000000003b6d0340397ff1542f962076d0bfe58ea045ffa2d347aca000000000000000003b6d03405c24b84701916d968dcc7bdd6a4c5236bed460b900000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000f42fd5f1f398c8eb827d65bcf67007e89b9920080000000000000000000000001111111254eeb25477b68fb85ed929f73a960582ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000063a3d51f000000000000000000000000000000000000000000000000000000000000001ccf2434e1f687207130f84387e24ba28e76cb6afe63df5c08a027bf017197a7d8052db3e4d3cb9f21088122a0a5bb82c8f98e016a1a4e910ba38120c98e52b4c5e26b9977';

const serializedTx = populateTransaction(contractAddr, inputData, chainID);

const devices = [
    {
        name: 'nanos',
        label: 'Nano S',
        steps: 13,  // <= Define the number of steps for this test case and this
                    // device
    },
    {
        name: 'nanox',
        label: 'Nano X',
        steps: 9,  // <= Define the number of steps for this test case and this
                   // device
    },
    {
        name: 'nanosp',
        label: 'Nano S+',
        steps: 9,  // <= Define the number of steps for this test case and this
                   // device
    },
    {
        name: 'stax',
        label: 'Stax',
    },
    {
        name: 'flex',
        label: 'Flex',
    }
];

devices.forEach((device) => {
    processTest(
        device, contractName, testDirSuffix, testDirSuffix, '', signedPlugin,
        serializedTx, testNetwork);
});