import {populateTransaction, processTest} from '../../test.fixture';

const contractName = 'AggregationRouterV5';

const testDirSuffix =
    'clipper_swap_known_to_known_v5';  // <= directory to compare device
                                       // snapshots to
const testNetwork = 'polygon';
const signedPlugin = false;

const contractAddr = '0x1111111254eeb25477b68fb85ed929f73a960582';
const chainID = 137;

// From :
// https://polygonscan.com/tx/0x4ff4585af795a40e33fbdc1e0edd9ae2cb601a4e878da676694869e34f7b76e6
const inputData =
    '0x84bd6d290000000000000000000000006bfce69d1df30fd2b2c8e478edec9daa643ae3b80000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa84174000000000000000000000000c2132d05d31c914a87c6611c10748aeb04b58e8f000000000000000000000000000000000000000000000000000000000c23e6b1000000000000000000000000000000000000000000000000000000000c23e6b10000000005f2d4560000000005f5e100011c37937e08000000b2013163a348892707bc1fc4617e563a92cde48ea96863d8fa115185e18b8e818a2fe27e437aec03e4887d53dbd9bee23aa477b4bf7d82e50eff4c1b11f762aaecf206abd01598cfee7c08';

const serializedTx = populateTransaction(contractAddr, inputData, chainID);

const devices = [
    {
        name: 'nanos',
        label: 'Nano S',
        steps: 6,  // <= Define the number of steps for this test case and this
                   // device
    },
    {
        name: 'nanox',
        label: 'Nano X',
        steps: 6,  // <= Define the number of steps for this test case and this
                   // device
    },
    {
        name: 'nanosp',
        label: 'Nano S+',
        steps: 6,  // <= Define the number of steps for this test case and this
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