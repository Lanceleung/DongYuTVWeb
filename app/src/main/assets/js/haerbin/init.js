function playLive_haerbin(id) {
    fetch("https://www.hrbtv.net/m2o/channel/channel_info.php?id=" + id, {
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
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest"
      },
      "referrer": "https://www.hrbtv.net/",
      "body": null,
      "method": "GET",
      "mode": "cors",
      "credentials": "include"
    }).then(res => res.json())
    .then(res => {
        playLive(res[0].channel_stream[0].live_url)
    })
}

(function() {
    playLive_haerbin('{{id}}');
})();