import axios from 'axios'
import qs from 'querystring'
import {token,uri} from '../../conf/token'




fixture`common`
    .meta('fixtureID', 'w')
    .meta({author: 'tommie', createDate: '2020/7'});


test

('allow duplicate', async t => {

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


    let response = await axios(config);

    let q1 = response.data.url.split('?')[1];
    response = await axios(config);
    let q2 = response.data.url.split('?')[1];


    await t
        .expect(q1).notEql(q2)


});

test

('not allow duplicate', async t => {

    const data = qs.stringify({
        'payment_method': 'wechatpay',
        'amount': '1',
        'currency': 'USD',
        'reference': `huang regression`,
        'ipn_url': 'http://47.240.46.69:3002/notify',
        'callback_url_success': 'https://www.baidu.com',
        'callback_url_fail': 'https://www.qq.com',
        'mobile_result_url': 'https://www.sina.com',
        'allow_duplicates': 'no'
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


    let response = await axios(config);

    let q1 = response.data.url.split('?')[1];
    response = await axios(config);
    let q2 = response.data.url.split('?')[1];


    await t
        .expect(q1).eql(q2)


});

test

('get transactions', async t => {


    const config = {
        method: 'get',
        url: `${uri}/chop/transactions`,

        headers: {
            'Authorization': `${token}`,
        },

    };


    let response = await axios(config);
    console.log(response.data);



    await t
        .expect(response.data.length).ok()


});

test

('CN domain', async t => {

    const data = qs.stringify({
        'payment_method': 'wechatpay',
        'amount': '1',
        'currency': 'USD',
        'reference': `huang regression`,
        'ipn_url': 'http://47.240.46.69:3002/notify',
        'callback_url_success': 'https://www.baidu.com',
        'callback_url_fail': 'https://www.qq.com',
        'mobile_result_url': 'https://www.sina.com',
        'allow_duplicates': 'yes',
        'client_country':'CN'
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


    let response = await axios(config);




    await t
        .expect(response.data.url).contains('api-uat.citconpay.cn')

});