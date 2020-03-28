const axios = require('axios');

const appId = 'wx94ce7c0b1a9a19bd';

const appsecret = 'a28f3f9215c4d032f41f5d81a09a70eb';

// 获取微信access_token
const getAccessToken = async () => {
    const data = await axios.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+ appId +'&secret='+ appsecret +'');
    return data;
} 


// 微信授权
const authorization = () => {
    return 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ appId +'&redirect_uri=http://192.168.1.101/index.html&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
}



module.exports = {
    getAccessToken,
    authorization
}