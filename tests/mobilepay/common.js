import axios from 'axios'
import qs from 'querystring'
import {mobilepay_token,uri} from '../../conf/token'




fixture`common`
    .meta('fixtureID', 'w')
    .meta({author: 'tommie', createDate: '2020/7'});


test

('allow duplicate', async t => {

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


    let response = await axios(config);

    let q1 = response.data.split("=")[1].split("&")[0];
    response = await axios(config);
    let q2 = response.data.split("=")[1].split("&")[0];


    await t
        .expect(q1).notEql(q2)


});

test

('not allow duplicate', async t => {

    const data = qs.stringify({
        'vendor': 'generic',
        'amount': 1,
        'currency': 'USD',
        'reference': `huang regression`,
        'ipn_url': 'http://47.240.46.69:3002/notify',
        'callback_url': 'https://www.baidu.com',
        'allow_duplicates': 'no'
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


    let response = await axios(config);

    let q1 = response.data.split("=")[1].split("&")[0];
    response = await axios(config);
    let q2 = response.data.split("=")[1].split("&")[0];


    await t
        .expect(q1).eql(q2)


});

test.only

('get transactions', async t => {


    const config = {
        method: 'get',
        url: `${uri}/payment/list`,

        headers: {
            'Authorization': `${mobilepay_token}`,
        },

    };


    let response = await axios(config);
    console.log(response.data);



    await t
        .expect(response.data.transactions.length).ok()


});

