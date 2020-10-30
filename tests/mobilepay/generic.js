import axios from 'axios'
import qs from 'querystring'
import { Selector } from 'testcafe';
import { ClientFunction } from 'testcafe';
import {uri, mobilepay_token} from '../../conf/token'





async function mobilepayUrl() {


    const data = qs.stringify({
        'vendor': 'generic',
        'amount': 1,
        'currency': 'USD',
        'reference': `huang regression`,
        'ipn_url': 'http://47.240.46.69:3002/notify',
        'callback_url': 'https://www.baidu.com',
        'allow_duplicates': 'yes'
    });
    const config = {
        method: 'post',
        url: `${uri}/payment/pay_qr`,

        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `${mobilepay_token}`,
        },
        data: data
    };

    let response = await axios(config)

    return response.data


}




fixture `generic`
    .meta('fixtureID', 'w')
    .meta({author: 'tommie', createDate: '2020/7'})

    .beforeEach(async t => {
        t.ctx.url = await mobilepayUrl()
    })



test


('generic alipay', async t => {

    console.log(t.ctx.url)
    let q = t.ctx.url.split("=")[1].split("&")[0]
await t
        .navigateTo('https://cli.im/mob/')


        .typeText('#value',`https://proxy.citconpay.com/u_landing?q=${q}`)
        .click('#click-create')
        .wait(30000)


    const data = qs.stringify({
        'amount': 1,
        'currency': 'USD',
        'transaction_id':`${t.ctx.url.split("=")[1].split("&")[0]}`
    });

    const config = {
        method: 'post',
        url: `${uri}/payment/refund`,

        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `${mobilepay_token}`,
        },
        data: data
    };

    let response = await axios(config)
    console.log(response.data.refunded)
    await t
        .expect(response.data.refunded).eql(true)
})


test

('generic wechatpay', async t => {

    console.log(t.ctx.url)
    let q = t.ctx.url.split("=")[1].split("&")[0]
    await t
        .navigateTo('https://cli.im/mob/')


        .typeText('#value',`https://proxy.citconpay.com/u_landing?q=${q}`)
        .click('#click-create')
        .wait(30000)


    const data = qs.stringify({
        'amount': 1,
        'currency': 'USD',
        'transaction_id':`${t.ctx.url.split("=")[1].split("&")[0]}`
    });

    const config = {
        method: 'post',
        url: `${uri}/payment/refund`,

        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `${mobilepay_token}`,
        },
        data: data
    };

    let response = await axios(config)
    console.log(response.data.refunded)
    await t
        .expect(response.data.refunded).eql(true)
})


