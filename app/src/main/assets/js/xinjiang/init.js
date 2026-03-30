async function getLiveListXj() {
  const stamp = Date.now()
  const str = '@#@$AXdm123%)(ds' + stamp + 'api/TVLiveV100/TVChannelList'

  const sign = CryptoJS.MD5(str).toString(CryptoJS.enc.Hex)

  return fetch(`https://slstapi.xjtvs.com.cn/api/TVLiveV100/TVChannelList?type=1&stamp=${stamp}&sign=${sign}&json=true`, {
    "headers": {
      "accept": "*/*",
      "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site"
    },
    "referrer": "https://www.xjtvs.com.cn/",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "omit"
  }).then(res => {
    return res.json()
  }).then(res => {
    return res.data.map(item => {
      return {
        name: item.ChineseName,
        url: item.PlayStreamUrl
      }
    })
  })
}

;(async function() {
  window.liveList_xj = await getLiveListXj()
  window.currentTime = Date.now()

  const name = '{{channelName}}'

  const currentItem = window.liveList_xj.find(item => item.name === name)

  playLive(currentItem.url, {
    "Referer": "https://www.xjtvs.com.cn/",
    "X-Referer": "https://www.xjtvs.com.cn/"
  })
})();