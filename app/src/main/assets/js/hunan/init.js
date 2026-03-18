

var sa = 8;
function la(e) {
  return (function (e) {
    for (var t = "0123456789abcdef", r = "", n = 0; n < 4 * e.length; n++)
      r +=
        t.charAt((e[n >> 2] >> ((n % 4) * 8 + 4)) & 15) +
        t.charAt((e[n >> 2] >> ((n % 4) * 8)) & 15);
    return r;
  })(
    (function (e, t) {
      ((e[t >> 5] |= 128 << (t % 32)), (e[14 + (((t + 64) >>> 9) << 4)] = t));
      for (
        var r = 1732584193,
          n = -271733879,
          i = -1732584194,
          o = 271733878,
          a = 0;
        a < e.length;
        a += 16
      ) {
        var s = r,
          l = n,
          p = i,
          c = o;
        ((r = ua(r, n, i, o, e[a + 0], 7, -680876936)),
          (o = ua(o, r, n, i, e[a + 1], 12, -389564586)),
          (i = ua(i, o, r, n, e[a + 2], 17, 606105819)),
          (n = ua(n, i, o, r, e[a + 3], 22, -1044525330)),
          (r = ua(r, n, i, o, e[a + 4], 7, -176418897)),
          (o = ua(o, r, n, i, e[a + 5], 12, 1200080426)),
          (i = ua(i, o, r, n, e[a + 6], 17, -1473231341)),
          (n = ua(n, i, o, r, e[a + 7], 22, -45705983)),
          (r = ua(r, n, i, o, e[a + 8], 7, 1770035416)),
          (o = ua(o, r, n, i, e[a + 9], 12, -1958414417)),
          (i = ua(i, o, r, n, e[a + 10], 17, -42063)),
          (n = ua(n, i, o, r, e[a + 11], 22, -1990404162)),
          (r = ua(r, n, i, o, e[a + 12], 7, 1804603682)),
          (o = ua(o, r, n, i, e[a + 13], 12, -40341101)),
          (i = ua(i, o, r, n, e[a + 14], 17, -1502002290)),
          (r = pa(
            r,
            (n = ua(n, i, o, r, e[a + 15], 22, 1236535329)),
            i,
            o,
            e[a + 1],
            5,
            -165796510,
          )),
          (o = pa(o, r, n, i, e[a + 6], 9, -1069501632)),
          (i = pa(i, o, r, n, e[a + 11], 14, 643717713)),
          (n = pa(n, i, o, r, e[a + 0], 20, -373897302)),
          (r = pa(r, n, i, o, e[a + 5], 5, -701558691)),
          (o = pa(o, r, n, i, e[a + 10], 9, 38016083)),
          (i = pa(i, o, r, n, e[a + 15], 14, -660478335)),
          (n = pa(n, i, o, r, e[a + 4], 20, -405537848)),
          (r = pa(r, n, i, o, e[a + 9], 5, 568446438)),
          (o = pa(o, r, n, i, e[a + 14], 9, -1019803690)),
          (i = pa(i, o, r, n, e[a + 3], 14, -187363961)),
          (n = pa(n, i, o, r, e[a + 8], 20, 1163531501)),
          (r = pa(r, n, i, o, e[a + 13], 5, -1444681467)),
          (o = pa(o, r, n, i, e[a + 2], 9, -51403784)),
          (i = pa(i, o, r, n, e[a + 7], 14, 1735328473)),
          (r = da(
            r,
            (n = pa(n, i, o, r, e[a + 12], 20, -1926607734)),
            i,
            o,
            e[a + 5],
            4,
            -378558,
          )),
          (o = da(o, r, n, i, e[a + 8], 11, -2022574463)),
          (i = da(i, o, r, n, e[a + 11], 16, 1839030562)),
          (n = da(n, i, o, r, e[a + 14], 23, -35309556)),
          (r = da(r, n, i, o, e[a + 1], 4, -1530992060)),
          (o = da(o, r, n, i, e[a + 4], 11, 1272893353)),
          (i = da(i, o, r, n, e[a + 7], 16, -155497632)),
          (n = da(n, i, o, r, e[a + 10], 23, -1094730640)),
          (r = da(r, n, i, o, e[a + 13], 4, 681279174)),
          (o = da(o, r, n, i, e[a + 0], 11, -358537222)),
          (i = da(i, o, r, n, e[a + 3], 16, -722521979)),
          (n = da(n, i, o, r, e[a + 6], 23, 76029189)),
          (r = da(r, n, i, o, e[a + 9], 4, -640364487)),
          (o = da(o, r, n, i, e[a + 12], 11, -421815835)),
          (i = da(i, o, r, n, e[a + 15], 16, 530742520)),
          (r = ha(
            r,
            (n = da(n, i, o, r, e[a + 2], 23, -995338651)),
            i,
            o,
            e[a + 0],
            6,
            -198630844,
          )),
          (o = ha(o, r, n, i, e[a + 7], 10, 1126891415)),
          (i = ha(i, o, r, n, e[a + 14], 15, -1416354905)),
          (n = ha(n, i, o, r, e[a + 5], 21, -57434055)),
          (r = ha(r, n, i, o, e[a + 12], 6, 1700485571)),
          (o = ha(o, r, n, i, e[a + 3], 10, -1894986606)),
          (i = ha(i, o, r, n, e[a + 10], 15, -1051523)),
          (n = ha(n, i, o, r, e[a + 1], 21, -2054922799)),
          (r = ha(r, n, i, o, e[a + 8], 6, 1873313359)),
          (o = ha(o, r, n, i, e[a + 15], 10, -30611744)),
          (i = ha(i, o, r, n, e[a + 6], 15, -1560198380)),
          (n = ha(n, i, o, r, e[a + 13], 21, 1309151649)),
          (r = ha(r, n, i, o, e[a + 4], 6, -145523070)),
          (o = ha(o, r, n, i, e[a + 11], 10, -1120210379)),
          (i = ha(i, o, r, n, e[a + 2], 15, 718787259)),
          (n = ha(n, i, o, r, e[a + 9], 21, -343485551)),
          (r = fa(r, s)),
          (n = fa(n, l)),
          (i = fa(i, p)),
          (o = fa(o, c)));
      }
      return Array(r, n, i, o);
    })(
      (function (e) {
        for (
          var t = Array(), r = (1 << sa) - 1, n = 0;
          n < e.length * sa;
          n += sa
        )
          t[n >> 5] |= (e.charCodeAt(n / sa) & r) << (n % 32);
        return t;
      })(e),
      e.length * sa,
    ),
  );
}
function ca(e, t, r, n, i, o) {
  return fa(
    (function (e, t) {
      return (e << t) | (e >>> (32 - t));
    })(fa(fa(t, e), fa(n, o)), i),
    r,
  );
}

