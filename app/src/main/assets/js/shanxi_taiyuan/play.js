;(async function() {
    const id = '{{id}}'
    const key = 'cutvLiveStream|Dream2017'
    const name = await getLiveUrl(id, key)
    const url = `https://tytv-hls.sxtygdy.com/${id}/500/${name}.m3u8`
    playLive(url)
})();