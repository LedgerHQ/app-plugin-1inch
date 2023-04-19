import { processTest, populateTransaction } from "../test.fixture";

const contractName = "AggregationRouterV4";

const testLabel = "uniswapV3SwapTo"; // <= Name of the test
const testDirSuffix = "uniswap_v3_swap_to"; // <= directory to compare device snapshots to
const signedPlugin = false;
const testNetwork= "polygon";

const contractAddr = "0x1111111254fb6c44bac0bed2854e76f90643097d";
const chainID = 137;

// From : https://polygonscan.com/tx/0xc062bccdc04c26cfe100b357522b7deb261770f0591a2b470d4993f60cfce19c
const inputData = "0xbc80f1a8000000000000000000000000f957869f317d0cfe3a4f91e4f3425d6fe3048fd0000000000000000000000000000000000000000000000000000000000263af3a000000000000000000000000000000000000000000000001b68664785b65bc0600000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000002800000000000000000000000bb98b3d2b18aef63a3178023a920971cf5f29be4a0000000000000000000000033c4f0043e2e988b3c2e9c77e2c670efe709bfe3e26b9977";
// Create serializedTx and remove the "0x" prefix
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
        steps: 9, // <= Define the number of steps for this test case and this device
    },
    {
        name: "nanosp",
        label: "Nano S+",
        steps: 9, // <= Define the number of steps for this test case and this device
    }
];

devices.forEach((device) =>{
        processTest(device, contractName, testLabel, testDirSuffix, "", signedPlugin, serializedTx, testNetwork);
    }
);