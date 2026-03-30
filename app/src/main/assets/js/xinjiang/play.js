;(async function() {
  if (!window.liveList_xj || Date.now() - (window.currentTime || 0) > 120000) {
    window.liveList_xj = await getLiveListXj()
  }

  const name = '{{channelName}}'
  const currentItem = window.liveList_xj.find(item => item.name === name)

  playLive(currentItem.url)
})();