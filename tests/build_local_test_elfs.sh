#!/bin/bash

# FILL THESE WITH YOUR OWN SDKs PATHS and APP-ETHEREUM's ROOT
NANOS_SDK=$NANOS_SDK
NANOX_SDK=$NANOX_SDK
NANOSP_SDK=$NANOS2_SDK
APP_ETHEREUM=/plugin_dev/app-ethereum

# create elfs folder if it doesn't exist
mkdir -p elfs

# move to repo's root to build apps
cd ..

echo "*Building elfs for Nano S..."

echo "**Building app-1inch for Nano S..."
make clean BOLOS_SDK=$NANOS_SDK
make -j DEBUG=1 BOLOS_SDK=$NANOS_SDK
cp bin/app.elf "tests/elfs/1inch_nanos.elf"

echo "**Building app-ethereum for Nano S..."
cd $APP_ETHEREUM
make clean BOLOS_SDK=$NANOS_SDK
make -j DEBUG=1 BOLOS_SDK=$NANOS_SDK CHAIN=ethereum BYPASS_SIGNATURES=1 ALLOW_DATA=1
cd -
cp "${APP_ETHEREUM}/bin/app.elf" "tests/elfs/ethereum_nanos.elf"


echo "*Building elfs for Nano X..."

echo "**Building app-1inch for Nano X..."
make clean BOLOS_SDK=$NANOX_SDK
make -j DEBUG=1 BOLOS_SDK=$NANOX_SDK
cp bin/app.elf "tests/elfs/1inch_nanox.elf"

echo "**Building app-ethereum for Nano X..."
cd $APP_ETHEREUM
make clean BOLOS_SDK=$NANOX_SDK
make -j DEBUG=1 BOLOS_SDK=$NANOX_SDK CHAIN=ethereum BYPASS_SIGNATURES=1 ALLOW_DATA=1
cd -
cp "${APP_ETHEREUM}/bin/app.elf" "tests/elfs/ethereum_nanox.elf"

echo "*Building elfs for Nano SP..."

echo "**Building app-1inch for Nano SP..."
make clean BOLOS_SDK=$NANOSP_SDK
make -j DEBUG=1 BOLOS_SDK=$NANOSP_SDK
cp bin/app.elf "tests/elfs/1inch_nanosp.elf"

echo "**Building app-ethereum for Nano SP..."
cd $APP_ETHEREUM
make clean BOLOS_SDK=$NANOSP_SDK
make -j DEBUG=1 BOLOS_SDK=$NANOSP_SDK CHAIN=ethereum BYPASS_SIGNATURES=1 ALLOW_DATA=1
cd -
cp "${APP_ETHEREUM}/bin/app.elf" "tests/elfs/ethereum_nanosp.elf"

echo "done"
