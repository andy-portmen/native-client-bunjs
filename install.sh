#!/usr/bin/env bash

cd "$(dirname "$0")/app"

which bun 2>/dev/null
isBun=$?
echo BunJS status = $isBun

if [ $isBun -eq 0 ]; then
  bun run install.js `which node` $1
else
  echo "BunJS is not present. Install it from https://bun.sh/ then run this script one more time"
fi
