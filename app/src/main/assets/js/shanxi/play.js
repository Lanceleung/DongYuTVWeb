(async function() {
    if (!window.channelList_shanxi) {
        await initShanXiTVLive()
    }
    // 通过频道名称取值
    const channelItem = channelList_shanxi.find(item => item.n === '{{channelName}}')
    const playUrl = `https://livehhhttps.sxrtv.com/lsdream/${channelItem.i}/${channelItem.r[0].n}/${getLiveId(channelItem.i)}.m3u8`
    playLive(playUrl)
})();