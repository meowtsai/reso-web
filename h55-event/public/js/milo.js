var milo = {
    isEnglish: function (str) {
        return /^[A-Za-z]+$/.test(str);
    },
    isNumber: function (str) {
        return /^\d+$/.test(str);
    },
    isEnNum: function (str) {
        return /^[A-Za-z0-9]+$/.test(str);
    },
    isEnNumSpace: function (str) {
        return /^[A-Za-z0-9][A-Za-z0-9\s]*[A-Za-z0-9]$/.test(str);
    },
    isBankFormat: function (str) {
        return /^[0-9A-Za-z\,\-\.\:\s\(\)]+$/.test(str)
    },
    isPassword: function (str) {
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/.test(str)
    },
    isPhonecode: function (str) {
        return /^\+[0-9]{1,4}$/.test(str);
    },
    isMail: function (str) {
        return /^(?:[\w-]+\.?)*[\w-]+@(?:[\w-]+\.)+[\w]{2,3}$/.test(str);
    },
    isDate: function (str) {
        return /^(\d{4})(-)(\d{2})(-)(\d{2})$/.test(str);
    },
    isArray: function (obj) {
        return obj instanceof Array
    },
    UrlPage: function () {
        var url = window.location.href; //获取完整URL地址
        var tmp = ''; //临时变量，用于保存分割字符串
        tmp = url.split("/"); //按照"/"分割
        var cc = tmp[tmp.length - 1]; //获取最后一部分，即文件名和参数
        tmp = cc.split("?"); //把参数和文件名分割开
        return tmp[0].split(".")[0] == "" ? 'index' : tmp[0].split(".")[0]; //返回值
    },
    UrlParam: function (pa) {
        var url = window.location.href.replace(/#+.*$/, ''),
            params = url.substring(url.indexOf("?") + 1, url.length).split("&"),
            param = {};
        for (var i = 0; i < params.length; i++) {
            var pos = params[i].indexOf('='),//查找name=value  
                key = params[i].substring(0, pos),
                val = params[i].substring(pos + 1);//提取value 
            param[key] = val;
        }
        return (typeof (param[pa]) == "undefined") ? "" : param[pa];
    },
    CheckLogin: function (success, fail) {
        var userinfor = milo.cookie.get('logindata')
        if (!userinfor) {
            if (fail) fail()
            return
        } else {
            var cookie_user = JSON.parse(userinfor)
            // 判断cookie过期时间
            var now = milo.strtotime('now'),
                loginTime = now - cookie_user.tm;
            if (loginTime < 86400) {
                userinfor_json = JSON.parse(userinfor)
                success(userinfor_json)
            } else {
                if (fail) fail()
                return
            }
        }
    },
    isPC: function () {
        var os = new Array("Android", "iPhone", "Windows Phone", "iPod", "BlackBerry", "MeeGo", "SymbianOS");  // 其他类型的移动操作系统类型，自行添加
        var info = navigator.userAgent;
        var len = os.length;
        for (var i = 0; i < len; i++) {
            if (info.indexOf(os[i]) > 0) {
                return false;
            }
        }
        return true;
    },
    Request: function (url, type, data, success, error) {
        return $.ajax({
            url: url,
            dataType: 'json',
            data: data,
            type: type,
            xhrFields: {
                withCredentials: true
            },
            // success: function (data) {
            //     success(data)
            // },
            // error: function (jqXHR, textStatus, errorThrown) {
            //     /*弹出jqXHR对象的信息*/
            //     if (error) {
            //         error(jqXHR, textStatus, errorThrown)
            //     }
            // }
        }).done(function (res) {
            success(res)
        }).fail(function (jqXHR, textStatus, errorThrown) {
            /*弹出jqXHR对象的信息*/
            if (error) {
                error(jqXHR, textStatus, errorThrown)
            }
        });
    },
    include: function (url, callback) {
        var done = true
        for (var x in url) {
            var head = document.getElementsByTagName("head")[0];
            var script = document.createElement("script");
            script.src = url[x];
            done = false;
            script.onload = script.onreadystatechange = function () {
                if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                    done = true;
                    script.onload = script.onreadystatechange = null;
                    head.removeChild(script);
                }
            };
            head.appendChild(script);
        }
        if (done && callback) callback();
    },
    htmlspecialchars_decode: function (html) {
        html = html.replace(/&amp;/gi, '&');
        html = html.replace(/&ldquo;/gi, '“');
        html = html.replace(/&rdquo;/gi, '”');
        html = html.replace(/&quot;/gi, '"');
        html = html.replace(/&#039;/gi, '\'');
        html = html.replace(/\\/gi, '');
        html = html.replace(/&lt;([\/]?(p|img|span|strong|br|h\d|div|table|source|tbody|audio|object|thead|tfoot|tr|th|td|dd|dt|dl|ul|li|ol|a|embed|iframe|b|em))/gi, "<$1");
        html = html.replace(/&gt;/gi, '>');
        html = html.replace(/< img [^>]*src=['"]?([^'" ]+)[^>]*>/gi, function (match, src) {
            return '< img src=' + src + '>';
        });
        return html;
    },
    dialog: {
        maskId: '__cimi_dialog_mask',
        curTarget: null,
        show: function (elmId) {
            var target = document.getElementById(elmId),
                that = this;

            var maskElm = document.createElement('div');
            maskElm.id = that.maskId;
            maskElm.style.cssText = 'position:fixed;top:0;left:0;background: #000;width:100%;height:100%;z-index:9998;opacity: 0.7;filter:alpha(opacity=70)';

            if (that.curTarget) {
                that.curTarget.removeAttribute('style');
                that.curTarget.style.cssText = 'display:none';
            }
            if (!document.getElementById(that.maskId)) {
                document.body.appendChild(maskElm);
            }
            target.style.cssText = 'position:fixed;display:block;left:50%;top:50%;z-index:9999';
            target.style.marginLeft = '-' + (target.offsetWidth / 2) + 'px';
            target.style.marginTop = '-' + (target.offsetHeight / 2) + 'px';
            that.curTarget = target;
        },
        close: function () {
            var maskElm = document.getElementById(this.maskId);
            if (maskElm) maskElm.parentNode.removeChild(maskElm);

            if (this.curTarget) {
                this.curTarget.style.display = 'none';
                this.curTarget = null;
            }
        }
    },
    cookie: { /**
    * 设置cookie
    * @param {string} sName cookie名
    * @param {string} sValue cookie值
    * @param {int} iExpireSec 失效时间（秒）
    * @param {string} sDomain 作用域
    * @param {string} sPath 作用路径
    * @param {bool} bSecure 是否加密
    * @return {void}
    */
        set: function (sName, sValue, iExpireSec, sDomain, sPath, bSecure) {
            if (sName == undefined) {
                return;
            }
            if (sValue == undefined) {
                sValue = "";
            }
            var oCookieArray = [sName + "=" + escape(sValue)];
            if (!isNaN(iExpireSec)) {
                var oDate = new Date();
                oDate.setTime(oDate.getTime() + iExpireSec * 1000);
                iExpireSec == 0 ? '' : oCookieArray.push("expires=" + oDate.toGMTString());
            }
            if (sDomain != undefined) {
                oCookieArray.push("domain=" + sDomain);
            }
            if (sPath != undefined) {
                oCookieArray.push("path=" + sPath);
            }
            if (bSecure) {
                oCookieArray.push("secure");
            }
            document.cookie = oCookieArray.join("; ");
        },
        /**
         * 获取cookie
         * @param {string} sName cookie名
         * @param {string} sValue 默认值
         * @return {string} cookie值
         */
        get: function (sName, sDefaultValue) {
            var sRE = "(?:; |^)" + sName + "=([^;]*);?";
            var oRE = new RegExp(sRE);

            if (oRE.test(document.cookie)) {
                return unescape(RegExp["$1"]);
            } else {
                return sDefaultValue || null;
            }
        },
        /**
         * 获取cookie
         * @param {string} sName cookie名
         * @param {string} sDomain 作用域
         * @param {sPath} sPath 作用路径
         * @return {void} 
         */
        clear: function (sName, sDomain, sPath) {
            var oDate = new Date();
            milo.cookie.set(sName, "", -oDate.getTime() / 1000, sDomain, sPath);
        }
    },
    in_array: function (value, array) {
        for (var x in array) {
            if (value == array[x]) return true;
        }
        return false;
    },
    date: function (format, timestamp) {
        var a, jsdate = ((timestamp) ? new Date(timestamp * 1000) : new Date());
        var pad = function (n, c) {
            if ((n = n + "").length < c) {
                return new Array(++c - n.length).join("0") + n;
            } else {
                return n;
            }
        };
        var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var txt_ordin = {
            1: "st",
            2: "nd",
            3: "rd",
            21: "st",
            22: "nd",
            23: "rd",
            31: "st"
        };
        var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var txt_months = ["", "Jan", "Feb", "Mar", "Apr", "May", "g", "July", "August", "September", "October", "November", "December"];
        var f = {
            d: function () {
                return pad(f.j(), 2)
            },
            D: function () {
                return f.l().substr(0, 3)
            },
            j: function () {
                return jsdate.getDate()
            },
            l: function () {
                return txt_weekdays[f.w()]
            },
            N: function () {
                return f.w() + 1
            },
            S: function () {
                return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'
            },
            w: function () {
                return jsdate.getDay()
            },
            z: function () {
                return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0
            },
            W: function () {
                var a = f.z(),
                    b = 364 + f.L() - a;
                var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
                if (b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b) {
                    return 1;
                } else {
                    if (a <= 2 && nd >= 4 && a >= (6 - nd)) {
                        nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
                        return date("W", Math.round(nd2.getTime() / 1000));
                    } else {
                        return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);
                    }
                }
            },
            F: function () {
                return txt_months[f.n()]
            },
            m: function () {
                return pad(f.n(), 2)
            },
            M: function () {
                return f.F().substr(0, 3)
            },
            n: function () {
                return jsdate.getMonth() + 1
            },
            t: function () {
                var n;
                if ((n = jsdate.getMonth() + 1) == 2) {
                    return 28 + f.L();
                } else {
                    if (n & 1 && n < 8 || !(n & 1) && n > 7) {
                        return 31;
                    } else {
                        return 30;
                    }
                }
            },
            L: function () {
                var y = f.Y();
                return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0
            },
            Y: function () {
                return jsdate.getFullYear()
            },
            y: function () {
                return (jsdate.getFullYear() + "").slice(2)
            },
            a: function () {
                return jsdate.getHours() > 11 ? "pm" : "am"
            },
            A: function () {
                return f.a().toUpperCase()
            },
            B: function () {
                var off = (jsdate.getTimezoneOffset() + 60) * 60;
                var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off;
                var beat = Math.floor(theSeconds / 86.4);
                if (beat > 1000) beat -= 1000;
                if (beat < 0) beat += 1000;
                if ((String(beat)).length == 1) beat = "00" + beat;
                if ((String(beat)).length == 2) beat = "0" + beat;
                return beat;
            },
            g: function () {
                return jsdate.getHours() % 12 || 12
            },
            G: function () {
                return jsdate.getHours()
            },
            h: function () {
                return pad(f.g(), 2)
            },
            H: function () {
                return pad(jsdate.getHours(), 2)
            },
            i: function () {
                return pad(jsdate.getMinutes(), 2)
            },
            s: function () {
                return pad(jsdate.getSeconds(), 2)
            },
            O: function () {
                var t = pad(Math.abs(jsdate.getTimezoneOffset() / 60 * 100), 4);
                if (jsdate.getTimezoneOffset() > 0) t = "-" + t;
                else t = "+" + t;
                return t;
            },
            P: function () {
                var O = f.O();
                return (O.substr(0, 3) + ":" + O.substr(3, 2))
            },
            c: function () {
                return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P()
            },
            U: function () {
                return Math.round(jsdate.getTime() / 1000)
            }
        };

        return format.replace(/[\\]?([a-zA-Z])/g, function (t, s) {
            if (t != s) {
                // escaped  
                ret = s;
            } else if (f[s]) {
                // a date function exists  
                ret = f[s]();
            } else {
                // nothing special  
                ret = s;
            }
            return ret;
        });
    },
    strtotime: function (text, now) {
        var parsed, match, today, year, date, days, ranges, len, times, regex, i, fail = false;
        if (!text) {
            return fail;
        }
        text = text.replace(/^\s+|\s+$/g, '')
            .replace(/\s{2,}/g, ' ')
            .replace(/[\t\r\n]/g, '')
            .toLowerCase();
        match = text.match(
            /^(\d{1,4})([\-\.\/\:])(\d{1,2})([\-\.\/\:])(\d{1,4})(?:\s(\d{1,2}):(\d{2})?:?(\d{2})?)?(?:\s([A-Z]+)?)?$/);
        if (match && match[2] === match[4]) {
            if (match[1] > 1901) {
                switch (match[2]) {
                    case '-':
                        { // YYYY-M-D
                            if (match[3] > 12 || match[5] > 31) {
                                return fail;
                            }

                            return new Date(match[1], parseInt(match[3], 10) - 1, match[5],
                                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                        }
                    case '.':
                        { // YYYY.M.D is not parsed by strtotime()
                            return fail;
                        }
                    case '/':
                        { // YYYY/M/D
                            if (match[3] > 12 || match[5] > 31) {
                                return fail;
                            }

                            return new Date(match[1], parseInt(match[3], 10) - 1, match[5],
                                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                        }
                }
            } else if (match[5] > 1901) {
                switch (match[2]) {
                    case '-':
                        { // D-M-YYYY
                            if (match[3] > 12 || match[1] > 31) {
                                return fail;
                            }

                            return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
                                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                        }
                    case '.':
                        { // D.M.YYYY
                            if (match[3] > 12 || match[1] > 31) {
                                return fail;
                            }

                            return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
                                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                        }
                    case '/':
                        { // M/D/YYYY
                            if (match[1] > 12 || match[3] > 31) {
                                return fail;
                            }

                            return new Date(match[5], parseInt(match[1], 10) - 1, match[3],
                                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                        }
                }
            } else {
                switch (match[2]) {
                    case '-':
                        { // YY-M-D
                            if (match[3] > 12 || match[5] > 31 || (match[1] < 70 && match[1] > 38)) {
                                return fail;
                            }

                            year = match[1] >= 0 && match[1] <= 38 ? +match[1] + 2000 : match[1];
                            return new Date(year, parseInt(match[3], 10) - 1, match[5],
                                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                        }
                    case '.':
                        { // D.M.YY or H.MM.SS
                            if (match[5] >= 70) { // D.M.YY
                                if (match[3] > 12 || match[1] > 31) {
                                    return fail;
                                }

                                return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
                                    match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                            }
                            if (match[5] < 60 && !match[6]) { // H.MM.SS
                                if (match[1] > 23 || match[3] > 59) {
                                    return fail;
                                }

                                today = new Date();
                                return new Date(today.getFullYear(), today.getMonth(), today.getDate(),
                                    match[1] || 0, match[3] || 0, match[5] || 0, match[9] || 0) / 1000;
                            }

                            return fail; // invalid format, cannot be parsed
                        }
                    case '/':
                        { // M/D/YY
                            if (match[1] > 12 || match[3] > 31 || (match[5] < 70 && match[5] > 38)) {
                                return fail;
                            }

                            year = match[5] >= 0 && match[5] <= 38 ? +match[5] + 2000 : match[5];
                            return new Date(year, parseInt(match[1], 10) - 1, match[3],
                                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                        }
                    case ':':
                        { // HH:MM:SS
                            if (match[1] > 23 || match[3] > 59 || match[5] > 59) {
                                return fail;
                            }

                            today = new Date();
                            return new Date(today.getFullYear(), today.getMonth(), today.getDate(),
                                match[1] || 0, match[3] || 0, match[5] || 0) / 1000;
                        }
                }
            }
        }

        // other formats and "now" should be parsed by Date.parse()
        if (text === 'now') {
            return now === null || isNaN(now) ? new Date()
                .getTime() / 1000 | 0 : now | 0;
        }
        if (!isNaN(parsed = Date.parse(text))) {
            return parsed / 1000 | 0;
        }

        date = now ? new Date(now * 1000) : new Date();
        days = {
            'sun': 0,
            'mon': 1,
            'tue': 2,
            'wed': 3,
            'thu': 4,
            'fri': 5,
            'sat': 6
        };
        ranges = {
            'yea': 'FullYear',
            'mon': 'Month',
            'day': 'Date',
            'hou': 'Hours',
            'min': 'Minutes',
            'sec': 'Seconds'
        };

        function lastNext(type, range, modifier) {
            var diff, day = days[range];

            if (typeof day !== 'undefined') {
                diff = day - date.getDay();

                if (diff === 0) {
                    diff = 7 * modifier;
                } else if (diff > 0 && type === 'last') {
                    diff -= 7;
                } else if (diff < 0 && type === 'next') {
                    diff += 7;
                }

                date.setDate(date.getDate() + diff);
            }
        }

        function process(val) {
            var splt = val.split(' '), // Todo: Reconcile this with regex using \s, taking into account browser issues with split and regexes
                type = splt[0],
                range = splt[1].substring(0, 3),
                typeIsNumber = /\d+/.test(type),
                ago = splt[2] === 'ago',
                num = (type === 'last' ? -1 : 1) * (ago ? -1 : 1);

            if (typeIsNumber) {
                num *= parseInt(type, 10);
            }

            if (ranges.hasOwnProperty(range) && !splt[1].match(/^mon(day|\.)?$/i)) {
                return date['set' + ranges[range]](date['get' + ranges[range]]() + num);
            }

            if (range === 'wee') {
                return date.setDate(date.getDate() + (num * 7));
            }

            if (type === 'next' || type === 'last') {
                lastNext(type, range, num);
            } else if (!typeIsNumber) {
                return false;
            }

            return true;
        }

        times = '(years?|months?|weeks?|days?|hours?|minutes?|min|seconds?|sec' +
            '|sunday|sun\\.?|monday|mon\\.?|tuesday|tue\\.?|wednesday|wed\\.?' +
            '|thursday|thu\\.?|friday|fri\\.?|saturday|sat\\.?)';
        regex = '([+-]?\\d+\\s' + times + '|' + '(last|next)\\s' + times + ')(\\sago)?';

        match = text.match(new RegExp(regex, 'gi'));
        if (!match) {
            return fail;
        }
        for (i = 0, len = match.length; i < len; i++) {
            if (!process(match[i])) {
                return fail;
            }
        }
        return (date.getTime() / 1000);
    }
}