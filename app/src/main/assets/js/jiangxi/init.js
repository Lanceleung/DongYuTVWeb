/**
* 江西卫视
*/

(function() {
    function fullscreen() {
        const videoDiv = document.querySelector('#liveplayer')
        if (videoDiv) {
            videoDiv.style.background = "#000"
            videoDiv.style.position = "fixed"
            videoDiv.style.top = "0"
            videoDiv.style.left = "0"
            videoDiv.style['z-index'] = 99999
            /*const scaleW = screen.width / 940
            const scaleH = screen.height / 570
            const scale = Math.min(scaleW, scaleH)
            videoDiv.style.width = `${scale * 940}px`
            videoDiv.style.height = `${scale * 570}px`*/
            videoDiv.style.width = '100vw'
            videoDiv.style.height = '100vh'
            return
        }

        setTimeout(() => {
            fullscreen()
        }, 12)
    }

    fullscreen()
})();


;(function() {
    let i = 0
    const timerId = setInterval(() => {
        const nav = document.querySelector('.channel-info')
        if (nav && nav.style.display !== 'none') {
            nav.style.display = 'none'
        }
        if (i++ > 20) {
            clearInterval(timerId)
        }
    }, i * 100)
})();
