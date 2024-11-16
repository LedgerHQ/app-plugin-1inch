import { processTest, populateTransaction } from "../../test.fixture";

const contractName = "AggregationRouterV5";

const testLabel = "unoswapV5"; // <= Name of the test
const testDirSuffix = "unoswap_v5"; // <= directory to compare device snapshots to
const testNetwork = "arbitrum";
const signedPlugin = false;

const contractAddr = "0x1111111254eeb25477b68fb85ed929f73a960582";
const chainID = 42161;

// From : https://arbiscan.io/tx/0x0087486f5ff3206e81abb3ad7794ac4c3c2f7f61742ed04bf62bd0ec3f67884f
const inputData = "0x0502b1c5000000000000000000000000155f0dd04424939368972f4e1838687d6a83115100000000000000000000000000000000000000001408851178731b13380000000000000000000000000000000000000000000000000000000698f3875d2dce850000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000140000000000000003b6d034011eecdbd8f2d670016d061e4c064072e6158ede2f012a792";

const serializedTx = populateTransaction(contractAddr, inputData, chainID);

const devices = [
    {
        name: "nanos",
        label: "Nano S",
        steps: 8, // <= Define the number of steps for this test case and this device
    },
    {
        name: "nanox",
        label: "Nano X",
        steps: 7, // <= Define the number of steps for this test case and this device
    },
    {
        name: "nanosp",
        label: "Nano S+",
        steps: 7, // <= Define the number of steps for this test case and this device
    }
];

devices.forEach((device) =>{
        processTest(device, contractName, testLabel, testDirSuffix, "", signedPlugin, serializedTx, testNetwork);
    }
);