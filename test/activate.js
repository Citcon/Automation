

const webdriverio = require('webdriverio');
const androidOptions = require('./helpers/caps').androidOptions;
const app = require('./helpers/app').androidTestApp;
const expect = require('chai').expect;

androidOptions.capabilities.app = app;
androidOptions.capabilities.noReset = false;
androidOptions.capabilities.appActivity= "com.citcon.citconpay.activity.SplashActivity"
androidOptions.capabilities.appPackage = "com.citcon.citconpay_cup"
androidOptions.capabilities.autoGrantPermissions = true


describe('activate', function () {
    let client;

    before(async function () {
        client = await webdriverio.remote(androidOptions);
    });
    after(async function () {
        await client.deleteSession();
    });
    it('should activate success', async function () {
        const input = await client.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.EditText');
        const button = await client.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.TextView')
        // const radios = await client.findElements('class name', 'android.widget.RadioButton')

        await input.setValue('CEBF4A22')
        // await client.elementSendKeys(inputs[1].ELEMENT,'https://uat.citconpay.com/posp/rest/')
        // await client.elementClick(radios[1].ELEMENT)
        await button.click()

        const start = await client.$('android.widget.ImageButton')
        await start.waitForExist({timeout:5000})
        expect(start).to.exist

    });


});