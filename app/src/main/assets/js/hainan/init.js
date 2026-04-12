function playLive_hainan(id) {
    fetch("https://ps.hnntv.cn/ps/livePlayUrl?appCode=&token=&channelCode=" + id, {
          "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "sec-ch-ua": "\"Google Chrome\";v=\"147\", \"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"147\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "X-Referrer": "https://www.hnntv.cn/",
          },
          "body": null,
          "method": "GET",
          "mode": "cors",
          "credentials": "omit"
        }).then(res => res.json())
        .then(res => {
            playLive(res.resultSet[0].url, {
                Referrer: 'https://www.hnntv.cn/'
            })
        })
}

(function() {
    playLive_hainan('{{id}}')
})();