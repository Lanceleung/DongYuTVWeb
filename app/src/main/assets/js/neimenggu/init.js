var n = 2654435769;

function c(T) {
  for (var V = T.length, R = new Uint8Array(V * 3), H = 0, F = 0; F < V; F++) {
    var M = T.charCodeAt(F);
    if (M < 128)
      R[H++] = M;
    else if (M < 2048)
      R[H++] = 192 | M >> 6,
        R[H++] = 128 | M & 63;
    else if (M < 55296 || M > 57343)
      R[H++] = 224 | M >> 12,
        R[H++] = 128 | M >> 6 & 63,
        R[H++] = 128 | M & 63;
    else {
      if (F + 1 < V) {
        var N = T.charCodeAt(F + 1);
        if (M < 56320 && 56320 <= N && N <= 57343) {
          var E = ((M & 1023) << 10 | N & 1023) + 65536;
          R[H++] = 240 | E >> 18,
            R[H++] = 128 | E >> 12 & 63,
            R[H++] = 128 | E >> 6 & 63,
            R[H++] = 128 | E & 63,
            F++;
          continue
        }
      }
      throw new Error("Malformed string")
    }
  }
  return R.subarray(0, H)
}

function r(T, V) {
  var R = T.length
    , H = R << 2;
  if (V) {
    var F = T[R - 1];
    if (H -= 4,
      F < H - 3 || F > H)
      return null;
    H = F
  }
  for (var M = new Uint8Array(H), N = 0; N < H; ++N)
    M[N] = T[N >> 2] >> ((N & 3) << 3);
  return M
}

function i(T) {
  return T & 4294967295
}

function o(T, V, R, H, F, M) {
  return (R >>> 5 ^ V << 2) + (V >>> 3 ^ R << 4) ^ (T ^ V) + (M[H & 3 ^ F] ^ R)
}

function u(T, V) {
  var R = T.length, H = R - 1, F, M, N, E, P, j;
  for (M = T[H],
    N = 0,
    j = Math.floor(6 + 52 / R) | 0; j > 0; --j) {
    for (N = i(N + n),
      E = N >>> 2 & 3,
      P = 0; P < H; ++P)
      F = T[P + 1],
        M = T[P] = i(T[P] + o(N, F, M, P, E, V));
    F = T[0],
      M = T[H] = i(T[H] + o(N, F, M, H, E, V))
  }
  return T
}

function a(T, V) {
  var R = T.length
    , H = R >> 2;
  (R & 3) !== 0 && ++H;
  var F;
  V ? (F = new Uint32Array(H + 1),
    F[H] = R) : F = new Uint32Array(H);
  for (var M = 0; M < R; ++M)
    F[M >> 2] |= T[M] << ((M & 3) << 3);
  return F
}

function C(T, V) {
  return typeof T == "string" && (T = c(T)),
    typeof V == "string" && (V = c(V)),
    T == null || T.length === 0 ? T : r(u(a(T, !0), a(l(V), !1)), !1)
}

function l(T) {
  if (T.length < 16) {
    var V = new Uint8Array(16);
    V.set(T),
      T = V
  }
  return T
}

function g(T) {
  var V = T.length;
  if (V === 0)
    return "";
  var R = true ? T : y(T);
  if (V < 65535)
    return String.fromCharCode.apply(String, R);
  for (var H = V & 32767, F = V >> 15, M = new Array(H ? F + 1 : F), N = 0; N < F; ++N)
    M[N] = String.fromCharCode.apply(String, R.subarray(N << 15, N + 1 << 15));
  return H && (M[F] = String.fromCharCode.apply(String, R.subarray(F << 15, V))),
    M.join("")
}

function s(T, V) {
  var R = T.length, H = R - 1, F, M, N, E, P, j;
  for (F = T[0],
    j = Math.floor(6 + 52 / R),
    N = i(j * n); N !== 0; N = i(N - n)) {
    for (E = N >>> 2 & 3,
      P = H; P > 0; --P)
      M = T[P - 1],
        F = T[P] = i(T[P] - o(N, F, M, P, E, V));
    M = T[H],
      F = T[0] = i(T[0] - o(N, F, M, 0, E, V))
  }
  return T
}

function w(T) {
  for (var V = window.atob(T), R = V.length, H = new Uint8Array(R), F = 0; F < R; F++)
    H[F] = V.charCodeAt(F);
  return H
}

console.log(btoa(g(C('{}', '5b28bae827e651b3'))))

const str = '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'

function S(T, V) {
  return typeof T == "string" && (T = w(T)),
    typeof V == "string" && (V = c(V)),
    T == null || T.length === 0 ? T : r(s(a(T, !1), a(l(V), !1)), !0)
}

