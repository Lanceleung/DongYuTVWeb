;(async function() {
    const url = await getLiveUrl('{{id}}')
    playLive(url, {
        Referer: 'https://live.fjtv.net/'
    })
})();