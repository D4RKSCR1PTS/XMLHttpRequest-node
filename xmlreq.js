import fetch from "node-fetch";
import { XMLHttpRequest } from "xmlhttprequest";
var it = {
    INVALID_DATA: "invalid-data",
    BUNDLE_ERROR: "bundle-error",
    NETWORK_ERROR: "network-error",
    RATE_LIMITED: "rate-limited",
    CHALLENGE_ERROR: "challenge-error",
    INCOMPLETE_ANSWER: "incomplete-answer",
    MISSING_CAPTCHA: "missing-captcha",
    MISSING_SITEKEY: "missing-sitekey",
    INVALID_CAPTCHA_ID: "invalid-captcha-id",
    AUTHENTICATION_ERROR: "authentication-error"
}
, se = {
    translate: function(t, e) {
        var i = se.getBestTrans(ne)
          , n = i && i[t];
        if (n = n || t,
        e)
            for (var o = Object.keys(e), s = o.length; s--; )
                n = n.replace(new RegExp("{{" + o[s] + "}}","g"), e[o[s]]);
        return n
    },
    getBestTrans: function(t) {
        var e = se.getLocale();
        return e in t ? t[e] : se.getShortLocale(e)in t ? t[se.getShortLocale(e)] : "en"in t ? t.en : null
    },
    resolveLocale: function(t) {
        var e = se.getShortLocale(t);
        return "in" === e && (t = "id"),
        "iw" === e && (t = "he"),
        "nb" === e && (t = "no"),
        "ji" === e && (t = "yi"),
        "zh-CN" === t && (t = "zh"),
        "jv" === e && (t = "jw"),
        ie[t] ? t : ie[e] ? e : "en"
    },
    getLocale: function() {
        return se.resolveLocale(oe || window.navigator.userLanguage || window.navigator.language)
    },
    setLocale: function(t) {
        "zh-Hans" === t ? t = "zh-CN" : "zh-Hant" === t && (t = "zh-TW"),
        oe = t
    },
    getShortLocale: function(t) {
        return t.indexOf("-") >= 0 ? t.substring(0, t.indexOf("-")) : t
    },
    isShortLocale: function(t) {
        return 2 === t.length || 3 === t.length
    },
    addTable: function(t, e) {
        if (e || (e = Object.create(null)),
        ne[t]) {
            var i = ne[t];
            for (var n in e)
                i[n] = e[n]
        } else
            ne[t] = e;
        return ne[t]
    },
    getTable: function(t) {
        return ne[t]
    },
    addTables: function(t) {
        for (var e in t)
            se.addTable(e, t[e]);
        return ne
    },
    getTables: function() {
        return ne
    }
}
  , re = {
    400: "Rate limited or network error. Please retry.",
    429: "Your computer or network has sent too many requests.",
    500: "Cannot contact hCaptcha. Check your connection and try again."
}
  , ae = function(t) {
    try {
        return se.translate(re[t])
    } catch (Ps) {
        return !1
    }
}, pe = function(t, e) {
    if ("object" == typeof t && e === undefined && (t = (e = t).url),
    null === t)
        throw new Error("Url missing");
    return ce("POST", t, e)
}      , le = "undefined" != typeof XDomainRequest && !("withCredentials"in XMLHttpRequest.prototype);
function he(t) {
    var e = t.legacy ? new XDomainRequest : new XMLHttpRequest
      , i = "function" == typeof t.url ? t.url() : t.url;
    return new Promise((function(n, o) {
        var s, r = function(s) {
            return function() {
                var r = e.response || e.responseText
                  , a = e.statusText || ""
                  , l = e.status
                  , c = e.readyState;
                if (4 === c || t.legacy) {
                    if ("json" === t.responseType && r)
                        try {
                            r = JSON.parse(r)
                        } catch (h) {}
                    if ("error" === s || l >= 400 && l <= 511)
                        return void o({
                            event: it.NETWORK_ERROR,
                            endpoint: i,
                            response: r,
                            state: c,
                            status: l,
                            message: ae(l || 400) || a
                        });
                    n({
                        state: c,
                        status: l,
                        body: r,
                        message: a
                    })
                }
            }
        };
        if ((e.onload = r("complete"),
        e.onerror = e.ontimeout = r("error"),
        e.open(t.method, i),
        "arraybuffer" === t.responseType && (e.responseType = "arraybuffer"),
        t.timeout && (e.timeout = t.timeout),
        !t.legacy) && (e.withCredentials = t.withCredentials,
        t.headers))
            for (var a in t.headers)
                s = t.headers[a],
                e.setRequestHeader(a, s);
        setTimeout((function() {
            e.send(t.data)
        }
        ), 0)
    }
    )).catch(err => console.log(err))
}
function ce(t, e, i) {
    i = i || {};
    var n = {
        url: e,
        method: t.toUpperCase(),
        responseType: i.responseType || "string",
        dataType: i.dataType || null,
        withCredentials: i.withCredentials || !1,
        headers: i.headers || null,
        data: i.data || null,
        timeout: i.timeout || null,
        pst: i.pst || null
    };
    n.legacy = n.withCredentials && le,
    n.data && ("json" === n.dataType && "object" == typeof n.data && (n.data = JSON.stringify(n.data)),
    "query" === n.dataType && (n.data = Xt(n.data)));
    var o = fetch && n.pst ? ue : he;
    return i.retry ? $t((function() {
        return o(n)
    }
    ), i.retry) : o(n)
}
export async function shitreq(init = {url, data, dataType, responseType, withCredentials, headers}) {
    return await pe({
        url: init.url,
        data: init.data,
        dataType: init.dataType,
        responseType: init.responseType,
        withCredentials: init.withCredentials != undefined ? init.withCredentials : !0,
        headers: init.headers
    })
}
