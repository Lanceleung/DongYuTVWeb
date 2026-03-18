;(async function() {
    const url = await getLiveUrl('{{id}}')
    playLive(url)
})()