function d(T, V) {
  for (var R = new Array(V), H = 0, F = 0, M = T.length; H < V && F < M; H++) {
    var N = T[F++];
    switch (N >> 4) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        R[H] = N;
        break;
      case 12:
      case 13:
        if (F < M)
          R[H] = (N & 31) << 6 | T[F++] & 63;
        else
          throw new Error("Unfinished UTF-8 octet sequence");
        break;
      case 14:
        if (F + 1 < M)
          R[H] = (N & 15) << 12 | (T[F++] & 63) << 6 | T[F++] & 63;
        else
          throw new Error("Unfinished UTF-8 octet sequence");
        break;
      case 15:
        if (F + 2 < M) {
          var E = ((N & 7) << 18 | (T[F++] & 63) << 12 | (T[F++] & 63) << 6 | T[F++] & 63) - 65536;
          if (0 <= E && E <= 1048575)
            R[H++] = E >> 10 & 1023 | 55296,
              R[H] = E & 1023 | 56320;
          else
            throw new Error("Character outside valid Unicode range: 0x" + E.toString(16))
        } else
          throw new Error("Unfinished UTF-8 octet sequence");
        break;
      default:
        throw new Error("Bad UTF-8 encoding 0x" + N.toString(16))
    }
  }
  return H < V && (R.length = H),
    String.fromCharCode.apply(String, R)
}
function v(T, V) {
  for (var R = [], H = new Array(32768), F = 0, M = 0, N = T.length; F < V && M < N; F++) {
    var E = T[M++];
    switch (E >> 4) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        H[F] = E;
        break;
      case 12:
      case 13:
        if (M < N)
          H[F] = (E & 31) << 6 | T[M++] & 63;
        else
          throw new Error("Unfinished UTF-8 octet sequence");
        break;
      case 14:
        if (M + 1 < N)
          H[F] = (E & 15) << 12 | (T[M++] & 63) << 6 | T[M++] & 63;
        else
          throw new Error("Unfinished UTF-8 octet sequence");
        break;
      case 15:
        if (M + 2 < N) {
          var P = ((E & 7) << 18 | (T[M++] & 63) << 12 | (T[M++] & 63) << 6 | T[M++] & 63) - 65536;
          if (0 <= P && P <= 1048575)
            H[F++] = P >> 10 & 1023 | 55296,
              H[F] = P & 1023 | 56320;
          else
            throw new Error("Character outside valid Unicode range: 0x" + P.toString(16))
        } else
          throw new Error("Unfinished UTF-8 octet sequence");
        break;
      default:
        throw new Error("Bad UTF-8 encoding 0x" + E.toString(16))
    }
    if (F >= 32767 - 1) {
      var j = F + 1;
      H.length = j,
        R.push(String.fromCharCode.apply(String, H)),
        V -= j,
        F = -1
    }
  }
  return F > 0 && (H.length = F,
    R.push(String.fromCharCode.apply(String, H))),
    R.join("")
}

function p(T) {
  if (!T)
    return "\u5BC6\u94A5\u9519\u8BEF";
  var V = T.length;
  return V === 0 ? "" : V < 32767 ? d(T, V) : v(T, V)
}

function decrypt(data) {
    return p(S(data, '5b28bae827e651b3'))
}

function encrypt(data) {
    return btoa(g(C(data, '5b28bae827e651b3')))
}

async function getLiveList_neimenggu() {
    console.log(encrypt(JSON.stringify({size: 20, type: 1})))
    return fetch("https://api-bt.nmtv.cn/broadcast/list", {
     "headers": {
       "accept": "application/json, text/plain, */*",
       "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
       "cache-control": "no-cache",
       "client-type": "web",
       "content-type": "application/json",
       "pragma": "no-cache",
       "priority": "u=1, i",
       "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
       "sec-ch-ua-mobile": "?0",
       "sec-ch-ua-platform": "\"Windows\"",
       "sec-fetch-dest": "empty",
       "sec-fetch-mode": "cors",
       "sec-fetch-site": "same-site",
       "X-Referer":"https://www.nmtv.cn/",
       "X-Body": encrypt(JSON.stringify({size: 20, type: 1}))
     },
     "referrer": "https://www.nmtv.cn/",
     "body": 'n6wT4YYLUZiY/41vQYu5oSHD2lotdczz5ohPQw==',//encrypt(JSON.stringify({size: 20, type: 1})),
     "method": "POST",
     "mode": "cors",
     "credentials": "omit"
   }).then(res => res.text())
   .then(res => {
        const data = JSON.parse(decrypt(res.replace(/\"/g, '')))
        return data.data.map(item => {
            return {
                name: item.title,
                url: item.data.streamUrl
            }
        })
   })
}

;(async function() {
    window.liveList = await getLiveList_neimenggu()
    const liveItem = liveList.find(item => item.name === '{{channelName}}')
    playLive(liveItem.url)
})();