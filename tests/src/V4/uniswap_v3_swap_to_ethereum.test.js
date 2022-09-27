import { processTest, populateTransaction } from "../test.fixture";

const contractName = "AggregationRouterV4";

const testLabel = "uniswapV3SwapTo"; // <= Name of the test
const testDirSuffix = "uniswap_v3_swap_to"; // <= directory to compare device snapshots to
const signedPlugin = false;
const testNetwork = "ethereum";

const contractAddr = "0x1111111254fb6c44bac0bed2854e76f90643097d";

// // From : https://etherscan.io/tx/0x762dcfc13f66662707b1d369894b2e1a06d3e6f4069d3c211bb7bf5f82c5ad73
const chainID = 1;
const inputData = "0xbc80f1a8000000000000000000000000d8401637ab562b62fa6402c2a499539c20667890000000000000000000000000000000000000000000000000228c385a4eb64e6900000000000000000000000000000000000000000000000000000000052528d70000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000280000000000000000000000088e6a0c2ddd26feeb64f039a2c41296fcb3f5640000000000000000000000000094a28b22e1b4218d590ea6fa916b3c5e670ba55";
const serializedTx = populateTransaction(contractAddr, inputData, chainID);

const devices = [
    {
        name: "nanos",
        label: "Nano S",
        steps: 12, // <= Define the number of steps for this test case and this device
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