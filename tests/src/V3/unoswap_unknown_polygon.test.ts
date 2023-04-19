import { processTest, populateTransaction } from "../test.fixture";

const contractName = "AggregationRouterV3";

const testLabel = "unoswapUnknowTokenSwapV3"; // <= Name of the test
const testDirSuffix = "unoswap_unknown_v3"; // <= directory to compare device snapshots to
const testNetwork = "polygon";
const signedPlugin = false;

const contractAddr = "0x11111112542d85b3ef69ae05771c2dccff4faa26";
const chainID = 137;

// From : https://polygonscan.com/tx/0xae22ab349dc90c1cb1fa7f13049d7590a611441c7201d3e558556d2ed1fde1ba
const inputData = "0x2e95b6c80000000000000000000000004c28f48448720e9000907bc2611f73022fdce1fa00000000000000000000000000000000000000000000000cd359a2e18f2911ba00000000000000000000000000000000000000000000000cd359a2e18f2911ba0000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000300000000000000003b6d034080b3902afc046e6c41dba93bedb1872f78e541a100000000000000003b6d0340e88e24f49338f974b528ace10350ac4576c5c8a180000000000000003b6d03409b5c71936670e9f1f36e63f03384de7e06e60d2a";

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

devices.forEach((device) =>
    processTest(device, contractName, testLabel, testDirSuffix, "", signedPlugin, serializedTx, testNetwork)
);