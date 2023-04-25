
import { processTest, populateTransaction } from "../../test.fixture";

const contractName = "AggregationRouterV5";

const testDirSuffix = "clipper_swap_to_with_permit_known_to_known_v5"; // <= directory to compare device snapshots to
const testNetwork = "ethereum";
const signedPlugin = false;

const contractAddr = "0x1111111254eeb25477b68fb85ed929f73a960582";
const chainID = 1;

// From : https://etherscan.io/tx/0x2407ec4aeefb3be552746a116e889f288bf7472cef8b39b667cdf04b5b0c414e
const inputData = "0xc805a666000000000000000000000000e7b0ce0526fbe3969035a145c9e9691d4d9d216c000000000000000000000000c7c38184cc6a4b2d2688a66dc56cf5f849c9aaeb000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb4800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000121a81d8c000000000000000000000000000000000000000000000000378352352edd1e000000000005f5e1000000001c46c5000000b1a2bc2ec5000000bc006463a31b61abcedf341d8343b6ce40b032b066a3c8f0b4f130ae22304aae730a056a2d43692782578f7e76741568a58522e96362e8dccbd75651beb57ea88e0a1564e0321a000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000c7c38184cc6a4b2d2688a66dc56cf5f849c9aaeb0000000000000000000000001111111254eeb25477b68fb85ed929f73a960582ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000063a3c9fe000000000000000000000000000000000000000000000000000000000000001cf66ed4061d6d9c00e7f61a39fd24f3f0cc5ff1015e90faf0c5c34b099dfc0b672be45af298e03e5912191f8ba8c659d85526fd2a645cc61ecb3065ecc628930de26b9977";

const serializedTx = populateTransaction(contractAddr, inputData, chainID);

const devices = [
    {
        name: "nanos",
        label: "Nano S",
        steps: 11, // <= Define the number of steps for this test case and this device
    },
    {
        name: "nanox",
        label: "Nano X",
        steps: 6, // <= Define the number of steps for this test case and this device
    },
    {
        name: "nanosp",
        label: "Nano S+",
        steps: 6, // <= Define the number of steps for this test case and this device
    }
];

devices.forEach((device) =>{
        processTest(device, contractName, testDirSuffix, testDirSuffix, "", signedPlugin, serializedTx, testNetwork);
    }
);