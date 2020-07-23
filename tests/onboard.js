import { Selector } from 'testcafe';
import  axios  from 'axios'
import  qs  from 'querystring'



fixture `onboard`
    .meta('fixtureID','f-002')
    .meta({author:'tommie',createDate:'2020/7'})
    .page('https://login-uat.citconpay.com/app/login')




test
('onboard general', async t => {


    await t
        .typeText('#email','huang.xiaoqian@citcon.cn')
        .typeText('#password','citcon@123')
        .click('.MuiButton-label')

    const response = await axios('http://localhost:8533/code')
    const code = response.data

    await t
        .typeText('#code',`${code}`)
        .click('.MuiButton-label')
        .navigateTo('https://register-uat-v1.citconpay.com/app/merchants/new')
    await t
        .click('#category')
        .click('#category > option:nth-child(2)')
        .click('#source_type')
        .click('#source_type > option:nth-child(2)')
        .click('#agent')
        .click('#agent > option:nth-child(2)')
        .click('#cs_rep')
        .click('#cs_rep > option:nth-child(2)')
        .click('#sales_rep')
        .click('#sales_rep > option:nth-child(2)')
        .click('#sales_group')
        .click('#sales_group > option:nth-child(2)')
        .click('#sales_group')
        .click('#sales_group > option:nth-child(2)')
        .typeText('#store_name','huang store')
        .typeText('#store_dba_name','huang merchant')
        .typeText('#store_street','yuhang')
        .typeText('#store_city','hangzhou')
        .typeText('#store_state','zhejiang')
        .typeText('#store_zip','310012')
        .click('#store_country')
        .click('#store_country > option:nth-last-child(2)')
        .typeText('#namecorporate','huang')
        .typeText('#phonecorporate','13588430088')
        .typeText('#emailcorporate','huang.xiaoqian@citcon.cn')
        .typeText('#namestore','huang')
        .typeText('#phonestore','13588430088')
        .typeText('#emailstore','huang.xiaoqian@citcon.cn')
        .click('#dashboard_timezone')
        .click('#dashboard_timezone > option:nth-child(2)')
        .click('#wechatpay')
        .click('#alipay')
        .click('#online')
        .click('#chop')
        // .click('#offline')
        .typeText('#legal_name','huang')
        .click('#company_id')
        .click('#company_id > option:nth-child(2)')
        .click('#ownership')
        .click('#ownership > option:nth-child(2)')
        .typeText('#legal_address','yuhang')
        .click('#currency')
        .click('#currency > option:nth-child(2)')
        .click('#wechatpay_mcc')
        .click('#wechatpay_mcc > option:nth-child(2)')
        .click('#alipay_mcc')
        .click('#alipay_mcc > option:nth-child(2)')
        .typeText('#product_name','huang product')
        .typeText('#wechat_sub_mch_id','123')
        .click('#vendor_key')
        .click('#vendor_key > option:nth-child(3)')
        .click('#register_merchant_type')
        .click('#register_merchant_type > option:nth-child(2)')
        .click('#online_merchant_site_type')
        .click('#online_merchant_site_type > option:nth-child(2)')
        .typeText('#online_merchant_site_url','https://www.singlelinefilm.cn/')
        .typeText('#EIN','1111')
        .typeText('#bank_routing_number','22222')
        .typeText('#bank_account_number','33333')
        .typeText('#alp_online_rate','1')
        .typeText('#alp_online_fixed_fee','1')
        .typeText('#wxp_online_rate','1')
        .typeText('#wxp_online_fixed_fee','1')
        .click('#root > div.MuiContainer-root.jss1.MuiContainer-maxWidthMd > button')
        .wait(5000)
        .click('#root > div.MuiContainer-root.jss1.MuiContainer-maxWidthMd > button')
        .wait(5000)
        .click('#root > div.MuiContainer-root.jss1.MuiContainer-maxWidthMd > button:nth-child(1)')
        .wait(5000)

        const onlineToken = Selector('tr').nth(1).child('td').nth(2)
        const chopToken = Selector('tr').nth(2).child('td').nth(2)

        console.log('online token:',await onlineToken.textContent)
        console.log('chop token:',await chopToken.textContent)

    await t
          .expect(onlineToken.textContent).ok()
          .expect(chopToken.textContent).ok()






















});