function ua(e, t, r, n, i, o, a) {
  return ca((t & r) | (~t & n), e, t, i, o, a);
}
function pa(e, t, r, n, i, o, a) {
  return ca((t & n) | (r & ~n), e, t, i, o, a);
}
function da(e, t, r, n, i, o, a) {
  return ca(t ^ r ^ n, e, t, i, o, a);
}
function ha(e, t, r, n, i, o, a) {
  return ca(r ^ (t | ~n), e, t, i, o, a);
}
function fa(e, t) {
  var r = (65535 & e) + (65535 & t);
  return (((e >> 16) + (t >> 16) + (r >> 16)) << 16) | (65535 & r);
}
const ma = (e) => (e < 10 ? `0${e}` : e);
function ya(e) {
  const t = Math.floor(e / 60),
    r = Math.floor(e % 60);
  return ma(t) + ":" + ma(r);
}
function ga(e) {
  return Math.round(e / 1e3);
}
function va(e) {
  const t =
    Math.floor(e / 60) < 10 ? "0" + Math.floor(e / 60) : Math.floor(e / 60);
  return (
    t +
    ":" +
    (Math.floor(e - 60 * t) < 10
      ? "0" + Math.floor(e - 60 * t)
      : Math.floor(e - 60 * t))
  );
}

async function getLiveUrl(id) {
    const ts = Date.now()

    const sign = la(
      `LMFwh1k1m@pvt#Pt_t${ts}activityIdappVersionimgotv-pch5-1.1.0auth_mode1cameraId${id}clientKeypcwebdide19c3a7b-9e52-4f76-b79b-2c6f567b8400hdtsh265,h264init_definition2local_definitionplatform4tokenuidLMFwh1k1m@pvt#Pt`,
    );

    const options = {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        'origin': 'https://www.mgtv.com',
        'pragma': 'no-cache',
        'priority': 'u=1, i',
        'referer': 'https://www.mgtv.com/',
        'sec-ch-ua': '"Not:A-Brand";v="99", "Google Chrome";v="145", "Chromium";v="145"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        // 'Cookie': '_source_=C; __STKUUID=e19c3a7b-9e52-4f76-b79b-2c6f567b8400; PLANB_FREQUENCY=aUVAtVEntAXzY-JI_25121920; PM_CHKID=2d874d5428ae262f; mba_deviceid=6a54966f-af87-526c-ae93-03cac560df9d; finger=eb5adfdad429ccdfc357e91471f13585; MQGUID=2001988510072131584; __MQGUID=2001988510072131585; mba_sessionid=dedd9711-7035-7f6c-c76c-b169d3da54e6; mba_cxid_expiration=1773849600000; mba_cxid=8kpqp21m4cm; Province=Zhejiang; xff=58.100.35.239; sessionid=1773839301081_8kpqp21m4cm; mba_last_action_time=1773839301083; lastActionTime=1773839301209; beta_timer=1773839302756'
      }
    };

    const result = await fetch(`https://pwlp.bz.mgtv.com/v1/live/source?cameraId=287&activityId=&platform=4&appVersion=imgotv-pch5-1.1.0&clientKey=pcweb&auth_mode=1&local_definition=&init_definition=2&did=e19c3a7b-9e52-4f76-b79b-2c6f567b8400&uid=&token=&_t=${ts}&hdts=h265,h264&_support=10000000&sign=${sign}`, options)
      .then(response => response.json())

    return result.data.url
}

;(async function() {
    const url = await getLiveUrl('{{id}}')
    playLive(url)
})()