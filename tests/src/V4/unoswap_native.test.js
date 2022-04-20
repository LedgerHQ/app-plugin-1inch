import { processTest } from "../test.fixture";

const contractName = "AggregationRouterV4";

const testLabel = "unoswapNativeTokenSwapV4"; // <= Name of the test
const testDirSuffix = "unoswap_native_v4"; // <= directory to compare device snapshots to
const testNetwork = "ethereum";
const signedPlugin = false;

// From : https://etherscan.io/tx/0xe2d17051ba2133a4dd7b89f3cc8f8ee5512e6b72e57e89e39a23565788f42a3c
const rawTx = "0xf90154820de785138eca4800830481d39411111112542d85b3ef69ae05771c2dccff4faa268814d1120d7b160000b8e42e95b6c8000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000014d1120d7b1600000000000000000000000000000000000000000000000000235f6a71a6c58aa4b60000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000200000000000000003b6d034074c99f3f5331676f6aec2756e1f39b4fc029a83e00000000000000003b6d03404b8852e4747b8a7d4caf0440e4e3397032a6723d25a0c5da83ad09c5c15e54ab526e87024366e7618517f26b6b67275ccbbba825328ca029e0994432accfb3f80d78a7d74d8fdbd1897024b951fb2e5f51bfc07bfa8af3";

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