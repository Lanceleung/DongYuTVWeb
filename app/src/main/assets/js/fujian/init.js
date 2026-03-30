function m2o_request_sign() {
  var apiKey = '877a9ba7a98f75b90a9d49f53f15a858';
  var _0x7523x48 = 'NjhhMDRiODE3N2JkYzllNWUxNmE4OWU2Nzc3YTdiNjY=';
  var _0x7523x49 = '1.0.0';
  var _0x7523x4a = parseInt((new Date())['getTime']() / 1000);
  var _0x7523x4b = apiKey + '&' + _0x7523x48 + '&' + _0x7523x49 + '&' + _0x7523x4a;
  var _0x7523x4c = CryptoJS.MD5(_0x7523x4b).toString(CryptoJS.enc.Hex);
  var _0x7523x4d = {
    "X-API-TIMESTAMP": _0x7523x4a,
    "X-API-KEY": apiKey,
    "X-AUTH-TYPE": 'md5',
    "X-API-VERSION": _0x7523x49,
    "X-API-SIGNATURE": _0x7523x4c
  };
  return _0x7523x4d
}

async function getLiveUrl(id) {
    return fetch("https://live.fjtv.net/m2o/channel/channel_info.php?channel_id=" + id, {
     "headers": {
       "accept": "application/json, text/javascript, */*; q=0.01",
       "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
       "cache-control": "no-cache",
       "pragma": "no-cache",
       "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
       "sec-ch-ua-mobile": "?0",
       "sec-ch-ua-platform": "\"Windows\"",
       "sec-fetch-dest": "empty",
       "sec-fetch-mode": "cors",
       "sec-fetch-site": "same-origin",
       ...m2o_request_sign(),
       "x-requested-with": "XMLHttpRequest"
     },
     "referrer": "https://live.fjtv.net/zhpd/",
     "body": null,
     "method": "GET",
     "mode": "cors",
     "credentials": "include"
   }).then(res => res.json())
     .then(res => {
       return res[0].m3u8
     })
}

;(async function() {
    const url = await getLiveUrl('{{id}}')
    console.log('url:', url)
    playLive(url)
})();