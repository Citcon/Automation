import axios from 'axios'
import qs from 'querystring'
import { Selector } from 'testcafe';
import { ClientFunction } from 'testcafe';
import {uri, mobilepay_token, ams_token, ronghan_token} from '../../conf/token'

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
        url: `${uri}/payment/pay`,

        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `${mobilepay_token}`,
        },
        data: data
    };

    let response = await axios(config)

    return response.data


}
async function multiWalletUrl() {


    const data = qs.stringify({
        'vendor': 'dana',
        'trans_amount': 60000,
        'trans_currency': 'IDR',
        'reference': `huang regression`,
        'ipn_url': 'http://47.240.46.69:3002/notify',
        'callback_url': 'https://www.baidu.com',
        'allow_duplicates': 'yes'
    });
    const config = {
        method: 'post',
        url: `${uri}/payment/pay`,

        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `${ams_token}`,
        },
        data: data
    };

    let response = await axios(config)


    return response.data



}
async function ronghanUrl() {


    const data = qs.stringify({
        'vendor': 'generic',
        'amount': 1,
        'currency': 'GBP',
        'reference': `huang regression`,
        'ipn_url': 'http://47.240.46.69:3002/notify',
        'callback_url': 'https://www.baidu.com',
        'allow_duplicates': 'yes'
    });
    const config = {
        method: 'post',
        url: `${uri}/payment/pay`,

        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `${ronghan_token}`,
        },
        data: data
    };

    let response = await axios(config)

    return response.data


}
fixture `h5`
    .meta('fixtureID', 'w')
    .meta({author: 'tommie', createDate: '2020/7'})



test
    .before(async t => {
        t.ctx.url = await mobilepayUrl()
    })

    ('generic h5', async t => {

        console.log(t.ctx.url)

        await t
            .navigateTo(t.ctx.url)
            .expect(Selector('a').withText('继续浏览器付款').exists).ok()
    })
//--skip-js-errors
test
    .before(async t => {
        t.ctx.url = await multiWalletUrl()
    })
    .after(async  t =>{
        const data = qs.stringify({
            'trans_amount': 30000,
            'trans_currency': 'IDR',
            'transaction_id':`${t.ctx.url.split('=')[1]}`
        });

        const config = {
            method: 'post',
            url: `${uri}/payment/refund`,

            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `${ams_token}`,
            },
            data: data
        };

        let response = await axios(config)
        console.log(response.data.refunded)


    })

    ('multiWallet h5', async t => {

        console.log(t.ctx.url)

        await t
            .navigateTo(t.ctx.url)
            .typeText(Selector('input').withAttribute('type','tel'),'878 9123 2241')
            .click('.btn')
            .typeText('.digital-password','123123')
            .click('.btn')
            .click('.btn-pay')
            .wait(10000)
        const getWindowLocation = ClientFunction(() => window.location.href);
        const href = await getWindowLocation();
        console.log(href)

         await t
            .expect(href.split("?")[0]).eql('https://www.baidu.com/')





        })
//--skip-js-errors

test.only
    .before(async t => {
        t.ctx.url = await ronghanUrl()
    })

    ('ronghan h5', async t => {

        console.log(t.ctx.url)

        await t
            .navigateTo(t.ctx.url)
            .expect(Selector('button').withText('下一步').exists).ok()
    })