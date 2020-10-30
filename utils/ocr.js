// import Tesseract from 'tesseract.js';
// const { createWorker }= require('tesseract.js')
// import createTestCafe from 'testcafe';
import { Selector } from 'testcafe';


fixture ``
    .page('https://proxy.citconpay.com/u_landing?q=U0000077298-1eb648bac37e0f5fb264')

test
('ssss', async t => {
    const button = Selector('.am-button-blue').nth(0)
    //
    // const testCafe         = await createTestCafe('localhost', 1337, 1338);
    // const runner           = testCafe.createRunner();
    // const remoteConnection = testCafe.createBrowserConnection();
    await t
        .click(button)
        // .click('h5')


    //
    //
    // const imgUrl = Selector('img').getAttribute('src')
    // console.log(imgUrl)



// const worker = createWorker({
//     logger: m => console.log(m)
// });
//
// (async () => {
//     await worker.load();
//     await worker.loadLanguage('eng');
//     await worker.initialize('eng');
//     const { data: { text } } = await worker.recognize('https://s1.ax1x.com/2020/07/31/aQcPjx.jpg');
//     console.log(text);
//     await worker.terminate();
// })();
    // await t
    //     .wait(10000)
    //     .typeText('#logon_id','hidedo@sina.com')
    //     .typeText('#pwd_unencrypt','486255')
    //     .typeText('#omeoCheckcode',`${text}`)
    //     .click("button[type='submit']")


})
