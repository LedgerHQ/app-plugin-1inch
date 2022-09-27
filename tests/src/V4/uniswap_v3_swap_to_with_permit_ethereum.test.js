
import { processTest, populateTransaction } from "../test.fixture";

const contractName = "AggregationRouterV4";

const testLabel = "uniswapV3SwapToWithPermit"; // <= Name of the test
const testDirSuffix = "uniswap_v3_swap_to_with_permit"; // <= directory to compare device snapshots to
const signedPlugin = false;
const testNetwork = "ethereum";

const contractAddr = "0x1111111254fb6c44bac0bed2854e76f90643097d";

// // From : https://etherscan.io/tx/0x1f6b7ccfc3d3564b431ab91ae48b46f43eb444c14a5fa9a3eb67cbb3b3dae4c4
const chainID = 1;
const inputData = "0x2521b9300000000000000000000000005ce0595582e42f88ce7c0062c5ec80dd5e76d19300000000000000000000000092d6c1e31e14520e676a687f0a93788b716beff50000000000000000000000000000000000000000000000066d9476e12ac55f5c00000000000000000000000000000000000000000000000d6f34af369384383600000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000d8de6af55f618a7bc69835d55ddc6582220c36c0000000000000000000000000919fa96e88d67499339577fa202345436bcdaf7900000000000000000000000000000000000000000000000000000000000000e00000000000000000000000005ce0595582e42f88ce7c0062c5ec80dd5e76d1930000000000000000000000001111111254fb6c44bac0bed2854e76f90643097dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000000000000000000000000000000000000000000000000000626164e5000000000000000000000000000000000000000000000000000000000000001cf6b847cbc34a503cb6a4ddb58ee9ce2a816bf46cedbb8dc513ae08eccd79183d3615376df280f9c8e1aa11c81eb3c189d2f3f68690a1869a36710a615109a0ade26b9977";
const serializedTx = populateTransaction(contractAddr, inputData, chainID);

const devices = [
    {
        name: "nanos",
        label: "Nano S",
        steps: 13, // <= Define the number of steps for this test case and this device
    },
    {
        name: "nanox",
        label: "Nano X",
        steps: 7, // <= Define the number of steps for this test case and this device
    },
    {
        name: "nanosp",
        label: "Nano S+",
        steps: 7, // <= Define the number of steps for this test case and this device
    }
];

devices.forEach((device) =>{
        processTest(device, contractName, testLabel, testDirSuffix, "", signedPlugin, serializedTx, testNetwork);
    }
);