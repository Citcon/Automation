const webdriverio = require('webdriverio');
const androidOptions = require('./helpers/caps').androidOptions;
const app = require('./helpers/app').androidTestApp;
const expect = require('chai').expect;

androidOptions.capabilities.app = app;
androidOptions.capabilities.noReset = true;
androidOptions.capabilities.appActivity= "com.citcon.citconpay.activity.SplashActivity"
androidOptions.capabilities.appPackage = "com.citcon.citconpay_cup"


describe('refund', function () {
    let client;

    before(async function () {
        client = await webdriverio.remote(androidOptions);
    });
    after(async function () {
        await client.deleteSession();
    });



    it('should refund success', async function () {
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