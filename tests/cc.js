import { Selector } from 'testcafe';
import  axios  from 'axios'
import  qs  from 'querystring'


async function getUrl() {
    


    const data = qs.stringify({
        'payment_method': 'cc',
        'amount': '1',
        'currency': 'USD',
        'reference': 'huangtest22222222',
        'ipn_url': 'http://47.240.46.69:3002/notify',
        'callback_url_success': 'http://merchant.com/success',
        'callback_url_fail': 'https://www.baidu.com',
        'mobile_result_url': 'https://www.qq.com?a=1&b=2',
        'allow_duplicates': 'yes'
    });
    const config = {
        method: 'post',
        url: 'https://uat.citconpay.com/chop/chop',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer 4A31F6E4B07E4A5A9FA9ECDFBCEEBAB4',
            'Cookie': 'SERVERID=online-uat-001'
        },
        data: data
    };

    let response = await axios(config)
    let url = await response.data.url
    console.log(url)
    return url
        // .then(function (response) {
        //
        //     console.log((response.data.url));
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });


}





fixture `cc pay`
    .meta('fixtureID','f-001')
    .meta({author:'tommie',createDate:'2020/5'})
    .before(async ctx =>{
        ctx.url = await getUrl()
    })

    .page `https://www.baidu.com`


test
('pay success', async t => {
    console.log(t.fixtureCtx.url)

    await t.navigateTo(t.fixtureCtx.url)
        .typeText('#firstName',"huang")
        .typeText('#lastName','xiaoqian')
        .typeText('#cardNumber','4000000000000002')
        .typeText('#expMonth','12')
        .typeText('#expYear','22')
        .typeText('#cvv','1234')
        .typeText('#zip','123456')
        .click('.MuiButton-label')
        .expect(Selector('span').withText('Payment Approved')).ok()

});


