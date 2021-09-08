import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { waitForAppScreen, zemu } from './test.fixture';

test('Unoswap know token swap', zemu(async (sim, eth) => {
    // Known ERC20 to known ERC20 (726.7 BOND to 25392 USDC)
    // https://etherscan.io/tx/0x30517d1dab4b5a24bf8298b3a6111743e6801ace0baf915f08db93b828395998
    const tx = eth.signTransaction(
        "44'/60'/0'/0/0",
        'f9012c82035885098bca5a00830257129411111112542d85b3ef69ae05771c2dccff4faa2680b8c42e95b6c80000000000000000000000000391d2021f89dc339f60fff84546ea23e337750f000000000000000000000000000000000000000000000027657afc260bde280000000000000000000000000000000000000000000000000000000005e1eeb6f70000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000100000000000000003b6d03406591c4bcd6d7a1eb4e537da8b78676c1576ba24426a07d41ad4e4fb0c768e09d67acbc4ec093272a7f136ead7eebc9d019c0631bff4da076cd9384abc7df529307c5c0ebf757394662c254babdeed909817a84830b4e34',
    );
    await waitForAppScreen(sim);
    await sim.navigateAndCompareSnapshots('.', 'unoswap_known', [4, 0]);

    await expect(tx).resolves.toEqual({
        r: '5b443f695aaa860e6d590602498f5022e39029d2738206e00dc5d9df82da2de2',
        s: '52b7c3792f1bb8fe4f6be1cf855da3fb3d8bd12c3193b7f3926aee661df7f3ad',
        v: '6f',
    });
}));