

let token, uri, ronghan, multi, o2o, old_cc, mobilepay_token, ams_token, ronghan_token, sdk_token, currency;

if (process.env.MODE == 'uat') {
    console.log(process.env.MODE);
    token = 'Bearer 535F0246ED7E47D6AF4A753EE7475B06';

    uri = 'https://uat.citconpay.com';

    ronghan = 'Bearer BNGA0XGOJEHQVINEGBLZJBDRP7CB05WM';
    multi = 'Bearer JP2N5DSOBLBYAF0GXUNOQ3IONR16KPMA';
    o2o = 'Bearer VS3UF9VVF2EC0F8RSASXEF2OA8FQXMXD';
    old_cc = 'Bearer 4A31F6E4B07E4A5A9FA9ECDFBCEEBAB4'
    mobilepay_token = 'Bearer 80CBB74DD7BC4630AB3FE4DF47536163'
    ams_token = 'Bearer XYIL2W9BCQSTNN1CXUQ6WEH9JQYZ3VLM'
    ronghan_token = 'Bearer 292DDDF4D30545EE81499C12C2A9F191'
    sdk_token = 'Bearer 9FBBA96E77D747659901CCBF787CDCF1'
    currency = 'USD'

}

else if (process.env.MODE == 'prod') {
    console.log(process.env.MODE);
    token = 'Bearer B474B47869A7401C989BC185F2A721A1';

    uri = 'https://citconpay.com';
    ronghan = 'Bearer 64CADFEBEE31414494FEDB42563ACEA2';
    multi = 'Bearer B474B47869A7401C989BC185F2A721A1'
    mobilepay_token = 'Bearer AB979E600C0349849BF9E1BFEB8F7EE5'
    ams_token = 'Bearer AFE97591FA004EE1B5D401D7D3CF8354'
    currency = 'USD'
}
else if (process.env.MODE == 'cny-uat') {
    console.log(process.env.MODE);
    token = 'Bearer CNYAPPF6A0FE479A891BF45706A690AE';
    uri = 'https://uat.citconpay.cn';
    mobilepay_token = 'Bearer CNYAPPF6A0FE479A891BF45706A690AE'
    currency = 'CNY'

}
else if (process.env.MODE == 'cny-prod') {
    console.log(process.env.MODE);
    token = 'Bearer CNYAPPF6A0FE479A891BF45706A690AE';
    uri = 'https://citconpay.cn';
    mobilepay_token = 'Bearer CNYAPPF6A0FE479A891BF45706A690AE'
    currency = 'CNY'

}

else{
    token = 'Bearer 535F0246ED7E47D6AF4A753EE7475B06'

    uri = 'https://uat.citconpay.com'

    ronghan = 'Bearer BNGA0XGOJEHQVINEGBLZJBDRP7CB05WM'
    multi = 'Bearer JP2N5DSOBLBYAF0GXUNOQ3IONR16KPMA'
    o2o = 'Bearer VS3UF9VVF2EC0F8RSASXEF2OA8FQXMXD'
    old_cc ='Bearer 4A31F6E4B07E4A5A9FA9ECDFBCEEBAB4'
    mobilepay_token = 'Bearer 80CBB74DD7BC4630AB3FE4DF47536163'
    ams_token = 'Bearer XYIL2W9BCQSTNN1CXUQ6WEH9JQYZ3VLM'
    ronghan_token = 'Bearer 292DDDF4D30545EE81499C12C2A9F191'
    sdk_token = 'Bearer 9FBBA96E77D747659901CCBF787CDCF1'
    currency = 'USD'
}



export {token, uri, ronghan, multi, o2o, old_cc, mobilepay_token, ams_token, ronghan_token, sdk_token, currency}