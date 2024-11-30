import {populateTransaction, processTest} from '../../test.fixture';

const contractName = 'AggregationRouterV5';

const testDirSuffix =
    'unoswap_to_with_permit_v5';  // <= directory to compare device snapshots to
const testNetwork = 'fantom';
const signedPlugin = false;

const contractAddr = '0x1111111254eeb25477b68fb85ed929f73a960582';
const chainID = 250;

// From :
// https://ftmscan.com/tx/0xe068e419b001dbfb9c5ec93214171ecf66c4f838cb9c48de89431d355ef75a07
const inputData =
    '0x3c15fd91000000000000000000000000d6d9cc746b2efac0ce5a25924300af77cf8f43550000000000000000000000008d11ec38a3eb5e956b052f67da8bdc9bef8abf3e000000000000000000000000000000000000000000000000fdf3ffb5298807ac000000000000000000000000000000000000000000000000000000000069458500000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000180000000000000003b6d0340484237bc35ca671302d19694c66d617142fbc23500000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000d6d9cc746b2efac0ce5a25924300af77cf8f43550000000000000000000000001111111254eeb25477b68fb85ed929f73a960582000000000000000000000000000000000000000000000000fdf3ffb5298807ac00000000000000000000000000000000000000000000000000000000663ee38c000000000000000000000000000000000000000000000000000000000000001c94cb79d033ed82a19e235778472eb7c04638b36de87f20865bffacaa90b8a1a901b1b620d3d4d5b1cdd7bffb409b4557b85f3ab592ce4e157d5debf19b418adcddc5239b';

const serializedTx = populateTransaction(contractAddr, inputData, chainID);

const devices = [
    {
        name: 'nanos',
        label: 'Nano S',
        steps: 14,  // <= Define the number of steps for this test case and this
                    // device
    },
    {
        name: 'nanox',
        label: 'Nano X',
        steps: 8,  // <= Define the number of steps for this test case and this
                   // device
    },
    {
        name: 'nanosp',
        label: 'Nano S+',
        steps: 8,  // <= Define the number of steps for this test case and this
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