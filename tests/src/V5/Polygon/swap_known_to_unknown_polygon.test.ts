import { processTest, populateTransaction } from "../../test.fixture";

const contractName = "AggregationRouterV5";

const testLabel = "swapKnownToUnknownV5"; // <= Name of the test
const testDirSuffix = "swap_known_to_unknown_v5"; // <= directory to compare device snapshots to
const testNetwork = "polygon";
const signedPlugin = false;

const contractAddr = "0x1111111254eeb25477b68fb85ed929f73a960582";
const chainID = 137;

// From : https://polygonscan.com/tx/0x4f8ac4a3693345f93a365bab8ffd200ec5c880c8cf19d1e173619f2b1e4d3a09
const inputData = "0x12aa3caf0000000000000000000000000d15038f8a0362b4ce71d6c879d56bf9fc2884cf000000000000000000000000c2132d05d31c914a87c6611c10748aeb04b58e8f000000000000000000000000eb7eab87837f4dad1bb80856db9e4506fc441f3d0000000000000000000000007e00fdce3ef6d3de0650f98dff5d267cd51ca5770000000000000000000000000905f237d999260f9faf15c3a3ef5ff440771162000000000000000000000000000000000000000000000000000000001dcd6500000000000000000000000000000000000000000000000828ea464247fc2719a60000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000001600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000009f00000000000000000000000000000000000000000000000000008100005300206ae4071118002dc6c07e00fdce3ef6d3de0650f98dff5d267cd51ca57700000000000000000000000000000000000000000000081e6b06dee49165f05bc2132d05d31c914a87c6611c10748aeb04b58e8f80a06c4eca27eb7eab87837f4dad1bb80856db9e4506fc441f3d1111111254eeb25477b68fb85ed929f73a96058200e26b9977";

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