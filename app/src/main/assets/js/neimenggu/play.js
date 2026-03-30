;(async function() {
    if (!window.liveList || Date.now() - (window.currentTime || 0) > 120000) {
        window.liveList = await getLiveList_neimenggu()
    }
    const liveItem = liveList.find(item => item.name === '{{channelName}}')
    playLive(liveItem.url)
})();