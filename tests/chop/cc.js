import {ClientFunction, Selector} from 'testcafe';
import  axios  from 'axios'
import  qs  from 'querystring'
import {token, uri, old_cc, ronghan} from "../../conf/token";



async function chopUrl() {
    


    const data = qs.stringify({
        'payment_method': 'cc',
        'amount': '1',
        'currency': 'USD',
        'reference': 'huangtest22222222',
        'ipn_url': 'http://47.240.46.69:3002/notify',
        'callback_url_success': 'http://merchant.com/success',
        'callback_url_fail': 'https://www.baidu.com',
        'mobile_result_url': 'https://www.qq.com',
        'allow_duplicates': 'yes'
    });
    const config = {
        method: 'post',
        url: `${uri}/chop/chop`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `${token}`,

        },
        data: data
    };

    let response = await axios(config)

    let url = response.data.url

    return url


}
async function chopOldUrl() {



    const data = qs.stringify({
        'payment_method': 'cc',
        'amount': '1',
        'currency': 'USD',
        'reference': 'huangtest22222222',
        'ipn_url': 'http://47.240.46.69:3002/notify',
        'callback_url_success': 'http://merchant.com/success',
        'callback_url_fail': 'https://www.baidu.com',
        'mobile_result_url': 'https://www.qq.com',
        'allow_duplicates': 'yes'
    });
    const config = {
        method: 'post',
        url: `${uri}/chop/chop`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `${old_cc}`,

        },
        data: data
    };

    let response = await axios(config)

    let url = response.data.url

    return url


}





fixture `cc`
    .meta('fixtureID','f-001')
    .meta({author:'tommie',createDate:'2020/7'})




test
    .before(async t =>{
        t.ctx.url = await chopUrl()
        t.fixtureCtx.url = t.ctx.url
    })
('pay', async t => {
    console.log(t.ctx.url)
    await t.navigateTo(t.ctx.url)
        .typeText('#firstName',"huang")
        .typeText('#lastName','xiaoqian')
        .typeText('#cardNumber','4000000000000002')
        .typeText('#expMonth','12')
        .typeText('#expYear','22')
        .typeText('#cvv','1234')
        .typeText('#zip','123456')
        .click('.MuiButton-label')
        .wait(2000)
        .expect(Selector('span').nth(2).textContent).eql("Payment Approved")//textContent和innerText的区别
    //是内联元素才用textContent？

});

test
('inquire', async t =>{
    const data = qs.stringify({
        'inquire_method': 'real',
        'q': `${t.fixtureCtx.url.split('=')[1]}`
    });

    const config = {
        method: 'post',
        url: `${uri}/chop/inquire`,

        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `${token}`,
        },
        data: data
    };

    let response = await axios(config)
    t.fixtureCtx.transactionId = response.data.transaction_id
    console.log(response.data.notify_result)

    await t
        .expect(response.data.notify_result).eql('success')


})

test
('refund', async t =>{

    let response = await axios(`${uri}/chop/rest/ccreturn?pin=${token.split(' ')[1]}&txn_id=${t.fixtureCtx.transactionId}&amount=0.01`)

    await t
        .expect(response.data.result).eql('success')

})

//--skip-js-errors
test
    .before(async t =>{
        t.ctx.url = await chopOldUrl()
    })
('old pay', async t => {
    console.log(t.ctx.url)
    await t.navigateTo(t.ctx.url)
        .typeText('#ssl_account_data',"4000000000000002")
        .typeText('#ssl_exp_date','1222')
        .typeText('#ssl_cvv2cvc2','1234')
        .click('#formsubmit')
        .wait(60000)
    const getWindowLocation = ClientFunction(() => window.location.href);
    const href = await getWindowLocation();
    console.log(href)
    await t
        .expect(href).contains("ssl_result_message=APPROVAL")

})
//--skip-js-errors



