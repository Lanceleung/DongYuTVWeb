async function getLiveUrl(liveId, liveUrlKey) {
      let time=parseInt(new Date().getTime() / 1000);
      let token=CryptoJS.MD5(time+liveId+liveUrlKey).toString(CryptoJS.enc.Hex);
    return fetch("https://hls-api.sxtygdy.com/getCutvHlsLiveKey?t="+time+"&id="+liveId+"&token="+token, {
     "headers": {
       "accept": "*/*",
       "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
       "cache-control": "no-cache",
       "pragma": "no-cache",
       "priority": "u=1, i",
       "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
       "sec-ch-ua-mobile": "?0",
       "sec-ch-ua-platform": "\"Windows\"",
       "sec-fetch-dest": "empty",
       "sec-fetch-mode": "cors",
       "sec-fetch-site": "same-site"
     },
     "body": null,
     "method": "GET",
     "mode": "cors",
     "credentials": "omit"
   }).then(res => {
      return res.text()
   })
}

;(async function() {
    const id = '{{id}}'
    const key = 'cutvLiveStream|Dream2017'
    const name = await getLiveUrl(id, key)
    const url = `https://tytv-hls.sxtygdy.com/${id}/500/${name}.m3u8`
    playLive(url)
})();