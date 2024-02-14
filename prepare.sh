#!/usr/bin/env bash

cd linux
zip ../linux.zip -9 -r * -x "*.DS_Store"
cd ../mac
zip ../mac.zip -9 -r * -x "*.DS_Store"
