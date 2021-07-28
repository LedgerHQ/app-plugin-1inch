@echo off
docker run --rm -it -v %~dp0:/app ledger-app-builder make SPECULOS=1
