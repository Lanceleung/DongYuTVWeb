(async function() {
    if (!window.liveList) {
        await initLiveList()
    }
    const id = '{{id}}'
    const liveItem = liveList.find(item => item.id == id)

    fetch(`https://news.hbtv.com.cn/ajax/get_cdn_leech?url=${liveItem.stream}&client-id=d739e7f6-b5e0-40f2-bf89-11fcd621b83b`).then(res2 => res2.json()).then(res2 => {
        playLive(res2.data)
    })
})()