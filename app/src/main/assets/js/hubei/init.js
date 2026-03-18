async function initLiveList() {
   return fetch('https://news.hbtv.com.cn/app/tv/431').then(res => res.text())
    .then(res => {
          // 匹配 liveList: [...] 数组
          const regex = /liveList\s*:\s*(\[[\s\S]*?\])/;
          const liveList = eval(res.match(regex)[1])
          window.liveList = liveList
    })
}

(async function() {
    await initLiveList()
    const id = '{{id}}'
    const liveItem = liveList.find(item => item.id == id)

    fetch(`https://news.hbtv.com.cn/ajax/get_cdn_leech?url=${liveItem.stream}&client-id=d739e7f6-b5e0-40f2-bf89-11fcd621b83b`).then(res2 => res2.json()).then(res2 => {
        playLive(res2.data)
    })
})()

