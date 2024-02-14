#!/usr/bin/env bash

echo " -> Removing manifest file for Google Chrome"
rm -f ~/.config/google-chrome/NativeMessagingHosts/org.webextension.bun.json
echo " -> Removing manifest file for Chromium"
rm -f ~/.config/chromium/NativeMessagingHosts/org.webextension.bun.json
echo " -> Removing manifest file for Vivaldi"
rm -f ~/.config/vivaldi/NativeMessagingHosts/org.webextension.bun.json
echo " -> Removing manifest file for Brave"
rm -f ~/.config/BraveSoftware/Brave-Browser/NativeMessagingHosts/org.webextension.bun.json
echo " -> Removing manifest file for Microsoft Edge"
rm -f ~/.config/microsoftedge/NativeMessagingHosts/org.webextension.bun.json
echo " -> Removing manifest file for Mozilla Firefox"
rm -f ~/.mozilla/native-messaging-hosts/org.webextension.bun.json
echo " -> Removing manifest file for Waterfox"
rm -f ~/.waterfox/native-messaging-hosts/org.webextension.bun.json
echo " -> Removing manifest file for Tor"
rm -f ~/.tor-browser/app/Browser/TorBrowser/Data/Browser/.mozilla/native-messaging-hosts/org.webextension.bun.json
echo " -> Removing manifest file for Thunderbird"
rm -f ~/.thunderbird/native-messaging-hosts/org.webextension.bun.json
echo " -> Removing executables"
rm -f -r ~/.config/org.webextension.bun

echo ">>> Native Client is removed <<<".
