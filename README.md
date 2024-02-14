# native-client

Native Client

This [BunJS](https://bun.sh/)-based small client helps the following extensions to communicate with your operating system.

1. Open in Firefox [open Firefox browser with provided URL]
1. Open in Google Chrome [open Google Chrome browser with provided URL]
2. Open in IE [open Internet Explorer browser with provided URL]
3. Open in Chrome [open Chrome browser with provided URL]
4. Open in Edge [open Microsoft Edge browser with provided URL]
5. Open in Safari [open Safari browser with provided URL]
6. Open in GIMP photo editor [open GIMP photo editor with provided URL or a temporary local image file (data-url's are being converted to a temporary local files and then GIMP is called to open this file)]
7. Open in VLC media Player [open VLC media Player with provided URL]

You can find the complete list as well as official IDs in the [config.js](https://github.com/andy-portmen/native-client/blob/master/config.js) file.

How to install

  * Windows: https://www.youtube.com/watch?v=yZAoy8SOd7o
  * Linux and Mac: https://www.youtube.com/watch?v=2asPoW2gJ-c

Notes:

1. For this script to work you need to have BunJS installed on your system
2. On Linux and Mac, you can define custom root directory by adding `--custom-dir=` to the installer script
  Example: `./install.sh --custom-dir=~/Desktop/`
3. Removing the native client [Linux and Mac]: The installer prints all the directories it creates or inserts scripts in. Basically on Linux and Mac, two JSON files are inserted to predefined directories and a root directory is created which contains all the files. To remove the program simply delete the root directory and delete the two generated manifest JSON files. Path to all these files will be printed during installation
4. If you don't remember where the files are, simply run the installer one more time. It just overwrites all the files.
