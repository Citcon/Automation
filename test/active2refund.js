

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
    it('should refund success', async function () {
        const back = await client.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.LinearLayout/android.widget.TextView')
        await back.click()
        const start = await client.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.ImageButton')
        await start.click()
        const list = await client.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.RelativeLayout/android.widget.ImageView[2]')
        await list.click()
        const trans = await client.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.ExpandableListView/android.widget.LinearLayout[2]/android.widget.TextView[2]')
        await trans.click()
        const refund = await client.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.TextView[2]')
        await refund.click()
        const yes = await client.$('/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.Button[1]')

        await yes.click()
        const result = await client.$('/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.TextView')
        await result.waitForExist({timeout:5000})
        const text = await result.getText()
        expect(text).to.equals('Refund successful $0.01')


    });
});