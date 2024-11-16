
import { processTest, populateTransaction } from "../../test.fixture";

const contractName = "AggregationRouterV5";

const testDirSuffix = "clipper_swap_v5"; // <= directory to compare device snapshots to
const testNetwork = "arbitrum";
const signedPlugin = false;

const contractAddr = "0x1111111254eeb25477b68fb85ed929f73a960582";
const chainID = 42161;

// From : https://arbiscan.io/tx/0x4927e9209839f60b1680702136f81ffea9aed3dad0369bdf54129a12aba21228
const inputData = "0x84bd6d29000000000000000000000000769728b5298445ba2828c0f3f5384227fbf590c5000000000000000000000000912ce59144191c1204e64559fe8253a0e49e6548000000000000000000000000fd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb90000000000000000000000000000000000000000000000036c53e8685432ef6b00000000000000000000000000000000000000000000000000000000022c32eb0000000003711e680000000005f5e100016345785d8a0000012c00fa66eebd8ca2da1ff9f4fd11095d29e9924b3bf27a150c646673fb128c22906e3bfd0e99408fc863f9f9d9ed226a931df3c3dfa876698eaccfa30dde4429837e50a8e81357e26b9977";

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