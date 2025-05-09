import {populateTransaction, processTest} from '../test.fixture';

const contractName = 'AggregationRouterV4';

const testLabel = 'fillOrderRFQToWithPermit';  // <= Name of the test
const testDirSuffix =
    'fill_order_rfq_to_with_permit';  // <= directory to compare device
                                      // snapshots to
const signedPlugin = false;
const testNetwork = 'ethereum';

const contractAddr = '0x1111111254fb6c44bac0bed2854e76f90643097d';

// // From :
// https://etherscan.io/tx/0x9e011accd8fb355f6c7d222125b56ebdae914f3f119c6f51b85e77b82a4935b9
const chainID = 1;
const inputData =
    '0x4cc4a27b0000000000000000000000000000000000000000626b92a5a920808096ecf6a4000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec7000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000b398ffef80144095b8712c70a0c09886c8151feb00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000111998dab0000000000000000000000000000000000000000000000000000000111a1f59b000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000111a1f59b000000000000000000000000a7ecacd4d1438c24ed13795685037abc81b4a0ad00000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000041104cb670f1925fb98c09f628803f4464d963350432296121136a1195f5bf1b7a4f4d718f6a8218f9faf48d810b901be7fa778e7b56270698e9e71427fba90b5d1c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000a7ecacd4d1438c24ed13795685037abc81b4a0ad0000000000000000000000001111111254fb6c44bac0bed2854e76f90643097dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000000000000000000000000000000000000000000000000000626c41b0000000000000000000000000000000000000000000000000000000000000001cf589d90f676dcd03cbc287e010a697a00f6369fdbe7221ff5d7a9746b68b4e092e55fb68857d54dab6c6eef60058ead2ac51606356e2623e614c6c7529633c2ae26b9977';
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
        device, contractName, testLabel, testDirSuffix, '', signedPlugin,
        serializedTx, testNetwork);
});