#!/bin/bash

# FILL THESE WITH YOUR OWN SDKs PATHS and APP-ETHEREUM's ROOT
#NANOS_SDK=
#NANOX_SDK=
#APP_ETHEREUM=

# create elfs folder if it doesn't exist
mkdir -p elfs

# move to repo's root to build apps
cd ..

echo "*Building elfs for Nano S..."
export BOLOS_SDK="$NANOS_SDK"

echo "**Building app-1inch for Nano S..."
make clean
make -j DEBUG=1
cp bin/app.elf "tests/elfs/plugin_nanos.elf"

echo "**Building app-ethereum for Nano S..."
cd "$APP_ETHEREUM" || exit
make clean
make -j DEBUG=1 CHAIN=ethereum
cd - || exit
cp "${APP_ETHEREUM}/bin/app.elf" "tests/elfs/ethereum_nanos.elf"


echo "*Building elfs for Nano X..."
export BOLOS_SDK="$NANOX_SDK"

echo "**Building app-1inch for Nano X..."
make clean
make -j DEBUG=1
cp bin/app.elf "tests/elfs/plugin_nanox.elf"

echo "**Building app-ethereum for Nano X..."
cd "$APP_ETHEREUM" || exit
make clean
make -j DEBUG=1 CHAIN=ethereum
cd - || exit
cp "${APP_ETHEREUM}/bin/app.elf" "tests/elfs/ethereum_nanox.elf"

echo "done"
