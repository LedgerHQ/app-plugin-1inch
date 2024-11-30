
import {populateTransaction, processTest} from '../../test.fixture';

const contractName = 'AggregationRouterV5';

const testDirSuffix =
    'fillorder_rfq_to_with_permit_v5';  // <= directory to compare device
                                        // snapshots to
const testNetwork = 'arbitrum';
const signedPlugin = false;

const contractAddr = '0x1111111254eeb25477b68fb85ed929f73a960582';
const chainID = 42161;

// From :
// https://arbiscan.io/tx/0xa2a4d11252e716052ea131c087bc92618457b3ed75b1aa64b958187255b89ac3
const inputData =
    '0x70ccbd31000000000000000000000000000000000000000065c3bc9e63bd54e273dbb40000000000000000000000000082af49447d8a07e3bd95bd0d56f35241523fbab1000000000000000000000000ff970a61a04b1ca14834a43f5de4533ebddb5cc800000000000000000000000065a6ca48de3668622988bb3fbaf30b25fff03f130000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000009541fe58e60000000000000000000000000000000000000000000000000000000000000608800000000000000000000000000000000000000000000000000000000000001601000000000000000000000000000000000000000000000000000000000006088000000000000000000000000069d242796a39619a3f2019b4c046a95630594a200000000000000000000000000000000000000000000000000000000000001e00000000000000000000000000000000000000000000000000000000000000041d1399cd7b3e4ec05d802e8e5d56be9b0c4f936562a7df1b5797fd8edf5fa23a861f1cc37a50178ddfd9ae2fa9012e83ad2cd8a175483de7afc21cffac756378a1b0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000069d242796a39619a3f2019b4c046a95630594a20000000000000000000000001111111254eeb25477b68fb85ed929f73a960582ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000065c50ddc000000000000000000000000000000000000000000000000000000000000001c997f1c9e8778256ddd4468ca4f139453a65097512f8ea834f13ee635bf72af2641aef381eb9d1f32252f4407eb2eeaaa6de05f039e87562c34ec95c4f5608b0fe26b9977';

const serializedTx = populateTransaction(contractAddr, inputData, chainID);

const devices = [
    {
        name: 'nanos',
        label: 'Nano S',
        steps: 12,  // <= Define the number of steps for this test case and this
                    // device
    },
    {
        name: 'nanox',
        label: 'Nano X',
        steps: 7,  // <= Define the number of steps for this test case and this
                   // device
    },
    {
        name: 'nanosp',
        label: 'Nano S+',
        steps: 7,  // <= Define the number of steps for this test case and this
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