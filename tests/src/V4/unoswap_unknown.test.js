import { processTest } from "../test.fixture";

const contractName = "AggregationRouterV4";

const testLabel = "unoswapUnknowTokenSwapV4"; // <= Name of the test
const testDirSuffix = "unoswap_unknown_v4"; // <= directory to compare device snapshots to
const testNetwork = "ethereum";
const signedPlugin = false;

// From : https://etherscan.io/tx/0x4c0f96df7eea94239b86c0844278b9fd71f9ca025adc96027403487d58fb56d7
const rawTx = "0xf9012a178507aef40a0083024d1a9411111112542d85b3ef69ae05771c2dccff4faa2680b8c42e95b6c80000000000000000000000003f1421cb90d26b28e7495cb952f6f4eb1b8681fa0000000000000000000000000000000000002c60bba58d87e26180f29000000000000000000000000000000000000000000000000000000000590893da0b06bf0000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000140000000000000003b6d034001ff7b1932a70997726e4be1fb34a9fbc3cdc4c525a0ede622fb15f5520a04e91e55da29217630e1e766ca3d590b8039637224a607cba06c40eb54332b89df559c874d3415127e58477cdf188630a22e406af843e57419";

const devices = [
    {
        name: "nanos",
        label: "Nano S",
        steps: 4, // <= Define the number of steps for this test case and this device
    },
    {
        name: "nanox",
        label: "Nano X",
        steps: 4, // <= Define the number of steps for this test case and this device
    }
];

devices.forEach((device) =>
    processTest(device, contractName, testLabel, testDirSuffix, rawTx, signedPlugin, "", testNetwork)
);