
import {populateTransaction, processTest} from '../../test.fixture';

const contractName = 'AggregationRouterV5';

const testDirSuffix =
    'clipper_swap_to_with_permit_v5';  // <= directory to compare device
                                       // snapshots to
const testNetwork = 'optimism';
const signedPlugin = false;

const contractAddr = '0x1111111254eeb25477b68fb85ed929f73a960582';
const chainID = 10;

// From :
// https://optimistic.etherscan.io/tx/0xd3da82ee069cd30884787289e35d1ddb74b204ed6653fab82b3486ef57d5431d
const inputData =
    '0xc805a6660000000000000000000000005130f6ce257b8f9bf7fac0a0b519bd588120ed4000000000000000000000000062886df50279d0dd50549899edc473853fe79be1000000000000000000000000420000000000000000000000000000000000004200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000639aa263e95d987000000000000000000000000000000000000000000000000000108f2de16f4ac0000000009d534330000003b25bfd7800011c37937e080000190006466ee3061eb577e67db046f3d1b49413692c72e65d2416f65a84f37afbe3c4da23bb233b12beba174925dc6852979cb5c0a1b062a4718a366fa8a76458471682e3888a94c000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000062886df50279d0dd50549899edc473853fe79be10000000000000000000000001111111254eeb25477b68fb85ed929f73a960582ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000066ef8175000000000000000000000000000000000000000000000000000000000000001b6031615ae156664f0a1d4688b4da37f24e78ac000b128c266c4827196516b8ff094dae9ce42625f41bfc4748ba7a43b240476d9ff718831d0f484f48a5429e17e26b9977';

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