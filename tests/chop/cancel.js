import axios from 'axios'
import qs from 'querystring'
import { Selector } from 'testcafe';
import { ClientFunction } from 'testcafe';
import * as chopToken from '../../conf/token'
import reference from '../../utils/RndInteger'



async function alipayUrl() {


    const data = qs.stringify({
        'payment_method': 'alipay',
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
        url: `${chopToken.uri}/chop/chop`,

        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `${chopToken.token}`,
        },
        data: data
    };

    let response = await axios(config)

    let url = response.data.url

    return url


}
async function alipayO2OUrl() {


    const data = qs.stringify({
        'payment_method': 'alipay',
        'amount': '1',
        'currency': 'USD',
        'reference': `${reference}`,
        'ipn_url': 'http://47.240.46.69:3002/notify',
        'callback_url_success': 'https://www.baidu.com',
        'callback_url_fail': 'https://www.qq.com',
        'mobile_result_url': 'https://www.sina.com',
        'allow_duplicates': 'yes'
    });
    const config = {
        method: 'post',
        url: `${chopToken.uri}/chop/chop`,

        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `${chopToken.o2o}`,
        },
        data: data
    };

    let response = await axios(config)

    let url = response.data.url

    return url


}
async function wechatUrl() {


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
        url: `${chopToken.uri}/chop/chop`,

        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `${chopToken.token}`,
        },
        data: data
    };

    let response = await axios(config)

    let url = response.data.url

    return url


}
async function multiUrl() {


    const data = qs.stringify({
        'payment_method': 'alipay_hk',
        'trans_amount': '10',
        'trans_currency': 'HKD',
        'reference': `${reference}`,
        'ipn_url': 'http://47.240.46.69:3002/notify',
        'callback_url_success': 'https://www.baidu.com',
        'callback_url_fail': 'https://www.qq.com',
        'mobile_result_url': 'https://www.sina.com',
        'allow_duplicates': 'yes'
    });
    const config = {
        method: 'post',
        url: `${chopToken.uri}/chop/chop`,

        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `${chopToken.multi}`,
        },
        data: data
    };

    let response = await axios(config)

    let url = response.data.url

    return url


}


fixture `cancel`
    .meta('fixtureID', 'w')
    .meta({author: 'tommie', createDate: '2020/7'})

test
    .before(async t => {
        t.ctx.url = await wechatUrl()
    })
    ('wechat_cancel_paid', async t => {

        await t
            .navigateTo(t.ctx.url)
            .wait(60000)




        let data = qs.stringify({
            'inquire_method': 'real',
            'q': `${t.ctx.url.split('=')[1]}`
        });

        let config = {
            method: 'post',
            url: `${chopToken.uri}/chop/inquire`,

            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `${chopToken.token}`,
            },
            data: data
        };
        let response = await axios(config)
        data = qs.stringify({
            'transaction_id': `${response.data.transaction_id}`,

        });

        config = {
            method: 'post',
            url: `${chopToken.uri}/chop/cancel`,

            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `${chopToken.token}`,
            },
            data: data
        };

        response = await axios(config)
        console.log(response.data.status)

        await t
            .expect(response.data.status).eql('Order cancelled')

    })

test
    .before(async t => {
        t.ctx.url = await wechatUrl()
    })
    ('wechat_cancel_unpaid', async t => {
        await t
            .navigateTo(t.ctx.url)

        let data = qs.stringify({
            'inquire_method': 'real',
            'q': `${t.ctx.url.split('=')[1]}`
        });

        let config = {
            method: 'post',
            url: `${chopToken.uri}/chop/inquire`,

            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `${chopToken.token}`,
            },
            data: data
        };
        let response = await axios(config)
        data = qs.stringify({
            'transaction_id': `${response.data.transaction_id}`,

        });

        config = {
            method: 'post',
            url: `${chopToken.uri}/chop/cancel`,

            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `${chopToken.token}`,
            },
            data: data
        };

        response = await axios(config)
        console.log(response.data.status)

        await t
            .expect(response.data.status).eql('Order cancelled')

    })






test
    .before(async t => {
        t.ctx.url = await alipayUrl()
    })
('alipay_cancel', async t => {

    await t
        .navigateTo(t.ctx.url)




    let data = qs.stringify({
        'inquire_method': 'real',
        'q': `${t.ctx.url.split('=')[1]}`
    });

    let config = {
        method: 'post',
        url: `${chopToken.uri}/chop/inquire`,

        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `${chopToken.token}`,
        },
        data: data
    };
    let response = await axios(config)
    data = qs.stringify({
        'transaction_id': `${response.data.transaction_id}`,

    });

    config = {
        method: 'post',
        url: `${chopToken.uri}/chop/cancel`,

        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `${chopToken.token}`,
        },
        data: data
    };

    response = await axios(config)
    console.log(response.data.status)

    await t
        .expect(response.data.status).eql('Order cancelled')

})

test
    .before(async t => {
        t.ctx.url = await alipayO2OUrl()
    })
    ('alipay_o2o_cancel', async t => {
        await t
            .navigateTo(t.ctx.url)
            .wait(15000)


        let data = qs.stringify({
            'inquire_method': 'real',
            'q': `${t.ctx.url.split('=')[1]}`
        });

        let config = {
            method: 'post',
            url: `${chopToken.uri}/chop/inquire`,

            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `${chopToken.o2o}`,
            },
            data: data
        };
        let response = await axios(config)
        let data1 = qs.stringify({
            'transaction_id': `${response.data.transaction_id}`,

        });
        let data2 = qs.stringify({
            'transaction_reference': `${reference}`,

        });

        let config1 = {
            method: 'post',
            url: `${chopToken.uri}/chop/cancel`,

            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `${chopToken.o2o}`,
            },
            data: data1
        };
        let config2 = {
            method: 'post',
            url: `${chopToken.uri}/chop/cancel`,

            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `${chopToken.o2o}`,
            },
            data: data2
        };

        response = await axios(config1)
        console.log(response.data.status)

        await t
            .expect(response.data.status).eql('Order cancelled')

        response = await axios(config2)
        await t
            .expect(response.data.status).eql('Duplicate cancellation',"cancel by reference ok")
    })




test
    .before(async t => {
        t.ctx.url = await multiUrl()
    })
    ('multiWallet_cancel', async t => {

        await t
            .navigateTo(t.ctx.url)




        let data = qs.stringify({
            'inquire_method': 'real',
            'q': `${t.ctx.url.split('=')[1]}`
        });

        let config = {
            method: 'post',
            url: `${chopToken.uri}/chop/inquire`,

            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `${chopToken.multi}`,
            },
            data: data
        };
        let response = await axios(config)
        let data1 = qs.stringify({
            'transaction_id': `${response.data.transaction_id}`,

        });
        let data2 = qs.stringify({
            'transaction_reference': `${reference}`,

        });

        let config1 = {
            method: 'post',
            url: `${chopToken.uri}/chop/cancel`,

            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `${chopToken.multi}`,
            },
            data: data1
        };
        let config2 = {
            method: 'post',
            url: `${chopToken.uri}/chop/cancel`,

            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `${chopToken.multi}`,
            },
            data: data2
        };

        response = await axios(config1)
        console.log(response.data.status)

        await t
            .expect(response.data.status).eql('Order cancelled')
        response = await axios(config2)
        await t
            .expect(response.data.status).eql('Duplicate cancellation',"cancel by reference ok")


    })
