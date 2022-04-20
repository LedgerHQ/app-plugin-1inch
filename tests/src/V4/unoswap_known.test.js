import { processTest } from "../test.fixture";

const contractName = "AggregationRouterV4";

const testLabel = "unoswapKnowTokenSwapV4"; // <= Name of the test
const testDirSuffix = "unoswap_known_v4"; // <= directory to compare device snapshots to
const testNetwork = "ethereum";
const signedPlugin = false;

// From : https://etherscan.io/tx/0x30517d1dab4b5a24bf8298b3a6111743e6801ace0baf915f08db93b828395998
const rawTx = "0xf9012c82035885098bca5a00830257129411111112542d85b3ef69ae05771c2dccff4faa2680b8c42e95b6c80000000000000000000000000391d2021f89dc339f60fff84546ea23e337750f000000000000000000000000000000000000000000000027657afc260bde280000000000000000000000000000000000000000000000000000000005e1eeb6f70000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000100000000000000003b6d03406591c4bcd6d7a1eb4e537da8b78676c1576ba24426a07d41ad4e4fb0c768e09d67acbc4ec093272a7f136ead7eebc9d019c0631bff4da076cd9384abc7df529307c5c0ebf757394662c254babdeed909817a84830b4e34";

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