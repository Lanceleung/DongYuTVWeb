function fullscreen() {
   const video = document.querySelector('video')
   if (video) {
        video.style.position = 'fixed'
        video.style.left = 0
        video.style.top = 0
        video.style.width = '100%'
        video.style.height = '100%'
        video.style['z-index'] = 9999
        video.startPlay()
     return
   }

   setTimeout(() => {
    fullscreen()
   }, 30)
}


fullscreen()