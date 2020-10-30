import axios from 'axios'
import qs from 'querystring'
import {mobilepay_token,uri} from '../../conf/token'
import reference from '../../utils/RndInteger'



fixture`wxmini`
    .meta('fixtureID', 'w')
    .meta({author: 'tommie', createDate: '2020/7'});


test

('mini pay', async t => {

    const data = qs.stringify({

        'amount': 1,
        'currency': 'USD',
        'reference': `${reference}`,
        'ipn_url': 'http://47.240.46.69:3002/notify',
        'openid': 'oT7WI5MNS9SzYyJG5UCq33ZdoxRo',

    });
    const config = {
        method: 'post',
        url: `${uri}/payment/pay_wxmini`,

        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `${mobilepay_token}`,
        },
        data: data
    };


    let response = await axios(config);




    await t
        .expect(response.data.result).eql('success')


});
