const path = require('path');

if (process.env.SAUCE_LABS) {
    exports.iosTestApp = 'http://appium.github.io/appium/assets/TestApp7.1.app.zip';
    exports.androidApiDemos = 'http://appium.github.io/appium/assets/ApiDemos-debug.apk';
} else {
    exports.iosTestApp = path.resolve(__dirname, '..', '..', 'apps', 'TestApp.app.zip');
    exports.androidTestApp = path.resolve(__dirname, '..', '..', 'apps', 'citcon_v2.7.2c.45_2020-10-28-universal-release.apk');
}