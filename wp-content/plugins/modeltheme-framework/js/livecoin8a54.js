! function() {
    var e;
    if (void 0 === window.jQuery || "1.11.1" !== window.jQuery.fn.jquery) {
        var t = document.createElement("script");
        t.setAttribute("type", "text/javascript"), t.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"), t.readyState ? t.onreadystatechange = function() {
            "complete" != this.readyState && "loaded" != this.readyState || a()
        } : t.onload = a, (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(t)
    } else e = window.jQuery, r();

    function a() {
        e = window.jQuery.noConflict(!0), r()
    }

    function i(e) {
        var t = " " + document.cookie,
            a = " " + e + "=",
            i = null,
            r = 0,
            n = 0;
        return 0 < t.length && -1 != (r = t.indexOf(a)) && (r += a.length, -1 == (n = t.indexOf(";", r)) && (n = t.length), i = unescape(t.substring(r, n))), i
    }

    function r() {
        var s, d, L = (s = i("_locale") || void 0, d = !("object" != typeof Intl || !Intl || "function" != typeof Intl.NumberFormat), {
            toLocaleString: function(e, t) {
                var a = Number(e);
                if (isNaN(a)) return e;
                var i, r, n, o, c = t && t.minDecimalPlaces,
                    l = t && t.maxDecimalPlaces;
                return void 0 === c || void 0 === l ? (i = a, d ? i.toLocaleString(s) : i.toLocaleString()) : (r = a, n = c, o = l, d ? r.toLocaleString(s, {
                    minimumFractionDigits: n,
                    maximumFractionDigits: o
                }) : r.toFixed(o))
            }
        });

        function k(e, t) {
            var a = t;
            t = Math.pow(10, t);
            for (var i = ["K", "M", "B", "T"], r = i.length - 1; 0 <= r; r--) {
                var n = Math.pow(10, 3 * (r + 1));
                if (n <= e) {
                    1e3 == (e = Math.round(e * t / n) / t) && r < i.length - 1 && (e = 1, r++), e = L.toLocaleString(Number(e), {
                        minDecimalPlaces: a,
                        maxDecimalPlaces: a
                    }), e += " " + i[r];
                    break
                }
            }
            return e
        }

        function E(e, t) {
            return "BTC" == t ? function(e) {
                e = 1e3 <= e ? L.toLocaleString(Math.round(e)) : 1 <= e ? L.toLocaleString(e, {
                    minDecimalPlaces: 8,
                    maxDecimalPlaces: 8
                }) : e < 1e-8 ? Number(e).toExponential(4) : L.toLocaleString(e, {
                    minDecimalPlaces: 8,
                    maxDecimalPlaces: 8
                });
                return e
            }(e) : function(e) {
                e = 1 <= e ? 1e5 <= e ? L.toLocaleString(Math.round(e)) : L.toLocaleString(e, {
                    minDecimalPlaces: 2,
                    maxDecimalPlaces: 2
                }) : e < 1e-6 ? Number(e).toExponential(2) : L.toLocaleString(e, {
                    minDecimalPlaces: 6,
                    maxDecimalPlaces: 6
                });
                return e
            }(e)
        }

        function P(e, t, a) {
            var i = t,
                r = {
                    btc: "à¸¿",
                    usd: "$",
                    eur: "â‚¬",
                    cny: "Â¥",
                    gbp: "Â£",
                    cad: "$",
                    rub: "<img src='/static/img/fiat/ruble.gif'/>",
                    hkd: "$",
                    jpy: "Â¥",
                    aud: "$",
                    brl: "R$",
                    inr: "â‚¹",
                    krw: "â‚©",
                    mxn: "$",
                    idr: "Rp",
                    chf: "Fr"
                };
            return e.toLowerCase() in r && (i = r[e.toLowerCase()] + i), a && (i = i + ' <span style="font-size:9px">' + e.toUpperCase() + "</span>"), i
        }

        function M(e, t, a, i, r, n, o, c, l, s, d, p, m, u, h, g, v, f) {
            var x = f ? "https://s2.coinmarketcap.com/static/img/coins/64x64/" + f + ".png" : "https://files.coinmarketcap.com/static/widget/coins_legacy/64x64/" + e + ".png",
                y = "#093";
            l < 0 && (y = "#d14836"), l = L.toLocaleString(l, {
                minDecimalPlaces: 2,
                maxDecimalPlaces: 2
            }), valTickerHTML = m ? "(" + a + ")" : "", valPrice = n ? E(n, i) : "?", valPercentHTML = l ? l : "", valMarketCap = s ? k(s, 2) : "?", valVolume = d ? k(d, 2) : "?", o ? (mainLineHeight = 25, valPriceSecondary = c ? E(c, o) : "?", secondaryHTML = '<br><span>' + valPriceSecondary + " " + o + " </span>") : (mainLineHeight = 30, secondaryHTML = "");
            if(valPercentHTML > 0) {
                var valPercentHTMLFinal = '<i style="color:#6cd087" class="fa fa-caret-up" aria-hidden="true"></i> ' + valPercentHTML + " %";
            } else {
                var valPercentHTMLFinal = '<i style="color:#e74c3c" class="fa fa-caret-down" aria-hidden="true"></i> ' + valPercentHTML + " %";
            }
            var b = "utm_medium=widget&utm_campaign=cmcwidget&utm_source=" + location.hostname + "&utm_content=" + e,
                w = '<div class="livecoin-box-holder"><h5 class="ico_name"><a href="http://coinmarketcap.com/currencies/' + e + "/?" + b + '" target="_blank">' + t + " " + '</a></h5><h5 class="ico_price">$ ' + valPrice + " " + '</h5><h5 class="ico_percentage">' + valPercentHTMLFinal + "</h5>";


            return w += function(e, t, a, i, r, n, o, c) {
                var l = 0,
                    s = 0,
                    d = "",
                    p = "",
                    m = "";
                if (e && l++, t && l++, a && l++, 0 == l) return "";
                1 == l && (s = 100), 2 == l && (s = 49.8), 3 == l && (s = 33), e && (borderWidth = 0, (a || t) && (borderWidth = 1), d = '<h5 class="ico_name">RANK ' + n + "</h5>");
                a && (borderWidth = 0, t && (borderWidth = 1), p = "");
                t && (m = '' + P(r, c, i) + "</h5>");
                return detailedHTML = d + p + m + "</div>", detailedHTML
            }(u, h, g, v, r, p, valMarketCap, valVolume), w += '    </div>'
        }
        e(document).ready(function(_) {
            _(".livecoin-box").each(function() {
                var v = _(this).attr("data-currency"),
                    f = _(this).data("currencyid"),
                    x = _(this).attr("data-base").toUpperCase(),
                    y = _(this).attr("data-secondary");
                y = "BTC" == (y = y ? y.toUpperCase() : null) || "USD" == y ? y : null;
                var b = _(this).attr("data-stats");
                b = (b = b ? b.toUpperCase() : null) == x ? x : "USD";
                var e, w = !1 !== _(this).data("ticker"),
                    L = !1 !== _(this).data("rank"),
                    k = !1 !== _(this).data("marketcap"),
                    E = !1 !== _(this).data("volume"),
                    P = !1 !== _(this).data("statsticker"),
                    C = this;
                e = f ? "https://widgets.coinmarketcap.com/v2/ticker/" + f + "/?ref=widget&convert=" + x : "https://widgets.coinmarketcap.com/v1/ticker/" + v + "/?ref=widget&convert=" + x, _.get({
                    url: e,
                    success: function(e) {
                        if (e = e.length ? e[0] : e.data, v || (v = e.website_slug), f) var t = e.quotes[x.toUpperCase()],
                            a = y ? e.quotes[y.toUpperCase()] : null,
                            i = parseFloat(t.price),
                            r = a ? parseFloat(a.price) : null,
                            n = parseInt(t.market_cap),
                            o = parseInt(t.volume_24h),
                            c = Number(t.percent_change_24h);
                        else {
                            var l = "price_" + x.toLowerCase(),
                                s = y ? "price_" + y.toLowerCase() : null,
                                d = "market_cap_" + b.toLowerCase(),
                                p = "24h_volume_" + b.toLowerCase();
                            i = parseFloat(e[l]), r = s ? parseFloat(e[s]) : null, n = parseInt(e[d]), o = parseInt(e[p]), c = Number(e.percent_change_24h)
                        }
                        var m = e.name,
                            u = e.symbol,
                            h = e.rank,
                            g = M(v, m, u, x, b, i, y, r, c, n, o, h, w);
                        _(C).html(g), _(C).find("a").css({
                            "text-decoration": "none",
                            color: "#428bca"
                        })
                    }
                })
            })
        })
    }
}();