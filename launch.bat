@echo off
docker run --rm -it -v %~dp0/bin:/speculos/bin -v %~dp0/apps:/speculos/apps --publish 40000:40000 --publish 5900:5900 --publish 5000:5000 ghcr.io/ledgerhq/speculos --model nanos --sdk 2.0 --display headless --vnc-port 5900 --vnc-password 1 --seed secret --apdu-port 40000 apps/ethereum.elf -l 1inch:bin/app.elf
