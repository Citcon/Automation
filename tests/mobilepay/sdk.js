import axios from 'axios'
import qs from 'querystring'
import { sdk_token, uri} from '../../conf/token'

import {ClientFunction} from "testcafe";


async function alipayUrl() {


    const data = qs.stringify({
        'allow_duplicates': 'yes',
        'amount': '1',
        'body': 'test',
        'callback_url': 'https//www.baidu.com',
        'currency': 'USD',
        'ipn_url': 'http://47.240.46.69:3002/notify',
        'reference': 'pay-mobile-test',
        'subject': 'test',
        'vendor': 'alipay',
        'source': 'app'

    });
    const config = {
        method: 'post',
        url: `${uri}/payment/pay_app`,

        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `${sdk_token}`,
        },
        data: data
    };


    let response = await axios(config);
    let orderId =    response.data.order_id
    return orderId


}

fixture `alipay`
    .meta('fixtureID', 'w')
    .meta({author: 'tommie', createDate: '2020/7'});


test
    .before(async t =>{
        t.ctx.transactionId = await alipayUrl()
    })

('app pay', async t => {

    await t
        .navigateTo('https://cli.im/')
        .typeText('#text-content', `https://proxy.citconpay.com/u_landing?q=${t.ctx.transactionId}`)
        .click('#click-create')
        .wait(60000)
    const getWindowLocation = ClientFunction(() => window.location.href);
    const href = await getWindowLocation();
    console.log(href)



});

test
('refund', async t =>{

    const data = qs.stringify({
        'amount': 1,
        'currency': 'USD',
        'transaction_id':`${t.ctx.transactionId}`
    });

    const config = {
        method: 'post',
        url: `${uri}/payment/refund`,

        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `${sdk_token}`,
        },
        data: data
    };

    let response = await axios(config)
    console.log(response.data.refunded)
    await t
        .expect(response.data.refunded).eql(true)

})

