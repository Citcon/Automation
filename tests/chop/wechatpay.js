import axios from 'axios'
import qs from 'querystring'
import { Selector } from 'testcafe';
import { ClientFunction } from 'testcafe';
import {token,uri} from '../../conf/token'




async function chopUrl() {


    const data = qs.stringify({
        'payment_method': 'wechatpay',
        'amount': '1',
        'currency': 'USD',
        'reference': `huang regression`,
        'ipn_url': 'http://47.240.46.69:3002/notify',
        'callback_url_success': 'https://www.baidu.com',
        'callback_url_fail': 'https://www.qq.com',
        'mobile_result_url': 'https://www.sina.com',
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
async function chopCNYUrl() {


    const data = qs.stringify({
        'payment_method': 'wechatpay',
        'amount': 10,
        'currency': 'CNY',
        'reference': `huang regression`,
        'ipn_url': 'http://47.240.46.69:3002/notify',
        'callback_url_success': 'https://www.baidu.com',
        'callback_url_fail': 'https://www.qq.com',
        'mobile_result_url': 'https://www.sina.com',
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



fixture `wechatpay`
    .meta('fixtureID', 'w')
    .meta({author: 'tommie', createDate: '2020/7'})
    .before(async ctx => {
        ctx.url = await chopUrl()
    })


test

('qr pay', async t => {

    await t
        .navigateTo(t.fixtureCtx.url)
        .wait(60000)



    const getWindowLocation = ClientFunction(() => window.location.href);
    const href = await getWindowLocation();
    console.log(href)
    await t
        .expect(href.split("?")[0]).eql('https://www.baidu.com')

})

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

    const data = qs.stringify({
        'amount': 1,
        'currency': 'USD',
        'transaction_id':`${t.fixtureCtx.transactionId}`
    });

    const config = {
        method: 'post',
        url: `${uri}/chop/refund`,

        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `${token}`,
        },
        data: data
    };

    let response = await axios(config)
    console.log(response.data.refunded)
    await t
        .expect(response.data.refunded).eql(true)

})

test
    .before(async t =>{
        t.ctx.url = await chopCNYUrl()
    })
    ('cny pay', async t => {

        await t
            .navigateTo(t.ctx.url)


        await t
            .expect(Selector('td').withText('$0.01').exists).ok()

    })