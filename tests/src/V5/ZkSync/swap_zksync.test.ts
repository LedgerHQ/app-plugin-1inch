import {populateTransaction, processTest} from '../../test.fixture';

const contractName = 'AggregationRouterV5';

const testLabel = 'swapV5';       // <= Name of the test
const testDirSuffix = 'swap_v5';  // <= directory to compare device snapshots to
const testNetwork = 'zksync_era';
const signedPlugin = false;

const contractAddr = '0x6e2b76966cbd9cf4cc2fa0d76d24d5241e0abc2f';
const chainID = 324;

// From :
// https://era.zksync.network/tx/0x37f514a9146323ac49e55ac206f268e3cac23d9c24431d26cb8963a25c695dfb
const inputData =
    '0x12aa3caf000000000000000000000000a9305c3c14757bae2e73ef7f66fe241f5f6bf3470000000000000000000000005aea5775959fbc2557cc8789bc1bf90a239d9a910000000000000000000000003355df6d4c9c3035724fd0e3914de96a5a83aaf4000000000000000000000000a9305c3c14757bae2e73ef7f66fe241f5f6bf34700000000000000000000000047f6a801d5f85ece22f0bb1cdfdb21e49c9842d100000000000000000000000000000000000000000000000000005af3107a40000000000000000000000000000000000000000000000000000000000000053d11000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000001400000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001150000000000000000000000000000000000000000000000f700006800004e802026678dcd5aea5775959fbc2557cc8789bc1bf90a239d9a91c74ec691ce672f44fecd9f5d4097128f4ef580b300000000000000000000000000000000000000000000000000000045d964b8000020d6bdbf785aea5775959fbc2557cc8789bc1bf90a239d9a910c205aea5775959fbc2557cc8789bc1bf90a239d9a917642e38867860d4512fcce1116e2fb539c5cdd216ae4071138002dc6c07642e38867860d4512fcce1116e2fb539c5cdd216e2b76966cbd9cf4cc2fa0d76d24d5241e0abc2f0000000000000000000000000000000000000000000000000000000000053d115aea5775959fbc2557cc8789bc1bf90a239d9a910000000000000000000000b580f1a7';

const serializedTx = populateTransaction(contractAddr, inputData, chainID);

const devices = [
    {
        name: 'nanos',
        label: 'Nano S',
        steps: 10,  // <= Define the number of steps for this test case and this
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