const webdriverio = require('webdriverio');
const androidOptions = require('./helpers/caps').androidOptions;
const app = require('./helpers/app').androidTestApp;
const expect = require('chai').expect;

androidOptions.capabilities.app = app;
androidOptions.capabilities.noReset = true;
androidOptions.capabilities.appActivity= "com.citcon.citconpay.activity.SplashActivity"
androidOptions.capabilities.appPackage = "com.citcon.citconpay_cup"


describe('payment', function () {
    let client;

    before(async function () {
        client = await webdriverio.remote(androidOptions);
    });
    after(async function () {
        await client.deleteSession();
    });


    it('should pay success', async function () {
        const start = await client.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.ImageButton')
        await start.click()
        const number = await client.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.LinearLayout[1]/android.widget.LinearLayout[1]/android.widget.TextView[1]')

        await number.click()
        const qr = await client.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.LinearLayout[2]/android.widget.TextView[1]')

        await qr.click()

        const receipt = await client.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.TextView')
        await receipt.waitForExist({timeout:60000})

        expect(receipt).to.exist
    });


});