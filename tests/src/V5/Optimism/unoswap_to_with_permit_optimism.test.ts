import { processTest, populateTransaction } from "../../test.fixture";

const contractName = "AggregationRouterV5";

const testDirSuffix = "unoswap_to_with_permit_v5"; // <= directory to compare device snapshots to
const testNetwork = "optimism";
const signedPlugin = false;

const contractAddr = "0x1111111254eeb25477b68fb85ed929f73a960582";
const chainID = 10;

// From : https://optimistic.etherscan.io/tx/0x4547a6b644e88285fb07677045a9a32475718409f0c1e0adc3f784eabb5fece5
const inputData = "0x3c15fd91000000000000000000000000e787c5abac3b8c0fa3f48fd6d705b0808d8d8f77000000000000000000000000eeeeeb57642040be42185f49c52f7e9b38f8eeee000000000000000000000000000000000000000000000006c6b935b8bbd40000000000000000000000000000000000000000000000000000001611ad27244d0300000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000001c0000000000000003b6d03402f7708fd509d7a60ace6ab22e1e19b3d60e4f77a00000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000e787c5abac3b8c0fa3f48fd6d705b0808d8d8f770000000000000000000000001111111254eeb25477b68fb85ed929f73a960582ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000065a78e76000000000000000000000000000000000000000000000000000000000000001bd4423ccabf2a489b32f2429c32fd6a7f6e17df68dace522d0615aa08aeef07d6798ec8ee14aac3b94e1aa51db64ae37e2ff2df648c094ef76a0ad4b4ae2ed557e26b9977";

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
        processTest(device, contractName, testDirSuffix, testDirSuffix, "", signedPlugin, serializedTx, testNetwork);
    }
);