async function initShanXiTVLive() {
    const ts = Date.now()
    const t = ts.toString(16)

    const token = CryptoJS.MD5(ts + '/lsdream/336E7E6818120C00FA7E8129A9999A10/info.jsonDream')

    if (typeof window.HttpUtil !== 'undefined') {
        return HttpUtil.get(`https://livehhhttps.sxrtv.com/lsdream/336E7E6818120C00FA7E8129A9999A10/info.json?t=${t}&token=${token}`, {
            headers: {
                accept: "application/json, text/javascript, *; q=0.01",
                "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                "cache-control": "no-cache",
                pragma: "no-cache",
                "sec-ch-ua":
                  '"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"Windows"',
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                Referer: "https://www.sxrtv.com/",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36"
          },
          responseType: 'json'
        }).then(res => {
            window.channelList_shanxi = res.channels
        })
    }

    return fetch(`https://livehhhttps.sxrtv.com/lsdream/336E7E6818120C00FA7E8129A9999A10/info.json?t=${t}&token=${token}`,{
        method: 'GET',
        headers: {
            accept: "application/json, text/javascript, *; q=0.01",
            "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
            "cache-control": "no-cache",
            pragma: "no-cache",
            "sec-ch-ua":
              '"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",
            Referer: "https://www.sxrtv.com/",
            "X-Referer": "https://www.sxrtv.com/"
        },
        Referer: "https://www.sxrtv.com/",
        referrerPolicy: "origin",
          mode: "cors",
          credentials: "include",
    })
    .then(res => res.json())
    .then(res => {
          window.channelList_shanxi = res.channels
    })
}

function getLiveId(id) {
    function x(t) {
          return t.split("").reverse().join("");
    }

    function y(t) {
      return new Date(t).getDay();
    }

      var t = 1
      var e = 'live'
      var o = id;
      if (!t) return e || o;
      var n,
        i,
        a =
          ((i = n ? new Date(n) : new Date()),
          new Date(i.getFullYear(), i.getMonth(), i.getDate()).getTime()),
        r = 0,
        d = 0;
      if (false) {
        for (r = 0; r < o.length; r++) d += o.charCodeAt(r);
        for (
          var l = d.toString(36), p = a.toString(36), s = 0, r = 0;
          r < p.length;
          r++
        )
          s += p.charCodeAt(r);
        p = p.substring(5) + p.substring(0, 5);
        var c = Math.abs(s - d),
          u = (p = x(l) + p).substring(0, 4),
          h = p.substring(4),
          v = new Array(),
          f = y(a) % 2;
        for (r = 0; r < o.length; r++) {
          r % 2 == f
            ? v.push(p.charAt(r % p.length))
            : ((w = o.charAt(r - 1)),
              -1 == (m = u.indexOf(w)) ? v.push(w) : v.push(h.charAt(m)));
        }
      } else {
        var b = -1,
          g = 0;
        for (r = 0; r < o.length; r++) {
          var _ = o.charCodeAt(r);
          ((d += _), -1 != b && (g += b - _), (b = _));
        }
        ((l = (d += g).toString(36)), (p = a.toString(36)), (s = 0));
        for (r = 0; r < p.length; r++) s += p.charCodeAt(r);
        p = p.substr(5) + p.substr(0, 5);
        var w,
          m,
          c = Math.abs(s - d),
          u = (p = x(l) + p).substr(0, 4),
          h = p.substr(4),
          v = new Array(),
          f = y(a) % 2;
        for (r = 0; r < o.length; r++) {
          r % 2 == f
            ? v.push(p.charAt(r % p.length))
            : (w = o.charAt(r - 1))
              ? -1 == (m = u.indexOf(w))
                ? v.push(w)
                : v.push(h.charAt(m))
              : v.push(u.charAt(r));
        }
      }
      return (x(c.toString(36)) + v.join("")).substr(0, o.length);
    };

(async function() {

    await initShanXiTVLive()
    const channelItem = channelList_shanxi.find(item => item.n === '{{channelName}}')
    const playUrl = `https://livehhhttps.sxrtv.com/lsdream/${channelItem.i}/${channelItem.r[0].n}/${getLiveId(channelItem.i)}.m3u8`
    playLive(playUrl)
})();
