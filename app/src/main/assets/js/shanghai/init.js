const script = document.createElement("script");
      script.src = "https://skin.kankanews.com/kknews/js/jsencrypt.js";
      document.head.appendChild(script);

      async function getLiveParams(id) {
        const e = {
          "Api-Version": "v1",
          channel_id: id,
          // date : "2026-03-29",
          nonce: Math.random().toString(36).slice(-8),
          platform: "pc",
          timestamp: Math.floor(Date.now() / 1e3),
          version: "2.37.5", // 可能后续修改
        };

        var r = "";
        for (var o in e) null != e[o] && (r = r + o + "=" + e[o] + "&");

        // r = "Api-Version=v1&channel_id=1&nonce=r3ipcx9y&platform=pc&timestamp=1774795258&version=2.37.5&"

        r = CryptoJS.MD5(
          CryptoJS.MD5((r += "28c8edde3d61a0411511d3b1866f0636")).toString(
            CryptoJS.enc.Hex,
          ),
        ).toString(CryptoJS.enc.Hex);

        console.log(e, r);
        return fetch(
          "https://kapi.kankanews.com/content/pc/tv/channel/detail?channel_id=" + id,
          {
            headers: {
              accept: "application/json, text/plain, */*",
              "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
              "api-version": "v1",
              "cache-control": "no-cache",
              "m-uuid": "FCzOzhIiQfOzsjDye5DmJ",
              nonce: e.nonce,
              platform: "pc",
              pragma: "no-cache",
              "Origin": "https://live.kankanews.com",
              "Referer":"https://live.kankanews.com/",
              priority: "u=1, i",
              "sec-ch-ua":
                '"Chromium";v="146", "Not-A.Brand";v="24", "Google Chrome";v="146"',
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": '"Windows"',
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-site",
              sign: r,
              timestamp: e.timestamp,
              "Version": e.version
            },
            referrer: "https://live.kankanews.com/",
            body: null,
            method: "GET",
            mode: "cors",
            credentials: "omit",
          },
        )
          .then((res) => res.json())
          .then((res) => {
            console.log(JSON.stringify(res));
            return res.result.live_address;
          });
      }

      script.onload = async function () {
        startPlay({{id}})
      };

async function startPlay(id) {
    const url = await getLiveParams(id);
    const publicKey =
      "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDP5hzPUW5RFeE2xBT1ERB3hHZI\nVotn/qatWhgc1eZof09qKjElFN6Nma461ZAwGpX4aezKP8Adh4WJj4u2O54xCXDt\nwzKRqZO2oNZkuNmF2Va8kLgiEQAAcxYc8JgTN+uQQNpsep4n/o1sArTJooZIF17E\ntSqSgXDcJ7yDj5rc7wIDAQAB\n-----END PUBLIC KEY-----";

    var o = null;

    function r(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var i = 0, n = new Array(e); i < e; i++) n[i] = t[i];
      return n;
    }

    function l(t) {
      return (
        (function (t) {
          if (Array.isArray(t)) return Object(r.a)(t);
        })(t) ||
        Object(o.a)(t) ||
        Object(c.a)(t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
          );
        })()
      );
    }

    function d(t) {
      try {
        var n = (t.replace(/\r|\n/g, "").match(/[\da-fA-F]{2}/g) || []).map(
            function (t) {
              return parseInt(t, 16);
            },
          ),
          e = String.fromCharCode.apply(String, Object(r)(n));
        return btoa(e);
      } catch (t) {
        console.log(t);
        return "";
      }
    }

    function h(t) {
      if (!t || "string" != typeof t) return "";
      if ("undefined" == typeof JSEncrypt) return "";
      var n =
        (o || "undefined" == typeof JSEncrypt || (o = new JSEncrypt()), o);
      if (!n) return "";
      var e = "";
      try {
        // n.setPublicKey(publicKey);
        n.setPrivateKey(publicKey);
        var r = (function (t) {
          try {
            return atob(t)
              .split("")
              .map(function (t) {
                return ("0" + t.charCodeAt(0).toString(16)).slice(-2);
              })
              .join("")
              .toUpperCase();
          } catch (t) {
            console.log(t);
            return "";
          }
        })(t);
        if (!r) return "";
        var l = 256;
        for (var h = 0; h < r.length; ) {
          var v = r.slice(h, h + l);
          h += l;
          var f = d(v);
          if (f) {
            console.log(f);
            var m = n.decrypt(f);
            m && (e += m);
          }
        }
      } catch (t) {
        console.log(t);
        return "";
      }
      return e;
    }

    const decrypted = h(url);

    playLive(decrypted);
}

