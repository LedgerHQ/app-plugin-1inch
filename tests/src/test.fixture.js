import Zemu from '@zondax/zemu';
import Eth from '@ledgerhq/hw-app-eth';

const transactionUploadDelay = 60000;

export async function waitForAppScreen(sim) {
    await sim.waitUntilScreenIsNot(sim.getMainMenuSnapshot(), transactionUploadDelay);
}

const simOptions = {
    model: 'nanos',
    logging: true,
    X11: false,
    startDelay: 15000,
    custom: '',
};

const Resolve = require('path').resolve;

const APP_PATH = Resolve('elfs/ethereum.elf');

const PLUGIN_LIB = { '1inch': Resolve('elfs/1inch.elf') };

export function zemu(func) {
    return async () => {
        jest.setTimeout(100000);
        const sim = new Zemu(APP_PATH, PLUGIN_LIB);
        try {
            await sim.start(simOptions);
            const transport = await sim.getTransport();
            await func(sim, new Eth(transport));
        } finally {
            await sim.close();
        }
    };
}
