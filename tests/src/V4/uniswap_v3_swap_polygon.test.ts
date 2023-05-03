import { processTest, populateTransaction } from "../test.fixture";

const contractName = "AggregationRouterV4";

const testLabel = "uniswapV3Swap"; // <= Name of the test
const testDirSuffix = "uniswap_v3_swap"; // <= directory to compare device snapshots to
const signedPlugin = false;
const testNetwork= "polygon";

const contractAddr = "0x1111111254fb6c44bac0bed2854e76f90643097d";

const chainID = 137;
const inputData = "0xe449022e00000000000000000000000000000000000000000000000000000000000791550000000000000000000000000000000000000000000000000d772e161e5b20fd00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000001000000000000000000000000c1dc5605b242a658adfc7d6e693a50aefb49bbaee26b9977";
// Create serializedTx and remove the "0x" prefix
const serializedTx = populateTransaction(contractAddr, inputData, chainID);



const devices = [
    {
        name: "nanos",
        label: "Nano S",
        steps: 10, // <= Define the number of steps for this test case and this device
    },
    {
        name: "nanox",
        label: "Nano X",
        steps: 8, // <= Define the number of steps for this test case and this device
    },
    {
        name: "nanosp",
        label: "Nano S+",
        steps: 8, // <= Define the number of steps for this test case and this device
    }
];

devices.forEach((device) =>{
        processTest(device, contractName, testLabel, testDirSuffix, "", signedPlugin, serializedTx, testNetwork);
    }
);