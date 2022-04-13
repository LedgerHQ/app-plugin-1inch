import { processTest } from "./test.fixture";

const contractName = "AggregationRouterV4";

const testLabel = "unoswapKnowTokenSwap"; // <= Name of the test
const testDirSuffix = "unoswap_known"; // <= directory to compare device snapshots to
const testNetwork = "ethereum";
const signedPlugin = false;

// From : https://etherscan.io/tx/0x5a9e6b1a2be905195fdb98094b336acb3bbad3be5af305ae7431737800a6ddb5
const rawTx = "0x02f90138018203c585012a05f200850ce3b0fcf9830285fd941111111254fb6c44bac0bed2854e76f90643097d80b8c82e95b6c80000000000000000000000004fb721ef3bf99e0f2c193847afa296b9257d3c3000000000000000000000000000000000000000000000000000000641154cde000000000000000000000000000000000000000000000000000cf5439c3a7c857e0000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000140000000000000003b6d0340cce561cd3217dc5a6f9b9919fd3928cf3d0e282fe26b9977c001a08080ec840ad593dca3c30d371bb496038fd4df08909ab6937737569ab2e130e3a03136d79e29e0fc470177ea91cfc768c1df77fd206abd405d3fc07ef9c4f45ea4";

const devices = [
    {
        name: "nanos",
        label: "Nano S",
        steps: 9, // <= Define the number of steps for this test case and this device
    }
];

devices.forEach((device) =>
    processTest(device, contractName, testLabel, testDirSuffix, rawTx, signedPlugin, "", testNetwork)
);