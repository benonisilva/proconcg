adb logcat | findstr /R /C:"CONSOLE";
"C:\Users\benon\AppData\Local\Android\android-sdk\build-tools\25.0.2\zipalign" -v 4 "C:/Users/benon/Development/procon-web/proconcg/platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk" ProconCGMovel1.apk
cordova build --release android
"C:\Program Files\Java\jdk1.8.0_131\bin\jarsigner" -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore C:\Users\benon\Development\procon-web\lb_key.keystore "C:/Users/benon/Development/procon-web/proconcg/platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk" lb_key
"C:\Program Files\Java\jdk1.8.0_131\bin\keytool"