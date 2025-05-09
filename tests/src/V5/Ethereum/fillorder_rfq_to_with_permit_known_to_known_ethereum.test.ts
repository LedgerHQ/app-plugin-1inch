
import {populateTransaction, processTest} from '../../test.fixture';

const contractName = 'AggregationRouterV5';

const testDirSuffix =
    'fillorder_rfq_to_with_permit_known_to_known_v5';  // <= directory to
                                                       // compare device
                                                       // snapshots to
const testNetwork = 'ethereum';
const signedPlugin = false;

const contractAddr = '0x1111111254eeb25477b68fb85ed929f73a960582';
const chainID = 1;

// From :
// https://etherscan.io/tx/0x407865b2d08c7565c0de83c660aaa637441f898f37ab661a10b89599f4379e19
const inputData =
    '0x70ccbd31000000000000000000000000000000000000000063a07d7c000000000001c0910000000000000000000000004d224452801aced8b2f0aebe155379bb5d594381000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000bb289bc97591f70d8216462df40ed713011b968a00000000000000000000000011e2c16d641f1cd167c3e2dd5ba644ea0e67dddd0000000000000000000000000000000000000000000000a362bd3853d1d000000000000000000000000000000000000000000000000000000000000277cf2a0000000000000000000000000000000000000000000000000000000000000001600000000000000000000000000000000000000000000000000000000277cf2a0000000000000000000000000011e2c16d641f1cd167c3e2dd5ba644ea0e67dddd00000000000000000000000000000000000000000000000000000000000001e000000000000000000000000000000000000000000000000000000000000000416e6ccdddb89661bbc89f0cab185651fb11d1448f5ffaec423403a5d07cc1508d1b42f23e2bbd819480c3f0c6a69a3bf8a060304a56e4fe03d49293f3dd073dd61b0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000011e2c16d641f1cd167c3e2dd5ba644ea0e67dddd0000000000000000000000001111111254eeb25477b68fb85ed929f73a960582ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000063a12cd7000000000000000000000000000000000000000000000000000000000000001c5f8d1485307bb3766d44522c22114d039774d052317d36a881e41bf0616eefe42cf53886a2346a2a125a34f357518461e1a92a42311fd2d272694e9b5601073be26b9977';

const serializedTx = populateTransaction(contractAddr, inputData, chainID);

const devices = [
    {
        name: 'nanos',
        label: 'Nano S',
        steps: 11,  // <= Define the number of steps for this test case and this
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