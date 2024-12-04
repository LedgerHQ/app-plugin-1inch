
import {populateTransaction, processTest} from '../../test.fixture';

const contractName = 'AggregationRouterV5';

const testDirSuffix =
    'clipper_swap_v5';  // <= directory to compare device snapshots to
const testNetwork = 'optimism';
const signedPlugin = false;

const contractAddr = '0x1111111254eeb25477b68fb85ed929f73a960582';
const chainID = 10;

// From :
// https://optimistic.etherscan.io/tx/0xabd529168f68758311a8bddc02c3ee50e30c08ac3f05b4c2abb5f6bc885eb445
const inputData =
    '0x84bd6d290000000000000000000000005130f6ce257b8f9bf7fac0a0b519bd588120ed40000000000000000000000000000000000000000000000000000000000000000000000000000000000000000042000000000000000000000000000000000000420000000000000000000000000000000000000000000000000002bff2eb0e60000000000000000000000000000000000000000000000000000fde63fbc25fbe0000000035408f1158000000000939e8700011c37937e080000064019066e1aa4627d5b981e6c427031994a654c14fd0548add6e38dba4548a64501f1c54bd05c42edccc3a443efd074dfe9445f1399420268797fd7e2943c1b7fb2f9a5811f4afe26b9977';

const serializedTx = populateTransaction(contractAddr, inputData, chainID);

const devices = [
    {
        name: 'nanos',
        label: 'Nano S',
        steps: 8,  // <= Define the number of steps for this test case and this
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