async function getChannelList_shenzhen() {
  function Qe() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) {
      var t = 16 * Math.random() | 0;
      return ("x" == e ? t : 3 & t | 8).toString(16)
    })
  }

  var o // GMT日期
  var e = "GET" // 请求方法
  var t = '/api/com/catalog/getCatalogList' // 请求地址

  var a = Qe() // 随机参数
    , i = {
      username: "onesz",
      secret: atob("eFVKN0dsczQ1U3QwQ1RuYXRud1p3c0g0VXlZajBycFg="),
      host: "apix.scms.sztv.com.cn"
    }
    , n = "x-date: " + (o = (new Date).toUTCString()) + "\n@request-target: ".concat(e.toLowerCase(), " ").concat(t, "\nhost: ").concat(i.host, "\nnonce: ").concat(a)
    , t = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA512(n, i.secret))

  console.log(n)

  console.log(i.secret)

  const params = {
    GMTDate: o,
    Authorization: 'hmac username="' + i.username + '", algorithm="hmac-sha512", headers="x-date @request-target host nonce", signature="' + t + '"',
    Nonce: a
  }

  return fetch("https://apix.scms.sztv.com.cn/api/com/catalog/getCatalogList?isTree=0&tenantId=ysz&types=2&appCode=20", {
    "headers": {
      "accept": "*/*",
      "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
      "authorization": params.Authorization,
      "cache-control": "no-cache",
      "nonce": params.Nonce,
      "pragma": "no-cache",
      "priority": "u=1, i",
      "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "x-date": params.GMTDate
    },
    "referrer": "https://www.sztv.com.cn/",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "include"
  }).then(res => res.json())
    .then(res => {
      return res.returnData.map(item => {
        return {
          name: item.name,
          id: item.extend.liveId
        }
      })
    })
}

async function getLiveKey_shenzhen(id) {
  const t = Math.floor(new Date().getTime() / 1E3);
  const salt = 'cutvLiveStream|Dream2017'
  const token = CryptoJS.MD5(t + '' + id + salt).toString(CryptoJS.enc.Hex)
  console.log(id, t, token)
  return fetch(`https://hls-api.sztv.com.cn/getCutvHlsLiveKey?t=${t}&id=${id}&token=${token}&at=1`, {
    "headers": {
      "accept": "application/json, text/javascript, */*; q=0.01",
      "accept-language": "zh-CN,zh;q=0.9",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site"
    },
    "referrer": "https://www.sztv.com.cn/",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "omit"
  }).then(res => res.text())
    .then(res => res.replace(/\"/g, ""))
}

async function getCDNKey_shenzhen(id, key) {
  const t = new Date().getTime()
  const salt = 'iYKkRHlmUanQGaNMIJziWOkN'
  const token = CryptoJS.MD5(salt + 'sztv-live.sztv.com.cn' + t).toString(CryptoJS.enc.Hex)
  console.log(t, salt, token)
  return fetch(`https://sttv2-api.sztv.com.cn/api/getCDNkey.php?domain=sztv-live.sztv.com.cn&page=https%3A%2F%2Fwww.sztv.com.cn%2Fpindao%2Findex.html%3FliveId%3D${id}&token=${token}&t=${t}`, {
    "headers": {
      "accept": "application/json, text/javascript, */*; q=0.01",
      "accept-language": "zh-CN,zh;q=0.9",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "priority": "u=1, i",
      "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "X-Referer": "https://www.sztv.com.cn/",
      "Referer": "https://www.sztv.com.cn/"
    },
    "X-referrer": "https://www.sztv.com.cn/",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "omit"
  }).then(res => {
    return res.json()
  }).then(H => {
    const url = `https://sztv-live.sztv.com.cn/${id}/500/${key}.m3u8`
    const b = `/${id}/500/${key}.m3u8`
    var c = Math.floor((new Date().getTime() + 72E5) / 1E3).toString(16);
    return url + "?sign=" + CryptoJS.MD5(H.sign.replace("{IP}", H.ip).replace("{KEY}", H.key).replace("{PATH}", b).replace("{T}", c)).toString(CryptoJS.enc.Hex) + "&t=" + c
  })
}

; (async function () {
  const channelList = await getChannelList_shenzhen()
  let key = await getLiveKey_shenzhen(channelList[0].id)
  console.log('key:', key)
  var b = key.length - Math.floor(key.length / 2);
  // TZzYza==Qbnd
  key = key.substr(b) + key.substr(0, b);
  console.log(key)
  key = key.split("").reverse().join("")
  console.log('key:', key)
  const keyArray = CryptoJS.enc.Base64.parse(key)
  const url = await getCDNKey_shenzhen(channelList[0].id, CryptoJS.enc.Utf8.stringify(keyArray))
  console.log('url: ', url)
  playLive(url, {
    "X-Referer": "https://www.sztv.com.cn/"
  })
})();
