;(async function() {
   const url = await getLiveUrl_guizhou('{{id}}', '{{uin}}')
   playLive(url)
})();