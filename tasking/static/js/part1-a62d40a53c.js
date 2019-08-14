(function (e) {
    "use strict";
    e.module("eweiApp.ticket", ["angular-locker", "ngContextMenu"]);
    e.module("eweiApp.common", ["eweiApp.constants"]);
    e.module("eweiApp.remoteControlWidget", []);
    e.module("eweiApp.core", [])
})(angular);
this.org = this.org || {};
org.ewei = org.ewei || {};
(function (v, g) {
    "use strict";
    function e(t) {
        var i = this;
        var r = null;
        var n = [];
        var a = 200;
        var o = 0;
        var s = 2e3;
        var e = t.https = t.url.indexOf("wss://") != -1;
        var l = new g.SocketWrap(t);
        var c = false;

        function u() {
            for (var e in n) {
                if (n.hasOwnProperty(e)) {
                    clearTimeout(n[e])
                }
            }
        }

        function d(e) {
            if (v.isFunction(t.onMessage)) {
                t.onMessage(e.data)
            }
        }

        function p(e) {
            c = true;
            o = 0;
            u();
            if (v.isFunction(t.onOpen)) {
                t.onOpen()
            }
        }

        function f(e) {
        }

        function m(e) {
            c = false;
            if (v.isFunction(t.onClose)) {
                t.onClose(e)
            }
            if (t.retry && ++o < a) {
                n.push(setTimeout(function () {
                    i.open()
                }, s))
            }
        }

        i.send = function (e) {
            if (c) {
                r.send(l.wrapMsg(e));
                return true
            } else {
                g.logger.error("ew.Socket.send socket has closed");
                return false
            }
        };
        i.close = function () {
            u();
            r.close()
        };
        i.open = function () {
            if (c)return;
            try {
                if (e) {
                    r = new WebSocket(t.url, "lws-protocol")
                } else {
                    r = new WebSocket(t.url)
                }
                r.onmessage = d;
                r.onclose = m;
                r.onerror = f;
                r.onopen = p
            } catch (e) {
                g.logger.error("ew.Socket.open new socket has error")
            }
        };
        i.open()
    }

    g.Socket = e
})(angular, org.ewei);
this.org = this.org || {};
org.ewei = org.ewei || {};
(function (e) {
    "use strict";
    function t() {
        var t = null;
        this.set = function (e) {
            t = e
        };
        this.get = function () {
            return t
        }
    }

    e.socketMgr = new t
})(org.ewei);
this.org = this.org || {};
org.ewei = org.ewei || {};
(function (a) {
    "use strict";
    function e(n) {
        this.wrapMsg = function (e) {
            var t = e;
            if (n.https) {
                var i = e.split("|");
                try {
                    var r = JSON.parse(i[1]);
                    if (r) {
                        r.SOCKGUID = n.id
                    }
                    t = i[0] + "|" + JSON.stringify(r)
                } catch (e) {
                }
            }
            a.logger.info("ew.SocketWrap.wrapMsg msg is : ", t);
            return t
        }
    }

    a.SocketWrap = e
})(org.ewei);
this.org = this.org || {};
org.ewei = org.ewei || {};
(function (o) {
    "use strict";
    function e() {
        var t = this;
        var i = null;
        var r = null;

        function n() {
            return eweiCommon.uuid(32, 16)
        }

        t.cmdRet = {respondD: e, respondV: a};
        t.checkDesk = function (e) {
            i = e;
            var t = {cmd: "respondD", data: {remoteFunction: "remote_desk"}};
            o.socketMgr.get().send("2JQ" + n() + "|" + JSON.stringify(t))
        };
        t.checkVideo = function (e) {
            r = e;
            var t = {cmd: "respondV", data: {remoteFunction: "video_call"}};
            o.socketMgr.get().send("2JQ" + n() + "|" + JSON.stringify(t))
        };
        t.parseMessage = function (e) {
            t.cmdRet[e.cmd](e)
        };
        function e(e) {
            if (typeof i === "function") {
                i(e.data.run)
            }
        }

        function a(e) {
            if (typeof r === "function") {
                r(e.data.run)
            }
        }
    }

    o.plugin = new e
})(org.ewei);
this.org = this.org || {};
org.ewei = org.ewei || {};
org.ewei.utils = org.ewei.utils || {};
(function (r) {
    "use strict";
    if (!Array.isArray) {
        Array.isArray = function (e) {
            return Object.prototype.toString.call(e) === "[object Array]"
        }
    }
    function e(e) {
        return Array.isArray(e)
    }

    function t(e) {
        return e !== null && typeof e === "object"
    }

    function i(e) {
        return typeof e === "string"
    }

    function n(e) {
        return typeof e === "number"
    }

    function a(e) {
        return Object.prototype.toString.call(e) === "[object Date]"
    }

    function o(e) {
        return typeof e === "function"
    }

    function s(e) {
        return typeof e === "undefined"
    }

    function l(e) {
        return typeof e !== "undefined"
    }

    function c(e) {
        return e === null
    }

    function u(e) {
        return e !== null
    }

    function d(e) {
        return typeof e == "object" && Object.prototype.toString.call(e).toLowerCase() == "[object object]" && !e.length
    }

    var p = p || function () {
            if (window.Blob && window.FileReader && window.DataView) {
                return true
            } else {
                return false
            }
        }();
    var f = f || function () {
            var t;
            try {
                t = navigator.plugins["Shockwave Flash"];
                t = t.description
            } catch (e) {
                try {
                    t = new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version")
                } catch (e) {
                    t = "0.0"
                }
            }
            t = t.match(/\d+/g);
            return parseFloat(t[0] + "." + t[1], 10) >= 11.4
        }();

    function m(e, t) {
        return e.className.match(new RegExp("(\\s|^)" + t + "(\\s|$)"))
    }

    function v(e, t) {
        if (!m(e, t)) e.className += " " + t
    }

    function g(e, t) {
        if (m(e, t)) {
            var i = new RegExp("(\\s|^)" + t + "(\\s|$)");
            e.className = e.className.replace(i, " ")
        }
    }

    function h(e, t) {
        for (var i in t) {
            if (r.utils.isObject(e[i]) || r.utils.isArray(e[i])) {
                h(e[i], t[i])
            } else {
                e[i] = t[i]
            }
        }
        return e
    }

    var _ = {
        set: function (e, t) {
            e.innerHTML = '<div style="display:none">InnerJS</div>' + t;
            e.removeChild(e.children[0]);
            var i = e.getElementsByTagName("script");
            if (i.length > 0) {
                this.task = [];
                for (var r = 0, n = i.length; r < n; r++) {
                    this.task.push(i[r])
                }
                this.overwrite();
                this.run()
            }
        }, overwrite: function () {
            var t = this;
            document.write = function (e) {
                t.insertHTML(t.exeScript, "beforeBegin", e)
            };
            document.writeln = function (e) {
                t.insertHTML(t.exeScript, "beforeBegin", e + "\n")
            }
        }, run: function () {
            var e = this.task.shift();
            if (!e)return;
            var t = document.createElement("script");
            t.type = "text/javascript";
            var i = this;
            if (e.src) {
                if (t.readyState) {
                    t.onreadystatechange = function () {
                        if (t.readyState == "loaded" || t.readyState == "complete") {
                            t.onreadystatechange = null;
                            i.run()
                        }
                    }
                } else {
                    t.onload = function () {
                        i.run()
                    }
                }
                t.src = e.src
            } else {
                t.text = e.text
            }
            this.exeScript = t;
            e.parentNode.replaceChild(t, e);
            if (!e.src) {
                i.run()
            }
        }, insertHTML: function (e, t, i) {
            if (e.insertAdjacentHTML) {
                e.insertAdjacentHTML(t, i)
            } else {
                var r = e.ownerDocument.createRange();
                t = t.toUpperCase();
                if (t == "AFTERBEGIN" || t == "BEFOREEND") {
                    r.selectNodeContents(e);
                    r.collapse(t == "AFTERBEGIN")
                } else {
                    var n = t == "BEFOREBEGIN";
                    r[n ? "setStartBefore" : "setEndAfter"](e);
                    r.collapse(n)
                }
                r.insertNode(r.createContextualFragment(i))
            }
        }
    };

    function y(e) {
        var t, i = new RegExp("(^| )" + e + "=([^;]*)(;|$)");
        if (t = document.cookie.match(i))return decodeURI(t[2]); else return null
    }

    function w(e, t) {
        for (var i in t) {
            if (t.hasOwnProperty(i)) {
                e = e.replace(":" + i, t[i])
            }
        }
        return e
    }

    Date.prototype.format = function (e) {
        var t = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            S: this.getMilliseconds()
        };
        if (/(y+)/.test(e)) {
            e = e.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
        }
        for (var i in t) {
            if (new RegExp("(" + i + ")").test(e)) {
                e = e.replace(RegExp.$1, RegExp.$1.length == 1 ? t[i] : ("00" + t[i]).substr(("" + t[i]).length))
            }
        }
        return e
    };
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (e) {
            var t = this.length >>> 0;
            var i = Number(arguments[1]) || 0;
            i = i < 0 ? Math.ceil(i) : Math.floor(i);
            if (i < 0) i += t;
            for (; i < t; i++) {
                if (i in this && this[i] === e)return i
            }
            return -1
        }
    }
    var k = window.console || function () {
            var e = {};
            var t = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace", "warn"];
            for (var i = 0, r = t.length; i < r; i++) {
                var n = t[i];
                if (!e[n]) e[n] = function () {
                }
            }
            if (!e.memory) e.memory = {};
            return e
        }();

    function T(e) {
        if (e) {
            return (new Date).format(e)
        } else {
            return (new Date).format("yyyy-MM-dd hh:mm:ss")
        }
    }

    function C(e, t) {
        var i = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
        var r = [], n;
        t = t || i.length;
        if (e) {
            for (n = 0; n < e; n++)r[n] = i[0 | Math.random() * t]
        } else {
            var a;
            r[8] = r[13] = r[18] = r[23] = "-";
            r[14] = "4";
            for (n = 0; n < 36; n++) {
                if (!r[n]) {
                    a = 0 | Math.random() * 16;
                    r[n] = i[n == 19 ? a & 3 | 8 : a]
                }
            }
        }
        return r.join("")
    }

    function S(e) {
        var t = (new Date).format("yyyy-MM-dd hh:mm:ss");
        e = e.replace(/-/g, "/");
        var i = new Date(e).format("yyyy-MM-dd hh:mm:ss");
        var r = null;
        if (t.substr(0, 10) == i.substr(0, 10)) {
            r = new Date(e).format("今天hh:mm:ss")
        } else if (t.substr(0, 4) == i.substr(0, 4)) {
            r = new Date(e).format("MM月dd日 hh:mm:ss")
        } else {
            r = new Date(e).format("yyyy年MM月dd日 hh:mm:ss")
        }
        return r
    }

    function E(e) {
        if (parseInt(e / 1024 / 1024) > 0) {
            return (e / 1024 / 1024).toFixed(2) + "M"
        } else if (parseInt(e / 1024) > 0) {
            return (e / 1024).toFixed(2) + "K"
        } else {
            return e + "B"
        }
    }

    function A(e) {
        do {
            if (e.indexOf("image") != -1) {
                return "image"
            }
            if (e.indexOf("video") != -1 && p) {
                return "video"
            }
            if (e.indexOf("audio") != -1 && p) {
                return "audio"
            }
            return "file"
        } while (0)
    }

    function b(e) {
        var t = null;
        var i = e.match(/<img.*?(?:>|\/>)/gi);
        if (i) {
            var r = i[0].match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i);
            if (r) {
                t = r[1]
            }
        }
        return t
    }

    function P(e) {
        var t = new RegExp("(^|&)" + e.toLowerCase() + "=([^&]*)(&|$)");
        var i = window.location.href.toLowerCase().split("?")[1];
        var r = i && i.match(t);
        if (r != null) {
            return decodeURIComponent(r[2])
        }
        return ""
    }

    function N(e, t) {
        var i = new RegExp("(^|&)" + t.toLowerCase() + "=([^&]*)(&|$)");
        var r = e.toLowerCase().split("?")[1];
        var n = r && r.match(i);
        if (n != null) {
            return decodeURIComponent(n[2])
        }
        return ""
    }

    var I = I || function () {
            var e = navigator.userAgent.match(/(?:Android);?[\s\/]+([\d.]+)?/);
            var t = navigator.userAgent.match(/(?:iPad|iPod|iPhone).*OS\s([\d_]+)/);
            if (e || t) {
                return "mobile"
            } else {
                return "pc"
            }
        }();

    function D(e) {
        var t = e.split(":")[0];
        var i = e.split(":")[1];
        return Number(t) * 60 + Number(i)
    }

    function $(e) {
        if (s(e)) {
            return "-"
        } else {
            return (Math.round(100 * Number(e)) / 100).toFixed(0) + "%"
        }
    }

    function L(e) {
        if (s(e) || e === "-" || e === "") {
            return 0
        } else {
            return Number(e.replace("%", "")).toFixed(0)
        }
    }

    function U(e) {
        if (s(e)) {
            return "-"
        } else {
            return e + ""
        }
    }

    function R(e) {
        if (s(e)) {
            return 0
        } else {
            return e * 1
        }
    }

    function O(e) {
        if (s(e)) {
            return 0
        } else {
            return (Math.round(100 * Number(e)) / 100).toFixed(2)
        }
    }

    function j(e, t) {
        if (e) {
            t(e);
            j(e.children[0], t) || j(e.children[1], t)
        }
    }

    r.utils.isArray = e;
    r.utils.isObject = t;
    r.utils.isString = i;
    r.utils.isNumber = n;
    r.utils.isDate = a;
    r.utils.isFunction = o;
    r.utils.isUndefined = s;
    r.utils.isDefined = l;
    r.utils.isNull = c;
    r.utils.isNotNull = u;
    r.utils.isJson = d;
    r.utils.extend = h;
    r.utils.innerJS = _;
    r.utils.getCookie = y;
    r.utils.addClass = v;
    r.utils.removeClass = g;
    r.utils.html5Surport = p;
    r.utils.flashSurport = f;
    r.utils.os = I;
    r.utils.url = w;
    r.utils.now = T;
    r.utils.uuid = C;
    r.utils.formatSize = E;
    r.utils.formatFileType = A;
    r.utils.formatDateTime = S;
    r.utils.getFirstImageFromHtml = b;
    r.utils.getURLString = P;
    r.utils.getURLStringA = N;
    r.utils.n2p = $;
    r.utils.n2s = U;
    r.utils.n2d = O;
    r.utils.t2m = D;
    r.utils.p2n = L;
    r.utils.s2n = R;
    r.utils.traverse = j
})(org.ewei);
this.org = this.org || {};
org.ewei = org.ewei || {};
(function (e) {
    "use strict";
    var n = function () {
        var n = this;
        n._name = "root";
        n._layout = "%d [%p] %c %m%n";
        n._appenders = [new i];
        n.log = function (e, t) {
            var i = a();
            var r = {name: n._name, level: e, time: i, layout: n._layout, args: t};
            n._appenders.forEach(function (e) {
                n.levelFilterAppenderWrapper.done(e, r)
            })
        };
        n.debug = function () {
            n.log("debug", Array.prototype.slice.apply(arguments))
        };
        n.info = function () {
            n.log("info", Array.prototype.slice.apply(arguments))
        };
        n.warn = function () {
            n.log("warn", Array.prototype.slice.apply(arguments))
        };
        n.error = function () {
            n.log("error", Array.prototype.slice.apply(arguments))
        };
        n.setName = function (e) {
            n._name = e
        };
        n.setLayout = function (e) {
            n._layout = e
        };
        n.setAppenders = function (e) {
            n._appenders = e
        };
        n.setLevelFilterAppenderWrapper = function (e) {
            n.levelFilterAppenderWrapper = e
        };
        var t = function (e) {
            if (e >= 1 && e <= 9) {
                return "0" + e
            } else {
                return e + ""
            }
        };
        var a = function () {
            var e = new Date;
            return e.getFullYear() + "-" + t(e.getMonth() + 1) + "-" + t(e.getDate()) + " " + t(e.getHours()) + ":" + t(e.getMinutes()) + ":" + t(e.getSeconds()) + "." + e.getMilliseconds()
        }
    };
    var i = function () {
        var e = this;
        e.append = function (e) {
            if (!console) {
                return
            }
            var t = console[e.level];
            if (typeof t === "function") {
                var i = [].concat(e.args);
                [].splice.call(i, 0, 0, e.time, e.level, e.name);
                t.apply(console, i)
            } else {
                void 0
            }
        }
    };
    var t = function () {
        var e = this;
        e.append = function (e) {
            if (!e.level !== "error") {
                return
            }
            var t = e.layout.replace("%c", e.name).replace("%d", e.time).replace("%m", e.args).replace("%p", e.level).replace("%n", "")
        }
    };
    var r = function () {
        var i = this;
        window.onload = function () {
            var e = document.createElement("div");
            e.id = "windowLogger";
            e.setAttribute("style", "position: absolute;bottom: 0;left: 0;right: 0;height: 100px;overflow: auto;border:1px solid;padding:5px;z-index: 10000;background: antiquewhite;");
            i._window = document.body.appendChild(e)
        };
        i.append = function (e) {
            if (i._window && document) {
                var t = e.layout.replace("%c", e.name).replace("%d", e.time).replace("%m", e.args).replace("%p", e.level).replace("%n", "");
                document.getElementById(i._window.id).innerHTML += t + "<br/>"
            }
        }
    };
    var a = function (e) {
        var r = this;
        r.level = e;
        r.done = function (e, t) {
            for (var i = 0; i < r.level.length; i++) {
                if (t.level === r.level[i]) {
                    e.append(t)
                }
            }
        }
    };
    var o = function (e) {
        var r = this;
        r._layout = "%d [%p] %c %m%n";
        r._appenders = [new i];
        r.levelFilterAppenderWrapper = new a(e);
        r.setLayout = function (e) {
            r._layout = e
        };
        r.setAppenders = function (e) {
            r._appenders = e
        };
        r.setLevelFilterAppenderWrapper = function (e) {
            r.levelFilterAppenderWrapper = e
        };
        r.getLogger = function (e) {
            var t = "_logger_cache_" + e;
            if (!r[t]) {
                var i = new n;
                i.setName(e);
                i.setLayout(r._layout);
                i.setAppenders(r._appenders);
                i.setLevelFilterAppenderWrapper(r.levelFilterAppenderWrapper);
                r[t] = i
            }
            return r[t]
        }
    };
    var s = null;
    if (!!window) {
        s = window
    } else if (!!wx) {
        s = wx
    }
    s.BudoJavascriptLoggerFactory = o;
    s.BudoJavascriptLogger = n;
    s.ConsoleAppender = i;
    s.StorageAppender = t;
    s.WindowAppender = r;
    s.LevelFilterAppenderWrapper = a;
    var l = new o(["warn", "info", "error", "debug"]);
    l.setAppenders([new i]);
    e.logger = l.getLogger("eweiApp")
})(org.ewei);
var Ewei = Ewei || {};
Ewei.Type = Ewei.Type || {};
(function (e) {
    "use strict";
    function t() {
        this.keys = new Array;
        this.data = new Object
    }

    t.prototype.put = function (e, t) {
        if (!this.data.hasOwnProperty(e)) {
            this.keys.push(e)
        }
        this.data[e] = t
    };
    t.prototype.get = function (e) {
        return this.data[e]
    };
    t.prototype.remove = function (e) {
        this.keys.remove(e);
        delete this.data[e]
    };
    t.prototype.removeAll = function () {
        this.keys = [];
        this.data = {}
    };
    t.prototype.each = function (e) {
        if (typeof e != "function") {
            return
        }
        var t = this.keys.length;
        for (var i = 0; i < t; i++) {
            var r = this.keys[i];
            e(r, this.data[r], i)
        }
    };
    t.prototype.entrys = function () {
        var e = this.keys.length;
        var t = new Array(e);
        for (var i = 0; i < e; i++) {
            t[i] = {key: this.keys[i], value: this.data[i]}
        }
        return t
    };
    t.prototype.isEmpty = function () {
        return this.keys.length == 0
    };
    t.prototype.size = function () {
        return this.keys.length
    };
    t.prototype.toString = function () {
        var e = "{";
        for (var t = 0; t < this.keys.length; t++, e += ",") {
            var i = this.keys[t];
            e += i + "=" + this.data[i]
        }
        e += "}";
        return e
    };
    Ewei.Type.Map = t
})(angular);
var Ewei = Ewei || {};
Ewei.Model = Ewei.Model || {};
(function (n, e) {
    "use strict";
    function r() {
        this.class = "page";
        this.keys = new Array
    }

    r.prototype.gets = function () {
        return this.keys
    };
    r.prototype.get = function (e) {
        return this.keys[e]
    };
    r.prototype.find = function (e) {
        for (var t in this.keys) {
            if (this.keys.hasOwnProperty(t)) {
                if (this.keys[t] === e) {
                    return t
                }
            }
        }
        return -1
    };
    r.prototype.put = function (e) {
        this.keys = e
    };
    r.prototype.set = function (t, i) {
        n.forEach(this.keys, function (e) {
            if (t == e) {
                e = i
            }
        })
    };
    r.prototype.delete = function (e) {
        var t = e.length;
        for (var i = 0; i < t; i++) {
            this.keys.remove(e[i])
        }
    };
    r.prototype.unshift = function (e) {
        this.keys.unshift(e)
    };
    function t() {
        this.class = "list";
        this.pages = Object.create(null);
        this.settings = {total: 0, page: 1, countPerPage: 0}
    }

    t.prototype.put = function (e, t) {
        if (n.isUndefined(e)) {
            e = 1
        }
        this.pages[e] = this.pages[e] || new r;
        this.pages[e].put(t)
    };
    t.prototype.gets = function (e) {
        this.pages[e] = this.pages[e] || new r;
        return this.pages[e].gets()
    };
    t.prototype.get = function (e, t) {
        this.pages[e] = this.pages[e] || new r;
        return this.pages[e].get(t)
    };
    t.prototype.set = function (e, t, i) {
        this.pages[e] = this.pages[e] || new r;
        this.pages[e].set(t, i)
    };
    t.prototype.getAll = function () {
        var e = this;
        var t = [];
        for (var i in e.pages) {
            t = t.concat(e.pages[i].keys)
        }
        return t
    };
    t.prototype.delete = function (e, t) {
        this.pages[e].delete(t);
        this.settings.total -= t.length
    };
    t.prototype.deleteAll = function () {
        var e = this;
        for (var t in e.pages) {
            delete e.pages[t]
        }
    };
    t.prototype.remove = function (e) {
        var t = this;
        for (var i in t.pages) {
            t.pages[i].delete(e)
        }
        t.settings.total -= e.length
    };
    t.prototype.total = function (e) {
        return n.isDefined(e) ? this.settings.total = e : this.settings.total
    };
    t.prototype.page = function (e) {
        return n.isDefined(e) ? this.settings.page = e : this.settings.page
    };
    t.prototype.countPerPage = function (e) {
        return n.isDefined(e) ? this.settings.countPerPage = e : this.settings.countPerPage
    };
    t.prototype.unshift = function (e) {
        var t = this.settings.page;
        this.pages[t] = this.pages[t] || new r;
        if (this.pages[t].find(e) >= 0) {
            this.pages[t].delete([e])
        } else {
            this.settings.total++
        }
        this.pages[t].unshift(e)
    };
    t.prototype.find = function (e) {
        var t = this;
        for (var i in t.pages) {
            if (t.pages.hasOwnProperty(i)) {
                if (t.pages[i].find(e) >= 0) {
                    return true
                }
            }
        }
        return false
    };
    function i() {
        this.class = "dynamiclist"
    }

    i.prototype.get = function (e) {
        return this[e] = this[e] || new t
    };
    function a() {
        this.class = "detail";
        this.datas = {}
    }

    a.prototype.gets = function (e) {
        var t = new Array;
        var i = e.length;
        for (var r = 0; r < i; r++) {
            if (Object.hasOwnProperty.call(this.datas, e[r])) {
                t.push(this.datas[e[r]])
            }
        }
        return t
    };
    a.prototype.get = function (e) {
        return this.datas[e]
    };
    a.prototype.put = function (e, t) {
        if (this.datas.hasOwnProperty(e) && typeof t === "object") {
            this.update(e, t)
        } else {
            this.datas[e] = t
        }
    };
    a.prototype.remove = function (e) {
        delete this.datas[e]
    };
    a.prototype.removeAll = function () {
        this.datas = {}
    };
    a.prototype.set = function (e, t, i) {
        var r = this.datas[e];
        if (n.isDefined(r)) {
            r[t] = i
        }
    };
    a.prototype.total = function () {
        var e = 0;
        for (var t in this.datas) {
            if (typeof t != "function") {
                e++
            }
        }
        return e
    };
    a.prototype.getAll = function () {
        return this.datas
    };
    a.prototype.search = function (e) {
        e.search += "";
        var t = new Array;
        var i = new Array;
        for (var r in this.datas) {
            if (this.datas.hasOwnProperty(r)) {
                var n = this.datas[r];
                var a = n[e.property] + "";
                if (e.hasLike) {
                    if (a.indexOf(e.search) != -1) {
                        if (e.hasRepeat) {
                            t.push(n)
                        } else {
                            if (i.indexOf(a) == -1) {
                                t.push(n);
                                i.push(a)
                            }
                        }
                    }
                } else {
                    if (a == e.search) {
                        if (e.hasRepeat) {
                            t.push(n)
                        } else {
                            if (i.indexOf(a) == -1) {
                                t.push(n);
                                i.push(a)
                            }
                        }
                    }
                }
            }
        }
        return t
    };
    a.prototype.update = function (e, t) {
        var i = this.get(e);
        if (i) {
            for (var r in t) {
                if (t.hasOwnProperty(r) && r !== e && typeof t[r] !== "function") {
                    i[r] = t[r]
                }
            }
        }
    };
    a.prototype.updates = function (e, t) {
        var i, r;
        if (t.length) {
            for (i = 0; i < t.length; i++) {
                r = t[i];
                if (r && this.datas.hasOwnProperty(r[e])) {
                    this.update(r[e], r)
                }
            }
        }
    };
    Ewei.Model.List = t;
    Ewei.Model.Detail = a;
    Ewei.Model.Page = r;
    Ewei.Model.Dynamiclist = i
})(angular, org.ewei);
var Ewei = Ewei || {};
Ewei.Model = Ewei.Model || {};
(function (c, e) {
    "use strict";
    function t(i) {
        var t = this;
        var r, n;

        function e() {
            if (localStorage) {
                var e = JSON.stringify(t);
                if (r != e) {
                    try {
                        localStorage.setItem(i.key, e)
                    } catch (e) {
                        void 0
                    }
                    r = e
                }
            }
        }

        function a(e) {
            if (typeof e === "object") {
                for (var t in e) {
                    if (e[t]) {
                        if (e[t].class) {
                            e[t].__proto__ = i.protoType[e[t].class];
                            if ("list" == e[t].class && e[t].settings && e[t].settings.page) {
                                e[t].settings.page = 1
                            }
                        }
                        if (typeof e[t] === "object") {
                            a(e[t])
                        }
                    }
                }
            }
        }

        function o(i) {
            c.forEach(arguments, function (e) {
                if (e !== i) {
                    c.forEach(e, function (e, t) {
                        if (c.isObject(i[t]) || c.isArray(i[t])) {
                            o(i[t], e)
                        } else {
                            i[t] = c.copy(e)
                        }
                    })
                }
            });
            return i
        }

        function s() {
            var e = 15 * 60 * 1e3;
            r = n = JSON.stringify(t);
            setInterval(function () {
                if (localStorage) {
                    n = JSON.stringify(t);
                    if (r != n) {
                        try {
                            localStorage.setItem(i.key, n)
                        } catch (e) {
                            void 0
                        }
                        r = n
                    }
                }
            }, e)
        }

        function l() {
            if (localStorage) {
                try {
                    var e = JSON.parse(localStorage.getItem(i.key));
                    if (e) {
                        o(t, e);
                        a(t)
                    }
                } catch (e) {
                    void 0
                }
            }
        }

        t.init = function () {
            l();
            s()
        };
        t.forceSave = e
    }

    e.Cache = t
})(angular, Ewei.Model);
(function (e, n) {
    "use strict";
    e.module("eweiApp.core").service("coreModelService", t);
    t.$inject = ["ConsoleConfig"];
    function t(e) {
        var t = this;
        var i = e.provider.id + "." + e.user.id + ".model";
        var r = {
            detail: n.Detail.prototype,
            list: n.List.prototype,
            page: n.Page.prototype,
            dynamiclist: n.Dynamiclist.prototype
        };
        if (localStorage) {
            localStorage.removeItem(i)
        }
        t.list = new n.Cache({key: i + ".list", protoType: r});
        t.list.tickets = new n.Dynamiclist;
        t.list.statuscolors = new n.List;
        t.list.shortcuts = new n.List;
        t.list.chats = {};
        t.list.chats.waitting = new n.List;
        t.list.chats.waitting.header = new n.List;
        t.list.chats.chatting = new n.List;
        t.list.chats.chatting.header = new n.List;
        t.list.chats.closed = new n.List;
        t.list.chats.untreated = new n.List;
        t.list.chats.untreated.header = new n.List;
        t.list.ticket = {};
        t.list.ticket.views = new n.List;
        t.list.ticket.orderedViews = new n.List;
        t.list.user = {};
        t.list.user.views = new n.List;
        t.list.engineers = {};
        t.list.engineers.online = new n.List;
        t.list.engineers.run = new n.List;
        t.list.engineers.wait = new n.List;
        t.list.engineers.stop = new n.List;
        t.list.roles = {};
        t.list.roles.default = new n.List;
        t.list.roles.define = new n.List;
        t.list.assginRule = {};
        t.list.assginRule.ticket = new n.List;
        t.list.assginRule.chat = new n.List;
        t.list.ticketAttachments = new n.List;
        t.list.customers = new n.Dynamiclist;
        t.list.customers.views = new n.List;
        t.list.fields = {};
        t.list.fields.title = new n.Dynamiclist;
        t.list.communitys = {};
        t.list.communitys.news = new n.List;
        t.list.communitys.catalog = new n.List;
        t.list.communitys.resources = new n.List;
        t.list.helpResourcesCatologs = new n.List;
        t.list.helpResources = new n.List;
        t.list.question = new n.List;
        t.list.helpManageDocument = new n.List;
        t.list.dashboard = new n.List;
        t.list.messages = new n.List;
        t.list.recommondQuestions = new n.List;
        t.list.customerGroups = new n.List;
        t.list.servicedesks = new n.List;
        t.list.callrecords = new n.List;
        t.list.contacts = new n.List;
        t.list.phoneServicedesks = new n.List;
        t.list.siponline = new n.List;
        t.list.myActivity = {
            question_i_subscription: new n.List,
            question_mine: new n.List,
            question_i_answer: new n.List,
            question_i_comment: new n.List,
            article_mine: new n.List
        };
        t.list.myTickets = {
            all: new n.List,
            openOrNew: new n.List,
            solved: new n.List,
            pending: new n.List,
            closed: new n.List
        };
        t.list.logs = new n.Dynamiclist;
        t.list.operationLogs = new n.Dynamiclist;
        t.list.cachedTickets = new n.Dynamiclist;
        t.list.cachedUsers = new n.List;
        t.list.cachedServiceDesks = new n.List;
        t.list.cachedVias = new n.List;
        t.list.cachedEvaluates = new n.List;
        t.list.cachedTicketTypes = new n.List;
        t.list.cachedTicketMetrics = new n.List;
        t.list.cachedEngineers = new n.List;
        t.list.cachedUserGroups = new n.List;
        t.list.projectClassifyList = new n.List;
        t.list.todayData = new n.List;
        t.list.beforeTodayData = new n.List;
        t.list.projectByPhase = new n.List;
        t.list.phaseByCategory = new n.List;
        t.list.projectDetail = new n.List;
        t.list.projectRelatedWorkOrder = new n.List;
        t.list.custom = {};
        t.list.custom.ticketViews = new n.List;
        t.list.userGroups = new n.Dynamiclist;
        t.list.templates = new n.List;
        t.list.ticketTemplates = new n.List;
        t.list.workflows = new n.List;
        t.detail = new n.Cache({key: i + ".detail", protoType: r});
        t.detail.tickets = new n.Detail;
        t.detail.statuscolors = new n.Detail;
        t.detail.shortcuts = new n.Detail;
        t.detail.customers = new n.Detail;
        t.detail.customers.views = new n.Detail;
        t.detail.engineers = new n.Detail;
        t.detail.roles = new n.Detail;
        t.detail.accessScope = new n.Detail;
        t.detail.permissionses = new n.Detail;
        t.detail.customerDefaultRoles = new n.Detail;
        t.detail.fields = {};
        t.detail.fields.title = new n.Detail;
        t.detail.messages = new n.Detail;
        t.detail.quickReplys = new n.Detail;
        t.detail.articles = new n.Detail;
        t.detail.groups = new n.Detail;
        t.detail.recommondQuestions = new n.Detail;
        t.detail.communitys = new n.Detail;
        t.detail.assginRule = {};
        t.detail.assginRule.ticket = new n.Detail;
        t.detail.assginRule.chat = new n.Detail;
        t.detail.chats = {};
        t.detail.chats.chatting = new n.Detail;
        t.detail.chats.waitting = new n.Detail;
        t.detail.chats.untreated = new n.Detail;
        t.detail.chats.waitting.header = new n.Detail;
        t.detail.chats.chatting.header = new n.Detail;
        t.detail.chats.untreated.header = new n.Detail;
        t.detail.chats.closed = new n.Detail;
        t.detail.chats.count = new n.Detail;
        t.detail.ticket = {};
        t.detail.ticket.views = new n.Detail;
        t.detail.ticketAttachments = new n.Detail;
        t.detail.ticketTimeLine = new n.Detail;
        t.detail.user = {};
        t.detail.user.views = new n.Detail;
        t.detail.summary = new n.Detail;
        t.detail.customerGroups = new n.Detail;
        t.detail.servicedesks = new n.Detail;
        t.detail.ctis = new n.Detail;
        t.detail.callrecords = new n.Detail;
        t.detail.contacts = new n.Detail;
        t.detail.siponline = new n.Detail;
        t.detail.helpCenterCatalog = new n.Detail;
        t.detail.helpManageDocument = new n.Detail;
        t.detail.helpResourcesCatologs = new n.Detail;
        t.detail.helpResources = new n.Detail;
        t.detail.question = new n.Detail;
        t.detail.serviceCatalogs = {};
        t.detail.statistics = {
            columns: {
                customer: {customer: [], customerGroup: [], evaluate: []},
                ticket: {channel: [], priority: [], quantity: [], sla: [], type: []}
            }
        };
        t.detail.myActivity = {
            question_i_subscription: new n.Detail,
            question_mine: new n.Detail,
            question_i_answer: new n.Detail,
            question_i_comment: new n.Detail,
            article_mine: new n.Detail
        };
        t.detail.logs = new n.Detail;
        t.detail.operationLogs = new n.Detail;
        t.detail.myTickets = {
            all: new n.Detail,
            openOrNew: new n.Detail,
            solved: new n.Detail,
            pending: new n.Detail,
            closed: new n.Detail
        };
        t.detail.cachedTickets = new n.Detail;
        t.detail.cachedUsers = new n.Detail;
        t.detail.cachedServiceDesks = new n.Detail;
        t.detail.cachedVias = new n.Detail;
        t.detail.cachedEvaluates = new n.Detail;
        t.detail.cachedTicketTypes = new n.Detail;
        t.detail.cachedTicketMetrics = new n.Detail;
        t.detail.cachedEngineers = new n.Detail;
        t.detail.cachedUserGroups = new n.Detail;
        t.detail.cachedTicketTags = new n.Detail;
        t.detail.cachedServiceCatalogs = new n.Detail;
        t.detail.projectClassifyList = new n.Detail;
        t.detail.todayData = new n.Detail;
        t.detail.beforeTodayData = new n.Detail;
        t.detail.projects = new n.Detail;
        t.detail.phases = new n.Detail;
        t.detail.projectDetail = new n.Detail;
        t.detail.projectRelatedWorkOrder = new n.Detail;
        t.detail.custom = {};
        t.detail.custom.ticketViews = new n.Detail;
        t.detail.userGroups = new n.Detail;
        t.detail.templates = new n.Detail;
        t.detail.ticketTemplates = new n.Detail;
        t.detail.workflows = new n.Detail;
        t.config = new n.Cache({key: i + ".config", protoType: r});
        t.config.evaluate = {};
        t.config.route = new n.Detail;
        t.config.ticket = {};
        t.config.license = new n.Detail;
        t.config.activeCtiID = -1;
        t.config.userState = null;
        t.config.brandSetting = {};
        t.other = new n.Cache({key: i + ".other", protoType: r});
        t.other.cti = {};
        t.other.cti.missCallCount = 0;
        t.run = function () {
            t.list.init();
            t.detail.init();
            t.config.init();
            t.other.init()
        };
        t.run()
    }
})(angular, Ewei.Model);
(function (l) {
    "use strict";
    l.module("eweiApp.core").service("coreNotifyService", e);
    e.$inject = ["$timeout"];
    function e(r) {
        var n = new Array;
        var e = {
            EVENT_LIST_TICKET_REFRESH: "list.ticket.refresh",
            EVENT_LIST_TICKET_NEW: "list.ticket.new",
            EVENT_LIST_CHAT_CHATTING: "list.chat.chatting",
            EVENT_LIST_CHAT_WAITTING: "list.chat.waitting",
            EVENT_LIST_CHAT_ClOSED: "list.chat.closed",
            EVENT_LIST_CHAT_UNTREATED: "list.chat.untreated",
            EVENT_LIST_ENGINEER_ONLINE: "list.engineer.online",
            EVENT_LIST_ENGINEER_ALL: "list.engineer.all",
            EVENT_LIST_ROLES: "list.roles",
            EVENT_LIST_CUSTOMER_REFRESH: "list.customer_refresh",
            EVENT_LIST_FIELD_TITLE: "list.field.title",
            EVENT_LIST_SHORTCUT: "list.shortcut",
            EVENT_LIST_SHORTCUT_UPDATE: "list.shortcut.update",
            EVENT_LIST_TICKET_STATUSCOLORS: "list.ticket.statuscolors",
            EVENT_LIST_DASHBOARD: "list.dashboard",
            EVENT_LIST_MESSAGE: "list.message",
            EVENT_LIST_RECOMMONDQUESTIONS: "list.recommondQuestions",
            EVENT_LIST_COMMUNITYS: "list.communitys",
            EVENT_LIST_CUSTOMERGROUP: "list.customergroup",
            EVENT_LIST_CUSTOMERGROUP_REFRESH: "list.customergroup_refresh",
            EVENT_LIST_SERVICEDESK: "list.servicedesk",
            EVENT_LIST_DATA_LOADING: "list.data.loading",
            EVENT_LIST_CHAT_REFRESH: "list.chat.refresh",
            EVENT_LIST_PHONE_SERVICEDESK: "list.phone.servicedesk",
            EVENT_LIST_PHONE_SIPONLINE: "list.phone.siponlie",
            EVENT_LIST_CUSTOM_TICKETVIEWS: "list.custom.ticketViews",
            EVENT_LIST_ASSIGN_RULE: "list.assgin.rule",
            EVENT_LIST_MYACTIVITY_REFRESH: "list.myactivity.refresh",
            EVENT_LIST_MYACTIVITY_COUNT: "list.myactivity.count",
            EVENT_LIST_MYTICKETS_REFRESH: "list.mytickets.refresh",
            EVENT_LIST_MYTICKETS_COUNT: "list.mytickets.count",
            EVENT_LIST_LOG_REFRESH: "list.log.refresh",
            EVENT_LIST_CUSTOMERS: "list.customers",
            EVENT_LIST_USERGROUP: "list.usergroup",
            EVENT_LIST_TEMPLATES: "list.templates",
            EVENT_LIST_TICKET_TEMPLATES: "list.ticket.templates",
            EVENT_DETAIL_TICKETS: "detail.tickets",
            EVENT_DETAIL_CUSTOMERS: "detail.customers",
            EVENT_DETAIL_CUSTOMERS_VIEWS: "detail.customers.views",
            EVENT_DETAIL_ENGINEERS: "detail.engineers",
            EVENT_DETAIL_ENGINEERS_THIRDS: "detail.engineers.thirds",
            EVENT_DETAIL_ROLES: "detail.roles",
            EVENT_DETAIL_ACCESSSCOPE: "detail.accessScope",
            EVENT_DETAIL_PERMISSIONSES: "detail.permissionses",
            EVENT_DETAIL_CUSTOMERDEFAULTROLES: "detail.customerDefaultRoles",
            EVENT_DETAIL_CHATS: "detail.chats",
            EVENT_DETAIL_MESSAGES: "detail.messages",
            EVENT_DETAIL_RECOMMONDQUESTIONS: "detail.recommondQuestions",
            EVENT_DETAIL_NOTIFYCONFIG: "detail.notifyConfig",
            EVENT_DETAIL_NOTIFYTIP: "detail.notifyTip",
            EVENT_DETAIL_SUMMARY: "detail.summary",
            EVENT_DETAIL_CUSTOMERGROUPS: "detail.customergroups",
            EVENT_DETAIL_SERVICEDESKS: "detail.servicedesks",
            EVENT_DETAIL_TICKET_VIEWS: "detail.ticket.views",
            EVENT_DETAIL_TICKET_ORDERED_VIEWS: "detail.ticket.orderedViews",
            EVENT_DETAIL_USER_VIEWS: "detail.user.views",
            EVENT_DETAIL_CTIS: "detail.ctis",
            EVENT_DETAIL_CTI_CALL_RECORDS: "detail.cti.call.records",
            EVENT_DETAIL_CTI_CONTACT_LIST: "detail.cti.contact.list",
            EVENT_DETAIL_SERVICE_CATALOGS: "detail.servicecatalogs",
            EVENT_DETAIL_USERIDS_BY_DEFAULT_SERVICEDESK: "detail.useridsbydefaultservicedesk",
            EVENT_DETAIL_HELPCENTER_CATALOG: "detail.helpCenterCatalog",
            EVENT_DETAIL_HELP_MANAGE_DOCUMENT: "detail.helpManageDocument",
            EVENT_DETAIL_HELPRESOURCESCATOLOGS: "detail.helpResourcesCatologs",
            EVENT_DETAIL_HELPRESOURCES: "detail.helpResources",
            EVENT_DETAIL_QUESTION: "detail.question",
            EVENT_DETAIL_CONSOLE_GUIDE: "detail.consoleGuide",
            EVENT_CTI_STARTED: "cti.started",
            EVENT_CTI_SIP_CONFIG: "cti.sip.config",
            EVENT_CTI_SIP_WL: "cti.sip.wl",
            EVENT_CTI_SIP_DL: "cti.sip.dl",
            EVENT_CTI_MISS_CALL: "cti.miss.call",
            EVENT_CTI_CALL_FAILED: "cti.call.failed",
            EVENT_CTI_CALLIN: "cti.callin",
            EVENT_CTI_RING: "cti.ring",
            EVENT_CTI_HANGUP: "cti.hangup",
            EVENT_CTI_HANGUP_ENABLE: "cti.hangup.enable",
            EVENT_CTI_CONNECTED: "cti.connected",
            EVENT_CTI_LINE_IDENTITY: "cti.line.identity",
            EVENT_CTI_SIP_MSG: "cti.sip.msg",
            EVENT_CTI_HELD_SUCCESS: "cti.held.success",
            EVENT_CTI_PICKUP: "cti.pickup",
            EVENT_CTI_VIA_DETAIL: "cti.via.detail",
            EVENT_CTI_AUDIO_UPLOAD_COMPLETED: "cti.audio.upload.completed",
            EVENT_CTI_PUSH_RECONNECT: "cti.push.reconnect",
            EVENT_CTI_ERROR: "cti.error",
            EVENT_UBOX_CANCEL_ERROR: "ubox_cancel_error",
            EVENT_OTHER_MESSAGE_COUNT: "other.message.count",
            EVENT_OTHER_CHAT_RED_POINT: "other.chat.red.point",
            EVENT_OTHER_INVITE_ENGINEER: "other.inviteEngineer",
            EVENT_CHAT_LIST_COUNT: "chat.list.count",
            EVENT_LICENSE: "license",
            EVENT_TICKET_WORKFLOWS: "ticket.workflows",
            EVENT_DETAIL_BRAND_SETTING_HELPCENTER: "detail.brand.setting.helpcenter",
            EVENT_DETAIL_BRAND_SETTING_EMAIL: "detail.brand.setting.email",
            EVENT_DETAIL_BRAND_SETTING_DOMAIN: "detail.brand.setting.domain",
            EVENT_PHONE_DIAL_SET: "phone.dial.set",
            EVENT_PHONE_PANEL: "phone.panel",
            EVENT_MAIN_DIAL_PANEL: "main.dial.panel",
            EVENT_PHONE_NUM_IMPORT: "phone.num.import",
            EVENT_PHONE_USB_PANEL: "phone.usb.panel",
            EVENT_MENUS_STATUS: "menus.status",
            EVENT_PHONE_STATUS: "phone.status",
            EVENT_PHONE_SIPCALL_PANEL: "phone.sipcall.panel",
            EVENT_PHONE_SIPCALL_CHANGE_NUMBER: "phone.sipcall.change.number",
            EVENT_PHONE_SIPCALL_RECORD_TICKET_PANEL: "phone.recordTicket.panel",
            EVENT_PHONE_CLOSE_PLAYSCREEN: "phone.close.playScreen",
            EVENT_PHONE_CREATE_TICKET: "phone.createTicket",
            EVENT_PHONE_CHANGE_CHAT_USER: "phone.changeChatUser",
            EVENT_PHONE_USB_CREATE_TICKET: "phone.usbCreateTicket",
            EVENT_FIND_PEOPLE_INFO: "find.people.info",
            EVENT_ADD_CALL_RECORD: "add.call.record",
            EVENT_USB_DEDICATE_ACTIVE_MODE: "usb.dedicate.active.mode",
            EVENT_SWITCH_SET_PANEL: "switch.set.panel",
            EVENT_JUDGE_CALL_OUT: "judge.call.out",
            EVENT_CALL_OUT: "call.out",
            EVENT_PHONE_DATA_CONTACTS: "phone.data.contacts",
            EVENT_PHONE_DATA_RECORDS: "phone.data.records",
            EVENT_TIP_PANEL: "tip.panel",
            EVENT_PHONE_TRANSFER_PANEL: "phone.transfer.panel",
            EVENT_PHONE_MUTIL_PANEL: "phone.mutil.panel",
            EVENT_UBOX_PHONE_CALL_IN_STATUS: "ubox.phone.call.in.status",
            EVENT_PHONE_CONNECT_NOTIFY: "phone.connect.notify",
            EVENT_CHANNEL_STOP: "channel.stop",
            EVENT_CONTACT_TITLE: "contact.title",
            EVENT_CONTACT_MAIN_PANEL: "contact.main.panel",
            EVENT_UBOX_CALLIN_TIP: "ubox.phone.callin.tip",
            EVENT_UBOX_CLOSE_CALLIN_TIP: "ubox.phone.close.callin.tip",
            EVENT_UBOX_CALLIN_TIP_CONFIRM: "ubox.phone.callin.tip.confirm",
            EVENT_PHONE_RESET_USERINFO: "phone.reset.userinfo",
            EVENT_CONFIG_COMPLETE: "config.complete",
            EVENT_PROJECT_CLASSIFY_LIST: "project.classify.list",
            EVENT_PROJECT_CHECK_ALL: "project.check.all",
            EVENT_FAV_DATA: "fav.data",
            EVENT_FAV_TRAN_PROJECT: "fav.tran.project",
            EVENT_FAV_TRAN_PROJECT_DELETE: "fav.tran.project.delete",
            EVENT_FAV_DATA_MORE: "fav.data.more",
            EVENT_NEW_FAVORITE_ADDED: "project.newFavoriteAdded",
            EVENT_NEW_FAVORITE_REMOVED: "project.newFavoriteRemoved",
            EVENT_NEW_FAVORITE_CLEARED: "project.newFavoriteCleared",
            EVENT_LIST_PROJECT_BY_PHASE: "list.project.by.phase",
            EVENT_LIST_PHASE_REFRESH: "list.phase.refresh",
            EVENT_LIST_PHASE_BY_CATEGORY: "list.phase.by.category",
            EVENT_NEW_PROJECT_ADDED: "project.newProjectAdded",
            EVENT_LIST_PROJECT_REFRESH: "list.project.refresh",
            EVENT_DETAIL_PROJECTS: "detail.projects",
            EVENT_DETAIL_PHASE: "detail.phases",
            EVENT_FAV_DELETE_MUTILE: "fav.delete.mutile",
            EVENT_FAV_GO_PAGE: "fav.go.page",
            EVENT_PROJECT_RELATE_WORKORDER: "project.relate.workorder",
            EVENT_LIST_WORKFLOWS: "list.workflows",
            EVENT_LIST_CACHED_TICKETS_AVAILABLE: "list.cached.tickets.available",
            EVENT_LIST_CACHED_USERS_AVAILABLE: "list.cached.users.available",
            EVENT_LIST_CACHED_SERVICEDESKS_AVAILABLE: "list.cached.servicedesks.available",
            EVENT_LIST_CACHED_VIAS_AVAILABLE: "list.cached.vias.available",
            EVENT_LIST_CACHED_EVALUATES_AVAILABLE: "list.cached.evaluates.available",
            EVENT_LIST_CACHED_TICKETTYPES_AVAILABLE: "list.cached.tickettypes.available",
            EVENT_LIST_CACHED_TICKETMETRICS_AVAILABLE: "list.cached.ticketmetrics.available",
            EVENT_LIST_CACHED_ENGINEERS_AVAILABLE: "list.cached.engineers.available",
            EVENT_DETAIL_CACHED_TICKET_UPDATED: "detail.cached.ticket.updated",
            EVENT_DETAIL_CACHED_USER_UPDATED: "detail.cached.user.updated",
            EVENT_DETAIL_CACHED_SERVICEDESK_UPDATED: "detail.cached.servicedesk.updated",
            EVENT_DETAIL_CACHED_VIA_UPDATED: "detail.cached.via.updated",
            EVENT_DETAIL_CACHED_EVALUATE_UPDATED: "detail.cached.evaluate.updated",
            EVENT_DETAIL_CACHED_TICKETTYPE_UPDATED: "detail.cached.tickettype.updated",
            EVENT_DETAIL_CACHED_TICKETMETRIC_UPDATED: "detail.cached.ticketmetric.updated",
            EVENT_DETAIL_CACHED_ENGINEER_UPDATED: "detail.cached.engineer.updated",
            EVENT_DETAIL_CACHED_USERGROUP_UPDATED: "detail.cached.usergroup.updated",
            EVENT_DETAIL_CACHED_TICKET_TAG_UPDATED: "detail.cached.ticket.tag.updated",
            EVENT_DETAIL_CACHED_SERVICE_CATALOG_UPDATED: "detail.cached.service.catalog.updated",
            EVENT_DETAIL_TICKET_ATTACHMENTS: "detail.ticket.attachments",
            EVENT_DETAIL_TICKET_TIMELINE: "detail.ticket.timeline",
            EVENT_WIDGET_REMOTE_STATUS: "widget.remote.status",
            EVENT_WIDGET_REMOTE_HIDE: "widget.remote.hide",
            EVENT_STATISTICS_SEARCH_DETAIL_EDIT: "statistics.search.detail.edit",
            EVENT_STATISTICS_SEARCH_DETAIL_ADD: "statistics.search.detail.add",
            EVENT_STATISTICS_SEARCH_DETAIL_SEARCH: "statistics.search.detail.search",
            EVENT_STATISTICS_SEARCH_VIEW: "statistics.search.view",
            EVENT_STATISTICS_SEARCH_DONE: "statistics.search.done",
            EVENT_APP_OPEN_ASSET: "app.open.asset"
        };
        var t = {register: i, unRegister: a, doNotify: o, constant: e};
        return t;
        function i(e, t, i) {
            if (s(t)) {
                n.push({listener: e, event: t, fn: i})
            } else {
                void 0
            }
        }

        function a(e) {
            var t = n.length - 1;
            for (var i = t; i >= 0; i--) {
                if (e == n[i].listener) {
                    n.splice(i, 1)
                }
            }
        }

        function o(t, i, e) {
            if (s(t)) {
                if (l.isUndefined(e)) {
                    e = 0
                }
                r(function () {
                    l.forEach(n, function (e) {
                        if (t == e.event) {
                            if (typeof e.fn === "function") {
                                e.fn(t, i)
                            }
                        }
                    })
                }, e)
            } else {
                void 0
            }
        }

        function s(t) {
            var i = false;
            l.forEach(e, function (e) {
                if (t == e) {
                    i = true
                }
            });
            return i
        }
    }
})(angular);
(function (u) {
    u.module("eweiApp.core").service("apiUserViewService", e);
    e.$inject = ["apiRestfulService", "coreModelService", "coreNotifyService"];
    function e(a, o, s) {
        this.run = function (e, t, r, n) {
            var i = {url: "api/v1/views.json", urlParam: e, dataParam: t};
            a.run(i).get(i.dataParam, function (e) {
                void 0;
                if (e.status == 0) {
                    l(e.result.views);
                    c(e.result.views);
                    void 0;
                    var i = [];
                    u.forEach(e.result.views, function (e, t) {
                        o.detail.user.views.put(t, e);
                        i.push(t)
                    });
                    o.list.user.views.put(1, i);
                    s.doNotify(r)
                }
                if (typeof n === "function") {
                    n(e)
                }
            })
        };
        function t() {
            var e = {VIEW_TITLE_USER: "客户", VIEW_TITLE_USER_GROUP: "客户组", VIEW_TITLE_USER_BLACKLIST: "黑名单"};
            return e
        }

        function l(e) {
            u.forEach(e, function (e) {
                if (e.title == "VIEW_TITLE_USER_BLACKLIST") {
                    e.permission = "customer_blacklist_manage"
                } else {
                    e.permission = ""
                }
            })
        }

        function c(e) {
            u.forEach(e, function (e) {
                if (e.isSystemDefault) {
                    e.displayTitle = t()[e.title];
                    if (e.title == "VIEW_TITLE_USER") {
                        e.typeKey = "user_all"
                    } else if (e.title == "VIEW_TITLE_USER_GROUP") {
                        e.typeKey = "user_group"
                    } else if (e.title == "VIEW_TITLE_USER_BLACKLIST") {
                        e.typeKey = "user_blacklist"
                    } else if (e.title == "最近新增客户") {
                        e.typeKey = "user_new"
                    }
                    e.type = "user"
                }
            })
        }
    }
})(angular);
(function (u) {
    u.module("eweiApp.core").service("apiTicketViewService", e);
    e.$inject = ["apiRestfulService", "coreModelService", "coreNotifyService", "$filter"];
    function e(a, o, s, t) {
        this.run = function (e, t, r, n) {
            if (!e.hasOwnProperty("_asc")) {
                e._asc = "position"
            }
            var i = {url: "api/v1/views.json", urlParam: e, dataParam: t};
            a.run(i).get(i.dataParam, function (e) {
                if (e.status == 0) {
                    l(e.result.views);
                    c(e.result.views);
                    var i = [];
                    u.forEach(e.result.views, function (e, t) {
                        o.detail.ticket.views.put(e.id, e);
                        i.push(e.id)
                    });
                    o.list.ticket.views.put(1, i);
                    o.detail.forceSave();
                    o.list.forceSave();
                    s.doNotify(r)
                }
                if (typeof n === "function") {
                    n(e)
                }
            })
        };
        this.getSorted = function (i, r) {
            a.run({url: "api/v1/view_sequence/get.json"}).get(null, function (e) {
                if (e.status == 0 && e.result && e.result.viewSequence) {
                    var t = e.result.viewSequence.sequence.split(",").map(function (e) {
                        return parseInt(e)
                    });
                    o.list.ticket.orderedViews.put(1, t);
                    s.doNotify(i)
                }
                if (u.isFunction(r)) {
                    r(response)
                }
            })
        };
        function l(e) {
            u.forEach(e, function (e) {
                if (e.title == "VIEW_TITLE_TICKET_SUSPENDED") {
                    e.permission = "ticket_suspended_manage"
                } else if (e.title == "VIEW_TITLE_TICKET_DELETED") {
                    e.permission = "ticket_deleted_manage"
                } else {
                    e.permission = ""
                }
            })
        }

        function c(e) {
            u.forEach(e, function (e) {
                if (e.isSystemDefault) {
                    e.displayTitle = t("translate")(e.title)
                }
            })
        }
    }
})(angular);
(function (l) {
    l.module("eweiApp.core").factory("chatQueueService", e);
    e.$inject = ["coreModelService", "coreNotifyService", "apiRestfulService"];
    function e(o, s, r) {
        var e = function (e, t, n, a) {
            var i = {url: "api/v1/chat/chats.json", urlParam: e, dataParam: t};
            r.run(i).get(i.dataParam, function (e) {
                for (var t = 0; e.result._total > 0 && t < e.result.chats.length; t++) {
                    var i = e.result.chats[t].firstMessage;
                    if (i != null && i != "" && i != "undefined") {
                        e.result.chats[t].c_firstMessage = i
                    } else {
                        e.result.chats[t].c_firstMessage = "#" + e.result.chats[t].id
                    }
                }
                var r = [];
                l.forEach(e.result.chats, function (e, t) {
                    o.detail.chats.chatting.put(e.id, e);
                    r.push(e.id)
                });
                o.list.chats.chatting.put(e.result._page, r);
                o.list.chats.chatting.total(e.result._total);
                s.doNotify(n);
                if (typeof a === "function") {
                    a(e)
                }
            })
        };
        return e
    }
})(angular);
(function (c) {
    c.module("eweiApp.core").factory("waitChatQueueService", e);
    e.$inject = ["permissions", "coreModelService", "coreNotifyService", "apiRestfulService"];
    function e(o, s, l, r) {
        var e = function (e, t, n, a) {
            var i = {url: "api/v1/chat/waiting_chat_queue.json", urlParam: e, dataParam: t};
            r.run(i).get(i.dataParam, function (e) {
                for (var t = 0; e.result._total > 0 && t < e.result.chats.length; t++) {
                    var i = e.result.chats[t].firstMessage;
                    if (i != null && i != "" && i != "undefined") {
                        e.result.chats[t].w_firstMessage = i
                    } else {
                        e.result.chats[t].w_firstMessage = "等待接通会话"
                    }
                    if (o.hasPermission("ticket_chat_assign") || o.hasPermission("ticket_force_join_chat")) {
                        e.result.chats[t].isMyselfHandle = "false"
                    } else {
                        e.result.chats[t].isMyselfHandle = "true"
                    }
                }
                void 0;
                var r = [];
                c.forEach(e.result.chats, function (e, t) {
                    s.detail.chats.waitting.put(e.id, e);
                    r.push(e.id)
                });
                s.list.chats.waitting.put(e.result._page, r);
                s.list.chats.waitting.total(e.result._total);
                l.doNotify(n);
                if (typeof a === "function") {
                    a(e)
                }
            })
        };
        return e
    }
})(angular);
(function (l) {
    l.module("eweiApp.core").factory("endChatQueueService", e);
    e.$inject = ["coreModelService", "coreNotifyService", "apiRestfulService"];
    function e(a, o, s) {
        var e = function (e, t, r, n) {
            var i = {url: "api/v1/chat/closed_chats.json", urlParam: e, dataParam: t};
            s.run(i).get(i.dataParam, function (e) {
                var i = [];
                l.forEach(e.result.chats, function (e, t) {
                    a.detail.chats.closed.put(e.id, e);
                    i.push(e.id)
                });
                void 0;
                a.list.chats.closed.put(e.result._page, i);
                a.list.chats.closed.total(e.result._total);
                o.doNotify(r);
                if (typeof n === "function") {
                    n(e)
                }
            })
        };
        return e
    }
})(angular);
(function (l) {
    l.module("eweiApp.core").factory("untreatedChatQueueService", e);
    e.$inject = ["permissions", "coreModelService", "coreNotifyService", "apiRestfulService"];
    function e(e, a, o, s) {
        var t = function (e, t, r, n) {
            var i = {url: "api/v1/chat/untreated_chats.json", urlParam: e, dataParam: t};
            s.run(i).get(i.dataParam, function (e) {
                var i = [];
                l.forEach(e.result.chats, function (e, t) {
                    a.detail.chats.untreated.put(e.id, e);
                    i.push(e.id)
                });
                a.list.chats.untreated.put(e.result._page, i);
                a.list.chats.untreated.total(e.result._total);
                o.doNotify(r);
                if (typeof n === "function") {
                    n(e)
                }
            })
        };
        return t
    }
})(angular);
(function (e) {
    "use strict";
    e.module("eweiApp.core").service("apiRestfulService", ["ConsoleConfig", "$resource", function (i, r) {
        this.run = function (e) {
            var t = "?provider_id=" + i.provider.id + "&_token=" + getCookie("user_token");
            e.url += t;
            return r(e.url, e.urlParam, {
                query: {method: "GET"},
                post: {method: "POST"},
                put: {method: "PUT"},
                delete: {method: "DELETE", data: e.dataParam}
            })
        }
    }])
})(angular);
!function (u) {
    "use strict";
    u.module("eweiApp.core").service("apiConsoleShortcutsService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (s, l, c) {
        this.run = function (e, n, a, t, i, o) {
            var r = {url: "api/v1/console_shortcuts.json", urlParam: t, dataParam: i};
            s.run(r).get(r.dataParam, function (e) {
                if (0 == e.status && u.isDefined(e.result.shortcuts)) {
                    var i = [];
                    l.detail.shortcuts.removeAll();
                    u.forEach(e.result.shortcuts, function (e, t) {
                        e.id = t;
                        if ("user" == e.type && "engineer" == e.typeKey) {
                            e.view = {fields: "id,user.name,defaultServiceDesk.name,role.name,user.mobilePhone,user.lastLoginAt,androidOnline,iosOnline,webOnline"}
                        }
                        l.detail.shortcuts.put(t, e);
                        i.push(t)
                    });
                    var t = i.length;
                    var r = {id: t, name: "管理", count: "+", orderKey: t, view: {title: "CONSOLE_SHORTCUTS_MANAGE"}};
                    l.detail.shortcuts.put(r.id, r);
                    i.push(t);
                    l.list.shortcuts.put(a, i);
                    l.list.shortcuts.total(i.length);
                    c.doNotify(n)
                }
                if (typeof o === "function") {
                    o(e)
                }
            })
        }
    }])
}(angular);
!function (u) {
    "use strict";
    u.module("eweiApp.core").service("apiCustomFieldListShowService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (s, l, c) {
        this.run = function (i, r, n, e, t, a) {
            var o = {url: "api/v1/custom_field_list/show.json", urlParam: e, dataParam: t};
            s.run(o).get(o.dataParam, function (e) {
                if (0 == e.status && u.isDefined(e.result.defaultShow) && u.isDefined(e.result.customShow)) {
                    var t = [];
                    u.forEach(e.result.defaultShow, function (e) {
                        if (e.id !== "serviceDeskName") {
                            e.systemFieldKey = true
                        } else {
                            e.systemFieldKey = false
                        }
                        l.detail.fields.title.put(e.id, e);
                        t.push(e.id)
                    });
                    u.forEach(e.result.customShow, function (e) {
                        e.systemFieldKey = false;
                        l.detail.fields.title.put(e.id, e);
                        t.push(e.id)
                    });
                    l.list.fields.title.get(i).put(n, t);
                    l.list.fields.title.get(i).total(t.length);
                    c.doNotify(r)
                }
                if (typeof a === "function") {
                    a(e)
                }
            })
        }
    }])
}(angular);
(function (u) {
    "use strict";
    u.module("eweiApp.core").service("apiTicketCustomFieldValueService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (s, l, c) {
        this.run = function (e, t, i, r, n, a) {
            var o = {url: "api/v1/tickets/custom_field_value.json", urlParam: r, dataParam: n};
            s.run(o).get(o.dataParam, function (e) {
                if (u.isDefined(e.result)) {
                    u.forEach(e.result, function (e) {
                        l.detail.tickets.set(e.ticketId, e.customFieldId, e.value);
                        c.doNotify(t, {id: e.ticketId})
                    })
                }
                if (typeof a === "function") {
                    a(e)
                }
            })
        }
    }])
})(angular);
(function (u) {
    "use strict";
    u.module("eweiApp.core").service("apiCustomerCustomFieldValueService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (s, l, c) {
        this.run = function (e, t, i, r, n, a) {
            var o = {url: "api/v1/customers/custom_field_value.json", urlParam: r, dataParam: n};
            s.run(o).get(o.dataParam, function (e) {
                if (u.isDefined(e.result)) {
                    u.forEach(e.result, function (e) {
                        l.detail.customers.set(e.userId, e.customFieldId, e.value);
                        c.doNotify(t, {id: e.userId})
                    })
                }
                if (typeof a === "function") {
                    a(e)
                }
            })
        }
    }])
})(angular);
!function (d) {
    "use strict";
    d.module("eweiApp.core").service("apiCustomerService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (l, c, u) {
        this.run = function (i, r, n, e, t, a) {
            var o = "";
            if ("user_new" == i) {
                o = "api/v1/customers/new_customers.json"
            } else if ("user_all" == i) {
                o = "api/v1/customers/all_customers.json"
            } else if ("user_blacklist" == i) {
                o = "api/v1/customers/blacklist_customers.json"
            } else {
                o = "api/v1/users.json"
            }
            var s = {url: o, urlParam: e, dataParam: t};
            l.run(s).get(s.dataParam, function (e) {
                if (d.isDefined(e.result) && d.isDefined(e.result.customers)) {
                    var t = [];
                    d.forEach(e.result.customers, function (e) {
                        c.detail.customers.put(e.id, e);
                        t.push(e.id)
                    });
                    c.list.customers.get(i).put(n, t);
                    c.list.customers.get(i).total(e.result._total);
                    u.doNotify(r)
                }
                if (typeof a === "function") {
                    a(e)
                }
            })
        }
    }])
}(angular);
!function (c) {
    "use strict";
    c.module("eweiApp.core").service("apiUserGroupsService", ["apiRestfulService", "coreModelService", "coreNotifyService", "$rootScope", function (e, s, l, t) {
        this.run = function (i, r, n, e, t, a) {
            var o = {pageSize: t._count, pageNumber: n};
            if (t._asc) {
                o.orderBy = t._asc + " ASC"
            } else if (t._desc) {
                o.orderBy = t._desc + " DESC"
            }
            org.ewei.sdk.OpenUserGroupApi().listUserGroupByFields({
                page: o,
                fields: t._fields,
                key: t.searchKey
            }).then(function (e) {
                if (e.list && e.list.length > 0) {
                    var t = [];
                    c.forEach(e.list, function (e) {
                        s.detail.customerGroups.put(e.id, e);
                        t.push(e.id)
                    });
                    s.list.userGroups.get(i).put(n, t)
                }
                s.list.userGroups.get(i).total(e.recordCount);
                l.doNotify(r);
                if (typeof a === "function") {
                    a(e)
                }
            })
        }
    }])
}(angular);
!function (u) {
    "use strict";
    u.module("eweiApp.core").service("apiDashboardService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (s, l, c) {
        this.run = function (e, i, r, t, n, a) {
            var o = {url: "/api/v1/dashboard/list_by_user_id.json", urlParam: t, dataParam: n};
            s.run(o).get(o.dataParam, function (e) {
                if (u.isDefined(e.result) && e.status == 0) {
                    var t = [];
                    u.forEach(e.result, function (e) {
                        t[e.orderNo - 1] = e
                    });
                    l.list.dashboard.put(r, t);
                    l.list.dashboard.total(e.result.length);
                    c.doNotify(i, e.result.length)
                }
                if (typeof a === "function") {
                    a(e)
                }
            })
        }
    }])
}(angular);
!function (f) {
    "use strict";
    f.module("eweiApp.core").service("apiEngineerOnlineService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (c, u, d) {
        this.run = function (e, n, t, i, r, a) {
            var o = f.copy(r._count);
            var s = f.copy(r);
            s._count = 99999;
            s._page = 1;
            var l = {url: "api/v1/engineers/online_status.json", urlParam: i, dataParam: s};
            void 0;
            if (t >= 1) {
                c.run(l).get(l.dataParam, function (e) {
                    if (0 == e.status && f.isDefined(e.result.engineers)) {
                        void 0;
                        var t = e.result.engineers;
                        if (s._desc === "id") {
                            t = p(e.result.engineers)
                        }
                        var i = [];
                        void 0;
                        f.forEach(t, function (e) {
                            if ("DEFAULT_SERVICE_DESK_NAME" == e.defaultServiceDesk.name) {
                                e.defaultServiceDesk.name = "默认服务台"
                            }
                            if (f.isUndefined(e.concurrentChatNumber)) {
                                e.concurrentChatNumber = 6
                            }
                            u.detail.engineers.put(e.id, e);
                            i.push(e.id)
                        });
                        for (var r = 0; r < Math.ceil(e.result._total / o); r++) {
                            if (r * o <= e.result._total) {
                                u.list.engineers.online.put(r + 1, i.slice(r * o, (r + 1) * o))
                            }
                        }
                        u.list.engineers.online.total(e.result._total);
                        d.doNotify(n)
                    }
                    if (typeof a === "function") {
                        a(e)
                    }
                })
            } else {
                d.doNotify(n);
                if (typeof a === "function") {
                    a(true)
                }
            }
        };
        var p = function (e) {
            var t = [];
            var i = [];
            f.forEach(e, function (e) {
                if (e.webOnline || e.iosOnline || e.androidOnline) {
                    t.push(e)
                } else {
                    i.push(e)
                }
            });
            t.sort(function (e, t) {
                return (e.user.lastLoginAt === null) - (t.user.lastLoginAt === null) || -(e.user.lastLoginAt > t.user.lastLoginAt) || +(e.user.lastLoginAt < t.user.lastLoginAt)
            });
            i.sort(function (e, t) {
                return (e.user.lastLoginAt === null) - (t.user.lastLoginAt === null) || -(e.user.lastLoginAt > t.user.lastLoginAt) || +(e.user.lastLoginAt < t.user.lastLoginAt)
            });
            void 0;
            return t.concat(i)
        }
    }])
}(angular);
!function (u) {
    "use strict";
    u.module("eweiApp.core").service("apiRecommondQuestionsService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (s, l, c) {
        this.run = function (e, i, r, t, n, a) {
            var o = {url: "/api/v1/dashborad_community_dynamics.json", urlParam: t, dataParam: n};
            s.run(o).get(o.dataParam, function (e) {
                if (u.isDefined(e.result)) {
                    var t = [];
                    u.forEach(e.result.recommondQuestions, function (e) {
                        l.detail.recommondQuestions.put(e.id, e);
                        t.push(e.id)
                    });
                    l.list.recommondQuestions.put(r, t);
                    l.list.recommondQuestions.total(e.result.length);
                    c.doNotify(i)
                }
                if (typeof a === "function") {
                    a(e)
                }
            })
        }
    }])
}(angular);
!function (e) {
    "use strict";
    e.module("eweiApp.core").service("apiSetTicketSubscriptionService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (o, s, l) {
        this.run = function (t, i, r, e, n) {
            var a = {
                url: t ? "api/v1/tickets/:ticket_id/cancel_subscription.json?" : "api/v1/tickets/:ticket_id/add_subscription.json?",
                urlParam: r,
                dataParam: e
            };
            o.run(a).put(function (e) {
                if (0 == e.status) {
                    s.detail.tickets.set(r.ticket_id, "isTarget", !t);
                    l.doNotify(i, {id: r.ticket_id})
                }
                if (typeof n === "function") {
                    n(e)
                }
            })
        }
    }])
}(angular);
!function (u) {
    "use strict";
    u.module("eweiApp.core").service("apiTicketService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (s, l, c) {
        this.run = function (i, r, n, e, t, a) {
            var o = {url: "api/v1/view/tickets.json", urlParam: e, dataParam: t};
            s.run(o).get(o.dataParam, function (e) {
                if (0 == e.status && u.isDefined(e.result.tickets)) {
                    var t = [];
                    u.forEach(e.result.tickets, function (e) {
                        e.isTarget = false;
                        l.detail.tickets.put(e.id, e);
                        t.push(e.id)
                    });
                    l.list.tickets.get(i).put(n, t);
                    l.list.tickets.get(i).total(e.result._total);
                    c.doNotify(r)
                }
                if (typeof a === "function") {
                    a(e)
                }
            })
        }
    }])
}(angular);
!function (u) {
    "use strict";
    u.module("eweiApp.core").service("apiTicketStatusColorService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (s, l, c) {
        this.run = function (e, t, r, i, n, a) {
            var o = {url: "api/v1/tickets/sla_status.json", urlParam: i, dataParam: n};
            s.run(o).get(o.dataParam, function (e) {
                if (u.isDefined(e.result)) {
                    var i = [];
                    u.forEach(e.result, function (e, t) {
                        l.detail.statuscolors.put(t, e);
                        i.push(t)
                    });
                    l.list.statuscolors.put(r, i);
                    l.list.statuscolors.total(i.length);
                    c.doNotify(t)
                }
                if (typeof a === "function") {
                    a(e)
                }
            })
        }
    }])
}(angular);
!function (u) {
    "use strict";
    u.module("eweiApp.core").service("apiTicketSubscriptionsService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (s, l, c) {
        this.run = function (e, t, i, r, n, a) {
            var o = {url: "api/v1/tickets/subscriptions.json", urlParam: r, dataParam: n};
            s.run(o).get(o.dataParam, function (e) {
                if (u.isDefined(e.result)) {
                    u.forEach(e.result, function (e) {
                        l.detail.tickets.set(e.ticketId, "isTarget", true);
                        c.doNotify(t, {id: e.ticketId})
                    })
                }
                if (typeof a === "function") {
                    a(e)
                }
            })
        }
    }])
}(angular);
!function (d) {
    "use strict";
    d.module("eweiApp.core").service("apiMessageService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (l, c, u) {
        this.run = function (e, i, r, t, n, a) {
            var o = "";
            var s = {};
            if ("count" == e) {
                o = "api/v1/notify/count.json";
                s = {url: o, urlParam: t, dataParam: n};
                l.run(s).get(s.dataParam, function (e) {
                    if (e.status == 0) {
                        u.doNotify(i, {count: e.result.id})
                    }
                    if (typeof a === "function") {
                        a(e)
                    }
                }, a || d.noop)
            } else {
                s.page = {pageSize: n._count, pageNumber: n._page};
                s.userId = t.userId;
                org.ewei.sdk.OpenNotifyLogApi().listAllByUserId(s).then({
                    success: function (e) {
                        void 0;
                        if (e) {
                            var t = [];
                            d.forEach(e.list, function (e) {
                                c.detail.messages.put(e.id, e);
                                t.push(e.id)
                            });
                            c.list.messages.put(r || 1, t);
                            c.list.messages.total(e.recordCount);
                            u.doNotify(i, {_total: e.recordCount});
                            if (typeof a === "function") {
                                a(e)
                            }
                        }
                    }
                })
            }
        }
    }])
}(angular);
!function (u) {
    "use strict";
    u.module("eweiApp.core").service("apiNotifySettingService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (l, e, c) {
        this.run = function (t, i, e, r, n) {
            var a = "user_notice_config.json";
            var o = {url: a, urlParam: e, dataParam: r};
            var s = t === "update" ? l.run(o).post : l.run(o).get;
            s(o.dataParam, function (e) {
                if ("update" == t) {
                    c.doNotify(i, {action: t, success: e.success})
                } else {
                    if (u.isDefined(e.json)) {
                        c.doNotify(i, {action: t, config: e.json})
                    }
                }
                if (typeof n === "function") {
                    n(e)
                }
            }, n || u.noop)
        }
    }])
}(angular);
!function (l) {
    "use strict";
    l.module("eweiApp.core").service("apiNotifyTipService", ["apiRestfulService", "coreNotifyService", function (o, s) {
        this.run = function (t, e, i, r) {
            var n = "api/v1/get_user_binding_info.json";
            var a = {url: n, urlParam: e, dataParam: i};
            o.run(a).get(a.dataParam, function (e) {
                if (l.isDefined(e.result)) {
                    s.doNotify(t, e.result)
                }
                if (typeof r === "function") {
                    r(e)
                }
            }, r || l.noop)
        }
    }])
}(angular);
!function (u) {
    "use strict";
    u.module("eweiApp.core").service("apiSetMessageService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (s, l, c) {
        this.run = function (t, i, e, r, n) {
            var a = {urlParam: e, dataParam: r};
            var o;
            if (t === "clear") {
                a.url = "notify_log_delete_by_user_id.json";
                o = s.run(a).post
            } else if (t === "delete") {
                a.url = "delete_notify_log_by_id.json";
                o = s.run(a).get
            }
            o && o(a.dataParam, function (e) {
                if (t == "clear") {
                    l.list.messages.deleteAll();
                    l.detail.messages.removeAll();
                    c.doNotify(i, {action: t})
                } else if (t == "delete") {
                    l.list.messages.remove([e.id]);
                    l.detail.messages.remove([e.id]);
                    c.doNotify(i, {action: t, id: e.id})
                }
                if (typeof n === "function") {
                    n(e)
                }
            }, n || u.noop)
        }
    }])
}(angular);
!function (u) {
    "use strict";
    u.module("eweiApp.core").service("apiCommunitysService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (s, l, c) {
        this.run = function (e, i, r, t, n, a) {
            var o = {url: "/api/v1/question_dynamic_log.json", urlParam: t, dataParam: n};
            s.run(o).get(o.dataParam, function (e) {
                if (u.isDefined(e.result)) {
                    var t = [];
                    u.forEach(e.result.questionDynamicLogs, function (e) {
                        l.detail.communitys.put(e.id, e);
                        t.push(e.id)
                    });
                    l.list.communitys.news.put(r, t);
                    l.list.communitys.news.total(e.result._total);
                    c.doNotify(i)
                }
                if (typeof a === "function") {
                    a(e)
                }
            })
        }
    }])
}(angular);
!function (d) {
    "use strict";
    d.module("eweiApp.core").service("apiSummaryProviderActivityDataService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (l, c, u) {
        this.run = function (t, i, e, r, n, a, o) {
            var s = {url: "/api/v1/get_provider_activity_data.json", urlParam: r, dataParam: n};
            l.run(s).post(s.dataParam, function (e) {
                if (d.isDefined(e.result)) {
                    c.detail.summary.put(t, e.result);
                    u.doNotify(i, a)
                }
                if (typeof o === "function") {
                    o(e)
                }
            })
        }
    }])
}(angular);
(function (l) {
    "use strict";
    l.module("eweiApp.core").service("apiCustomerGroupService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (e, o, s) {
        this.run = function (i, r, e, t, n) {
            var a = {pageSize: t._count, pageNumber: r};
            org.ewei.sdk.OpenUserGroupApi().listUserGroupByFields({page: a, fields: t._fields}).then(function (e) {
                if (e.list.length > 0) {
                    var t = [];
                    l.forEach(e.list, function (e) {
                        o.detail.customerGroups.put(e.id, e);
                        t.push(e.id)
                    });
                    o.list.customerGroups.put(r, t);
                    o.list.customerGroups.total(e.recordCount);
                    s.doNotify(i)
                }
                if (typeof n === "function") {
                    n(e)
                }
            })
        }
    }])
})(angular);
!function (p) {
    "use strict";
    p.module("eweiApp.core").service("apiSummaryAttachmentSizeService", ["apiRestfulService", "coreModelService", "coreNotifyService", "ConsoleConfig", function (l, c, u, d) {
        this.run = function (t, i, e, r, n, a, o) {
            var s = {url: "/api/v1/attachment_size/" + d.provider.id + ".json", urlParam: r, dataParam: n};
            l.run(s).post(s.dataParam, function (e) {
                if (p.isDefined(e.result) && p.isDefined(e.result.message)) {
                    c.detail.summary.put(t, e.result.message);
                    u.doNotify(i, a)
                }
                if (typeof o === "function") {
                    o(e)
                }
            })
        }
    }])
}(angular);
!function (p) {
    "use strict";
    p.module("eweiApp.core").service("apiSummaryChartService", ["apiRestfulService", "coreModelService", "coreNotifyService", "ConsoleConfig", function (c, u, d, e) {
        this.run = function (t, i, e, r, n, a, o) {
            var s = {
                "工单状态": ["ticket_state_pie_chart.json", "get"],
                "工单数量": ["count_ticket_number.json", "post"],
                "工单处理时长": ["ticket_handle_time_chart.json", "post"],
                "工单响应时长": ["ticket_response_time_chart.json", "post"],
                "解决率": ["ticket_solved_rate_chart.json", "post"],
                "满意度": ["ticket_evaluate_chart.json", "post"],
                "是否评价": ["ticket_is_evaluate_chart.json", "post"],
                "SLA达标率": ["ticket_sla_rate_chart.json", "post"],
                "时间段分布": ["list_distribute/bytimeday.json", "get"],
                "IP地址来源地": ["list_distribute/byip.json", "get"],
                "渠道分布": ["list_distribute/bychannel.json", "get"],
                "溢出率": ["list_distribute/byoverflow.json", "get"],
                "删除率": ["list_distribute/bydeleterate.json", "get"],
                "删除原因": ["list_distribute/bydeletereason.json", "get"],
                "优先级分布": ["list_distribute/bypriority.json", "get"],
                "工单类型分布": ["list_distribute/bytype.json", "get"],
                "服务目录分布": ["list_distribute/byservicecatalog.json", "get"],
                "标签分布": ["list_distribute/bytag.json", "get"],
                "客服接单排行榜": ["list_distribute/byfirstreply.json", "get"],
                "客服关单排行榜": ["list_distribute/byclose.json", "get"],
                "客服团队协作排行榜": ["list_distribute/byparticipate.json", "get"],
                "客服技术支持排行榜": ["list_distribute/bytechsupport.json", "get"],
                "客服社区贡献度排行榜": ["list_distribute/byhelpcenter.json", "get"],
                "客服组接单排行榜": ["list_distribute/bygroupfirstreply.json", "get"],
                "客服组关单排行榜": ["list_distribute/bygroupclose.json", "get"],
                "客服组团队协作排行榜": ["list_distribute/bygroupparticipate.json", "get"],
                "客服组技术支持排行榜": ["list_distribute/bygrouptechsupport.json", "get"],
                "客服组社区贡献度排行榜": ["list_distribute/bygrouphelpcenter.json", "get"],
                "客户数量": ["customer_analyse/incremental_bymonth.json", "get"],
                "客户活跃度": ["customer_analyse/helpcenter_bymonth.json", "get"],
                "客户类型占比": ["customer_analyse/byusergroup.json", "get"],
                "企业客户规模分布": ["customer_analyse/byusergroupscale.json", "get"],
                "客户服务请求排行榜": ["customer_analyse/request_count_bycustomer.json", "get"],
                "客户社区活动排行榜": ["customer_analyse/helpcenter_bycustomer.json", "get"],
                "客户好评排行榜": ["customer_analyse/good_count_bycustomer.json", "get"],
                "客户差评排行榜": ["customer_analyse/poor_count_bycustomer.json", "get"],
                "客户组服务请求排行榜": ["customer_analyse/request_count_byusergroup.json", "get"],
                "客户组社区活动排行榜": ["customer_analyse/helpcenter_byusergroup.json", "get"],
                "客户组好评排行榜": ["customer_analyse/good_count_byusergroup.json", "get"],
                "客户组差评排行榜": ["customer_analyse/poor_count_byusergroup.json", "get"],
                "积分排行榜": ["customer_analyse/customer_integral.json", "get"]
            };
            var l = {url: "/api/" + s[a.type][0], urlParam: r, dataParam: n};
            c.run(l)[s[a.type][1]](l.dataParam, function (e) {
                if (p.isDefined(e.result)) {
                    u.detail.summary.put(t, e);
                    d.doNotify(i, a)
                }
                if (typeof o === "function") {
                    o(e)
                }
            })
        }
    }])
}(angular);
(function (u) {
    "use strict";
    u.module("eweiApp.core").service("apiServiceDeskService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (s, l, c) {
        this.run = function (i, r, e, t, n) {
            var a = "/service_desk.json";
            var o = {url: a, urlParam: e, dataParam: t};
            s.run(o).get(o.dataParam, function (e) {
                if (u.isDefined(e) && u.isDefined(e.serviceDesks)) {
                    var t = [];
                    u.forEach(e.serviceDesks, function (e) {
                        l.detail.servicedesks.put(e.id, e);
                        t.push(e.id)
                    });
                    l.list.servicedesks.put(r, t);
                    l.list.servicedesks.total(e._total || e.serviceDesks.length);
                    c.doNotify(i)
                }
                if (typeof n === "function") {
                    n(e)
                }
            })
        }
    }])
})(angular);
(function (e) {
    "use strict";
    e.module("eweiApp.core").service("apiSetServiceDeskService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (l, c, u) {
        this.run = function (t, i, e, r, n) {
            var a = "api/service_desk/get/:id.json";
            var o = {url: a, urlParam: e, dataParam: r};
            var s;
            if (t === "edit") {
                o.url = "api/service_desk/:id.json";
                s = l.run(o).put
            } else if (t === "delete") {
                o.url = "api/service_desk/:id.json";
                s = l.run(o)["delete"]
            } else {
                s = l.run(o)["get"]
            }
            s && s(o.dataParam, function (e) {
                if (t == "edit") {
                    c.detail.servicedesks.remove(e.id);
                    u.doNotify(i, {action: t, id: e.result.id, success: e.status == 0})
                } else if (t == "delete") {
                    if (!e.result) {
                        e.result = {id: r.id}
                    }
                    if (e.result && e.result.message === "servicedesk_has_ralation") {
                    } else {
                        c.list.servicedesks.remove([e.result.id]);
                        c.detail.servicedesks.remove([e.result.id]);
                        u.doNotify(i, {action: t, id: e.result.id})
                    }
                } else {
                    c.detail.servicedesks.remove(e.result.id);
                    c.detail.servicedesks.put(e.result.id, e.result);
                    u.doNotify(i, {action: t})
                }
                if (typeof n === "function") {
                    n(e)
                }
            })
        }
    }])
})(angular);
(function (e) {
    "use strict";
    e.module("eweiApp.core").service("apiEngineersByServiceDeskService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (o, s, l) {
        this.run = function (t, i, e, r) {
            var n = "/api/v1/engineers/defalult_servicedesk_id/" + i.id + ".json";
            var a = {url: n, urlParam: i, dataParam: e};
            o.run(a).get(a.dataParam, function (e) {
                if (e.result) {
                    s.detail.servicedesks.put(i.id, e.result);
                    l.doNotify(t)
                }
                if (typeof r === "function") {
                    r(e)
                }
            })
        }
    }])
})(angular);
(function (u) {
    "use strict";
    u.module("eweiApp.core").service("apiTicketServiceCatalogNameService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (s, l, c) {
        this.run = function (e, t, i, r, n, a) {
            var o = {url: "api/v1/tickets/service_catalog_full_names.json", urlParam: r, dataParam: n};
            s.run(o).get(o.dataParam, function (e) {
                if (u.isDefined(e.result)) {
                    u.forEach(e.result, function (e) {
                        l.detail.tickets.set(e.relatedId, "serviceCatalogNames", e.serviceCatalogNames);
                        c.doNotify(t, {id: e.relatedId})
                    })
                }
                if (typeof a === "function") {
                    a(e)
                }
            })
        }
    }]).service("apiTicketServiceCatalogChildrenService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (i, r, n) {
        this.run = function (t) {
            var e = {url: "api/v1/service_catalogs/tree.json", urlParam: null, dataParam: null};
            i.run(e).get(e.dataParam, function (e) {
                if (u.isDefined(e.result)) {
                    r.detail.serviceCatalogs = e.result.serviceCatalogs;
                    r.detail.forceSave();
                    n.doNotify(t)
                }
            })
        }
    }])
})(angular);
(function (u) {
    "use strict";
    u.module("eweiApp.core").service("apiTicketCopytoService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (s, l, c) {
        this.run = function (e, i, t, r, n, a) {
            var o = {url: "api/v1/tickets/ccs.json", urlParam: r, dataParam: n};
            s.run(o).get(o.dataParam, function (e) {
                if (0 == e.status) {
                    u.forEach(e.result, function (e) {
                        var t = "";
                        u.forEach(e.copyToNames, function (e) {
                            if (null != e) {
                                t += e + " "
                            }
                        });
                        l.detail.tickets.set(e.relatedId, "copyto", t);
                        c.doNotify(i, {id: e.relatedId})
                    })
                }
                if (typeof a === "function") {
                    a(e)
                }
            })
        }
    }])
})(angular);
(function (u) {
    "use strict";
    u.module("eweiApp.core").service("apiTicketTagsService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (s, l, c) {
        this.run = function (e, i, t, r, n, a) {
            var o = {url: "api/v1/tickets/tags.json", urlParam: r, dataParam: n};
            s.run(o).get(o.dataParam, function (e) {
                if (0 == e.status) {
                    u.forEach(e.result, function (e) {
                        var t = "";
                        u.forEach(e.tagNames, function (e) {
                            if (null != e) {
                                t += e + " "
                            }
                        });
                        l.detail.tickets.set(e.relatedId, "tags", t);
                        c.doNotify(i, {id: e.relatedId})
                    })
                }
                if (typeof a === "function") {
                    a(e)
                }
            })
        }
    }])
})(angular);
(function (c) {
    "use strict";
    c.module("eweiApp.core").service("apiInviteEngineerService", e);
    e.$inject = ["apiRestfulService", "coreModelService", "coreNotifyService"];
    function e(s, e, l) {
        this.run = function (e, t, i, r, n) {
            var a = {url: "/api/v1/engineers/invite.json", urlParam: i, dataParam: r};
            var o = "post";
            s.run(a)[o](a.dataParam, function (e) {
                l.doNotify(t, e);
                if (c.isFunction(n)) {
                    n(e)
                }
            })
        }
    }
})(angular);
(function (c) {
    "use strict";
    c.module("eweiApp.core").service("apiConsoleGuideService", e);
    e.$inject = ["apiRestfulService", "coreModelService", "coreNotifyService"];
    function e(s, e, l) {
        this.run = function (e, t, i, r, n) {
            var a = {url: "/api/v1/console_operate_quide.json", urlParam: i, dataParam: r};
            var o = e == "set" ? "post" : "get";
            s.run(a)[o](a.dataParam, function (e) {
                l.doNotify(t, e);
                if (c.isFunction(n)) {
                    n(e)
                }
            })
        }
    }
})(angular);
(function (u) {
    "use strict";
    u.module("eweiApp.core").service("apiCustomerGroupCustomFieldValueService", e);
    e.$inject = ["apiRestfulService", "coreModelService", "coreNotifyService"];
    function e(s, l, c) {
        this.run = function (e, t, i, r, n, a) {
            var o = {url: "api/v1/user_groups/custom_field_value.json", urlParam: r, dataParam: n};
            s.run(o).get(o.dataParam, function (e) {
                if (u.isDefined(e.result)) {
                    u.forEach(e.result, function (e) {
                        l.detail.customerGroups.set(e.userId, e.customFieldId, e.value);
                        c.doNotify(t, {id: e.userId})
                    })
                }
                if (u.isFunction(a)) {
                    a(e)
                }
            })
        }
    }
})(angular);
(function (c) {
    "use strict";
    c.module("eweiApp.core").service("apiCtiViaListService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (e, a, o) {
        this.run = function (t, e, i, r) {
            var n = {url: "api/v1/via_phone/:id.json", urlParam: {id: e}, dataParam: i};
            org.ewei.sdk.OpenChannelConfigApi().listPhoneByProviderId().then(function (e) {
                if (e) {
                    a.detail.ctis.removeAll();
                    c.forEach(e, function (e) {
                        a.detail.ctis.put(e.id, e)
                    });
                    o.doNotify(t)
                }
                if (typeof r === "function") {
                    r(e)
                }
            })
        }
    }]).service("apiCtiViaDetailService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (e, a, o) {
        this.run = function (i, e, t, r) {
            var n = Number(e);
            org.ewei.sdk.OpenChannelApi().getChannelPhone({id: n}).then(function (e) {
                if (e && e.channel && e.config) {
                    var t = a.detail.ctis.get(e.channel.id);
                    if (t) {
                        t.proxyAddress = e.config.proxyAddress;
                        t.proxyPort = e.config.proxyPort;
                        t.saveRecord = e.config.saveRecord;
                        o.doNotify(i, {id: e.channel.id})
                    }
                }
            }, function (e) {
                void 0
            })
        }
    }]).service("apiCtiCallRecordListService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (o, s, l) {
        this.run = function (i, r, e, n, a) {
            var t = {url: "api/v1/phone_call_records/:id.json", urlParam: {id: e}, dataParam: n};
            o.run(t).get(t.dataParam, function (e) {
                if (0 == e.status && c.isDefined(e.result.phoneCallRecords)) {
                    var t = [];
                    s.detail.callrecords.removeAll();
                    c.forEach(e.result.phoneCallRecords, function (e) {
                        s.detail.callrecords.put(e.id, e);
                        t.push(e.id)
                    });
                    s.list.callrecords.put(r, t);
                    s.list.callrecords.countPerPage(n._count);
                    s.list.callrecords.total(e.result._total);
                    l.doNotify(i)
                }
                if (typeof a === "function") {
                    a(e)
                }
            })
        }
    }]).service("apiCtiContactListService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (e, a, o) {
        this.run = function (i, r, e, n) {
            org.ewei.sdk.OpenUserApi().engineerCustomerSimpleList(e).then(function (e) {
                if (c.isDefined(e.list)) {
                    var t = [];
                    c.forEach(e.list, function (e) {
                        a.detail.contacts.put(e.id, e);
                        t.push(e.id)
                    });
                    a.list.contacts.put(r, t);
                    a.list.contacts.total(e.recordCount);
                    o.doNotify(i)
                }
                if (typeof n === "function") {
                    n(e)
                }
            })
        }
    }]).service("apiCtiCallRecordService", ["apiRestfulService", "coreModelService", "coreNotifyService", "$filter", "apiCtiCallRecordListService", function (r, o, e, s, t) {
        this.run = function (e, t, i, n) {
            var a = {url: "api/v1/phone_call_records/:id.json", urlParam: {id: t}, dataParam: i};
            r.run(a).post(a.dataParam, function (e) {
                if (0 == e.status && e.result && e.result.id) {
                    a.dataParam.createdAt = s("date")((new Date).getTime(), "yyyy-MM-dd HH:mm:ss");
                    var t = e.result.id;
                    o.detail.callrecords.put(t, a.dataParam);
                    var i = 1;
                    var r = o.list.callrecords.gets(i);
                    r.unshift(t);
                    if (r.length > o.list.callrecords.countPerPage()) {
                        r.pop()
                    } else {
                        o.list.callrecords.total(o.list.callrecords.total() + 1)
                    }
                    o.list.callrecords.put(i, r)
                }
                if (typeof n === "function") {
                    n(e)
                }
            })
        }
    }]).service("apiCtiUpdateCallRecordService", ["apiRestfulService", "coreModelService", "coreNotifyService", "$filter", function (t, o, s, e) {
        this.run = function (i, r, n, a) {
            var e = {url: "api/v1/phone_call_records/:id.json", urlParam: {id: r}, dataParam: n};
            t.run(e).put(e.dataParam, function (e) {
                if (0 == e.status) {
                    var t = o.detail.callrecords.get(r);
                    t.talkSeconds = n.talkSeconds;
                    t.name = n.name;
                    s.doNotify(i, {id: r})
                }
                if (typeof a === "function") {
                    a(e)
                }
            })
        }
    }]).service("apiCtiContactSearchByNameService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (o, s, l) {
        this.run = function (i, r, e, t, n) {
            var a = {url: "api/v1/users/engineer_customer_simple.json", urlParam: {id: e}, dataParam: t};
            o.run(a).get(a.dataParam, function (e) {
                if (0 == e.status && c.isDefined(e.result.users)) {
                    var t = [];
                    c.forEach(e.result.users, function (e) {
                        s.detail.contacts.put(e.id, e);
                        t.push(e.id)
                    });
                    s.list.contacts.put(r, t);
                    s.list.contacts.total(e._total);
                    l.doNotify(i)
                }
                if (typeof n === "function") {
                    n(e)
                }
            })
        }
    }]).service("apiCtiUserByPhoneService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (o, s, l) {
        this.run = function (i, r, e, t, n) {
            var a = {url: "api/v1/users/by_phone.json", urlParam: {id: e}, dataParam: t};
            o.run(a).get(a.dataParam, function (e) {
                if (0 == e.status && c.isDefined(e.result.users)) {
                    var t = [];
                    c.forEach(e.result.users, function (e) {
                        s.detail.contacts.put(e.id, e);
                        t.push(e.id)
                    });
                    s.list.contacts.put(r, t);
                    s.list.contacts.total(e._total);
                    l.doNotify(i)
                }
                if (typeof n === "function") {
                    n(e)
                }
            })
        }
    }]).service("apiCtiChatStateService", ["apiRestfulService", function (i) {
        var r = {
            connected: function (e) {
                var t = {url: "api/v1/phone_chat_connected/:id.json", urlParam: e, dataParam: {}};
                i.run(t).put(t.dataParam, function (e) {
                })
            }, disconnected: function (e) {
                var t = {url: "api/v1/phone_chat_hang_up/:id.json", urlParam: e, dataParam: {}};
                i.run(t).put(t.dataParam, function (e) {
                })
            }
        };
        this.run = function (e, t) {
            if (t) {
                r[e]({id: t})
            }
        }
    }]).service("responsePhoneChatInviteService", ["restfulService", function (r) {
        this.run = function (e, t) {
            var i = {url: "response_phone_chat_invite/:id.json", urlParam: {id: e}, dataParam: t};
            r.run(i).get(i.dataParam, function (e) {
                if (0 == e.status) {
                }
            })
        }
    }]).service("sipTempGetService", ["apiRestfulService", function (n) {
        this.run = function (e, t, i) {
            var r = {url: "api/v1/sip_temp_get.json", urlParam: {id: e}, dataParam: t};
            n.run(r).post(r.dataParam, function (e) {
                if (0 == e.status) {
                    void 0;
                    if (typeof i === "function") {
                        i(e)
                    }
                }
            })
        }
    }]).service("sipTempPutService", ["apiRestfulService", function (r) {
        this.run = function (e, t) {
            var i = {url: "api/v1/sip_temp_put.json", urlParam: {id: e}, dataParam: t};
            r.run(i).post(i.dataParam, function (e) {
                if (0 == e.status) {
                    void 0
                }
            })
        }
    }]).service("getNetworkTimeService", ["apiRestfulService", function (i) {
        this.run = function (t) {
            var e = {url: "api/v1/get_website_date_time_by_taobao.json", urlParam: {id: ""}, dataParam: {}};
            i.run(e).get(e.dataParam, function (e) {
                if (0 == e.status) {
                    if (typeof t === "function") {
                        void 0;
                        t(e.result.dateTime)
                    }
                }
            })
        }
    }])
})(angular);
(function (u) {
    "use strict";
    u.module("eweiApp.core").service("apiServicePhoneServiceDeskService", e);
    e.$inject = ["apiRestfulService", "coreModelService", "coreNotifyService"];
    function e(s, l, c) {
        this.run = function (i, r, e, t, n) {
            var a = "api/v1/service_desks.json";
            var o = {url: a, urlParam: e, dataParam: t};
            s.run(o).get(o.dataParam, function (e) {
                if (u.isDefined(e.result) && u.isDefined(e.result.serviceDesks)) {
                    var t = [];
                    u.forEach(e.result.serviceDesks, function (e) {
                        l.detail.servicedesks.put(e.id, e);
                        t.push(e.id)
                    });
                    l.list.phoneServicedesks.put(r, t);
                    l.list.phoneServicedesks.total(e.result._total);
                    c.doNotify(i)
                }
                if (u.isFunction(n)) {
                    n(e)
                }
            })
        }
    }
})(angular);
(function (l) {
    "use strict";
    l.module("eweiApp.core").service("apiTelephoneChannelsService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (a, o, s) {
        this.run = function (t, e, i, r) {
            var n = {url: "api/v1/via_phone/" + e + ".json", urlParam: e, dataParam: i};
            a.run(n).get(n.dataParam, function (e) {
                if (0 == e.status && l.isDefined(e.result)) {
                    o.detail.ctis.remove(e.result.id);
                    o.detail.ctis.put(e.result.id, e.result);
                    s.doNotify(t)
                }
                if (typeof r === "function") {
                    r(e)
                }
            })
        }
    }])
})(angular);
(function (u) {
    "use strict";
    u.module("eweiApp.core").service("apiSipOnlineService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (s, l, c) {
        this.run = function (i, r, e, t, n) {
            var a = "api/v1/engineers/sip_online.json";
            var o = {url: a, urlParam: e, dataParam: t};
            s.run(o).get(o.dataParam, function (e) {
                if (u.isDefined(e.result)) {
                    var t = [];
                    u.forEach(e.result.engineerInfo, function (e) {
                        l.detail.siponline.put(e.id, e);
                        t.push(e.id)
                    });
                    l.list.siponline.put(r || 1, t);
                    l.list.siponline.total(e.result._total);
                    c.doNotify(i, {_total: e.result._total})
                }
                if (u.isFunction(n)) {
                    n(e)
                }
            })
        }
    }])
})(angular);
(function (e) {
    "use strict";
    e.module("eweiApp.remoteControlWidget").service("apiCheckCodeService", ["apiRestfulService", function (a) {
        this.run = function (e, t, i, r) {
            var n = {url: "/api/v1/send_remote_help.json", urlParam: e, dataParam: t};
            a.run(n).post(n.dataParam, function (e) {
                if (typeof i === "function") {
                    i(e)
                }
            }, function () {
                if (typeof r === "function") {
                    r()
                }
            })
        }
    }])
})(angular);
!function (u) {
    "use strict";
    u.module("eweiApp.core").service("apiProjectClassifyListService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (s, l, c) {
        this.run = function (e, i, r, t, n, a) {
            void 0;
            var o = {url: "/api/v1/project_categories/list.json", urlParam: t, dataParam: n};
            s.run(o).get(o.dataParam, function (e) {
                if (u.isDefined(e.result)) {
                    void 0;
                    var t = [];
                    u.forEach(e.result, function (e) {
                        l.detail.projectClassifyList.put(e.id, e);
                        t.push(e.id)
                    });
                    void 0;
                    l.list.projectClassifyList.put(r, t);
                    l.list.projectClassifyList.total(e.result._total);
                    c.doNotify(i)
                }
                if (typeof a === "function") {
                    a(e)
                }
            })
        }
    }])
}(angular);
!function (c) {
    "use strict";
    c.module("eweiApp.core").service("apiPhaseListByCategoryService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (o, s, l) {
        this.run = function (i, r, e, t, n) {
            var a = {url: "/api/v1/project_categories/" + i + ".json", urlParam: e, dataParam: t};
            o.run(a).get(a.dataParam, function (e) {
                if (c.isDefined(e.result) && c.isDefined(e.result.projectPhases)) {
                    var t = [];
                    c.forEach(e.result.projectPhases, function (e) {
                        s.detail.phases.put(e.id, e);
                        t.push(e.id)
                    });
                    s.list.phaseByCategory.put(i, t);
                    s.list.phaseByCategory.total(e.result.projectPhases.length);
                    l.doNotify(r, {catId: i})
                }
                if (typeof n === "function") {
                    n(e)
                }
            }, function (e) {
                n(e)
            })
        }
    }])
}(angular);
!function (c) {
    "use strict";
    c.module("eweiApp.core").service("apiProjectListByPhaseService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (o, s, l) {
        this.run = function (i, r, e, t, n) {
            var a = {url: "api/v1/phases/" + i + "/projects/list", urlParam: e, dataParam: t};
            o.run(a).get(a.dataParam, function (e) {
                if (e.status == 0 && c.isDefined(e.result) && e.result) {
                    var t = [];
                    c.forEach(e.result, function (e) {
                        s.detail.projects.put(e.id, e);
                        t.push(e.id)
                    });
                    s.list.projectByPhase.put(i, t);
                    s.list.projectByPhase.total(e.result.length);
                    l.doNotify(r, {phaseId: i})
                }
                if (typeof n === "function") {
                    n(e)
                }
            }, function (e) {
                n(e)
            })
        };
        this.remove = function (e, t) {
            var i = s.list.projectByPhase.gets(e);
            for (var r = 0; r < i.length; r++) {
                if (i[r] == t) {
                    i.splice(r, 1);
                    break
                }
            }
            s.list.projectByPhase.total(i.length)
        };
        this.add = function (e, t) {
            var i = s.list.projectByPhase.gets(e);
            i.push(t);
            s.list.projectByPhase.total(i.length)
        }
    }])
}(angular);
!function (p) {
    "use strict";
    p.module("eweiApp.core").service("apiProjectRelatedWorkOrderService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (l, c, u) {
        this.run = function (e, t, i, r, n, a, o) {
            var s = {url: "api/v1/projects/tickets.json", urlParam: r, dataParam: n};
            l.run(s).get(s.dataParam, function (i) {
                if (i.status == 0 && p.isDefined(i.result.tickets)) {
                    var r = [];
                    if (!a && a.length <= 0) {
                        p.forEach(i.result.tickets, function (e) {
                            c.detail.projectRelatedWorkOrder.put(e.id, e);
                            r.push(e.id)
                        })
                    } else {
                        p.forEach(d(a), function (t) {
                            if (i.result.tickets.length > 0) {
                                var e = _.find(i.result.tickets, function (e) {
                                    return e.id == t.id
                                });
                                if (!e) {
                                    e = {
                                        id: parseInt(t.id),
                                        no: parseInt(t.no),
                                        subject: "工单已删除",
                                        status: "deleted",
                                        thoroughstatus: "deleted",
                                        deleted: true
                                    }
                                }
                                c.detail.projectRelatedWorkOrder.put(parseInt(e.id), e);
                                r.push(parseInt(e.id))
                            } else if (t.id && t.id !== "") {
                                c.detail.projectRelatedWorkOrder.put(parseInt(t.id), {
                                    id: parseInt(t.id),
                                    no: parseInt(t.no),
                                    subject: "工单已删除",
                                    status: "deleted",
                                    thoroughstatus: "deleted",
                                    deleted: true
                                });
                                r.push(parseInt(t.id))
                            }
                        })
                    }
                    c.list.projectRelatedWorkOrder.put(e, r);
                    c.list.projectRelatedWorkOrder.total(i.result.tickets.length);
                    u.doNotify(t)
                }
                if (typeof o === "function") {
                    o(i)
                }
            }, function (e) {
                o(e)
            })
        };
        function d(e) {
            var i = [];
            p.forEach(e, function (t) {
                var e = _.find(i, function (e) {
                    return e.id == t.id
                });
                if (!e) {
                    i.push(t)
                }
            });
            return i
        }

        this.remove = function (e, t) {
            var i = c.list.projectRelatedWorkOrder.gets(page);
            for (var r = 0; r < i.length; r++) {
                if (i[r] == t) {
                    i.splice(r, 1);
                    break
                }
            }
            c.list.projectRelatedWorkOrder.total(i.length)
        };
        this.add = function (e, t) {
            var i = c.list.projectDetail.gets(page);
            i.push(t);
            c.list.projectRelatedWorkOrder.total(i.length)
        }
    }])
}(angular);
!function (a) {
    "use strict";
    a.module("eweiApp.core").service("apiBindEmailService", ["apiRestfulService", function (n) {
        this.run = function (e, t, i) {
            var r = {url: "/api/v1/binding_email.json", urlParam: e, dataParam: t};
            n.run(r).post(r.dataParam, function (e) {
                if (a.isDefined(e.result)) {
                }
                if (typeof i === "function") {
                    i(e)
                }
            })
        }
    }])
}(angular);
!function (a) {
    "use strict";
    a.module("eweiApp.core").service("apiGetEmailCoderService", ["apiRestfulService", function (n) {
        this.run = function (e, t, i) {
            var r = {url: "/api/v1/send_binding_user_email_email.json", urlParam: e, dataParam: t};
            n.run(r).post(r.dataParam, function (e) {
                if (a.isDefined(e.result)) {
                }
                if (typeof i === "function") {
                    i(e)
                }
            })
        }
    }])
}(angular);
!function (u) {
    "use strict";
    u.module("eweiApp.core").service("apiMyActivityService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (s, l, c) {
        var a = {
            question_i_answer: "countMyAnswerQuestions",
            question_i_subscription: "countMySubscriptionQuestions",
            question_i_comment: "countMyCommentQuestions",
            question_mine: "countMyQuestions",
            article_mine: "countMyArticles"
        };
        this.run = function (i, r, n, e, t, a) {
            var o = {url: "api/v1/" + i + ".json", urlParam: e, dataParam: t};
            s.run(o).get(o.dataParam, function (e) {
                if (e.status == 0 && u.isDefined(e.result)) {
                    var t = [];
                    u.forEach(e.result.questions, function (e) {
                        l.detail.myActivity[i].put(e.id, e);
                        t.push(e.id)
                    });
                    l.list.myActivity[i].put(n, t);
                    l.list.myActivity[i].total(e.result._total);
                    c.doNotify(r)
                }
                if (typeof a === "function") {
                    a(e)
                }
            })
        };
        this.getCount = function (i, e, t, r) {
            var n = {url: "api/v1/my_activity/count.json", urlParam: e, dataParam: t};
            s.run(n).get(n.dataParam, function (e) {
                if (e.status == 0 && u.isDefined(e.result)) {
                    for (var t in a) {
                        if (e.result.hasOwnProperty(a[t])) {
                            l.list.myActivity[t].total(e.result[a[t]])
                        }
                    }
                    c.doNotify(i)
                }
                if (typeof r === "function") {
                    r(e)
                }
            })
        }
    }])
}(angular);
!function (u) {
    "use strict";
    u.module("eweiApp.core").service("apiMyTicketsService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (s, l, c) {
        var a = {
            all: "myTicketsAll",
            openOrNew: "myTicketsOpenOrNew",
            solved: "myTicketsSolved",
            pending: "myTicketsPending",
            closed: "myTicketsClosed"
        };
        this.run = function (i, r, n, e, t, a) {
            var o = {url: "api/v1/my_tickets.json", urlParam: e, dataParam: t};
            s.run(o).get(o.dataParam, function (e) {
                if (e.status == 0 && u.isDefined(e.result)) {
                    var t = [];
                    u.forEach(e.result.tickets, function (e) {
                        l.detail.myTickets[i].put(e.id, e);
                        t.push(e.id)
                    });
                    l.list.myTickets[i].put(n, t);
                    l.list.myTickets[i].total(e.result._total);
                    c.doNotify(r)
                }
                if (typeof a === "function") {
                    a(e)
                }
            })
        };
        this.getCount = function (i, e, t, r) {
            var n = {url: "api/v1/my_tickets/count.json", urlParam: e, dataParam: t};
            s.run(n).get(n.dataParam, function (e) {
                if (e.status == 0 && u.isDefined(e.result)) {
                    for (var t in a) {
                        if (e.result.hasOwnProperty(a[t])) {
                            l.list.myTickets[t].total(e.result[a[t]])
                        }
                    }
                    c.doNotify(i)
                }
                if (typeof r === "function") {
                    r(e)
                }
            })
        }
    }])
}(angular);
(function (c) {
    "use strict";
    c.module("eweiApp.core").service("apiLogService", e);
    e.$inject = ["apiRestfulService", "coreModelService", "coreNotifyService"];
    function e(o, s, l) {
        this.getUserLogs = function (i, r, e, t, n) {
            var a = {url: "api/v1/list_user_login_log.json", urlParam: r};
            if (!e) {
                o.run(a).get(null, function (e) {
                    if (0 == e.status && c.isDefined(e.result.userLoginLogs)) {
                        var t = [];
                        c.forEach(e.result.userLoginLogs, function (e) {
                            s.detail.logs.put(e.id, e);
                            t.push(e.id)
                        });
                        s.list.logs.get(i).put(r._page || 1, t);
                        s.list.logs.get(i).total(e.result._total);
                        l.doNotify(l.constant.EVENT_LIST_LOG_REFRESH, i)
                    }
                    if (typeof n === "function") {
                        n(e)
                    }
                })
            }
            if (t) {
                return s.detail.logs.gets(s.list.logs.get(i).getAll())
            } else {
                return s.detail.logs.gets(s.list.logs.get(i).gets(r._page || 1))
            }
        };
        this.getOperationLogs = function (i, r, e, t, n) {
            var a = {url: "api/v1/operation_logs.json", urlParam: r};
            if (!e) {
                o.run(a).get(null, function (e) {
                    if (0 == e.status && c.isDefined(e.result.operationLogs)) {
                        var t = [];
                        c.forEach(e.result.operationLogs, function (e) {
                            s.detail.operationLogs.put(e.id, e);
                            t.push(e.id)
                        });
                        s.list.operationLogs.get(i).put(r._page || 1, t);
                        s.list.operationLogs.get(i).total(e.result._total);
                        l.doNotify(l.constant.EVENT_LIST_LOG_REFRESH, i)
                    }
                    if (typeof n === "function") {
                        n(e)
                    }
                })
            }
            if (t) {
                return s.detail.operationLogs.gets(s.list.operationLogs.get(i).getAll())
            } else {
                return s.detail.operationLogs.gets(s.list.operationLogs.get(i).gets(r._page || 1))
            }
        }
    }
})(angular);
!function (l) {
    "use strict";
    l.module("eweiApp.core").service("apiEngineerAllService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (e, o, s) {
        this.run = function (i, r, n, e, a) {
            org.ewei.sdk.OpenEngineerApi().multiCondition(e).then(function (e) {
                if (l.isDefined(e.list)) {
                    var t = [];
                    l.forEach(e.list, function (e) {
                        if (e.defaultServiceDesk && "DEFAULT_SERVICE_DESK_NAME" == e.defaultServiceDesk.name) {
                            e.defaultServiceDesk.name = "默认服务台"
                        }
                        o.detail.engineers.put(e.id, e);
                        t.push(e.id)
                    });
                    o.list.engineers[i].put(n, t);
                    o.list.engineers[i].total(e.recordCount);
                    s.doNotify(r)
                }
                if (typeof a === "function") {
                    a(e)
                }
            })
        }
    }])
}(angular);
(function (d) {
    "use strict";
    d.module("eweiApp.core").service("apiRoleListService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (l, c, u) {
        this.run = function (i, r, n, e, t, a) {
            var o = "/api/v1/role.json";
            var s = {url: o, urlParam: e, dataParam: t};
            l.run(s).get(s.dataParam, function (e) {
                if (d.isDefined(e.result.roles)) {
                    var t = [];
                    d.forEach(e.result.roles, function (e) {
                        c.detail.roles.put(e.id, e);
                        t.push(e.id)
                    });
                    c.list.roles[i].put(n, t);
                    if (e.result.roles) {
                        c.list.roles[i].total(e.result.roles._total)
                    }
                    u.doNotify(r, i)
                }
                if (typeof a === "function") {
                    a(e)
                }
            })
        }
    }])
})(angular);
(function (d) {
    "use strict";
    d.module("eweiApp.core").service("apiAccessScopeService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (l, c, u) {
        this.run = function (t, i, e, r, n, a) {
            var o = "/api/v1/role/" + r + "/access_scope.json";
            var s = {url: o, urlParam: r, dataParam: n};
            l.run(s).get(s.dataParam, function (e) {
                if (d.isDefined(e.result.accessScopes)) {
                    c.detail.accessScope.put(s.urlParam, e.result.accessScopes);
                    u.doNotify(i, t)
                }
                if (typeof a === "function") {
                    a(e)
                }
            })
        }
    }])
})(angular);
(function (d) {
    "use strict";
    d.module("eweiApp.core").service("apiRoleService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (l, c, u) {
        this.run = function (t, i, e, r, n, a) {
            var o = "/api/role/" + r + ".json";
            var s = {url: o, urlParam: r, dataParam: n};
            l.run(s).get(s.dataParam, function (e) {
                if (d.isDefined(e.result)) {
                    c.detail.roles.put(s.urlParam, e.result);
                    u.doNotify(i, t)
                }
                if (typeof a === "function") {
                    a(e)
                }
            })
        }
    }])
})(angular);
(function (d) {
    "use strict";
    d.module("eweiApp.core").service("apiCustomerDefaultRolesService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (l, c, u) {
        this.run = function (t, i, e, r, n, a) {
            var o = "/api/v1/role.json";
            var s = {url: o, urlParam: r, dataParam: n};
            l.run(s).get(s.dataParam, function (e) {
                if (d.isDefined(e.result.roles)) {
                    c.detail.customerDefaultRoles.put(t, e.result.roles);
                    u.doNotify(i, t)
                }
                if (typeof a === "function") {
                    a(e)
                }
            })
        }
    }])
})(angular);
(function (d) {
    "use strict";
    d.module("eweiApp.core").service("apiPermissionsesService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (l, c, u) {
        this.run = function (t, i, e, r, n, a) {
            var o = "/api/v1/permissions/list_by_role_id/" + r.roleId + ".json";
            var s = {url: o, urlParam: r, dataParam: n};
            l.run(s).get(s.dataParam, function (e) {
                if (d.isDefined(e.result.permission)) {
                    c.detail.permissionses.remove(s.urlParam.roleId);
                    c.detail.permissionses.put(s.urlParam.roleId, e.result.permission);
                    u.doNotify(i, t)
                }
                if (typeof a === "function") {
                    a(e)
                }
            })
        }
    }])
})(angular);
!function (l) {
    "use strict";
    l.module("eweiApp.core").service("apiCustomerViewsService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (a, o, s) {
        this.run = function (i, r, e, n) {
            var t = {url: "api/v1/views_new.json", urlParam: r, dataParam: e};
            a.run(t).get(t.dataParam, function (e) {
                if (e.status == 0 && e.result.views && e.result.views.length > 0) {
                    var t = [];
                    o.detail.customers.views.removeAll();
                    l.forEach(e.result.views, function (e) {
                        o.detail.customers.views.put(e.id, e);
                        t.push(e.id)
                    });
                    o.list.customers.views.put(r._page, t);
                    s.doNotify(i)
                }
                if (typeof n === "function") {
                    n(e)
                }
            })
        }
    }])
}(angular);
!function (c) {
    "use strict";
    c.module("eweiApp.core").service("apiHelpResourcesCatalogAllService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (o, s, l) {
        this.run = function (t, e, i, r) {
            var n = {url: "/api/v1/help_resources_catalog/all.json", urlParam: e, dataParam: i};
            var a = [];
            o.run(n).get(n.dataParam, function (e) {
                if (c.isDefined(e.result.helpResourcesCatologs)) {
                    c.forEach(e.result.helpResourcesCatologs, function (e) {
                        s.detail.helpResourcesCatologs.put(e.id, e);
                        a.push(e.id)
                    });
                    s.list.helpResourcesCatologs.put(1, a);
                    s.list.helpResourcesCatologs.total(e.result._total);
                    l.doNotify(t)
                }
                if (typeof r === "function") {
                    r(e)
                }
            })
        }
    }])
}(angular);
!function (c) {
    "use strict";
    c.module("eweiApp.core").service("apiHelpResourcesAllService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (o, s, l) {
        this.run = function (t, e, i, r) {
            var n = {url: "api/v1/help_resources/all.json", urlParam: e, dataParam: i};
            var a = [];
            o.run(n).get(n.dataParam, function (e) {
                if (c.isDefined(e.result.helpResources)) {
                    c.forEach(e.result.helpResources, function (e) {
                        s.detail.helpResources.put(e.id, e);
                        a.push(e.id)
                    });
                    s.list.helpResources.put(1, a);
                    s.list.helpResources.total(e.result._total);
                    l.doNotify(t)
                }
                if (typeof r === "function") {
                    r(e)
                }
            })
        }
    }])
}(angular);
!function (c) {
    "use strict";
    c.module("eweiApp.core").service("apiQuestionService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (o, s, l) {
        this.run = function (i, r, e, t, n) {
            var a = {url: "api/v1/questions/community.json", urlParam: e, dataParam: t};
            o.run(a).get(a.dataParam, function (e) {
                var t = [];
                if (c.isDefined(e.result.questions)) {
                    c.forEach(e.result.questions, function (e) {
                        s.detail.question.put(e.id, e);
                        t.push(e.id)
                    });
                    s.list.question.put(r, t);
                    s.list.question.total(e.result._total);
                    l.doNotify(i)
                }
                if (typeof n === "function") {
                    n(e)
                }
            })
        }
    }])
}(angular);
!function (c) {
    "use strict";
    c.module("eweiApp.core").service("apiHelpCenterCommunityService", ["apiRestfulService", "coreNotifyService", "coreModelService", "ConsoleConfig", function (o, s, l, e) {
        this.getHelpCenterCatalog = function (e, t, i, r) {
            var n = {url: "/api/v1/topics/list.json", urlParam: t, dataParam: i};
            o.run(n).get(n.dataParam, function (e) {
                if (e.result) {
                    l.detail.helpCenterCatalog = e.result
                }
                if (typeof r === "function") {
                    r(e)
                }
            })
        };
        this.getHelpManageDocument = function (i, r, e, t, n) {
            var a = {url: "/api/v1/questions/community.json", urlParam: e, dataParam: t};
            o.run(a).get(a.dataParam, function (e) {
                if (c.isDefined(e.result)) {
                    var t = [];
                    c.forEach(e.result.questions, function (e) {
                        l.detail.helpManageDocument.put(e.id, e);
                        t.push(e.id)
                    });
                    l.list.helpManageDocument.put(r, t);
                    l.list.helpManageDocument.total(e.result._total);
                    s.doNotify(i)
                }
                if (typeof n === "function") {
                    n(e)
                }
            })
        }
    }])
}(angular);
!function (u) {
    "use strict";
    u.module("eweiApp.core").service("apiServiceReportService", ["apiRestfulService", "coreModelService", "coreNotifyService", "$q", function (s, l, c, e) {
        this.run = function (i, r, e, t, n) {
            var a = "api/v1/service_report/get_templates.json";
            var o = {url: a, urlParam: e, dataParam: t};
            s.run(o).get(o.dataParam, function (e) {
                if (u.isDefined(e.result) && u.isDefined(e.result.templates)) {
                    var t = [];
                    u.forEach(e.result.templates, function (e) {
                        l.detail.templates.put(e.id, e);
                        t.push(e.id)
                    });
                    l.list.templates.put(r, t);
                    l.list.templates.total(e.result._total);
                    c.doNotify(i)
                }
                if (typeof n === "function") {
                    n(e)
                }
            })
        };
        this.search = function (e, t, i, r) {
            var n = e == "userGroup" ? "api/v1/user_groups_new.json" : "api/v1/users.json";
            var a = {url: n, urlParam: t, dataParam: i};
            s.run(a).get(a.dataParam, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        };
        this.deleteTemplete = function (e, t, i, r) {
            var n = {url: "/api/v1/service_report/delete_report_template.json", urlParam: t, dataParam: i};
            s.run(n).delete(n.dataParam, function (e) {
                if (u.isDefined(e.status) && e.status == 0) {
                    l.detail.templates.remove(n.dataParam.reportTemplateId)
                }
                if (typeof r === "function") {
                    r(e)
                }
            })
        };
        var a;
        this.getReportConfig = function (e, t, i, r) {
            var n = {url: "api/v1/service_report/get_report_config.json", urlParam: t, dataParam: i};
            s.run(n).get(n.dataParam, function (e) {
                if (u.isDefined(e.status) && e.status == 0 && u.isDefined(e.result)) {
                    a = e.result.config
                }
                if (typeof r === "function") {
                    r(e)
                }
            })
        };
        this.saveReportConfig = function (e, t, i, r) {
            var n = {url: "api/v1/service_report/save_report_config.json", urlParam: t, dataParam: i};
            s.run(n).post(n.dataParam, function (e) {
                a = null;
                if (typeof r === "function") {
                    r(e)
                }
            })
        };
        this.getDateRange = function () {
            var t = e.defer();
            if (!a) {
                this.getReportConfig(null, "", "", function (e) {
                    t.resolve({beginTime: a.beginTime, endTime: a.endTime})
                })
            } else {
                t.resolve({beginTime: a.beginTime, endTime: a.endTime})
            }
            return t.promise
        }
    }])
}(angular);
(function (e) {
    "use strict";
    e.module("eweiApp.core").service("apiUserIdsByDefaultServiceDeskService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (s, e, l) {
        this.run = function (t, e, i, r, n) {
            var a = "api/v1/engineer/user_ids_by_defalult_servicedesk_id.json";
            var o = {url: a, urlParam: {servicedeskId: i}, dataParam: r};
            s.run(o).get(o.dataParam, function (e) {
                if (e.result) {
                    if (typeof n === "function") {
                        e.id = i;
                        n(e)
                    }
                }
                l.doNotify(t)
            })
        }
    }])
})(angular);
!function (c) {
    "use strict";
    c.module("eweiApp.core").service("apiTicketAttachmentsService", ["apiRestfulService", "coreNotifyService", "coreModelService", function (o, s, l) {
        this.getTicketAttachments = function (i, r, e, t, n) {
            var a = {url: "/api/v1/ticket_comment/" + e.ticketId + "/attachments.json", urlParam: e, dataParam: t};
            o.run(a).get(a.dataParam, function (e) {
                if (c.isDefined(e.result)) {
                    var t = [];
                    c.forEach(e.result, function (e) {
                        if (t.indexOf(e.id) === -1) {
                            l.detail.ticketAttachments.put(e.id, e);
                            t.push(e.id)
                        }
                    });
                    l.list.ticketAttachments.put(r, t);
                    s.doNotify(i)
                }
                if (typeof n === "function") {
                    n(e)
                }
            })
        }
    }])
}(angular);
(function (u) {
    "use strict";
    u.module("eweiApp.core").service("apiTicketTemplateService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (s, l, c) {
        this.getList = function (e, i, r, t, n, a) {
            var o = {url: "api/v1/ticket_template/list.json", urlParam: t, dataParam: n};
            s.run(o).get(o.dataParam, function (e) {
                if (0 == e.status) {
                    var t = [];
                    u.forEach(e.result.tickets, function (e) {
                        l.detail.ticketTemplates.put(e.id, e);
                        t.push(e.id)
                    });
                    l.list.ticketTemplates.put(r, t);
                    l.list.ticketTemplates.total(e.result._total);
                    c.doNotify(i)
                }
                if (typeof a === "function") {
                    a(e)
                }
            })
        }
    }])
})(angular);
(function (u) {
    "use strict";
    u.module("eweiApp.core").service("apiTicketTimeAxisService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (s, l, c) {
        this.run = function (t, e, i, r, n) {
            var a = "/api/v1/tickets/time_axis/" + i.id + ".json";
            var o = {url: a, urlParam: i, dataParam: r};
            s.run(o).get(o.dataParam, function (e) {
                if (u.isDefined(e.result.axisNodes)) {
                    l.detail.ticketTimeLine.put(i.id, e.result.axisNodes);
                    c.doNotify(t)
                }
                if (typeof n === "function") {
                    n(e)
                }
            })
        }
    }])
})(angular);
(function (o) {
    "use strict";
    o.module("eweiApp.core").service("apiListWorkflowsService", ["apiRestfulService", "coreModelService", "coreNotifyService", "alertService", function (e, n, a, t) {
        this.getWorkflowTemplate = function (i, e, r) {
            org.ewei.sdk.OpenActivitiWorkflowTemplateApi().listWorkflowTemplate(e).then({
                success: function (e) {
                    if (o.isDefined(e)) {
                        var t = [];
                        o.forEach(e, function (e) {
                            n.detail.workflows.put(e.id, e);
                            t.push(e.id)
                        });
                        n.list.workflows.put(1, t);
                        n.list.workflows.total(e.length);
                        a.doNotify(i)
                    }
                    if (typeof r === "function") {
                        r(e)
                    }
                }
            })
        }
    }])
})(angular);
(function (n, a) {
    "use strict";
    n.module("eweiApp.core").service("apiTicketSolutionService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (e, r, t) {
        this.run = function (e, i, t) {
            a.sdk.OpenTicketCommentApi().listTicketSolutionBySolutionIds(e).then(function (e) {
                n.forEach(e, function (t) {
                    i.forEach(function (e) {
                        if (t.id === e.sId) {
                            r.detail.cachedTickets.set(e.tId, "solution", t)
                        }
                    })
                });
                if (typeof t === "function") {
                    t(e)
                }
            })
        }
    }])
})(angular, org.ewei);
(function (s) {
    "use strict";
    s.module("eweiApp.core").service("apiAssignRuleService", ["apiRestfulService", "coreModelService", "coreNotifyService", function (e, a, o) {
        this.run = function (t, n) {
            org.ewei.sdk.OpenAssignRuleApi().listAssignRules(n).then(function (e) {
                if (s.isDefined(e.list)) {
                    var i = [];
                    var r;
                    if (n.type === "TYPE_RULE_TICKET") {
                        r = "ticket"
                    } else {
                        r = "chat"
                    }
                    s.forEach(e.list, function (e, t) {
                        a.detail.assginRule[r].put(e.id, e);
                        i.push(e.id)
                    });
                    a.list.assginRule[r].put(1, i);
                    o.doNotify(t)
                }
            })
        }
    }])
})(angular);
!function (l) {
    "use strict";
    l.module("eweiApp.core").service("apiServiceDesksService", ["apiRestfulService", "coreModelService", "coreNotifyService", "$q", function (o, e, t, i) {
        this.serviceDesks = [];
        var s = this;
        this.cacheData = {};
        this.run = function (e, t, i, n) {
            var r = "/api/v1/service_desks/include_engineers.json";
            var a = {url: r, urlParam: t, dataParam: i};
            if (s.serviceDesks.length == 0) {
                o.run(a).get(a.dataParam, function (e) {
                    s.serviceDesks = [];
                    if (e.status == 0 && e.result) {
                        var t = {};
                        e.result.serviceDesks.forEach(function (e) {
                            t[e.name] = e
                        });
                        var i = Object.keys(t).sort(function (e, t) {
                            return e.localeCompare(t, "zh-CN-u-co-pinyin")
                        });
                        var r = [];
                        i.forEach(function (e) {
                            r.push(t[e])
                        });
                        e.result.serviceDesks = r;
                        l.forEach(e.result.serviceDesks, function (e) {
                            if (e && s.selectedservicedesk != null && s.selectedservicedesk.id == e.id) {
                                s.engineers = e.engineers;
                                s.catSelected = true;
                                s.showEngineerList = false;
                                s.showServiceDeskList = true
                            }
                            e && s.serviceDesks.push(e)
                        });
                        if (s.selectedservicedesk == null) {
                            s.showServiceDeskList = true;
                            s.showEngineerList = false
                        }
                    }
                    if (typeof n === "function") {
                        n(s.serviceDesks)
                    }
                })
            } else {
                n(s.serviceDesks)
            }
        };
        this.setCacheData = function (e, t) {
            this.cacheData[e] = l.copy(t)
        };
        this.getCacheData = function (e) {
            return this.cacheData[e] || []
        }
    }])
}(angular);
(function (n, e) {
    "use strict";
    n.module("eweiApp.core").service("apiTicketEvaluateConfigService", ["coreModelService", function (r) {
        this.run = function (i) {
            e.sdk.OpenHelpCenterTicketApi().findTicketEvaluateConfig({}).then(function (e) {
                if (e) {
                    var t = e;
                    t.firstQuestionOptions = JSON.parse(e.firstQuestionOptions);
                    t.secondQuestionOptions = JSON.parse(e.secondQuestionOptions);
                    r.config.evaluate = t
                }
                if (i && n.isFunction(i)) {
                    i(e)
                }
            })
        }
    }])
})(angular, org.ewei);
!function (l) {
    "use strict";
    l.module("eweiApp.core").service("apiCustomTicketViewsService", ["restfulService", "coreNotifyService", "coreModelService", function (a, o, s) {
        this.run = function (i, e, r, n) {
            var t = {url: "list_views.json?type=ticket", urlParam: e, dataParam: r};
            a.run(t).get(t.dataParam, function (e) {
                if (l.isDefined(e.json)) {
                    var t = [];
                    s.detail.custom.ticketViews.removeAll();
                    l.forEach(e.json, function (e) {
                        s.detail.custom.ticketViews.put(e.id, e);
                        t.push(e.id)
                    });
                    s.list.custom.ticketViews.put(r._page, t);
                    s.list.custom.ticketViews.total(e.json.length);
                    o.doNotify(i)
                }
                if (typeof n === "function") {
                    n(e)
                }
            })
        };
        this.enabled = function (e, t) {
            s.detail.custom.ticketViews.set(e, "active", t)
        };
        this.remove = function (e) {
            var t = s.list.custom.ticketViews.gets(1);
            for (var i = 0; i < t.length; i++) {
                if (t[i] == e) {
                    t.splice(i, 1);
                    break
                }
            }
            s.detail.custom.ticketViews.remove(e);
            s.list.custom.ticketViews.total(t.length)
        }
    }])
}(angular);
!function (u) {
    "use strict";
    u.module("eweiApp.core").service("apiEngineerService", ["apiRestfulService", "restfulService", "coreNotifyService", "coreModelService", "ConsoleConfig", function (s, e, l, c, t) {
        this.run = function (t, i, e, r, n, a) {
            var o = {url: "api/v1/engineers/" + t + ".json", urlParam: r, dataParam: n};
            s.run(o).get(o.dataParam, function (e) {
                if (u.isDefined(e.result) && e.status == 0) {
                    c.detail.engineers.remove(t);
                    c.detail.engineers.put(t, e.result);
                    l.doNotify(i, {id: t})
                }
                if (typeof a === "function") {
                    a(e)
                }
            })
        };
        this.getEngineerThirds = function (i, r, e, t, n) {
            var a = {url: "api/v1/users/" + i.userId + "/thirds.json", urlParam: e, dataParam: t};
            s.run(a).get(a.dataParam, function (e) {
                var t = c.detail.engineers.get(i.engineerId);
                if (u.isDefined(e.result) && e.result.userThirds && e.result.userThirds.length > 0) {
                    t.userThirds = e.result.userThirds
                }
                c.detail.engineers.put(i.engineerId, t);
                l.doNotify(r);
                if (typeof n === "function") {
                    n(t)
                }
            })
        }
    }])
}(angular);
!function (l) {
    "use strict";
    l.module("eweiApp.core").service("apiBrandSettingService", ["apiRestfulService", "restfulService", "coreNotifyService", "coreModelService", "ConsoleConfig", function (a, e, o, s, t) {
        this.getHelpCenter = function (e, t, i, r) {
            var n = {url: "/api2/OpenHelpCenterApi.findProviderBrand", urlParam: t, dataParam: i};
            a.run(n).get(n.dataParam, function (e) {
                if (e.result) {
                    s.config.brandSetting.helpCenter = e.result
                }
                if (typeof r === "function") {
                    r(e)
                }
            })
        };
        this.getEmailSetting = function (t, e, i, r) {
            var n = {url: "/api/v1/email_setting.json", urlParam: e, dataParam: i};
            a.run(n).get(n.dataParam, function (e) {
                if (l.isDefined(e.result)) {
                    s.config.brandSetting.emailSetting = e.result.emailSetting
                }
                o.doNotify(t);
                if (typeof r === "function") {
                    r(e)
                }
            })
        };
        this.getProviderSetting = function (t, e, i, r) {
            var n = {url: "/api/v1/provider.json", urlParam: e, dataParam: i};
            a.run(n).get(n.dataParam, function (e) {
                if (l.isDefined(e.result)) {
                    s.config.brandSetting.domainSetting = e.result
                }
                o.doNotify(t);
                if (typeof r === "function") {
                    r(e)
                }
            })
        }
    }])
}(angular);
(function () {
    "use strict";
    var r = console || {
            warn: function () {
            }
        };
    var e = [{
        type: "AttachmentApi",
        methods: ["deleteByContentUrl", "getQiniuUrl", "getQiniuUrlNoAuth", "listAttachMentsByAssetId", "listAttachMentsByAssetIdNoAuth", "listByAssetAttachmentsByKey", "save"]
    }, {
        type: "CallAfterConfigApi",
        methods: ["getCallAfterConfig", "updateCallAfterConfig"]
    }, {
        type: "CallcenterWebApi",
        methods: ["callRecordByUid", "changeUser", "doCallQuality", "engineerSeatList", "findCallQuality", "findQualityConfig", "getEngineerSeatByUserId", "noneCheckVisibleCallRecordByUid", "phoneConnected", "phoneHangup", "phoneMissing", "phoneRejected", "relationTicket", "reportSeatStatus", "saveAttachment", "saveCallRecord", "saveRemark", "updateQualityConfig"]
    }, {
        type: "CallRecordWebApi",
        methods: ["countCallRecord", "listCallRecordByUserId", "listMyCallRecord", "listMyVisibleCallRecord"]
    }, {
        type: "ChatLogApi",
        methods: ["deleteByUid", "listChatLog", "listDeletedChatLogUidsByChatId", "listDeletedChatLogUidsByChatUid", "listPublicChatLog"]
    }, {type: "DingdingLoginApi", methods: ["dingdingLogin"]}, {
        type: "KnowledgeApi",
        methods: ["active", "delete", "deleteBatch", "findAnswerById", "findById", "listByCondition", "save", "update"]
    }, {
        type: "KnowledgeCatalogApi",
        methods: ["deleteByIds", "list", "save", "update", "updateBatch"]
    }, {type: "LongConnectionApi", methods: ["createLongConnection", "removeLongConnection"]}, {
        type: "OpenAccountApi",
        methods: ["batchCheckUserIsOnline", "bindingEmail", "captcha", "checkUserIsOnline", "getOnlineEngineers", "getRegisterCode", "getUserToken", "getUserTokenWithCreateOrUpdateByCustomerData", "getVerifyCode", "login", "logout", "register", "resetPassword", "showCaptcha", "smallAppLoginAndBind", "smallAppScanned", "smallAppScannedAndConfirm", "unbindUserThird", "updateAccount", "updateCustomerAccount", "updateCustomerPassword", "updateOrSaveSmallAppUser", "updatePassWord", "userExits"]
    }, {
        type: "OpenActivitiWorkflowTemplateApi",
        methods: ["addWorkflowTemplate", "deleteById", "disabledById", "enabledById", "getById", "getRootNodeHasChildren", "listPrivateWorkflowTemplate", "listPublicWorkflowTemplate", "listWorkflowTemplate", "ticketCountByActivitiWorkflowTemplateId", "updateWorkflowTemplate"]
    }, {type: "OpenApplePushApi", methods: ["push"]}, {
        type: "OpenArticleApi",
        methods: ["addAnswer", "addAnswerComment", "answerCommentVote", "answersVote", "articleShare", "closeAnswer", "closeAnswerRead", "createArticle", "createQuestion", "deleteAnswerComment", "deleteArticle", "deleteQuestion", "findArticleOrQuestionById", "findTypeByQuestionId", "listAnswersByQuestionId", "listCommentByAnswerId", "listHotQuestion", "listQuestionByTopicid", "listQuestionByTopicId", "listRecommendIndexArticle", "listRelationArticle", "multiCondition", "questionVote", "updateArticle", "updateQuestion"]
    }, {
        type: "OpenAssignRuleApi",
        methods: ["createAssignRule", "deleteAssignRule", "enabledAssignRule", "findAssignRule", "findAssignRuleByUid", "getAddressInfo", "listAssignRules", "listAssignRuleWithServiceDeskId", "listServiceCatalogsByReplyId", "updateAssignRule", "updateAssignRulePosition"]
    }, {
        type: "OpenAttachmentApi",
        methods: ["batchCopyAttachment", "copyAttachment", "deleteAttachment", "saveAttachment"]
    }, {
        type: "OpenAutomationApi",
        methods: ["deactivateById", "deleteAutomation", "executeByIdWithTicket", "getById", "listAutomation", "save", "updateActiveAutomation", "updateAutomation", "updateOrderKey"]
    }, {
        type: "OpenAutomatonApi",
        methods: ["active", "delete", "findById", "findDefaultAutomatonById", "list", "save", "updateAutomaton"]
    }, {
        type: "OpenChannelApi",
        methods: ["deleteChannel", "fullSynchronizationWithDingding", "fullSynchronizationWithQiyeWeixin", "getAppIdAndAppSecret", "getChannelApi", "getChannelBaseInfoByChannelUid", "getChannelCallcenter", "getChannelDingding", "getChannelEmail", "getChannelHelpcenterWebConfig", "getChannelPhone", "getChannelSdkByAppKeyAndSectet", "getChannelSdkConfig", "getChannelWeb", "getChannelWexinConfig", "getChannelYunZhiJia", "getComponentAppIdAndPreAuthcode", "getEweiSmallAppAppId", "getInfoBeforeSaveChannelQiYeWeixin", "getServerIps", "listChannel", "listChatChannel", "listPhoneCallCenter", "listTicketChannel", "modifyDingdingCallbackArgs", "saveChannelApi", "saveChannelCallcenterConfig", "saveChannelDingding", "saveChannelEmail", "saveChannelPhone", "saveChannelPublicWeixin", "saveChannelSdk", "saveChannelWeb", "saveChannelYunZhiJia", "updateChannelApi", "updateChannelCallcenterConfig", "updateChannelEmail", "updateChannelHelpcenterFormOutward", "updateChannelPhone", "updateChannelPublicWeixin", "updateChannelQiYeWeixin", "updateChannelSdk", "updateChannelState", "updateChannelWeb", "updateChannelYunZhiJia"]
    }, {
        type: "OpenChannelConfigApi",
        methods: ["getChannelInfoToSdkByChannelUid", "getChannelWexinMenu", "listPhoneByProviderId", "updateChannelDingdingConfig", "updateChannelDingdingMenu", "updateChannelHelpcenterWebConfig", "updateChannelWebAutoinviteConfig", "updateChannelWebConfig", "updateChannelWexinConfig", "updateChannelWexinMenu", "updateShowWeixinSmallAppQrcode"]
    }, {
        type: "OpenChatApi",
        methods: ["countByEngineerIds", "createDesktopChat", "createPhoneChat", "deleteChats"]
    }, {
        type: "OpenChatConfigApi",
        methods: ["getChatConfig", "getChatConfigNoAuth", "saveOrUpdate", "updateAutoCreateTicket"]
    }, {
        type: "OpenChatEvaluateConfigApi",
        methods: ["findEvaluateConfig", "updateEvaluateConfig"]
    }, {
        type: "OpenChatPerformanceApi",
        methods: ["getChatPerformanceByEngineerId", "listChatByEngineerId", "listEngineerChatPerformance", "workloadEngineerDistribution", "workloadTimeDistribution"]
    }, {
        type: "OpenChatQualityApi",
        methods: ["doChatQuality", "findChatQuality", "findQualityConfig", "listChatQuality", "updateQualityConfig"]
    }, {
        type: "OpenChatReportApi",
        methods: ["chatCountReport", "countByServiceCatalog", "listChatByDate", "listChatByServiceCatalog", "serviceCatalogStatistics"]
    }, {
        type: "OpenChatTriggerApi",
        methods: ["delete", "getById", "listChatTrigger", "save", "update", "updateChatTriggerState", "updateOrderKey"]
    }, {
        type: "OpenConfigApi",
        methods: ["getConfigByEncrypt", "getOemConfig", "getQiniuToken"]
    }, {
        type: "OpenConsoleApi",
        methods: ["consoleConfigData", "findConsoleStyleCustom", "getExternalUrlAuthorize"]
    }, {type: "OpenCustomFieldApi", methods: ["listCustomFields"]}, {
        type: "OpenCustomReportApi",
        methods: ["countEngineersKpi", "countResponseTimeOutTicket", "countSolvedTimeOutTicket", "countTicketByCustomFieldValue", "countTicketByDayAndServiceCatalog", "countTicketByEngineer", "countTicketBySecondStageServiceCatalog", "countTicketByServiceDesk", "countTicketByThirdStageServiceCatalog", "countTicketByUserAndServiceCatalog", "countTicketByUserGroupAndServiceCatalog", "listServiceCatalogLeafNodes"]
    }, {
        type: "OpenCustomWensReportApi",
        methods: ["countArticles", "countEngineers", "countTickets"]
    }, {type: "OpenDocApi", methods: ["apiInterfaces", "apiMethods"]}, {
        type: "OpenEngineerApi",
        methods: ["currEngineerInfoData", "findById", "listEngineerByKey", "listEngineerIdsGroupByServiceDeskId", "listRole", "multiCondition", "sendResetPasswordEmail"]
    }, {type: "OpenFavoriteApi", methods: ["favoritesAppendToProject", "listProjectByKey"]}, {
        type: "OpenFormApi",
        methods: ["deleteForm", "getChatFormCustomFiled", "getFormById", "getFormByUid", "getTicketFormCustomFiled", "listChatForm", "listForm", "listTicketForm", "saveForm", "updateForm", "updateFormState"]
    }, {
        type: "OpenHelpCenterApi",
        methods: ["allHelpcenterDynamicCount", "allHelpcenterDynamicLog", "clearNotifyLogByUserId", "createLongConnection", "deleteAttachment", "deleteNotifyLogById", "disableHelpCenterAnnouncement", "findProviderBrand", "getCurrentUserInfo", "getHelpCenterAnnouncement", "getHelpCenterSetting", "getOemConfig", "getQinniuToken", "getSignInConfig", "getSmallAppQrCode", "getSystemConstant", "getUserIntegralConfig", "getUserIntegralInfo", "getUserNoticeConfig", "haveNotifyLogByUserId", "helpcenterDynamicCount", "helpcenterDynamicLog", "helpcenterResources", "helpcenterResourcesCatalogs", "listNotifyLogByUserId", "listUserBadge", "listUserIntegralLog", "litstHelpcenterResourcesCatalogsAndResources", "releaseHelpCenterAnnouncement", "removeLongConnection", "saveAttachment", "updateOemPhoto", "updateProviderHelpCenterBrand", "updateUserNoticeConfig"]
    }, {
        type: "OpenHelpcenterResourcesApi",
        methods: ["litstHelpcenterResourcesCatalogsAndResources"]
    }, {
        type: "OpenHelpCenterSettingApi",
        methods: ["addHelpcenterResources", "addHelpcenterResourcesCatalog", "addTopic", "deleteHelpcenterResources", "deleteHelpcenterResourcesCatalog", "deleteTopic", "delUserBadgeConfig", "getAccessConfig", "getArticleCounts", "getHelpCenterChatEnable", "getHelpCenterHtml", "getHelpCenterLayOut", "getHelpCenterNavigationMenu", "getTopicById", "getUserBadgeConfig", "getUserIntegralConfig", "helpcenterResourcesCatalogById", "listArticleTopicByParentId", "listByTopicType", "listHelpcenterResourcesCatalog", "listQuestionTopic", "updateAccessConfig", "updateHelpCenterChatEnable", "updateHelpCenterHtml", "updateHelpCenterLayOut", "updateHelpCenterNavigationMenu", "updateHelpcenterResource", "updateHelpcenterResourcesCatalog", "updateHelpcenterResourcesCatalogOrder", "updateHelpcenterResourcesOrder", "updateHelpCenterTicketSubmit", "updateTopic", "updateTopicOrder", "updateUserBadgeConfig", "updateUserIntegralConfig"]
    }, {
        type: "OpenHelpCenterTicketApi",
        methods: ["addHelpTicketToCustomerServiceGroup", "addTicketToArticle", "findAutoCloseTicketHours", "findAutoCloseTicketInfos", "findTicketById", "findTicketByNo", "findTicketCommentListByLastId", "findTicketDescriptionDetailById", "findTicketEvaluateConfig", "getTicketCommentById", "getTokenByTicketAccessCode", "helpCenterTicketSubmitFields", "listChatLogByChatId", "listQrcodeUserByTicketId", "listServiceCatalog", "listTicketComment", "listTicketComments", "listTicketsWithCustomer", "listTicketType", "listWithCustomerIsMyself", "queryTickets", "queryTicketsUserVisible", "serviceCatalogTree", "submitTicket", "submitTicketWithNoFormUid", "submitTicketWithOutForm", "ticketComment", "ticketEvaluate", "ticketRelationArticle", "webformFieldsByFormId"]
    }, {
        type: "OpenHolidayApi",
        methods: ["findByEngineerId", "findByOwner", "findByProvider", "findByUserGroupId", "save", "saveOrUpdate", "update"]
    }, {type: "OpenHuaweiPushApi", methods: ["push"]}, {
        type: "OpenJiguangPushApi",
        methods: ["push"]
    }, {type: "OpenListHeaderSettingApi", methods: ["getByType", "saveOrUpdate"]}, {
        type: "OpenLoggerApi",
        methods: ["list", "save"]
    }, {type: "OpenMailSendApi", methods: ["sendMail"]}, {
        type: "OpenMeizuPushApi",
        methods: ["push"]
    }, {
        type: "OpenNotifyLogApi",
        methods: ["changeReadAt", "cleanNotifyLog", "countUnreadWithTicket", "deleteNotifyLog", "listAllByUserId", "listForAppByUserId", "listForPcByUserId", "listWithTicket"]
    }, {
        type: "OpenOemApi",
        methods: ["getOemConfig", "updateOemConfig", "verifyOemConfig"]
    }, {
        type: "OpenPerformanceApi",
        methods: ["engineerResponseDistributed", "engineerSatisfaction", "listEngineerMass", "listEngineerMassProcessStatistics", "listEngineerMassRecordByEngineerId", "listEngineerMassResponseStatistics", "listEngineerMassSatisfactionStatistics", "listEngineerPerformance", "listEngineerProcessPerformanceStatistics", "listEngineerResponsePerformanceStatistics", "listEngineerWorkloadStatistics", "listPerformanceRecordByEngineerId", "listPerformanceRecordByServiceDeskId", "listServiceDeskMass", "listServiceDeskMassStatistics", "listServiceDeskPerformance", "listServiceDeskPerformanceStatistics", "listServiceDeskWorkload", "listServiceDeskWorkloadStatistics", "serviceDeskResponseDistributed"]
    }, {
        type: "OpenPermissionApi",
        methods: ["listMyPermissionNames", "listPermissionNamesByRoleId"]
    }, {
        type: "OpenProviderApi",
        methods: ["completedProviderInfo", "countProviderVolumeSizeByType", "findByProviderId", "findProviderByAdminUserId", "findProviderIdWithDomain", "providerIndustryList", "providerLicenseCheck", "providerSmsInfo", "updateIsOpenSmsNotify"]
    }, {
        type: "OpenQuestionApi",
        methods: ["listMyAnswerQuestions", "listMyCommentQuestions", "listQuestionsByAuthorId", "listSubscriptionQuestionsByUserId"]
    }, {type: "OpenQuickReplyApi", methods: ["delete", "getById", "list", "save", "update"]}, {
        type: "OpenReportApi",
        methods: ["countChatQuality", "countChatQualityForApp", "countChatRequestDayDistribution", "countChatRequestLocationDistribution", "countChatRequestTimeDistribution", "countChatResponseDistribution", "countChatSlaSolvedDistribution", "countChatVia", "countIncreasingTendency", "countIncreasingTendencyByUserGroupId", "countIncreasingTendencyByUserId", "countTicketByEvaluate", "countTicketByEvaluateForApp", "countTicketByRequester", "countTicketByRequesterForApp", "countTicketByUserGroup", "countTicketByUserGroupForApp", "countTicketNumber", "countTicketQuality", "countTicketQualityForApp", "countTicketRequestDayDistribution", "countTicketRequestDayStatistics", "countTicketRequestLocationDistribution", "countTicketRequestLocationStatistics", "countTicketRequestTimeDistribution", "countTicketRequestTimeStatistics", "countTicketSlaResponseDistribution", "countTicketSlaSolvedDistribution", "countTicketType", "countTicketVia", "engineerChatSatisfaction", "listChats", "listTickets"]
    }, {
        type: "OpenReportFilterCondirionApi",
        methods: ["deleteById", "findById", "list", "save", "setDefault", "update", "updateSelected"]
    }, {type: "OpenRobotApi", methods: ["findRobotById", "updateRobot"]}, {
        type: "OpenRoleApi",
        methods: ["listEngineerRole"]
    }, {type: "OpenServiceCatalogApi", methods: ["listAll"]}, {
        type: "OpenServiceDeskApi",
        methods: ["findServiceDesksById", "listNameByIds", "listNameByKey", "listServiceDesk", "listServiceDesksIncludeEngineers"]
    }, {
        type: "OpenSmsApi",
        methods: ["consumeSms", "getSmsRemainingNum", "list", "sendBindingUserMobilePhoneSms", "sendRegisterUserSms", "sendResetPasswordSMS", "sendSmsForSmsLittle", "sendSmsForSmsShortage"]
    }, {type: "OpenSmsSendLogApi", methods: ["list"]}, {
        type: "OpenSubscriptionApi",
        methods: ["listUserSubscription", "subscribeQuestion", "subscribeTopic", "subscribeUserListByQuestionId"]
    }, {
        type: "OpenTagsApi",
        methods: ["addTag", "deleteTag", "findByTagId", "findByTagName", "listHotTags", "listTags", "listTagsByKey", "updateTag"]
    }, {
        type: "OpenTicketApi",
        methods: ["assignTicketToActivitiWorkflow", "batchDestroy", "countByEngineerIds", "createTicket", "getTicketsByRequesterIdAndStatus", "listByRequesterId", "listHistoricActivitiWorkflowNode", "listIdsWithNoAssigned", "listSubscriptionTicketIds", "listTicketByIds", "listTicketByKey", "listTicketBySubjectOrNo", "merge", "reviewTicketPass", "sendTicketRemoteInviceMail", "ticketNewAssignWithEngineerId", "ticketWorkFlowNodePosition", "ticketWorkFlowSuspend", "ticketWorkFlowToNext", "ticketWorkFlowToPre", "updateTicketRequester"]
    }, {
        type: "OpenTicketAssistApi",
        methods: ["acceptAssist", "rejectAssist", "ticketAssist"]
    }, {
        type: "OpenTicketCommentApi",
        methods: ["listTicketSolutionBySolutionIds", "saveTicketComment", "saveTicketCommentAsSolution", "saveTicketCommentNoAuth"]
    }, {
        type: "OpenTicketEvaluateApi",
        methods: ["findByTicketId", "ticketEvaluate"]
    }, {type: "OpenTicketEvaluateConfigApi", methods: ["updateEvaluateConfig"]}, {
        type: "OpenTicketExportApi",
        methods: ["ticketExportById", "ticketExportClean"]
    }, {type: "OpenTicketLogApi", methods: ["listOperations"]}, {
        type: "OpenTicketPlanApi",
        methods: ["deleted", "getByUid", "list", "runTicketPlanTask", "save", "update", "updateState"]
    }, {
        type: "OpenTicketReportApi",
        methods: ["activitiWorkflowReport", "activitiWorkflowReportDetail", "activitiWorkflowReportNodes", "activitiWorkflowReportTickets", "countByServiceCatalog", "listByPriority", "listByServiceCatalog", "listTicketBySlaAndPriority", "listTicketMetricByPriority", "priorityStatistics", "serviceCatalogStatistics", "slaStatistics", "ticketPriorityStatistics"]
    }, {
        type: "OpenTicketTemplateApi",
        methods: ["findById", "list", "listTicketTemplates"]
    }, {type: "OpenTicketTimeAxisApi", methods: ["listWithTicketId"]}, {
        type: "OpenTicketTriggerApi",
        methods: ["delete", "getTicketTriggerById", "listTicketTrigger", "save", "update", "updateOrderKey", "updateTicketTriggerState"]
    }, {type: "OpenTicketTypeApi", methods: ["list"]}, {
        type: "OpenTokenApi",
        methods: ["authenticationCheck", "authenticationCheckAndSignCheck", "downFile", "manyArgs", "page", "returnArray", "returnChar", "returnMap", "signCheck", "testEnum", "testTimestamp", "testUserList", "tryError", "tryNumber", "tryVoid"]
    }, {
        type: "OpenTopicApi",
        methods: ["createTopic", "deleteTopic", "lastArticleUpdatedAt", "listTopicChildren", "listTopicChildrenWithRecursive", "listTopicParents", "listTops", "updateTopic"]
    }, {
        type: "OpenUserApi",
        methods: ["accessableByUserId", "addRelationUserGroup", "addTagRelation", "engineerCustomerSimpleList", "findById", "getCurrentUser", "getUserInfo", "getUserInfosByCode", "getUserInfosByToken", "listCustomerByUserGroup", "listUserByKey", "listUserThird", "removeRelationUserGroup", "removeTagRelation", "saveUser", "sendSmsCodeForBindUserPhone", "sendSmsCodeForMobilePhoneResetPassword", "updateExternalId", "updateShare", "updateUserBasicInfo", "updateUserCustomField", "updateUserGroup"]
    }, {type: "OpenUserCustomFieldApi", methods: ["getFieldList", "list", "updateUserView"]}, {
        type: "OpenUserGroupApi",
        methods: ["batchUpdateUserGroup", "findByIdAccessable", "listAllUserGroup", "listUserCountByUserGroupIds", "listUserGroup", "listUserGroupByFields", "listUserGroupByKey", "saveUserGroup", "updateUserGroup", "updateUserGroupName"]
    }, {type: "OpenUserOnlineApi", methods: ["listByUserIds", "listUserIsOnline"]}, {
        type: "OpenUserSettingApi",
        methods: ["findUserQrcode", "updateQrcode"]
    }, {type: "OpenViewApi", methods: ["saveOrUpdate"]}, {
        type: "OpenWebChatApi",
        methods: ["acceptAssist", "acceptChat", "acceptRemoteDesk", "addChatTagRelation", "ancelRequestAssist", "assignChat", "backParentChatServiceCatalog", "cancelChatInvite", "cancelRemoteDesk", "chatDetail", "chatInvite", "chats", "chatToTicket", "chatWarning", "closeChat", "closedChatIds", "closedChats", "countChats", "deleteChatTagRelation", "destroyChat", "engineerGroupChatCountList", "forceJoinChat", "getChatById", "getChatNoticeInfo", "getChatParticipant", "groupNoResponseChatCountList", "historyChat", "historyChatByUserIdAndChatId", "joinChat", "lackPlugin", "listChatParticipant", "loadChatTags", "loadChildChatServiceCatalog", "noResponseAssist", "participants", "participatedChats", "refreshWaitingQueue", "rejectAssist", "rejectRemoteDesk", "requestAssist", "requestRemoteDesk", "responseChatInvite", "responseChatWarning", "responsePhoneChatInvite", "sendWebchatMessage", "ticketAssist", "unClosedChatCount", "untreatedChatIds", "untreatedChats", "updateChatSubject", "updateChatUser", "updateCometdClientId", "updateServiceCatalog", "userChats", "visibleChats", "waitingChatQueue", "waitingChats", "webChatConfig", "webChatSearchQuestion"]
    }, {type: "OpenWeekendWorkingApi", methods: ["findByOwner", "saveOrUpdate"]}, {
        type: "OpenWeixinHttpApi",
        methods: ["getSmallAppFormIdWithAvailable", "openWeixinAuthChange", "openWeixinMessage", "reportSmallAppFormId"]
    }, {type: "OpenWorkTimeApi", methods: ["findByOwner", "saveOrUpdate"]}, {
        type: "OpenXiaomiPushApi",
        methods: ["push"]
    }, {type: "OpenXinGePushApi", methods: ["push"]}, {
        type: "OpenYunzhijiaApi",
        methods: ["exchangeUserToken"]
    }, {type: "OperationLogApi", methods: ["listOperationLog", "saveOperationLog"]}, {
        type: "RegistryApi",
        methods: ["lookup"]
    }, {
        type: "TalkApi",
        methods: ["chatDetail", "chatEvaluation", "checkWorkTime", "closeChat", "createChatWithTicketRemotePincode", "findOrSaveUserByFormFields", "getChatEngineer", "matchChatAssignRule", "preChatMessage", "preHandleChatMessage", "refreshWaitingQueue", "sendChatMessage", "sendRobotMessage", "testRobotMessage"]
    }, {type: "UnknownKnowledgeApi", methods: ["delete", "findById", "list"]}];
    var t = function () {
        var i = this;
        i._url = location ? location.pathname : null;
        i._timeout = 25 * 1e3;
        i._transporter = s;
        i._responseHandler = l;
        i._serialization = new a;
        i._deferredFactory = function (e, t) {
            return new o(e, t)
        };
        i._callback = {
            success: function () {
                r.warn("default _sdk._callback success : arguments=" + JSON.stringify(arguments))
            }, fail: function () {
                r.warn("default _sdk._callback fail : arguments=" + JSON.stringify(arguments))
            }
        };
        i.setCallback = function (e) {
            if (!!!e || !!!e.success || !!!e.fail || typeof e.success != "function" || typeof e.fail != "function") {
                throw"sdk.setCallback must input a object like {success:function, fail:function}"
            }
            i._callback = e
        };
        i.setTransporter = function (e) {
            if (typeof e != "function") {
                throw"sdk.setTransporter must input a function"
            }
            i._transporter = e
        };
        i.setResponseHandler = function (e) {
            if (typeof e != "function") {
                throw"sdk.setResponseHandler must input a function"
            }
            i._responseHandler = e
        };
        i.setDeferredFactory = function (e) {
            i._deferredFactory = e
        };
        i.setTimeout = function (e) {
            i._timeout = e
        };
        i.setRequestFilter = function (e) {
            i._requestFilter = e
        };
        i.setUrl = function (e) {
            i._url = e
        };
        i.setSerialization = function (e) {
            i._serialization = e
        };
        e.forEach(function (t) {
            i[t.type] = function () {
                var e = "_InterfaceDelegate_" + t.type;
                if (!!!i[e]) {
                    i[e] = new n(i, t.type, t.methods)
                }
                return i[e]
            }
        })
    };
    var n = function (r, n, e) {
        var t = this;
        e.forEach(function (i) {
            t[i] = function () {
                var e = Array.prototype.slice.apply(arguments);
                var t = {interfaceName: n, methodName: i, args: e};
                return r._deferredFactory(t, r)
            }
        })
    };
    var a = function () {
        this.serialize = function (e) {
            return JSON.stringify(e)
        };
        this.deserialize = function (t) {
            try {
                return typeof t === "object" ? t : JSON.parse(t)
            } catch (e) {
                r.warn(e);
                throw"#149 deserialize error, _str=" + t + ", e=" + e
            }
        }
    };
    var o = function (i, r) {
        var n = this;
        n.then = function () {
            var e = Array.prototype.slice.apply(arguments);
            try {
                i.async = true;
                var t = a(r, i, e);
                r._transporter(t)
            } catch (e) {
                i.error = e;
                r._responseHandler(i)
            }
            return n
        };
        n.result = function () {
            i.async = false;
            var e = a(r, i, null);
            var t = r._transporter(e);
            return r._serialization.deserialize(t)
        };
        var a = function (e, t, i) {
            var r = {};
            if (!!i && !!i[0]) {
                if (typeof i[0] === "function") {
                    r.success = i[0];
                    r.fail = i[1] || e._callback.fail
                } else {
                    r.success = i[0].success || e._callback.success;
                    r.fail = i[0].fail || e._callback.fail
                }
            } else {
                r = e._callback
            }
            t.callback = r;
            t.requestBody = e._serialization.serialize(t.args[0] || {});
            t.responseHandler = e._responseHandler;
            t.serialization = e._serialization;
            t.headers = {};
            t.parameters = {};
            t.timeout = e._timeout;
            t.url = e._url;
            if (e._requestFilter) {
                t = e._requestFilter(t)
            }
            return t
        }
    };
    var s = function (r) {
        var e = r.url + "/" + r.interfaceName + "." + r.methodName + "?" + $.param(r.parameters);
        var t = $.ajax({
            method: "POST",
            contentType: "application/json",
            url: e,
            timeout: r.timeout,
            data: r.requestBody,
            async: r.async,
            headers: r.headers
        });
        if (r.async) {
            t.done(function (e, t, i) {
                r.responseBody = e;
                r.responseHandler(r)
            }).fail(function (e, t, i) {
                r.error = new Error("ajax failed, error=" + i + ", status=" + e.status);
                r.responseHandler(r)
            })
        } else {
            return t.responseText
        }
    };
    var l = function (e) {
        if (!!e.error) {
            e.callback.fail(e.error, e)
        } else {
            var t = e.responseBody;
            var i = e.serialization.deserialize(t);
            e.callback.success(i, e)
        }
    };
    var i = null;
    if (!!window) {
        i = window
    } else if (!!wx) {
        i = wx
    } else {
        throw"window or wx not found, contact the developer now"
    }
    i.BudoDubboHttpApiJavascriptSdk = t;
    i.EweiApiJavascriptSdk = t;
    i.JQueryTransporter = s;
    i.JsonSerialization = a;
    i.ResponseHandler = l
})();
this.org = this.org || {};
org.ewei = org.ewei || {};
(function (s) {
    "use strict";
    function e(t, i, r) {
        var n = getCookie("user_token");
        var e = function (t) {
            var e = null;
            try {
                e = t.serialization.deserialize(t.responseBody)
            } catch (e) {
                t.callback.fail(t.result, t.args);
                return
            }
            if (e.status === 0) {
                t.callback.success(e.result, t.args)
            } else {
                t.callback.fail(e.result, t.args)
            }
        };
        var a = function (n) {
            var e = n.url + "/" + n.interfaceName + "." + n.methodName + "?" + $.param(n.parameters);
            i({
                url: e,
                method: "POST",
                data: n.requestBody,
                headers: n.headers,
                timeout: n.timeout
            }).success(function (e, t, i, r) {
                n.responseBody = e;
                n.responseHandler(n)
            }).error(function (e, t, i, r) {
                n.result = {error_description: "请求错误" + t};
                n.responseHandler(n)
            })
        };
        var o = function (e) {
            e.parameters["_token"] = n;
            e.parameters["_provider_id"] = t;
            return e
        };
        s.sdk = new BudoDubboHttpApiJavascriptSdk;
        s.sdk.setUrl("/api2");
        s.sdk.setTransporter(a);
        s.sdk.setRequestFilter(o);
        s.sdk.setResponseHandler(e);
        s.sdk.setCallback({
            success: function (e) {
                s.logger.info("sdk.callback result=" + JSON.stringify(e))
            }, fail: function (e) {
                r.add(e ? e.error_description ? e.error_description : JSON.stringify(e) : "result is null", "danger")
            }
        })
    }

    s.OpenBasicApi = e
})(org.ewei);
(function () {
    "use strict";
    angular.module("eweiApp.core").service("cachedEngineerService", e);
    e.$inject = ["apiRestfulService", "coreModelService", "coreNotifyService", "cachedUserService"];
    function e(e, o, t, s) {
        return {updateCached: i, getEngineers: r, getEngineer: n};
        function i(e) {
            if (e && e.length) {
                angular.forEach(e, function (e) {
                    o.detail.cachedEngineers.put(e.id, e);
                    t.doNotify(t.constant.EVENT_DETAIL_CACHED_ENGINEER_UPDATED, e.id)
                })
            }
        }

        function r(e, t, i, r, n, a) {
            if (!n) {
            }
            return o.detail.cachedEngineers.gets(o.list.cachedEngineers.get(e).gets(t || 1))
        }

        function n(e, t, i, r, n) {
            if (!r) {
            }
            var a = o.detail.cachedEngineers.get(e);
            if (a && a.userId) {
                a.user = s.getUser(a.userId, null, null, true)
            }
            return a
        }
    }
})();
(function () {
    "use strict";
    angular.module("eweiApp.core").service("cachedEvaluateService", e);
    e.$inject = ["apiRestfulService", "coreModelService", "coreNotifyService"];
    function e(e, o, t) {
        return {updateCached: i, getEvaluates: r, getEvaluate: n};
        function i(e) {
            if (e && e.length) {
                angular.forEach(e, function (e) {
                    o.detail.cachedEvaluates.put(e.id, e);
                    t.doNotify(t.constant.EVENT_DETAIL_CACHED_EVALUATE_UPDATED, e.id)
                })
            }
        }

        function r(e, t, i, r, n, a) {
            if (!n) {
            }
            return o.detail.cachedEvaluates.gets(o.list.cachedEvaluates.get(e).gets(t || 1))
        }

        function n(e, t, i, r, n) {
            if (!r) {
            }
            return o.detail.cachedEvaluates.get(e)
        }
    }
})();
(function () {
    "use strict";
    angular.module("eweiApp.core").service("cachedServiceDeskService", e);
    e.$inject = ["apiRestfulService", "coreModelService", "coreNotifyService"];
    function e(e, o, t) {
        return {updateCached: i, getServiceDesk: r};
        function i(e) {
            if (e && e.length) {
                angular.forEach(e, function (e) {
                    o.detail.cachedServiceDesks.put(e.id, e);
                    t.doNotify(t.constant.EVENT_DETAIL_CACHED_SERVICEDESK_UPDATED, e.id)
                })
            }
        }

        function r(e, t, i, r, n) {
            if (!r) {
            }
            var a = o.detail.cachedServiceDesks.get(e);
            return a
        }
    }
})();
(function () {
    "use strict";
    angular.module("eweiApp.core").service("cachedTicketService", e);
    e.$inject = ["apiRestfulService", "coreModelService", "coreNotifyService", "cachedEngineerService", "cachedUserService", "cachedServiceDeskService", "cachedViaService", "cachedEvaluateService", "cachedTicketTypeService", "cachedTicketMetricService", "cachedUserGroupService", "cachedTicketTagService"];
    function e(c, u, d, p, f, m, v, g, h, y, w, s) {
        return {
            updateCached: e,
            updateCustomFieldCached: t,
            updateSubscriptionCached: i,
            updateCopyToCached: r,
            updateServiceCatalogCached: n,
            getTickets: a,
            getTicket: k
        };
        function e(e) {
            if (e === undefined)return;
            if (!angular.isArray(e)) {
                e = [e]
            }
            angular.forEach(e, function (e) {
                u.detail.cachedTickets.put(e.id, e);
                d.doNotify(d.constant.EVENT_DETAIL_CACHED_TICKET_UPDATED, e.id)
            })
        }

        function t(e) {
            if (e === undefined)return;
            if (!angular.isArray(e)) {
                e = [e]
            }
            angular.forEach(e, function (e) {
                u.detail.cachedTickets.set(e.ticketId, e.customFieldId, e.value);
                d.doNotify(d.constant.EVENT_DETAIL_CACHED_TICKET_UPDATED, e.id)
            })
        }

        function i(e) {
            if (e === undefined)return;
            if (!angular.isArray(e)) {
                e = [e]
            }
            angular.forEach(e, function (e) {
                u.detail.cachedTickets.set(e.ticketId, "isTarget", !e.isTarget);
                d.doNotify(d.constant.EVENT_DETAIL_CACHED_TICKET_UPDATED, e.ticketId)
            })
        }

        function r(e) {
            if (e === undefined)return;
            if (!angular.isArray(e)) {
                e = [e]
            }
            angular.forEach(e, function (e) {
                var t = _.filter(e.copyToNames, function (e) {
                    return !!e
                }).join(" ");
                u.detail.cachedTickets.set(e.relatedId, "copyto", t);
                d.doNotify(d.constant.EVENT_DETAIL_CACHED_TICKET_UPDATED, e.relatedId)
            })
        }

        function n(e) {
            if (e === undefined)return;
            if (!angular.isArray(e)) {
                e = [e]
            }
            angular.forEach(e, function (e) {
                u.detail.cachedTickets.set(e.relatedId, "serviceCatalogNames", e.serviceCatalogNames);
                d.doNotify(d.constant.EVENT_DETAIL_CACHED_TICKET_UPDATED, e.relatedId)
            })
        }

        function a(e, r, n, a, t, o) {
            var i = {url: "api/v1/view_tickets", urlParam: n, dataParam: a};
            if (!t) {
                c.run(i).get(i.dataParam, function (i) {
                    if (0 == i.status && angular.isDefined(i.result.tickets)) {
                        angular.forEach(i.result.tickets, function (t) {
                            var e = _.find(i.result.ticketMetrics, function (e) {
                                return t.ticketMetric && e.id === t.ticketMetric.id
                            });
                            if (e) {
                                if (e.planResponseAt) {
                                    if (e.responseAt) {
                                        e.slaResponseTarget = moment(e.responseAt).diff(moment(e.planResponseAt))
                                    } else {
                                        e.slaResponseTarget = moment().diff(moment(e.planResponseAt))
                                    }
                                } else {
                                }
                                if (e.planSolvedAt) {
                                    if (e.solvedAt) {
                                        e.slaSolveTarget = moment(e.solvedAt).diff(moment(e.planSolvedAt))
                                    } else {
                                        e.slaSolveTarget = moment().diff(moment(e.planSolvedAt))
                                    }
                                } else {
                                }
                            } else {
                            }
                        });
                        f.updateCached(i.result.users);
                        m.updateCached(i.result.serviceDesks);
                        v.updateCached(i.result.vias);
                        g.updateCached(i.result.evaluates);
                        p.updateCached(i.result.engineers);
                        h.updateCached(i.result.ticketTypes);
                        y.updateCached(i.result.ticketMetrics);
                        w.updateCached(i.result.userGroups);
                        var t = [];
                        angular.forEach(i.result.tickets, function (e) {
                            e.isTarget = false;
                            u.detail.cachedTickets.put(e.id, e);
                            t.push(e.id)
                        });
                        u.list.cachedTickets.get(e).put(r, t);
                        u.list.cachedTickets.get(e).total(i.result._total);
                        d.doNotify(d.constant.EVENT_LIST_CACHED_TICKETS_AVAILABLE, {
                            listName: e,
                            page: r,
                            urlParam: n,
                            dataParam: a
                        })
                    }
                    if (typeof o === "function") {
                        o(i)
                    }
                })
            }
            var s = u.list.cachedTickets.get(e).gets(r || 1);
            var l = s.map(function (e) {
                return k(e, null, null, true)
            });
            return _.filter(l, function (e) {
                return !!e
            })
        }

        function k(e, t, i, r, n) {
            if (!r) {
            }
            var a = u.detail.cachedTickets.get(e);
            if (!a)return null;
            if (a && a.user && a.user.id) {
                a.user = f.getUser(a.user.id, null, null, true)
            }
            if (a && a.requester && a.requester.id) {
                a.requester = f.getUser(a.requester.id, null, null, true)
            }
            if (a && a.deleter && a.deleter.id) {
                a.deleter = p.getEngineer(a.deleter.id, null, null, true)
            }
            if (a && a.reviewUser && a.reviewUser.id) {
                a.reviewUser = f.getUser(a.reviewUser.id, null, null, true)
            }
            if (a && a.engineer && a.engineer.id) {
                a.engineer = p.getEngineer(a.engineer.id, null, null, true)
            }
            if (a && a.evaluate && a.evaluate.id) {
                a.evaluate = g.getEvaluate(a.evaluate.id, null, null, true)
            }
            if (a && a.via && a.via.id) {
                a.via = v.getVia(a.via.id, null, null, true)
            }
            if (a && a.serviceDesk && a.serviceDesk.id) {
                a.serviceDesk = m.getServiceDesk(a.serviceDesk.id, null, null, true)
            }
            if (a && a.ticketMetric && a.ticketMetric.id) {
                a.ticketMetric = y.getTicketMetric(a.ticketMetric.id, null, null, true)
            }
            if (a && a.ticketType && a.ticketType.id) {
                a.ticketType = h.getTicketType(a.ticketType.id, null, null, true)
            }
            if (a && a.id) {
                var o = s.getTicketTag(a.id, null, null, true);
                if (o) {
                    a.tags = o.tagNames
                }
            }
            return a
        }
    }
})();
(function () {
    "use strict";
    angular.module("eweiApp.core").service("cachedTicketMetricService", e);
    e.$inject = ["apiRestfulService", "coreModelService", "coreNotifyService"];
    function e(e, o, t) {
        return {updateCached: i, getTicketMetrics: r, getTicketMetric: n};
        function i(e) {
            if (e && e.length) {
                angular.forEach(e, function (e) {
                    o.detail.cachedTicketMetrics.put(e.id, e);
                    t.doNotify(t.constant.EVENT_DETAIL_CACHED_TICKETMETRIC_UPDATED, e.id)
                })
            }
        }

        function r(e, t, i, r, n, a) {
            if (!n) {
            }
            return o.detail.cachedTicketMetrics.gets(o.list.cachedTicketMetrics.get(e).gets(t || 1))
        }

        function n(e, t, i, r, n) {
            if (!r) {
            }
            return o.detail.cachedTicketMetrics.get(e)
        }
    }
})();
(function () {
    "use strict";
    angular.module("eweiApp.core").service("cachedTicketTypeService", e);
    e.$inject = ["apiRestfulService", "coreModelService", "coreNotifyService"];
    function e(e, o, t) {
        return {updateCached: i, getTicketTypes: r, getTicketType: n};
        function i(e) {
            if (e && e.length) {
                angular.forEach(e, function (e) {
                    o.detail.cachedTicketTypes.put(e.id, e);
                    t.doNotify(t.constant.EVENT_DETAIL_CACHED_TICKETTYPE_UPDATED, e.id)
                })
            }
        }

        function r(e, t, i, r, n, a) {
            if (!n) {
            }
            return o.detail.cachedTicketTypes.gets(o.list.cachedTicketTypes.get(e).gets(t || 1))
        }

        function n(e, t, i, r, n) {
            if (!r) {
            }
            return o.detail.cachedTicketTypes.get(e)
        }
    }
})();
(function () {
    "use strict";
    angular.module("eweiApp.core").service("cachedUserService", e);
    e.$inject = ["apiRestfulService", "coreModelService", "coreNotifyService", "cachedUserGroupService"];
    function e(e, o, t, s) {
        return {updateCached: i, getUser: r};
        function i(e) {
            if (e && e.length) {
                angular.forEach(e, function (e) {
                    o.detail.cachedUsers.put(e.id, e);
                    t.doNotify(t.constant.EVENT_DETAIL_CACHED_USER_UPDATED, e.id)
                })
            }
        }

        function r(e, t, i, r, n) {
            if (!r) {
            }
            var a = o.detail.cachedUsers.get(e);
            if (a && a.userGroupId) {
                a.userGroup = s.getUserGroup(a.userGroupId, null, null, true)
            }
            return a
        }
    }
})();
(function () {
    "use strict";
    angular.module("eweiApp.core").service("cachedUserGroupService", e);
    e.$inject = ["apiRestfulService", "coreModelService", "coreNotifyService"];
    function e(e, o, t) {
        return {updateCached: i, getUserGroups: r, getUserGroup: n};
        function i(e) {
            if (e && e.length) {
                angular.forEach(e, function (e) {
                    o.detail.cachedUserGroups.put(e.id, e);
                    t.doNotify(t.constant.EVENT_DETAIL_CACHED_USERGROUP_UPDATED, e.id)
                })
            }
        }

        function r(e, t, i, r, n, a) {
            if (!n) {
            }
            return o.detail.cachedUserGroups.gets(o.list.cachedUserGroups.get(e).gets(t || 1))
        }

        function n(e, t, i, r, n) {
            if (!r) {
            }
            var a = o.detail.cachedUserGroups.get(e);
            return a
        }
    }
})();
(function () {
    "use strict";
    angular.module("eweiApp.core").service("cachedViaService", e);
    e.$inject = ["apiRestfulService", "coreModelService", "coreNotifyService"];
    function e(e, o, t) {
        return {updateCached: i, getVias: r, getVia: n};
        function i(e) {
            if (e && e.length) {
                angular.forEach(e, function (e) {
                    o.detail.cachedVias.put(e.id, e);
                    t.doNotify(t.constant.EVENT_DETAIL_CACHED_VIA_UPDATED, e.id)
                })
            }
        }

        function r(e, t, i, r, n, a) {
            if (!n) {
            }
            return o.detail.cachedVias.gets(o.list.cachedVias.get(e).gets(t || 1))
        }

        function n(e, t, i, r, n) {
            if (!r) {
            }
            return o.detail.cachedVias.get(e)
        }
    }
})();
(function () {
    "use strict";
    angular.module("eweiApp.core").service("cachedTicketTagService", e);
    e.$inject = ["apiRestfulService", "coreModelService", "coreNotifyService", "cachedUserGroupService"];
    function e(e, o, t, i) {
        return {updateCached: r, getTicketTag: n};
        function r(e) {
            if (e && e.length) {
                angular.forEach(e, function (e) {
                    o.detail.cachedTicketTags.put(e.relatedId, e);
                    t.doNotify(t.constant.EVENT_DETAIL_CACHED_TICKET_TAG_UPDATED, e.id)
                })
            }
        }

        function n(e, t, i, r, n) {
            if (!r) {
            }
            var a = o.detail.cachedTicketTags.get(e);
            return a
        }
    }
})();
(function (e) {
    "use strict";
    e.module("eweiApp.core").service("apiWorkingDayService", ["apiRestfulService", "coreModelService", "coreNotifyService", "alertService", function (e, t, i, r) {
        this.getWorkingDay = function (e, t) {
            org.ewei.sdk.OpenWorkTimeApi().findByOwner(e).then({
                success: function (e) {
                    if (typeof t == "function") {
                        t(e)
                    }
                }
            })
        };
        this.saveWorkingTime = function (t, i) {
            org.ewei.sdk.OpenWorkTimeApi().saveOrUpdate(t).then({
                success: function (e) {
                    r.add(t.workTime && t.workTime.id ? "修改成功" : "保存成功", "success");
                    if (typeof i == "function") {
                        i(e)
                    }
                }
            })
        };
        this.getHoliday = function (e, t) {
            org.ewei.sdk.OpenHolidayApi().findByOwner(e).then({
                success: function (e) {
                    if (typeof t == "function") {
                        t(e)
                    }
                }
            })
        };
        this.saveHolidays = function (t, i) {
            org.ewei.sdk.OpenHolidayApi().saveOrUpdate(t).then({
                success: function (e) {
                    r.add(t.holiday && t.holiday.id ? "修改成功" : "保存成功", "success");
                    if (typeof i == "function") {
                        i(e)
                    }
                }
            })
        };
        this.getWeekendWorking = function (e, t) {
            org.ewei.sdk.OpenWeekendWorkingApi().findByOwner(e).then({
                success: function (e) {
                    if (typeof t == "function") {
                        t(e)
                    }
                }
            })
        };
        this.saveWeekendWorking = function (t, i) {
            org.ewei.sdk.OpenWeekendWorkingApi().saveOrUpdate(t).then({
                success: function (e) {
                    r.add(t && t.id ? "修改成功" : "保存成功", "success");
                    if (typeof i == "function") {
                        i(e)
                    }
                }
            })
        }
    }])
})(angular);
(function (e) {
    "use strict";
    e.module("eweiApp.core").service("apiTicketQuantityService", ["coreModelService", "coreNotifyService", "alertService", function (e, t, i) {
        this.getQuantity = function (e, t) {
            org.ewei.sdk.OpenReportApi().countTicketNumber(e).then({
                success: function (e) {
                    if (typeof t == "function") {
                        t(e)
                    }
                }
            })
        }
    }])
})(angular);
(function (e) {
    "use strict";
    e.module("eweiApp.core").service("apiTicketQualityService", ["coreModelService", "coreNotifyService", "alertService", function (e, t, i) {
        this.getListQuality = function (e, t) {
            org.ewei.sdk.OpenReportApi().countTicketQuality(e).then({
                success: function (e) {
                    if (typeof t == "function") {
                        t(e)
                    }
                }
            })
        };
        this.getResponseOption = function (e, t) {
            org.ewei.sdk.OpenReportApi().countTicketSlaResponseDistribution(e).then({
                success: function (e) {
                    if (typeof t == "function") {
                        t(e)
                    }
                }
            })
        };
        this.getSolvedOption = function (e, t) {
            org.ewei.sdk.OpenReportApi().countTicketSlaSolvedDistribution(e).then({
                success: function (e) {
                    if (typeof t == "function") {
                        t(e)
                    }
                }
            })
        }
    }])
})(angular);
(function (e) {
    "use strict";
    e.module("eweiApp.core").service("apiChartEngineerService", [function () {
        this.getChartEngineerAverage = function (e, t) {
            org.ewei.sdk.OpenPerformanceApi().listEngineerResponsePerformanceStatistics(e).then({
                success: function (e) {
                    if (typeof t == "function") {
                        t(e)
                    }
                }
            })
        };
        this.getChartEngineerTotal = function (e, t) {
            org.ewei.sdk.OpenPerformanceApi().listEngineerProcessPerformanceStatistics(e).then({
                success: function (e) {
                    if (typeof t == "function") {
                        t(e)
                    }
                }
            })
        };
        this.getChartServiceDesk = function (e, t) {
            org.ewei.sdk.OpenPerformanceApi().listServiceDeskPerformanceStatistics(e).then({
                success: function (e) {
                    if (typeof t == "function") {
                        t(e)
                    }
                }
            })
        };
        this.getChartListEngineer = function (e, t) {
            org.ewei.sdk.OpenPerformanceApi().listEngineerPerformance(e).then({
                success: function (e) {
                    if (typeof t == "function") {
                        t(e)
                    }
                }
            })
        };
        this.getChartListServiceDesk = function (e, t) {
            org.ewei.sdk.OpenPerformanceApi().listServiceDeskPerformance(e).then({
                success: function (e) {
                    if (typeof t == "function") {
                        t(e)
                    }
                }
            })
        };
        this.getChartListEngineerById = function (e, t) {
            org.ewei.sdk.OpenPerformanceApi().listPerformanceRecordByEngineerId(e).then({
                success: function (e) {
                    if (typeof t == "function") {
                        t(e)
                    }
                }
            })
        };
        this.getChartListServiceDeskById = function (e, t) {
            org.ewei.sdk.OpenPerformanceApi().listPerformanceRecordByServiceDeskId(e).then({
                success: function (e) {
                    if (typeof t == "function") {
                        t(e)
                    }
                }
            })
        };
        this.getEngineerResponseOption = function (e, t) {
            org.ewei.sdk.OpenPerformanceApi().engineerResponseDistributed(e).then({
                success: function (e) {
                    if (typeof t == "function") {
                        t(e)
                    }
                }
            })
        };
        this.getServiceDeskResponseOption = function (e, t) {
            org.ewei.sdk.OpenPerformanceApi().serviceDeskResponseDistributed(e).then({
                success: function (e) {
                    if (typeof t == "function") {
                        t(e)
                    }
                }
            })
        }
    }])
})(angular);
angular.module("eweiApp.ui", ["ui.router"]).config(["$stateProvider", "$urlRouterProvider", function (e, t) {
    e.state("ui", {
        abstract: true,
        url: "/ui",
        templateUrl: "source/views/ui/ui.html",
        resolve: {},
        controller: ["$scope", "$state", "utils", function (e, t, i) {
            e.select = function (e) {
                $(".pane.left a").removeClass("box02");
                $(e).addClass("box02")
            }
        }]
    }).state("hc_setting", {
        url: "/hc_setting",
        templateUrl: "source/views/customer1/view1.html",
        controller: ["$scope", "$state", "tabs", "utils", function (e, t, i, r) {
            t.go("hc_setting.detail");
            $(document).ready(function () {
                $(".J_add").click(function () {
                    var e = $(this).parent().parent().prev().html();
                    var t = $(this).parent().parent().prev().after("<tr class='after_tr'></tr>");
                    var t = $(".after_tr");
                    t.html(e);
                    t.find(".J_add").addClass("J_del").removeClass("J_add").text("-");
                    $(".J_del").live("click", function () {
                        $(this).parents("tr").remove()
                    })
                })
            })
        }]
    }).state("hc_setting.detail", {
        url: "/hc_setting/detail",
        templateUrl: "source/views/customer1/view.detail.html"
    }).state("ui.update", {url: "/update", templateUrl: "source/views/ui/ui.update.html"}).state("ui.css", {
        url: "/css",
        templateUrl: "source/views/ui/ui.css.html"
    }).state("ui.frame", {
        url: "/frame",
        templateUrl: "source/views/ui/ui.frame.html",
        controller: ["$scope", "$state", "tabs", "utils", function (t, i, e, r) {
            prettyPrint();
            t.tabs = e;
            t.layout = function (e) {
                t.frameId = r.countByStateName("frame") + 1;
                r.addTab("frame" + t.frameId, "框架布局" + e, "frame" + e, {id: t.frameId}, "fa-columns");
                i.go("frame" + e)
            }
        }]
    }).state("frameA", {
        url: "/frameA",
        templateUrl: "source/views/ui/ui.frameA.html",
        controller: ["$scope", "$state", "utils", function (e, t, i) {
            prettyPrint()
        }]
    }).state("frameB", {
        url: "/frameB",
        templateUrl: "source/views/ui/ui.frameB.html",
        controller: ["$scope", "$state", "utils", function (e, t, i) {
            prettyPrint()
        }]
    }).state("frameC", {
        url: "/frameC",
        templateUrl: "source/views/ui/ui.frameC.html",
        controller: ["$scope", "$state", "utils", function (e, t, i) {
            prettyPrint()
        }]
    }).state("ui.fuwu", {
        url: "/ui.fuwu",
        templateUrl: "source/views/ui/ui.fuwu.html",
        controller: ["$scope", "$state", "utils", "alertService", function (t, e, i, r) {
            t.treeOptions = {
                nodeChildren: "children",
                dirSelectable: false,
                injectClasses: {
                    ul: "",
                    li: "line_h25 fx-fade",
                    liSelected: "box02",
                    iExpanded: "fa fa-folder-open-o",
                    iCollapsed: "fa fa-caret-right",
                    iLeaf: "fa fa-file-text margin_left20px",
                    label: "hoc74",
                    labelSelected: ""
                }
            };
            t.dataForTheTree = [{
                name: "服务目录",
                age: "21",
                menu: false,
                children: [{name: "服务目录", age: "42", lock: true}, {
                    name: "Gary2",
                    age: "21",
                    lock: true
                }, {name: "Jenifer3", age: "23"}]
            }, {
                name: "Ron",
                age: "29",
                children: [{name: "Smith7", age: "42", lock: true}, {
                    name: "Gary7",
                    age: "21",
                    lock: true
                }, {name: "Jenifer7", age: "23"}]
            }];
            t.selected = t.dataForTheTree[0];
            t.expandedNodes = [t.dataForTheTree[1], t.dataForTheTree[2]];
            t.lastClicked = null;
            t.buttonClick = function (e, t) {
                void 0;
                e.stopPropagation()
            };
            t.showSelected = function (e) {
                t.lastClicked = e;
                void 0;
                t.selectedNode = e
            };
            t.mouseEnter = function (e) {
                e.menu = true
            };
            t.mouseLeave = function (e) {
                e.menu = faui.zaixianjiaotanlse
            }
        }]
    }).state("ui.50", {
        url: "/ui.50",
        templateUrl: "source/views/ui/ui.5.0.html",
        controller: ["$scope", "$state", "utils", function (e, t, i) {
            prettyPrint()
        }]
    }).state("ui.yiubiaopan", {
        url: "/ui.yiubiaopan",
        templateUrl: "source/views/ui/ui.yiubiaopan.html",
        controller: ["$scope", "$state", "utils", function (e, t, i) {
            prettyPrint()
        }]
    }).state("ui.dengdaiduilie", {
        url: "/ui.dengdaiduilie",
        templateUrl: "source/views/ui/ui.dengdaiduilie.html",
        controller: ["$scope", "$state", "utils", function (e, t, i) {
            prettyPrint();
            var r = [{name: "全部", num: 30}, {name: "客服1", num: 5}, {name: "客服2", num: 3}, {
                name: "客服2",
                num: 3
            }, {name: "客服2", num: 3}, {name: "客服2", num: 3}, {name: "客服2", num: 31}, {
                name: "客服2",
                num: 3
            }, {name: "客服2", num: 3}, {name: "客服2", num: 35}, {name: "客服2", num: 3}, {
                name: "客服2",
                num: 3
            }, {name: "客服2", num: 34}, {name: "客服2", num: 33}, {name: "客服2", num: 3}, {
                name: "客服2",
                num: 38
            }, {name: "客服2", num: 3}, {name: "客服2", num: 37}, {name: "客服2", num: 3}];
            e.totalCustomer = r.length;
            e.currentStart = 0;
            e.customers = r.slice(e.currentStart, e.currentStart + 10);
            e.nextLoadManagers = function () {
                e.currentStart++;
                e.customers = r.slice(e.currentStart, e.currentStart + 10)
            };
            e.prevLoadManagers = function () {
                e.currentStart--;
                e.customers = r.slice(e.currentStart, e.currentStart + 10)
            }
        }]
    }).state("ui.huihualiebiao", {
        url: "/ui.huihualiebiao",
        templateUrl: "source/views/ui/ui.huihualiebiao.html",
        controller: ["$scope", "$state", "utils", function (i, e, t) {
            prettyPrint();
            i.showBtnList = false;
            i.logs = [1, 2, 3, 4];
            i.toggleBtnList = function (e) {
                i.showBtnList = e
            };
            var r = function (e) {
                setTimeout(function () {
                    var e = $("#display_to_view")[0];
                    e.scrollIntoView()
                }, e)
            };
            i.matchQuickReplys = function (e) {
                var t = i.textMessage;
                i.showQuickAnswer = false;
                i.showKnowledge = false;
                if (t === "/") {
                    i.showQuickAnswer = true
                } else if (t === "//") {
                    i.showKnowledge = true
                } else {
                    i.showQuickAnswer = false;
                    i.showKnowledge = false
                }
                if (e.keyCode === 13) {
                    i.logs.push(6)
                }
                i.imgs = ["http://www.twwiki.com/uploads/wiki/8f/bf/865415_0.jpg", "http://www.twwiki.com/uploads/wiki/8f/bf/865415_0.jpg", "http://www.twwiki.com/uploads/wiki/8f/bf/865415_0.jpg"];
                if (e.keyCode === 32) {
                    i.imgs.push("http://www.twwiki.com/uploads/wiki/8f/bf/865415_0.jpg")
                }
            };
            i.inputKeypress = function (e) {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    e.stopPropagation()
                }
            }
        }]
    }).state("ui.gongzuoshiduan", {
        url: "/ui.gongzuoshiduan",
        templateUrl: "source/views/ui/ui.gongzuoshiduan.html",
        controller: ["$scope", "$state", "utils", "alertService", "$filter", function (e, t, i, r, n) {
            var a;
            e.itemsList = {
                items1: [{title: "分派给我 ", details: "其他参数", status: "In progress"}, {
                    title: "置忙",
                    details: "Testing Card Details",
                    status: "In progress"
                }, {title: "催促客户给予回应", details: "Testing Card Details", status: "In progress"}, {
                    title: "引导客户访问社区，关闭工单",
                    details: "Testing Card Details",
                    status: "In progress"
                }, {title: "引导客户访问社区，关闭工单", details: "Testing Card Details", status: "In progress"}], items2: []
            };
            e.url = "http://www.ewei.com/link2151";
            e.getTextToCopy = function (e) {
                return e
            };
            e.showMsg = function (e) {
                r.add(n("translate")(e), "success", "right", 1e3)
            };
            e.sortableOptions = {containment: "#sortable-container"}
        }]
    }).state("ui.xinshou", {
        url: "/ui.xinshou",
        templateUrl: "source/views/ui/ui.xinshou.html",
        controller: ["$scope", "$state", "utils", function (e, t, i) {
            prettyPrint()
        }]
    }).state("ui.xinshoukefu", {
        url: "/ui.xinshoukefu",
        templateUrl: "source/views/ui/ui.xinshoukefu.html",
        controller: ["$scope", "$state", "utils", function (e, t, i) {
            prettyPrint()
        }]
    }).state("ui.wanshan", {
        url: "/ui.wanshan",
        templateUrl: "source/views/ui/ui.wanshan.html",
        controller: ["$scope", "$state", "utils", function (e, t, i) {
            prettyPrint()
        }]
    }).state("ui.jihuo", {
        url: "/ui.jihuo",
        templateUrl: "source/views/ui/ui.jihuo.html",
        controller: ["$scope", "$state", "utils", function (e, t, i) {
            prettyPrint()
        }]
    }).state("ui.xintianjiajiaotan", {
        url: "/ui.xintianjiajiaotan",
        templateUrl: "source/views/ui/ui.xintianjiajiaotan.html",
        controller: ["$scope", "$state", "utils", function (e, t, i) {
            prettyPrint()
        }]
    }).state("ui.gaojishezhi", {
        url: "/ui.gaojishezhi",
        templateUrl: "source/views/ui/ui.gaojishezhi.html",
        controller: ["$scope", "$state", "utils", function (e, t, i) {
            prettyPrint()
        }]
    }).state("ui.chuangjian", {
        url: "/ui.chuangjian",
        templateUrl: "source/views/ui/ui.chuangjian.html",
        controller: ["$scope", "$state", "utils", function (e, t, i) {
            prettyPrint()
        }]
    }).state("ui.jiemianwaiguan", {
        url: "/ui.jiemianwaiguan",
        templateUrl: "source/views/ui/ui.jiemianwaiguan.html",
        controller: ["$scope", "$rootScope", "$state", "utils", "alertService", function (e, t, i, r, n) {
            e.set1 = function () {
                t.provider = {
                    name: "",
                    fontSize: 14,
                    logo: "source/images/daoru88.jpg",
                    bgColor: "#3399ff",
                    tabColor: "#3399ff",
                    color: "#FFFFFF"
                }
            };
            e.set2 = function () {
                t.provider = {
                    name: "",
                    fontSize: 16,
                    logo: "source/images/daoru77.jpg",
                    bgColor: "#555555",
                    tabColor: "#555555",
                    color: "#406000"
                }
            };
            e.set3 = function () {
                t.provider = {
                    name: "",
                    fontSize: 16,
                    logo: "source/images/daoru77.jpg",
                    bgColor: "#000000",
                    tabColor: "#000000",
                    color: "#efe6bd"
                }
            };
            e.set4 = function () {
                t.provider = {
                    name: "",
                    fontSize: 20,
                    logo: "source/images/daoru77.jpg",
                    bgColor: "#ffffff",
                    tabColor: "#ffffff",
                    color: "#FFFFFF"
                }
            }
        }]
    }).state("ui.bemail", {
        url: "/ui.bemail",
        templateUrl: "source/views/ui/ui.bemail.html",
        controller: ["$scope", "$state", "utils", function (e, t, i) {
            prettyPrint()
        }]
    }).state("ui.yuancheng", {
        url: "/ui.yuancheng",
        templateUrl: "source/views/ui/ui.yuancheng.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment()
        }]
    }).state("ui.interfaceLogo", {
        url: "/ui.interfaceLogo",
        templateUrl: "source/views/ui/ui.interfaceLogo.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment()
        }]
    }).state("ui.email", {
        url: "/ui.email",
        templateUrl: "source/views/ui/ui.email.html",
        controller: ["$scope", "$state", "utils", function (e, t, i) {
            prettyPrint()
        }]
    }).state("ui.Independent-domain-name", {
        url: "/ui.Independent-domain-name",
        templateUrl: "source/views/ui/ui.Independent-domain-name.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment();
            $(document).ready(function () {
                $(".J_add").click(function () {
                    var e = $(this).parent().parent().prev().html();
                    var t = $(this).parent().parent().prev().after("<tr class='after_tr'></tr>");
                    var t = $(".after_tr");
                    t.html(e);
                    t.find(".J_add").addClass("J_del").removeClass("J_add").text("-");
                    $(".J_del").live("click", function () {
                        $(this).parents("tr").remove()
                    })
                })
            })
        }]
    }).state("ui.huihua", {
        url: "/ui.huihua",
        templateUrl: "source/views/ui/ui.huihua.html",
        controller: ["$scope", "$state", "utils", function (e, t, i) {
            prettyPrint()
        }]
    }).state("ui.wangbiaodan", {
        url: "/ui.wangbiaodan",
        templateUrl: "source/views/ui/ui.wangbiaodan.html",
        controller: ["$scope", "$state", "utils", function (e, t, i) {
            prettyPrint()
        }]
    }).state("ui.menulistA", {
        url: "/menulistA",
        templateUrl: "source/views/ui/ui.menuListA.html",
        controller: ["$scope", "$state", "utils", function (e, t, i) {
            prettyPrint()
        }]
    }).state("ui.menulistB", {
        url: "/menulistB",
        templateUrl: "source/views/ui/ui.menuListB.html",
        controller: ["$scope", "$state", "utils", function (e, t, i) {
            prettyPrint()
        }]
    }).state("ui.alert", {
        url: "/alert",
        templateUrl: "source/views/ui/ui.alert.html",
        controller: ["$scope", "$state", "utils", "alertService", function (e, t, i, r) {
            e.open = function () {
                r.add("这是一个默认参数的消息！");
                r.add("这是一个成功消息，位于左边！", "success", "left", 5e3);
                r.add("这是一个普通消息，位于左边，只显示2秒！", "info", "left", 5e3);
                r.add('这是一个警告消息，位于左边，我要显示20秒<a ng-click="$parent.a();">11111111</a>！', "warning", "left", 2e4);
                r.add("我是一个不显示关闭按钮的消息！", "danger", "left", 3e4, 0, false);
                r.add("这是一个出错消息，且<strong class='text-danger'>含html代码</strong><a ng-click='$parent.a();'>点击响应方法</a>！", "danger", "right", 5e3);
                r.add("我是延迟2秒显示的消息！", "info", "right", 2e4, 2e3, true)
            };
            prettyPrint()
        }]
    }).state("ui.debounce", {
        url: "/debounce",
        templateUrl: "source/views/ui/ui.debounce.html",
        controller: ["$scope", "$debounce", function (e, t) {
            e.val = 0;
            e.inc = function () {
                t(i, 300)
            };
            var i = function () {
                e.val++
            };
            prettyPrint()
        }]
    }).state("ui.trusted", {
        url: "/trusted",
        templateUrl: "source/views/ui/ui.trusted.html",
        controller: ["$scope", "$state", "utils", "alertService", function (e, t, i, r) {
            e.html = "这是一段<strong class='text-danger'>html代码</strong>！";
            prettyPrint()
        }]
    }).state("ui.devtool", {
        url: "/devtool",
        templateUrl: "source/views/ui/ui.devtool.html",
        controller: ["$scope", "$state", "utils", "alertService", function (e, t, i, r) {
            e.html = "这是一段<strong class='text-danger'>html代码</strong>！";
            prettyPrint()
        }]
    }).state("ui.ticketChat", {
        url: "/ticketChat",
        templateUrl: "source/views/ui/ui.ticketChat.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment()
        }]
    }).state("ui.we", {
        url: "/we",
        templateUrl: "source/views/ui/ui.we.html",
        controller: ["$scope", "$state", "utils", "alertService", "$filter", function (e, t, i, r, n) {
            var a;
            e.itemsList = {
                itemsa: [{title: "社区公告 ", details: "其他参数", status: "In progress"}],
                items1: [{title: "新手入门 ", details: "其他参数", status: "In progress"}, {
                    title: "常见问题",
                    details: "Testing Card Details",
                    status: "In progress"
                }, {title: " 产品知识", details: "Testing Card Details", status: "In progress"}, {
                    title: "面向开发者",
                    details: "Testing Card Details",
                    status: "In progress"
                }],
                items2: [{title: "意见反馈 ", details: "其他参数", status: "In progress"}, {
                    title: "需求收集",
                    details: "Testing Card Details",
                    status: "In progress"
                }]
            };
            e.url = "http://www.ewei.com/link2151";
            e.getTextToCopy = function (e) {
                return e
            };
            e.showMsg = function (e) {
                r.add(n("translate")(e), "success", "right", 1e3)
            };
            e.sortableOptions = {containment: "#sortable-container"}
        }]
    }).state("ui.we3", {
        url: "/we3",
        templateUrl: "source/views/ui/ui.we3.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment()
        }]
    }).state("ui.gonzuoliou", {
        url: "/gonzuoliou",
        templateUrl: "source/views/ui/ui.gonzuoliou.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment();
            $(document).ready(function () {
                $(".J_add").click(function () {
                    var e = $(this).parent().parent().prev().html();
                    var t = $(this).parent().parent().prev().after("<tr class='after_tr'></tr>");
                    var t = $(".after_tr");
                    t.html(e);
                    t.find(".J_add").addClass("J_del").removeClass("J_add").text("-");
                    $(".J_del").live("click", function () {
                        $(this).parents("tr").remove()
                    })
                })
            })
        }]
    }).state("ui.bianjigongdan", {
        url: "/bianjigongdan",
        templateUrl: "source/views/ui/ui.bianjigongdan.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment();
            $(document).ready(function () {
                $(".J_add").click(function () {
                    var e = $(this).parent().parent().prev().html();
                    var t = $(this).parent().parent().prev().after("<tr class='after_tr'></tr>");
                    var t = $(".after_tr");
                    t.html(e);
                    t.find(".J_add").addClass("J_del").removeClass("J_add").text("-");
                    $(".J_del").live("click", function () {
                        $(this).parents("tr").remove()
                    })
                })
            })
        }]
    }).state("ui.zaixianjiaotan", {
        url: "/zaixianjiaotan",
        templateUrl: "source/views/ui/ui.zaixianjiaotan.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment();
            $(document).ready(function () {
                $(".J_add").click(function () {
                    var e = $(this).parent().parent().prev().html();
                    var t = $(this).parent().parent().prev().after("<tr class='after_tr'></tr>");
                    var t = $(".after_tr");
                    t.html(e);
                    t.find(".J_add").addClass("J_del").removeClass("J_add").text("-");
                    $(".J_del").live("click", function () {
                        $(this).parents("tr").remove()
                    })
                })
            })
        }]
    }).state("ui.bianjigongdan2", {
        url: "/bianjigongdan2",
        templateUrl: "source/views/ui/ui.bianjigongdan2.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment();
            $(document).ready(function () {
                $(".J_add").click(function () {
                    var e = $(this).parent().parent().prev().prev().html();
                    var t = $(this).parent().parent().prev().prev().after("<tr class='after_tr'></tr>");
                    var t = $(".after_tr");
                    t.html(e);
                    t.find(".J_add").addClass("J_del").removeClass("J_add").text("-");
                    $(".J_del").live("click", function () {
                        $(this).parents("tr").remove()
                    })
                })
            })
        }]
    }).state("ui.we1", {
        url: "/we1",
        templateUrl: "source/views/ui/ui.we1.html",
        controller: ["$scope", "$state", "utils", "alertService", "$filter", function (e, t, i, r, n) {
            var a;
            e.itemsList = {
                items1: [{title: "分派给我 ", details: "其他参数", status: "In progress"}, {
                    title: "置忙",
                    details: "Testing Card Details",
                    status: "In progress"
                }, {title: "催促客户给予回应", details: "Testing Card Details", status: "In progress"}, {
                    title: "引导客户访问社区，关闭工单",
                    details: "Testing Card Details",
                    status: "In progress"
                }], items2: []
            };
            e.url = "http://www.ewei.com/link2151";
            e.getTextToCopy = function (e) {
                return e
            };
            e.showMsg = function (e) {
                r.add(n("translate")(e), "success", "right", 1e3)
            };
            e.sortableOptions = {containment: "#sortable-container"}
        }]
    }).state("ui.we2", {
        url: "/we2",
        templateUrl: "source/views/ui/ui.we2.html",
        controller: ["$scope", "$rootScope", "$state", "$sce", "$filter", "$translatePartialLoader", function (e, t, i, r, n, a) {
            a.addPart("ticket");
            t.$on("$translateChangeSuccess", function () {
                e.helper = {
                    title: n("translate")(i.current.name + "_HELPER_TITLE"),
                    content: n("translate")(i.current.name + "_HELPER_DESCRIPTION"),
                    video: {active: true, disabled: false, content: "这里插入视频代码"},
                    reference: {
                        active: false,
                        disabled: false,
                        lists: [{
                            title: "如何添加IT工程师或客服人员账户？",
                            url: "http://www.infocare.cn/helpdesk/article_31329"
                        }, {title: "如何将客户帮助中心作为现有网站的一部分？", url: "http://www.infocare.cn/helpdesk/article_129428"}]
                    }
                }
            })
        }]
    }).state("ui.gongdanm", {
        url: "/gongdanm",
        templateUrl: "source/views/ui/ui.gongdanm.html",
        controller: ["$scope", "$state", "utils", "alertService", "$filter", function (e, t, i, r, n) {
            var a;
            e.itemsList = {
                items1: [{title: "分派给我 ", details: "其他参数", status: "In progress"}, {
                    title: "置忙",
                    details: "Testing Card Details",
                    status: "In progress"
                }, {title: "催促客户给予回应", details: "Testing Card Details", status: "In progress"}, {
                    title: "引导客户访问社区，关闭工单",
                    details: "Testing Card Details",
                    status: "In progress"
                }], items2: []
            };
            e.url = "http://www.ewei.com/link2151";
            e.getTextToCopy = function (e) {
                return e
            };
            e.showMsg = function (e) {
                r.add(n("translate")(e), "success", "right", 1e3)
            };
            e.sortableOptions = {containment: "#sortable-container"}
        }]
    }).state("ui.gongdanm1", {
        url: "/gongdanm1",
        templateUrl: "source/views/ui/ui.gongdanm1.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment()
        }]
    }).state("ui.biansla", {
        url: "/biansla",
        templateUrl: "source/views/ui/ui.biansla.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment()
        }]
    }).state("ui.bianautomation", {
        url: "/bianautomation",
        templateUrl: "source/views/ui/ui.bianautomation.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (l, e, t, i, r) {
            l.allCondition = [];
            l.allConditionOptionValue = [{id: 1, name: "工单:状态", type: "state"}, {
                id: 2,
                name: "工单:类型",
                type: "automation_type"
            }, {id: 3, name: "工单:优先级", type: "priority"}, {id: 4, name: "工单:服务目录", type: "serviceCatalog"}, {
                id: 5,
                name: "工单:处理人",
                type: "engineer"
            }, {id: 6, name: "工单:客服组", type: "serviceDesk"}, {id: 7, name: "工单:客户", type: "client"}, {
                id: 8,
                name: "工单:客户组",
                type: "customerGroup"
            }, {id: 9, name: "工单:标签", type: "label"}, {id: 10, name: "工单:描述", type: "describe"}, {
                id: 11,
                name: "工单:渠道",
                type: "ditch"
            }, {id: 12, name: "工单:入口", type: "entrance"}, {id: 13, name: "工单:服务评价", type: "serviceEvaluation"}, {
                id: 14,
                name: "工单:创建以来小时数",
                type: "creationTime"
            }, {id: 15, name: "工单:处理中以来小时数", type: "disposeingTime"}, {
                id: 16,
                name: "工单:暂停以来小时数",
                type: "pauseTime"
            }, {id: 17, name: "工单:处理完毕以来小时数", type: "disposedTime"}, {
                id: 18,
                name: "工单:关闭以来小时数",
                type: "closeTime"
            }, {id: 19, name: "工单:分派以来小时数", type: "assignTime"}, {
                id: 20,
                name: "工单:最后回复以来小时数",
                type: "lastReplyTime"
            }, {id: 21, name: "工单:客户最后回复以来小时数", type: "clientLastReplyTime"}, {
                id: 23,
                name: "工单:客服最后回复以来小时数",
                type: "serviceLastReplyTime"
            }, {id: 23, name: "工单:超SLA处理时长指标天数", type: "moreSlaDisposeTime"}, {
                id: 24,
                name: "工单:距SLA处理时长指标剩余天数",
                type: "surplusSlaDisposeTime"
            }];
            l.anyConditionOptionValue = [{id: 1, name: "工单:状态", type: "no_select"}, {
                id: 2,
                name: "工单:类型",
                type: "no_select"
            }, {id: 3, name: "工单:优先级", type: "no_select"}, {id: 4, name: "工单:服务目录", type: "no_select"}, {
                id: 5,
                name: "工单:处理人",
                type: "no_select"
            }, {id: 6, name: "工单:客服组", type: "no_select"}, {id: 7, name: "工单:客户", type: "no_select"}, {
                id: 8,
                name: "工单:客户组",
                type: "no_select"
            }, {id: 9, name: "工单:标签", type: "no_select"}, {id: 10, name: "工单:描述", type: "no_select"}, {
                id: 11,
                name: "工单:渠道",
                type: "no_select"
            }, {id: 12, name: "工单:入口", type: "no_select"}, {id: 13, name: "工单:服务评价", type: "no_select"}];
            l.executeValue = [{id: 1, name: "工单:状态", type: "no_select"}, {
                id: 2,
                name: "工单:类型",
                type: "no_select"
            }, {id: 3, name: "工单:优先级", type: "no_select"}, {id: 4, name: "工单:服务目录", type: "no_select"}, {
                id: 5,
                name: "工单:处理人",
                type: "no_select"
            }, {id: 6, name: "工单:客服组", type: "no_select"}, {id: 7, name: "工单:添加标签", type: "no_select"}, {
                id: 8,
                name: "工单:删除标签",
                type: "no_select"
            }, {id: 9, name: "工单:更改标签", type: "no_select"}, {id: 10, name: "工单:添加抄送", type: "no_select"}, {
                id: 11,
                name: "工单:个人",
                type: "no_select"
            }, {id: 12, name: "工单:组", type: "no_select"}, {id: 13, name: "工单:服务评价", type: "no_select"}];
            l.addAllCondition = function () {
                var e = l.allCondition;
                var t = [];
                for (var i = 0, r = l.allConditionOptionValue.length; i < r; i++) {
                    var n = false;
                    for (var a = 0, o = e.length; a < o; a++) {
                        if (e[a].id == l.allConditionOptionValue[i].id) {
                            n = true;
                            break
                        }
                    }
                    if (!n) {
                        t.push(l.allConditionOptionValue[i])
                    }
                }
                var s = {id: "", options: t};
                l.allCondition.push(s)
            };
            l.deleteAllCondition = function (e) {
                l.allCondition.splice(e, 1)
            };
            l.changeCondition = function (e) {
                if (l.allCondition[e].id == 1 || l.allCondition[e].id == 3) {
                    l.allConditionScopeValue = [{id: 1, name: "是"}, {id: 2, name: "不是"}, {id: 3, name: "大于"}, {
                        id: 4,
                        name: "小于"
                    }]
                } else if (l.allCondition[e].id == 9) {
                    l.allConditionScopeValue = [{id: 1, name: "包含以下中的至少一个"}, {id: 2, name: "包含有下列的"}]
                } else if (l.allCondition[e].id == 10) {
                    l.allConditionScopeValue = [{id: 1, name: "包含以下任何一个字词"}, {id: 2, name: "不包含以下任何一个字词"}, {
                        id: 3,
                        name: "包含以下字符串"
                    }, {id: 4, name: "不包含以下字符串"}]
                } else if (l.allCondition[e].id > 11) {
                    l.allConditionScopeValue = [{id: 1, name: "是"}, {id: 2, name: "不是"}, {id: 3, name: "大于"}]
                } else {
                    l.allConditionScopeValue = [{id: 1, name: "是"}, {id: 2, name: "不是"}]
                }
                if (l.allCondition[e].id == 1) {
                    l.allConditionTypeValue = [{id: 1, name: "新建的"}, {id: 2, name: "处理中"}, {id: 3, name: "暂停"}, {
                        id: 4,
                        name: "处理完毕"
                    }, {id: 5, name: "关闭"}]
                } else if (l.allCondition[e].id == 2) {
                    l.allConditionTypeValue = [{id: 1, name: "问题"}, {id: 2, name: "事件"}, {id: 4, name: "难题"}, {
                        id: 5,
                        name: "任务"
                    }]
                } else if (l.allCondition[e].id == 3) {
                    l.allConditionTypeValue = [{id: 1, name: "低级"}, {id: 2, name: "正常"}, {id: 3, name: "高级"}, {
                        id: 4,
                        name: "紧急"
                    }]
                }
            }
        }]
    }).state("ui.shangyesla", {
        url: "/shangyesla",
        templateUrl: "source/views/ui/ui.shangyesla.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment()
        }]
    }).state("ui.angul", {
        url: "/angul",
        templateUrl: "source/views/ui/ui.angul.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment()
        }]
    }).state("ui.geren", {
        url: "/geren",
        templateUrl: "source/views/ui/ui.geren.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment()
        }]
    }).state("ui.szhanghao", {
        url: "/szhanghao",
        templateUrl: "source/views/ui/ui.szhanghao.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment()
        }]
    }).state("ui.Customer", {
        url: "/Customer",
        templateUrl: "source/views/ui/ui.Customer.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment()
        }]
    }).state("ui.jiaose", {
        url: "/jiaose",
        templateUrl: "source/views/ui/ui.jiaose.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment()
        }]
    }).state("ui.visit", {
        url: "/visit",
        templateUrl: "source/views/ui/ui.visit.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment()
        }]
    }).state("ui.Accountlogin", {
        url: "/Accountlogin",
        templateUrl: "source/views/ui/ui.Accountlogin.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment();
            $(document).ready(function () {
                $(".J_add").click(function () {
                    var e = $(this).parent().parent().prev().html();
                    var t = $(this).parent().parent().prev().after("<tr class='after_tr'></tr>");
                    var t = $(".after_tr");
                    t.html(e);
                    t.find(".J_add").addClass("J_del").removeClass("J_add").text("-");
                    $(".J_del").live("click", function () {
                        $(this).parents("tr").remove()
                    })
                })
            })
        }]
    }).state("ui.Community", {
        url: "/Community",
        templateUrl: "source/views/ui/ui.Community.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment()
        }]
    }).state("ui.tellemail", {
        url: "/tellemail",
        templateUrl: "source/views/ui/ui.tellemail.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment()
        }]
    }).state("ui.Redeem-free-license-code", {
        url: "/Redeem-free-license-code",
        templateUrl: "source/views/ui/ui.Redeem-free-license-code.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment()
        }]
    }).state("ui.The-binding-member-account", {
        url: "/The-binding-member-account",
        templateUrl: "source/views/ui/ui.The-binding-member-account.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment()
        }]
    }).state("ui.tijiao", {
        url: "/tijiao",
        templateUrl: "source/views/ui/ui.tijiao.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment();
            $(document).ready(function () {
                $(".J_add").click(function () {
                    var e = $(this).parent().parent().prev().html();
                    var t = $(this).parent().parent().prev().after("<tr class='after_tr'></tr>");
                    var t = $(".after_tr");
                    t.html(e);
                    t.find(".J_add").addClass("J_del").removeClass("J_add").text("-");
                    $(".J_del").live("click", function () {
                        $(this).parents("tr").remove()
                    })
                })
            })
        }]
    }).state("ui.special", {
        url: "/special",
        templateUrl: "source/views/ui/ui.special.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment();
            $(document).ready(function () {
                $(".J_add").click(function () {
                    var e = $(this).parent().parent().prev().html();
                    var t = $(this).parent().parent().prev().after("<tr class='after_tr'></tr>");
                    var t = $(".after_tr");
                    t.html(e);
                    t.find(".J_add").addClass("J_del").removeClass("J_add").text("-");
                    $(".J_del").live("click", function () {
                        $(this).parents("tr").remove()
                    })
                })
            })
        }]
    }).state("ui.bianjiaose", {
        url: "/bianjiaose",
        templateUrl: "source/views/ui/ui.bianjiaose.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment()
        }]
    }).state("ui.api", {
        url: "/api",
        templateUrl: "source/views/ui/ui.api.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment()
        }]
    }).state("ui.Authorization-plan", {
        url: "/Authorization-plan",
        templateUrl: "source/views/ui/ui.Authorization-plan.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment()
        }]
    }).state("ui.Online-purchase", {
        url: "/Online-purchase",
        templateUrl: "source/views/ui/ui.Online-purchase.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment()
        }]
    }).state("ui.Application-market", {
        url: "/Application-market",
        templateUrl: "source/views/ui/ui.Application-market.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment()
        }]
    }).state("ui.Community-integration", {
        url: "/Community-integration",
        templateUrl: "source/views/ui/ui.Community-integration.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment()
        }]
    }).state("ui.ewcommunity-integration", {
        url: "/ewcommunity-integration",
        templateUrl: "source/views/ui/ui.ewcommunity-integration.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment()
        }]
    }).state("ui.yuanchengkehu", {
        url: "/yuanchengkehu",
        templateUrl: "source/views/ui/ui.yuanchengkehu.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment()
        }]
    }).state("ui.SugarCRM", {
        url: "/SugarCRM",
        templateUrl: "source/views/ui/ui.SugarCRM.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment()
        }]
    }).state("ui.Installation-details", {
        url: "/Installation-details",
        templateUrl: "source/views/ui/ui.Installation-details.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment()
        }]
    }).state("ui.Application-details", {
        url: "/Application-details",
        templateUrl: "source/views/ui/ui.Application-details.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment()
        }]
    }).state("ui.ewApplication-details", {
        url: "/ewApplication-details",
        templateUrl: "source/views/ui/ui.ewApplication-details.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment()
        }]
    }).state("ui.domain-name1", {
        url: "/domain-name1",
        templateUrl: "source/views/ui/ui.domain-name1.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment()
        }]
    }).state("ui.Submit", {
        url: "/Submit",
        templateUrl: "source/views/ui/ui.Submit.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment()
        }]
    }).state("ui.title", {
        url: "/title",
        templateUrl: "source/views/ui/ui.title.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment();
            $(document).ready(function () {
                $(".J_add").click(function () {
                    var e = $(this).parent().parent().prev().html();
                    var t = $(this).parent().parent().prev().after("<tr class='after_tr'></tr>");
                    var t = $(".after_tr");
                    t.html(e);
                    t.find(".J_add").addClass("J_del").removeClass("J_add").text("-");
                    $(".J_del").live("click", function () {
                        $(this).parents("tr").remove()
                    })
                })
            })
        }]
    }).state("ui.Integral", {
        url: "/Integral",
        templateUrl: "source/views/ui/ui.Integral.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment()
        }]
    }).state("ui.onlinefieldface", {
        url: "/onlinefieldface",
        templateUrl: "source/views/ui/ui.onlinefieldface.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment()
        }]
    }).state("ui.registerdaily", {
        url: "/registerdaily",
        templateUrl: "source/views/ui/ui.registerdaily.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment()
        }]
    }).state("ui.group", {
        url: "/group",
        templateUrl: "source/views/ui/ui.group.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment()
        }]
    }).state("ui.h-gongdan1", {
        url: "/h-gongdan1",
        templateUrl: "source/views/ui/ui.ui.h-gongdan1.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment()
        }]
    }).state("ui.ticketChatWithRemoteAssistance", {
        url: "/ticketChatWithRemoteAssistance",
        templateUrl: "source/views/ui/ui.ticketChatWithRemoteAssistance.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
            n.addPart("ticket");
            e.radioReply = "Public";
            e.radioContent = "All";
            $(".chat img").imgsPretreatment()
        }]
    }).state("ui.loadingBar", {
        url: "/loadingBar",
        templateUrl: "source/views/ui/ui.loadingBar.html",
        controller: ["$scope", "$http", "$timeout", "cfpLoadingBar", function (i, e, t, r) {
            i.posts = [];
            i.section = null;
            i.subreddit = null;
            i.subreddits = ["cats", "pics", "funny", "gaming", "AdviceAnimals", "aww"];
            var n = function () {
                var e = i.subreddits[Math.floor(Math.random() * i.subreddits.length)];
                if (e == i.subreddit) {
                    return n()
                }
                return e
            };
            i.fetch = function () {
                i.subreddit = n();
                e.jsonp("http://www.reddit.com/r/" + i.subreddit + ".json?limit=100&jsonp=JSON_CALLBACK").success(function (e) {
                    var t = e.data.children.slice(0, 5);
                    i.posts = t
                })
            };
            i.start = function () {
                r.start()
            };
            i.complete = function () {
                r.complete()
            };
            i.start();
            i.fakeIntro = true;
            t(function () {
                i.complete();
                i.fakeIntro = false
            }, 1250);
            prettyPrint()
        }]
    }).state("ui.whhg", {
        url: "/whhg",
        templateUrl: "source/lib/bootstrap/whhg-font/example.html",
        controller: ["$scope", "$state", "utils", "alertService", function (e, t, i, r) {
        }]
    }).state("ui.scrollTo", {
        url: "/scrollTo",
        templateUrl: "source/views/ui/ui.scrollto.html",
        controller: ["$scope", "$state", "utils", "alertService", function (e, t, i, r) {
            e.names = ["igor", "misko", "vojta"]
        }]
    }).state("ui.ticketCreateView", {
        url: "/ticketCreateView",
        templateUrl: "source/views/ui/ui.ticketCreateView.html",
        controller: ["$scope", "$state", "utils", "alertService", "$filter", function (e, t, i, r, n) {
            var a;
            e.itemsList = {
                items1: [{title: "ID", details: "其他参数", status: "In progress"}, {
                    title: "标题",
                    details: "Testing Card Details",
                    status: "In progress"
                }, {title: "状态", details: "Testing Card Details", status: "In progress"}, {
                    title: "SLA",
                    details: "Testing Card Details",
                    status: "In progress"
                }, {title: "创建人", details: "Testing Card Details", status: "In progress"}, {
                    title: "处理人",
                    details: "Testing Card Details",
                    status: "In progress"
                }, {title: "创建时间", details: "Testing Card Details", status: "In progress"}, {
                    title: "结束时间",
                    details: "Testing Card Details",
                    status: "In progress"
                }], items2: []
            };
            e.url = "http://www.ewei.com/link2151";
            e.getTextToCopy = function (e) {
                return e
            };
            e.showMsg = function (e) {
                r.add(n("translate")(e), "success", "right", 1e3)
            };
            e.sortableOptions = {containment: "#sortable-container"}
        }]
    }).state("ui.headerConfig", {
        url: "/headerConfig",
        templateUrl: "source/views/ui/ui.headerConfig.html",
        controller: ["$scope", "$rootScope", "$state", "utils", "alertService", function (e, t, i, r, n) {
            e.set1 = function () {
                t.provider = {
                    name: "易维帮助台服务管理中心默认配色",
                    fontSize: 14,
                    logo: "source/images/sn-logo@2x.png",
                    bgColor: "#5f3cb0",
                    tabColor: "#ff8000",
                    color: "#FFFFFF"
                }
            };
            e.set2 = function () {
                t.provider = {
                    name: "易维帮助台配色三",
                    fontSize: 16,
                    logo: "source/images/image-iso9.png",
                    bgColor: "#84ad31",
                    tabColor: "#d6e6ad",
                    color: "#406000"
                }
            };
            e.set3 = function () {
                t.provider = {
                    name: "易维帮助台配色一",
                    fontSize: 16,
                    logo: "source/images/avatar-male.jpg",
                    bgColor: "#212108",
                    tabColor: "#4a4229",
                    color: "#efe6bd"
                }
            };
            e.set4 = function () {
                t.provider = {
                    name: "易维配色四",
                    fontSize: 20,
                    logo: "source/images/se7en-logo@2x.png",
                    bgColor: "#f07091",
                    tabColor: "#f388a4",
                    color: "#FFFFFF"
                }
            }
        }]
    }).state("ui.tree", {
        url: "/tree",
        templateUrl: "source/views/ui/ui.tree.html",
        controller: ["$scope", "$state", "utils", "alertService", function (t, e, i, r) {
            t.treeOptions = {
                nodeChildren: "children",
                dirSelectable: false,
                injectClasses: {
                    ul: "",
                    li: "line_h25 fx-fade",
                    liSelected: "box02",
                    iExpanded: "fa fa-caret-down",
                    iCollapsed: "fa fa-caret-right",
                    iLeaf: "fa fa-folder-o margin_left20px",
                    label: "hoc74",
                    labelSelected: ""
                }
            };
            t.dataForTheTree = [{
                name: "Joe",
                age: "21",
                menu: false,
                children: [{name: "Smith1", age: "42", lock: true}, {
                    name: "Gary2",
                    age: "21",
                    lock: true
                }, {name: "Jenifer3", age: "23"}, {name: "Dani4", age: "32"}, {name: "Max5", age: "34"}]
            }, {
                name: "Albert",
                age: "33",
                children: [{name: "Smith6", age: "42", lock: true}, {
                    name: "Gary6",
                    age: "21",
                    lock: true
                }, {name: "Jenifer6", age: "23"}, {name: "Dani6", age: "32"}, {name: "Max6", age: "34"}]
            }, {
                name: "Ron",
                age: "29",
                children: [{name: "Smith7", age: "42", lock: true}, {
                    name: "Gary7",
                    age: "21",
                    lock: true
                }, {name: "Jenifer7", age: "23"}, {name: "Dani7", age: "32"}, {name: "Max7", age: "34"}]
            }];
            t.selected = t.dataForTheTree[0];
            t.expandedNodes = [t.dataForTheTree[1], t.dataForTheTree[2]];
            t.lastClicked = null;
            t.buttonClick = function (e, t) {
                void 0;
                e.stopPropagation()
            };
            t.showSelected = function (e) {
                t.lastClicked = e;
                void 0;
                t.selectedNode = e
            };
            t.mouseEnter = function (e) {
                e.menu = true
            };
            t.mouseLeave = function (e) {
                e.menu = false
            }
        }]
    }).state("ui.helper", {
        url: "/helper",
        templateUrl: "source/views/ui/ui.helper.html",
        controller: ["$scope", "$rootScope", "$state", "$sce", "$filter", "$translate", "$translatePartialLoader", function (e, t, i, r, n, a, o) {
            o.addPart("ticket");
            a.refresh();
            t.$on("$translateChangeSuccess", function () {
                e.helper = {
                    title: n("translate")(i.current.name + "_HELPER_TITLE"),
                    content: n("translate")(i.current.name + "_HELPER_DESCRIPTION"),
                    video: {active: false, disabled: false, content: "这里插入视频代码"},
                    reference: {
                        active: true,
                        disabled: false,
                        lists: [{
                            title: "如何添加IT工程师或客服人员账户？",
                            url: "http://www.infocare.cn/helpdesk/article_31329"
                        }, {title: "如何将客户帮助中心作为现有网站的一部分？", url: "http://www.infocare.cn/helpdesk/article_129428"}]
                    }
                }
            })
        }]
    }).state("ui.iframe", {
        url: "/:url", template: function (e) {
            return '<iframe class="w100p border0" style="height:99.5%" src="' + e.url + '"></iframe>'
        }
    }).state("ui.ty", {
        url: "/ty",
        templateUrl: "source/views/ui/ui.ty.html",
        controller: ["$scope", "$state", "utils", "alertService", "$translatePartialLoader", function (e, t, i, r, n) {
        }]
    })
}]);
var ModalDemoCtrl = function (i, r, n, e) {
    i.editProfile = function () {
        e.add("success", "<h4>成功！</h4> 你的个人资料已经修改。")
    };
    i.items = ["item1", "item2", "item3"];
    i.open = function (e) {
        var t = r.open({
            templateUrl: "myModalContent.html",
            controller: ModalInstanceCtrl,
            size: e,
            resolve: {
                items: function () {
                    return i.items
                }
            }
        });
        t.result.then(function (e) {
            i.selected = e
        }, function () {
            n.info("Modal dismissed at: " + new Date)
        })
    }
};
var ModalInstanceCtrl = function (e, t, i) {
    e.items = i;
    e.selected = {item: e.items[0]};
    e.ok = function () {
        t.close(e.selected.item)
    };
    e.cancel = function () {
        t.dismiss("cancel")
    }
};
angular.module("eweiApp.ticket").config(["$stateProvider", "$urlRouterProvider", "lockerProvider", function (e, t, i) {
    i.defaults({driver: "session", namespace: "eweiApp.ticket", separator: ".", eventsEnabled: true, extend: {}});
    e.state("tickets", {
        url: "/tickets",
        templateUrl: "source/views/ticket/ticket.html",
        resolve: {},
        controller: ["$scope", "$state", "utils", function (e, t, i) {
        }]
    }).state("tickets_detail", {
        url: "/tickets/:id",
        templateUrl: "source/views/ticket/ticket.detail.html",
        controller: "ticketDetailController",
        params: {viewId: null, page: null, nextOrPre: null, from: null},
        resolve: {
            ticket: ["$stateParams", function (e) {
                return {id: e.id, subject: "...", createdAt: "2016-06-30 14:25:34"}
            }], webchat: function () {
                return null
            }, cachedTicket: ["locker", "$stateParams", function (e, t) {
                var i = e.get(t.id);
                if (!angular.isObject(i)) {
                    i = {}
                }
                return i
            }]
        },
        onEnter: ["coreModelService", "$state", "$rootScope", "$stateParams", "ConsoleConfig", function (e, t, i, r, n) {
            e.config.route.put("ticket.from", t.current.name);
            i.$broadcast("subscribe", "/provider/" + n.provider.id + "/ticket/" + r.id)
        }],
        onExit: ["cachedTicket", "locker", "$rootScope", "$stateParams", "ConsoleConfig", function (e, t, i, r, n) {
            i.$broadcast("unsubscribe", "/provider/" + n.provider.id + "/ticket/" + r.id);
            try {
                if (e.noSave && e.noSave === true) {
                    t.forget(r.id);
                    t.driver("session").namespace("eweiApp.chat").put(r.id, html)
                } else if (e.ticket && (e.ticket.content != undefined || e.ticket.attachments.length > 0)) {
                    t.put(r.id, e)
                }
            } catch (e) {
            }
        }]
    }).state("tickets_detail.apps", {
        views: {
            "@tickets_detail": {
                templateUrl: "source/views/ticket/apps.html",
                controller: "appsController"
            }
        }
    }).state("tickets_detail.assist", {
        resolve: {
            userOnlineStatus: ["$rootScope", "$stateParams", "$http", "$q", function (e, t, i, r) {
                var n = {webOnline: false, appOnline: false};
                var a = r.defer();
                i.get("get_user_online_status_by_userid.json?userId=" + e.assistUser.id + "&ticketId=" + t.id).success(function (e) {
                    if (e.success) {
                        if (e.json != null) {
                            n = {
                                webOnline: e.json.webOnline == null ? false : true,
                                appOnline: e.json.appOnline == null ? false : true
                            }
                        }
                    }
                    a.resolve(n)
                });
                return a.promise
            }]
        },
        views: {
            "@tickets_detail": {
                templateUrl: "source/views/ticket/apps.assist.html",
                controller: "assistController"
            }
        }
    }).state("tickets_detail.engineers", {
        views: {
            "@tickets_detail": {
                templateUrl: "source/views/ticket/apps.engineer_list.html",
                controller: "engineerListAndOnlineController"
            }
        }
    }).state("requester_tickets_detail", {
        url: "/tickets/:id/requester",
        templateUrl: "source/views/customer/customer.detail.html",
        params: {ticket: null},
        controller: "customerDetailController"
    }).state("requester_tickets_detail.tickets", {
        url: "/tickets/:status/",
        views: {
            "@requester_tickets_detail": {
                templateUrl: "source/views/customer/customer.detail.tickets.html",
                controller: "customerDetailTicketsController"
            }
        }
    }).state("requester_tickets_detail.requester_tickets_help_center_footprints", {
        url: "/help_center_footprints",
        views: {
            "@requester_tickets_detail": {
                templateUrl: "source/views/customer/customer.detail.help_center_footprints.html",
                controller: "requesterTicketsHelpCenterFootprintsController"
            }
        }
    }).state("requester_tickets_detail.requester_tickets_chat_logs", {
        url: "/chat_logs",
        views: {
            "@requester_tickets_detail": {
                templateUrl: "source/views/customer/customer.detail.chat_logs.html",
                controller: "requesterTicketsChatLogsController"
            }
        }
    }).state("user_group_requester_tickets_detail", {
        url: "/tickets/:id/requester/group",
        params: {ticket: null},
        templateUrl: "source/views/customer/user_group.detail.html",
        controller: "userGroupDetailController"
    }).state("user_group_requester_tickets_detail.tickets", {
        url: "/tickets/:status",
        views: {
            "@user_group_requester_tickets_detail": {
                templateUrl: "source/views/customer/customer.detail.tickets.html",
                controller: "customerDetailTicketsController"
            }
        }
    }).state("user_group_requester_tickets_detail.customers", {
        url: "/customer",
        views: {
            "@user_group_requester_tickets_detail": {
                templateUrl: "source/views/customer/user_group.detail.customers.html",
                controller: "userGroupDetailCustomersController"
            }
        }
    }).state("user_group_requester_tickets_detail.sla", {
        url: "/sla",
        views: {
            "@user_group_requester_tickets_detail": {
                templateUrl: "source/views/customer/user_group.detail.sla.html",
                controller: "userGroupDetailSlaController"
            }
        },
        params: {userGroup: []}
    }).state("tickets_new", {
        url: "/tickets/new/{id:[0-9]{1,4}}",
        templateUrl: "source/views/ticket/ticket-create.html",
        controller: "createNewTicketController",
        permission: "ticket_create"
    }).state("tickets_new.normal", {
        url: "/ticket/:type",
        templateUrl: "source/views/ticket/ticket.new.html",
        controller: "newTicketController",
        resolve: {
            cachedTicket: ["locker", "$stateParams", function (e, t) {
                var i = e.driver("session").namespace("eweiApp.ticket.new").get(t.id);
                if (!angular.isObject(i)) {
                    i = {}
                }
                return i
            }]
        },
        onExit: ["cachedTicket", "locker", "$stateParams", function (e, t, i) {
            try {
                if (e.noSave && e.noSave === true) {
                    t.driver("session").namespace("eweiApp.ticket.new").forget(i.id);
                    t.driver("session").namespace("eweiApp.chat").put(i.id, html)
                } else {
                    t.driver("session").namespace("eweiApp.ticket.new").put(i.id, e)
                }
            } catch (e) {
            }
        }],
        permission: "ticket_create",
        params: {from: null, categoryid: null, projectid: null}
    }).state("tickets_new.batch", {
        url: "/batch",
        templateUrl: "source/batch-create-ticket/template/batch-create-ticket.html",
        controller: "batchCreateTicketController",
        permission: "batch_ticket_create",
        params: {type: "batch-ticket"}
    }).state("tickets_new.plan_list", {
        url: "/plan_list",
        templateUrl: "source/batch-create-ticket/template/ticket-plan-list.html",
        controller: "batchCreateTicketPlanListController",
        permission: "batch_ticket_create",
        params: {type: "plan-ticket"}
    }).state("tickets_new.plan", {
        url: "/plan",
        templateUrl: "source/batch-create-ticket/template/ticket-new-plan.html",
        controller: "batchCreateTicketNewPlanController",
        permission: "batch_ticket_create",
        resolve: {
            cachedTicket: ["locker", "$stateParams", function (e, t) {
                var i = e.driver("session").namespace("eweiApp.ticket.new.plan").get(t.id);
                if (!angular.isObject(i)) {
                    i = {}
                }
                return i
            }]
        },
        onExit: ["cachedTicket", "locker", "$stateParams", function (e, t, i) {
            try {
                if (e.noSave && e.noSave === true) {
                    t.driver("session").namespace("eweiApp.ticket.new.plan").forget(i.id);
                    t.driver("session").namespace("eweiApp.chat").forget(i.id)
                } else {
                    t.driver("session").namespace("eweiApp.ticket.new.plan").put(i.id, e)
                }
            } catch (e) {
            }
        }],
        params: {type: "plan-ticket"},
        onEnter: ["$state", "$stateParams", "coreModelService", function (e, t, i) {
            i.config.route.put("tickets_new_" + t.id, {name: this.name, params: t})
        }]
    }).state("tickets_new.plan_edit", {
        url: "/plan/:planuid?clone",
        templateUrl: "source/batch-create-ticket/template/ticket-new-plan.html",
        controller: "batchCreateTicketNewPlanController",
        resolve: {
            cachedTicket: ["locker", "$stateParams", function (e, t) {
                var i = e.driver("session").namespace("eweiApp.ticket.edit.plan").get(t.planuid);
                if (!angular.isObject(i)) {
                    i = {}
                }
                return i
            }]
        },
        permission: "batch_ticket_create",
        onExit: ["cachedTicket", "locker", "$stateParams", function (e, t, i) {
            try {
                t.driver("session").namespace("eweiApp.chat").forget(i.id);
                if (e.noSave && e.noSave === true) {
                    t.driver("session").namespace("eweiApp.ticket.edit.plan").forget(i.planuid)
                } else {
                    t.driver("session").namespace("eweiApp.ticket.edit.plan").put(i.planuid, e)
                }
            } catch (e) {
            }
        }],
        params: {type: "plan-ticket"},
        onEnter: ["$state", "$stateParams", "coreModelService", function (e, t, i) {
            i.config.route.put("tickets_new_" + t.id, {name: this.name, params: t})
        }]
    }).state("ticket_views", {
        url: "/ticket/views",
        templateUrl: "source/views/ticket/view.html",
        controller: "viewListByTicketController"
    }).state("ticket_views.detail", {
        url: "/:id",
        templateUrl: "source/views/ticket/view.detail.html",
        controller: "viewTicketListController",
        onEnter: ["$state", "$stateParams", "coreModelService", function (e, t, i) {
            i.config.route.put("ticket_views.detail", {name: this.name, params: t})
        }]
    }).state("webchats_new2", {
        url: "/webchats2/{id}",
        templateUrl: "source/views/ticket/apps.helpdesk2.html",
        controller: "webchatController2",
        onEnter: ["$rootScope", "$stateParams", "ConsoleConfig", function (e, t, i) {
            e.$broadcast("subscribe", "/provider/" + i.provider.id + "/chat/" + t.id)
        }],
        onExit: ["$rootScope", "$stateParams", "ConsoleConfig", function (e, t, i) {
            e.$broadcast("unsubscribe", "/provider/" + i.provider.id + "/chat/" + t.id)
        }]
    }).state("webchat_ticket_detail", {
        url: "/webchat/:id/ticket/:ticketId",
        templateUrl: "source/views/ticket/ticket.detail.html",
        controller: "ticketDetailController",
        resolve: {
            automation: ["automationService", function (e) {
                return null
            }], ticket: ["$stateParams", function (e) {
                return {id: e.ticketId, subject: "...", createdAt: "2016-06-30 14:25:34"}
            }], cachedTicket: ["locker", "$stateParams", function (e, t) {
                var i = e.get(t.id);
                if (!angular.isObject(i)) {
                    i = {}
                }
                return i
            }]
        },
        onEnter: ["$rootScope", "$stateParams", "ConsoleConfig", function (e, t, i) {
            e.$broadcast("subscribe", "/provider/" + i.provider.id + "/ticket/" + t.ticketId)
        }],
        onExit: ["cachedTicket", "locker", "$rootScope", "$stateParams", "ConsoleConfig", function (e, t, i, r, n) {
            i.$broadcast("unsubscribe", "/provider/" + n.provider.id + "/ticket/" + r.ticketId);
            if (e.noSave && e.noSave === true) {
                t.forget(r.id)
            } else {
                t.put(r.id, e)
            }
        }]
    }).state("webchat_requester_detail", {
        url: "/webchat/:id/requester",
        templateUrl: "source/views/customer/customer.detail.html",
        controller: "customerDetailController"
    }).state("webchat_requester_detail.tickets", {
        url: "/webchat/:status/",
        views: {
            "@webchat_requester_detail": {
                templateUrl: "source/views/customer/customer.detail.tickets.html",
                controller: "customerDetailTicketsController"
            }
        }
    }).state("webchat_requester_detail.requester_webchat_help_center_footprints", {
        url: "/webchat_help_center_footprints",
        views: {
            "@webchat_requester_detail": {
                templateUrl: "source/views/customer/customer.detail.help_center_footprints.html",
                controller: "requesterTicketsHelpCenterFootprintsController"
            }
        }
    }).state("webchat_requester_detail.requester_webchat_chat_logs", {
        url: "/webchat_chat_logs",
        views: {
            "@webchat_requester_detail": {
                templateUrl: "source/views/customer/customer.detail.chat_logs.html",
                controller: "requesterTicketsChatLogsController"
            }
        }
    }).state("webchat_user_group_detail", {
        url: "/webchats/:id/requester/group",
        templateUrl: "source/views/customer/user_group.detail.html",
        controller: "userGroupDetailController"
    }).state("webchat_user_group_detail.tickets", {
        url: "/webchat_tickets/:status",
        views: {
            "@webchat_user_group_detail": {
                templateUrl: "source/views/customer/customer.detail.tickets.html",
                controller: "customerDetailTicketsController"
            }
        }
    }).state("webchat_user_group_detail.customers", {
        url: "/webchat_customer",
        views: {
            "@webchat_user_group_detail": {
                templateUrl: "source/views/customer/user_group.detail.customers.html",
                controller: "userGroupDetailCustomersController"
            }
        }
    }).state("webchat_user_group_detail.sla", {
        url: "/webchat_customer",
        views: {
            "@webchat_user_group_detail": {
                templateUrl: "source/views/customer/user_group.detail.sla.html",
                controller: "userGroupDetailSlaController"
            }
        },
        params: {userGroup: []}
    })
}]);
(function () {
    "use strict";
    angular.module("eweiApp.account", ["angular-locker"]).config(["$stateProvider", "$urlRouterProvider", "lockerProvider", function (e, t, i) {
        i.defaults({driver: "session", namespace: "eweiApp.account", separator: ".", eventsEnabled: true, extend: {}});
        e.state("customers", {
            url: "/customers",
            templateUrl: "source/views/customer/customer.html"
        }).state("customers_detail", {
            url: "/customers/:id",
            templateUrl: "source/views/customer/customer.detail.html",
            controller: "customerDetailController",
            params: {viewAccountList: []},
            resolve: {
                onEnter: ["coreModelService", "$state", function (e, t) {
                    e.config.route.put("user.from", t.current.name)
                }]
            }
        }).state("customers_detail.tickets", {
            url: "/tickets/:status",
            views: {
                "@customers_detail": {
                    templateUrl: "source/views/customer/customer.detail.tickets.html",
                    controller: "customerDetailTicketsController"
                }
            }
        }).state("customers_detail.help_center_footprints", {
            url: "/help_center_footprints",
            views: {
                "@customers_detail": {
                    templateUrl: "source/views/customer/customer.detail.help_center_footprints.html",
                    controller: "helpCenterFootprintsController"
                }
            }
        }).state("customers_detail.chat_logs", {
            url: "/chat_logs",
            views: {
                "@customers_detail": {
                    templateUrl: "source/views/customer/customer.detail.chat_logs.html",
                    controller: "chatLogsController"
                }
            }
        }).state("user_group_customers_detail", {
            url: "/customers/:id/group",
            templateUrl: "source/views/customer/user_group.detail.html",
            controller: "userGroupDetailController"
        }).state("user_group_customers_detail.tickets", {
            url: "/tickets/:status",
            views: {
                "@user_group_customers_detail": {
                    templateUrl: "source/views/customer/customer.detail.tickets.html",
                    controller: "customerDetailTicketsController"
                }
            }
        }).state("user_group_customers_detail.customers", {
            url: "/customer",
            views: {
                "@user_group_customers_detail": {
                    templateUrl: "source/views/customer/user_group.detail.customers.html",
                    controller: "userGroupDetailCustomersController"
                }
            }
        }).state("user_group_customers_detail.sla", {
            url: "/customer",
            views: {
                "@user_group_customers_detail": {
                    templateUrl: "source/views/customer/user_group.detail.sla.html",
                    controller: "userGroupDetailSlaController"
                }
            },
            params: {userGroup: []}
        }).state("customer_views", {
            url: "/customer_views",
            templateUrl: "source/views/customer/customer_views.html",
            controller: "viewListByCustomerController"
        }).state("customer_views.detail", {
            url: "/:type/:id", templateUrl: function (e) {
                if (e.type == "user") {
                    return "source/views/customer/customer.list.html"
                } else if (e.type == "userGroup") {
                    return "source/views/customer/user_group.list.html"
                }
            }, controllerProvider: ["$stateParams", function (e) {
                if (e.type == "user") {
                    return "viewCustomerListController"
                } else if (e.type == "userGroup") {
                    return "viewUserGroupListController"
                }
            }], resolve: {
                onEnter: ["$state", "$stateParams", "coreModelService", function (e, t, i) {
                    i.config.route.put("customer_views.detail", {name: this.name, params: t})
                }]
            }
        }).state("user_groups_detail", {
            url: "/user_groups/:id",
            templateUrl: "source/views/customer/user_group.detail.html",
            controller: "userGroupDetailController",
            params: {viewUserGroupList: []},
            resolve: {
                onEnter: ["coreModelService", "$state", function (e, t) {
                    e.config.route.put("userGroup.from", t.current.name)
                }]
            }
        }).state("user_groups_detail.tickets", {
            url: "/tickets/:status",
            views: {
                "@user_groups_detail": {
                    templateUrl: "source/views/customer/customer.detail.tickets.html",
                    controller: "customerDetailTicketsController"
                }
            }
        }).state("user_groups_detail.customers", {
            url: "/customer",
            views: {
                "@user_groups_detail": {
                    templateUrl: "source/views/customer/user_group.detail.customers.html",
                    controller: "userGroupDetailCustomersController"
                }
            }
        }).state("user_groups_detail.sla", {
            url: "/sla",
            views: {
                "@user_groups_detail": {
                    templateUrl: "source/views/customer/user_group.detail.sla.html",
                    controller: "userGroupDetailSlaController"
                }
            },
            params: {userGroup: []}
        }).state("customer_setting", {
            url: "/customer_setting",
            templateUrl: "source/views/customer/setting.html",
            controller: "customerSettingController"
        }).state("customer_views.detail_system", {
            url: "/detail_system/:uri/:state", templateUrl: function (e) {
                if (e.uri == "stop_engineers" || e.uri == "wait_engineers") {
                    return "source/views/system_setting/setting.engineers.html"
                } else {
                    return "source/views/system_setting/setting." + e.uri + ".html"
                }
            }, controllerProvider: ["$stateParams", function (e) {
                if (e.uri == "stop_engineers" || e.uri == "wait_engineers") {
                    return "engineers_controller"
                } else {
                    return e.uri + "_controller"
                }
            }], resolve: {
                engineer_defaultRoles: ["roleService", function (e) {
                    return e.query({
                        _count: 999,
                        _do_count: false,
                        _fields: "id,name",
                        _filter: "{'$and':[{'$is_null':['provider.id']},{'$eq':{'type':'engineer'}},{'$eq':{'nameKey':'ROLE_NAME_CREATOR'}}]}"
                    }).$promise.then(function (e) {
                        return e.roles
                    })
                }], engineer_defineRoles: ["roleService", function (e) {
                    return e.query({
                        _count: 999,
                        _do_count: false,
                        _fields: "id,name,nameKey",
                        _filter: "{'$and':[{'$eq':{'provider.id':${current_provider_id}}},{'$eq':{'type':'engineer'}}]}"
                    }).$promise.then(function (e) {
                        return e.roles
                    })
                }]
            }, permission: function (e) {
                var t = e.uri;
                if (t == "my_account") {
                    return "system_setting_my_account"
                } else if (t == "company_account") {
                    return "system_setting_company_account"
                } else if (t == "roles") {
                    return "role_manage"
                } else if (t == "app_market" || t == "api") {
                    return "system_setting_app"
                } else if (t == "domain_setting" || t == "email_setting" || t == "tag_setting" || t == "location_setting" || t == "dynamic_content_setting" || t == "logo_setting") {
                    return "system_setting_personalized"
                } else if (t == "operation_log") {
                    return "system_setting_operation_log"
                } else {
                    return undefined
                }
            }
        }).state("customer_views.role_create", {
            url: "/roles/create",
            templateUrl: "source/views/system_setting/setting.role_edit.html",
            controller: "roleAddController",
            resolve: {
                customer_defaultRoles: ["roleService", function (e) {
                    return e.query({
                        _count: 999,
                        _do_count: false,
                        _fields: "id,name",
                        _filter: "{'$and':[{'$is_null':['provider.id']},{'$eq':{'type':'customer'}}]}"
                    }).$promise.then(function (e) {
                        return e.roles
                    })
                }]
            },
            permission: "role_manage"
        }).state("customer_views.role_edit", {
            url: "/roles/edit/:id/:type",
            templateUrl: "source/views/system_setting/setting.role_edit.html",
            controller: "roleUpdateController",
            resolve: {
                role: ["roleService", "$stateParams", function (e, t) {
                    return e.get({id: t.id, type: t.type}).$promise.then(function (e) {
                        if (e.success) {
                            return e.json
                        } else {
                            return []
                        }
                    })
                }], permissionses: ["permissionsService", "$stateParams", function (e, t) {
                    return e.query({roleId: t.id}).$promise.then(function (e) {
                        return e.json
                    })
                }], customer_defaultRoles: ["roleService", function (e) {
                    return e.query({
                        _count: 999,
                        _do_count: false,
                        _fields: "id,name",
                        _filter: "{'$and':[{'$is_null':['provider.id']},{'$eq':{'type':'customer'}}]}"
                    }).$promise.then(function (e) {
                        return e.roles
                    })
                }], accessScopes: ["accessScopeService", "$stateParams", function (e, t) {
                    return e.query({
                        _count: 999,
                        _do_count: false,
                        _fields: "type,scope",
                        _filter: "{'$eq':{'role.id':" + t.id + "}}"
                    }).$promise.then(function (e) {
                        return e.accessScopes
                    })
                }]
            },
            permission: "role_manage"
        }).state("customer_views.engineer_detail", {
            url: "/engineers/detail/:id/:state",
            templateUrl: "source/views/system_setting/setting.engineer_detail.html",
            controller: "engineer_add_controller",
            resolve: {
                engineer_defaultRoles: ["roleService", function (e) {
                    return e.query({
                        _count: 999,
                        _do_count: false,
                        _fields: "id,name",
                        _filter: "{'$and':[{'$is_null':['provider.id']},{'$eq':{'type':'engineer'}},{'$eq':{'nameKey':'ROLE_NAME_CREATOR'}}]}"
                    }).$promise.then(function (e) {
                        return e.roles
                    })
                }], engineer_defineRoles: ["roleService", function (e) {
                    return e.query({
                        _count: 999,
                        _do_count: false,
                        _fields: "id,name,nameKey",
                        _filter: "{'$and':[{'$eq':{'provider.id':${current_provider_id}}},{'$eq':{'type':'engineer'}}]}"
                    }).$promise.then(function (e) {
                        return e.roles
                    })
                }], customer_defaultRoles: ["roleService", function (e) {
                    return e.query({
                        _count: 999,
                        _do_count: false,
                        _fields: "id,name",
                        _filter: "{'$and':[{'$is_null':['provider.id']},{'$eq':{'type':'customer'}}]}"
                    }).$promise.then(function (e) {
                        return e.roles
                    })
                }], customer_defineRoles: ["roleService", function (e) {
                    return e.query({
                        _count: 999,
                        _do_count: false,
                        _fields: "id,name",
                        _filter: "{'$and':[{'$eq':{'provider.id':${current_provider_id}}},{'$eq':{'type':'customer'}}]}"
                    }).$promise.then(function (e) {
                        return e.roles
                    })
                }]
            }
        }).state("customer_views.service_desks_edit", {
            url: "/service_desks/:type/:id",
            templateUrl: "source/views/system_setting/setting.service_desks_edit.html",
            controller: "editServiceDesksController"
        })
    }])
})(angular);
angular.module("eweiApp.help_center", ["ui.ace"]).config(["$stateProvider", "$urlRouterProvider", function (e, t) {
    e.state("community", {
        url: "/community",
        templateUrl: "source/views/help_center/community.html",
        resolve: {},
        controller: "helpCenterController"
    }).state("community.detail", {
        url: "/:type/:id", templateUrl: function (e) {
            return "source/views/help_center/" + e.type + "_view_detail.htm"
        }, controllerProvider: ["$stateParams", function (e) {
            return e.type + "ViewDetailController"
        }], resolve: {
            onEnter: ["coreModelService", "$stateParams", function (e, t) {
                e.config.route.put("community.detail", {type: t.type, id: t.id})
            }]
        }
    }).state("helpcenter_setting", {
        url: "/helpcenter_setting",
        templateUrl: "source/views/help_center/setting.html",
        controller: "helpcenterSettingController"
    }).state("helpcenter_setting.detail", {
        url: "/:type", params: {item: ""}, templateUrl: function (e) {
            return "source/views/help_center/" + e.type + "_setting.htm"
        }, controllerProvider: ["$stateParams", function (e) {
            return "helpcenter" + e.type + "SettingController"
        }]
    }).state("help_editer", {
        url: "/help_editer",
        template: '<div ui-setting-html style="margin-left:360px;margin-top:42px;"></div>'
    })
}]);
var ModalDemoCtrl = function (i, r, n) {
    i.items = ["item1", "item2", "item3"];
    i.open = function (e) {
        var t = r.open({
            templateUrl: "myModalContent.html",
            controller: ModalInstanceCtrl,
            size: e,
            resolve: {
                items: function () {
                    return i.items
                }
            }
        });
        t.result.then(function (e) {
            i.selected = e
        }, function () {
            n.info("Modal dismissed at: " + new Date)
        })
    }
};
var ModalInstanceCtrl = function (e, t, i) {
    e.items = i;
    e.selected = {item: e.items[0]};
    e.ok = function () {
        t.close(e.selected.item)
    };
    e.cancel = function () {
        t.dismiss("cancel")
    }
};
(function () {
    "use strict";
    angular.module("eweiApp.system_setting", ["eweiApp.core"]).config(e).factory("routerConstant", t);
    e.$inject = ["$stateProvider", "$urlRouterProvider", "$filterProvider"];
    function e(e, t, i) {
        e.state("system_setting", {
            url: "/system_setting",
            templateUrl: "source/views/system_setting/system_setting.html",
            controller: "systemSettingController"
        }).state("system_setting.detail", {
            url: "/:settingType/:uri", templateUrl: function (e) {
                if (e.settingType && e.settingType == "ticket") {
                    if (e.uri === "assignment") {
                        return "source/system-setting/assignment/templates/assignment.html"
                    } else {
                        return "source/views/ticket/setting." + e.uri + ".html"
                    }
                } else if (e.settingType && e.settingType == "customer") {
                    return "source/views/customer/setting." + e.uri + ".html"
                } else if (e.settingType && e.settingType == "engineers") {
                    if (e.uri == "run_engineers" || e.uri == "stop_engineers" || e.uri == "wait_engineers") {
                        return "source/views/system_setting/setting.engineers.html"
                    } else {
                        return "source/views/system_setting/setting." + e.uri + ".html"
                    }
                } else if (e.settingType && e.settingType == "multi_channel") {
                    if (e.uri == "form_manager") {
                        return "source/system-setting/form-manager/templates/form-manager.html"
                    } else {
                        return "source/system-setting/channel-settings/channel-settings.html"
                    }
                } else if (e.settingType && e.settingType == "robot") {
                    if (e.uri == "robot-setting") {
                        return "source/system-setting/business-rule/robot-setting/robot-setting.html"
                    }
                } else if (e.settingType && e.settingType == "chat_settings") {
                    if (e.uri == "basic") {
                        return "source/system-setting/chat-settings/template/chat-basic-setting.html"
                    } else if (e.uri == "quality") {
                        return "source/system-setting/chat-settings/template/chat-quality-setting.html"
                    }
                } else if (e.settingType && e.settingType == "intelligent-robot") {
                    if (e.uri == "robot-setting") {
                        return "source/system-setting/intelligent-robot/template/robot-setting.html"
                    } else if (e.uri == "robot-knowledge") {
                        return "source/system-setting/intelligent-robot/template/robot-knowledge.html"
                    } else if (e.uri === "robot-unknown-knowledge") {
                        return "source/system-setting/intelligent-robot/template/robot-unknown-knowledge.html"
                    }
                } else {
                    void 0;
                    return "source/views/system_setting/setting." + e.uri + ".html"
                }
            }, onEnter: ["$state", "$stateParams", "coreModelService", function (e, t, i) {
                i.config.route.put("system-setting", {name: this.name, params: t})
            }], controllerProvider: ["$stateParams", function (e) {
                if (e.settingType && e.settingType == "ticket") {
                    if (e.uri == "add_ticket") {
                        return "helpcenterticketSettingController"
                    } else if (e.uri == "webchat_form") {
                        return "webchatFormListCtrl"
                    } else if (e.uri == "dingding_setting") {
                        return "dingdingListCtrl"
                    } else if (e.uri == "desktop_help") {
                        return "desktopHelpCtrl"
                    } else if (e.uri == "telephone_channels") {
                        return "telephoneChannelsListCtrl"
                    } else if (e.uri == "assignment") {
                        return "assignmentCtrl"
                    } else if (e.uri == "ticket_extend_form") {
                        return "ticketExtendFormCtrl"
                    } else if (e.uri == "triggerTask") {
                        return "triggerTaskSettingController"
                    } else {
                        return "ticketSettingDetailController"
                    }
                } else if (e.settingType && e.settingType == "customer") {
                    if (e.uri == "user_custom_field") {
                        return "userCustomFieldController"
                    } else if (e.uri == "user_group_custom_field") {
                        return "userGroupCustomFieldController"
                    } else if (e.uri == "external_url") {
                        return "externalUrlSecretController"
                    } else if (e.uri == "user_custom_view") {
                        return "userCustomViewController"
                    } else if (e.uri == "user_group_custom_view") {
                        return "userGroupCustomViewController"
                    }
                } else if (e.settingType && e.settingType == "engineers") {
                    if (e.uri == "stop_engineers" || e.uri == "wait_engineers" || e.uri == "run_engineers") {
                        return "engineers_controller"
                    } else {
                        return e.uri + "_controller"
                    }
                } else if (e.settingType && e.settingType == "multi_channel") {
                    if (e.uri == "form_manager") {
                        return "formManagerController"
                    } else if (e.uri == "channel_settings") {
                        return "channelSettingsController"
                    } else {
                        return e.uri + "_controller"
                    }
                } else if (e.settingType === "robot") {
                    return "systemBusinessRuleRobotController"
                } else if (e.settingType && e.settingType == "chat_settings") {
                    if (e.uri == "basic") {
                        return "chatBasicSettingsController"
                    } else if (e.uri == "quality") {
                        return "chatQualitySettingController"
                    }
                } else if (e.settingType === "intelligent-robot") {
                    if (e.uri == "robot-setting") {
                        return "robotSettingController"
                    } else if (e.uri == "robot-knowledge") {
                        return "robotKnowledgeController"
                    } else if (e.uri === "robot-unknown-knowledge") {
                        return "robotUnknownKnowledgeController"
                    }
                } else {
                    if (e.uri == "appearance" || e.uri == "footer") {
                        return "uiv2_controller"
                    } else if (e.uri == "layout") {
                        return "layout_Controller"
                    } else if (e.uri == "integral") {
                        return "helpcenterintegralSettingController"
                    } else {
                        void 0;
                        return e.uri + "_controller"
                    }
                }
            }], permission: function (e) {
                var t = e.uri;
                if (t == "my_account") {
                    return undefined
                } else if (t == "company_account") {
                    return ["system_setting_company_account", "system_setting_operation_log"]
                } else if (t == "app_market") {
                    return "system_setting_app_market"
                } else if (t == "domain_setting") {
                    return "system_setting_domain"
                } else if (t == "email_setting") {
                    return "system_setting_email"
                } else if (t == "tag_setting") {
                    return "system_setting_tags"
                } else if (t == "logo_setting") {
                    return "system_setting_logo"
                } else if (t == "oem_setting") {
                    return "system_setting_oem"
                } else if (t == "appearance") {
                    return "system_setting_helpcenter_custom"
                } else if (t == "announcement_setting") {
                    return "release_helpcenter_announcemen"
                } else if (t == "footer") {
                    return "system_setting_helpcenter_custom"
                } else if (t == "layout") {
                    return "system_setting_helpcenter_custom"
                } else if (t == "access") {
                    return "system_setting_helpcenter_access_control"
                } else if (t == "signConfig") {
                    return "system_setting_helpcenter_sso"
                } else if (t == "operation_log") {
                    return "system_setting_operation_log"
                } else if (t == "roles") {
                    return "role_manage"
                } else if (t == "add_ticket" || t == "ticket_web_form" || t == "webchat_form" || t == "cti_setting" || t == "via_email" || t == "wechat_setting" || t == "desktop_help" || t == "sdk_setting" || t == "api_setting" || t == "telephone_channels" || t == "dingding_setting") {
                    return "ticket_setting_via"
                } else if (t == "working_day") {
                    return "ticket_setting_work_time"
                } else if (t == "service_catalog") {
                    return "ticket_setting_service_catalog"
                } else if (t == "sla") {
                    return "ticket_setting_business_rules"
                } else if (t == "evaluate_edit") {
                    return ["system_setting_ticket_evaluate", "chat_edit_evaluate"]
                } else if (t == "ticket_custom_field") {
                    return "ticket_setting_customfield"
                } else if (t == "automations") {
                    return ["ticket_setting_automation", "chat_edit_automation"]
                } else if (t == "triggerTask") {
                    return ["ticket_setting_ticket_trigger", "chat_edit_trigger"]
                } else if (t == "user_custom_field") {
                    return "customer_setting_customfield"
                } else if (t == "user_group_custom_field") {
                    return "customer_group_setting_customfield"
                } else if (t == "external_url") {
                    return "customer_setting_customfield_url_secret"
                } else if (t == "user_custom_view" || t == "user_group_custom_view") {
                    return "customer_view_manage"
                } else if (t == "robot-setting" || t == "robot-knowledge" || t === "robot-unknown-knowledge") {
                    return "automaton_manage"
                } else if (t == "webhook") {
                    return "system_setting_webhook"
                } else {
                    return undefined
                }
            }
        }).state("system_setting.market_create", {
            url: "/app_market/new",
            templateUrl: "source/views/system_setting/app_market/create_market.html",
            controller: "AppMarketCtrl",
            controllerAs: "appMarket"
        }).state("system_setting.role_create", {
            url: "/create222",
            templateUrl: "source/views/system_setting/setting.role_edit.html",
            controller: "roleAddController",
            permission: "role_manage"
        }).state("system_setting.role_edit", {
            url: "/edit/:id/:type",
            templateUrl: "source/views/system_setting/setting.role_edit.html",
            controller: "roleUpdateController",
            permission: "role_manage"
        }).state("system_setting.detail.license", {
            url: "/license",
            templateUrl: "source/views/system_setting/setting.company_account.license.html",
            controller: "company_license_controller",
            permission: "system_setting_company_account",
            onEnter: ["$state", "$stateParams", "coreModelService", function (e, t, i) {
                i.config.route.put("system-setting", {name: this.name, params: t})
            }]
        }).state("system_setting.engineer_detail", {
            url: "/engineers/:uri/:id",
            templateUrl: "source/views/system_setting/setting.engineer_detail.html",
            controller: "engineer_detail_controller"
        }).state("system_setting.engineer_detail.engineer_edit", {
            url: "/detail",
            templateUrl: "source/views/system_setting/setting.engineer_edit.html",
            controller: "engineer_edit_controller",
            onEnter: ["$state", "$stateParams", "coreModelService", function (e, t, i) {
                i.config.route.put("system-setting.engineer_detail", {name: this.name, params: t})
            }]
        }).state("system_setting.engineer_detail.engineer_flextime", {
            url: "/flextime",
            templateUrl: "source/views/system_setting/setting.engineer_flextime.html",
            controller: "engineer_flextime_controller",
            onEnter: ["$state", "$stateParams", "coreModelService", function (e, t, i) {
                i.config.route.put("system-setting.engineer_detail", {name: this.name, params: t})
            }]
        }).state("system_setting.service_desks_edit", {
            url: "/service_desks/:type/:id",
            templateUrl: "source/views/system_setting/setting.service_desks_edit.html",
            controller: "editServiceDesksController"
        }).state("system_setting.detail.user", {
            url: "/update",
            templateUrl: "source/views/system_setting/setting.my_account.user.html",
            controller: "my_account_user_controller",
            onEnter: ["$state", "$stateParams", "coreModelService", function (e, t, i) {
                i.config.route.put("system-setting.my-account", {name: this.name, params: t})
            }]
        }).state("system_setting.detail.gathering", {
            url: "/gathering",
            templateUrl: "source/views/system_setting/setting.my_account.gathering.html",
            controller: "my_account_gathering_controller",
            onEnter: ["$state", "$stateParams", "coreModelService", function (e, t, i) {
                i.config.route.put("system-setting.my-account", {name: this.name, params: t})
            }]
        }).state("system_setting.detail.my-tickets", {
            url: "/my-tickets",
            templateUrl: "source/views/system_setting/setting.my_account.my-tickets.html",
            controller: "my_account_my_tickets_controller",
            onEnter: ["$state", "$stateParams", "coreModelService", function (e, t, i) {
                i.config.route.put("system-setting.my-account", {name: this.name, params: t})
            }]
        }).state("system_setting.detail.my-activity", {
            url: "/my-activity",
            templateUrl: "source/views/help_center/dynamics_view_detail.htm",
            controller: "dynamicsViewDetailController",
            onEnter: ["$state", "$stateParams", "coreModelService", function (e, t, i) {
                i.config.route.put("system-setting.my-account", {name: this.name, params: t})
            }]
        }).state("system_setting.detail.notify", {
            url: "/notify",
            templateUrl: "source/views/system_setting/setting.my_account.notify.html",
            controller: "my_account_notify_controller",
            onEnter: ["$state", "$stateParams", "coreModelService", function (e, t, i) {
                i.config.route.put("system-setting.my-account", {name: this.name, params: t})
            }]
        }).state("system_setting.detail.log", {
            url: "/log",
            templateUrl: "source/views/system_setting/setting.my_account.log.html",
            controller: "my_account_log_controller",
            onEnter: ["$state", "$stateParams", "coreModelService", function (e, t, i) {
                i.config.route.put("system-setting.my-account", {name: this.name, params: t})
            }]
        }).state("system_setting.detail.calendar", {
            url: "/calendar",
            templateUrl: "source/views/system_setting/setting.my_account.calendar.html",
            controller: "my_account_calendar_controller",
            onEnter: ["$state", "$stateParams", "coreModelService", function (e, t, i) {
                i.config.route.put("system-setting.my-account", {name: this.name, params: t})
            }]
        }).state("system_setting.ewapp_detail", {
            url: "/app_market/ewapp_detail",
            templateUrl: "source/views/system_setting/setting.ewapp_detail.html",
            controller: "ewapp_detail_controller"
        }).state("system_setting.JIRA_app_detail", {
            url: "/app_market/JIRA_app_detail",
            templateUrl: "source/views/system_setting/setting.JIRA_app_detail.html",
            controller: "JIRA_app_detail_controller"
        }).state("system_setting.sugarCEM_app_detail", {
            url: "/app_market/sugarCEM_app_detail",
            templateUrl: "source/views/system_setting/setting.sugarCEM_app_detail.html",
            controller: "sugarCEM_app_detail_controller"
        }).state("system_setting.JIRA_app_install", {
            url: "/app_market/JIRA_app_install",
            templateUrl: "source/views/system_setting/setting.JIRA_app_install.html",
            controller: "JIRA_app_install_controller"
        }).state("system_setting.detail.layout", {
            url: "/surface",
            templateUrl: "source/views/system_setting/setting.layout_detail.html",
            controller: "uiv2_controller",
            permission: "system_setting_helpcenter_custom",
            onEnter: ["$state", "$stateParams", "coreModelService", function (e, t, i) {
                i.config.route.put("system-setting.detai.layout", {name: this.name, params: t})
            }]
        }).state("system_setting.detail.community", {
            url: "/community",
            templateUrl: "source/views/system_setting/setting.layout_community.html",
            controller: "access_controller",
            permission: "system_setting_helpcenter_custom",
            onEnter: ["$state", "$stateParams", "coreModelService", function (e, t, i) {
                i.config.route.put("system-setting.detai.layout", {name: this.name, params: t})
            }]
        }).state("system_setting.detail.helpcenter_appearance", {
            url: "/appearance",
            templateUrl: "source/views/system_setting/setting.appearance.html",
            controller: "uiv2_controller",
            permission: "system_setting_helpcenter_custom",
            onEnter: ["$state", "$stateParams", "coreModelService", function (e, t, i) {
                i.config.route.put("system-setting.brand-setting", {name: this.name, params: t})
            }]
        }).state("system_setting.detail.announcement_setting", {
            url: "/announcement_setting",
            templateUrl: "source/views/system_setting/setting.announcement_setting.html",
            controller: "announcement_setting_controller",
            permission: "release_helpcenter_announcement",
            onEnter: ["$state", "$stateParams", "coreModelService", function (e, t, i) {
                i.config.route.put("system-setting.brand-setting", {name: this.name, params: t})
            }]
        }).state("system_setting.detail.logo_setting", {
            url: "/logo_setting",
            templateUrl: "source/views/system_setting/setting.logo_setting.html",
            controller: "logo_setting_controller",
            permission: "system_setting_logo",
            onEnter: ["$state", "$stateParams", "coreModelService", function (e, t, i) {
                i.config.route.put("system-setting.brand-setting", {name: this.name, params: t})
            }]
        }).state("system_setting.detail.email_setting", {
            url: "/email_setting",
            templateUrl: "source/views/system_setting/setting.email_setting.html",
            controller: "email_setting_controller",
            permission: "system_setting_email",
            onEnter: ["$state", "$stateParams", "coreModelService", function (e, t, i) {
                i.config.route.put("system-setting.brand-setting", {name: this.name, params: t})
            }]
        }).state("system_setting.detail.domain_setting", {
            url: "/domain_setting",
            templateUrl: "source/views/system_setting/setting.domain_setting.html",
            controller: "domain_setting_controller",
            permission: "system_setting_domain",
            onEnter: ["$state", "$stateParams", "coreModelService", function (e, t, i) {
                i.config.route.put("system-setting.brand-setting", {name: this.name, params: t})
            }]
        }).state("system_setting.detail.oem_setting", {
            url: "/oem_setting",
            templateUrl: "source/views/system_setting/setting.oem_setting.html",
            controller: "oem_setting_controller",
            permission: "system_setting_oem",
            onEnter: ["$state", "$stateParams", "coreModelService", function (e, t, i) {
                i.config.route.put("system-setting.brand-setting", {name: this.name, params: t})
            }]
        }).state("system_setting.edit_webhook", {
            url: "/edit_webhook/{type}/:id",
            templateUrl: "source/views/system_setting/setting.webhook_edit.html",
            controller: "editWebhookController"
        }).state("system_setting.ticket_custom_field_edit", {
            url: "/ticket_custom_field_edit/{type}/:id",
            templateUrl: "source/views/ticket/setting.ticket_custom_field_edit.html",
            controller: "editTicketCustomFieldController"
        }).state("system_setting.ticket_list_custom_edit", {
            url: "/ticket_list_custom_edit/{type}/:id/{isSystemDefault}",
            templateUrl: "source/views/ticket/setting.ticket_list_custom_edit.html",
            controller: "editTicketListCustomController"
        }).state("system_setting.workflow_template_edit", {
            url: "/workflow_template_edit/{type}/:id",
            templateUrl: "source/views/ticket/setting.workflow_template_edit.html",
            controller: "editWorkflowTemplateController"
        }).state("system_setting.ticket_template_edit", {
            url: "/ticket_template_edit/{type}/:id",
            templateUrl: "source/views/ticket/setting.ticket_template_edit.html",
            controller: "editTicketTemplateController"
        }).state("system_setting.sla_edit", {
            url: "/sla_edit/{type}/:id",
            templateUrl: "source/system-setting/sla-setting/sla-setting.html",
            controller: "editSlaController",
            permission: "ticket_setting_business_rules",
            resolve: {
                ticketSla: ["$stateParams", "ticketSlaService", function (e, t) {
                    if (e.id > 0) {
                        return t.get({id: e.id}).$promise.then(function (e) {
                            return e.json
                        })
                    } else {
                        return null
                    }
                }]
            }
        }).state("system_setting.via_email_edit", {
            url: "/via_email_edit/{type}/:id",
            templateUrl: "source/views/ticket/setting.via_email_edit.html",
            controller: "editViaEmailController",
            permission: "ticket_setting_via"
        }).state("system_setting.via_email_edit.email_address", {
            url: "/email_address",
            templateUrl: "source/views/ticket/email_rule/email_address.html",
            controller: "editViaEmailController",
            permission: "ticket_setting_via"
        }).state("system_setting.via_email_edit.deliver_rule", {
            url: "/deliver_rule",
            templateUrl: "source/views/ticket/email_rule/deliver_rule.html",
            controller: "editViaEmailController",
            permission: "ticket_setting_via"
        }).state("system_setting.sdk_detail", {
            url: "/sdk_detail/:id",
            params: {id: null, addViaSdk: null},
            templateUrl: "source/views/system_setting/via_sdk/sdk_detail.html",
            controller: "sdkDetailController",
            controllerAs: "vm",
            permission: "ticket_setting_via"
        }).state("system_setting.sdk_detail.advance_preparation", {
            url: "/advance_preparation",
            params: {id: null, addViaSdk: null},
            templateUrl: "source/views/system_setting/via_sdk/advance_preparation.html",
            controller: "advancePreparationController",
            controllerAs: "vm",
            permission: "ticket_setting_via"
        }).state("system_setting.sdk_detail.auto_reply", {
            url: "/auto_reply",
            params: {id: null, addViaSdk: null},
            templateUrl: "source/views/system_setting/via_sdk/auto_reply.html",
            controller: "autoReplyController",
            controllerAs: "vm",
            permission: "ticket_setting_via"
        }).state("system_setting.sdk_detail.ticket_send_rule", {
            url: "/ticket_send_rule",
            params: {id: null, addViaSdk: null},
            templateUrl: "source/views/system_setting/via_sdk/ticket_send_rule.html",
            controller: "ticketSendRuleDetailController",
            controllerAs: "vm",
            permission: "ticket_setting_via"
        }).state("system_setting.sdk_detail.online_customer_navigation", {
            url: "/online_customer_navigation",
            params: {id: null, addViaSdk: null},
            templateUrl: "source/views/system_setting/via_sdk/online_customer_navigation.html",
            controller: "onlineCustomerNavigationController",
            controllerAs: "vm",
            permission: "ticket_setting_via"
        }).state("system_setting.cti_detail", {
            url: "/cti_detail/:id",
            templateUrl: "source/views/cti-setting/templates/setting.cti_detail.html",
            controller: "editCtiDetailController",
            resolve: {
                loadMyFiels: ["$ocLazyLoad", function (e) {
                    return e.load("source/views/cti-setting/js/cti_setting.js")
                }]
            },
            permission: "ticket_setting_via"
        }).state("system_setting.cti_detail.cti_port", {
            url: "/cti_port",
            templateUrl: "source/views/cti-setting/templates/cti_port.html",
            controller: "ctiPortController",
            resolve: {
                loadMyFiels: ["$ocLazyLoad", function (e) {
                    return e.load("source/views/cti-setting/js/cti_port.js")
                }]
            },
            permission: "ticket_setting_via"
        }).state("system_setting.cti_detail.session_control", {
            url: "/session_control",
            templateUrl: "source/views/cti-setting/templates/session_control.html",
            controller: "sessionControl",
            resolve: {
                loadMyFiels: ["$ocLazyLoad", function (e) {
                    return e.load("source/views/cti-setting/js/session_control.js")
                }]
            },
            permission: "ticket_setting_via"
        }).state("system_setting.automations", {
            url: "/ticket/automations",
            templateUrl: "source/views/ticket/setting.automations.html",
            controller: "ticketSettingDetailController",
            permission: ["ticket_setting_automation", "chat_edit_automation"]
        }).state("system_setting.automations.ticket", {
            url: "/ticket/automations/ticket",
            templateUrl: "source/views/ticket/setting.automations.ticket.html",
            controller: "ticketSettingDetailController",
            params: {uri: "automations", type: "ticket"},
            permission: "ticket_setting_automation"
        }).state("system_setting.automations.webchat", {
            url: "/ticket/automations/webchat",
            templateUrl: "source/views/ticket/setting.automations.webchat.html",
            controller: "ticketSettingDetailController",
            params: {uri: "automations", type: "webchat"},
            permission: "chat_edit_automation"
        }).state("system_setting.automation_default", {
            url: "/automation_default/{type}/:id",
            templateUrl: "source/views/ticket/setting.automation_edit_default.html",
            controller: "editAutomationController"
        }).state("system_setting.automation_edit_ticket", {
            url: "/automation/ticket/{type}/:id",
            templateUrl: "source/views/ticket/setting.automation.ticket.edit.html",
            controller: "editAutomationController",
            permission: "ticket_setting_automation"
        }).state("system_setting.automation_edit_webchat", {
            url: "/automation/webchat/{type}/:id",
            templateUrl: "source/views/ticket/setting.automation.webchat.edit.html",
            controller: "editWebchatAutomationController",
            permission: "chat_edit_automation"
        }).state("system_setting.triggerTask", {
            templateUrl: "source/views/ticket/setting.triggerTask.html",
            controller: "triggerTaskSettingController",
            permission: ["ticket_setting_ticket_trigger", "chat_edit_trigger"]
        }).state("system_setting.triggerTask.ticket", {
            url: "/ticket/triggerTask/ticket",
            templateUrl: "source/views/ticket/setting.triggerTask.ticket.html",
            controller: "ticketSettingDetailController",
            params: {uri: "triggerTask", type: "ticket", searchKey: null},
            permission: "ticket_setting_ticket_trigger",
            onEnter: ["$state", "$stateParams", "coreModelService", function (e, t, i) {
                i.config.route.put("system-setting.triggerTask", {name: this.name, params: t})
            }]
        }).state("system_setting.triggerTask.webchat", {
            url: "/ticket/triggerTask/webchat",
            templateUrl: "source/views/ticket/setting.triggerTask.webchat.html",
            controller: "ticketSettingDetailController",
            params: {uri: "triggerTask", type: "webchat", searchKey: null},
            permission: "chat_edit_trigger",
            onEnter: ["$state", "$stateParams", "coreModelService", function (e, t, i) {
                i.config.route.put("system-setting.triggerTask", {name: this.name, params: t})
            }]
        }).state("system_setting.triggerTask_edit_ticket", {
            url: "/ticket/triggerTask/ticket/{type}/:id",
            templateUrl: "source/views/ticket/setting.triggerTask.ticket.edit.html",
            controller: "editTriggerController",
            permission: "ticket_setting_ticket_trigger"
        }).state("system_setting.triggerTask_edit_webchat", {
            url: "/ticket/triggerTask/webchat/{type}/:id",
            templateUrl: "source/views/ticket/setting.triggerTask.webchat.edit.html",
            controller: "editWebchatTriggerController",
            permission: "chat_edit_trigger"
        }).state("system_setting.detail.evaluate-ticket", {
            url: "/ticket",
            params: {type: "ticket"},
            templateUrl: "source/system-setting/evaluate-setting/evaluate-ticket.html",
            controller: "ticketSettingDetailController",
            permission: "system_setting_ticket_evaluate"
        }).state("system_setting.detail.evaluate-chat", {
            url: "/chat",
            params: {type: "chat"},
            templateUrl: "source/system-setting/evaluate-setting/evaluate-chat.html",
            controller: "ticketSettingDetailController",
            permission: "chat_edit_evaluate"
        }).state("system_setting.edit_user_custom_field", {
            url: "/edit_user_custom_field/{type}/:id",
            templateUrl: "source/views/customer/setting.user_custom_field_edit.html",
            controller: "editUserCustomFieldController"
        }).state("system_setting.edit_user_group_custom_field", {
            url: "/edit_user_group_custom_field/{type}/:id",
            templateUrl: "source/views/customer/setting.user_group_custom_field_edit.html",
            controller: "editUserGroupCustomFieldController"
        })
    }

    function t() {
        var t = null;
        return {
            getNotify: function () {
                return t
            }, setNotify: function (e) {
                t = e
            }
        }
    }
})();
angular.module("eweiApp.common").controller("appIframeController", appIframeController).factory("appIframe", appIframe).config(["$stateProvider", "$urlRouterProvider", "ConsoleConfig", function (e, t, i) {
    e.state("apps", {url: "/apps/:appId"})
}]);
appIframe.$inject = [];
function appIframe() {
    var t = null;
    var i = null;
    var r = null;
    var n = null;
    return {
        setIsShowPage: function (e) {
            void 0;
            if (r && typeof r === "function") {
                r(e)
            }
        }, getIsShowPage: function (e) {
            r = e
        }, setProviderApps: function (e) {
            if (i && typeof i === "function") {
                i(e)
            }
        }, getProviderApps: function (e) {
            i = e
        }, setAuthorize_to_app_url: function (e) {
            if (t && typeof t === "function") {
                t(e)
            }
        }, getAuthorize_to_app_url: function (e) {
            t = e
        }, setObtainDisplayInfo: function (e) {
            if (n && typeof n === "function") {
                n(e)
            }
        }, getObtainDisplayInfo: function (e) {
            n = e
        }
    }
}
appIframeController.$inject = ["$scope", "appIframe", "ConsoleConfig"];
function appIframeController(t, e, i) {
    t.providerApps = {};
    t.authorize_to_app_url = {};
    t.showPage = {};
    t.showDiv = false;
    e.getProviderApps(function (e) {
        t.providerApps = e
    });
    e.getAuthorize_to_app_url(function (e) {
        t.authorize_to_app_url[e.id] = e.appurl
    });
    e.getIsShowPage(function (e) {
        t.showPage = e
    });
    e.getObtainDisplayInfo(function (e) {
        t.showDiv = e
    })
}
angular.module("eweiApp.common").factory("tabs", [function () {
    return []
}]).factory("utils", ["tabs", "coreModelService", function (p, u) {
    var f = function (e, t) {
        var i = "";
        for (var r = 0; r < t; r += 1) {
            i += e
        }
        return i
    };

    function e(e, t) {
        var r = null;
        var o = null;
        var i = "underline";
        var n = "indention";
        var a = "-";
        var s = 3;
        var l = "-";
        if (!!t) {
            if (typeof t.linkProcess === "function") {
                r = t.linkProcess
            }
            if (typeof t.imgProcess === "function") {
                o = t.imgProcess
            }
            if (!!t.headingStyle) {
                i = t.headingStyle
            }
            if (!!t.listStyle) {
                n = t.listStyle
            }
            if (!!t.uIndentionChar) {
                a = t.uIndentionChar
            }
            if (!!t.listIndentionTabs) {
                s = t.listIndentionTabs
            }
            if (!!t.oIndentionChar) {
                l = t.oIndentionChar
            }
        }
        var c = f(a, s);
        var u = String(e).replace(/\n|\r/g, " ");
        u = u.replace(/<\/body>.*/i, "");
        u = u.replace(/.*<body[^>]*>/i, "");
        u = u.replace(/<(script|style)( [^>]*)*>((?!<\/\1( [^>]*)*>).)*<\/\1>/gi, "");
        u = u.replace(/<(\/)?((?!h[1-6]( [^>]*)*>)(?!img( [^>]*)*>)(?!a( [^>]*)*>)(?!ul( [^>]*)*>)(?!ol( [^>]*)*>)(?!li( [^>]*)*>)(?!p( [^>]*)*>)(?!div( [^>]*)*>)(?!td( [^>]*)*>)(?!br( [^>]*)*>)[^>\/])[^>]*>/gi, "");
        u = u.replace(/<img([^>]*)>/gi, function (e, t) {
            var i = "";
            var r = "";
            var n = /src="([^"]*)"/i.exec(t);
            var a = /alt="([^"]*)"/i.exec(t);
            if (n !== null) {
                i = n[1]
            }
            if (a !== null) {
                r = a[1]
            }
            if (typeof o === "function") {
                return o(i, r)
            }
            if (r === "") {
                return "![image] (" + i + ")"
            }
            return "![" + r + "] (" + i + ")"
        });
        function d() {
            return function (e, n, t, i) {
                var a = 0;
                if (t && /start="([0-9])+"/i.test(t)) {
                    a = /start="([0-9])"/i.exec(t)[1] - 1
                }
                var r = "<p>" + i.replace(/<li[^>]*>(((?!<li[^>]*>)(?!<\/li>).)*)<\/li>/gi, function (e, t) {
                        var i = 0;
                        var r = t.replace(/(^|(<br \/>))(?!<p>)/gi, function () {
                            if (n === "o" && i === 0) {
                                a += 1;
                                i += 1;
                                return "<br />" + a + f(l, s - String(a).length)
                            }
                            return "<br />" + c
                        });
                        return r
                    }) + "</p>";
                return r
            }
        }

        if (n === "linebreak") {
            u = u.replace(/<\/?ul[^>]*>|<\/?ol[^>]*>|<\/?li[^>]*>/gi, "\n")
        } else if (n === "indention") {
            while (/<(o|u)l[^>]*>(.*)<\/\1l>/gi.test(u)) {
                u = u.replace(/<(o|u)l([^>]*)>(((?!<(o|u)l[^>]*>)(?!<\/(o|u)l>).)*)<\/\1l>/gi, d())
            }
        }
        if (i === "linebreak") {
            u = u.replace(/<h([1-6])[^>]*>([^<]*)<\/h\1>/gi, "\n$2\n")
        } else if (i === "underline") {
            u = u.replace(/<h1[^>]*>(((?!<\/h1>).)*)<\/h1>/gi, function (e, t) {
                return "\n&nbsp;\n" + t + "\n" + f("=", t.length) + "\n&nbsp;\n"
            });
            u = u.replace(/<h2[^>]*>(((?!<\/h2>).)*)<\/h2>/gi, function (e, t) {
                return "\n&nbsp;\n" + t + "\n" + f("-", t.length) + "\n&nbsp;\n"
            });
            u = u.replace(/<h([3-6])[^>]*>(((?!<\/h\1>).)*)<\/h\1>/gi, function (e, t, i) {
                return "\n&nbsp;\n" + i + "\n&nbsp;\n"
            })
        } else if (i === "hashify") {
            u = u.replace(/<h([1-6])[^>]*>([^<]*)<\/h\1>/gi, function (e, t, i) {
                return "\n&nbsp;\n" + f("#", t) + " " + i + "\n&nbsp;\n"
            })
        }
        u = u.replace(/<br( [^>]*)*>|<p( [^>]*)*>|<\/p( [^>]*)*>|<div( [^>]*)*>|<\/div( [^>]*)*>|<td( [^>]*)*>|<\/td( [^>]*)*>/gi, "\n");
        u = u.replace(/<a[^>]*href="([^"]*)"[^>]*>([^<]+)<\/a[^>]*>/gi, function (e, t, i) {
            if (typeof r === "function") {
                return r(t, i)
            }
            return " [" + i + "] (" + t + ") "
        });
        u = u.replace(/\n[ \t\f]*/gi, "\n");
        u = u.replace(/\n\n+/gi, "\n");
        u = u.replace(/( |&nbsp;|\t)+/gi, " ");
        u = u.replace(/\n +/gi, "\n");
        u = u.replace(/^ +/gi, "");
        while (u.indexOf("\n") === 0) {
            u = u.substring(1)
        }
        if (u.length === 0 || u.lastIndexOf("\n") !== u.length - 1) {
            u += "\n"
        }
        return u
    }

    return {
        htmlToPlainText: e, findById: function e(t, i) {
            for (var r = 0; r < t.length; r++) {
                if (t[r].id == i)return t[r]
            }
            return null
        }, newRandomKey: function e(t, i, r) {
            var n;
            do {
                n = t[Math.floor(t.length * Math.random())][i]
            } while (n == r);
            return n
        }, generateContactId: function e(t, i) {
            var r;
            var n;
            do {
                n = false;
                r = Math.floor(i * Math.random());
                for (var a = 0; a < t.length; a++) {
                    if (t[a].id == r) {
                        n = true;
                        break
                    }
                }
            } while (n);
            return r
        }, getTabIndex: function e(t, i) {
            for (var r = 0; r < p.length; r++) {
                var n = p[r];
                if (n.id == t && n.stateName == i) {
                    return r
                }
            }
            return null
        }, addTab: function e(t, i, r, n, a, o, s, l) {
            if (r.indexOf("webchats_new") > -1) {
                return
            }
            var c;
            for (var u = 0; u < p.length; u++) {
                var d = p[u];
                if (d.id == t) {
                    c = d;
                    break
                }
            }
            if (c) {
                if (o == undefined || o == true) {
                    angular.forEach(p, function (e) {
                        e.active = false
                    });
                    c.active = true
                }
                if (c.stateName === "webchat-history.detail") {
                    c.params = n
                }
                return
            }
            if (o == undefined || o == true) {
                angular.forEach(p, function (e) {
                    e.active = false
                });
                o = true
            } else {
                o = false
            }
            if (s == undefined) {
                s = true
            }
            p.push({id: t, title: i, ico: a, stateName: r, params: n, active: o, closeAble: s, shake: l});
            return p
        }, cancelSelect: function e() {
            angular.forEach(p, function (e) {
                e.active = false
            });
            return p
        }, findTabByIdAndStateName: function e(t, i) {
            for (var r = 0; r < p.length; r++) {
                var n = p[r];
                if (n.id == t && n.stateName == i) {
                    return n
                }
            }
            return null
        }, findTabById: function e(t) {
            for (var i = 0; i < p.length; i++) {
                var r = p[i];
                if (r.id == t) {
                    return i
                }
            }
            return null
        }, removeActiveTab: function (e) {
            var t = -1;
            var i;
            for (var r = 0; r < p.length; r++) {
                if (p[r].active) {
                    t = r;
                    i = p[r];
                    break
                }
            }
            var n = null;
            if (t > 0) {
                n = p[t - 1]
            } else {
                if (p.length > 1) {
                    n = p[1]
                }
            }
            if (n == null) {
                var a = i ? i.stateName : e.current.name;
                switch (a) {
                    case"webchats_new.detail":
                        var o = u.config.route.get("chat.from");
                        if (o && -1 != o.indexOf("quickentry")) {
                            e.go("quickentry")
                        } else {
                            e.go("webchats_new.list", {}, {reload: true})
                        }
                        break;
                    case"tickets_new":
                    case"tickets_detail":
                        e.go("ticket_views");
                        break;
                    case"user_groups_detail":
                    case"customers_detail":
                        e.go("customer_views");
                        break;
                    case"project_detail":
                        e.go("universal_list.favorites_list");
                        break;
                    default:
                        e.go("quickentry");
                        break
                }
            } else {
                n.active = true;
                e.go(n.stateName, n.params)
            }
            p.splice(t, 1)
        }, removeTabById: function (e, t, i, r) {
            var n = -1;
            var a = null;
            for (var o = 0; o < p.length; o++) {
                if (p[o].id == t) {
                    n = o;
                    a = p[o];
                    break
                }
            }
            var s = null;
            if (n > 0) {
                s = p[n - 1]
            } else {
                if (p.length > 1) {
                    s = p[1]
                }
            }
            if (s == null) {
                if (!r) {
                    var l = a ? a.stateName : e.current.name;
                    switch (l) {
                        case"webchats_new.detail":
                            var c = u.config.route.get("chat.from");
                            if (c && -1 != c.indexOf("quickentry")) {
                                e.go("quickentry")
                            } else {
                                e.go("webchats_new.list", {}, {reload: true})
                            }
                            break;
                        case"tickets_new":
                        case"tickets_detail":
                            e.go("ticket_views");
                            break;
                        case"user_groups_detail":
                        case"customers_detail":
                            e.go("customer_views");
                            break;
                        default:
                            e.go("quickentry");
                            break
                    }
                } else if (t.indexOf("webchats_new.detail") > -1) {
                    e.go("webchats_new.list", {type: "processing"}, {reload: true})
                }
            } else {
                if (t.indexOf("webchats_new.detail") > -1) {
                    e.go("webchats_new.list", {type: "processing"}, {reload: true})
                } else if (!i) {
                    s.active = true;
                    e.go(s.stateName, s.params)
                }
            }
            if (n > -1) {
                p.splice(n, 1)
            }
        }, updateCloseAble: function (e, t) {
            for (var i = 0; i < p.length; i++) {
                if (p[i].id == e) {
                    p[i].closeAble = t;
                    break
                }
            }
        }, splice: function e(t) {
            p.splice(t, 1)
        }, countByStateName: function e(t) {
            var i = 0;
            for (var r = 0; r < p.length; r++) {
                if (p[r].stateName == t) {
                    i += 1
                }
            }
            return i
        }, empty: function e(t) {
            switch (typeof t) {
                case"undefined":
                    return true;
                case"string":
                    if (trim(t).length == 0)return true;
                    break;
                case"boolean":
                    if (!t)return true;
                    break;
                case"number":
                    if (0 === t)return true;
                    break;
                case"object":
                    if (null === t)return true;
                    if (undefined !== t.length && t.length == 0)return true;
                    for (var i in t) {
                        return false
                    }
                    return true;
                    break
            }
            return false
        }, updateById: function (e, t) {
            var i = this.findTabById(e);
            p[i] = t
        }, getPercentValue: function (e) {
            val = e * 100;
            return val.toFixed(2)
        }, updateChatSubject: function (e, t, i) {
            var r = this.findTabByIdAndStateName(e, t);
            r.title = i
        }
    }
}]).factory("alertService", ["$rootScope", "$timeout", "utils", function (s, l, e) {
    var c = {};
    s.alertsA = [];
    c.add = function (t, i, r, n, a, o) {
        t = t ? t : "";
        i = i ? i : "success";
        r = r == "left" ? false : true;
        n = n ? n : 3600;
        o = typeof o == "boolean" ? o : true;
        a = a ? a : 0;
        l(function () {
            var e = new Date;
            s.alertsA[0] = {
                position: r,
                type: i,
                msg: t,
                time: n,
                closeable: o,
                delay: a,
                createdate: e,
                close: function () {
                    c.closeAlertA(this)
                }
            };
            l(function () {
                c.closeAlertDateA(e)
            }, n)
        }, a)
    };
    c.closeAlertDateA = function (e) {
        for (var t = 0; t < s.alertsA.length; t++) {
            if (s.alertsA[t].createdate === e) {
                c.closeAlertIdxA(t);
                break
            }
        }
    };
    c.closeAlertA = function (e) {
        c.closeAlertIdxA(s.alertsA.indexOf(e))
    };
    c.closeAlertIdxA = function (e) {
        s.alertsA.splice(e, 1)
    };
    return c
}]).factory("$debounce", ["$rootScope", "$browser", "$q", "$exceptionHandler", function (d, p, f, m) {
    var v = {}, g = {}, h = 0;

    function e(i, e, t) {
        var r = f.defer(), n = r.promise, a = angular.isDefined(t) && !t, o, s, l, c = false;
        angular.forEach(g, function (e, t) {
            if (angular.equals(g[t].fn, i)) {
                c = true;
                l = t
            }
        });
        if (!c) {
            l = h++;
            g[l] = {fn: i}
        } else {
            v[g[l].timeoutId].reject("bounced");
            p.defer.cancel(g[l].timeoutId)
        }
        var u = function () {
            delete g[l];
            try {
                r.resolve(i())
            } catch (e) {
                r.reject(e);
                m(e)
            }
            if (!a) d.$apply()
        };
        o = p.defer(u, e);
        g[l].timeoutId = o;
        s = function (e) {
            delete v[n.$$timeoutId]
        };
        n.$$timeoutId = o;
        v[o] = r;
        n.then(s, s);
        return n
    }

    e.cancel = function (e) {
        if (e && e.$$timeoutId in v) {
            v[e.$$timeoutId].reject("canceled");
            return p.defer.cancel(e.$$timeoutId)
        }
        return false
    };
    return e
}]).factory("commonTools", ["$log", "uibDateParser", function (e, i) {
    function r(e, t, i, r, n) {
        var a = {body: e, icon: t};
        var o = new Notification(i, a);
        var s = false;
        o.onclick = function () {
            if (s) {
                return false
            }
            window.focus();
            void 0;
            if (typeof n === "function") {
                n();
                s = true
            }
        };
        setTimeout(function () {
            o.close.bind(o);
            s = false
        }, r || 3e4)
    }

    function t(t) {
        if (!("Notification" in window)) {
            e.log("this brower does not support desktop Notification")
        } else if (Notification.permission === "granted") {
            r(t.body, t.icon, t.title, t.timeOut, t.callBack)
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission(function (e) {
                if (e === "granted") {
                    r(t.body, t.icon, t.title, t.timeOut, t.callBack)
                }
            })
        } else {
            e.error("your browser denied the desktop Notification!")
        }
    }

    function n(e) {
        var t = i.parse(e, "yyyy/MM/dd");
        if (!t) {
            t = i.parse(e, "yyyy-MM-dd")
        }
        return t
    }

    function a(e) {
        var t = i.parse(e, "yyyy/MM/dd HH:mm:ss");
        if (!t) {
            t = i.parse(e, "yyyy-MM-dd HH:mm:ss")
        }
        return t
    }

    function o(e) {
        var t = e.getFullYear();
        var i = e.getMonth() + 1;
        var r = e.getDate();
        var n = e.getHours();
        var a = e.getMinutes();
        var o = e.getSeconds();
        if (i >= 1 && i <= 9) {
            i = "0" + i
        }
        if (r >= 0 && r <= 9) {
            r = "0" + r
        }
        if (n >= 0 && n <= 9) {
            n = "0" + n
        }
        if (a >= 0 && a <= 9) {
            a = "0" + a
        }
        if (o >= 0 && o <= 9) {
            o = "0" + o
        }
        return t + "-" + i + "-" + r + " " + n + ":" + a + ":" + o
    }

    return {
        safeApply: function (e, t) {
            var i = e.$root.$$phase;
            if (i == "$apply" || i == "$digest") {
                if (t && typeof t === "function") {
                    t()
                }
            } else {
                e.$apply(t)
            }
        }, browserNotify: t, parseDate: n, parseDateTime: a, formatTime: o
    }
}]).factory("loadJs", ["$http", "$q", function (e, t) {
    return {
        loadScript: function (e, t) {
            var i = document.getElementsByTagName("head")[0];
            var r = document.createElement("script");
            r.setAttribute("type", "text/javascript");
            r.setAttribute("src", e);
            r.setAttribute("async", true);
            r.setAttribute("defer", true);
            i.appendChild(r);
            if (document.all) {
                r.onreadystatechange = function () {
                    var e = this.readyState;
                    if (e === "loaded" || e === "complete") {
                        if (t) {
                            t()
                        }
                    }
                }
            } else {
                r.onload = function () {
                    if (t) {
                        t()
                    }
                }
            }
        }
    }
}]).factory("commonProtocol", ["$location", "EweiConfig", function (e, t) {
    return {
        fn: function () {
            if (e.protocol() == "https") {
                return "https://up.qbox.me"
            } else {
                return t.uploadDomainHttp
            }
        }, isFireFox: function () {
            if (navigator.userAgent.indexOf("Firefox") > -1) {
                return true
            }
            return false
        }, isIE: function () {
            if (navigator.userAgent.indexOf("MSIE") > -1 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
                return true
            }
            return false
        }
    }
}]);
angular.module("eweiApp.account").factory("attachmentService", ["$resource", function (e) {
    return e("attachment/:id.json", {id: "@id"}, {
        get: {method: "GET"},
        add: {method: "POST"},
        delete: {method: "DELETE"}
    })
}]).factory("userService", ["$resource", function (e) {
    return e("user/:id.json", {id: "@id"}, {
        query: {method: "GET"},
        get: {method: "GET"},
        add: {method: "POST"},
        update: {method: "PUT"},
        delete: {method: "DELETE"}
    })
}]).factory("serviceDeskService", ["$resource", function (e) {
    return e("service_desk/:id.json", {id: "@id"}, {
        query: {method: "GET"},
        get: {method: "GET"},
        add: {method: "POST"},
        update: {method: "PUT"},
        delete: {method: "DELETE"}
    })
}]).factory("engineerService", ["$resource", function (e) {
    return e("engineer/:id.json", {id: "@id"}, {
        query: {method: "GET"},
        get: {method: "GET"},
        add: {method: "POST"},
        update: {method: "PUT"},
        delete: {method: "DELETE"}
    })
}]).factory("serviceDesks", ["$resource", function (e) {
    return e("service_desk/:id.json", {id: "@id"}, {
        query: {method: "GET"},
        get: {method: "GET"},
        add: {method: "POST"},
        update: {method: "PUT"},
        delete: {method: "DELETE"}
    })
}]).factory("viewService", ["$resource", function (e) {
    return e("view/:id.json", {id: "@id"}, {
        query: {method: "GET"},
        get: {method: "GET"},
        add: {method: "POST"},
        update: {method: "PUT"},
        delete: {method: "DELETE"}
    })
}]).factory("userGroupService", ["$resource", function (e) {
    return e("user_group/:id.json", {id: "@id"}, {
        query: {method: "GET"},
        get: {method: "GET"},
        add: {method: "POST"},
        update: {method: "PUT"},
        delete: {method: "DELETE"}
    })
}]).factory("roleService", ["$resource", function (e) {
    return e("role/:id.json", {id: "@id"}, {
        query: {method: "GET"},
        get: {method: "GET"},
        add: {method: "POST"},
        update: {method: "PUT"},
        delete: {method: "DELETE"}
    })
}]).factory("permissionsService", ["$resource", function (e) {
    return e("permissions/:id.json", {id: "@id"}, {query: {method: "GET"}})
}]).factory("accessScopeService", ["$resource", function (e) {
    return e("access_scope/:id.json", {id: "@id"}, {query: {method: "GET"}})
}]).factory("tagService", ["$resource", function (e) {
    return e("tag/:id.json", {id: "@id"}, {query: {method: "GET"}, delete: {method: "DELETE"}})
}]).factory("workingDayService", ["$resource", function (e) {
    return e("working_day_setting.json", {id: "@id"}, {
        query: {method: "GET"},
        add: {method: "POST"},
        update: {method: "PUT"},
        delete: {method: "DELETE"}
    })
}]).factory("userOnlineService", ["$resource", function (e) {
    return e("user_online/:id.json", {id: "@id"}, {query: {method: "GET"}})
}]).factory("customFieldService", ["$resource", function (e) {
    return e("custom_field/:id.json", {id: "@id"}, {query: {method: "GET"}})
}]).factory("customFieldOptions", [function () {
    var e = [{option: "文本输入框", value: "text", regexp: ""}, {
        option: "多行文本输入框",
        value: "textarea",
        regexp: ""
    }, {option: "数字", value: "number", regexp: "^(0|[1-9][0-9]*)$"}, {
        option: "Email",
        value: "email",
        regexp: "^(\\w)+(\\.\\w+)*@(\\w)+((\\.\\w+)+)$"
    }, {option: "勾选项", value: "checkbox"}, {option: "下拉框", value: "options"}, {
        option: "下拉框（多选）",
        value: "multi_options"
    }, {option: "下拉框（级联选择）", value: "cascade_options"}, {option: "时间段", value: "date_to_date"}, {
        option: "日期",
        value: "date"
    }, {option: "正则表达式", value: "regexp"}, {
        option: "链接（URL）",
        value: "url",
        regexp: "[a-zA-z]+://[^\\s]*"
    }, {option: "手机号码", value: "mobile_phone", regexp: "^1\\d{10}$"}, {
        option: "电话号码",
        value: "phone",
        regexp: "^\\d{3}-\\d{7,8}|\\d{4}-\\d{7,8}$"
    }, {option: "货币", value: "currency", regexp: "^\\d{1,3}((,\\d{3})*|(\\d{3})*)$"}, {
        option: "IP地址",
        value: "ip",
        regexp: "^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$"
    }, {option: "日期时间", value: "date_time"}];
    return e
}]).factory("locals", ["$window", function (i) {
    return {
        set: function (e, t) {
            i.localStorage[e] = t
        }, get: function (e, t) {
            return i.localStorage[e] || t
        }, setObject: function (e, t) {
            i.localStorage[e] = JSON.stringify(t)
        }, getObject: function (e) {
            return JSON.parse(i.localStorage[e] || "{}")
        }, deltObject: function (e) {
            return i.localStorage.removeItem(e)
        }
    }
}]);
angular.module("eweiApp.ticket").service("restfulService", ["$resource", function (t) {
    this.run = function (e) {
        return t(e.url, e.urlParam, {
            query: {method: "GET"},
            post: {method: "POST"},
            update: {method: "PUT"},
            delete: {method: "DELETE"}
        })
    }
}]).service("cacheService", ["restfulService", function (n) {
    var a = [];
    this.get = function (i, r) {
        var e = o(i);
        if (e > -1) {
            r(a[e].response)
        } else {
            n.run(i).query(i.dataParam, function (e) {
                i.response = angular.copy(e);
                var t = a.push(i);
                if (typeof r === "function") {
                    r(a[t - 1].response)
                }
            })
        }
    };
    this.post = function (i, r) {
        var e = o(i);
        if (e > -1) {
            r(a[e].response)
        } else {
            n.run(i).post(i.dataParam, function (e) {
                i.response = angular.copy(e);
                var t = a.push(i);
                if (typeof r === "function") {
                    r(a[t - 1].response)
                }
            })
        }
    };
    this.run = function (i, r) {
        var t = o(i);
        if (t > -1) {
            n.run(i).query(i.dataParam, function (e) {
                a[t].response = angular.copy(e);
                if (typeof r === "function") {
                    r(a[t].response)
                }
            })
        } else {
            n.run(i).query(i.dataParam, function (e) {
                i.response = angular.copy(e);
                var t = a.push(i);
                if (typeof r === "function") {
                    r(a[t - 1].response)
                }
            })
        }
    };
    this.runPost = function (i, r) {
        var t = o(i);
        if (t > -1) {
            n.run(i).post(i.dataParam, function (e) {
                a[t].response = angular.copy(e);
                if (typeof r === "function") {
                    r(a[t].response)
                }
            })
        } else {
            n.run(i).post(i.dataParam, function (e) {
                i.response = angular.copy(e);
                var t = a.push(i);
                if (typeof r === "function") {
                    r(a[t - 1].response)
                }
            })
        }
    };
    this.clear = function (e) {
        var t = a.length;
        for (var i = t - 1; i >= 0; i--) {
            if (angular.equals(a[i].url, e)) {
                a.splice(i, 1)
            }
        }
    };
    this.extendClear = function (e) {
        var t = o(e);
        if (t > -1) {
            a.splice(t, 1)
        }
    };
    function e() {
        try {
            void 0
        } catch (e) {
            void 0
        }
    }

    function o(e) {
        var t = a.length;
        var i = -1;
        for (var r = 0; r < t; r++) {
            if (angular.equals(a[r].url, e.url) && angular.equals(JSON.stringify(a[r].urlParam), JSON.stringify(e.urlParam)) && angular.equals(JSON.stringify(a[r].dataParam), JSON.stringify(e.dataParam))) {
                i = r;
                break
            }
        }
        return i
    }
}]).service("ticketTypeService", ["cacheService", function (a) {
    this.run = function (e, t, i, r) {
        var n = {url: "/api/v1/ticket_types.json", urlParam: {id: e}, dataParam: t};
        if (undefined === i || true == i) {
            a.run(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        } else {
            a.get(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        }
    }
}]).service("ticketTemplateListService", ["cacheService", function (a) {
    this.run = function (e, t, i, r) {
        var n = {url: "ticket_template_list/:id.json", urlParam: {id: e}, dataParam: t};
        if (undefined === i || true == i) {
            a.run(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        } else {
            a.get(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        }
    }
}]).service("ticketStatusColorService", ["cacheService", function (a) {
    this.run = function (e, t, i, r) {
        var n = {url: "map_ticket_status_color_by_ticket_id/:id.json", urlParam: {id: e}, dataParam: t};
        if (undefined === i || true == i) {
            a.runPost(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        } else {
            a.post(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        }
    }
}]).service("ticketStatusColorExtendService", ["cacheService", function (o) {
    var s = false;
    var n = [];

    function l(e) {
        var t = n.length;
        var i = -1;
        for (var r = 0; r < t; r++) {
            if (angular.equals(n[r].dataParam, e.dataParam) && angular.equals(n[r].urlParam, e.urlParam)) {
                i = r;
                break
            }
        }
        return i
    }

    function c(e) {
        var t = l(e);
        if (t > -1) {
            n[t] = e
        } else {
            n.unshift(e)
        }
    }

    this.run = function (e, t, i, r) {
        var n = {url: "map_ticket_status_color_by_ticket_id/:id.json", urlParam: {id: e}, dataParam: t};
        if (undefined === i || true == i) {
            s = false;
            o.runPost(n, function (e) {
                c(n);
                if (typeof r === "function") {
                    r(e)
                }
            })
        } else {
            var a = l(n);
            if (a > -1) {
                s = true
            } else {
                s = false
            }
            o.post(n, function (e) {
                c(n);
                if (typeof r === "function") {
                    r(e)
                }
            })
        }
        if (s) {
            o.runPost(n, function (e) {
                c(n)
            })
        }
    };
    this.clearCache = function () {
        n = [];
        o.clear("map_ticket_status_color_by_ticket_id/:id.json")
    }
}]).service("workflowTemplateService", ["cacheService", function (a) {
    this.run = function (e, t, i, r) {
        var n = {url: "workflow_template/:id.json", urlParam: {id: e}, dataParam: t};
        if (undefined === i || true == i) {
            a.run(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        } else {
            a.get(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        }
    }
}]).service("quickreplyService", ["cacheService", function (a) {
    this.run = function (e, t, i, r) {
        var n = {url: "quickreply/:id.json", urlParam: {id: e}, dataParam: t};
        if (undefined === i || true == i) {
            a.run(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        } else {
            a.get(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        }
    }
}]).service("serviceCatalogService", ["cacheService", function (a) {
    this.run = function (e, t, i, r) {
        var n = {url: "/api/v1/service_catalogs/list_include_children.json", urlParam: {id: e}, dataParam: t};
        if (undefined === i || true == i) {
            a.run(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        } else {
            a.get(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        }
    }
}]).service("serviceCatalogExtendService", ["cacheService", function (a) {
    this.run = function (e, t, i, r) {
        var n = {url: "/api/v1/service_desks/include_engineers.json", urlParam: {id: e}, dataParam: t};
        if (undefined === i || true == i) {
            a.run(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        } else {
            a.get(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        }
    }
}]).service("serviceCatalogNameService", ["cacheService", function (a) {
    this.run = function (e, t, i, r) {
        var n = {url: "list_service_catalog_name/:id.json", urlParam: {id: e}, dataParam: t};
        if (undefined === i || true == i) {
            a.run(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        } else {
            a.get(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        }
    }
}]).service("ticketDetailService", ["cacheService", function (s) {
    var l = null;
    var c = true;
    var u = false;
    var n = [];
    var i = 20;

    function d() {
        if (localStorage) {
            var e = localStorage.getItem("tickets");
            try {
                return JSON.parse(e)
            } catch (e) {
                return undefined
            }
        }
    }

    function r(e) {
        if (localStorage) {
            try {
                localStorage.removeItem("tickets");
                localStorage.setItem("tickets", JSON.stringify(e))
            } catch (e) {
                void 0
            }
        }
    }

    function p(e) {
        var t = n.length;
        var i = -1;
        for (var r = 0; r < t; r++) {
            if (n[r].id == e) {
                i = r;
                break
            }
        }
        return i
    }

    function f(e) {
        var t = p(e.id);
        if (t > -1) {
            n[t] = e
        } else {
            if (n.length > i) {
                n.pop()
            }
            n.unshift(e)
        }
        r(n)
    }

    this.setUpdateCallback = function (e) {
        l = e
    };
    this.run = function (t, e, i, r) {
        var n = {url: "/api/v1/ticket/:id.json", urlParam: {id: parseInt(t)}, dataParam: e};
        if (c) {
            c = false;
            var a = d();
            if (typeof r === "function" && undefined != a && a.length > 0) {
                angular.forEach(a, function (e) {
                    if (e.id == t) {
                        if (e.ticketCustomFields) {
                            delete e.ticketCustomFields
                        }
                        r({status: 0, result: e})
                    }
                })
            }
        }
        if (undefined === i || true == i) {
            u = false;
            s.run(n, function (e) {
                if (e.status == 0) {
                    if (e.result && e.result.ticketCustomFields) {
                        delete e.result.ticketCustomFields
                    }
                    f(e.result)
                }
                if (typeof r === "function") {
                    r(e)
                }
            })
        } else {
            var o = p(t);
            if (o > -1) {
                u = true
            } else {
                u = false
            }
            s.get(n, function (e) {
                if (e.status == 0) {
                    if (e.result && e.result.ticketCustomFields) {
                        delete e.result.ticketCustomFields
                    }
                    f(e.result)
                }
                if (typeof r === "function") {
                    r(e)
                }
            })
        }
        if (u) {
            s.run(n, function (e) {
                if (e.status == 0) {
                    if (e.result && e.result.ticketCustomFields) {
                        delete e.result.ticketCustomFields
                    }
                    f(e.result)
                }
                if (typeof l === "function") {
                    l(e)
                }
            })
        }
    }
}]).service("ticketExternalUrlAuthorizeService", ["cacheService", function (a) {
    this.run = function (e, t, i, r) {
        var n = {url: "get_external_url_authorize.json", urlParam: {id: e}, dataParam: t};
        if (undefined === i || true == i) {
            a.run(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        } else {
            a.get(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        }
    }
}]).service("ticketCustomFieldService", ["cacheService", function (a) {
    this.run = function (e, t, i, r) {
        var n = {url: "/api/v1/ticket/" + t.ticketId + "/custom_field/list.json", urlParam: {id: e}, dataParam: t};
        if (undefined === i || true == i) {
            a.run(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        } else {
            a.get(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        }
    }
}]).service("customFieldService", ["cacheService", function (a) {
    this.run = function (e, t, i, r) {
        var n = {url: "/api/v1/custom_fields.json", urlParam: {id: e}, dataParam: t};
        if (undefined === i || true == i) {
            a.run(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        } else {
            a.get(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        }
    }
}]).service("ticketWorkflowListService", ["cacheService", function (a) {
    this.run = function (e, t, i, r) {
        var n = {url: "/api/v1/ticket/" + e + "/workflow/list.json", urlParam: {id: e}, dataParam: t};
        if (undefined === i || true == i) {
            a.run(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        } else {
            a.get(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        }
    }
}]).service("chatDetailService", ["cacheService", function (a) {
    this.run = function (e, t, i, r) {
        var n = {url: "api/v1/chats/:id.json", urlParam: {id: parseInt(e)}, dataParam: t};
        if (undefined === i || true == i) {
            a.run(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        } else {
            a.get(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        }
    };
    this.extendClearCache = function (e, t) {
        a.extendClear({url: "chat_detail/:id.json", urlParam: {id: parseInt(e)}, dataParam: t})
    }
}]).service("chatRelatedTicketsService", ["cacheService", function (a) {
    this.run = function (e, t, i, r) {
        var n = {url: "ticket/:id.json", urlParam: e, dataParam: t};
        if (undefined === i || true == i) {
            a.run(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        } else {
            a.get(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        }
    }
}]).service("accessableTicketService", ["cacheService", function (a) {
    this.run = function (e, t, i, r) {
        var n = {url: "/api/v1/ticket/" + e + "/accessable.json", urlParam: {ticketId: e}, dataParam: t};
        if (undefined === i || true == i) {
            a.run(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        } else {
            a.get(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        }
    }
}]).service("ticketSaveCommentService", [function () {
    var i = "";
    return {
        setTicketComment: function (e, t) {
            if (i && typeof i == "function") {
                i(e, t)
            }
        }, saveTicketComment: function (e) {
            i = e
        }
    }
}]).service("newTicketCustomFieldCacheService", [function () {
    var n = {};
    return {
        add: function (e, t) {
            n[e] = t
        }, get: function (e) {
            return n[e]
        }, delete: function (e) {
            delete n[e]
        }, set: function (e, t) {
            var i = n[e].indexOf(t);
            if (i == -1) {
                var r = _.find(n[e], function (e) {
                    return e.id === t.id
                });
                if (r) {
                    i = n[e].indexOf(r)
                }
            }
            if (i !== -1) {
                n[e][i] = t
            } else {
                n[e].splice(i, 1, t)
            }
        }
    }
}]).factory("ticketLogService", ["$resource", function (e) {
    return e("ticket_log/:id.json", {id: "@id"}, {
        query: {method: "GET"},
        get: {method: "GET"},
        add: {method: "POST"},
        update: {method: "PUT"},
        delete: {method: "DELETE"}
    })
}]).factory("ticketSettingMenus", ["ConsoleConfig", function (e) {
    var t = [{
        title: "快捷方式",
        permission: "",
        subMenus: [{permission: "", uri: "quick_reply", title: "快捷回复"}, {
            permission: "",
            uri: "ticket_template",
            title: "工单模板"
        }, {permission: "", uri: "workflow_templet", title: "工作流"}]
    }, {
        title: "服务请求渠道",
        permission: "ticket_setting_via",
        subMenus: [{permission: "", uri: "add_ticket", title: "帮助中心提交工单"}, {
            permission: "",
            uri: "via_email",
            title: "邮件渠道"
        }, {permission: "", uri: "wechat_setting", title: "微信客服"}, {
            permission: "",
            uri: "ticket_web_form",
            title: "网页表单（feedback）"
        }, {permission: "", uri: "webchat_form", title: "在线交谈 / 远程协助"}, {
            permission: "",
            uri: "cti_setting",
            title: "电话渠道"
        }, {permission: "", uri: "desktop_help", title: "帮助中心桌面版"}, {
            permission: "",
            uri: "api_setting",
            title: "API"
        }, {permission: "", uri: "sdk_setting", title: "SDK"}]
    }, {
        title: "工单属性",
        permission: "",
        subMenus: [{
            permission: "ticket_setting_service_catalog",
            uri: "service_catalog",
            title: "服务目录"
        }, {permission: "ticket_setting_customfield", uri: "ticket_custom_field", title: "自定义工单字段"}, {
            permission: "",
            uri: "ticket_list_custom",
            title: "自定义视图"
        }]
    }, {
        title: "商业规则",
        permission: "ticket_setting_business_rules,ticket_setting_automation,ticket_setting_work_time,system_setting_ticket_evaluate",
        subMenus: [{
            permission: "ticket_setting_business_rules",
            uri: "sla",
            title: "SLA"
        }, {
            permission: "ticket_setting_automation",
            uri: "automations",
            title: "自动化程序"
        }, {
            permission: "ticket_setting_work_time",
            uri: "working_day",
            title: "营业时间"
        }, {permission: "system_setting_ticket_evaluate", uri: "evaluate_edit", title: "调查问卷"}]
    }, {
        title: "更多设置",
        type: "ticket_setting_more",
        permission: "",
        subMenus: [{
            name: "客户设置",
            permission: "customer_view_manage,customer_setting_customfield,customer_group_setting_customfield,customer_setting_customfield_url_secret",
            sref: "customer_setting.user_custom_field",
            show: true
        }, {
            name: "社区设置",
            sref: "helpcenter_setting.detail({type:'integral'})",
            show: e.user.role.nameKey == "ROLE_NAME_EDITOR" || e.user.role.nameKey == "ROLE_NAME_ADMIN"
        }, {name: "系统设置", sref: "system_setting", show: true}]
    }];
    return t
}]).factory("ticketService", ["$resource", function (e) {
    return e("ticket/:id.json", {id: "@id"}, {
        query: {method: "GET"},
        get: {method: "GET"},
        add: {method: "POST"},
        update: {method: "PUT"},
        delete: {method: "DELETE"}
    })
}]).factory("webchatService", ["$resource", function (e) {
    return e("chat_detail/:id.json", {id: "@id"}, {
        query: {method: "GET"},
        get: {method: "GET"},
        add: {method: "POST"},
        update: {method: "PUT"},
        delete: {method: "DELETE"}
    })
}]).factory("automationService", ["$resource", function (e) {
    return e("automation/:id.json", {id: "@id"}, {query: {method: "GET"}, get: {method: "GET"}})
}]).factory("ticketSlaService", ["$resource", function (e) {
    return e("ticket_sla/:id.json", {id: "@id"}, {query: {method: "GET"}, get: {method: "GET"}})
}]).factory("ticketStatusOptions", function () {
    var e = [{name: "待抢单", value: "new"}, {name: "待接单", value: "assigned"}, {name: "处理中", value: "open"}, {
        name: "处理完毕",
        value: "solved"
    }, {name: "关闭", value: "closed"}, {name: "暂停", value: "pending"}, {name: "隔离", value: "suspended"}];
    return e
}).factory("ticketTemplateNoteOptions", [function () {
    var e = [{option: "工单：客户", value: "requester", valueType: "requester"}, {
        option: "工单：状态",
        value: "status",
        valueType: "select"
    }, {option: "工单：处理人", value: "engineer", valueType: "engineer"}, {
        option: "工单：添加标签",
        value: "addtag",
        valueType: "text"
    }, {option: "工单：删除标签", value: "deletetag", valueType: "text"}, {
        option: "工单：修改标签",
        value: "modifytag",
        valueType: "text"
    }, {option: "工单：添加抄送", value: "add_ticket_cc", valueType: "add_ticket_cc"}, {
        option: "工单：回复/描述",
        value: "comment",
        valueType: "textarea"
    }, {option: "工单：回复的属性", value: "comment_attribute", valueType: "select"}, {
        option: "工单：添加抄送到客服组",
        value: "add_ticket_cc_servicedesk",
        valueType: "servicedesk"
    }];
    return e
}]).factory("allConditionOptionsTrigger", [function () {
    var e = [{option: "请选择", value: "-1"}, {
        option: "工单 : 状态",
        value: "status",
        valueType: "select"
    }, {option: "工单 : 处理人", value: "engineer", valueType: "engineer"}, {
        option: "工单 : 客服组",
        value: "serviceDesk",
        valueType: "serviceDesk"
    }, {option: "工单 : 客户", value: "requester.id", valueType: "requester"}, {
        option: "工单 : 创建人",
        value: "user",
        valueType: "user"
    }, {option: "工单 : 客户组", value: "userGroup", valueType: "userGroup"}, {
        option: "工单 : 渠道",
        value: "via",
        valueType: "via"
    }, {option: "工单 : 服务评价", value: "evaluate.score", valueType: "select"}, {
        option: "工单 : 回复",
        value: "ticket_comment",
        valueType: "text"
    }, {option: "工单 : 回复人身份", value: "ticket_comment_user_type", valueType: "select"}, {
        option: "工单 : 解决否",
        value: "evaluate.solved",
        valueType: "select"
    }];
    return e
}]).factory("anyConditionOptionsTrigger", [function () {
    var e = [{option: "请选择", value: "-1"}, {
        option: "工单 : 状态",
        value: "status",
        valueType: "select"
    }, {option: "工单 : 处理人", value: "engineer", valueType: "engineer"}, {
        option: "工单 : 客服组",
        value: "serviceDesk",
        valueType: "serviceDesk"
    }, {option: "工单 : 客户", value: "requester.id", valueType: "requester"}, {
        option: "工单 : 创建人",
        value: "user",
        valueType: "user"
    }, {option: "工单 : 客户组", value: "userGroup", valueType: "userGroup"}, {
        option: "工单 : 渠道",
        value: "via",
        valueType: "via"
    }, {option: "工单 : 服务评价", value: "evaluate.score", valueType: "select"}, {
        option: "工单 : 回复",
        value: "ticket_comment",
        valueType: "text"
    }, {option: "工单 : 回复人身份", value: "ticket_comment_user_type", valueType: "select"}, {
        option: "工单 : 解决否",
        value: "evaluate.solved",
        valueType: "select"
    }];
    return e
}]).factory("executeOptionsTrigger", [function () {
    var e = [{option: "请选择", value: "-1"}, {
        option: "工单 : 状态",
        value: "status",
        valueType: "select"
    }, {option: "工单 : 处理人", value: "engineer", valueType: "engineer"}, {
        option: "工单 : 客服组",
        value: "serviceDesk",
        valueType: "serviceDesk"
    }, {option: "工单 : 添加标签", value: "add_tags", valueType: "text"}, {
        option: "工单 : 删除标签",
        value: "remove_tags",
        valueType: "text"
    }, {option: "工单 : 更改标签", value: "modifyTag", valueType: "text"}, {
        option: "工单 : 添加抄送",
        value: "addCC",
        valueType: "addCC"
    }, {option: "工单 : 回复", value: "ticket_comment", valueType: "ticketComment"}, {
        option: "通知 : 发邮件给用户",
        value: "mailto_user",
        valueType: "informUser"
    }, {option: "通知 : 发邮件给客服组", value: "mailto_service_desk", valueType: "informUserGroup"}, {
        option: "工单 : 删除工单",
        value: "deleteTicket",
        valueType: "select"
    }, {option: "工单 : 清除评价", value: "deleteTicketEvalute", valueType: ""}];
    return e
}]).factory("triggerCompareOptions", [function () {
    var e = [{option: "是", value: "$eq"}, {option: "否", value: "$ne"}, {
        option: "包含以下字符串",
        value: "$include"
    }, {option: "不含以下字符串", value: "$not_include"}, {option: "是", value: "$eq_ticket_custom_field"}, {
        option: "不是",
        value: "$ne_or_null_ticket_custom_field"
    }, {option: "勾选", value: "$eq_ticket_custom_field"}, {
        option: "不勾选",
        value: "$ne_or_null_ticket_custom_field"
    }, {option: "包含以下字符串", value: "$like_ticket_custom_field"}, {
        option: "不含以下字符串",
        value: "$not_like_ticket_custom_field"
    }, {option: "是", value: "$eq_ticket_custom_field"}, {option: "小于", value: "$lt_ticket_custom_field"}, {
        option: "大于",
        value: "$gt_ticket_custom_field"
    }, {option: "至少包含其中一个", value: "$ticket_custom_field_options_include"}, {
        option: "不含以下",
        value: "$ticket_custom_field_options_not_include"
    }, {option: "大于等于", value: "$in"}, {option: "小于", value: "$not_in"}, {
        option: "至少是下列一个",
        value: "$in"
    }, {option: "不是以下", value: "$not_in"}, {option: "是", value: "$in"}, {option: "不是", value: "$not_in"}];
    return e
}]).factory("allConditionOptionsTriggerWebchat", [function () {
    var e = [{option: "请选择", value: "-1"}, {
        option: "会话 ：客服组",
        value: "serviceDesk",
        valueType: "serviceDesk"
    }, {option: "会话 ：客户组", value: "userGroup", valueType: "userGroup"}, {
        option: "会话 : 渠道",
        value: "via",
        valueType: "via"
    }, {option: "会话 : 状态", value: "status", valueType: "select"}];
    return e
}]).factory("anyConditionOptionsTriggerWebchat", [function () {
    var e = [{option: "请选择", value: "-1"}, {
        option: "会话 ：客服组",
        value: "serviceDesk",
        valueType: "serviceDesk"
    }, {option: "会话 ：客户组", value: "userGroup", valueType: "userGroup"}, {
        option: "会话 : 渠道",
        value: "via",
        valueType: "via"
    }, {option: "会话 : 状态", value: "status", valueType: "select"}];
    return e
}]).factory("triggerCompareOptionsWebchat", [function () {
    var e = [{option: "是", value: "$eq"}, {option: "不是", value: "$ne"}, {option: "大于等于", value: "$in"}, {
        option: "小于",
        value: "$not_in"
    }, {option: "至少是下列一个", value: "$in"}, {option: "不是以下", value: "$not_in"}, {
        option: "是",
        value: "$in"
    }, {option: "不是", value: "$not_in"}];
    return e
}]).factory("allConditionOptionsTriggerWebchat", [function () {
    var e = [{option: "请选择", value: "-1"}, {
        option: "会话 ：客服组",
        value: "serviceDesk",
        valueType: "serviceDesk"
    }, {option: "会话 ：客户组", value: "userGroup", valueType: "userGroup"}, {
        option: "会话 : 渠道",
        value: "via",
        valueType: "via"
    }, {option: "会话 : 状态", value: "status", valueType: "select"}];
    return e
}]).factory("anyConditionOptionsTriggerWebchat", [function () {
    var e = [{option: "请选择", value: "-1"}, {
        option: "会话 ：客服组",
        value: "serviceDesk",
        valueType: "serviceDesk"
    }, {option: "会话 ：客户组", value: "userGroup", valueType: "userGroup"}, {
        option: "会话 : 渠道",
        value: "via",
        valueType: "via"
    }, {option: "会话 : 状态", value: "status", valueType: "select"}];
    return e
}]).factory("executeOptionsTriggerWebchat", [function () {
    var e = [{option: "请选择", value: "-1"}, {option: "会话 : 回复", value: "chatComment", valueType: "chatComment"}];
    return e
}]).factory("triggerCompareOptionsWebchat", [function () {
    var e = [{option: "是", value: "$eq"}, {option: "不是", value: "$ne"}, {option: "大于等于", value: "$in"}, {
        option: "小于",
        value: "$not_in"
    }, {option: "至少是下列一个", value: "$in"}, {option: "不是以下", value: "$not_in"}, {
        option: "是",
        value: "$in"
    }, {option: "不是", value: "$not_in"}];
    return e
}]).factory("allConditionOptions", [function () {
    var e = [{option: "请选择", value: "-1"}, {
        option: "工单 : 状态",
        value: "status",
        valueType: "select"
    }, {option: "工单 : 处理人", value: "engineer.id", valueType: "engineer"}, {
        option: "工单 : 客服组",
        value: "serviceDesk.id",
        valueType: "serviceDesk"
    }, {option: "工单 : 客户", value: "requester.id", valueType: "requester"}, {
        option: "工单 : 创建人",
        value: "user.id",
        valueType: "user"
    }, {option: "工单 : 客户组", value: "requester.userGroup.id", valueType: "userGroup"}, {
        option: "工单 : 渠道",
        value: "via",
        valueType: "via"
    }, {option: "工单 : 服务评价", value: "evaluate.score", valueType: "select"}, {
        option: "工单 : 回复",
        value: "ticketComment",
        valueType: "text"
    }, {option: "工单 : 解决否", value: "evaluate.solved", valueType: "select"}, {
        option: "工单 : 创建以来小时数",
        value: "createdAt",
        valueType: "number"
    }, {option: "工单 : 处理中以来小时数", value: "ticketMetric.responseAt", valueType: "number"}, {
        option: "工单 : 暂停以来小时数",
        value: "ticketMetric.pausedAt",
        valueType: "number"
    }, {option: "工单 : 处理完毕以来小时数", value: "ticketMetric.solvedAt", valueType: "number"}, {
        option: "工单 : 最后回复以来小时数",
        value: "lastReply",
        valueType: "number"
    }, {option: "工单 : 客户最后回复以来小时数", value: "customerLastReply", valueType: "number"}, {
        option: "工单 : 客服最后回复以来小时数",
        value: "engineerLastReply",
        valueType: "number"
    }];
    return e
}]).factory("automationCompareOptions", [function () {
    var e = [{option: "是", value: "$eq"}, {option: "否", value: "$ne_or_null"}, {
        option: "大于",
        value: "$gt"
    }, {option: "小于", value: "$lt"}, {option: "是", value: "$eq_hours"}, {
        option: "小于",
        value: "$lt_hours"
    }, {option: "大于", value: "$gt_hours"}, {option: "是", value: "$eq_last_comment_hours"}, {
        option: "小于",
        value: "$lt_last_comment_hours"
    }, {option: "大于", value: "$gt_last_comment_hours"}, {option: "至少包含其中一个", value: "$tags_include"}, {
        option: "不含以下",
        value: "$tags_not_include"
    }, {option: "包含以下字符串", value: "$like"}, {option: "不含以下字符串", value: "$not_like"}, {
        option: "是",
        value: "$eq_engineer"
    }, {option: "否", value: "$ne_engineer"}, {option: "包含", value: "$comment_contain"}, {
        option: "不包含",
        value: "$comment_not_contain"
    }, {option: "是", value: "$eq_via"}, {option: "不是", value: "$ne_or_null_via"}, {
        option: "是",
        value: "$eq_ticket_custom_field"
    }, {option: "不是", value: "$ne_or_null_ticket_custom_field"}, {
        option: "勾选",
        value: "$eq_ticket_custom_field"
    }, {option: "不勾选", value: "$ne_or_null_ticket_custom_field"}, {
        option: "包含以下字符串",
        value: "$like_ticket_custom_field"
    }, {option: "不含以下字符串", value: "$not_like_ticket_custom_field"}, {
        option: "是",
        value: "$eq_ticket_custom_field"
    }, {option: "小于", value: "$lt_ticket_custom_field"}, {
        option: "大于",
        value: "$gt_ticket_custom_field"
    }, {option: "至少包含其中一个", value: "$ticket_custom_field_options_include"}, {
        option: "不含以下",
        value: "$ticket_custom_field_options_not_include"
    }, {option: "大于等于", value: "$in"}, {option: "小于", value: "$not_in"}];
    return e
}]).factory("anyConditionOptions", [function () {
    var e = [{option: "请选择", value: "-1"}, {
        option: "工单 : 状态",
        value: "status",
        valueType: "select"
    }, {option: "工单 : 处理人", value: "engineer.id", valueType: "engineer"}, {
        option: "工单 : 客服组",
        value: "serviceDesk.id",
        valueType: "serviceDesk"
    }, {option: "工单 : 客户", value: "requester.id", valueType: "requester"}, {
        option: "工单 : 创建人",
        value: "user.id",
        valueType: "user"
    }, {option: "工单 : 客户组", value: "requester.userGroup.id", valueType: "userGroup"}, {
        option: "工单 : 渠道",
        value: "via",
        valueType: "via"
    }, {option: "工单 : 服务评价", value: "evaluate.score", valueType: "select"}, {
        option: "工单 :  回复",
        value: "ticketComment",
        valueType: "text"
    }, {option: "工单 : 解决否", value: "evaluate.solved", valueType: "select"}];
    return e
}]).factory("executeOptions", [function () {
    var e = [{option: "请选择", value: "-1"}, {
        option: "工单 : 状态",
        value: "status",
        valueType: "select"
    }, {option: "工单 : 处理人", value: "engineer.id", valueType: "engineer"}, {
        option: "工单 : 客服组",
        value: "serviceDesk.id",
        valueType: "serviceDesk"
    }, {option: "工单 : 添加标签", value: "addTag", valueType: "text"}, {
        option: "工单 : 删除标签",
        value: "deleteTag",
        valueType: "text"
    }, {option: "工单 : 更改标签", value: "modifyTag", valueType: "text"}, {
        option: "工单 : 添加抄送",
        value: "addCC",
        valueType: "addCC"
    }, {option: "工单 : 回复", value: "ticketComment", valueType: "ticketComment"}, {
        option: "通知 : 发邮件给用户",
        value: "noticeUser",
        valueType: "informUser"
    }, {option: "通知 : 发邮件给客服组", value: "noticeGroup", valueType: "informUserGroup"}, {
        option: "工单 : 删除工单",
        value: "deleteTicket",
        valueType: "select"
    }, {option: "工单 : 清除评价", value: "deleteTicketEvalute", valueType: ""}];
    return e
}]).factory("allConditionOptionsWebchat", [function () {
    var e = [{option: "请选择", value: "-1"}, {
        option: "会话：结束以来小时数",
        value: "closedAt",
        valueType: "number"
    }, {option: "会话：客户最后回复以来的分钟数", value: "customerLastReply", valueType: "number"}, {
        option: "会话：客服最后回复以来的分钟数",
        value: "engineerLastReply",
        valueType: "number"
    }, {option: "会话：是否溢出", value: "status", valueType: "checkbox"}];
    return e
}]).factory("automationCompareOptionsWebchat", [function () {
    var e = [{option: "是", value: "$eq"}, {option: "否", value: "$ne_or_null"}, {
        option: "大于",
        value: "$gt"
    }, {option: "小于", value: "$lt"}, {option: "是", value: "$eq_hours"}, {
        option: "小于",
        value: "$lt_hours"
    }, {option: "大于", value: "$gt_hours"}, {option: "是", value: "$eq_last_comment_hours"}, {
        option: "小于",
        value: "$lt_last_comment_hours"
    }, {option: "大于", value: "$gt_last_comment_hours"}, {option: "是", value: "$eq_last_comment_minutes"}, {
        option: "小于",
        value: "$lt_last_comment_minutes"
    }, {option: "大于", value: "$gt_last_comment_minutes"}, {option: "至少包含其中一个", value: "$tags_include"}, {
        option: "不含以下",
        value: "$tags_not_include"
    }, {option: "包含以下字符串", value: "$like"}, {option: "不含以下字符串", value: "$not_like"}, {
        option: "是",
        value: "$eq_engineer"
    }, {option: "否", value: "$ne_engineer"}, {option: "包含", value: "$comment_contain"}, {
        option: "不包含",
        value: "$comment_not_contain"
    }, {option: "是", value: "$eq_via"}, {option: "不是", value: "$ne_or_null_via"}, {
        option: "是",
        value: "$eq_ticket_custom_field"
    }, {option: "不是", value: "$ne_or_null_ticket_custom_field"}, {
        option: "勾选",
        value: "$eq_ticket_custom_field"
    }, {option: "不勾选", value: "$ne_or_null_ticket_custom_field"}, {
        option: "包含以下字符串",
        value: "$like_ticket_custom_field"
    }, {option: "不含以下字符串", value: "$not_like_ticket_custom_field"}, {
        option: "是",
        value: "$eq_ticket_custom_field"
    }, {option: "小于", value: "$lt_ticket_custom_field"}, {
        option: "大于",
        value: "$gt_ticket_custom_field"
    }, {option: "至少包含其中一个", value: "$ticket_custom_field_options_include"}, {
        option: "不含以下",
        value: "$ticket_custom_field_options_not_include"
    }, {option: "大于等于", value: "$in"}, {option: "小于", value: "$not_in"}, {option: "是", value: "$eq"}, {
        option: "否",
        value: "$ne"
    }];
    return e
}]).factory("anyConditionOptionsWebchat", [function () {
    var e = [{option: "会话：结束以来小时数", value: "closedAt", valueType: "number"}, {
        option: "会话：客户最后回复以来的分钟数",
        value: "customerLastReply",
        valueType: "number"
    }, {option: "会话：客服最后回复以来的分钟数", value: "engineerLastReply", valueType: "number"}, {
        option: "会话：是否溢出",
        value: "status",
        valueType: "checkbox"
    }];
    return e
}]).factory("executeOptionsWebchat", [function () {
    var e = [{option: "请选择", value: "-1"}, {
        option: "会话 ：删除会话",
        value: "deleteChat",
        valueType: "null"
    }, {option: "会话 ：结束会话", value: "closeChat", valueType: "select"}, {
        option: "会话 ：回复",
        value: "chatComment",
        valueType: "chatComment"
    }];
    return e
}]).factory("ticketListCustomOptions", [function () {
    var e = [{option: "编号", value: "no", width: "w100", isDefault: true}, {
        option: "客户",
        value: "requester.name",
        width: "w200",
        isDefault: true
    }, {option: "处理人", value: "engineer.user.name", width: "w200", isDefault: true}, {
        option: "客服组",
        value: "serviceDesk.name",
        width: "w200",
        isDefault: true
    }, {option: "创建人", value: "user.name", width: "w200", isDefault: true}, {
        option: "审核人",
        value: "reviewUser.name",
        width: "w200",
        isDefault: true
    }, {option: "抄送给", value: "copyTo", width: "w200", isDefault: true}, {
        option: "客户组",
        value: "requester.userGroup.name",
        width: "w200",
        isDefault: true
    }, {option: "更新于", value: "updatedAt", width: "w200", isDefault: true}, {
        option: "入口",
        value: "via.source",
        width: "w150",
        isDefault: true
    }, {option: "渠道", value: "via.channelName", width: "w150", isDefault: true}, {
        option: "删除人",
        value: "deleter.user.name",
        width: "w200",
        isDefault: true
    }, {option: "删除原因", value: "deleteReason", width: "w200", isDefault: true}, {
        option: "解决否",
        value: "evaluate.solved",
        width: "w200",
        isDefault: true
    }, {option: "满意度", value: "evaluate.score", width: "w200", isDefault: true}, {
        option: "客户意见",
        value: "evaluate.suggestion",
        width: "w200",
        isDefault: true
    }, {option: "暂停于", value: "ticketMetric.pausedAt", width: "w200", isDefault: true}, {
        option: "删除于",
        value: "deletedAt",
        width: "w200",
        isDefault: true
    }, {option: "创建于", value: "createdAt", width: "w200", isDefault: true}, {
        option: "响应于",
        value: "ticketMetric.responseAt",
        width: "w200",
        isDefault: true
    }, {option: "响应耗时", value: "ticketMetric.responseMinutes", width: "w200", isDefault: true}, {
        option: "完成于",
        value: "ticketMetric.solvedAt",
        width: "w200",
        isDefault: true
    }, {option: "完成耗时", value: "ticketMetric.solveMinutes", width: "w200", isDefault: true}, {
        option: "要求完成时间",
        value: "ticketMetric.planSolvedAt",
        width: "w200",
        isDefault: true
    }, {option: "解决方案", value: "solutionId", width: "w400", isDefault: true}, {
        option: "忠诚度",
        value: "evaluate.loyalty",
        width: "w400",
        isDefault: true
    }, {option: "推荐度", value: "evaluate.recommend", width: "w400", isDefault: true}, {
        option: "SLA响应服务目标",
        value: "ticketMetric.slaResponseTarget",
        width: "w400",
        isDefault: true
    }, {option: "SLA处理服务目标", value: "ticketMetric.slaSolveTarget", width: "w400", isDefault: true}];
    return e
}]).factory("ticketListCustomGroupByOptions", [function () {
    var e = [{option: "状态", value: "status", width: "w200"}, {
        option: "客户",
        value: "requester.name",
        width: "w200"
    }, {option: "处理人", value: "engineer.user.name", width: "w200"}, {
        option: "客服组",
        value: "serviceDesk.name",
        width: "w200"
    }, {option: "客户组", value: "requester.userGroup.name", width: "w200"}, {
        option: "入口",
        value: "via.source",
        width: "w150"
    }, {option: "渠道", value: "via.channelName", width: "w150"}, {
        option: "服务目录",
        value: "serviceCatalog.name",
        width: "w150"
    }, {option: "优先级", value: "priority", width: "w150"}, {
        option: "类型",
        value: "ticketType.name",
        width: "w150"
    }, {option: "解决否", value: "evaluate.solved", width: "w200"}, {
        option: "满意度",
        value: "evaluate.score",
        width: "w200"
    }];
    return e
}]).factory("ticketListCustomOrderByOptions", [function () {
    var e = [{option: "编号", value: "no", width: "w100"}, {
        option: "更新于",
        value: "updatedAt",
        width: "w200"
    }, {option: "完成于", value: "ticketMetric.solvedAt", width: "w200"}, {
        option: "暂停于",
        value: "ticketMetric.pausedAt",
        width: "w200"
    }, {option: "删除于", value: "deletedAt", width: "w200"}, {option: "创建于", value: "createdAt", width: "w200"}];
    return e
}]).factory("ticketListFilterOptions", function () {
    var e = {};
    e.firstFilterOptions = function (e) {
        if (e == "all") {
            var t = [{option: "工单:状态", value: "status", valueType: "select"}, {
                option: "工单:类型",
                value: "ticketType.id",
                valueType: "select"
            }, {option: "工单:优先级", value: "priority", valueType: "select"}, {
                option: "工单:服务目录",
                value: "serviceCatalog.id",
                valueType: "serviceCatalog"
            }, {option: "工单:处理人", value: "engineer.id", valueType: "engineer"}, {
                option: "工单:创建人",
                value: "user.id",
                valueType: "user"
            }, {option: "工单:抄送给", value: "copyTo", valueType: "copyTo"}, {
                option: "工单:客服组",
                value: "serviceDesk.id",
                valueType: "serviceDesk"
            }, {option: "工单:客户", value: "requester.id", valueType: "requester"}, {
                option: "工单:解决否",
                value: "evaluate.solved",
                valueType: "select"
            }, {option: "工单:客户组", value: "requester.userGroup.id", valueType: "userGroup"}, {
                option: "工单:标签",
                value: "tags",
                valueType: "text"
            }, {option: "工单:主题", value: "subject", valueType: "text"}, {
                option: "工单:渠道",
                value: "via.channel",
                valueType: "select"
            }, {option: "工单:服务评价", value: "evaluate.score", valueType: "select"}, {
                option: "工单:创建以来小时数",
                value: "createdAt",
                valueType: "number"
            }, {option: "工单:处理中以来小时数", value: "ticketMetric.responseAt", valueType: "number"}, {
                option: "工单:暂停以来小时数",
                value: "ticketMetric.pausedAt",
                valueType: "number"
            }, {option: "工单:处理完毕以来小时数", value: "ticketMetric.solvedAt", valueType: "number"}, {
                option: "工单:最后回复以来小时数",
                value: "lastReply",
                valueType: "number"
            }, {option: "工单:客户最后回复以来小时数", value: "customerLastReply", valueType: "number"}, {
                option: "工单:客服最后回复以来小时数",
                value: "engineerLastReply",
                valueType: "number"
            }, {option: "工单:由客服创建且所在的组", value: "engineerGroup", valueType: "select"}, {
                option: "工单:剩余完成时间（分钟）",
                value: "ticketMetric.planSolvedAt",
                valueType: "number"
            }, {option: "工单:最后一条回复的发送者（客户/客服）", value: "lastReplyUserType", valueType: "select"}, {
                option: "工单:评价",
                value: "ticketHaveEvaluate",
                valueType: "select"
            }];
            return t
        }
    };
    e.secondFilterOptions = function (e) {
        if ("status,ticketType.id,priority,requester.id,requester.userGroup.id,via.channel,evaluate.score,engineer.id,user.id".indexOf(e) != -1) {
            if ("status".indexOf(e) != -1) {
                return [{option: "是", value: "$eq"}, {option: "不是", value: "$ne"}, {
                    option: "大于等于",
                    value: "$in"
                }, {option: "小于", value: "$not_in"}]
            } else if ("serviceDesk.id".indexOf(e) != -1) {
                return [{option: "是", value: "$in"}, {option: "不是", value: "$not_in"}]
            } else if ("requester.userGroup.id".indexOf(e) != -1) {
                return [{option: "至少是下列一个", value: "$in"}, {option: "不是以下", value: "$not_in"}]
            } else {
                return [{option: "是", value: "$eq"}, {option: "不是", value: "$ne"}]
            }
        } else if ("serviceCatalog.id".indexOf(e) != -1) {
            return [{option: "是且包含其子目录", value: "$in"}, {option: "是但不包含其子目录", value: "$eq"}, {
                option: "不是且不是其子目录",
                value: "$not_in"
            }, {option: "不是但可能是其子目录", value: "$ne_or_null"}]
        } else if ("createdAt,ticketMetric.responseAt,ticketMetric.solvedAt,ticketMetric.pausedAt".indexOf(e) != -1) {
            return [{option: "是", value: "$eq_hours"}, {option: "小于", value: "$lt_hours"}, {
                option: "大于",
                value: "$gt_hours"
            }]
        } else if ("lastReply,customerLastReply,engineerLastReply".indexOf(e) != -1) {
            return [{option: "是", value: "$eq_last_comment_hours"}, {
                option: "小于",
                value: "$lt_last_comment_hours"
            }, {option: "大于", value: "$gt_last_comment_hours"}]
        } else if ("subject".indexOf(e) != -1) {
            return [{option: "包含以下字符串", value: "$include"}, {option: "不含以下字符串", value: "$not_include"}]
        } else if ("tags".indexOf(e) != -1) {
            return [{option: "至少包含其中一个", value: "$tags_include"}, {option: "不含以下", value: "$tags_not_include"}]
        } else if ("copyTo".indexOf(e) != -1) {
            return [{option: "至少包含其中一个", value: "$in"}, {option: "不含以下", value: "$not_in"}]
        } else if (e.indexOf("ticketcustomfield") != -1) {
            if (e.indexOf("multi_options") != -1) {
                return [{option: "至少包含其中一个", value: "$ticket_custom_field_options_include"}, {
                    option: "不含以下",
                    value: "$ticket_custom_field_options_not_include"
                }]
            } else if (e.indexOf("date") != -1 || e.indexOf("number") != -1 || e.indexOf("decimal") != -1) {
                return [{option: "是", value: "$eq_ticket_custom_field"}, {
                    option: "小于",
                    value: "$lt_ticket_custom_field"
                }, {option: "大于", value: "$gt_ticket_custom_field"}]
            } else if (e.indexOf("textarea") != -1) {
                return [{option: "包含以下字符串", value: "$like_ticket_custom_field"}, {
                    option: "不含以下字符串",
                    value: "$not_like_ticket_custom_field"
                }]
            } else if (e.indexOf("checkbox") != -1) {
                return [{option: "勾选", value: "$eq_ticket_custom_field"}, {
                    option: "不勾选",
                    value: "$ne_or_null_ticket_custom_field"
                }]
            } else if (e.indexOf("text") != -1) {
                return [{option: "是", value: "$eq_ticket_custom_field"}, {
                    option: "不是",
                    value: "$ne_or_null_ticket_custom_field"
                }, {option: "包含以下字符串", value: "$like_ticket_custom_field"}, {
                    option: "不含以下字符串",
                    value: "$not_like_ticket_custom_field"
                }]
            } else {
                return [{option: "是", value: "$eq_ticket_custom_field"}, {
                    option: "不是",
                    value: "$ne_or_null_ticket_custom_field"
                }]
            }
        } else if ("ticketMetric.planSolvedAt".indexOf(e) != -1) {
            return [{option: "是", value: "$eq"}, {option: "小于", value: "$lt"}, {option: "大于", value: "$gt"}]
        } else if ("evaluate.solved".indexOf(e) != -1) {
            return [{option: "是", value: "$eq"}]
        } else if ("lastReplyUserType".indexOf(e) != -1) {
            return [{option: "是", value: "$eq_last_comment_user_type"}]
        } else if ("ticketHaveEvaluate".indexOf(e) != -1) {
            return [{option: "是", value: "$eq_has_evaluate"}]
        } else {
            return [{option: "是", value: "$in"}, {option: "不是", value: "$not_in"}]
        }
    };
    return e
});
(function (e) {
    "use strict";
    e.module("eweiApp.ticket").service("ticketRecentViewService", t);
    t.$inject = [];
    function t() {
        var r = 15;
        var n = [];
        var a = null;

        function o(e) {
            var t = n.length;
            var i = -1;
            for (var r = 0; r < t; r++) {
                if (n[r].id == e) {
                    i = r;
                    break
                }
            }
            return i
        }

        function e() {
        }

        function t() {
        }

        this.init = function (e) {
            a = e
        };
        this.appendTicket = function (e) {
            var t = o(e.id);
            var i = n.length;
            if (t > -1) {
                n[t] = e
            } else {
                if (i < r) {
                    n.unshift(e);
                    if (typeof a === "function") {
                        a()
                    }
                } else {
                    n.pop();
                    n.unshift(e);
                    if (typeof a === "function") {
                        a()
                    }
                }
            }
        };
        this.deleteTicket = function (e) {
            var t = o(e);
            if (t > -1) {
                n.splice(t, 1);
                if (typeof a === "function") {
                    a()
                }
            }
        };
        this.getTickets = function () {
            return n
        }
    }
})(angular);
(function (e) {
    "use strict";
    e.module("eweiApp.ticket").factory("sessionControlVal", t);
    function t() {
        var i = {};
        return {
            setSessionControlVal: function (e, t) {
                i[e] = t
            }, getSessionControlVal: function (e) {
                return i[e]
            }
        }
    }
})(angular);
(function (e) {
    "use strict";
    e.module("eweiApp.ticket").service("ticketOpenTabService", t);
    t.$inject = [];
    function t() {
        var n = [];

        function a(e) {
            var t = n.length;
            var i = -1;
            for (var r = 0; r < t; r++) {
                if (n[r].ticketId == e) {
                    i = r;
                    break
                }
            }
            return i
        }

        function e() {
        }

        function t() {
        }

        this.appendTicket = function (e) {
            var t = a(e);
            if (t > -1) {
                n[t].ticketId = e
            } else {
                n.push({
                    ticketId: e,
                    settings: {
                        ticketType: true,
                        ticketTemplateList: true,
                        ticketStatusColor: true,
                        workflowTemplate: true,
                        quickreply: true,
                        serviceCatalog: true,
                        ticketCustomField: true,
                        serviceCatalogExtend: true,
                        ticketWorkflowList: true,
                        ticketSubscriptions: true
                    }
                })
            }
        };
        this.deleteTicket = function (e) {
            var t = a(e);
            if (t > -1) {
                n.splice(t, 1)
            }
        };
        this.getSetting = function (e, t) {
            var i = a(e);
            if (i > -1) {
                for (var r in n[i].settings) {
                    if (r == t) {
                        return n[i].settings[r]
                    }
                }
            } else {
                return true
            }
        };
        this.setSetting = function (e, t, i) {
            var r = a(e);
            if (r > -1) n[r].settings[t] = i
        };
        this.getTicketId = function (e) {
            var t = a(e);
            if (t > -1) {
                return n[t].ticketId
            } else {
                return -1
            }
        }
    }
})(angular);
this.org = this.org || {};
org.ewei = org.ewei || {};
(function (e, p) {
    "use strict";
    e.module("eweiApp.remoteControlWidget").service("remoteControlService", t);
    t.$inject = ["coreNotifyService", "ConsoleConfig", "$http"];
    function t(r, n, a) {
        var t = this;
        var o = null;
        var s = true;
        var l = null;
        t.cmdRet = {respondPP: u, respondPT: i, respondCT: c, respondPV: e};
        function e(e) {
            var t = e.result == 0 ? "success" : "failed";
            var i = e.result == 0 ? "video_call_start" : "video_call_end";
            r.doNotify(r.constant.EVENT_WIDGET_REMOTE_STATUS, {p2pStatus: t});
            if (e.jsparam.chatId) {
                d({chatId: e.jsparam.chatId, operate: i})
            } else {
                if (o) {
                    d({chatId: o, operate: i});
                    l = null;
                    s = true
                } else {
                    s = false;
                    l = i
                }
                if (i === "video_call_end") {
                    o = null
                }
            }
            void 0
        }

        function i(e) {
            r.doNotify(r.constant.EVENT_WIDGET_REMOTE_STATUS, {clientStatus: e.result == 0 ? "success" : "failed"})
        }

        function c(e) {
            r.doNotify(r.constant.EVENT_WIDGET_REMOTE_STATUS, {chatStatus: e.result == 0 ? "success" : "failed"});
            o = e.jsparam.chatId;
            if (s === false) {
                d({chatId: o, operate: l})
            }
            void 0
        }

        function u(e) {
            var t = e.result == 0 ? "success" : "failed";
            var i = e.result == 0 ? "remote_desk_start" : "remote_desk_end";
            r.doNotify(r.constant.EVENT_WIDGET_REMOTE_STATUS, {p2pStatus: t});
            if (e.jsparam.chatId) {
                d({chatId: e.jsparam.chatId, operate: i})
            } else {
                if (o) {
                    d({chatId: o, operate: i});
                    l = null;
                    s = true
                } else {
                    s = false;
                    l = i
                }
                if (i === "remote_desk_end") {
                    o = null
                }
            }
            void 0
        }

        function d(e) {
            var t = e.chatId;
            if (!t)return;
            var i = {
                type: "log",
                operate: e.operate,
                createdAt: p.utils.now(),
                isPublic: "true",
                user: n.user,
                uId: p.utils.uuid(32, 16).toLowerCase(),
                chat: {id: t}
            };
            var r = {channel: "/provider/" + n.provider.id + "/chat/" + t, from: n.user.name, log: i};
            a({
                url: "webchat_message/" + t,
                method: "POST",
                params: {t: (new Date).getTime()},
                data: r
            }).success(function (e, t, i, r) {
                void 0
            })
        }

        t.parseMessage = function (e) {
            t.cmdRet[e.cmd](e)
        }
    }
})(angular, org.ewei);
(function (e) {
    "use strict";
    e.module("eweiApp.common").service("ctiService", t);
    t.$inject = ["coreNotifyService", "coreModelService", "apiCtiViaListService", "ctiUsbService", "ctiSipService", "apiCtiViaDetailService"];
    function t(t, i, e, r, n, a) {
        var o = this;
        var s = o.__proto__.constructor.name + "_" + (new Date).valueOf();
        var l = null;
        var c = false;
        o.cmdRet = {respondWR: u};
        o.run = function (e) {
            l = e;
            c = false;
            n.init(e);
            r.init(e);
            p()
        };
        o.setActiveCtiID = function (e) {
            i.config.activeCtiID = e;
            var t = {cmd: "requestWW", id: e + ""};
            d(t)
        };
        o.parseMessage = function (e) {
            o.cmdRet[e.cmd](e)
        };
        function u(e) {
            i.config.activeCtiID = e.id;
            f()
        }

        function d(e) {
            if (typeof l === "object") {
                var t = eweiCommon.uuid(32, 16);
                var i = "2JX" + t + "|" + JSON.stringify(e);
                l.send(i)
            }
        }

        function p() {
            var e = {cmd: "requestWR"};
            d(e)
        }

        function f() {
            e.run(t.constant.EVENT_DETAIL_CTIS, "", {}, function (e) {
                a.run(t.constant.EVENT_CTI_VIA_DETAIL, i.config.activeCtiID, {}, null)
            })
        }

        function m() {
            if (false == c) {
                var e = i.config.activeCtiID;
                if (-1 != e) {
                    var t = i.detail.ctis.get(e);
                    if (t && t.enabled) {
                        c = true;
                        if ("phone_box" == t.voiceSystem) {
                            r.run()
                        } else if ("sip" == t.voiceSystem) {
                            n.run()
                        }
                    }
                }
            }
        }

        function v() {
            t.register(s, t.constant.EVENT_DETAIL_CTIS, function (e, t) {
                m()
            })
        }

        v()
    }
})(angular);
(function (R) {
    "use strict";
    R.module("eweiApp.common").service("ctiUsbService", e);
    e.$inject = ["coreNotifyService", "coreModelService", "apiCtiCallRecordService", "apiCtiChatStateService", "ConsoleConfig", "$timeout", "attachmentService", "$http", "apiCtiUpdateCallRecordService"];
    function e(r, n, a, o, s, t, l, c, i) {
        var u = this;
        var e = u.__proto__.constructor.name + "_" + (new Date).valueOf();
        var d = undefined;
        var p = false;
        var f = false;
        var m = "offline";
        var v = true;
        var g = {uboxHandle: "0", chatId: "", callRecordId: 0, beginTime: 0, telMan: {}};
        u.cmdRet = {
            answrUSBP: E,
            requestCI: A,
            requestCN: b,
            respondUP: N,
            respondHP: I,
            respondMC: P,
            respondCO: D,
            respondRG: $,
            respondAM: L,
            respondER: U
        };
        u.init = function (e) {
            d = e
        };
        u.run = function () {
            var e = {cmd: "startUSBP"};
            h(e);
            t(function () {
                if (false == p) {
                    E({result: "false"})
                }
            }, 10 * 1e3)
        };
        u.stop = function () {
            var e = {cmd: "stoppUSBP"};
            h(e);
            p = false;
            m = "offline"
        };
        u.getStarted = function () {
            return p
        };
        u.setUser = function (e, t) {
            if (g) {
                g.telMan = R.copy(t)
            }
        };
        u.getUserState = function () {
            return m
        };
        u.setUserState = function (e) {
            m = e
        };
        u.chatCreated = function (e, t, i) {
            if (v && f) {
                var r = {
                    cmd: "Estabsess",
                    bucket: e.bucket,
                    accesskey: e.accesskey,
                    secretkey: e.secretkey,
                    key: i,
                    callbackUrl: s.qiniuCallBackUrl,
                    jsparam: {chatId: t.chatId, type: t.type, GUID: eweiCommon.uuid(32, 16)},
                    uboxHandle: g.uboxHandle
                };
                h(r);
                void 0
            }
            y(t.chatId, i);
            g.chatId = t.chatId;
            o.run("connected", t.chatId)
        };
        u.callout = function (e) {
            _(false, true, e);
            var t = {cmd: "requestCO", telNum: e};
            h(t)
        };
        u.parseMessage = function (e) {
            u.cmdRet[e.cmd](e)
        };
        function h(e) {
            if (typeof d === "object") {
                var t = eweiCommon.uuid(32, 16);
                var i = "2JU" + t + "|" + JSON.stringify(e);
                d.send(i)
            }
        }

        function _(e, t, i) {
            a.run(r.constant.EVENT_DETAIL_CTI_CALL_RECORDS, "", {
                callMode: e ? "call_in" : "call_out",
                phone: i,
                status: t ? "normal" : "missed_call",
                viaphoneId: n.config.activeCtiID
            }, function (e) {
                if (0 === e.status) {
                    g.callRecordId = e.result.id;
                    g.beginTime = (new Date).valueOf()
                }
            })
        }

        function y(i, e) {
            var r = {};
            var t = {
                contentUrl: r.key = e,
                contentType: r.contentType = "audio/mp3",
                fileName: "电话录音.mp3",
                size: r.size = 0,
                width: r.width = 0,
                height: r.height = 0
            };
            l.add(t, function (e) {
                if (e.success) {
                    var t = {id: e.json.id, contentUrl: r.key};
                    w(i, t)
                }
            })
        }

        function w(e, t) {
            var i = {
                channel: "/provider/" + s.provider.id + "/chat/" + e,
                from: s.user.name,
                log: {type: "audio", content: "", isPublic: true, user: {id: s.user.id}, chat: {id: e}}
            };
            if (typeof t === "object") {
                i.attachmentkey = t.contentUrl
            }
            if (typeof t === "object") {
                i.log.attachment = t
            }
            i.log.uId = eweiCommon.uuid(32, 16).toLowerCase();
            c({
                url: "webchat_message/" + e,
                method: "POST",
                params: {t: (new Date).getTime()},
                data: i
            }).success(function (e, t, i, r) {
                void 0
            })
        }

        function k(e) {
            if (e.callRecordId) {
                i.run(r.constant.EVENT_PHONE_DATA_RECORDS, e.callRecordId, {
                    name: e.telMan.name,
                    status: "normal",
                    talkSeconds: parseInt(((new Date).valueOf() - e.beginTime) / 1e3)
                }, function (e) {
                    void 0
                })
            }
        }

        function T() {
            g.uboxHandle = "0";
            g.chatId = "";
            g.callRecordId = 0;
            g.beginTime = 0;
            g.telMan = {}
        }

        function C(e) {
            return e.replace(/[^0-9]/gi, "")
        }

        function S() {
            r.register(e, r.constant.EVENT_CTI_VIA_DETAIL, function (e, t) {
                var i = n.detail.ctis.get(t.id);
                if (i) {
                    v = i.saveRecord
                }
            })
        }

        S();
        function E(e) {
            p = e.result === "true";
            m = p ? "online" : "offline";
            r.doNotify(r.constant.EVENT_CTI_STARTED, {result: p ? "0" : "1"})
        }

        function A(e) {
            if (false === f) {
                f = true;
                _(true, true, e.telNum);
                g.uboxHandle = e.uboxHandle;
                r.doNotify(r.constant.EVENT_CTI_PICKUP, {telNum: C(e.telNum)})
            }
        }

        function b(e) {
            if (false === f) {
                r.doNotify(r.constant.EVENT_CTI_CALLIN, {telNum: C(e.telNum)})
            }
        }

        function P(e) {
            if (false === f) {
                _(true, false, e.telNum);
                r.doNotify(r.constant.EVENT_CTI_MISS_CALL, {telNum: C(e.telNum)});
                T()
            }
        }

        function N(e) {
            r.doNotify(r.constant.EVENT_CTI_AUDIO_UPLOAD_COMPLETED, e.result)
        }

        function I(e) {
            if (true === f) {
                f = false;
                if (g.chatId) {
                    o.run("disconnected", g.chatId);
                    k(g)
                }
                r.doNotify(r.constant.EVENT_CTI_HANGUP);
                T()
            }
        }

        function D(e) {
            if (false === f) {
                f = e.result === "0";
                g.uboxHandle = e.uboxHandle;
                r.doNotify(r.constant.EVENT_CTI_CONNECTED, e.result)
            }
        }

        function $(e) {
            if (false === f) {
                r.doNotify(r.constant.EVENT_CTI_RING, e.result)
            }
        }

        function L(e) {
            r.doNotify(r.constant.EVENT_CTI_ERROR, {type: "AM", error: "驱动报警"})
        }

        function U(e) {
            p = false;
            m = "offline";
            r.doNotify(r.constant.EVENT_CTI_ERROR, {type: "ER", error: "驱动错误"})
        }
    }
})(angular);
(function (be, o) {
    "use strict";
    be.module("eweiApp.common").service("ctiSipService", e);
    e.$inject = ["coreNotifyService", "apiCtiCallRecordService", "coreModelService", "createSessionService", "EweiConfig", "eweiPhoneService", "createSessionFailService", "ConsoleConfig", "apiCtiChatStateService", "$timeout", "attachmentService", "$http", "apiCtiUpdateCallRecordService", "responsePhoneChatInviteService", "sipTempGetService", "sipTempPutService", "getNetworkTimeService"];
    function Pe() {
        var e = this;
        e.callid = "";
        e.telNum = "";
        e.telMan = {};
        e.isHeld = false;
        e.direct = "";
        e.status = "";
        e.mark = "";
        e.connected = false;
        e.chatId = "";
        e.callRecordId = 0;
        e.beginTime = 0;
        e.socket = null;
        this.close = function () {
            e.socket.close();
            e.socket = null
        }
    }

    function Ne() {
        var e = this;
        var n = [];
        e.调试查看lines = n;
        function r(e, t) {
            var i = n.length;
            for (var r = 0; r < i; r++) {
                if (t == n[r][e]) {
                    return n[r]
                }
            }
            return undefined
        }

        e.getByTelNum = function (e) {
            return r("telNum", e)
        };
        e.getByCallid = function (e) {
            return r("callid", e)
        };
        e.getAllLines = function () {
            return n
        };
        e.getAllTelNums = function () {
            var t = [];
            be.forEach(n, function (e) {
                t.push(e.telNum)
            });
            return t
        };
        e.getAllIds = function () {
            var t = [];
            be.forEach(e.getAllLines(), function (e) {
                t.push(e.callid)
            });
            return t
        };
        e.getHostLine = function () {
            return r("direct", "host")
        };
        e.getInviteLines = function () {
            var t = [];
            be.forEach(n, function (e) {
                if ("invite" == e.direct) {
                    t.push(e)
                }
            });
            return t
        };
        e.getInviteIds = function () {
            var t = [];
            be.forEach(e.getInviteLines(), function (e) {
                t.push(e.callid)
            });
            return t
        };
        e.put = function (e) {
            n.push(e)
        };
        e.delInviteLines = function () {
            var e = n.length;
            for (var t = e - 1; t >= 0; t--) {
                if ("invite" == n[t].direct) {
                    n[t].close();
                    n.splice(t, 1)
                }
            }
        };
        e.removeByTelNum = function (e) {
            var t = r("telNum", e);
            if (t) {
                t.close();
                var i = n.indexOf(t);
                n.splice(i, 1)
            }
        };
        e.removeByCallid = function (e) {
            var t = r("callid", e);
            if (t) {
                t.close();
                var i = n.indexOf(t);
                n.splice(i, 1)
            }
        };
        e.removeAll = function () {
            var e = n.length;
            for (var t = 0; t < e; t++) {
                n[t].close()
            }
            n.splice(0, n.length)
        }
    }

    function Ie(t) {
        var i = null;
        var r = false;
        var e = "websocket";
        try {
            var n = new o.CometD;
            if (WebSocket) {
                n.registerTransport(e, new o.WebSocketTransport);
                n.init({url: t.url, logLevel: "error"})
            } else {
                void 0
            }
        } catch (e) {
            void 0
        }
        var a = function (e) {
            if (typeof t.onMessage === "function") {
                t.onMessage(e.data)
            }
        };
        n.addListener("/meta/handshake", function (e) {
            if (e.successful) {
                if (false == r) {
                    i = n.subscribe(t.channel, a)
                }
            }
        });
        n.addListener("/meta/connect", function () {
            if (false == r) {
                void 0
            }
            r = true
        });
        n.addListener("/meta/disconnect", function () {
            void 0;
            r = false
        });
        this.send = function (e) {
            if (r) {
                n.publish(t.channel, e)
            } else {
                void 0
            }
        };
        this.close = function () {
            if (i) {
                n.unsubscribe(i);
                n.disconnect(true)
            }
        }
    }

    function e(o, a, s, r, n, l, c, u, i, e, d, p, f, t, m, v, g) {
        var h = this;
        var _ = h.__proto__.constructor.name + "_" + (new Date).valueOf();
        var y = undefined;
        var w = {};
        var k = false;
        var T = {
            type: "normal",
            canCallout: true,
            hasRecordVoice: true,
            lastST: {},
            lastLoginSip: undefined,
            userState: "offline",
            lastUserState: null,
            lineIdentity: {},
            phoneLength: 0,
            timeOffset: 0,
            mute: false,
            user: {
                id: u.user.id,
                name: u.user.name,
                nickname: u.user.nickname,
                phone: u.user.phone,
                mobilePhone: u.user.mobilePhone,
                phoneNumber: "",
                email: u.user.email,
                photo: u.user.photo ? u.user.photo.contentUrl : undefined,
                type: "engineer",
                userGroup: "",
                telFirst: false
            }
        };
        var C = new Ne;
        h.cmdRet = {
            startSPOK: ue,
            stopSPOK: de,
            respondLN: pe,
            respondCF: ge,
            respondST: fe,
            respondMS: he,
            respondDN: _e,
            respondRC: ye,
            respondUP: we,
            respondNI: me,
            respondDL: ke,
            respondWL: Te,
            respondSX: Ce,
            respondDF: Se,
            respondlg: Ee
        };
        var S = {
            disconnected: function (e) {
                var t = C.getByCallid(e.callid);
                if (t.connected) {
                    if ("host" == t.direct) {
                        Z(t);
                        M(C.getInviteIds().join(","));
                        o.doNotify(o.constant.EVENT_CTI_HANGUP, {
                            type: T.type,
                            direct: t.direct,
                            telNum: t.telNum,
                            trigger: "other"
                        });
                        N();
                        void 0
                    } else if ("invite" == t.direct) {
                        var i = {
                            message: {
                                sender: T.user.phoneNumber,
                                cmd: o.constant.EVENT_CTI_HANGUP,
                                data: {type: T.type, direct: t.direct, telNum: t.telNum, trigger: "other"}
                            }
                        };
                        C.removeByCallid(e.callid);
                        var r = C.getAllLines();
                        be.forEach(r, function (e) {
                            e.socket.send(i)
                        });
                        o.doNotify(o.constant.EVENT_CTI_HANGUP, i.message.data);
                        void 0
                    }
                } else {
                    if ("callout" == t.mark) {
                        C.removeByCallid(e.callid);
                        o.doNotify(o.constant.EVENT_CTI_CALL_FAILED, {type: T.type, telNum: t.telNum})
                    }
                }
            }, held: function (e) {
                var t = C.getByCallid(e.callid);
                if (false == t.isHeld) {
                    F(t.callid);
                    t.isHeld = true;
                    T.canCallout = true;
                    o.doNotify(o.constant.EVENT_CTI_HELD_SUCCESS, {telNum: t.telNum});
                    void 0
                }
            }, "remote held": function (e) {
                T.canCallout = true
            }, connected: function (e) {
                var t = C.getByCallid(e.callid);
                if (false == t.connected) {
                    t.connected = true;
                    if ("invite" == t.direct) {
                        var i = [];
                        be.forEach(C.getAllLines(), function (e) {
                            e.telMan.telFirst = "host" == e.direct;
                            i.push({type: T.type, telNum: e.telNum, user: e.telMan})
                        });
                        i.push({type: T.type, telNum: T.user.phoneNumber, user: T.user});
                        var r = {
                            message: {
                                sender: T.user.phoneNumber,
                                cmd: o.constant.EVENT_CTI_CONNECTED,
                                data: {type: T.type, info: i}
                            }
                        };
                        var n = C.getAllLines();
                        be.forEach(n, function (e) {
                            e.socket.send(r)
                        });
                        if (false == t.isHeld) {
                            h.startHeld(t.telNum)
                        }
                        if (C.getAllLines().length > 1) {
                            var a = C.getHostLine();
                            j(a.callid);
                            le(a)
                        }
                        o.doNotify(o.constant.EVENT_CTI_CONNECTED, r.message.data);
                        void 0
                    }
                }
            }, "remote offering": function (e) {
                var t = C.getByTelNum(e.telNum);
                if (t) {
                    t.callid = e.callid;
                    t.telNum = e.telNum;
                    t.direct = "invite";
                    t.status = e.state;
                    t.isHeld = false;
                    t.mark = "callout";
                    o.doNotify(o.constant.EVENT_CTI_HANGUP_ENABLE)
                }
            }, "remote alerting": function (e) {
                o.doNotify(o.constant.EVENT_CTI_HANGUP_ENABLE)
            }, callout: function (e) {
                if (false == T.canCallout) {
                    return false
                }
                var t = new Pe;
                t.telNum = e;
                t.socket = I(T.user.phoneNumber + e);
                C.put(t);
                if (T.phoneLength == e.length) {
                    re(e, "multi.invite")
                }
                V(e);
                return true
            }, hangup: function (e) {
                var t = C.getByTelNum(e);
                if ("host" == t.direct) {
                    Z(t);
                    M(C.getAllIds().join(","));
                    o.doNotify(o.constant.EVENT_CTI_HANGUP, {
                        type: T.type,
                        direct: t.direct,
                        telNum: t.telNum,
                        trigger: "myself"
                    });
                    N()
                } else if ("invite" == t.direct) {
                    var i = C.getHostLine();
                    q(i.callid, t.callid);
                    C.removeByCallid(t.callid)
                }
            }, dialNum: function (e) {
            }, startHeld: function (e) {
                var t = C.getByTelNum(e);
                B(t.callid)
            }, stopHeld: function (e) {
                var t = C.getByTelNum(e);
                t.isHeld = false;
                H(t.callid)
            }
        };
        var E = {
            disconnected: function (e) {
                var t = C.getByCallid(e.callid);
                if (t.connected) {
                    if ("host" == t.direct) {
                        Z(t);
                        M(C.getInviteIds().join(","));
                        o.doNotify(o.constant.EVENT_CTI_HANGUP, {
                            type: T.type,
                            direct: t.direct,
                            telNum: t.telNum,
                            trigger: "other"
                        });
                        N()
                    } else if ("invite" == t.direct) {
                        o.doNotify(o.constant.EVENT_CTI_HANGUP, {
                            type: T.type,
                            direct: t.direct,
                            telNum: t.telNum,
                            trigger: "other"
                        });
                        C.removeByCallid(t.callid)
                    }
                } else {
                    if ("callout" == t.mark) {
                        o.doNotify(o.constant.EVENT_CTI_CALL_FAILED, {type: T.type, telNum: t.telNum})
                    }
                }
            }, held: function (e) {
                var t = C.getByCallid(e.callid);
                t.isHeld = true;
                T.canCallout = true;
                o.doNotify(o.constant.EVENT_CTI_HELD_SUCCESS, {telNum: t.telNum})
            }, "remote held": function (e) {
                var t = C.getByCallid(e.callid);
                t.isHeld = true;
                T.canCallout = true;
                o.doNotify(o.constant.EVENT_CTI_HELD_SUCCESS, {telNum: t.telNum})
            }, connected: function (e) {
                var t = C.getByCallid(e.callid);
                if (false == t.connected) {
                    t.status = e.state;
                    t.connected = true;
                    o.doNotify(o.constant.EVENT_CTI_CONNECTED, {type: T.type, telNum: t.telNum})
                }
            }, transfer: function (e) {
            }, "remote offering": function (e) {
                var t = C.getByTelNum(e.telNum);
                if (t) {
                    t.callid = e.callid;
                    t.telNum = e.telNum;
                    t.direct = "invite";
                    t.status = e.state;
                    t.mark = "callout";
                    o.doNotify(o.constant.EVENT_CTI_HANGUP_ENABLE)
                }
            }, "remote alerting": function (e) {
                o.doNotify(o.constant.EVENT_CTI_HANGUP_ENABLE)
            }, callout: function (e) {
                if (false == T.canCallout) {
                    return false
                }
                var t = new Pe;
                t.telNum = e;
                t.socket = I(T.user.phoneNumber + e);
                C.put(t);
                if (T.phoneLength == e.length) {
                    re(e, "transfer.invite")
                }
                V(e);
                return true
            }, hangup: function (e) {
                var t = C.getByTelNum(e);
                if ("host" == t.direct) {
                    Z(t);
                    M(C.getAllIds().join(","));
                    N()
                } else if ("invite" == t.direct) {
                    C.removeByCallid(t.callid);
                    M(t.callid);
                    var i = C.getHostLine();
                    h.stopHeld(i.telNum)
                }
                o.doNotify(o.constant.EVENT_CTI_HANGUP, {
                    type: T.type,
                    direct: t.direct,
                    telNum: t.telNum,
                    trigger: "myself"
                })
            }, dialNum: function (e) {
            }, startHeld: function (e) {
                var t = C.getByTelNum(e);
                B(t.callid)
            }, stopHeld: function (e) {
                var t = C.getByTelNum(e);
                t.isHeld = false;
                H(t.callid)
            }, blindTransfer: function (e) {
                var t = C.getHostLine();
                G(e, t.callid)
            }, transferConfirm: function () {
                ie();
                W()
            }
        };
        var A = {
            offering: function (e) {
                if (["dontDisturb", "transfer"].indexOf(T.userState) != -1) {
                    return
                }
                if (C.getAllLines().length > 0) {
                    M(e.callid)
                } else {
                    if (e.telNum) {
                        var t = new Pe;
                        t.callid = e.callid;
                        t.telNum = e.telNum;
                        t.direct = "host";
                        t.status = e.state;
                        t.isHeld = false;
                        t.mark = "callin";
                        t.socket = I(e.telNum + T.user.phoneNumber);
                        C.put(t);
                        o.doNotify(o.constant.EVENT_CTI_CALLIN, {telNum: t.telNum});
                        ne(e.telNum + T.user.phoneNumber);
                        R(e.telNum, e.callid)
                    }
                }
            }, alerting: function (e) {
            }, disconnected: function (e) {
                var t = C.getByCallid(e.callid);
                if (t) {
                    if (false == t.connected) {
                        if ("callin" == t.mark && ["dontDisturb", "transfer"].indexOf(T.userState) == -1) {
                            o.doNotify(o.constant.EVENT_CTI_MISS_CALL, {telNum: t.telNum});
                            Y(true, false, t.telNum)
                        } else if ("callout" == t.mark) {
                            o.doNotify(o.constant.EVENT_CTI_CALL_FAILED, {type: T.type, telNum: t.telNum})
                        }
                    } else {
                        Z(t);
                        i.run("disconnected", t.chatId);
                        o.doNotify(o.constant.EVENT_CTI_HANGUP, {
                            type: T.type,
                            direct: t.direct,
                            telNum: t.telNum,
                            trigger: "other"
                        })
                    }
                }
                N()
            }, held: function (e) {
                var t = C.getByCallid(e.callid);
                t.isHeld = true;
                o.doNotify(o.constant.EVENT_CTI_HELD_SUCCESS, {telNum: t.telNum})
            }, connected: function (e) {
                var t = C.getByCallid(e.callid);
                if (t && false == t.connected) {
                    t.connected = true;
                    t.status = e.state;
                    t.beginTime = (new Date).valueOf();
                    if (T.lineIdentity.telNum == e.telNum) {
                        t.chatId = T.lineIdentity.chatId
                    }
                    se(t, function () {
                        o.doNotify(o.constant.EVENT_CTI_CONNECTED, {type: T.type, telNum: t.telNum})
                    });
                    if ("callin" == t.mark) {
                        Y(true, true, t.telNum)
                    }
                }
            }, "remote offering": function (e) {
                var t = C.getByTelNum(e.telNum);
                if (t) {
                    t.callid = e.callid;
                    t.telNum = e.telNum;
                    t.direct = "host";
                    t.status = e.state;
                    t.isHeld = false;
                    t.mark = "callout";
                    o.doNotify(o.constant.EVENT_CTI_HANGUP_ENABLE)
                }
            }, "remote alerting": function (e) {
                o.doNotify(o.constant.EVENT_CTI_HANGUP_ENABLE)
            }, pickup: function (e) {
                var t = C.getByTelNum(e);
                var i = {cmd: "requestCO", telNum: "", callid: t.callid};
                D(i)
            }, callout: function (e) {
                if (C.getAllLines().length > 0) {
                    return false
                } else {
                    var t = new Pe;
                    t.telNum = e;
                    t.socket = I(T.user.phoneNumber + e);
                    C.put(t);
                    Y(false, true, e);
                    if (T.phoneLength == e.length) {
                        re(e, "normal.invite")
                    }
                    V(e);
                    return true
                }
            }, hangup: function (e) {
                var t = C.getByTelNum(e);
                if (t) {
                    if (true == t.connected) {
                        Z(t);
                        i.run("disconnected", t.chatId)
                    }
                    M(t.callid);
                    o.doNotify(o.constant.EVENT_CTI_HANGUP, {
                        type: T.type,
                        direct: t.direct,
                        telNum: t.telNum,
                        trigger: "myself"
                    })
                }
                N()
            }, dialNum: function (e) {
                x(e, C.getHostLine().callid)
            }, startHeld: function (e) {
                var t = C.getByTelNum(e);
                B(t.callid)
            }, stopHeld: function (e) {
                var t = C.getByTelNum(e);
                t.isHeld = false;
                H(t.callid)
            }
        };
        var b = {normal: A, multi: S, transfer: E};
        var P = {
            dontDisturb: function () {
                var e = {cmd: "requestDN"};
                D(e);
                s.config.userState = T.userState = "dontDisturb";
                s.config.forceSave()
            }, online: function () {
                var e = {cmd: "requestOL"};
                D(e);
                s.config.userState = T.userState = "online";
                s.config.forceSave()
            }, transfer: function () {
                var e = {cmd: "requestRT"};
                D(e);
                s.config.userState = T.userState = "transfer";
                s.config.forceSave()
            }, offline: function () {
                var e = {cmd: "siplogoff"};
                D(e);
                s.config.userState = T.userState = "offline";
                s.config.forceSave()
            }
        };

        function N() {
            C.removeAll();
            T.canCallout = true;
            T.lastST = {};
            T.type = "normal";
            T.lineIdentity = {};
            if (T.mute) {
                X(T.mute = false)
            }
        }

        function I(e) {
            return new Ie({
                channel: "/provider/" + u.provider.id + "/sip/" + e,
                url: u.eweiWebCometd_url,
                onMessage: ve
            })
        }

        function D(e) {
            if (typeof y === "object") {
                var t = eweiCommon.uuid(32, 16);
                var i = "2JX" + t + "|" + JSON.stringify(e);
                y.send(i)
            }
        }

        function $(e) {
            var i = {
                section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
                param: /^\s*([\w\.\-\_]+)\s*=\s*(.*?)\s*$/,
                comment: /^\s*;.*$/
            };
            var r = {};
            var t = e.split("##");
            var n = null;
            t.forEach(function (e) {
                if (i.comment.test(e)) {
                    return
                } else if (i.param.test(e)) {
                    var t = e.match(i.param);
                    if (n) {
                        r[n][t[1]] = t[2]
                    } else {
                        r[t[1]] = t[2]
                    }
                } else if (i.section.test(e)) {
                    var t = e.match(i.section);
                    r[t[1]] = {};
                    n = t[1]
                } else if (e.length == 0 && n) {
                    n = null
                }
            });
            return r
        }

        function L() {
            var e = {cmd: "requestNI"};
            D(e)
        }

        function U() {
            var e = {cmd: "requestCF"};
            D(e)
        }

        function R(e, t) {
            var i = {cmd: "respondOF", telNum: e, callid: t};
            D(i)
        }

        function O(e) {
            if (T.hasRecordVoice) {
                var t = {cmd: "requestRC", value: "true", callid: e};
                D(t);
                void 0
            }
        }

        function j(e) {
            if (T.hasRecordVoice) {
                var t = {cmd: "requestRC", value: "false", callid: e};
                D(t)
            }
        }

        function M(e) {
            var t = {cmd: "requestHU", callid: e};
            D(t)
        }

        function V(e) {
            var t = {cmd: "requestCO", telNum: e, callid: ""};
            D(t)
        }

        function x(e, t) {
            var i = {cmd: "requestDF", dtmf: e, callid: t};
            D(i)
        }

        function B(e) {
            var t = {cmd: "requestHD", callid: e, value: "true"};
            D(t)
        }

        function H(e) {
            var t = {cmd: "requestHD", callid: e, value: "false"};
            D(t)
        }

        function F(e) {
            var t = {cmd: "requestT3", callid: e};
            D(t)
        }

        function q(e, t) {
            var i = {cmd: "requestH3", srcallid: e, t3callid: t};
            D(i)
        }

        function G(e, t) {
            var i = {cmd: "requestBT", telNum: e, callid: t};
            D(i)
        }

        function W() {
            var e = {cmd: "requestTS", srccallid: C.getHostLine().callid, descallid: C.getInviteLines()[0].callid};
            D(e);
            J()
        }

        function J() {
            var e = C.getHostLine();
            var t = C.getInviteLines()[0];
            var i = {
                message: {
                    sender: T.user.phoneNumber,
                    cmd: o.constant.EVENT_CTI_PUSH_RECONNECT,
                    data: {channelId: e.telNum + t.telNum}
                }
            };
            var r = C.getAllLines();
            be.forEach(r, function (e) {
                e.socket.send(i)
            });
            void 0
        }

        function z(e, t, i) {
            if (T.hasRecordVoice) {
                var r = C.getHostLine();
                if (r) {
                    var n = {
                        cmd: "Estabsess",
                        bucket: e.bucket,
                        accesskey: e.accesskey,
                        secretkey: e.secretkey,
                        key: i,
                        callbackUrl: u.qiniuCallBackUrl,
                        jsparam: {chatId: t.chatId, type: t.type, GUID: eweiCommon.uuid(32, 16)},
                        callid: r.callid
                    };
                    D(n);
                    void 0
                }
            }
        }

        function Q() {
            var e = {cmd: "sipxlogin"};
            D(e)
        }

        function K() {
            var e = {cmd: "startSIPX"};
            D(e)
        }

        function X(e) {
            var t = {cmd: "requestMU", value: e};
            D(t)
        }

        function Y(e, t, i) {
            var r = C.getByTelNum(i);
            var n = "";
            if (r && r.telMan && r.telMan.nickname) {
                n = r.telMan.nickname
            }
            a.run(o.constant.EVENT_DETAIL_CTI_CALL_RECORDS, "", {
                name: n,
                callMode: e ? "call_in" : "call_out",
                phone: i,
                status: t ? "normal" : "missed_call",
                viaphoneId: s.config.activeCtiID,
                talkSeconds: 0
            }, function (e) {
                if (0 == e.status) {
                    if (r) {
                        r.callRecordId = e.result.id
                    }
                }
            })
        }

        function Z(e) {
            if (e.callRecordId) {
                var t = e.connected ? parseInt(((new Date).valueOf() - e.beginTime) / 1e3) : 0;
                f.run(o.constant.EVENT_PHONE_DATA_RECORDS, e.callRecordId, {
                    concatUserId: e.telMan.id,
                    name: e.telMan.name,
                    status: "normal",
                    talkSeconds: t
                }, function (e) {
                    void 0
                })
            }
        }

        function ee(i, e) {
            var r = {};
            var t = {
                contentUrl: r.key = e,
                contentType: r.contentType = "audio/mp3",
                fileName: "电话录音.mp3",
                size: r.size = 0,
                width: r.width = 0,
                height: r.height = 0
            };
            d.add(t, function (e) {
                if (e.success) {
                    var t = {id: e.json.id, contentUrl: r.key};
                    te(i, t)
                }
            })
        }

        function te(e, t) {
            var i = {
                channel: "/provider/" + u.provider.id + "/chat/" + e,
                from: u.user.name,
                log: {type: "audio", content: "", isPublic: true, user: {id: u.user.id}, chat: {id: e}}
            };
            if (typeof t === "object") {
                i.attachmentkey = t.contentUrl
            }
            if (typeof t === "object") {
                i.log.attachment = t
            }
            i.log.uId = eweiCommon.uuid(32, 16).toLowerCase();
            p({
                url: "webchat_message/" + e,
                method: "POST",
                params: {t: (new Date).getTime()},
                data: i
            }).success(function (e, t, i, r) {
                void 0
            })
        }

        function ie() {
            var e = [];
            var t = C.getHostLine();
            e.push({type: T.type, telNum: t.telNum, user: t.telMan});
            var i = {
                message: {
                    sender: T.user.phoneNumber,
                    cmd: o.constant.EVENT_CTI_CONNECTED,
                    data: {type: T.type, info: e}
                }
            };
            C.getInviteLines()[0].socket.send(i);
            var r = [];
            var n = C.getInviteLines()[0];
            r.push({type: T.type, telNum: n.telNum, user: n.telMan});
            var a = {
                message: {
                    sender: T.user.phoneNumber,
                    cmd: o.constant.EVENT_CTI_CONNECTED,
                    data: {type: T.type, info: r}
                }
            };
            C.getHostLine().socket.send(a)
        }

        function re(e, t) {
            var i = C.getHostLine();
            var r = {
                message: {
                    sender: T.user.phoneNumber,
                    cmd: o.constant.EVENT_CTI_LINE_IDENTITY,
                    data: {telNum: T.user.phoneNumber, identity: t, chatId: i ? i.chatId : ""},
                    time: (new Date).valueOf() - T.timeOffset
                }
            };
            ae(T.user.phoneNumber + e, r)
        }

        function ne(e) {
            m.run("", {key: e}, function (e) {
                if (e) {
                    ve(JSON.parse(e.result.value))
                }
            })
        }

        function ae(e, t) {
            v.run("", {key: e, value: t})
        }

        function oe(e) {
            void 0;
            l.setCtiChatId(e.chatId);
            i.run("connected", e.chatId);
            do {
                if ("multi.invite" == T.lineIdentity.identity) {
                    t.run(e.chatId, {});
                    break
                }
                if ("transfer.invite" == T.lineIdentity.identity) {
                    t.run(e.chatId, {inviteType: "transfer"});
                    break
                }
                if ("normal.invite" == T.lineIdentity.identity) {
                    le(e);
                    break
                }
                if (undefined == T.lineIdentity.identity) {
                    le(e);
                    break
                }
            } while (0)
        }

        function se(t, i) {
            if (!t.chatId) {
                var e = "callin" == t.mark ? "incoming" : "outgoing";
                r.fn(e, t.telNum, function (e) {
                    if (e.success && e.json && e.json.chatId) {
                        t.chatId = e.json.chatId;
                        oe(t);
                        l.setUser({id: e.json.requesterId, name: e.json.requesterName});
                        i()
                    } else {
                        c.createSessionFail(e)
                    }
                })
            } else {
                oe(t);
                i()
            }
        }

        function le(e) {
            O(e.callid);
            var t = {bucket: n.bucket_name, accesskey: n.access_key, secretkey: n.secret_key};
            var i = {chatId: e.chatId, type: "ticket"};
            var r = eweiCommon.uuid(32, 16);
            h.chatCreated(t, i, r);
            ee(e.chatId, r)
        }

        function ce(e) {
            var t = "";
            if (e) {
                t = (e + "").replace("Extension ", "")
            }
            return t
        }

        h.init = function (e) {
            y = e;
            g.run(["response", function (e) {
                T.timeOffset = (new Date).valueOf() - e
            }])
        };
        h.run = function () {
            K()
        };
        h.loginSip = function (e, t, i, r, n) {
            k = false;
            T.userState = "offline";
            T.lastLoginSip = {cmd: "sipxsetlg", SipProxy: e, OutboundSipProxy: t, Username: i, Password: r, jsparam: n};
            var a = {cmd: "startSIPC"};
            D(a)
        };
        h.stop = function () {
            var e = {cmd: "stoppSIPX"};
            D(e);
            k = false;
            T.userState = "offline"
        };
        h.hangup = function (e) {
            b[T.type]["hangup"](e)
        };
        h.pickup = function (e) {
            b[T.type]["pickup"](e)
        };
        h.callout = function (e) {
            if (/^([0-9a-zA-Z#\*\-]+)$/.test(e)) {
                return b[T.type]["callout"](e)
            } else {
                return false
            }
        };
        h.dialNum = function (e) {
            b[T.type]["dialNum"](e)
        };
        h.setUser = function (e, t) {
            var i = C.getByTelNum(e);
            if (i) {
                i.telMan = be.copy(t)
            }
        };
        h.startHeld = function (e) {
            b[T.type]["startHeld"](e)
        };
        h.blindTransfer = function (e) {
            b[T.type]["blindTransfer"](e)
        };
        h.transferConfirm = function () {
            b[T.type]["transferConfirm"]()
        };
        h.stopHeld = function (e) {
            b[T.type]["stopHeld"](e)
        };
        h.setUserState = function (e) {
            if ("offline" == T.userState && "offline" != e) {
                T.lastUserState = e;
                K()
            } else if (T.userState != e) {
                P[e]()
            }
        };
        h.transfer = function () {
            T.type = "transfer";
            T.canCallout = true;
            var e = C.getHostLine();
            if (e && false == e.isHeld) {
                T.canCallout = false;
                h.startHeld(e.telNum)
            }
        };
        h.stateCancel = function () {
            var e = C.getHostLine();
            if (e) {
                h.stopHeld(e.telNum)
            }
            T.type = "normal";
            T.canCallout = true;
            C.delInviteLines();
            void 0
        };
        h.multi = function () {
            T.type = "multi";
            T.canCallout = true;
            var e = C.getHostLine();
            if (e && false == e.isHeld) {
                T.canCallout = false;
                h.startHeld(e.telNum)
            }
        };
        h.parseMessage = function (e) {
            e.telNum = ce(e.telNum);
            h.cmdRet[e.cmd](e)
        };
        h.getStarted = function () {
            return k
        };
        h.chatCreated = function (e, t, i) {
            z(e, t, i)
        };
        h.getCallIsHangup = function () {
            var e = C.getHostLine();
            if (e) {
                return false
            } else {
                return true
            }
        };
        h.getUserState = function () {
            return T.userState
        };
        h.setMute = function () {
            T.mute = !T.mute;
            X(T.mute)
        };
        h.getMute = function () {
            return T.mute
        };
        h.setSR = function (e, t, i) {
            var r = {cmd: "requestSR", RedirectTo: e, AutoAccept: t, Ringtone: i};
            D(r)
        };
        h.getWL = function () {
            var e = {cmd: "requestWL"};
            D(e)
        };
        h.setSA = function (e, t, i, r) {
            var n = {cmd: "requestSA", CallInputDevice: e, CallOutputDevice: t, SpeakerVolume: i, MicGain: r};
            D(n)
        };
        h.getDL = function (e) {
            var t = {cmd: "requestDL", type: e};
            D(t)
        };
        h.setSO = function (e, t, i, r, n) {
            var a = {
                cmd: "requestSO",
                BindAddress: e,
                UseSequentialPorts: t,
                MaxConnections: i,
                SipPort: r,
                RtpPortStart: n
            };
            D(a)
        };
        h.setSS = function (e, t, i, r, n, a, o, s, l, c, u) {
            var d = {
                cmd: "requestSS",
                EnableStun: e,
                StunServer: t,
                StunPort: i,
                StunKeepAliveInSecs: r,
                EnableTurn: n,
                TurnServer: a,
                TurnPort: o,
                TurnUsername: s,
                TurnPassword: l,
                TurnKeepAliveInSecs: c,
                EnableIce: u
            };
            D(d)
        };
        function ue(e) {
            if (T.lastLoginSip) {
                D(T.lastLoginSip)
            }
        }

        function de() {
        }

        function pe(e) {
            if (e) {
                if (0 == e.result) {
                    U();
                    k = true
                } else {
                    k = false
                }
                if (T.lastUserState) {
                    P[T.lastUserState]();
                    T.lastUserState = null
                } else {
                    T.userState = k ? null === s.config.userState ? "online" : s.config.userState : "offline";
                    if (T.userState !== "online") {
                        P[T.userState]()
                    }
                }
                o.doNotify(o.constant.EVENT_CTI_STARTED, {result: e.result, context: e.context})
            }
        }

        function fe(e) {
            if (e && e.state && e.callid) {
                if (e.callid == T.lastST.callid && e.state == T.lastST.state && e.telNum == T.lastST.telNum) {
                    void 0
                } else {
                    T.lastST.state = e.state;
                    T.lastST.callid = e.callid;
                    T.lastST.telNum = e.telNum;
                    void 0;
                    b[T.type][e.state](e)
                }
            }
        }

        function me(e) {
            if (e && e.result) {
                w = $(e.result);
                o.doNotify(o.constant.EVENT_CTI_SIP_CONFIG, w);
                var t = w["SipProfiles/0/Lines/0"].Username;
                T.user.phoneNumber = t;
                var i = t.length;
                if (i > 0) {
                    T.phoneLength = i
                }
            }
        }

        function ve(e) {
            if (e && e.message && e.message.cmd && e.message.data) {
                if (o.constant.EVENT_CTI_LINE_IDENTITY == e.message.cmd) {
                    var t = e.message.time;
                    var i = (new Date).valueOf() - T.timeOffset;
                    if (i - t < 10 * 1e3) {
                        T.lineIdentity = e.message.data;
                        o.doNotify(e.message.cmd, e.message.data)
                    }
                }
                if (o.constant.EVENT_CTI_CONNECTED == e.message.cmd) {
                    var r = e.message.data;
                    if ("transfer" == r.type) {
                        if (T.user.phoneNumber != e.message.sender) {
                            var n = C.getHostLine();
                            n.telNum = r.info[0].telNum;
                            n.telMan = r.info[0].user;
                            le(n);
                            o.doNotify(e.message.cmd, e.message.data);
                            void 0
                        }
                    } else if ("multi" == r.type) {
                        o.doNotify(e.message.cmd, e.message.data)
                    }
                }
                if (o.constant.EVENT_CTI_PUSH_RECONNECT == e.message.cmd) {
                    if (T.user.phoneNumber != e.message.sender) {
                        var r = e.message.data;
                        var n = C.getHostLine();
                        n.close();
                        n.socket = I(r.channelId);
                        void 0
                    }
                }
                if (o.constant.EVENT_CTI_HANGUP == e.message.cmd) {
                    o.doNotify(e.message.cmd, e.message.data)
                }
            }
        }

        function ge() {
            L()
        }

        function he() {
        }

        function _e() {
        }

        function ye() {
        }

        function we() {
        }

        function ke(e) {
            if (e && e.result) {
                o.doNotify(o.constant.EVENT_CTI_SIP_DL, e)
            }
        }

        function Te(e) {
            if (e && e.result) {
                o.doNotify(o.constant.EVENT_CTI_SIP_WL, e)
            }
        }

        function Ce() {
        }

        function Se() {
        }

        function Ee(e) {
            if (T.lastLoginSip) {
                T.lastLoginSip = undefined;
                Q()
            }
        }

        function Ae() {
            o.register(_, o.constant.EVENT_CTI_VIA_DETAIL, function (e, t) {
                var i = s.detail.ctis.get(t.id);
                if (i) {
                    T.hasRecordVoice = i.saveRecord
                }
            })
        }

        Ae()
    }
})(angular, org.cometd);
(function (a) {
    "use strict";
    a.module("eweiApp.ticket").service("ticketEvaluateService", e);
    e.$inject = ["cacheService"];
    function e(r) {
        var n = {};
        this.run = function (e, t) {
            var i = {url: "ticket_evaluate_config.json"};
            if (undefined === e || true == e) {
                r.run(i, function (e) {
                    n = e.json;
                    n.firstQuestionOptions = a.fromJson(n.firstQuestionOptions);
                    n.secondQuestionOptions = a.fromJson(n.secondQuestionOptions);
                    if (typeof t === "function") {
                        t(n)
                    }
                })
            } else {
                r.get(i, function (e) {
                    n = e.json;
                    n.firstQuestionOptions = a.fromJson(n.firstQuestionOptions);
                    n.secondQuestionOptions = a.fromJson(n.secondQuestionOptions);
                    if (typeof t === "function") {
                        t(n)
                    }
                })
            }
        };
        this.update = function (t, i) {
            var e = {url: "ticket_evaluate_config.json", dataParam: t};
            r.runPost(e, function (e) {
                n = a.copy(t);
                if (typeof i === "function") {
                    i(e)
                }
            })
        };
        this.getEvaluateSetting = function () {
            return n
        }
    }
})(angular);
angular.module("eweiApp.help_center").factory("helpcenterViewService", ["$resource", function (e) {
    return e("helpcenterView/:id.json", {id: "@id"}, {
        query: {method: "GET"},
        get: {method: "GET"},
        add: {method: "POST"},
        update: {method: "PUT"},
        delete: {method: "DELETE"}
    })
}]).factory("topicViewDetailService", ["$resource", function (e) {
    return e("topic_view_detail/:id.json", {id: "@id"}, {
        query: {method: "GET"},
        get: {method: "GET"},
        add: {method: "POST"},
        update: {method: "PUT"},
        delete: {method: "DELETE"}
    })
}]).factory("helpcenterSettingMenus", [function () {
    var e = [{title: "积分规则", type: "integral"}];
    return e
}]).factory("questionService", ["$resource", function (e) {
    return e("question/:id.json", {id: "@id"}, {
        query: {method: "GET"},
        get: {method: "GET"},
        add: {method: "POST"},
        update: {method: "PUT"},
        delete: {method: "DELETE"}
    })
}]).factory("ldapFields", ["$resource", function (e) {
    var t = [{value: "associatedDomain", caption: "associatedDomain"}, {
        value: "associatedName",
        caption: "associatedName"
    }, {value: "attributeTypes", caption: "attributeTypes"}, {
        value: "audio",
        caption: "audio"
    }, {value: "authorityRevocationList", caption: "authorityRevocationList"}, {
        value: "bootFile",
        caption: "bootFile"
    }, {value: "bootParameter", caption: "bootParameter"}, {
        value: "buildingName",
        caption: "buildingName"
    }, {value: "businessCategory", caption: "businessCategory"}, {value: "c", caption: "c"}, {
        value: "cACertificate",
        caption: "cACertificate"
    }, {value: "carLicense", caption: "carLicense"}, {
        value: "certificateRevocationList",
        caption: "certificateRevocationList"
    }, {value: "cn", caption: "cn"}, {value: "co", caption: "co"}, {
        value: "crossCertificatePair",
        caption: "crossCertificatePair"
    }, {value: "dc", caption: "dc"}, {
        value: "deltaRevocationList",
        caption: "deltaRevocationList"
    }, {value: "departmentNumber", caption: "departmentNumber"}, {
        value: "description",
        caption: "description"
    }, {value: "destinationIndicator", caption: "destinationIndicator"}, {
        value: "displayName",
        caption: "displayName"
    }, {value: "distinguishedName", caption: "distinguishedName"}, {
        value: "dmdName",
        caption: "dmdName"
    }, {value: "documentAuthor", caption: "documentAuthor"}, {
        value: "documentIdentifier",
        caption: "documentIdentifier"
    }, {value: "documentLocation", caption: "documentLocation"}, {
        value: "documentPublisher",
        caption: "documentPublisher"
    }, {value: "documentTitle", caption: "documentTitle"}, {
        value: "documentVersion",
        caption: "documentVersion"
    }, {value: "drink", caption: "drink"}, {value: "employeeNumber", caption: "employeeNumber"}, {
        value: "employeeType",
        caption: "employeeType"
    }, {value: "facsimileTelephoneNumber", caption: "facsimileTelephoneNumber"}, {
        value: "gecos",
        caption: "gecos"
    }, {value: "generationQualifier", caption: "generationQualifier"}, {
        value: "gidNumber",
        caption: "gidNumber"
    }, {value: "givenName", caption: "givenName"}, {
        value: "homeDirectory",
        caption: "homeDirectory"
    }, {value: "homePhone", caption: "homePhone"}, {
        value: "homePostalAddress",
        caption: "homePostalAddress"
    }, {value: "host", caption: "host"}, {value: "houseIdentifier", caption: "houseIdentifier"}, {
        value: "info",
        caption: "info"
    }, {value: "initials", caption: "initials"}, {
        value: "ipHostNumber",
        caption: "ipHostNumber"
    }, {value: "ipNetmaskNumber", caption: "ipNetmaskNumber"}, {
        value: "ipNetworkNumber",
        caption: "ipNetworkNumber"
    }, {value: "ipProtocolNumber", caption: "ipProtocolNumber"}, {
        value: "ipServicePort",
        caption: "ipServicePort"
    }, {value: "ipServiceProtocol", caption: "ipServiceProtocol"}, {
        value: "knowledgeInformation",
        caption: "knowledgeInformation"
    }, {value: "l", caption: "l"}, {value: "labeledURI", caption: "labeledURI"}, {
        value: "loginShell",
        caption: "loginShell"
    }, {value: "macAddress", caption: "macAddress"}, {value: "mail", caption: "mail"}, {
        value: "manager",
        caption: "manager"
    }, {value: "member", caption: "member"}, {
        value: "memberNisNetgroup",
        caption: "memberNisNetgroup"
    }, {value: "memberUid", caption: "memberUid"}, {value: "mobile", caption: "mobile"}, {
        value: "name",
        caption: "name"
    }, {value: "nisMapEntry", caption: "nisMapEntry"}, {
        value: "nisMapName",
        caption: "nisMapName"
    }, {value: "nisNetgroupTriple", caption: "nisNetgroupTriple"}, {value: "o", caption: "o"}, {
        value: "objectClass",
        caption: "objectClass"
    }, {value: "objectClasses", caption: "objectClasses"}, {
        value: "oncRpcNumber",
        caption: "oncRpcNumber"
    }, {value: "organizationalStatus", caption: "organizationalStatus"}, {
        value: "otherMailbox",
        caption: "otherMailbox"
    }, {value: "ou", caption: "ou"}, {value: "owner", caption: "owner"}, {
        value: "pager",
        caption: "pager"
    }, {value: "personalTitle", caption: "personalTitle"}, {
        value: "photo",
        caption: "photo"
    }, {value: "physicalDeliveryOfficeName", caption: "physicalDeliveryOfficeName"}, {
        value: "postalAddress",
        caption: "postalAddress"
    }, {value: "postalCode", caption: "postalCode"}, {
        value: "postOfficeBox",
        caption: "postOfficeBox"
    }, {value: "preferredDeliveryMethod", caption: "preferredDeliveryMethod"}, {
        value: "preferredLanguage",
        caption: "preferredLanguage"
    }, {value: "presentationAddress", caption: "presentationAddress"}, {
        value: "registeredAddress",
        caption: "registeredAddress"
    }, {value: "roleOccupant", caption: "roleOccupant"}, {
        value: "roomNumber",
        caption: "roomNumber"
    }, {value: "searchGuide", caption: "searchGuide"}, {value: "secretary", caption: "secretary"}, {
        value: "seeAlso",
        caption: "seeAlso"
    }, {value: "title", caption: "title"}, {value: "serialNumber", caption: "serialNumber"}, {
        value: "shadowExpire",
        caption: "shadowExpire"
    }, {value: "shadowFlag", caption: "shadowFlag"}, {
        value: "shadowInactive",
        caption: "shadowInactive"
    }, {value: "shadowLastChange", caption: "shadowLastChange"}, {
        value: "shadowMax",
        caption: "shadowMax"
    }, {value: "shadowMin", caption: "shadowMin"}, {value: "shadowWarning", caption: "shadowWarning"}, {
        value: "sn",
        caption: "sn"
    }, {value: "st", caption: "st"}, {value: "street", caption: "street"}, {
        value: "streetAddress",
        caption: "streetAddress"
    }, {value: "structuralObjectClass", caption: "structuralObjectClass"}, {
        value: "supportedApplicationContext",
        caption: "supportedApplicationContext"
    }, {value: "telephoneNumber", caption: "telephoneNumber"}, {
        value: "teletexTerminalIdentifier",
        caption: "teletexTerminalIdentifier"
    }, {value: "telexNumber", caption: "telexNumber"}, {
        value: "textEncodedORAddress",
        caption: "textEncodedORAddress"
    }, {value: "department", caption: "department"}, {value: "uid", caption: "uid"}, {
        value: "uidNumber",
        caption: "uidNumber"
    }, {value: "uniqueIdentifier", caption: "uniqueIdentifier"}, {
        value: "uniqueMember",
        caption: "uniqueMember"
    }, {value: "userClass", caption: "userClass"}, {value: "userPKCS12", caption: "userPKCS12"}, {
        value: "x121Address",
        caption: "x121Address"
    }, {value: "memberOf", caption: "memberOf"}, {
        value: "sAMAccountName",
        caption: "sAMAccountName"
    }, {value: "wWWHomePage", caption: "wWWHomePage"}, {value: "ipPhone", caption: "ipPhone"}, {
        value: "company",
        caption: "company"
    }, {value: "userPrincipalName", caption: "userPrincipalName"}, {
        value: "entryDN",
        caption: "entryDN"
    }, {value: "entryUUID", caption: "entryUUID"}, {
        value: "dcpersonalarea",
        caption: "dcpersonalarea"
    }, {value: "dcposition", caption: "dcposition"}, {value: "dcpersonalsubarea", caption: "dcpersonalsubarea"}];
    return t
}]).factory("eweiUserFields", ["$resource", function (e) {
    var t = [{value: "mobilePhone", caption: "手机"}, {value: "phone", caption: "电话"}, {
        value: "nickname",
        caption: "昵称"
    }, {value: "signature", caption: "个性签名"}, {value: "externalId", caption: "External ID"}];
    return t
}]);
angular.module("eweiApp.account").service("createUserGroupService", ["userGroupService", "$filter", "alertService", function (o, e, s) {
    this.run = function (i, e, t) {
        var r = e;
        i.userGroupCustomFields = [];
        if (angular.isDefined(r)) {
            for (var n = 0; n < r.length; n++) {
                if (r[n].customField.regexpForValidation && r[n].value) {
                    var a = new RegExp(r[n].customField.regexpForValidation);
                    if (!a.test(r[n].value)) {
                        s.add("请输入正确的" + r[n].customField.title, "danger");
                        r[n].value = "";
                        return
                    }
                } else if (r[n].customField && r[n].customField.required) {
                    if (!r[n].value || r[n].value == "-") {
                        s.add(r[n].customField.title + "不能为空", "danger");
                        return
                    }
                }
            }
        }
        angular.forEach(e, function (e) {
            var t = {value: e.value, customField: {id: e.customField.id}};
            i.userGroupCustomFields.push(t)
        });
        o.add(i, function (e) {
            t(e)
        })
    }
}]);
(function () {
    "use strict";
    angular.module("eweiApp.system_setting").factory("systemSettingMenus", e);
    e.$inject = ["ConsoleConfig", "permissions"];
    function e(e, t) {
        var i = [{
            title: "个人中心",
            permission: "",
            subMenus: [{permission: "", uri: "my_account", title: "个人中心", settingType: "system"}]
        }, {
            permission: "system_setting_company_account,system_setting_logo,system_setting_operation_log,system_setting_helpcenter_custom,system_setting_email,system_setting_domain,system_setting_oem",
            title: "企业账号",
            subMenus: [{
                permission: "system_setting_company_account,system_setting_operation_log",
                uri: "company_account",
                title: "企业账号",
                settingType: "system"
            }, {
                permission: "system_setting_logo,system_setting_helpcenter_custom,system_setting_email,system_setting_domain,system_setting_oem",
                uri: "brand_setting",
                title: "品牌设置",
                settingType: "system",
                module: "custom_logo"
            }]
        }, {
            title: "客服账号分组和权限",
            permission: "",
            subMenus: [{
                permission: "",
                uri: "run_engineers",
                title: "客服/工程师",
                settingType: "engineers",
                state: "run"
            }, {
                permission: "",
                uri: "service_desks",
                title: "客服组",
                settingType: "engineers"
            }, {permission: "role_manage", uri: "roles", title: "角色", settingType: "engineers"}, {
                permission: "",
                uri: "wait_engineers",
                title: "待激活的客服账号",
                settingType: "engineers",
                state: "wait"
            }, {permission: "", uri: "stop_engineers", title: "已停用的客服账号", settingType: "engineers", state: "stop"}]
        }, {
            title: "多渠道接入",
            permission: "ticket_setting_via",
            module: "multi_channel,api_sdk",
            subMenus: [{
                permission: "",
                uri: "channel_settings",
                title: "渠道管理",
                settingType: "multi_channel",
                module: "multi_channel"
            }, {
                permission: "",
                uri: "form_manager",
                title: "表单管理",
                settingType: "multi_channel",
                module: "multi_channel"
            }]
        }, {
            title: "工单设置",
            permission: "",
            subMenus: [{
                permission: "",
                uri: "ticket_template",
                title: "工单模板",
                settingType: "ticket"
            }, {
                permission: "ticket_custom_form",
                uri: "ticket_extend_form",
                title: "工单类型扩展表单",
                settingType: "ticket"
            }, {permission: "", uri: "workflow_templet", title: "工作流", settingType: "ticket"}, {
                permission: "",
                uri: "ticket_list_custom",
                title: "工单视图",
                settingType: "ticket"
            }, {
                permission: "ticket_setting_customfield",
                uri: "ticket_custom_field",
                title: "工单字段",
                settingType: "ticket"
            }, {permission: "", uri: "quick_reply", title: "快捷回复", settingType: "ticket"}]
        }, {
            title: "会话设置",
            permission: "chat_setting",
            module: "online_service",
            subMenus: [{
                title: "基础设置",
                permission: "chat_setting",
                module: "online_service",
                settingType: "chat_settings",
                uri: "basic"
            }, {
                title: "会话质检",
                permission: "chat_setting",
                module: "chat_quality",
                settingType: "chat_settings",
                uri: "quality"
            }]
        }, {
            title: "智能机器人",
            permission: "automaton_manage",
            subMenus: [{
                title: "机器人设置",
                permission: "automaton_manage",
                settingType: "intelligent-robot",
                uri: "robot-setting"
            }, {
                title: "机器人知识库",
                permission: "automaton_manage",
                settingType: "intelligent-robot",
                uri: "robot-knowledge"
            }, {
                title: "未知问题收集",
                permission: "automaton_manage",
                settingType: "intelligent-robot",
                uri: "robot-unknown-knowledge"
            }]
        }, {
            title: "客户设置",
            permission: "customer_setting_customfield,customer_group_setting_customfield,customer_view_manage",
            module: "customer_manage",
            subMenus: [{
                permission: "customer_setting_customfield",
                uri: "user_custom_field",
                title: "客户字段",
                settingType: "customer",
                module: "customer_manage"
            }, {
                permission: "customer_group_setting_customfield",
                uri: "user_group_custom_field",
                title: "客户组字段",
                settingType: "customer",
                module: "customer_manage"
            }, {
                permission: "customer_view_manage",
                uri: "user_custom_view",
                title: "客户视图",
                settingType: "customer",
                module: "customer_manage"
            }, {
                permission: "customer_view_manage",
                uri: "user_group_custom_view",
                title: "客户组视图",
                settingType: "customer",
                module: "customer_manage"
            }]
        }, {
            title: "商业规则",
            permission: "",
            subMenus: [{
                permission: "assign_rules_permissions",
                uri: "assignment",
                title: "智能分派",
                settingType: "ticket",
                activeWhen: "system_setting.assignment,system_setting.assignment_detail"
            }, {
                permission: "ticket_setting_service_catalog",
                uri: "service_catalog",
                title: "服务目录",
                settingType: "ticket"
            }, {
                permission: "ticket_setting_ticket_trigger,chat_edit_trigger",
                uri: "triggerTask",
                title: "触发器",
                settingType: "ticket",
                module: "automation",
                activeWhen: "system_setting.triggerTask,system_setting.triggerTask.ticket,system_setting.triggerTask.webchat,system_setting.triggerTask_edit_ticket,system_setting.triggerTask_edit_webchat"
            }, {
                permission: "ticket_setting_automation,chat_edit_automation",
                uri: "automations",
                title: "自动化",
                settingType: "ticket",
                module: "automation",
                activeWhen: "system_setting.automations,system_setting.automations.ticket,system_setting.automations.webchat,system_setting.automation_default,system_setting.automation_edit_ticket,system_setting.automation_edit_webchat"
            }, {
                permission: "ticket_setting_work_time",
                uri: "working_day",
                title: "营业时间",
                settingType: "ticket"
            }, {
                permission: "ticket_setting_business_rules",
                uri: "sla",
                title: "SLA",
                settingType: "ticket",
                module: "sla"
            }, {
                permission: "system_setting_tags",
                uri: "tag_setting",
                title: "标签",
                settingType: "system"
            }, {
                permission: "system_setting_ticket_evaluate,chat_edit_evaluate",
                uri: "evaluate_edit",
                title: "满意度调查问卷",
                settingType: "ticket"
            }]
        }, {
            title: "系统集成",
            type: "system_setting_other",
            permission: "system_setting_helpcenter_sso,system_setting_app_market,system_setting_webhook,customer_setting_customfield_url_secret",
            subMenus: [{
                permission: "system_setting_helpcenter_sso",
                uri: "signConfig",
                title: "SSO单点登录",
                settingType: "system"
            }, {
                permission: "system_setting_webhook",
                uri: "webhook",
                title: "WEBHOOK消息订阅",
                settingType: "system",
                module: "api_sdk"
            }, {
                permission: "system_setting_app_market",
                uri: "app_market",
                title: "应用市场",
                settingType: "system"
            }, {
                permission: "customer_setting_customfield_url_secret",
                uri: "external_url",
                title: "字段扩展URL密钥",
                settingType: "customer",
                module: "customer_manage"
            }]
        }];
        if (e.user && e.user.role && e.user.role.nameKey == "ROLE_NAME_EDITOR") {
            i[7].subMenus.push({permission: "", uri: "integral", title: "会员积分规则", settingType: "system"})
        }
        return i
    }
})();
angular.module("eweiApp.account").factory("viewCustomerViews", [function () {
    var e = [{
        title: "客服管理",
        permission: "system_setting_engineer",
        subMenus: [{permission: "", uri: "engineers", title: "客服/工程师", state: "run"}, {
            permission: "",
            uri: "service_desks",
            title: "客服组",
            state: "run"
        }, {permission: "role_manage", uri: "roles", title: "角色", state: "run"}, {
            permission: "",
            uri: "wait_engineers",
            title: "待激活的客服账号",
            state: "wait"
        }, {permission: "", uri: "stop_engineers", title: "已停用的客服账号", state: "stop"}]
    }];
    return e
}]);
angular.module("eweiApp.account").factory("permissions", [function () {
    var i = [];
    return {
        setPermissions: function (e) {
            i = e
        }, hasPermission: function (t) {
            t = t.trim();
            return _.some(i, function (e) {
                if (_.isString(e))return e.trim() === t
            })
        }, hasPermissions: function (e) {
            void 0;
            if (angular.isArray(e)) {
                return _.every(e, function (t) {
                    return _.some(i, function (e) {
                        return e.trim() === t.trim()
                    })
                })
            }
        }, anyPermissions: function (e) {
            if (angular.isArray(e)) {
                return _.some(e, function (t) {
                    return _.some(i, function (e) {
                        return e.trim() === t.trim()
                    })
                })
            }
        }
    }
}]);
angular.module("eweiApp.account").factory("license", ["coreModelService", "coreNotifyService", "timeService", function (i, e, o) {
    var s = null;
    s = i.config.license.get("license");
    var t = this.__proto__.constructor.name + "_" + (new Date).valueOf();

    function r() {
        e.register(t, e.constant.EVENT_LICENSE, function (e, t) {
            s = i.config.license.get("license")
        })
    }

    function n() {
        e.unRegister(t)
    }

    r();
    return {
        init: function () {
            return s
        }, type: function () {
            return s == null ? null : s.type
        }, accountBalance_old_type: function () {
            if (s == null) {
                return 0
            } else {
                return s.accountBalance
            }
        }, accountBalance: function () {
            if (s && s.accountBalance) {
                return s.accountBalance
            }
            return 0
        }, expenseAmount: function () {
            if (s == null) {
                return false
            } else if (angular.isUndefined(s.expenseAmount)) {
                return false
            } else {
                return s.expenseAmount
            }
        }, expenseLevel: function () {
            return s == null ? 0 : s.expenseLevel
        }, attachmentSize: function (e) {
            if (s == null) {
                return 0 + "GB"
            }
            if (s.attachmentSize > 0) {
                if (e == "G") {
                    return (s.attachmentSize / 1024 / 1024 / 1024).toFixed(2) + "GB"
                } else if (e == "M") {
                    return (s.attachmentSize / 1024 / 1024).toFixed(2) + "MB"
                } else if (e == "K") {
                    return (s.attachmentSize / 1024).toFixed(2) + "KB"
                } else {
                    return s.attachmentSize + "Byte"
                }
            } else {
                return 0 + "GB"
            }
        }, overdueDays: function () {
            if (!s || angular.isUndefined(s.startedAt) && angular.isUndefined(s.authorizeDeadline))return 0;
            var e = 24 * 3600 * 1e3;
            var t = new Date(o.getNowTime());
            if (s.authorizeDeadline) {
                var i = Date.parse(s.authorizeDeadline.replace(/-/g, "/"));
                return Math.floor((i - t) / e)
            } else {
                var r = Date.parse(s.startedAt.replace(/-/g, "/")) + s.days * e;
                return Math.floor((r - t) / e)
            }
        }, overdueTime: function () {
            if (s == null || angular.isUndefined(s.startedAt)) {
                return 0
            } else {
                var e = 24 * 60 * 60 * 1e3;
                var t = Date.parse(s.startedAt.replace(/-/g, "/")) + s.days * e;
                var i = new Date;
                i.setTime(t);
                return i.toLocaleDateString()
            }
        }, overduePayService: function () {
            if (s == null) {
                return 0
            } else if (!angular.isUndefined(s.authorizeDeadline)) {
                var e = new Date(Date.parse(s.authorizeDeadline.replace(/-/g, "/")));
                var t = new Date(o.getNowTime());
                if (e <= t) {
                    return 0
                } else {
                    return 1
                }
            } else {
                void 0;
                return "nothing"
            }
        }, threeDaysBeforeMaturity: function () {
            if (s == null) {
                return false
            } else if (angular.isUndefined(s.authorizeDeadline)) {
                return false
            } else {
                var e = new Date(Date.parse(s.authorizeDeadline.replace(/-/g, "/")));
                var t = new Date(o.getNowTime());
                void 0;
                if (e - t <= 3 * 24 * 60 * 60 * 1e3 && 0 < e - t) {
                    return true
                } else {
                    return false
                }
            }
        }, daysBeforeMaturity: function (e) {
            var t = e || 10;
            var i = t * 24 * 3600 * 1e3;
            var r;
            var n = new Date(o.getNowTime()).getTime();
            var a;
            if (s && angular.isDefined(s.authorizeDeadline)) {
                r = Date.parse(s.authorizeDeadline.replace(/-/g, "/"));
                a = r - n;
                if (a <= i && a > 0) {
                    return true
                }
            } else if (s && angular.isDefined(s.startedAt && s.days != -1)) {
                r = Date.parse(s.startedAt.replace(/-/g, "/")) + s.days * 24 * 3600 * 1e3;
                a = r - n;
                if (a <= i && a > 0) {
                    return true
                }
            }
            return false
        }, threeDaysBeforeDeduction: function () {
            if (s == null) {
                return false
            } else if (angular.isUndefined(s.nextSettleTime)) {
                return false
            } else {
                var e = new Date(Date.parse(s.nextSettleTime.replace(/-/g, "/")));
                var t = new Date;
                if (e - t <= 3 * 24 * 60 * 60 * 1e3 && 0 < e - t) {
                    return true
                } else {
                    return false
                }
            }
        }, lastTime: function () {
            if (s) {
                if (s.lasttime) {
                    var e = new Date(s.lasttime.replace(/-/g, "/"));
                    if (!isNaN(e)) {
                        var t = new Date("2016/10/14 00:00:00");
                        var i = e - t;
                        return i
                    } else {
                        return s.lasttime > "2016-10-14 00:00:00"
                    }
                } else {
                    return null
                }
            } else {
                return null
            }
        }, getNowTime: function () {
            if (!s || !s.now) {
                return 0
            }
            return s.now.replace(/-/g, "/")
        }, engineerNumber: function () {
            return s == null ? 0 : s.engineerNumber
        }, diskCapacity: function () {
            return s == null ? 0 : s.useDataCapacity
        }, remainingCapacity: function () {
            return s == null ? 0 : s.remainingCapacity
        }, createTime: function () {
            return s == null ? 0 : s.startedAt
        }, authorizeDeadline: function () {
            return s == null ? null : s.authorizeDeadline
        }, isCoverData: function () {
            return s == null ? null : s.is_cover_data
        }, hasModule: function (e) {
            if (!s)return false;
            if (s.type != "online_service_basic" && s.type != "remote_assistance_basic" && s.type != "enterprise_basic" && s.type != "enterprise_basic_19") {
                return false
            }
            if (!s.moduleList) {
                return false
            }
            return s.moduleList.indexOf(e) > -1
        }, isVersion2017: function () {
            if (s && (s.type == "online_service_basic" || s.type == "remote_assistance_basic" || s.type == "enterprise_basic")) {
                return true
            }
            return false
        }
    }
}]).factory("attachmentCapacityService", ["$resource", function (e) {
    return e("attachment_size/:id.json", {id: "@id"})
}]).factory("timeService", ["coreModelService", "coreNotifyService", function (i, e) {
    var r = null;
    r = i.config.license.get("license");
    var t = this.__proto__.constructor.name + "_" + (new Date).valueOf();

    function n() {
        e.register(t, e.constant.EVENT_LICENSE, function (e, t) {
            r = i.config.license.get("license")
        })
    }

    function a() {
        e.unRegister(t)
    }

    n();
    return {
        getNowTime: function () {
            r.now = r.now || (new Date).toLocaleString();
            var e = new Date(r.now.replace(/-/g, "/"));
            var t = parseInt(e.getMonth()) + 1;
            var i = e.getFullYear() + "/" + t + "/" + e.getDate() + " " + "00:00:00";
            void 0;
            return i
        }, trialAuthorizeDeadline: function (e) {
            var t = {1: 31, 2: {0: 28, 1: 29}, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31};

            function i(e) {
                if (e % 100 == 0) {
                    if (e % 4 == 0) {
                        return true
                    } else {
                        return false
                    }
                } else if (e % 4 == 0) {
                    return true
                } else {
                    return false
                }
            }

            var r = new Date(e);
            var n = r.getFullYear();
            var a = parseInt(r.getMonth()) + 1;
            var o = r.getDate();
            if (i(n) && a == "2") {
                var s = parseInt(o) + 14;
                if (s > t[a][1] && a == "2") {
                    s -= parseInt(t[a][1]);
                    a += 1
                } else if (s > t[a]) {
                    s -= parseInt(t[a]);
                    a += 1
                }
            } else {
                var s = parseInt(o) + 14;
                if (a == "2" && s > t[a][0]) {
                    s -= parseInt(t[a][0]);
                    a += 1
                } else if (s > t[a]) {
                    s -= parseInt(t[a]);
                    a += 1
                }
            }
            if (a > 12) {
                a = 1
            }
            return n + "-" + a + "-" + s
        }
    }
}]).factory("providerJudgement", ["license", "$rootScope", function (e, t) {
    return {
        isFree: function () {
            if (e.type() === "free" || e.type() === "trial" || e.type() === "enterprise_trial") {
                return true
            }
            return false
        }, isTrue: function () {
            if ((e.type() === "free" || e.type() === "trial" || e.type() === "enterprise_trial") && e.overdueDays() < 0) {
                t.$broadcast("license_overdue", "time");
                return false
            } else if (!e.lastTime() || e.lastTime() < 0) {
                if (e.overduePayService() === "nothing" && e.accountBalance_old_type() < 0) {
                    t.$broadcast("license_overdue", "account");
                    return false
                } else if (e.overduePayService() === "nothing" && e.accountBalance_old_type() >= 0) {
                    return true
                }
                if (e.overduePayService() <= 0) {
                    if (e.accountBalance_old_type() <= 0) {
                        t.$broadcast("license_overdue", "account");
                        return false
                    } else {
                        return true
                    }
                } else if (e.overduePayService() > 0) {
                    return true
                }
            } else if (e.lastTime() && e.lastTime() >= 0) {
                if ((e.type() == "professional" || e.type() == "enterprise" || e.type() == "enterprise_plus" || e.type() == "oem" || e.type() == "public" || e.type() == "blend" || e.type() == "online_service_basic" || e.type() == "remote_assistance_basic" || e.type() == "enterprise_basic" || e.type() == "enterprise_basic_19") && e.overduePayService() <= 0) {
                    t.$broadcast("license_overdue", "time");
                    return false
                } else if (e.remainingCapacity() <= 0) {
                    if (e.type() === "online_service_basic" || e.type() === "remote_assistance_basic" || e.type() === "enterprise_basic_19") {
                        t.$broadcast("license_overdue", "disk");
                        return false
                    } else if (e.isCoverData()) {
                        return true
                    }
                    t.$broadcast("license_overdue", "disk");
                    return false
                } else {
                    return true
                }
            }
        }
    }
}]);
(function () {
    "use strict";
    angular.module("eweiApp.system_setting").factory("oemSettingService", e);
    e.$inject = ["$http", "$rootScope", "$filter", "ConsoleConfig"];
    function e(t, i, e, r) {
        var n = null;

        function a() {
            return t.get("oem_config.json")
        }

        function o() {
            return n
        }

        function s(e) {
            return t.post("oem_config.json", e)
        }

        function l(e) {
            return t.get("update_oemconfig_open.json?open=" + e)
        }

        function c(e) {
            if (e.indexOf("http://") >= 0 || e.indexOf("https://") >= 0) {
                return e
            } else {
                return "http://" + e
            }
        }

        function u(e) {
            n = e;
            i.gettingHelpUrl = r.eweiHelpcenterApiUrl;
            i.gettingLastNewsUrl = r.eweiHelpcenterApiUrl;
            i.helpcenterVideoUrl = "http://ewei-web-saas.ewei.com/c90323c6fadd4b6bb2b609918be3d1c6";
            i.addAgentVideoUrl = "http://ewei-web-saas.ewei.com/f1c917a68df742acb2b34ed9dd2ef733";
            i.completeUserVideoUrl = "http://ewei-web-saas.ewei.com/e61b27b32ce64b318caa71ac47ef3e96";
            i.ticketVideoUrl = "http://ewei-web-saas.ewei.com/0b94e3a6f9cb4cd8bc497c235f88ac1a";
            i.viaEmailVideoUrl = "http://ewei-web-saas.ewei.com/b935736c7ea34ca3a9118da1f69e1db9";
            i.viaWebchatVideoUrl = "http://ewei-web-saas.ewei.com/bfd1d851ad8b45b295ac85e59d0c5e90";
            i.hideIntegralTab = false;
            i.hideCopyright = false;
            i.oemConfigOpen = e.open;
            i.guideVideoUrl = {
                helpcenterVideoName: "360度透视帮助中心",
                addAgentVideoName: "如何添加客服账号",
                completeUserVideoName: "客服ABC",
                ticketVideoName: "工单123",
                viaEmailVideoName: "通过Email处理工单",
                viaTicketFormVideoName: "如何配置网页表单",
                viaWebchatVideoName: "在线交谈和远程协助",
                helpcenterVideoUrl: "http://ewei-web-saas.ewei.com/c90323c6fadd4b6bb2b609918be3d1c6",
                addAgentVideoUrl: "http://ewei-web-saas.ewei.com/f1c917a68df742acb2b34ed9dd2ef733",
                completeUserVideoUrl: "http://ewei-web-saas.ewei.com/e61b27b32ce64b318caa71ac47ef3e96",
                ticketVideoUrl: "http://ewei-web-saas.ewei.com/0b94e3a6f9cb4cd8bc497c235f88ac1a",
                viaEmailVideoUrl: "http://ewei-web-saas.ewei.com/b935736c7ea34ca3a9118da1f69e1db9",
                viaTicketFormVideoUrl: "http://ewei-web-saas.ewei.com/0b94e3a6f9cb4cd8bc497c235f88ac1a",
                viaWebchatVideoUrl: "http://ewei-web-saas.ewei.com/bfd1d851ad8b45b295ac85e59d0c5e90"
            };
            if (e.guideVideoUrl) {
                var t = angular.copy(i.guideVideoUrl);
                i.guideVideoUrl = angular.extend(i.guideVideoUrl, e.guideVideoUrl);
                i.guideVideoUrl.helpcenterVideoName = i.guideVideoUrl.helpcenterVideoName != "" ? i.guideVideoUrl.helpcenterVideoName : t.helpcenterVideoName;
                i.guideVideoUrl.addAgentVideoName = i.guideVideoUrl.addAgentVideoName != "" ? i.guideVideoUrl.addAgentVideoName : t.addAgentVideoName;
                i.guideVideoUrl.completeUserVideoName = i.guideVideoUrl.completeUserVideoName != "" ? i.guideVideoUrl.completeUserVideoName : t.completeUserVideoName;
                i.guideVideoUrl.ticketVideoName = i.guideVideoUrl.ticketVideoName != "" ? i.guideVideoUrl.ticketVideoName : t.ticketVideoName;
                i.guideVideoUrl.viaEmailVideoName = i.guideVideoUrl.viaEmailVideoName != "" ? i.guideVideoUrl.viaEmailVideoName : t.viaEmailVideoName;
                i.guideVideoUrl.viaTicketFormVideoName = i.guideVideoUrl.viaTicketFormVideoName != "" ? i.guideVideoUrl.viaTicketFormVideoName : t.viaTicketFormVideoName;
                i.guideVideoUrl.viaWebchatVideoName = i.guideVideoUrl.viaWebchatVideoName != "" ? i.guideVideoUrl.viaWebchatVideoName : t.viaWebchatVideoName
            }
            if (e.open) {
                if (e.helpUrl && e.helpUrl != "") {
                    i.gettingHelpUrl = c(e.helpUrl)
                }
                if (e.latestNewsSource == "provider") {
                    i.gettingLastNewsUrl = r.providerHelpCenterUrl + "/"
                }
                if (e.hideIntegralTab) {
                    i.hideIntegralTab = true
                }
                if (e.hideCopyright) {
                    i.hideCopyright = true
                }
                if (e.productName && e.productName != "") {
                    i.providerEweiProductName = e.productName
                }
                if (e.guideVideoUrl.helpcenterVideoUrl && e.guideVideoUrl.helpcenterVideoUrl != "") {
                    i.helpcenterVideoUrl = e.guideVideoUrl.helpcenterVideoUrl
                }
                if (e.guideVideoUrl.addAgentVideoUrl && e.guideVideoUrl.addAgentVideoUrl != "") {
                    i.addAgentVideoUrl = e.guideVideoUrl.addAgentVideoUrl
                }
                if (e.guideVideoUrl.completeUserVideoUrl && e.guideVideoUrl.completeUserVideoUrl != "") {
                    i.completeUserVideoUrl = e.guideVideoUrl.completeUserVideoUrl
                }
                if (e.guideVideoUrl.ticketVideoUrl && e.guideVideoUrl.ticketVideoUrl != "") {
                    i.ticketVideoUrl = e.guideVideoUrl.ticketVideoUrl
                }
                if (e.guideVideoUrl.viaEmailVideoUrl && e.guideVideoUrl.viaEmailVideoUrl != "") {
                    i.viaEmailVideoUrl = e.guideVideoUrl.viaEmailVideoUrl
                }
                if (e.guideVideoUrl.viaTicketFormVideoUrl && e.guideVideoUrl.viaTicketFormVideoUrl != "") {
                    i.viaTicketFormVideoUrl = e.guideVideoUrl.viaTicketFormVideoUrl
                }
                if (e.guideVideoUrl.viaWebchatVideoUrl && e.guideVideoUrl.viaWebchatVideoUrl != "") {
                    i.viaWebchatVideoUrl = e.guideVideoUrl.viaWebchatVideoUrl
                }
            }
        }

        function d(e) {
            return t.get("get_oem_helpdoc_url.json?type=" + e)
        }

        function p(e) {
            return t.post("save_oem_helpdoc_url.json", e)
        }

        return {
            getOemConfig: a,
            updateOemConfig: s,
            toggleOemConfig: l,
            settingOemConfig: u,
            getOemHelpDoc: d,
            saveOemHelpDoc: p,
            getLocalOemConfig: o
        }
    }
})();
angular.module("eweiApp.account").service("chartTypeService", ["permissions", function (e) {
    var t = {
        public: "工单状态",
        chartPerformance: ["工单数量", "工单处理时长", "工单响应时长", "解决率", "满意度", "是否评价", "SLA达标率"],
        chartDistribute: ["时间段分布", "IP地址来源地", "渠道分布", "溢出率", "删除率", "删除原因", "优先级分布", "工单类型分布", "服务目录分布", "标签分布", "客服接单排行榜", "客服关单排行榜", "客服团队协作排行榜", "客服技术支持排行榜", "客服社区贡献度排行榜", "客服组接单排行榜", "客服组关单排行榜", "客服组团队协作排行榜", "客服组技术支持排行榜", "客服组社区贡献度排行榜"],
        chartAnalyse: ["客户数量", "客户活跃度", "客户类型占比", "企业客户规模分布", "客户服务请求排行榜", "客户社区活动排行榜", "客户好评排行榜", "客户差评排行榜", "客户组服务请求排行榜", "客户组社区活动排行榜", "客户组好评排行榜", "客户组差评排行榜", "积分排行榜"]
    };
    var i = [];
    var r = e.hasPermission("ticket_performance_statistics");
    var n = e.hasPermission("ticket_distributed_statistics");
    var a = e.hasPermission("customer_analyze_statistics");
    u(t.public);
    if (r) {
        var o = t.chartPerformance;
        for (var s = 0; s < o.length; s++) {
            u(o[s])
        }
    }
    if (n) {
        var l = t.chartDistribute;
        for (var s = 0; s < l.length; s++) {
            u(l[s])
        }
    }
    if (a) {
        var c = t.chartAnalyse;
        for (var s = 0; s < c.length; s++) {
            u(c[s])
        }
    }
    function u(e) {
        i.push({name: e})
    }

    return i
}]);
(function (e) {
    "use strict";
    e.module("eweiApp.ticket").factory("eweiChatService", t);
    t.$inject = [];
    function t() {
        var i = {};
        var r = {};
        var n = {};
        return {
            setChatBtnGroupStatus: function (e, t) {
                i[e] = t
            }, getChatBtnGroupStatus: function (e) {
                return i[e]
            }, setRemotePlugStatus: function (e, t) {
                r[e] = t
            }, getRemotePlugStatus: function (e) {
                return r[e]
            }, setChatStatus: function (e, t) {
                n[e] = t
            }, getChatStatus: function (e) {
                return n[e]
            }
        }
    }
})(angular);
(function (t) {
    "use strict";
    t.module("eweiApp.ticket").service("ticketStatusCompareService", e);
    e.$inject = [];
    function e() {
        var n = {new: 1, assigned: 1, suspend: 1, open: 2, pending: 2, solved: 3, closed: 4};
        this.run = function (e, t) {
            var i = [];
            if (t === "$in") {
                for (var r in n) {
                    if (n[r] > n[e]) {
                        i.push(r)
                    }
                }
                i.unshift(e)
            } else {
                for (var r in n) {
                    if (n[r] >= n[e]) {
                        i.push(r)
                    }
                }
                i.splice(i.indexOf(e), 1);
                i.unshift(e)
            }
            return i
        };
        this.getCurrentStatus = function (e) {
            if (e.indexOf("[") > -1) {
                e = JSON.parse(e)
            }
            if (t.isArray(e)) {
                return e[0]
            } else {
                return e
            }
        }
    }
})(angular);
angular.module("eweiApp.common").filter("trusted", ["$sce", function (t) {
    return function (e) {
        if (angular.isString(e)) {
            return t.trustAsHtml(e)
        } else {
            return e
        }
    }
}]).filter("backFirstStr", [function () {
    return function (e) {
        return e.charAt(0)
    }
}]).filter("nullStringFilter", [function () {
    return function (e) {
        if (e === null || e === "" || e === undefined) {
            e = "-"
        }
        return e
    }
}]).filter("trueFalseFilter", [function () {
    return function (e) {
        if (e == true) {
            e = "勾选"
        } else if (e == false) {
            e = "未勾选"
        }
        return e
    }
}]).filter("trueFalseFilter1", [function () {
    return function (e) {
        if (e == true) {
            e = "是"
        } else if (e == false) {
            e = "否"
        } else {
            e = ""
        }
        return e
    }
}]).filter("checkboxFilter", [function () {
    return function (e) {
        if (e === "true" || e === true) {
            e = "true"
        } else {
            e = "false"
        }
        return e
    }
}]).filter("customerStatus", [function () {
    return function (e) {
        if (e == 0 || e == "0") {
            e = "已停用"
        } else {
            e = "尚未完成注册"
        }
        return e
    }
}]).filter("searchTypeFilter", [function () {
    return function (e) {
        if (e == "ticket") {
            e = "工单"
        } else if (e == "user") {
            e = "客户"
        } else if (e == "userGroup") {
            e = "客户组"
        } else if (e == "article") {
            e = "文章"
        } else if (e == "question") {
            e = "问答"
        }
        return e
    }
}]).filter("dateFilterStandard", [function () {
    return function (e) {
        if (typeof e != "undefined") {
            var t = new Date(Date.parse(e.replace(/-/g, "/")));
            var i = t.getMonth() + 1;
            i = i < 10 ? "0" + i : i;
            var r = t.getDate();
            r = r < 10 ? "0" + r : r;
            if (e == null || e == "") {
                e = "-"
            } else {
                e = t.getFullYear() + "-" + i + "-" + r
            }
            return e
        }
    }
}]).filter("dateFilter", [function () {
    return function (e) {
        if (e == null || e == "") {
            e = "-"
        } else {
            var t = /^(\d{4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
            if (!t.test(e)) {
                return e
            }
            var i = new Date(Date.parse(e.replace(/-/g, "/")));
            var r = new Date;
            var n = r - i;
            var a = 60 * 1e3;
            var o = a * 60;
            var s = o * 24;
            if (n < a) {
                e = "刚刚"
            } else if (n < o) {
                e = Math.floor(n / a) + "分钟前"
            } else if (n < s) {
                e = Math.floor(n / o) + "小时前"
            } else if (n < s * 2) {
                e = "1天前"
            } else if (i.getFullYear() == r.getFullYear()) {
                var l = i.getMonth() + 1;
                l = l < 10 ? "0" + l : l;
                var c = i.getDate();
                c = c < 10 ? "0" + c : c;
                var u = i.getHours();
                u = u < 10 ? "0" + u : u;
                var d = i.getMinutes();
                d = d < 10 ? "0" + d : d;
                e = l + "月" + c + "日 " + u + ":" + d
            } else {
                var l = i.getMonth() + 1;
                l = l < 10 ? "0" + l : l;
                var c = i.getDate();
                c = c < 10 ? "0" + c : c;
                var u = i.getHours();
                u = u < 10 ? "0" + u : u;
                var d = i.getMinutes();
                d = d < 10 ? "0" + d : d;
                e = i.getFullYear() + "年" + l + "月" + c + "日 " + u + ":" + d
            }
        }
        return e
    }
}]).filter("dateFilter_style1", [function () {
    return function (e, t, i) {
        if (e == null || e == "") {
            e = "-"
        } else if (t == "solvedAt" && i != "solved" && i != "closed") {
            e = "-"
        } else {
            var r = /^(\d{4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
            if (!r.test(e)) {
                return e
            }
            var n = new Date(Date.parse(e.replace(/-/g, "/")));
            var a = new Date;
            var o = n.getMonth() + 1;
            o = o < 10 ? "0" + o : o;
            var s = n.getDate();
            s = s < 10 ? "0" + s : s;
            var l = n.getHours();
            l = l < 10 ? "0" + l : l;
            var c = n.getMinutes();
            c = c < 10 ? "0" + c : c;
            if (n.getFullYear() == a.getFullYear() && n.getMonth() == a.getMonth() && n.getDate() == a.getDate()) {
                e = "今天 " + l + ":" + c
            } else if (n.getFullYear() == a.getFullYear()) {
                e = o + "月" + s + "日 " + l + ":" + c
            } else {
                e = n.getFullYear() + "年" + o + "月" + s + "日 " + l + ":" + c
            }
        }
        return e
    }
}]).filter("minute_format_filter", [function () {
    return function (e, t, i) {
        if ((e == null || e == "") && e != 0) {
            text = "-"
        } else if (t == "solveMinutes" && i != "solved" && i != "closed") {
            text = "-"
        } else {
            if (e < 60) {
                text = e + "分钟"
            } else if (e < 24 * 60) {
                var r = Math.floor(e / 60);
                text = r + "小时" + (e - r * 60) + "分钟"
            } else {
                var n = Math.floor(e / (24 * 60));
                var r = Math.floor((e - n * 24 * 60) / 60);
                text = n + "天" + r + "小时" + (e - n * 24 * 60 - r * 60) + "分钟"
            }
        }
        return text
    }
}]).filter("dateFilter_style2", [function () {
    return function (e) {
        if (e == null || e == "") {
            e = "-"
        } else {
            var t = /^(\d{4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
            if (!t.test(e)) {
                return e
            }
            var i = new Date(Date.parse(e.replace(/-/g, "/")));
            var r = new Date;
            var n = i.getMonth() + 1;
            n = n < 10 ? "0" + n : n;
            var a = i.getDate();
            a = a < 10 ? "0" + a : a;
            var o = i.getHours();
            o = o < 10 ? "0" + o : o;
            var s = i.getMinutes();
            s = s < 10 ? "0" + s : s;
            if (i.getFullYear() == r.getFullYear() && i.getMonth() == r.getMonth() && i.getDate() == r.getDate()) {
                e = "今天 " + o + ":" + s
            } else {
                e = n + "-" + a + " " + o + ":" + s
            }
        }
        return e
    }
}]).filter("dateFilter_style3", [function () {
    return function (e) {
        if (e == null || e == "") {
            e = "-"
        } else {
            var t = /^(\d{4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
            if (!t.test(e)) {
                return e
            }
            var i = new Date(Date.parse(e.replace(/-/g, "/")));
            var r = new Date;
            var n = r - i;
            var a = 60 * 1e3;
            var o = a * 60;
            var s = o * 24;
            if (n < a) {
                e = "刚刚"
            } else if (n < o) {
                e = Math.floor(n / a) + "分钟前"
            } else if (n < s) {
                e = Math.floor(n / o) + "小时前"
            } else if (n < s * 2) {
                e = "1天前"
            } else if (i.getFullYear() == r.getFullYear()) {
                var l = i.getMonth() + 1;
                l = l < 10 ? "0" + l : l;
                var c = i.getDate();
                c = c < 10 ? "0" + c : c;
                var u = i.getHours();
                u = u < 10 ? "0" + u : u;
                var d = i.getMinutes();
                d = d < 10 ? "0" + d : d;
                e = l + "月" + c + "日 " + u + ":" + d
            } else {
                var l = i.getMonth() + 1;
                l = l < 10 ? "0" + l : l;
                var c = i.getDate();
                c = c < 10 ? "0" + c : c;
                var u = i.getHours();
                u = u < 10 ? "0" + u : u;
                var d = i.getMinutes();
                d = d < 10 ? "0" + d : d;
                e = i.getFullYear() + "-" + l + "-" + c + " " + u + ":" + d
            }
        }
        return e
    }
}]).filter("dateFilter_human", function () {
    return function (e) {
        var t = e;
        if (t == null || t === "") {
            t = "-"
        } else {
            var i = /^(\d{4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
            if (!i.test(t)) {
                return t
            }
            var r = new Date(Date.parse(t.replace(/-/g, "/")));
            var n = new Date;
            var a = n - r;
            var o = 60 * 1e3;
            var s = 5 * o;
            var l = o * 60;
            var c = l * 24;
            if (a < s) {
                t = "刚刚"
            } else if (a < l) {
                t = Math.floor(a / o) + "分钟前"
            } else if (a < c) {
                t = Math.floor(a / l) + "小时前"
            } else if (a < c * 30) {
                t = Math.floor(a / c) + "天前"
            } else if (a < c * 30 * 12) {
                t = Math.floor(a / (c * 30)) + "月前"
            } else if (a >= c * 30 * 12) {
                t = Math.floor(a / (c * 30 * 12)) + "年前"
            }
        }
        return t
    }
}).filter("evaluateScoreFilter", ["$filter", function (t) {
    return function (e) {
        if (e == null || e === "") {
            e = "-"
        } else if (e == "2") {
            e = t("translate")("TICKET_EVALUATE_GOOD")
        } else if (e == "1") {
            e = t("translate")("TICKET_EVALUATE_FAIR")
        } else if (e == "0") {
            e = t("translate")("TICKET_EVALUATE_POOR")
        }
        return e
    }
}]).filter("booleanFilter", ["$filter", function (t) {
    return function (e) {
        if (e == null || e == "") {
            if (e == false) {
                e = t("translate")("BOOLEAN_NO")
            } else {
                e = "-"
            }
        } else if (e) {
            e = t("translate")("BOOLEAN_YES")
        }
        return e
    }
}]).filter("ticketStatusFilter", ["$filter", function (t) {
    return function (e) {
        if (e == null || e == "") {
            e = "-"
        } else if (e == "new") {
            e = t("translate")("TICKET_STATUS_NEW")
        } else if (e == "open") {
            e = t("translate")("TICKET_STATUS_OPEN")
        } else if (e == "solved") {
            e = t("translate")("TICKET_STATUS_SOLVED")
        } else if (e == "closed") {
            e = t("translate")("TICKET_STATUS_CLOSED")
        } else if (e == "pending") {
            e = t("translate")("TICKET_STATUS_PENDING")
        } else if (e == "suspended") {
            e = t("translate")("TICKET_STATUS_SUSPENDED")
        } else if (e == "deleted") {
            e = t("translate")("TICKET_STATUS_DELETED")
        } else if (e == "assigned") {
            e = t("translate")("TICKET_STATUS_ASSIGNED")
        }
        return e
    }
}]).filter("ticketStatusToImgFilter", [function () {
    return function (e) {
        if (e == null || e == "") {
            e = ""
        } else if (e == "new") {
            e = '<span class="New">N</span>'
        } else if (e == "open") {
            e = '<span class="New">O</span>'
        } else if (e == "solved") {
            e = '<span class="New">S</span>'
        } else if (e == "closed") {
            e = '<span class="New">C</span>'
        } else if (e == "pending") {
            e = '<span class="Pending">P</span>'
        } else if (e == "suspended") {
            e = '<span class="Suspended">S</span>'
        } else if (e == "deleted") {
            e = '<span class="Deleted">D</span>'
        }
        return e
    }
}]).filter("ticketStatusToTextFilter", [function () {
    return function (e) {
        if (e == null || e == "") {
            e = ""
        } else if (e == "new") {
            e = "未分派"
        } else if (e == "assigned") {
            e = "已分派"
        } else if (e == "open") {
            e = "处理中"
        } else if (e == "solved") {
            e = "处理完毕"
        } else if (e == "closed") {
            e = "关闭"
        } else if (e == "pending") {
            e = "暂停"
        } else if (e == "suspended") {
            e = "隔离"
        } else if (e == "deleted") {
            e = "删除"
        }
        return e
    }
}]).filter("dateAddDaysFilter", [function () {
    return function (e, t) {
        var i = new Date(Date.parse(e.replace(/-/g, "/")) + t * 24 * 60 * 60 * 1e3);
        return i.toLocaleString()
    }
}]).filter("ceil", [function () {
    return function (e) {
        return Math.ceil(e)
    }
}]).filter("fileSize", [function () {
    return function (e) {
        if (e == null || e == "") {
            e = "0byte"
        } else if (e < 1024) {
            e = e + "byte"
        } else if (e >= 1024 && e < 1024 * 1024) {
            e = (e / 1024).toFixed(2) + "kb"
        } else if (e >= 1024 * 1024) {
            e = (e / (1024 * 1024)).toFixed(2) + "mb"
        }
        return e
    }
}]).filter("fileSizeA", [function () {
    return function (e) {
        if (e == null || e == "") {
            e = "0byte"
        } else if (e >= 1024 * 1024 * 1024) {
            e = (e / (1024 * 1024 * 1024)).toFixed(2) + "GB"
        } else if (e >= 1024 * 1024) {
            e = (e / (1024 * 1024)).toFixed(2) + "MB"
        } else if (e >= 1024) {
            e = (e / 1024).toFixed(2) + "KB"
        } else {
            e = e + "Byte"
        }
        return e
    }
}]).filter("cutStr", [function () {
    return function (e, t) {
        if (!e)return "";
        if (typeof e !== "string") {
            e = e.toString()
        }
        t = parseInt(t, 10);
        if (!t)return e;
        if (e.length <= t)return e;
        e = e.substr(0, t) + "...";
        return e
    }
}]).filter("linkSetMark", [function () {
    return function (e) {
        if (e == null || e == "") {
            e = ""
        } else {
            var t = /(\b(?:(https|http)(:\/\/))[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])|\b(www[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
            var e = e.replace(/</g, "&lt;").replace(/\n/g, "<br/>");
            return e.replace(t, function (e) {
                if (e.indexOf("http") == -1) {
                    var t = "http://" + e
                }
                return "<a href='" + (t ? t : e) + "' target='_blank'>" + e + "</a>"
            })
        }
        return e
    }
}]).filter("firstimage", ["$sce", function (a) {
    return function (e, t) {
        var i = '<img src="/source/images/link.png">';
        var r = $("<div></div>");
        if (e) {
            r.append(e.replace(/src="no_auth_ewei_attachment/g, 'src="/no_auth_ewei_attachment'))
        }
        var n = r.find("img");
        if (n.length) {
            i = '<img src="' + $(n[0]).attr("src") + '">'
        }
        return a.trustAsHtml(i)
    }
}]).filter("remote_function", ["$sce", function (e) {
    return function (e) {
        if (e == "remote_desk") {
            return "远程桌面"
        } else if (e == "video_call") {
            return "视频通话"
        } else {
            return "远程桌面"
        }
    }
}]).filter("replace_ewei_productname", ["$sce", "$filter", function (e, t) {
    return function (e) {
        if (e == null || e == "") {
            return t("translate")("EWEI_HELP_DESK_PRODUCT_NAME")
        } else {
            return e
        }
    }
}]).filter("date_toLocale_string", ["$sce", function (e) {
    return function (e) {
        if (e == null || e == "") {
            return "-"
        } else {
            var t = new Date(Date.parse(e.replace(/-/g, "/")));
            return t.toLocaleString()
        }
    }
}]).filter("custom_field_type", ["$sce", function (e) {
    return function (e) {
        if (e == "text") {
            return "文本输入框"
        } else if (e == "number") {
            return "纯数字文本"
        } else if (e == "email") {
            return "Email"
        } else if (e == "regexp") {
            return "正则表达式"
        } else if (e == "checkbox") {
            return "勾选项"
        } else if (e == "options") {
            return "下拉框"
        } else if (e == "date") {
            return "日期"
        } else if (e == "textarea") {
            return "多行文本输入框"
        } else if (e == "decimal") {
            return "小数"
        }
    }
}]).filter("user_property_filter", ["$sce", function (e) {
    return function (e) {
        if (e == null || e == "") {
            return e
        } else if (e == "name") {
            return "姓名"
        } else if (e == "email") {
            return "Email"
        } else if (e == "mobilePhone") {
            return "手机"
        } else if (e == "phone") {
            return "电话"
        } else if (e == "nickname") {
            return "昵称"
        } else if (e == "externalId") {
            return "External ID"
        } else if (e == "signature") {
            return "个性签名"
        } else {
            return e
        }
    }
}]).filter("string_to_json", ["$sce", function (e) {
    return function (e) {
        return jQuery.parseJSON(e)
    }
}]).filter("ticket_title_filter", ["$sce", function (e) {
    return function (e) {
        if (e == "no") {
            return "编号"
        } else if (e == "status") {
            return "状态"
        } else if (e == "subject") {
            return "主题"
        } else if (e == "requester.name") {
            return "客户"
        } else if (e == "engineer.user.name") {
            return "处理人"
        } else if (e == "requester.userGroup.name") {
            return "客户组"
        } else if (e == "serviceDesk.name") {
            return "客服组"
        } else if (e == "createdAt") {
            return "创建于"
        } else if (e == "via.source") {
            return "入口"
        } else if (e == "via.channelName") {
            return "渠道"
        } else if (e == "serviceCatalog.name") {
            return "服务目录"
        } else if (e == "tags") {
            return "标签"
        } else if (e == "priority") {
            return "优先级"
        } else if (e == "ticketType.name") {
            return "类型"
        } else if (e == "deleter.user.name") {
            return "删除人"
        } else if (e == "deleteReason") {
            return "删除原因"
        } else if (e == "evaluate.solved") {
            return "解决否"
        } else if (e == "evaluate.score") {
            return "满意度"
        } else if (e == "evaluate.suggestion") {
            return "客户意见"
        } else if (e == "ticketMetric.solvedAt") {
            return "完成于"
        } else if (e == "ticketMetric.pausedAt") {
            return "暂停于"
        } else if (e == "deletedAt") {
            return "删除于"
        } else if (e == "createdAt") {
            return "创建于"
        } else {
            return property
        }
    }
}]).filter("highlight", ["$sce", "$log", function (n, e) {
    var t = function (e, t) {
        if (!t) {
            return n.trustAsHtml(e)
        }
        var i = new RegExp(t, "gi");
        if (e) {
            var r = e.replace(i, '<span style="color:#1E8DCF;">$&</span>');
            return n.trustAsHtml(r)
        }
    };
    return t
}]).filter("changeLogoUrl", ["$sce", "EweiConfig", "$rootScope", function (e, r, n) {
    return function (e, t) {
        var i = /^http[s]?:\/\/([\w-]+\.)+[\w-]+([\w-./?%&=]*)?$/;
        if (!e) {
            if (n.oemConfig && n.oemConfig.open && n.oemConfig.photo && n.oemConfig.photo.contentUrl) {
                return "/no_auth_ewei_attachment?contentUrl=" + n.oemConfig.photo.contentUrl
            } else {
                return t ? t : ""
            }
        }
        if (i.test(e) || e.indexOf("//" + r.bucket_domain + "/") != -1) {
            return e
        }
        return "/ewei_attachment?contentUrl=" + e
    }
}]).filter("judgeType", ["$sce", function (e) {
    return function (e, t) {
        if (e.indexOf("image/") > -1) {
            return t && t == 5 ? "map" : "image"
        }
        if (e.indexOf("audio/") > -1) {
            return "audio"
        }
        if (e.indexOf("video/") > -1) {
            return "video"
        }
        return "files"
    }
}]).filter("escapeHTML", [function () {
    return function (e) {
        if (e) {
            return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;")
        }
        return ""
    }
}]).filter("firstUpperCase", function () {
    return function (e) {
        if (e) {
            var t = e.split(" ");
            t = t.map(function (e) {
                if (e && e[0].charCodeAt() >= 97 && e[0].charCodeAt() <= 122) {
                    e = e[0].toUpperCase() + e.substring(1)
                }
                return e
            });
            return t.join(" ")
        } else {
            return ""
        }
    }
}).filter("hrefSetMark", [function () {
    return function (e) {
        if (e && (e.toLowerCase().indexOf("http://") > -1 || e.toLowerCase().indexOf("https://") > -1)) {
            e = e
        } else {
            e = ""
        }
        return e
    }
}]).filter("translateFieldValue", [function () {
    return function (e, t, i) {
        var r = e;
        var n = t.split(".");
        for (var a in n) {
            if (n.hasOwnProperty(a)) {
                r = r[n[a]];
                if (!r) {
                    break
                }
            }
        }
        return i ? i(r, e) : r
    }
}]).filter("ticketOperation", [function () {
    var t = {
        create: "创建工单",
        create_assign: "创建工单并分派给",
        request: "请求服务",
        assign: "分派工单给",
        response_ticket: "响应工单",
        receive: "接单",
        solved: "处理完毕工单",
        solved_assign: "处理完毕工单,并分派给",
        reset: "重置工单",
        reply_to_reset: "重置工单",
        reset_assign: "重置任务并分派给",
        pending: "等待客户响应",
        reply: "回复工单",
        delete: "删除工单",
        recovery: "恢复工单",
        close: "关闭工单",
        change_status: "状态变更",
        grab: "抢单",
        grab_to_pending: "抢单并暂停工单",
        grab_to_solved: "抢单并处理完毕工单",
        receive_to_pending: "接单并暂停工单",
        receive_to_solved: "接单并处理完毕工单",
        review: "审核工单",
        reply_to_solved: "处理完毕工单",
        reply_cancel_pending: "取消暂停工单",
        reply_to_pending: "暂停工单",
        assign_to_work_flow: "分派工单给",
        assign_to_service_desk: "分派工单给",
        assign_to_engineer: "分派工单给",
        review_to_pass: "关闭工单",
        review_to_no_pass: "重置工单",
        remove_suspended: "移除隔离区",
        response_assign: "响应任务",
        solved_assign: "处理完毕,并分派给"
    };
    return function (e) {
        if (t.hasOwnProperty(e)) {
            return t[e]
        }
        return ""
    }
}]).filter("minutesToTime", [function () {
    return function (e) {
        var t = parseInt(e / 60);
        var i = parseInt(e - t * 60);
        var r = "00";
        var n = "";
        if (t < 10) {
            t = "0" + t
        }
        if (i < 10) {
            i = "0" + i
        }
        n = t + ":" + i + ":" + r;
        return n
    }
}]).filter("minutesToTimeCh", [function () {
    return function (e) {
        e = Number(e);
        if (typeof e !== "number") {
            return ""
        }
        var t = "";
        if (e < 60) {
            t = e + "分钟"
        } else if (e < 24 * 60) {
            var i = Math.floor(e / 60);
            t = i + "小时" + (e - i * 60) + "分钟"
        } else {
            var r = Math.floor(e / (24 * 60));
            var i = Math.floor((e - r * 24 * 60) / 60);
            t = r + "天" + i + "小时" + (e - r * 24 * 60 - i * 60) + "分钟"
        }
        return t
    }
}]).filter("secondToTimeCh", [function () {
    return function (e) {
        e = Number(e);
        if (e !== 0 && isNaN(e)) {
            return ""
        }
        var t = "";
        if (e < 60) {
            t = e + "秒"
        } else if (e < 60 * 60) {
            var i = Math.floor(e / 60);
            t = i + "分钟" + (e - i * 60) + "秒"
        } else if (e < 24 * 60 * 60) {
            var r = Math.floor(e / 60 / 60);
            var i = Math.floor((e - r * 60 * 60) / 60);
            t = r + "小时" + i + "分钟" + (e - r * 60 * 60 - i * 60) + "秒"
        } else {
            var n = Math.floor(e / (24 * 60 * 60));
            var r = Math.floor((e - n * 24 * 60 * 60) / 60 / 60);
            var i = Math.floor((e - n * 24 * 60 * 60 - r * 60 * 60) / 60);
            t = n + "天" + r + "小时" + i + "分钟" + (e - n * 24 * 60 * 60 - r * 60 * 60 - i * 60) + "秒"
        }
        return t
    }
}]).filter("sms_type", [function () {
    var t = {
        mobile_phone_bind: "绑定手机号",
        password_reset: "找回密码",
        user_register: "手机注册客户验证",
        engineer_invite: "邀请客服",
        password_reset_notify: "密码重置通知"
    };
    return function (e) {
        if (t.hasOwnProperty(e)) {
            return t[e]
        }
        return ""
    }
}]).filter("chartTimeFormat", [function () {
    return function (e) {
        var t = parseInt(e / 3600);
        var i = parseInt((e - t * 3600) / 60);
        var r = parseInt((e - t * 3600) % 60);
        var n = "";
        if (t < 10) {
            t = "0" + t
        }
        if (i < 10) {
            i = "0" + i
        }
        if (r < 10) {
            r = "0" + r
        }
        n = t + ":" + i + ":" + r;
        return n
    }
}]).filter("channelType", [function () {
    return function (e) {
        var t = {
            console: "客服界面",
            web: "网页组件",
            helpcenter: "帮助中心客户端",
            phone: "电话接入",
            weixin: "微信接入",
            email: "邮件转工单",
            sdk: "SDK",
            dingding: "钉钉接入",
            yunzhijia: "云之家接入",
            api: "API",
            form: "网页表单(feedback)",
            chat: "在线交谈/远程协助"
        };
        if (t.hasOwnProperty(e)) {
            return t[e]
        }
        return e
    }
}]).filter("channelIcon", [function () {
    return function (e) {
        var t = {
            web: "&#xe780;",
            weixin: "&#xe786;",
            dingding: "&#xe785;",
            yunzhijia: "&#xe7a3;",
            email: "&#xe781;",
            phone: "&#xe782;",
            sdk: "&#xe783;",
            api: "&#xe784;",
            helpcenter: "&#xe651;",
            console: "&#xe78e;"
        };
        if (t.hasOwnProperty(e)) {
            return t[e]
        }
        return e
    }
}]).filter("specialChart", [function () {
    return function (e) {
        var t = /[`~!@#$%^&*()+={}\[\]\\\|;:'",\<\>.\?\/]/g;
        return t.test(e)
    }
}]).filter("setTargetForLabel", [function () {
    return function (e) {
        e = e.replace("<a", '<a target="_blank"');
        return e
    }
}]).filter("ticketPlanParticipations", ["$filter", function (n) {
    return function (e, t) {
        var i = t || "engineer";
        var r = [];
        if (e && i === "engineer") {
            angular.forEach(e, function (e) {
                if (e.engineer) {
                    r.push(e.engineer.user ? e.engineer.user.name || e.engineer.user.nickname : e.engineer.username || e.engineer.name)
                }
                if (e.serviceDesk) {
                    r.push(n("translate")(e.serviceDesk.name))
                }
                if (e.workflow) {
                    r.push(e.workflow.name)
                }
            })
        } else if (e && i === "customer") {
            angular.forEach(e, function (e) {
                e.requesters && angular.forEach(e.requesters, function (e) {
                    if (!e)return;
                    r.push(e.name || e.userName)
                })
            })
        }
        return r.join(",")
    }
}]).filter("ticketPlanSchedle", [function () {
    var n = {MON: "星期一", TUE: "星期二", WED: "星期三", THU: "星期四", FRI: "星期五", SAT: "星期六", SUN: "星期日"};
    return function (e, t) {
        if (!e)return "";
        if (t) {
            if (e.type == "custom") {
                var i = e.date;
                if (typeof i !== "string") {
                    var r = "YYYY-MM-DD HH:mm";
                    if (moment(i).year() === moment().year()) {
                        r = "MM-DD HH:mm"
                    }
                    i = moment(i).format(r)
                }
                return i + "起每隔" + e.intervalTime + "天" + moment(e.time, "HH:mm:ss").format("HH:mm")
            } else if (e.type == "month") {
                return "每月" + e.intervalTime + "日" + moment(e.time, "HH:mm:ss").format("HH:mm")
            } else if (e.type == "day") {
                return "每天" + moment(e.time, "HH:mm:ss").format("HH:mm")
            } else if (e.type == "week") {
                return "每周" + n[e.weekDay] + moment(e.time, "HH:mm:ss").format("HH:mm")
            }
        } else if (e.type === "point" && e.presetTimes) {
            return _.map(e.presetTimes, function (e) {
                var t = "YYYY-MM-DD HH:mm";
                if (moment(e).year() === moment().year()) {
                    t = "MM-DD HH:mm"
                }
                return moment(e).format(t)
            }).join(",")
        }
        return ""
    }
}]).filter("sanitize", ["$sanitize", function (t) {
    return function (e) {
        return t(e)
    }
}]);
angular.module("eweiApp.chart", []).config(["$stateProvider", "$urlRouterProvider", function (e, t) {
    e.state("chart", {
        url: "/chart",
        templateUrl: "source/views/chart/chart.html",
        controller: ["$rootScope", "$scope", "$state", "utils", "permissions", "$location", "coreModelService", function (e, t, i, r, n, a, o) {
            t.chartPerformanceBuried = function () {
                _hmt.push(["_trackPageview", "/报表统计/子级页面/绩效指标"]);
                _hmt.push(["_setCustomVar", e.vertionNumber, "名称", "报表统计-绩效指标", 1]);
                _hmt.push(["_trackEvent", "绩效指标", "报表统计"])
            };
            t.chartDistributeBuried = function () {
                _hmt.push(["_trackPageview", "/报表统计/子级页面/分布排行"]);
                _hmt.push(["_setCustomVar", e.vertionNumber, "名称", "报表统计-分布排行", 1]);
                _hmt.push(["_trackEvent", "分布排行", "报表统计"])
            };
            t.chartAnalyseBuried = function () {
                _hmt.push(["_trackPageview", "/报表统计/子级页面/客户分析"]);
                _hmt.push(["_setCustomVar", e.vertionNumber, "名称", "报表统计-客户分析", 1]);
                _hmt.push(["_trackEvent", "客户分析", "报表统计"])
            };
            var s = o.config.route.get("chart");
            if (s && s.name && n.hasPermission(s.permission)) {
                if (s.name == "chart.serviceReport" || s.name == "chart.serviceReportDetail") {
                    i.go("chart.serviceReport")
                } else if (s.name != i.current.name) {
                    i.go(s.name, s.params)
                }
            } else {
                if (n.hasPermission("ticket_performance_statistics")) {
                    i.go("chart.performance.number")
                } else if (n.hasPermission("ticket_distributed_statistics")) {
                    i.go("chart.distribute.request_distribute")
                } else if (n.hasPermission("customer_analyze_statistics")) {
                    i.go("chart.customer.customer_analyse")
                } else if (n.hasPermission("service_report")) {
                    i.go("chart.serviceReport")
                } else {
                    a.path("/unauthorized")
                }
            }
        }],
        resolve: {
            delayLoadJS: function () {
            }
        }
    }).state("chart.performance", {
        url: "/performance",
        templateUrl: "/source/views/chart/performance.html",
        controller: "performanceController",
        permission: "ticket_performance_statistics"
    }).state("chart.customer", {
        url: "/customer",
        templateUrl: "/source/views/chart/chart_analyze.html",
        controller: "ChartCustomerController",
        permission: "customer_analyze_statistics"
    }).state("chart.distribute", {
        url: "/distribute",
        templateUrl: "/source/views/chart/chart_distribute.html",
        controller: "ChartDistributeController",
        permission: "ticket_distributed_statistics"
    }).state("chart.performance.number", {
        url: "/number",
        templateUrl: "/source/views/chart/performance_number.html",
        controller: "performanceNumberController",
        permission: "ticket_performance_statistics",
        onEnter: ["coreModelService", "$state", "$stateParams", function (e, t, i) {
            e.config.route.put("chart", {name: this.name, params: i, permission: "ticket_performance_statistics"})
        }]
    }).state("chart.performance.response_time", {
        url: "/response_time",
        templateUrl: "/source/views/chart/performance_response_time.html",
        controller: "performanceRponseTimeController",
        permission: "ticket_performance_statistics"
    }).state("chart.performance.sla", {
        url: "/sla",
        templateUrl: "/source/views/chart/performance_sla.html",
        controller: "performanceRponseTimeController",
        permission: "ticket_performance_statistics"
    }).state("chart.performance.other", {
        url: "/other",
        templateUrl: "/source/views/chart/performance_other.html",
        controller: "performanceRponseTimeController",
        permission: "ticket_performance_statistics"
    }).state("chart.customer.customer_analyse", {
        url: "/customer_analyse",
        views: {
            "@chart.customer": {
                templateUrl: "/source/views/chart/customer_analyse.html",
                controller: "CustomerAnalyseController"
            }
        },
        permission: "customer_analyze_statistics",
        onEnter: ["coreModelService", "$state", "$stateParams", function (e, t, i) {
            e.config.route.put("chart", {name: this.name, params: i, permission: "customer_analyze_statistics"})
        }]
    }).state("chart.customer.top_customer", {
        url: "/top_customer",
        views: {
            "@chart.customer": {
                templateUrl: "/source/views/chart/top_customer.html",
                controller: "TopCustomerController"
            }
        },
        permission: "customer_analyze_statistics"
    }).state("chart.customer.top_usergroup", {
        url: "/top_usergroup",
        views: {
            "@chart.customer": {
                templateUrl: "/source/views/chart/top_usergroup.html",
                controller: "TopUserGroupController"
            }
        },
        permission: "customer_analyze_statistics"
    }).state("chart.customer.customer_integral", {
        url: "/customer_integral",
        views: {
            "@chart.customer": {
                templateUrl: "/source/views/chart/customer_integral.html",
                controller: "CustomerIntegralController"
            }
        },
        permission: "customer_analyze_statistics"
    }).state("chart.distribute.request_distribute", {
        url: "/request_distribute",
        views: {
            "@chart.distribute": {
                templateUrl: "/source/views/chart/request_distribute.html",
                controller: "RequestDistributeController"
            }
        },
        permission: "ticket_distributed_statistics",
        onEnter: ["coreModelService", "$state", "$stateParams", function (e, t, i) {
            e.config.route.put("chart", {name: this.name, params: i, permission: "ticket_distributed_statistics"})
        }]
    }).state("chart.distribute.ticket_prop_distribute", {
        url: "/ticket_prop_distribute",
        views: {
            "@chart.distribute": {
                templateUrl: "/source/views/chart/ticket_prop_distribute.html",
                controller: "TicketPropDistributeController"
            }
        },
        permission: "ticket_distributed_statistics"
    }).state("chart.distribute.top_engineer", {
        url: "/top_engineer",
        views: {
            "@chart.distribute": {
                templateUrl: "/source/views/chart/top_engineer.html",
                controller: "TopEngineerDistributeController"
            }
        },
        permission: "ticket_distributed_statistics"
    }).state("chart.distribute.top_servicedesk", {
        url: "/top_servicedesk",
        views: {
            "@chart.distribute": {
                templateUrl: "/source/views/chart/top_servicedesk.html",
                controller: "TopServiceDeskDistributeController"
            }
        },
        permission: "ticket_distributed_statistics"
    }).state("chart.serviceReport", {
        url: "/service_report",
        templateUrl: "/source/views/chart/service_report.html",
        controller: "ChartServiceReportController",
        permission: "service_report",
        onEnter: ["coreModelService", "$state", "$stateParams", function (e, t, i) {
            e.config.route.put("chart", {name: this.name, params: i, permission: "service_report"})
        }]
    }).state("chart.serviceReportDetail", {
        url: "/service_report/:type/:id",
        controller: "ChartServiceReportDetailController as vm",
        templateUrl: "/source/views/chart/service_report_detail.html",
        permission: "service_report",
        params: {dateFrom: null, dateTo: null},
        onEnter: ["coreModelService", "$state", "$stateParams", function (e, t, i) {
            e.config.route.put("chart", {name: this.name, params: i, permission: "service_report"})
        }],
        resolve: {
            reportData: ["$stateParams", "$q", "apiRestfulService", "apiServiceReportService", function (t, e, i, r) {
                void 0;
                var n = e.defer();

                function a() {
                    var e = i.run({
                        url: "/api/v1/service_report/show_report.json",
                        urlParam: {type: t.type, targetId: t.id, beginTime: t.dateFrom, endTime: t.dateTo}
                    });
                    e.get(null, function (e) {
                        if (e.status == 0) {
                            n.resolve(e.result)
                        } else {
                            n.reject()
                        }
                    }, n.reject)
                }

                if (!t.dateFrom || !t.dateTo) {
                    r.getDateRange().then(function (e) {
                        t.dateFrom = e.beginTime;
                        t.dateTo = e.endTime;
                        a()
                    })
                } else {
                    a()
                }
                return n.promise
            }]
        }
    })
}]);
+function () {
    "use strict";
    angular.module("eweiApp.polymerize_search", []).config(["$stateProvider", "$urlRouterProvider", function (e, t) {
        e.state("polymerize_search", {
            url: "/polymerize_search",
            templateUrl: "source/polymerize-search/template/polymerize-search.html",
            controller: "polymerizeSearchController",
            controllerAs: "ps"
        }).state("polymerize_search_senior", {
            url: "/polymerize_search_senior",
            templateUrl: "source/polymerize-search/template/polymerize-search-senior.html",
            controller: "polymerizeSearchSeniorController",
            controllerAs: "ps"
        }).state("polymerize_search_senior_result", {
            url: "/polymerize_search_senior_result",
            templateUrl: "source/polymerize-search/template/polymerize-search-senior-result.html",
            controller: "polymerizeSearchSeniorResultController",
            controllerAs: "ps"
        })
    }]).service("polymerizeSearchService", e);
    e.$inject = ["$http"];
    function e(e) {
        this.searchIds = [];
        this.seniorSearchIds = [];
        this.setSearchIds = function (e) {
            this.searchIds = e
        };
        this.getSearchIds = function () {
            return this.searchIds
        };
        this.setSeniorSearchIds = function (e) {
            this.seniorSearchIds = e
        };
        this.getSeniorSearchIds = function () {
            return this.seniorSearchIds
        }
    }
}();
angular.module("eweiApp.chart").service("reportCountTicketNumberService", ["cacheService", function (a) {
    this.run = function (e, t, i, r) {
        var n = {url: "/api/count_ticket_number.json", urlParam: e, dataParam: t};
        if (undefined === i || true == i) {
            a.runPost(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        } else {
            a.post(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        }
    };
    this.clearCache = function () {
        a.clear("/api/count_ticket_number.json")
    }
}]).service("reportTicketChartsCountService", ["cacheService", function (a) {
    this.run = function (e, t, i, r) {
        var n = {url: "/api/ticket_charts_count.json", urlParam: e, dataParam: t};
        if (undefined === i || true == i) {
            a.runPost(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        } else {
            a.post(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        }
    };
    this.clearCache = function () {
        a.clear("/api/ticket_charts_count.json")
    }
}]).service("chartService", ["cacheService", function (a) {
    this.run = function (e, t, i, r) {
        var n = {url: "/api/performance_count_list.json", urlParam: e, dataParam: t};
        if (undefined === i || true == i) {
            a.run(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        } else {
            a.get(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        }
    };
    this.clearCache = function () {
        a.clear("/api/performance_count_list.json")
    }
}]).service("customerAnalyseService", ["cacheService", "ConsoleConfig", function (a, o) {
    this.run = function (e, t, i, r) {
        e.provider_id = o.provider.id;
        e._token = getCookie("user_token");
        var n = {url: "/api/customer_analyse/:way.json", urlParam: e, dataParam: t};
        if (undefined === i || true == i) {
            a.run(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        } else {
            a.get(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        }
    };
    this.clearCache = function () {
        a.clear("/api/customer_analyse/:way.json")
    }
}]).service("distributeService", ["cacheService", "ConsoleConfig", function (a, o) {
    this.run = function (e, t, i, r) {
        e.provider_id = o.provider.id;
        e._token = getCookie("user_token");
        var n = {url: "/api/list_distribute/:way.json", urlParam: e, dataParam: t};
        if (undefined === i || true == i) {
            a.run(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        } else {
            a.get(n, function (e) {
                if (typeof r === "function") {
                    r(e)
                }
            })
        }
    };
    this.clearCache = function () {
        a.clear("/api/list_distribute/:way.json")
    }
}]);
(function (e, t) {
    if (typeof define === "function" && define.amd) {
        define(function () {
            return t(e.angular)
        })
    } else if (typeof exports === "object") {
        module.exports = t(e.angular || window && window.angular)
    } else {
        t(e.angular)
    }
})(this, function (l) {
    "use strict";
    l.module("angular-locker", []).provider("locker", function () {
        var a = function (e, t) {
            return l.isFunction(e) ? e(t) : e
        };
        var o = function (e) {
            return l.isDefined(e) && e !== null
        };
        var s = function (e) {
            throw new Error("[angular-locker] " + e)
        };
        var r = {driver: "local", namespace: "locker", eventsEnabled: true, separator: ".", extend: {}};
        return {
            defaults: function (e) {
                if (!o(e))return r;
                l.forEach(e, function (e, t) {
                    if (r.hasOwnProperty(t)) r[t] = e
                })
            }, $get: ["$window", "$rootScope", "$parse", function (e, i, n) {
                function t(r) {
                    this._options = r;
                    this._registeredDrivers = l.extend({local: e.localStorage, session: e.sessionStorage}, r.extend);
                    this._resolveDriver = function (e) {
                        if (!this._registeredDrivers.hasOwnProperty(e)) {
                            s('The driver "' + e + '" was not found.')
                        }
                        return this._registeredDrivers[e]
                    };
                    this._driver = this._resolveDriver(r.driver);
                    this._namespace = r.namespace;
                    this._separator = r.separator;
                    this._watchers = {};
                    this._checkSupport = function (e) {
                        if (!o(this._supported)) {
                            var t = "l";
                            try {
                                this._resolveDriver(e || r.driver).setItem(t, t);
                                this._resolveDriver(e || r.driver).removeItem(t);
                                this._supported = true
                            } catch (e) {
                                this._supported = false
                            }
                        }
                        return this._supported
                    };
                    this._getPrefix = function (e) {
                        if (!this._namespace)return e;
                        return this._namespace + this._separator + e
                    };
                    this._serialize = function (t) {
                        try {
                            return l.toJson(t)
                        } catch (e) {
                            return t
                        }
                    };
                    this._unserialize = function (t) {
                        try {
                            return l.fromJson(t)
                        } catch (e) {
                            return t
                        }
                    };
                    this._event = function (e, t) {
                        if (this._options.eventsEnabled) {
                            i.$emit(e, l.extend(t, {driver: this._options.driver, namespace: this._namespace}))
                        }
                    };
                    this._setItem = function (t, e) {
                        if (!this._checkSupport()) {
                            s('The browser does not support the "' + r.driver + '" driver')
                        }
                        try {
                            var i = this._getItem(t);
                            this._driver.setItem(this._getPrefix(t), this._serialize(e));
                            if (this._exists(t) && !l.equals(i, e)) {
                                this._event("locker.item.updated", {key: t, oldValue: i, newValue: e})
                            } else {
                                this._event("locker.item.added", {key: t, value: e})
                            }
                        } catch (e) {
                            if (["QUOTA_EXCEEDED_ERR", "NS_ERROR_DOM_QUOTA_REACHED", "QuotaExceededError"].indexOf(e.name) !== -1) {
                                s("The browser storage quota has been exceeded")
                            } else {
                                s('Could not add item with key "' + t + '"')
                            }
                        }
                    };
                    this._getItem = function (e) {
                        if (!this._checkSupport()) {
                            s('The browser does not support the "' + r.driver + '" driver')
                        }
                        return this._unserialize(this._driver.getItem(this._getPrefix(e)))
                    };
                    this._exists = function (e) {
                        if (!this._checkSupport()) {
                            s('The browser does not support the "' + r.driver + '" driver')
                        }
                        return this._driver.hasOwnProperty(this._getPrefix(a(e)))
                    };
                    this._removeItem = function (e) {
                        if (!this._checkSupport()) {
                            s('The browser does not support the "' + r.driver + '" driver')
                        }
                        if (!this._exists(e))return false;
                        this._driver.removeItem(this._getPrefix(e));
                        this._event("locker.item.forgotten", {key: e});
                        return true
                    }
                }

                t.prototype = {
                    put: function (e, t, i) {
                        if (!o(e))return false;
                        e = a(e);
                        if (l.isObject(e)) {
                            l.forEach(e, function (e, t) {
                                this._setItem(t, o(e) ? e : i)
                            }, this)
                        } else {
                            if (!o(t))return false;
                            var r = this._getItem(e);
                            this._setItem(e, a(t, o(r) ? r : i))
                        }
                        return this
                    }, add: function (e, t, i) {
                        if (!this.has(e)) {
                            this.put(e, t, i);
                            return true
                        }
                        return false
                    }, get: function (e, t) {
                        if (l.isArray(e)) {
                            var i = {};
                            l.forEach(e, function (e) {
                                if (this.has(e)) i[e] = this._getItem(e)
                            }, this);
                            return i
                        }
                        if (!this.has(e))return arguments.length === 2 ? t : void 0;
                        return this._getItem(e)
                    }, has: function (e) {
                        return this._exists(e)
                    }, forget: function (e) {
                        e = a(e);
                        if (l.isArray(e)) {
                            e.map(this._removeItem, this)
                        } else {
                            this._removeItem(e)
                        }
                        return this
                    }, pull: function (e, t) {
                        var i = this.get(e, t);
                        this.forget(e);
                        return i
                    }, all: function () {
                        var r = {};
                        l.forEach(this._driver, function (e, t) {
                            if (this._namespace) {
                                var i = this._namespace + this._separator;
                                if (t.indexOf(i) === 0) t = t.substring(i.length)
                            }
                            if (this.has(t)) r[t] = this.get(t)
                        }, this);
                        return r
                    }, keys: function () {
                        return Object.keys(this.all())
                    }, clean: function () {
                        return this.forget(this.keys())
                    }, empty: function () {
                        this._driver.clear();
                        return this
                    }, count: function () {
                        return this.keys().length
                    }, bind: function (e, t, i) {
                        if (!o(e.$eval(t))) {
                            n(t).assign(e, this.get(t, i));
                            this.add(t, i)
                        }
                        var r = this;
                        this._watchers[t + e.$id] = e.$watch(t, function (e) {
                            r.put(t, e)
                        }, l.isObject(e[t]));
                        return this
                    }, unbind: function (e, t) {
                        n(t).assign(e, void 0);
                        this.forget(t);
                        var i = t + e.$id;
                        if (this._watchers[i]) {
                            this._watchers[i]();
                            delete this._watchers[i]
                        }
                        return this
                    }, driver: function (e) {
                        if (e === this._options.driver)return this;
                        return this.instance(l.extend(this._options, {driver: e}))
                    }, getDriver: function () {
                        return this._driver
                    }, namespace: function (e) {
                        if (e === this._namespace)return this;
                        return this.instance(l.extend(this._options, {namespace: e}))
                    }, getNamespace: function () {
                        return this._namespace
                    }, supported: function (e) {
                        return this._checkSupport(e)
                    }, instance: function (e) {
                        return new t(e)
                    }
                };
                return new t(r)
            }]
        }
    })
});
var webSocket = null;
var webSocketConnected = false;
var webSocketConnectedFailedData = null;
var hasInstallFlash = false;
var handlers = {
    connects: [], onClose: function (e, t) {
        this.connects[e.replace("socket_", "")].onClose()
    }, onConnect: function (e) {
        this.connects[e.replace("socket_", "")].onConnect()
    }, onData: function (e, t) {
        this.connects[e.replace("socket_", "")].onData(t)
    }, debug: function (e, t) {
        hasInstallFlash = true
    }
};
function eweiWebSocket(t) {
    this.debug = false;
    this.connected = false;
    this.init = function () {
        this.index = handlers.connects.length;
        this.connected = false;
        handlers.connects.push(this)
    };
    this.connect = function (e, t) {
        this.createFlash(e, t)
    };
    this.createFlash = function (e, t) {
        if ($(".eweiWebSocketFlash_Div").length > 0) {
            return
        }
        var i = window.contextpath || "";
        var r = '<object id="eweiWebSocket_' + this.index + '" type="application/x-shockwave-flash" data="' + i + '/source/flash/websocket4ie.swf" width="1px" height="1px" class="websocket4ie"> ' + '<param name="wmode" value="window"> ' + '<param name="movie" value="' + i + '/source/flash/websocket4ie.swf"> ' + '<param name="quality" value="high"> ' + '<param name="menu" value="false"> ' + '<param name="allowScriptAccess" value="always"> ' + '<param name="flashvars" value="movieName=socket_' + this.index + "&handlers=handlers&server=" + e + "&port=" + t + "&debug=" + this.debug + '"></object>';
        var n = document.createElement("div");
        n.id = "eweiWebSocketFlash_" + this.index;
        n.innerHTML = r;
        n.style.width = "1px";
        n.style.heigth = "1px";
        document.body.appendChild(n);
        $("#eweiWebSocketFlash_" + this.index).addClass("eweiWebSocketFlash_Div")
    };
    this.onClose = function () {
        this.connected = false;
        webSocketConnected = false;
        if (typeof t.onClose == "function") {
            t.onClose()
        }
    };
    this.onConnect = function () {
        this.connected = true;
        webSocketConnected = true;
        if (typeof t.onConnect == "function") {
            t.onConnect(this)
        }
        if (webSocketConnectedFailedData != null) {
            this.send(webSocketConnectedFailedData)
        }
    };
    this.send = function (e) {
        document.getElementById("eweiWebSocket_" + this.index).send(e)
    };
    this.reConnect = function () {
        try {
            document.getElementById("eweiWebSocket_" + this.index).reconnectServer()
        } catch (e) {
        }
    };
    this.onData = function (e) {
        if (typeof t.onData == "function") {
            t.onData(e)
        }
    };
    this.onHubClosed = function (e) {
        if (typeof t.onHubClosed == "function") {
            t.onHubClosed(e, hasInstallFlash)
        } else {
            void 0
        }
    };
    this.onRequestHub = function (e) {
        if (typeof t.onRequestHub == "function") {
            t.onRequestHub(e)
        } else {
        }
    };
    this.init()
}
function requestScreenshot(e, t, i, r, n) {
    var a = (new Date).getTime();
    webSocketConnectedFailedData = "2JC" + a + '|{"cmd":"requestCS","bucket":"' + e + '","accesskey":"' + t + '","secretkey":"' + i + '","jsparam":{"chatId":' + n + ',"type":"' + r + '"}}';
    if (webSocketConnected) {
        webSocket.onRequestHub("requestCS");
        webSocket.send(webSocketConnectedFailedData);
        webSocketConnectedFailedData = null
    } else {
        if (webSocket == null) {
            if (webSocketOptions && webSocketOptions.onHubClosed) {
                webSocketOptions.onHubClosed("screenshot", hasInstallFlash)
            }
        } else {
            webSocket.onHubClosed("screenshot")
        }
    }
}
function requestVideo(e, t, i, r, n) {
    var a = (new Date).getTime();
    webSocketConnectedFailedData = "2JS" + a + '|{"cmd":"requestSC","bucket":"' + e + '","accesskey":"' + t + '","secretkey":"' + i + '","jsparam":{"chatId":' + n + ',"type":"' + r + '"}}';
    if (webSocketConnected) {
        webSocket.onRequestHub("requestSC");
        webSocket.send(webSocketConnectedFailedData);
        webSocketConnectedFailedData = null
    } else {
        if (webSocket == null) {
            if (webSocketOptions && webSocketOptions.onHubClosed) {
                webSocketOptions.onHubClosed("video", hasInstallFlash)
            }
        } else {
            webSocket.onHubClosed("video")
        }
    }
}
function requestRemoteDesk(e, t, i, r, n, a, o) {
    var s = (new Date).getTime();
    var l = {chatId: n, acceptUserId: a, remoteFunction: o};
    var c = {
        cmd: "requestRD",
        moblie: "no",
        addr: e,
        lic: t,
        requestClientId: i + "",
        user: r,
        username: r,
        jsparam: l
    };
    var u = "2JB" + s + "|" + JSON.stringify(c);
    if (o == "video_call") {
        webSocket.onRequestHub("respondVD");
        c.cmd = "requestVD";
        u = "2JV" + s + "|" + JSON.stringify(c)
    } else {
        c.cmd = "requestRD";
        webSocket.onRequestHub("respondRD")
    }
    webSocketConnectedFailedData = u;
    if (webSocketConnected) {
        webSocket.send(u);
        webSocketConnectedFailedData = null
    } else {
        if (webSocket == null) {
            if (webSocketOptions && webSocketOptions.onHubClosed) {
                webSocketOptions.onHubClosed("remoteDesk", hasInstallFlash)
            }
        } else {
            webSocket.onHubClosed("remoteDesk")
        }
    }
}
var eweiInstallHubTipHtml = {
    noflash: '<br/><h5 style="text-align: center;font-size: 16px;">未检测到远程协助组件</h5><h5 style="text-align: center;font-size: 16px;"><a href="https://get.adobe.com/cn/flashplayer" target="_blank" style="color:#666666;">请安装最新Flash插件</a></h5>',
    nohub: '<br/><h5 style="text-align: center;font-size: 16px;">未检测到远程协助组件</h5><h5 style="text-align: center;font-size: 16px;"><a onclick="changeEweiHubInstallTip(\'connect\');return false;" href="#" target="_blank" style="color: #fff;background: #509BE1;padding: 3px 20px;font-size: 14px;border-radius: 3px;">下载</a></h5>',
    connect: '<br/><h5 style="text-align: center;font-size: 16px;">检测组件与网页的通讯是否正常</h5><h5 style="text-align: center;font-size: 16px;"><a onclick="changeEweiHubInstallTip(\'connected\');return false;" href="#" target="_blank" style="color: #fff;background: #509BE1;padding: 3px 20px;font-size: 14px;border-radius: 3px;">检测</a></h5>',
    connected: '<br/><h5 style="text-align: center;font-size: 16px;">检测组件与网页的通讯是否正常</h5><h5 style="text-align: center;font-size: 16px;"><p class="js-connect-status" style="text-align:center;"></p></h5>',
    failed: '<a onclick="changeEweiHubInstallTip(\'recheck\');return false;" href="#">返回重新检测</a><div style="text-align:center;"><h5 style="text-align: center;font-size: 16px;margin:0;padding-bottom: 3px;line-height: 20px;">为何安装不成功？</h5><p style="margin:0;line-height: 14px;">1，你并未执行安装操作</p><p style="margin:0;line-height: 14px;">2，你未以管理员权限执行安装</p><p style="margin-bottom: 6px;line-height: 14px;">3，你未设置组件的网络代理</p><a onclick="changeEweiHubInstallTip(\'redownload\');return false;" href="#" target="_blank" style="color: #fff;background: #509BE1;padding: 3px 20px;font-size: 14px;border-radius: 3px;">重新下载</a></div>'
};
var changeEweiHubInstallTip = function (e) {
    var t = $("#eweiInstallTicketTip_out");
    if (e == "connect") {
        window.open("/download.html?download=" + qiniuAppBucketDomain);
        t.html(eweiInstallHubTipHtml.connect);
        clearTimeout(reConnectCurrentWebSocket.timer);
        reConnectCurrentWebSocket(600, 3e3)
    } else if (e == "connected") {
        t.html(eweiInstallHubTipHtml.connected);
        clearTimeout(reConnectCurrentWebSocket.timer);
        reConnectCurrentWebSocket(10, 1e3, function (e) {
            t.find(".js-connect-status").html("正在检测&nbsp;" + e);
            if (e < 1) {
                changeEweiHubInstallTip("failed")
            }
        })
    } else if (e == "failed") {
        t.html(eweiInstallHubTipHtml.failed)
    } else if (e == "redownload") {
        t.html(eweiInstallHubTipHtml.nohub);
        clearTimeout(reConnectCurrentWebSocket.timer);
        reConnectCurrentWebSocket(600, 3e3)
    } else if (e == "recheck") {
        t.html(eweiInstallHubTipHtml.connect);
        clearTimeout(reConnectCurrentWebSocket.timer);
        reConnectCurrentWebSocket(600, 3e3)
    }
};
function showEweiHubInstallTip(e) {
    if ($("#eweiInstallTicketTip_out").length < 1) {
        $("body").first().append("<div id='eweiInstallTicketTip_out' class='bodyStyle' style='width:400px;height: 130px;background-color: #FDF9CF; display: none;'</div>")
    }
    var t = $("#eweiInstallTicketTip_out");
    if (e === false) {
        t.html(eweiInstallHubTipHtml.noflash)
    } else {
        t.html(eweiInstallHubTipHtml.nohub)
    }
    t.modalBox({iconImg: "/source/images/close.png", iconClose: true, keyClose: true, bodyClose: true, overlay: false})
}
angular.module("ngRap", []).provider("ngRap", [function () {
    var n = this;

    function l(e, t) {
        return e.some(function (e) {
            if (typeof e === "string" && (t.indexOf(e) >= 0 || e.indexOf(t) >= 0)) {
                return true
            } else if (typeof e === "object" && e instanceof RegExp && e.test(t)) {
                return true
            }
        })
    }

    this.enable = function (e) {
        this.enabled = true;
        this.mode = e.mode
    };
    this.$get = ["$injector", "$q", function (s, e) {
        function t() {
            var i = e.defer();
            var r = document.createElement("script");
            r.src = n.script;
            r.onload = r.onreadystatechange = function (e, t) {
                if (t || !r.readyState || /loaded|complete/.test(r.readyState)) {
                    r.onload = r.onreadystatechange = null;
                    r = undefined;
                    if (!t) {
                        i.resolve()
                    }
                }
            };
            document.body.appendChild(r);
            void 0;
            return i.promise
        }

        var i = {
            check: function (e, t) {
                var i = s.get("$http");
                i.get(e).success(function (e) {
                    RAP.checkerHandler.call({data: t}, e)
                })
            }, intercept: function (e) {
                var t = RAP.getMode();
                RAP.setBlackList([/html/g]);
                var i = (e.url.indexOf("/") === -1 ? "/" : "") + e.url;
                var r = "/rap/mockjs/" + RAP.getProjectId();
                var n = r + i;
                var a = RAP.getWhiteList();
                var o = s.get("$http");
                if (e.url.indexOf(r) == 0) {
                    return e
                }
                if (RAP.router(i)) {
                    e.mocked = true;
                    e.url = n;
                    void 0
                } else if (t == 0 && l(a, i)) {
                    e.needCheck = n
                }
                return e
            }, loaded: n.enabled && t().then(function () {
                if (window.RAP) {
                    RAP.setMode(n.mode)
                }
            })
        };
        return i
    }]
}]).factory("rapMockInterceptor", ["$q", "ngRap", function (e, i) {
    return {
        request: function (e) {
            if (i.loaded) {
                return i.loaded.then(function () {
                    RAP.setWhiteList([/ticket_timeaxis_list\/\d+/, "ticket_timeaxis_list/{ticket_id}.json"]);
                    return i.intercept(e)
                })
            } else {
                return e
            }
        }, response: function (e) {
            var t = e.data;
            if (i.loaded && !e.config.mocked) {
                i.loaded.then(function () {
                    if (e.config.needCheck) {
                        i.check(e.config.needCheck, t)
                    }
                })
            }
            return e
        }
    }
}]);
this.org = this.org || {};
org.ewei = org.ewei || {};
(function (O, j) {
    "use strict";
    O.module("eweiApp", ["eweiApp.ui", "eweiApp.common", "eweiApp.account", "eweiApp.ticket", "eweiApp.help_center", "eweiApp.dashboard", "eweiApp.quickEntry", "eweiApp.core", "eweiApp.remoteControlWidget", "eweiApp.chat", "eweiApp.project_anagement", "eweiApp.usersguide", "eweiApp.noviceGuide", "eweiApp.chart", "eweiApp.system_setting", "eweiApp.polymerize_search", "eweiApp.statistics", "eweiApp.statistics-menggang", "eweiApp.license", "ewei.cometd", "ui.ewei.tabs", "ui.ewei.alert", "com.ewei.angular.ui", "ngScrollTo", "ui.router", "ui.bootstrap", "ngResource", "pascalprecht.translate", "ngAnimate", "hljs", "mgcrea.ngStrap", "ngClipboard", "ngTagsInput", "ngTable", "angularFileUpload", "truncate", "pasvaz.bindonce", "ui.tree", "ui.sortable", "angularSpectrumColorpicker", "toastr", "toggle-switch", "uiSwitch", "ewei.notify", "oc.lazyLoad", "eweiApp.constants", "ngRap", "ng-sortable", "ui.bootstrap.datetimepicker", "angularjs-dropdown-multiselect", "ngSanitize", "ngQueue"]).run(["$rootScope", "$state", "$stateParams", "$translate", "$http", "$templateCache", "$location", "permissions", "alertService", "attachmentService", "license", "$window", "oemSettingService", "$filter", "ConsoleConfig", "EweiConfig", "ctiService", "ctiUsbService", "ctiSipService", "coreModelService", "coreNotifyService", "remoteControlService", "$modal_", "apiListWorkflowsService", "OemConfig", "ProviderLicenseInfo", function (s, e, t, i, o, r, n, a, l, c, u, d, p, f, m, v, g, h, _, y, w, k, T, C, S, E) {
        a.setPermissions(permissionses);
        if (E && E.moduleList) {
            E.moduleList.push("chat_quality")
        }
        s.providerEweiProductName = "易维帮助台";
        s.currentUserPhoto = m.user.photo && m.user.photo.contentUrl;
        s.currentUserLoginLogNotify = m.user ? m.user.loginLogNotify : false;
        s.currentProviderIsOpenHelpcenter = m.provider.isOpenHelpcenter;
        if (O.isDefined(m.engineer.concurrentChatNumber)) {
            s.concurrentChatNumber = parseInt(m.engineer.concurrentChatNumber)
        } else {
            s.concurrentChatNumber = 6
        }
        s.eweiHelpcenterApiUrl = m.eweiHelpcenterApiUrl;
        m.engineer && (!m.engineer.isCreatedDemoTicket ? m.engineer.isCreatedDemoTicket = false : m.engineer.isCreatedDemoTicket);
        s.providerLicense = null;
        new j.OpenBasicApi(m.provider.id, o, l);
        j.sdk.providerId = m.provider.id;
        j.sdk.alertService = l;
        C.getWorkflowTemplate("list.workflows", {page: {pageNumber: 1, pageSize: 9999}}, function (e) {
        });
        b();
        P();
        y.config.license.put("license", E);
        w.doNotify(w.constant.EVENT_LICENSE);
        s.providerLicense = E;
        s.$emit("provider-license-changed", s.providerLicense);
        s.vertionLicense = u.type();
        if (s.vertionLicense === "trial") {
            s.vertionNumber = 1
        } else if (s.vertionLicense === "free") {
            s.vertionNumber = 2
        } else if (s.vertionLicense === "public") {
            s.vertionNumber = 3
        } else if (s.vertionLicense === "blend") {
            s.vertionNumber = 4
        }
        var A = E && E.type || "";
        s.hasBatchTicketCreateModule = A === "enterprise_basic" || A === "enterprise_trial" || A === "enterprise_basic_19";
        function b() {
            var e = E;
            if (e.moduleList && e.moduleList.length > 0) {
                var t = e.moduleList.indexOf("sla_standard");
                if (t > -1) {
                    e.moduleList[t] = "sla"
                }
                t = e.moduleList.indexOf("automation_standard");
                if (t > -1) {
                    e.moduleList[t] = "automation"
                }
            }
            switch (e.type) {
                case"enterprise_basic_19":
                    if (e.yearAddDataCapacity > 0) {
                        var i = (e.yearAddDataCapacity - parseInt(e.allSizeEnterpriseBasic19) / 1024 / 1024 / 1024).toFixed(2);
                        e.remainingCapacity = i < 0 ? 0 : i
                    } else {
                        e.remainingCapacity = 99999
                    }
                    e.attachmentSize = parseInt(e.allSizeEnterpriseBasic19);
                    break;
                default:
                    if (e.useDataCapacity > 0) {
                        var i = (e.useDataCapacity - parseInt(e.allSize) / 1024 / 1024 / 1024).toFixed(2);
                        e.remainingCapacity = i < 0 ? 0 : i
                    } else {
                        e.remainingCapacity = 99999
                    }
                    e.attachmentSize = parseInt(e.allSize)
            }
        }

        function P() {
            var e = 0, t = 0;
            switch (E.type) {
                case"enterprise_basic_19":
                    e = E.yearAddDataCapacity;
                    t = E.allSizeEnterpriseBasic19;
                    break;
                default:
                    e = E.useDataCapacity;
                    t = E.allSize
            }
            var i = t / (e * 1024 * 1024 * 1024);
            var r = m.engineer.role.nameKey;
            var n = m.engineer.id;
            var a = Number(localStorage.getItem("capacityMark"));
            var o = null;
            s.capacityPercent = parseInt(i * 100);
            if (r === "ROLE_NAME_ADMIN" || r === "ROLE_NAME_CREATOR") {
                if (i >= .9 && (!a || a && a !== n)) {
                    o = T({
                        title: "温馨提醒",
                        template: "source/views/capacity-modal.html",
                        html: true,
                        show: true,
                        placement: "center",
                        backdrop: "static",
                        keyboard: false,
                        alwaysShow: true
                    })
                } else if (i < .9) {
                    localStorage.removeItem("capacityMark")
                }
            }
            s.saveCapacityMark = function () {
                try {
                    localStorage.setItem("capacityMark", n)
                } catch (e) {
                    void 0
                }
                o.$promise.then(o.hide)
            }
        }

        o({url: "/custom_field.json?scope=ticket&active=true", method: "GET"}).success(function (e, t, i, r) {
            if (O.isArray(e.json)) {
                if (!localStorage) {
                    return
                }
                var n = e.json;
                var a = [];
                for (var o = 0, s = n.length; o < s; o++) {
                    var l = n[o];
                    if (l.systemFieldKey == "priority") {
                        localStorage["systemFieldPriority"] = O.toJson(l)
                    } else if (l.systemFieldKey == "service_catalog") {
                        localStorage["systemFieldServiceCatalog"] = O.toJson(l)
                    } else if (l.systemFieldKey == "subject") {
                        localStorage["systemFieldSubject"] = O.toJson(l)
                    } else if (l.systemFieldKey == "ticket_description") {
                        localStorage["systemFieldTicketdescription"] = O.toJson(l)
                    } else if (l.systemFieldKey == "ticket_type") {
                        var c = O.copy(l);
                        c.customFieldOptions = O.fromJson(c.customFieldOptions);
                        localStorage["systemFieldTicketType"] = O.toJson(c)
                    } else if (l.systemFieldKey == "tags") {
                        localStorage["systemFieldTags"] = O.toJson(l)
                    } else {
                        a.push(l)
                    }
                }
                localStorage["systemFieldPlanSolvedAt"] = O.toJson({
                    scan_able: 1,
                    edit_able: 1,
                    type: "date_time",
                    defaultLength: 180,
                    title: "要求完成时间",
                    active: true,
                    required: false,
                    defaultValue: "",
                    notes: "要求完成时间",
                    systemFieldKey: "plan_solved_at"
                });
                localStorage["ticketCustomFields"] = O.toJson(a)
            }
        });
        if (!s.currentUserPhoto && S && S.open && S.photo && S.photo.contentUrl) {
            s.currentUserPhoto = S.photo.contentUrl
        }
        s.oemConfig = S;
        p.settingOemConfig(s.oemConfig);
        s.$state = e;
        s.$stateParams = t;
        r.put("ng-table/custom-pager.html", '<span class="padding10px">   共{{params.total()}}条记录，page{{params.page()}} of {{params.total()/params.count() | ceil}} ' + '<div class="btn-group" ng-repeat="page in pages"' + "ng-class=\"{'disabled': !page.active, 'previous': page.type == 'prev', 'next': page.type == 'next'}\"" + "ng-if=\"page.type == 'prev' || page.type == 'next'\" ng-switch=\"page.type\">" + '<button type="button" class="btn btn-default btn-xs" ng-switch-when="prev" ng-click="params.page(page.number)"><i class="fa fa-caret-left"></i></button>' + '<button type="button" class="btn btn-default btn-xs" ng-switch-when="next" ng-click="params.page(page.number)"><i class="fa fa-caret-right"></i></button>' + "</div>" + "</span>");
        r.put("modal/modal.tpl.w900.html", '<div class="modal" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content" style="width:900px;margin:auto"><div class="modal-header" ng-show="title"><button type="button" class="close" ng-click="$hide()">&times;</button><h4 class="modal-title" ng-bind="title" style="text-align:center;"></h4></div><div class="modal-body" ng-bind="content"></div></div></div></div>');
        r.put("modal/modal.tpl.w670.html", '<div class="modal" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content" style="width:670px;margin:auto"><div class="modal-header" ng-show="title"><button type="button" class="close" ng-click="$hide()">&times;</button><h4 class="modal-title" ng-bind="title" style="text-align:center;"></h4></div><div class="modal-body" ng-bind="content"></div></div></div></div>');
        r.put("modal/modal.tpl.w620.html", '<div class="modal" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content" style="width:620px;margin:auto"><div  style=" min-height: 16.43px;padding: 15px"><button type="button" class="close" ng-click="$hide()">&times;</button></div><div class="modal-body" ng-bind="content"></div></div></div></div>');
        r.put("modal/modal.tpl.w380.html", '<div class="modal" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content" style="width:380px;margin:auto"><div class="modal-header" ng-show="title"><button type="button" class="close" ng-click="$hide()">&times;</button><h4 class="modal-title" ng-bind="title" style="text-align:center;"></h4></div><div class="modal-body" ng-bind="content"></div></div></div></div>');
        r.put("modal/modal.tpl.w200.html", '<div class="modal" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content" style="width:200px;margin:auto"><div class="modal-header" ng-show="title"><button type="button" class="close" ng-click="$hide()">&times;</button><h4 class="modal-title" ng-bind="title" style="text-align:center;"></h4></div><div class="modal-body" ng-bind="content"></div></div></div></div>');
        r.put("modal/modal.tpl.w500.html", '<div class="modal" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content" style="width:500px;margin:auto"><div class="modal-header" ng-show="title"><button type="button" class="close" ng-click="$hide()">&times;</button><h4 class="modal-title" ng-bind="title"></h4></div><div class="modal-body" style="padding-top:0px;" ng-bind="content"></div></div></div></div>');
        r.put("modal/modal.tpl.w400.html", '<div class="modal" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content" style="width:400px;margin:auto"><div class="modal-header" ng-show="title"><button type="button" class="close" ng-click="$hide()">&times;</button><h4 class="modal-title" ng-bind="title"></h4></div><div class="modal-body" style="padding-top:0px;" ng-bind="content"></div></div></div></div>');
        r.put("modal/modal.tpl.notitle.w445.html", '<div class="modal" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content" style="width:445px;margin:auto;border-radius:5px;"><div class="" style="heigth:5px;"><button type="button" style="color:#FF0000;fontSize:5px;" class="close" ng-click="$hide()">&times;</button></div><div ng-bind="content"></div></div></div></div>');
        r.put("modal/modal.tpl.confirm.html", '<div class="modal" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content" style="width:300px;margin:auto"><div class="modal-body" ng-bind="content"></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="$hide()">取消</button> <button type="button" class="btn btn-primary" ng-click="$ok()">确认</button></div></div></div></div>');
        r.put("modal/modal.tpl.notitle.noclose.w445.html", '<div class="modal" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content" style="width:445px;margin:auto;border-radius:5px;"><div ng-bind="content"></div></div></div></div>');
        r.put("modal/modal.tpl.w630.html", '<div class="modal" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content" style="width:700px;margin:auto;"><div class="modal-header" ng-show="title"><button type="button" class="close" ng-click="$hide()">&times;</button><h4 class="modal-title" ng-bind="title"></h4></div><div class="modal-body" ng-bind="content"></div><div class="modal-footer"><button type="button" class="btn btn-primary" ng-click="save()">保存</button></div></div></div></div>');
        r.put("modal/modal.tpl.w600.html", '<div class="modal" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content" style="width:600px;margin:auto;"><div class="modal-header" ng-show="title"><button type="button" class="close" ng-click="$hide()">&times;</button><h4 class="modal-title text-center" style="font-weight:bold;font-size:13px" ng-bind="title"></h4></div><div class="modal-body" ng-bind="content"></div></div></div></div>');
        r.put("typeahead/customTemplate.engineer.html", '<a><span ng-bind-html="match.label | uibTypeaheadHighlight:query"></span> <i class="c03" ng-if="match.model.user.email!=null" ng-bind-html="match.model.user.email | uibTypeaheadHighlight:query"></i></a>');
        s.language = "zh";
        s.$watch("language", function () {
            i.use(s.language)
        });
        s.$on("$translatePartialLoaderStructureChanged", function () {
            i.refresh()
        });
        function N(e) {
            j.logger.info(e);
            o({url: "/save_plugin_log.json", method: "POST", data: {pluginType: e}}).success(function (e, t, i, r) {
            })
        }

        var I = 0;
        var D = null;
        s.pageIsLoaded = true;
        s.isInstallApplication = false;
        function L(e) {
            var n = JSON.parse(e);
            if (n.cmd == "respondRD") {
                if (n.run) {
                    l.add("视频通话已经运行,将自动拒绝请求", "danger");
                    s.$broadcast("mypc_not_support_remote", "running");
                    return
                }
                n.user = m.user.name;
                n.username = m.user.name;
                o({
                    url: "accept_remote_desk.json",
                    method: "GET",
                    params: {
                        json: JSON.stringify(n),
                        targetUserId: n.requestClientId,
                        chatId: n.jsparam.chatId,
                        acceptUserId: n.jsparam.acceptUserId,
                        remoteFunction: "remote_desk"
                    }
                }).success(function (e, t, i, r) {
                    N(n.cmd)
                })
            } else if (n.cmd == "respondCS" || n.cmd == "respondSC") {
                var r = n.jsparam.type;
                j.logger.info("type:" + n.jsparam.type + " key:" + n.key);
                var a = {
                    contentUrl: n.key,
                    contentType: n.contentType,
                    fileName: n.key,
                    size: n.size,
                    width: n.width,
                    height: n.height
                };
                c.add(a, function (e) {
                    if (e.success) {
                        if (r == "ticket") {
                            if (s.oemConfig.open && s.oemConfig.hideCopyright) {
                                e.json.fileName = e.json.fileName.replace("易维", "")
                            }
                            var t = {
                                ticket: n.jsparam,
                                file: {
                                    id: e.json.id,
                                    fileName: e.json.fileName,
                                    contentUrl: a.contentUrl,
                                    size: a.size,
                                    contentType: a.contentType
                                }
                            };
                            s.$broadcast("uploadedTicketAttachment", t)
                        } else if (r == "chat") {
                            var i = {id: e.json.id, jsonObj: n};
                            s.$broadcast("uploadedWebchatAttachment", i)
                        }
                        N(n.cmd)
                    } else {
                        l.add("保存失败", "danger")
                    }
                })
            } else if (n.cmd == "respondD") {
                s.$broadcast("checkRemoteDeskPlugResult", n)
            } else if (n.cmd == "respondV") {
                if (n.remoteFunction == "video_call") {
                    s.$broadcast("checkVideoPlugResult", n)
                } else {
                    s.$broadcast("checkRemoteDeskPlugResult", n)
                }
            } else if (n.cmd == "respondVD") {
                if (n.run) {
                    l.add("视频通话已经运行,将自动拒绝请求", "danger");
                    s.$broadcast("mypc_not_support_remote", "running");
                    return
                }
                if (n.camera || n.microphone) {
                    n.user = m.user.name;
                    n.username = m.user.name;
                    o({
                        url: "/accept_remote_desk.json",
                        method: "GET",
                        params: {
                            json: JSON.stringify(n),
                            targetUserId: n.requestClientId,
                            chatId: n.jsparam.chatId,
                            acceptUserId: n.jsparam.acceptUserId,
                            remoteFunction: "video_call"
                        }
                    }).success(function (e, t, i, r) {
                        N(n.cmd)
                    })
                } else {
                    l.add("你的电脑没有麦克风或者摄像头,将自动拒绝请求", "danger");
                    s.$broadcast("mypc_not_support_remote", "hardware")
                }
            } else if (h.cmdRet[n.cmd]) {
                h.parseMessage(n)
            } else if (_.cmdRet[n.cmd]) {
                _.parseMessage(n)
            } else if (g.cmdRet[n.cmd]) {
                g.parseMessage(n)
            } else if (k.cmdRet[n.cmd]) {
                k.parseMessage(n)
            }
        }

        function U() {
            I = (new Date).getTime() + "";
            var e = {
                retry: true,
                id: "J" + I,
                url: n.protocol() === "https" ? "wss" + "://localhost.ewei.com:" + wssPort + "/hubserver" : "ws" + "://127.0.0.1:" + wsPort + "/hubserver",
                onMessage: function (e) {
                    j.logger.info("message：", e);
                    if (e.indexOf("Welcome") > 0) {
                        j.logger.info("websocket Welcome");
                        s.isInstallApplication = true;
                        s.plugPrometStatus = "";
                        s.$apply();
                        s.$broadcast("plugInstalled");
                        g.run(D)
                    } else if (e.indexOf("Welcome") < 0 && e.indexOf("Plug Connected") < 0 && e.indexOf("PlugRuning") < 0) {
                        var t = e.split("|");
                        var i = t[1];
                        if (i != "") {
                            L(i)
                        }
                    }
                },
                onClose: function (e) {
                    j.logger.info("websocket Onclose:Error code:" + e.code);
                    s.isInstallApplication = false
                },
                onOpen: function () {
                    j.logger.info("websocket connection open");
                    D.send("0J" + I + "|serverlist.txt")
                }
            };
            D = new j.Socket(e);
            j.socketMgr.set(D)
        }

        d.onfocus = function () {
            var e = {cmd: "requestAC"};
            var t = eweiCommon.uuid(32, 16);
            var i = "2JX" + t + "|" + JSON.stringify(e);
            try {
                D.send(i);
                j.logger.info("websocket active me socketId " + I)
            } catch (e) {
                void 0
            }
        };
        d.onbeforeunload = function () {
            if (s.cometdClientId) {
                $.ajax({
                    url: "/remove_long_connection.json?sessionId=" + s.cometdClientId,
                    async: false,
                    type: "GET",
                    dataType: "json",
                    success: function (e) {
                    }
                })
            }
        };
        s.$on("requestScreenshot", function (e, t, i) {
            if (s.isInstallApplication) {
                var r = eweiCommon.uuid(32, 16);
                var n = "";
                if (typeof t == "object") {
                    n = JSON.stringify(t)
                } else {
                    n = '{"type":"' + t + '"}'
                }
                s.$broadcast("requestEweiHubServer", "requestCS");
                var a = "2JC" + r + '|{"cmd":"requestCS","bucket":"' + v.bucket_name + '","accesskey":"' + v.access_key + '","secretkey":"' + v.secret_key + '","jsparam":' + n + "}";
                if (false == D.send(a)) {
                    s.$broadcast("installEweiHubServer", "requestScreenshot", t, i)
                }
            } else {
                s.$broadcast("installEweiHubServer", "requestScreenshot", t, i)
            }
        });
        s.$on("requestVideo", function (e, t, i) {
            if (s.isInstallApplication) {
                var r = eweiCommon.uuid(32, 16);
                var n = "";
                if (typeof t == "object") {
                    n = JSON.stringify(t)
                } else {
                    n = '{"type":"' + t + '"}'
                }
                s.$broadcast("requestEweiHubServer", "requestSC");
                var a = "2JS" + r + '|{"cmd":"requestSC","bucket":"' + v.bucket_name + '","accesskey":"' + v.access_key + '","secretkey":"' + v.secret_key + '","jsparam":' + n + "}";
                if (false == D.send(a)) {
                    s.$broadcast("installEweiHubServer", "requestVideo", t, i)
                }
            } else {
                s.$broadcast("installEweiHubServer", "requestVideo", t, i)
            }
        });
        s.$on("checkRemoteDeskPlug", function (e, t, i) {
            if (s.isInstallApplication) {
                j.logger.info("2JQ|" + t);
                var r = "2JQ|" + t;
                if (false == D.send(r)) {
                    s.$broadcast("installEweiHubServer", "checkRemoteDeskPlug", t, i)
                }
            } else {
                s.$broadcast("installEweiHubServer", "checkRemoteDeskPlug", t, i)
            }
        });
        s.$on("checkVideoPlug", function (e, t, i) {
            if (s.isInstallApplication) {
                j.logger.info("2JQ|" + t);
                var r = "2JQ|" + t;
                if (false == D.send(r)) {
                    s.$broadcast("installEweiHubServer", "checkVideoPlug", t, i)
                }
            } else {
                s.$broadcast("installEweiHubServer", "checkVideoPlug", t, i)
            }
        });
        U();
        var R = n.path();
        if (R == "" || R == "/") {
            e.go("quickentry")
        }
    }]).controller("mainTabsCtrl", ["$scope", "$state", "tabs", "utils", "$sce", function (e, t, i, r, n) {
    }]).controller("alertCtrl", ["$scope", "$state", "alertService", function (e, t, i) {
    }]).config(["$rootScopeProvider", "$stateProvider", "$urlRouterProvider", "$translateProvider", "$translatePartialLoaderProvider", "ngClipProvider", "$httpProvider", "ngRapProvider", "ConsoleConfig", "$compileProvider", function (e, t, i, r, n, a, o, s, l, c) {
        c.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|blob|chrome-extension):/);
        t.state("unauthorized", {
            url: "/unauthorized",
            templateUrl: "source/views/unauthorized.html"
        }).state("unavailable", {url: "/unavailable", templateUrl: "source/views/unavailable.html"});
        e.digestTtl(20);
        if (!o.defaults.headers.get) {
            o.defaults.headers.common = {}
        }
        o.defaults.headers.common["Cache-Control"] = "no-cache";
        o.defaults.headers.common.Pragma = "no-cache";
        o.interceptors.push(["$q", "$injector", "$timeout", "ConsoleConfig", function (r, n, t, i) {
            function a(e) {
                if (e.url.indexOf("_token") > -1) {
                    e.url = e.url.replace(/(_token=)(\w+)/, "$1" + getCookie("user_token"))
                }
                return e
            }

            var o = false, s = Date.now();
            return {
                response: function (e) {
                    if (e.data && (e.data.status == 3001 || e.data.status == 3002 || e.data.status == 3003) && e.config.url.indexOf("/api") == 0) {
                        if (!e.config.retryCount || e.config.retryCount < 5) {
                            if (!e.config.retryCount) {
                                e.config.retryCount = 1
                            } else {
                                e.config.retryCount++
                            }
                            var t = n.get("$http");
                            if (!o && Date.now() - s > 1e4) {
                                o = true;
                                var i = r.defer();
                                setCookieValue("user_token", "");
                                t({url: "check_token", method: "GET"}).finally(function () {
                                    o = false;
                                    s = Date.now();
                                    a(e.config);
                                    t(e.config).then(i.resolve, i.reject)
                                });
                                return i.promise
                            }
                        }
                    }
                    return e
                }, responseError: function (e) {
                    if (e.status === 503) {
                        location.hash = "/unavailable"
                    }
                    return r.reject(e)
                }, request: function (e) {
                    if (e.method === "GET" && e.url.indexOf(".html") !== -1) {
                        if (e.url && e.url[0] === "/") {
                            e.url = e.url.substring(1, e.url.length)
                        }
                    } else {
                        e.url = ((e.url && e.url[0]) === "/" ? "" : "/") + e.url
                    }
                    if (e.url.indexOf("/api/v1") == 0 && e.url.indexOf("_token=") === -1) {
                        if (e.url.indexOf("?") > 0) {
                            e.url += "&"
                        } else {
                            e.url += "?"
                        }
                        e.url += "provider_id=" + i.provider.id + "&_token=" + getCookie("user_token")
                    }
                    if (o && e.url.indexOf("check_token") == -1) {
                        return t(function () {
                            e = a(e);
                            return e
                        }, 1e3)
                    }
                    return e
                }
            }
        }]);
        if (l.enviroment === "dev") {
            s.script = "/rap/rap.plugin.js?projectId=3";
            s.enable({mode: 3})
        }
        a.setPath("source/lib/jquery/ZeroClipboard.swf");
        n.addPart("common");
        n.addPart("ticket");
        n.addPart("helpcenter");
        r.useLoader("$translatePartialLoader", {urlTemplate: "source/i18n/{part}/locale-{lang}.json"})
    }]).controller("installEweiHubServerController", ["$rootScope", "$scope", "$state", "alertService", "$modal_", "$http", "$location", "EweiConfig", function (n, a, e, o, t, i, r, s) {
        a.qiniuAppBucketDomain = s.app_bucket_domain;
        var l = "other";
        var c = navigator.platform == "Win32" || navigator.platform == "Windows" || navigator.platform == "Win64";
        var u = navigator.platform == "Mac68K" || navigator.platform == "MacPPC" || navigator.platform == "Macintosh" || navigator.platform == "MacIntel";
        if (u) l = "Mac";
        var d = navigator.platform == "X11" && !c && !u;
        if (d) l = "Unix";
        var p = String(navigator.platform).indexOf("Linux") > -1;
        if (p) l = "Linux";
        if (c) l = "Win";
        var f = "";
        var m = window.location.href;
        if (m.indexOf("itkeeping.com") > -1 || m.indexOf("localhost") > -1 || m.indexOf("ewei.dev") > -1) {
            f = "Test"
        } else {
            f = "Production"
        }
        var v = j.socketMgr.get();
        a.exeurl = "";
        i({
            url: "get_exe_url.json",
            method: "GET",
            params: {exeName: "EHAinst", exeEnviroment: f, exeOs: l}
        }).success(function (e, t, i, r) {
            if (e.json !== undefined) {
                a.exeurl = e.json;
                n.applicationUrl = e.json
            }
        });
        a.$on("install_hub_server_modal.hide", function (e, t) {
            a.downloading = false;
            a.downloadTip = "install_hub_server_tip";
            a.downloadButton = "statistics_download"
        });
        a.downloading = false;
        a.downloadTip = "install_hub_server_tip";
        a.downloadButton = "statistics_download";
        a.download = function () {
            a.downloading = true;
            a.downloadTip = "install_hub_server_complete_tip";
            a.downloadButton = "statistics_download_complete"
        };
        a.downloadComplete = function () {
            a.hideModal();
            a.downloading = false;
            a.downloadTip = "install_hub_server_tip";
            a.downloadButton = "statistics_download"
        };
        var g;
        a.$on("installEweiHubServer", function (e, t, i, r) {
            n.plugPrometStatus = "download";
            if (r) {
                n.plugPrometStatus = ""
            }
        });
        a.$on("applicationBeenInstalled", function () {
        });
        a.$on("requestEweiHubServer", function (e, t) {
            var i = "";
            if (t == "requestCS") {
                i = "截屏"
            } else if (t == "requestSC") {
                i = "录屏"
            } else if (t == "requestRD") {
                i = "远程桌面"
            }
            o.add("正在启动" + i + "功能插件 ")
        });
        a.$on("accept_video_call", function (e, t) {
            j.logger.info("接通视频通话, data=", t);
            var i = t["data"];
            var r = i["p2p_address"];
            var n = i["session"];
            var a = i["username"];
            var o = eweiCommon.uuid();
            var s = "2JV" + o + '|{"cmd":"respondVD","addr":"' + r + '","sess":"' + n + '","username":"' + a + '"}';
            j.logger.info("msg=", s);
            v.send(s)
        });
        a.$on("remote_desk", function (e, t) {
            if (n.isInstallApplication) {
                i({
                    url: "request_remote_desk.json",
                    method: "GET",
                    params: {requestCometdClientId: n.cometdClientId, targetCometdClientId: t}
                }).success(function (e, t, i, r) {
                    if (e.success) {
                    } else {
                        if (e.message != null) {
                            o.add($filter("translate")(e.message), "danger")
                        } else {
                            o.add("请求失败", "danger")
                        }
                    }
                })
            } else {
                n.$broadcast("installEweiHubServer", "remote_desk", t)
            }
        });
        var h = [];
        n.$on("modal.show", function (e, t) {
            if (h.indexOf(t) === -1 && !t.$options.alwaysShow) {
                h.push(t)
            }
        });
        n.$on("$stateChangeSuccess", function (e, t, i, r, n) {
            if (h.length) {
                O.forEach(h, function (e) {
                    if (e.$scope && e.$scope.$$destroyed) {
                        return
                    }
                    e.hide()
                });
                h = []
            }
        })
    }]).controller("isFirstLoginController", ["$rootScope", "$scope", "$state", "alertService", "$modal_", "$http", "$location", "$q", "apiRestfulService", "$interval", "ConsoleConfig", "locals", "ProviderLicenseInfo", function (r, n, e, a, o, s, t, l, c, u, d, p, i) {
        if (d.engineer && d.engineer.role && d.engineer.role.nameKey === "ROLE_NAME_CREATOR")return;
        f();
        function f() {
            var e = p.getObject("consoleIsfirstLogin");
            var t = (new Date).format("yyyyMMdd");
            n.neverShowEmail = e.neverShowEmail || false;
            n.neverShowPhone = e.neverShowPhone || false;
            if (e.today && e.today === t) {
                return false
            }
            if (!n.neverShowEmail && !d.user.emailExamined && d.engineer && d.engineer.role) {
                n.getCodeParm = {email: d.user.email, code: "", isdisabled: false, isok: true, value: "获取验证码"};
                n.confirmContent = "删除后，已分享的用户将不再可见此项目，是否确定删除？";
                var i = o({
                    scope: n,
                    title: "绑定邮箱",
                    template: "source/views/first_login_template_email.html",
                    html: true,
                    show: true,
                    placement: "center",
                    backdrop: "static",
                    alwaysShow: true,
                    keyboard: false
                });
                n.hideModal = function () {
                    p.setObject("consoleIsfirstLogin", {
                        today: t,
                        neverShowEmail: i.$scope.neverShowEmail,
                        neverShowPhone: i.$scope.neverShowPhone
                    });
                    i.$promise.then(i.hide)
                };
                n.$ok = function () {
                    if (!n.getCodeParm.isok) {
                        return false
                    }
                    if (!validEmail(n.getCodeParm.email)) {
                        a.add("请输入正确的邮箱地址", "danger");
                        return false
                    }
                    n.getCodeParm.isok = false;
                    if (!n.getCodeParm.code) {
                        a.add("请输入验证码", "danger");
                        return false
                    }
                    s({
                        url: "update_engineer_email.json",
                        method: "POST",
                        data: {newEmail: n.getCodeParm.email, verifyCode: n.getCodeParm.code}
                    }).success(function (e) {
                        n.getCodeParm.isok = true;
                        if (e.id == -1) {
                            a.add("验证信息错误或验证码已经失效!", "danger")
                        } else if (e.id == 0) {
                            a.add("邮箱修改失败！", "danger")
                        } else if (e.id == 1) {
                            a.add("绑定成功!", "success");
                            d.user.email = n.getCodeParm.email;
                            n.hideModal()
                        } else {
                            a.add("未知错误！", "danger")
                        }
                    })
                }
            }
            if (!n.neverShowPhone && !d.user.mobilePhoneExamined && d.engineer && d.engineer.role) {
                n.getmobileCodeParm = {
                    mobile: d.user.mobilePhone,
                    code: "",
                    isdisabled: false,
                    isok: true,
                    value: "获取验证码"
                };
                n.confirmContent = "删除后，已分享的用户将不再可见此项目，是否确定删除？";
                var i = o({
                    scope: n,
                    title: "绑定手机",
                    template: "source/views/first_login_template_mobile.html",
                    html: true,
                    show: true,
                    placement: "center",
                    backdrop: "static",
                    alwaysShow: true,
                    keyboard: false
                });
                n.hideModal = function () {
                    p.setObject("consoleIsfirstLogin", {
                        today: t,
                        neverShowEmail: i.$scope.neverShowEmail,
                        neverShowPhone: i.$scope.neverShowPhone
                    });
                    i.$promise.then(i.hide)
                };
                n.$ok = function () {
                    if (!n.getmobileCodeParm.isok) {
                        return false
                    }
                    if (!validMobilePhone(n.getmobileCodeParm.mobile)) {
                        a.add("请输入正确的手机号码", "danger");
                        return false
                    }
                    n.getmobileCodeParm.isok = false;
                    if (!n.getmobileCodeParm.code) {
                        a.add("请输入验证码", "danger");
                        return false
                    }
                    var t = O.copy(n.getmobileCodeParm.mobile);
                    c.run({
                        url: "/api/v1/engineers/binding_phone",
                        urlParam: {mobilePhone: n.getmobileCodeParm.mobile, code: n.getmobileCodeParm.code}
                    }).post(null, function (e) {
                        n.hideModal();
                        if (e.status === 0) {
                            d.user.mobilePhone = t;
                            a.add("绑定成功", "success")
                        } else {
                            a.add(e.result.error_description, "danger")
                        }
                    })
                }
            }
        }

        n.showCaptcha = function () {
            var t = l.defer();
            var i = r.$new();
            i.rnd = Date.now();
            i.verifyCodeNo = eweiCommon.uuid(32, 16).toLowerCase();
            var e = o({
                scope: i,
                title: "图形验证码",
                template: "source/views/system_setting/captcha_modal.html",
                html: true,
                show: true,
                placement: "center"
            });
            i.hideCaptchaModal = function () {
                e.$promise.then(e.hide)
            };
            i.onOk = function (e) {
                if (!e) {
                    a.add("请输入图形验证码!", "danger");
                    return
                }
                i.hideCaptchaModal();
                t.resolve({verifyCode: e, verifyCodeNo: i.verifyCodeNo})
            };
            i.refreshCaptcha = function () {
                i.rnd = Date.now()
            };
            return t.promise
        };
        n.getCode = function (e) {
            var i = e;
            n.showCaptcha().then(function (e) {
                if (i === "email") {
                    if (!validEmail(n.getCodeParm.email)) {
                        a.add("请输入正确的邮箱地址", "danger");
                        return false
                    }
                    if (n.getCodeParm.isdisabled) {
                        return false
                    }
                    var t = {newEmail: n.getCodeParm.email, verifyCode: e.verifyCode, verifyCodeNo: e.verifyCodeNo};
                    c.run({url: "/api/v1/send_binding_user_email_email.json", urlParam: null}).post(t, function (e) {
                        j.logger.info(e);
                        if (e.status === 0) {
                            var t = 60;
                            n.getCodeParm.isdisabled = true;
                            n.getCodeParm.value = t + "s重新发送";
                            var i = u(function () {
                                if (t == 0) {
                                    u.cancel(i);
                                    n.getCodeParm.isdisabled = false;
                                    n.getCodeParm.value = "获取验证码"
                                } else {
                                    t--;
                                    n.getCodeParm.value = t + "s重新发送"
                                }
                            }, 1e3)
                        } else {
                            n.getCodeParm.isdisabled = false;
                            a.add(e.result.error_description, "danger")
                        }
                    })
                } else if (i === "mobile") {
                    if (!validMobilePhone(n.getmobileCodeParm.mobile)) {
                        a.add("请输入正确的手机号码", "danger");
                        return false
                    }
                    if (n.getmobileCodeParm.isdisabled) {
                        return false
                    }
                    var t = {
                        mobilePhone: n.getmobileCodeParm.mobile,
                        verifyCode: e.verifyCode,
                        verifyCodeNo: e.verifyCodeNo
                    };
                    c.run({url: "/api/v1/send_binding_user_phone", urlParam: t}).post(null, function (e) {
                        if (e.status === 0) {
                            var t = 60;
                            n.getmobileCodeParm.isdisabled = true;
                            n.getmobileCodeParm.value = t + "s重新发送";
                            var i = 60;
                            var r = u(function () {
                                if (t == 0) {
                                    u.cancel(r);
                                    n.getmobileCodeParm.isdisabled = false;
                                    n.getmobileCodeParm.value = "获取验证码"
                                } else {
                                    t--;
                                    n.getmobileCodeParm.value = t + "s重新发送"
                                }
                            }, 1e3)
                        } else {
                            a.add(e.result.error_description, "danger")
                        }
                    })
                }
            })
        }
    }])
})(angular, org.ewei);
var wsPort = 15472;
var wssPort = 17472;
var maxWsPort = 15481;
var permissionses = [];
var _hmt = _hmt || [];
(function (c, e) {
    var t = c.injector(["ng"]);
    var u = t.get("$http");
    var d = t.get("$q");
    var p = c.module("eweiApp.constants", []);
    var f = "other";
    if (navigator.appVersion.indexOf("Win") !== -1) f = "Win";
    if (navigator.appVersion.indexOf("Mac") !== -1) f = "Mac";
    if (navigator.appVersion.indexOf("X11") !== -1) f = "Unix";
    if (navigator.appVersion.indexOf("Linux") !== -1) f = "Linux";
    var m = "Production";
    var v = "//static.ewei.com";
    var i = window.location.href;
    if (i.indexOf("itkeeping.com") > -1 || i.indexOf("pckeeping.com") > -1) {
        m = "Test";
        v = "//static.itkeeping.com"
    } else if (i.indexOf("localhost") > -1 || i.indexOf("ewei.dev") > -1 || i.indexOf("ewei.cn") > -1) {
        m = "dev";
        v = "//static.ewei.dev";
        e.Mock = true;
        var r = document.getElementsByTagName("body");
        var n = document.createElement("script");
        n.id = "mock-data-js";
        n.setAttribute("src", "/source/mock/index.js");
        r[0].appendChild(n)
    }
    c.module("eweiApp.constants").config(["$logProvider", function (e) {
        e.debugEnabled(m !== "Production")
    }]);
    // c.element(document).ready(function () {
    //     u({
    //         url: "/api2/OpenConsoleApi.consoleConfigData?_token=" + getCookie("user_token") + "&_provider_id=",
    //         method: "POST",
    //         data: {}
    //     }).success(function (e) {
    //         var n = e.result;
    //         if (!n) {
    //             window.location = "/?console_config_data_error_1";
    //             return
    //         }
    //         if (!n.provider) {
    //             window.location = "/?console_config_data_no_provider"
    //         } else if (!n.user) {
    //             window.location = "/?console_config_data_no_user"
    //         } else if (n.engineer) {
    //             n.requestContextPath = n.requestContextPath || "";
    //             window.contextpath = n.requestContextPath || "";
    //             if (!n.eweiHelpcenterApiUrl) {
    //                 n.eweiHelpcenterApiUrl = location.protocol + "//help." + n.domainRoot + "/"
    //             }
    //             if (!n.providerHelpCenterUrl) {
    //                 n.providerHelpCenterUrl = location.protocol + "//" + location.host + "/"
    //             }
    //             if (!n.qiniuCallBackUrl) {
    //                 n.qiniuCallBackUrl = location.protocol + "//" + location.host + "/qiniu_upload_callback.json"
    //             }
    //             if (n.eweiWebCometd_url) {
    //                 if (window.location.protocol === "https:") {
    //                     n.eweiWebCometd_url = "https:" + n.eweiWebCometd_url
    //                 } else {
    //                     n.eweiWebCometd_url = "http:" + n.eweiWebCometd_url
    //                 }
    //             }
    //             var t = c.extend({enviroment: m, staticRoot: v, OSName: f}, n);
    //             p.constant("ConsoleConfig", t);
    //             var i = u({
    //                 method: "GET",
    //                 url: "/permissions_list.json?roleId=" + (n.engineer.role ? n.engineer.role.id : ""),
    //                 headers: {Pragma: "no-cache", "Cache-Control": "no-cache"}
    //             });
    //             var r = u({
    //                 method: "GET",
    //                 url: "/get_exe_url.json",
    //                 params: {exeName: "EHAinst", exeEnviroment: m, exeOs: f},
    //                 headers: {Pragma: "no-cache", "Cache-Control": "no-cache"}
    //             });
    //             var a = u({
    //                 method: "GET",
    //                 url: "/config_by_encrypt.json",
    //                 headers: {Pragma: "no-cache", "Cache-Control": "no-cache"}
    //             });
    //             $("head").find("title").html("客服-" + n.provider.name);
    //             var o = u({
    //                 method: "GET",
    //                 url: "/verify_oem_config.json",
    //                 headers: {Pragma: "no-cache", "Cache-Control": "no-cache"}
    //             });
    //             var s = u({
    //                 url: "/api2/OpenProviderApi.providerLicenseCheck?_token=" + getCookie("user_token") + "&provider_id=" + t.provider.id,
    //                 method: "POST",
    //                 data: {}
    //             });
    //             var l = u({
    //                 url: "/api2/OpenHelpCenterTicketApi.findTicketEvaluateConfig?_token=" + getCookie("user_token") + "&provider_id=" + t.provider.id,
    //                 method: "POST",
    //                 data: {}
    //             });
    //             d.all([i, r, a, o, s, l]).then(function (e) {
    //                 if (e[0].status === 200 && e[1].status === 200 && e[2].status === 200 && e[3].status === 200 && e[4]) {
    //                     if (e[2].data && e[2].data.json) {
    //                         e[2].data.json.uploadDomainHttp = e[2].data.json.uploadDomainHttp || "http://up.qiniu.com"
    //                     }
    //                     e[0].data.success && (permissionses = e[0].data.json);
    //                     e[1].data.success && p.constant("EweiExeUrl", e[1].data.json);
    //                     e[2].data.success && p.constant("EweiConfig", e[2].data.json);
    //                     e[3].data.success && p.constant("OemConfig", e[3].data.json);
    //                     e[4].data.status == 0 && p.constant("ProviderLicenseInfo", e[4].data.result);
    //                     if (e[5].data.status == 0) {
    //                         var t = e[5].data.result;
    //                         t.firstQuestionOptions = JSON.parse(t.firstQuestionOptions);
    //                         t.secondQuestionOptions = JSON.parse(t.secondQuestionOptions);
    //                         p.constant("ChatEvaluateConfig", t)
    //                     }
    //                     c.bootstrap(document, ["eweiApp"]);
    //                     setInterval(function () {
    //                         org.ewei.sdk.OpenConsoleApi().consoleConfigData().then(function () {
    //                             void 0
    //                         })
    //                     }, 24 * 3600 * 1e3);
    //                     if (n && n.showWebchat) {
    //                         var i = document.getElementsByTagName("body");
    //                         var r = document.createElement("script");
    //                         window._ewei_auto_fill_webchat_in_data_ = {
    //                             email: n.user.email,
    //                             name: n.user.name ? n.user.name : n.user.nickname,
    //                             mobilePhone: n.user.mobilePhone,
    //                             externalId: n.user.externalId
    //                         };
    //                         if (m === "Production") {
    //                             r.id = "ewei-portal-script";
    //                             r.setAttribute("src", "//help.ewei.com/portal/216/ed81414e01f7022a1d7892ad5e3b781f.js")
    //                         } else {
    //                             r.id = "ewei-portal-script";
    //                             r.setAttribute("src", "//help.itkeeping.com/portal/141/de7e139008b063e3166fa23ffca36e22.js")
    //                         }
    //                         i[0].appendChild(r)
    //                     }
    //                 }
    //             })
    //         } else {
    //             window.location = "/login?login_user_type=engineer"
    //         }
    //     }).error(function (e) {
    //         console.log("---------")
    //         return;
    //         // window.location = "/?console_config_data_error_2"
    //                     window.location = "/ticket/"
    //
    //     })
    // });
    function a(e) {
        window.EweiWebFormBox && window.EweiWebFormBox.init || function (e) {
            var t = document.createElement("script");
            var i = document.createElement("link");
            i.rel = "stylesheet";
            i.type = "text/css";
            i.href = e.url + "/source/css/web_form.css";
            var r = document.body || document.getElementsByTagName("body")[0];
            t.src = e.url + "/source/scripts/eweiBox.dev.js";
            t.type = "text/javascript";
            t.onload = t.onreadystatechange = function () {
                if (window.EweiWebFormBox) {
                    window.EweiWebFormBox.init(e)
                }
            };
            r.appendChild(i);
            r.appendChild(t)
        }({
            pid: e.pid,
            eweiBoxId: e.eweiBoxId,
            url: e.url,
            data: {userName: e.user.name, userEmail: e.user.email, userNickname: e.user.nickname}
        })
    }
})(angular, org.ewei);
var EWEI_DEFAULT_IMG_BASE64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAApQAAACMCAYAAADC1TnjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2MDVDNjY3RDQwMDkxMUU1QjQ0OThDMzZBNzlCMTgwMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2MDVDNjY3RTQwMDkxMUU1QjQ0OThDMzZBNzlCMTgwMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjYwNUM2NjdCNDAwOTExRTVCNDQ5OEMzNkE3OUIxODAxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjYwNUM2NjdDNDAwOTExRTVCNDQ5OEMzNkE3OUIxODAxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+7c1v5QAAEm9JREFUeNrs3QmQHFUdx/H/mkRQAUFAQAHjhiNcKgTLAxHEDSIiiAV4gmhwF0QQCjSCiBEUCJBEEcGNFUC8jbcC6i6KB4pHPErFIGRBVIIgiIiAHI7/v++1vn37ZqZndrane+f7qfpXdnpmZ7p7urZ+ef2OvlqtJgAAAEC7+giUAAAAIFACAACAQAkAAAACJQAAAAiUAAAAAIESAAAABEoAAAAQKAEAAECgBAAAAAiUAAAAIFACAACAQAkAAAACJQAAAECgBAAAAIESQLesWH0vJ6GHLJi7AScBQC6P4RQAAABgMmZyCgBU3Ayt3bX21Nre12ytjbUer2W3Ye7R+rvWn7VWa/1G61qtX2g9wikEAAIlgN4zS2t/rSO0Xqz1xAav7dPayJcFzT2C5yxkXqH1Oa0rtR7m1AJA6+hDCSC3EvShtFbHE7SO1tqkw++9VutirQu1/sa3TR9KAPnRhxJAFdit6zO1btE6bQrCpNlC6wytP2i9S+txnHYAyIcWSgC5damF8gCtD4m7Xd2M9ZW8Qev34m5n3yfulve6Wk/277Gz1vo53usmrTdrXdOr3zctlADyog8lgLKyFsILtI5q8Jp/a31b66taV2tdn+N97c7MDlr7ah2o9UJJ363Zxr/3+eJaLOlfCQB10EIJILcCWyi31PqK1m51nrc+jtZquULr1kl+Vr+4lshjpX7L5Xe1Xql1dy9937RQAsiLPpQAysZaD39UJ0w+KK6f42yt93QgTJoxrVP8ey6RdEvkXn6ftubrAQACJYBy21Fcn8UtE89ZK+EuPkhORVOptT6erLWr1qrE89v5fdiKrwkACJQAyslC5DfFDZ4JWT9JG+Ft803eVMB+/FbreVofTDw3W1y/yk35ugCAQAmgXGwU9tdkYsvkQ1qv0zpd69EC98due9t8l4OJz7XBOjYR+gy+NgBwGOUNoAyWaj0rESYP0vpGF/fro1r/1Lo8CpB7a52ltbBJSH621jO1ttV6itaG/jm7ZW9TGt0oboqj66Qz/UEBgEAJoCfZ6Oljom3WKvimLofJzKfELe14UbTd+lvaso3fC7bZBOyH+XqRD5V5Wbj8utalWr/msgBQJUwbBCC3KZg2yFrsbO7ILaLtp2qdXbLDt1bUE6Nt1rr4DHHTDVnAPFoaryue17Va79e6qpsHzLRBAPKiDyWAbjotESZHtRaXcF/fqfXjaJuN/P6CuNbFhR0Kk2YPrSvFjSrficsEQNnRQgkgtw63UFqQXCPj18y25RJt6qDbSnoKbI7MX2it0+Lv/UvcOuTWb/IBrSf44988x+9aX1IblHSuVqF/sGmhBJAXfSgBdMuJUZg0i0ocJs3vxN36PqXJ62yU+FW+vu2Dc2qUurVo2sCdfcT1u5yTeM1jtc7R2lPrNVr/4NIBUDa0UALIrYMtlOtprfX/Zv7kA9VDJT8NFgJtdZ0nJZ67R2uZ1ke07mj177G4FXnerrV/ndfYhOsv1bqziAOlhRJAXvShBNANB0dh0pxfgTBp7Lb8h6NtNR8iny5uacg72nhfe49rtF6mNV9cv8zYPK2rpXN9NQGAQAmgsg6PHlvT54oK7f/FQfj9q9ZLxE19dE+H3t8GJtm8nJclnrPlJ78o7lY4ABAoAfSkjcT1GQx9XtyAlapY60PfDeL6QI5MwWfcr/VGcbfA475Jdv4WcykBIFAC6FU24Xe8bOGXKngcS/2x3DLFn2NdAY5LbH+b1n5cTgAIlAB60R7R40fEzbdYNdaXcW1Bn2V9Ns+NtvX57etySQEgUALoNfGa3TZymalwmrPVg74XbevXOoFTA4BACaDX7BA9/jmnJBebx/JIrQej7SeJmygdAAiUAHqCrTATL7V4E6clt5u1zou2beKDJgAQKAH0hNT8ibdzWlpig4HiGeYJlAAIlAB6xnqJbfdxWlpic11+LNq2u9Z2nBoABEoAvSDV1+9BTkvLPpHYdgCnBQCBEkAvSIVHpr1p3U9kYleBF3BaABAoAfSCBxLb1ue0tCWeQmgXTgkAAiWAXvAXcdPfhDbjtLTlV9Hj2cL63gAIlAB6wMNat0XbtuG0tOXG6PFMrS05LQC6YSanAEABdhK37vRzxM2bGJpX8n3f3wfhkZLt1z2JbXQfAECgBDCt2O3XN2m9RRr379vNB6EyLr9ofyOXiFtv3JaMfLRE+5bqj7oelx2AbuCWN4CpcIi4W7IXS/PBIhba9irpcRytNVdrZ60FJdu3xyW23culB4BACaDqNtD6rNZKra1b+L3DSngsG2otCh6f6Y+vTPsX+4G41lQLln8Qd5v+/Vp78/cewFTiljeATtlK6ypx/SXruUvrZ+JaL/8p7rb4puJWebEWtwdKdDzv1to4ePxkrVO13lmS/du2TqA36/uyUD/g9/tWrWGtC4WWTAAd1ler1TgLAHJZsbpuDrHRxd8XN3VN7CFxK7us0LpO698VOFQbef5bmTgNj03MvqPWzSXYx09rvbqN37tD6+1alzd74YK5G3DRA8iFWyAAJsuWU7yyTpi0FssdxPU//GFFwqQ5V9JzOtqqPueUoTFA3G3sdlhL68d8IH0Cly+ATuCWN4DJstuo8cAbGw29UGupVtVug1hQO7jB84dqXaB1bRf30aZa2jx4bCPkf6p1g7jb2dZYYLe7bQT9tnXew1o3n671MnFdEQCAQAmgKw7Sel20zQLkEVqfquDxWBBb0uQ1fT4oP7eLYflI/691M1gmroX4X3Vea6PUj9IakonTCtm8oFdo7aN1P5czgHbRhxJAblEfylni+hnGLWDvlfGjo6vkjVqXRNse8UEz7iJ0uLi+oVWxhdZHtA5MPPdJrdfHG+lDCaCV/40DQDtekwiTV/lAWUXWeve+xPaLEiHT2HQ8j6/Q8a3VeoXW6YnnrJX51VzSAAiUAIr21uixjeY+VqrXZzJjI5+fEm27U+s94qbdiZc6tD6KJ1XsGO27sfk0z0o8d74wSAcAgRJAgfq1nh1t+7iUYzqddtgcmicntmdBMguWsXeIu5VcNdZKeUW07alag1zaAAiUAIqyf2LbigofT+r2tU3AHt7qtlvfv4les57/3ap51IfHeP10a3Xu4/IGQKAEUITnR49tsuzrKnos1tIaD0ixW8PHyfh5M21wzvGJ33+D1q4VPO7bxK21HrKW5+dxeQMgUAIowg7R4x9KNftOWmvcMpnYKnd5nYD8Ha0vJv6OLq3o97g8sW2AyxsAgRJAEbaOHt9Y0eM4RGuPaJvNjdRovW7ra/lgtG1vcSOoq2aNuKmfQs/l8gZAoARQhPWjx3dX8BjW0Vqc2H621u0Nfs8GHp2X2G7LNc6q4Hn4afR4Lpc3AAIlAOTzNnFLD4aspXVZjt+19bxvjbbZnJxvreB5GIseb8ylAYBACaAI8ejgjSq2/5tqvSux/UQZv4RhLaqMLVOYmmbo9AoGsoejxyyPA4BACaAQf4web1ex/T8zEZyukIlzMzayUtwgndCGkp6vssxmNfnPAgAQKAFMieujx1UayLGz1lHRNmuVPLGN97JphB6Jth0j1eqHGN/2v4vLGwCBEkARro0eb671nIrs+xKtGdE26zfZzkh1m+j8omjbTEkP2imreMWj1VzeAAiUAIowkti2oAL7/VKtfaNtf5bJrXZjt7jjVr0DpBrzOdpE5jtF237C5Q2AQAmgCL+XidPN2IoxTyvxPlvL4ZLEdluP+75JvK+t9f3uxHab7HxGyb9Hu/UfT+r+LS5vAARKAEWJb/U+VuvCEu/vkKRX+Pl0B97bVpz5ZbRtFyl3q611Uzg22naLPycAQKAEUIhPysQ5DO1W7/El3Fcbfb0o2mbrdNtclJ1YMvJRf9zxe50h5ZyGx1olhxP7dqFUcwlNAARKABVl8xeelNhut3pfVbJ9PU1rk2jbJVo/6+BnfF8mtnZupnVKCb87C9cHRttu9yETAAiUAAr1ZXHzMYZm+GBlE4f3lWAft5GJK9hYv8dTp+CzUv0xT9CaXaLvzNYpT/X5PFkm15cUAIESANr2Zq1fR9ssSL7PB86tu7x/tl73OtE2G5l95xR8VmrE+Lrilmrsts18+D87EfQ/I64LAwC0pa9Wo7sMgHxWrL633lNbihvMsVXiOZs0/DL7dXG3mIv8o7OX1jXRNps7cleZOCF5Si0RlJtZxwfsbaP3eYF0Z8DLHHGjud8i6f6cNphoT0m0Ti6YyyqMAAiUAIoLlMamDPqm1vYNXvMXcfMc3iRuiT/7A/TAFO7y68WtjBPaRyYumdhpL9f6arTtV9KZEeV52NrqT9XaTWvHBq9bpbWf1l9TTxIoARAoARQdKI2Npr5U6xUlPQS75XtYQZ9l4XrfEn+d1h3hCGmwdjeBEkBe9KEE0Ek22OVgrddq3Vayfbtf3MCTotiURA+X8DuyVX0W+O/pH1yyAAiUAMrKbu1a3z0bXV2WtaFtlZxbW/ydWlStsOO+oETfiQV8G4xkfTsv4RIF0Enc8gaQW45b3vXME7e29fO15opbpaXI+6kWJG2VnPvbCJTj/ma2+Pt2jDf44y2SDYS623+2DYSytdevFjcBe27c8gaQ10xOAYACrPJVhMu1Do+2ndxGmOwES+A27+Nl0XZrIVzAZQFguuCWN4DpZHdxI7tDNqJ7ZRf3yQLuddG2I7WexdcFgEAJAOWzTMbflra5JieztnhfVO2w2+bHiVs7PPzbu5SvCwCBEgDK5RBxk4eHLhI3kXm3WT/GS6NtL9I6iK8NwHTAoBwAuU1iUM5Us9VprtfqD7bZ0orbiZvKqAxsYI4NkglHutyotZOUc3ohBuUAyI1BOQCmg+OjMGluFjcgpkxsn54ZPLYpfI7V+gBfIYAqo4USQG4lbaHcVNxSjlVtTvubD5Z3lW3HaKEEkBd9KAFU3RkVDpPG1t0+na8RAIESALrD+h8eNQ2O4xit7fk6ARAoAaB4tpzidOgLPkvrPL5OAFXFoBwAVbYfpwAAuo8WSgAAAEwKo7wBAABAoAQAAACBEgAAAARKAAAAECgBAAAAAiUAAAAIlAAAACBQAgAAgEAJAAAAECgBAABAoATQwxYtWjSg/4xojenPc6Ln4pcPaw1qLdcamsLdqvc52b6a+VqjTY6NLxgAgRIApjhMNvoDNeSDXSgLeANRmBtMvDbX38jocc0HxUODQLnSv/ec4HPG/ON61mj123vpMY42Oc7/Ha++bjlXBYAymskpAFBiFt6sxc9C1/xE4ByuE/xGE0EzFcZqQThtFtaGg39Ho+39Pkwe6reNtXGsE1pgg2Mc5FIAQKAEgPZkAW2lBqtxrXp1gmEcRkfzhrkcrxnyn58y6gPpQv94INqnPIEVACrrMZwCACWWBbjh4OeRxC3iviCwLfePm4XJgRb3ZcT/jlXWYjjo92sg+HnUf/78KGyGQTM8lmG+ZgBVRwslgNIKb3M3aKEcK2h35kfBMguvQ0HoDUNwqjUzC5txH8r/htGcfSkBgEAJAC0EylTAGvGjo5fnDJR5BuSMNHgu7J85LONbNgd99Un9fo55A+//+lAG/SaX689DXAkAyo5b3gDKHCj7sgqC2Xz/OG9gy26BxzXa5Pm+RJgclPG3sDNh8M1ugc/zj1fxTQKY7pg2CEBVwuWEW97+VvGYD3mtzkFZCwJp1vdxfpPXZ4Nrws/Kpg3K3mvAv26hf9++xHtlx5IF2sGc56CPKwEAgRIAOhsy2/3VLBCOBSGwWaDMZH0o4+Cavd9IEFLj+Sjj2+9hv0xueQOoLPpQAih7aGx1UvJmwTAcpT0q9acCiq2JXjsYvE8cHLPXLY7eI5sPc03ic8f4tgEQKAFgajVbejHvBODhAJwhaTwgJ2Sfnd3Syea4DPtVhqFxMPi5mf7g+OJbRoM+UP/3MxPzbwIAgRIAWtCJaXXiycbrydbkDickH45C6VAQHONb32HIbXbLOpu8fVUqOOvP4TRFAFBKjPIGUBVj4ahvP0AlrEatgYNRmFze5PX9iRA5JONHhw8nwmQteP/sc5uFwX4fHFlJB0Bl0UIJoCrabaEcSATDMLyt9K8J+zRmU/40WuIxnNA8fP9R/9yq4Lk5DcJkf/Q5THAOgEAJAFOk3T6U2eo0FtJS63tbuDxUJq6/LTJ+cE+tTiDNfl4ThMls+zz5/+Cd5fL/W+nZfmXBdXG94+SWN4AqYNogAAAAECgBAABAoAQAAACBEgAAAARKAAAAgEAJAAAAAiUAAAAIlAAAACBQAgAAAARKAAAAECgBAABAoAQAAACBEgAAACBQAgAAgEAJAAAAAiUAAACmj/8IMACbvh657lDQuQAAAABJRU5ErkJggg==";
(function () {
    "use strict";
    angular.module("eweiApp.ui").constant("DefaultColumnWidth", Object.freeze({
        ticketDefault: 180,
        ticketFields: Object.freeze({
            id: 130,
            status: 180,
            subject: 400,
            "ticketType.name": 180,
            priority: 130,
            "serviceCatalog.name": 200,
            "serviceCatalog.id": 200,
            subscription: 30,
            no: 130,
            "user.name": 180,
            "engineer.user.name": 180,
            "requester.userGroup.name": 200,
            "reviewUser.name": 180,
            copyTo: 180,
            updatedAt: 180,
            "deleter.user.name": 180,
            deleteReason: 180,
            "evaluate.solved": 130,
            "evaluate.score": 130,
            "evaluate.suggestion": 200,
            "ticketMetric.pausedAt": 180,
            deletedAt: 180,
            tags: 180,
            "ticketMetric.responseAt": 180,
            "ticketMetric.responseMinutes": 130,
            "ticketMetric.planSolvedAt": 180,
            "ticketMetric.solvedAt": 180,
            "ticketMetric.solveMinutes": 130,
            createdAt: 180,
            "requester.name": 180,
            "serviceDesk.name": 180,
            "via.channelName": 180,
            "via.source": 200,
            solutionId: 400,
            "evaluate.loyalty": 130,
            "evaluate.recommend": 130,
            "ticketMetric.slaResponseTarget": 130,
            "ticketMetric.slaSolveTarget": 130
        }),
        userDefault: 180,
        userFields: Object.freeze({
            externalId: 180,
            updatedAt: 180,
            signature: 180,
            notes: 180,
            id: 130,
            name: 180,
            email: 200,
            contactEmail: 200,
            nickname: 180,
            phone: 180,
            mobilePhone: 180,
            contactMobilePhone: 180,
            createdAt: 180,
            lastLoginAt: 180
        }),
        userGroupDefault: 180,
        userGroupFields: Object.freeze({
            domainNames: 180,
            notes: 180,
            name: 200,
            shared: 180,
            createdAt: 180,
            updatedAt: 180,
            serviceDeskName: 180
        }),
        engineerDefault: 180,
        engineerFields: Object.freeze({
            "defaultServiceDesk.name": 200,
            "user.name": 180,
            "role.name": 180,
            "user.email": 200,
            "user.mobilePhone": 180,
            "user.lastLoginAt": 180,
            "user.status": 166,
            "user.tags": 180,
            serviceDesks: 180,
            client: 130
        }),
        serviceDeskDefault: 180,
        serviceDeskFields: Object.freeze({id: 180, name: 390, engineerCount: 350, operation: 196}),
        chatDefault: 180,
        "chat.waitingFields": Object.freeze({
            createdAt: 135,
            w_firstMessage: 300,
            "user.name": 135,
            "serviceDesk.name": 135,
            "via.channelName": 135,
            fromIp: 135,
            location: 135,
            "serviceCatalog.name": 176
        }),
        "chat.queueFields": Object.freeze({
            id: 175,
            c_firstMessage: 392,
            "user.name": 175,
            "engineer.user.name": 175,
            responseAt: 175,
            "serviceDesk.name": 194
        }),
        "chat.endFields": Object.freeze({
            id: 80,
            firstMessage: 384,
            "via.channelName": 168,
            "user.name": 168,
            "user.userGroup.name": 168,
            participants: 168,
            "serviceDesk.name": 168,
            serviceCatalogNames: 200,
            "chatEvaluation.solved": 80,
            "chatEvaluation.score": 80,
            waitTime: 80,
            chatTime: 150,
            createdAt: 150,
            closedAt: 150,
            autoClose: 80,
            isChatQuality: 80,
            "chatQuality.totalScore": 80,
            "chatQuality.user.name": 168
        }),
        articleFields: Object.freeze({
            title: 400,
            commentCount: 130,
            subscriptionCount: 130,
            shareCount: 130,
            "author.name": 180,
            createdAt: 180,
            recommendIndex: 130
        }),
        questionFields: Object.freeze({
            title: 400,
            answerCount: 130,
            subscriptionCount: 130,
            shareCount: 130,
            "author.name": 180,
            createdAt: 180,
            recommendIndex: 130
        }),
        communityFields: Object.freeze({createdAt: 300, "user.name": 300, "question.title": 686}),
        ticketPlanFields: Object.freeze({
            subject: 360,
            participations: 200,
            schedule: 200,
            "user.name": 160,
            createdAt: 160,
            operations: 200
        })
    }))
})();
angular.module("eweiApp.project_anagement", []).config(["$stateProvider", "$urlRouterProvider", function (e, t) {
    e.state("project_management", {
        url: "/project_management",
        templateUrl: "source/project_management/template/project_management.html",
        controller: "manageMentSortCtrl",
        controllerAs: "vm",
        resolve: {
            loadMyFiels: ["$ocLazyLoad", function (e) {
                return e.load("/source/project_management/controllers/manageMentSort.js")
            }]
        }
    }).state("project_detail", {
        url: "/project_detail/:categoryid/:id",
        templateUrl: "source/project_management/template/project_detail.html",
        controller: "projectDetailCtrl",
        controllerAs: "vm",
        resolve: {
            loadMyFiels: ["$ocLazyLoad", function (e) {
                return e.load("/source/project_management/controllers/projectDetailCtrl.js")
            }], onEnter: ["coreModelService", "$state", function (e, t) {
                e.config.route.put("projectDetail.from", t.current.name)
            }]
        }
    }).state("universal_list", {
        url: "/universal_list",
        templateUrl: "source/project_management/template/universal_list.html",
        controller: "universalListCtrl",
        controllerAs: "vm"
    }).state("universal_list.favorites_list", {
        url: "/favorites_list",
        templateUrl: "source/project_management/template/favorites_list.html",
        controller: "favoritesListCtrl",
        controllerAs: "vm",
        resolve: {
            rememberLastView: ["$q", "coreModelService", "$state", "$timeout", function (e, t, i, r) {
                var n = t.config.route.get("project_list.selected");
                var a = e.defer();
                if (n && n.id && n.id !== "favorites_list") {
                    var o = t.list.projectClassifyList.gets(1);
                    if (o.length > 0 && o.indexOf(n.id) > -1) {
                        a.reject();
                        r(function () {
                            i.go("universal_list.project_category_list", {catId: n.id, searchKey: n.searchKey})
                        })
                    } else {
                        a.resolve()
                    }
                } else {
                    a.resolve()
                }
                return a.promise
            }], clearNewFavoriteCount: ["rememberLastView", "coreNotifyService", function (e, t) {
                t.doNotify(t.constant.EVENT_NEW_FAVORITE_CLEARED)
            }]
        }
    }).state("universal_list.project_category_list", {
        url: "/category_list/:catId",
        templateUrl: "source/project_management/template/project_category_list.html",
        controller: "projectCategoryListCtrl",
        controllerAs: "vm",
        params: {searchKey: null}
    })
}]);
(function (w) {
    "use strict";
    w.module("eweiApp.ticket").service("ticketReplyButtonStatusService", e);
    e.$inject = ["ConsoleConfig", "permissions"];
    function e(r, e) {
        var n;
        var a;
        var t;
        var i;
        var o;
        var s;
        var l;
        var c;
        var u;
        var d;
        var p;
        var f;
        var m;
        this.run = function (t, i) {
            p = {
                showReplyAsSolution: false,
                showRobTicket: false,
                showOnlyReply: false,
                showReply: false,
                showRobPendingTicket: false,
                showRobSlovedTicket: false,
                showGetTicket: false,
                showGetPendingTicket: false,
                showGetSlovedTicket: false,
                showSlovedTicket: false,
                showPendingTicket: false,
                showNextPoint: false,
                showBackPrevious: false,
                showCancelPendingTicket: false
            };
            n = t.status;
            u = e.hasPermission("ticket_reply_pending");
            c = e.hasPermission("ticket_reply_solved");
            d = e.hasPermission("ticket_force_handle");
            a = t.activitiWorkflowTemplateId ? true : false;
            if (t.activitiWorkflowTemplateId) {
                if (f != t.activitiWorkflowNodeUid) {
                    f = w.copy(t.activitiWorkflowNodeUid);
                    org.ewei.sdk.OpenTicketApi().ticketWorkFlowNodePosition({ticketId: t.id}).then({
                        success: function (e) {
                            m = e;
                            o = e == "start";
                            s = e == "end";
                            l = e == "none";
                            v[n](t);
                            i(p)
                        }
                    })
                } else {
                    o = m == "start";
                    s = m == "end";
                    l = m == "none";
                    v[n](t);
                    i(p)
                }
            } else {
                o = false;
                s = false;
                l = false;
                v[n](t);
                i(p)
            }
        };
        var v = {
            new: function (e) {
                i = h(e);
                if (i) {
                    if (a && !s) {
                        p.showOnlyReply = true;
                        if (u) {
                            p.showRobPendingTicket = true
                        }
                    } else {
                        if (u) {
                            p.showRobPendingTicket = true
                        }
                        if (c) {
                            p.showRobSlovedTicket = true
                        }
                        p.showOnlyReply = true
                    }
                    p.showRobTicket = true
                } else {
                    p.showReply = true
                }
            }, assigned: function (e) {
                t = g(e);
                if (t) {
                    if (a && !s) {
                        if (u) {
                            p.showGetPendingTicket = true
                        }
                        p.showOnlyReply = true
                    } else {
                        if (u) {
                            p.showGetPendingTicket = true
                        }
                        if (c) {
                            p.showGetSlovedTicket = true
                        }
                        p.showOnlyReply = true
                    }
                    p.showGetTicket = true
                } else {
                    p.showReply = true
                }
            }, open: function (e) {
                t = g(e);
                if (t || d) {
                    if (a) {
                        if (o) {
                            if (u) {
                                p.showPendingTicket = true
                            }
                            p.showNextPoint = true
                        } else if (s) {
                            p.showBackPrevious = true;
                            if (u) {
                                p.showPendingTicket = true
                            }
                            if (c) {
                                p.showSlovedTicket = true
                            }
                        } else if (l) {
                            p.showBackPrevious = false;
                            p.showNextPoint = false;
                            if (u) {
                                p.showPendingTicket = true
                            }
                            if (c) {
                                p.showSlovedTicket = true
                            }
                        } else {
                            if (u) {
                                p.showPendingTicket = true
                            }
                            p.showBackPrevious = true;
                            p.showNextPoint = true
                        }
                    } else {
                        if (u) {
                            p.showPendingTicket = true
                        }
                        if (c) {
                            p.showSlovedTicket = true
                        }
                    }
                    p.showReply = true;
                    p.showReplyAsSolution = true
                } else {
                    p.showReply = true;
                    p.showReplyAsSolution = true
                }
            }, pending: function (e) {
                t = g(e);
                if (t || d) {
                    if (a) {
                        if (o) {
                            p.showOnlyReply = true;
                            p.showNextPoint = true
                        } else if (s) {
                            p.showBackPrevious = true;
                            p.showOnlyReply = true;
                            if (c) {
                                p.showSlovedTicket = true
                            }
                        } else if (l) {
                            p.showBackPrevious = false;
                            p.showNextPoint = false;
                            if (u) {
                                p.showPendingTicket = true
                            }
                            if (c) {
                                p.showSlovedTicket = true
                            }
                        } else {
                            p.showOnlyReply = true;
                            p.showBackPrevious = true;
                            p.showNextPoint = true
                        }
                    } else {
                        if (c) {
                            p.showSlovedTicket = true
                        }
                        p.showOnlyReply = true
                    }
                    p.showCancelPendingTicket = true
                } else {
                    p.showReply = true
                }
            }
        };

        function g(e) {
            if (e.engineer) {
                if (e.engineer.id === r.engineer.id) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        }

        function h(e) {
            if (e.engineer) {
                if (e.engineer.id === r.engineer.id) {
                    return true
                } else {
                    return false
                }
            } else {
                var t;
                for (var i = 0; i < r.serviceDeskIds.length; i++) {
                    t = r.serviceDeskIds[i];
                    if (e.serviceDesk) {
                        if (t === e.serviceDesk.id) {
                            return true
                        }
                    }
                }
                return false
            }
        }

        function _() {
            if (workflows && workflows.length > 0) {
                if (workflows.length === 1) {
                    return false
                }
                if (!workflows[0].completed) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        }

        function y() {
            if (workflows && workflows.length > 0) {
                if (workflows.length === 1) {
                    return true
                }
                if (!workflows[workflows.length - 1] && workflows[workflows.length - 2]) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        }
    }
})(angular);