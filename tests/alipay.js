import { Selector } from 'testcafe';
import  axios  from 'axios'
import  qs  from 'querystring'

async function getUrl() {

    const data = qs.stringify({
        'payment_method': 'alipay',
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
        url: 'https://uat.citconpay.com/chop/chop',

        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer 535F0246ED7E47D6AF4A753EE7475B06',
        },
        data: data
    };

    let response = await axios(config)

    let url = response.data.url
    console.log(url)
    return url


}


fixture `alipay`
    .meta('fixtureID','f-003')
    .meta({author:'tommie',createDate:'2020/7'})
    .before(async ctx =>{
        ctx.url = await getUrl()
    })

test

('h5 pay', async t => {

    await t.navigateTo(t.fixtureCtx.url)


})