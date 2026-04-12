function playLive_yunnan(id) {
    HttpUtil.get("https://yntv-api.yntv.cn/index/jmd/getRq?name=" + id, {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
            "sec-ch-ua": "\"Google Chrome\";v=\"143\", \"Chromium\";v=\"143\", \"Not A(Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "Referer": "https://www.yntv.cn/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36`"
          },
      responseType: 'json'
    }).then(res => {
        const host = 'https://tvlive.yntv.cn'
        const playUrl = host + res.data.url + "?wsSecret=" + res.data.string + "&wsTime=" + res.data.time
        playLive(playUrl, {
            "X-Referer": 'https://www.yntv.cn/'
        })
    })
}

(function() {
    playLive_yunnan('{{id}}')
})();