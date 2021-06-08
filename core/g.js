global.navigator = {
  userAgent: 'iPhone'
}
global.window = {
  screen: {
    width: 375
  }
};

Object.defineProperty(global, "__g", {
  configurable: false,
  enumerable: false,
  writable: false,
  value: function () {
    function D(e, t) {
      if (typeof t != "undefined") e.children.push(t);
    }
    function S(e) {
      if (typeof e != "undefined") return {
        tag: "virtual",
        wxKey: e,
        children: []
      };
      return {
        tag: "virtual",
        children: []
      };
    }
    function v(e) {
      $gwxc++;
      if ($gwxc >= 16e3) {
        throw "Dom limit exceeded, please check if there's any mistake you've made.";
      }
      return {
        tag: "wx-" + e,
        attr: {},
        children: [],
        n: [],
        raw: {},
        generics: {}
      };
    }
    function e(e, t) {
      t && e.properities.push(t);
    }
    function t(e, t, r) {
      return typeof e[r] != "undefined" ? e[r] : t[r];
    }
    function u(e) {
      console.warn("WXMLRT_" + g + ":" + e);
    }
    function r(e, t) {
      u(t + ":-1:-1:-1: Template `" + e + "` is being called recursively, will be stop.");
    }
    var s = console.warn;
    var n = console.log;
    function o() {
      function e() { }
      e.prototype = {
        hn: function (e, t) {
          if (typeof e == "object") {
            var r = 0;
            var n = false, o = false;
            for (var a in e) {
              n = n | a === "__value__";
              o = o | a === "__wxspec__";
              r++;
              if (r > 2) break;
            }
            return r == 2 && n && o && (t || e.__wxspec__ !== "m" || this.hn(e.__value__) === "h") ? "h" : "n";
          }
          return "n";
        },
        nh: function (e, t) {
          return {
            __value__: e,
            __wxspec__: t ? t : true
          };
        },
        rv: function (e) {
          return this.hn(e, true) === "n" ? e : this.rv(e.__value__);
        },
        hm: function (e) {
          if (typeof e == "object") {
            var t = 0;
            var r = false, n = false;
            for (var o in e) {
              r = r | o === "__value__";
              n = n | o === "__wxspec__";
              t++;
              if (t > 2) break;
            }
            return t == 2 && r && n && (e.__wxspec__ === "m" || this.hm(e.__value__));
          }
          return false;
        }
      };
      return new e();
    }
    var A = o();
    function T(e) {
      var t = e.split("\n " + " " + " " + " ");
      for (var r = 0; r < t.length; ++r) {
        if (0 == r) continue;
        if (")" === t[r][t[r].length - 1]) t[r] = t[r].replace(/\s\(.*\)$/, ""); else t[r] = "at anonymous function";
      }
      return t.join("\n " + " " + " " + " ");
    }
    function a(M) {
      function m(e, t, r, n, o) {
        var a = false;
        var i = e[0][1];
        var p, u, l, f, v, c;
        switch (i) {
          case "?:":
            p = x(e[1], t, r, n, o, a);
            l = M && A.hn(p) === "h";
            f = A.rv(p) ? x(e[2], t, r, n, o, a) : x(e[3], t, r, n, o, a);
            f = l && A.hn(f) === "n" ? A.nh(f, "c") : f;
            return f;

          case "&&":
            p = x(e[1], t, r, n, o, a);
            l = M && A.hn(p) === "h";
            f = A.rv(p) ? x(e[2], t, r, n, o, a) : A.rv(p);
            f = l && A.hn(f) === "n" ? A.nh(f, "c") : f;
            return f;

          case "||":
            p = x(e[1], t, r, n, o, a);
            l = M && A.hn(p) === "h";
            f = A.rv(p) ? A.rv(p) : x(e[2], t, r, n, o, a);
            f = l && A.hn(f) === "n" ? A.nh(f, "c") : f;
            return f;

          case "+":
          case "*":
          case "/":
          case "%":
          case "|":
          case "^":
          case "&":
          case "===":
          case "==":
          case "!=":
          case "!==":
          case ">=":
          case "<=":
          case ">":
          case "<":
          case "<<":
          case ">>":
            p = x(e[1], t, r, n, o, a);
            u = x(e[2], t, r, n, o, a);
            l = M && (A.hn(p) === "h" || A.hn(u) === "h");
            switch (i) {
              case "+":
                f = A.rv(p) + A.rv(u);
                break;

              case "*":
                f = A.rv(p) * A.rv(u);
                break;

              case "/":
                f = A.rv(p) / A.rv(u);
                break;

              case "%":
                f = A.rv(p) % A.rv(u);
                break;

              case "|":
                f = A.rv(p) | A.rv(u);
                break;

              case "^":
                f = A.rv(p) ^ A.rv(u);
                break;

              case "&":
                f = A.rv(p) & A.rv(u);
                break;

              case "===":
                f = A.rv(p) === A.rv(u);
                break;

              case "==":
                f = A.rv(p) == A.rv(u);
                break;

              case "!=":
                f = A.rv(p) != A.rv(u);
                break;

              case "!==":
                f = A.rv(p) !== A.rv(u);
                break;

              case ">=":
                f = A.rv(p) >= A.rv(u);
                break;

              case "<=":
                f = A.rv(p) <= A.rv(u);
                break;

              case ">":
                f = A.rv(p) > A.rv(u);
                break;

              case "<":
                f = A.rv(p) < A.rv(u);
                break;

              case "<<":
                f = A.rv(p) << A.rv(u);
                break;

              case ">>":
                f = A.rv(p) >> A.rv(u);
                break;

              default:
                break;
            }
            return l ? A.nh(f, "c") : f;

          case "-":
            p = e.length === 3 ? x(e[1], t, r, n, o, a) : 0;
            u = e.length === 3 ? x(e[2], t, r, n, o, a) : x(e[1], t, r, n, o, a);
            l = M && (A.hn(p) === "h" || A.hn(u) === "h");
            f = l ? A.rv(p) - A.rv(u) : p - u;
            return l ? A.nh(f, "c") : f;

          case "!":
            p = x(e[1], t, r, n, o, a);
            l = M && A.hn(p) == "h";
            f = !A.rv(p);
            return l ? A.nh(f, "c") : f;

          case "~":
            p = x(e[1], t, r, n, o, a);
            l = M && A.hn(p) == "h";
            f = ~A.rv(p);
            return l ? A.nh(f, "c") : f;

          default:
            s("unrecognized op" + i);
        }
      }
      function x(e, t, r, n, o, a) {
        var i = e[0];
        var p = false;
        if (typeof a !== "undefined") o.ap = a;
        if (typeof i === "object") {
          var u = i[0];
          var l, f, v, c, s, y, b, d, h, _, g;
          switch (u) {
            case 2:
              return m(e, t, r, n, o);

            case 4:
              return x(e[1], t, r, n, o, p);

            case 5:
              switch (e.length) {
                case 2:
                  l = x(e[1], t, r, n, o, p);
                  return M ? [l] : [A.rv(l)];

                case 1:
                  return [];

                default:
                  l = x(e[1], t, r, n, o, p);
                  v = x(e[2], t, r, n, o, p);
                  l.push(M ? v : A.rv(v));
                  return l;
              }

            case 6:
              l = x(e[1], t, r, n, o);
              var w = o.ap;
              h = A.hn(l) === "h";
              f = h ? A.rv(l) : l;
              o.is_affected |= h;
              if (M) {
                if (f === null || typeof f === "undefined") {
                  return h ? A.nh(undefined, "e") : undefined;
                }
                v = x(e[2], t, r, n, o, p);
                _ = A.hn(v) === "h";
                c = _ ? A.rv(v) : v;
                o.ap = w;
                o.is_affected |= _;
                if (c === null || typeof c === "undefined" || c === "__proto__" || c === "prototype" || c === "caller") {
                  return h || _ ? A.nh(undefined, "e") : undefined;
                }
                y = f[c];
                if (typeof y === "function" && !w) y = undefined;
                g = A.hn(y) === "h";
                o.is_affected |= g;
                return h || _ ? g ? y : A.nh(y, "e") : y;
              } else {
                if (f === null || typeof f === "undefined") {
                  return undefined;
                }
                v = x(e[2], t, r, n, o, p);
                _ = A.hn(v) === "h";
                c = _ ? A.rv(v) : v;
                o.ap = w;
                o.is_affected |= _;
                if (c === null || typeof c === "undefined" || c === "__proto__" || c === "prototype" || c === "caller") {
                  return undefined;
                }
                y = f[c];
                if (typeof y === "function" && !w) y = undefined;
                g = A.hn(y) === "h";
                o.is_affected |= g;
                return g ? A.rv(y) : y;
              }

            case 7:
              switch (e[1][0]) {
                case 11:
                  o.is_affected |= A.hn(n) === "h";
                  return n;

                case 3:
                  b = A.rv(r);
                  d = A.rv(t);
                  v = e[1][1];
                  if (n && n.f && n.f.hasOwnProperty(v)) {
                    l = n.f;
                    o.ap = true;
                  } else {
                    l = b && b.hasOwnProperty(v) ? r : d && d.hasOwnProperty(v) ? t : undefined;
                  }
                  if (M) {
                    if (l) {
                      h = A.hn(l) === "h";
                      f = h ? A.rv(l) : l;
                      y = f[v];
                      g = A.hn(y) === "h";
                      o.is_affected |= h || g;
                      y = h && !g ? A.nh(y, "e") : y;
                      return y;
                    }
                  } else {
                    if (l) {
                      h = A.hn(l) === "h";
                      f = h ? A.rv(l) : l;
                      y = f[v];
                      g = A.hn(y) === "h";
                      o.is_affected |= h || g;
                      return A.rv(y);
                    }
                  }
                  return undefined;
              }
              break;

            case 8:
              l = {};
              l[e[1]] = x(e[2], t, r, n, o, p);
              return l;

            case 9:
              l = x(e[1], t, r, n, o, p);
              v = x(e[2], t, r, n, o, p);
              function O(e, t, r) {
                var n, o;
                h = A.hn(e) === "h";
                _ = A.hn(t) === "h";
                f = A.rv(e);
                c = A.rv(t);
                for (var a in c) {
                  if (r || !f.hasOwnProperty(a)) {
                    f[a] = M ? _ ? A.nh(c[a], "e") : c[a] : A.rv(c[a]);
                  }
                }
                return e;
              }
              var s = l;
              var j = true;
              if (typeof e[1][0] === "object" && e[1][0][0] === 10) {
                l = v;
                v = s;
                j = false;
              }
              if (typeof e[1][0] === "object" && e[1][0][0] === 10) {
                var P = {};
                return O(O(P, l, j), v, j);
              } else return O(l, v, j);

            case 10:
              l = x(e[1], t, r, n, o, p);
              l = M ? l : A.rv(l);
              return l;

            case 12:
              var P;
              l = x(e[1], t, r, n, o);
              if (!o.ap) {
                return M && A.hn(l) === "h" ? A.nh(P, "f") : P;
              }
              var w = o.ap;
              v = x(e[2], t, r, n, o, p);
              o.ap = w;
              h = A.hn(l) === "h";
              _ = N(v);
              f = A.rv(l);
              c = A.rv(v);
              snap_bb = K(c, "nv_");
              try {
                P = typeof f === "function" ? K(f.apply(null, snap_bb)) : undefined;
              } catch (t) {
                t.message = t.message.replace(/nv_/g, "");
                t.stack = t.stack.substring(0, t.stack.indexOf("\n", t.stack.lastIndexOf("at nv_")));
                t.stack = t.stack.replace(/\snv_/g, " ");
                t.stack = T(t.stack);
                if (n.debugInfo) {
                  t.stack += "\n " + " " + " " + " at " + n.debugInfo[0] + ":" + n.debugInfo[1] + ":" + n.debugInfo[2];
                  console.error(t);
                }
                P = undefined;
              }
              return M && (_ || h) ? A.nh(P, "f") : P;
          }
        } else {
          if (i === 3 || i === 1) return e[1]; else if (i === 11) {
            var l = "";
            for (var D = 1; D < e.length; D++) {
              var S = A.rv(x(e[D], t, r, n, o, p));
              l += typeof S === "undefined" ? "" : S;
            }
            return l;
          }
        }
      }
      function e(e, t, r, n, o, a) {
        if (e[0] == "11182016") {
          n.debugInfo = e[2];
          return x(e[1], t, r, n, o, a);
        } else {
          n.debugInfo = null;
          return x(e, t, r, n, o, a);
        }
      }
      return e;
    }
    var f = a(true);
    var c = a(false);
    function i(e, t, r, n, o, a, i, p) {
      {
        var u = {
          is_affected: false
        };
        var l = f(t, r, n, o, u);
        if (JSON.stringify(l) != JSON.stringify(a) || u.is_affected != p) {
          console.warn("A. " + e + " get result " + JSON.stringify(l) + ", " + u.is_affected + ", but " + JSON.stringify(a) + ", " + p + " is expected");
        }
      }
      {
        var u = {
          is_affected: false
        };
        var l = c(t, r, n, o, u);
        if (JSON.stringify(l) != JSON.stringify(i) || u.is_affected != p) {
          console.warn("B. " + e + " get result " + JSON.stringify(l) + ", " + u.is_affected + ", but " + JSON.stringify(i) + ", " + p + " is expected");
        }
      }
    }
    function y(e, t, r, n, o, a, i, p, u) {
      var l = A.hn(e) === "n";
      var f = A.rv(n);
      var v = f.hasOwnProperty(i);
      var c = f.hasOwnProperty(p);
      var s = f[i];
      var y = f[p];
      var b = Object.prototype.toString.call(A.rv(e));
      var d = b[8];
      if (d === "N" && b[10] === "l") d = "X";
      var h;
      if (l) {
        if (d === "A") {
          var _;
          for (var g = 0; g < e.length; g++) {
            f[i] = e[g];
            f[p] = l ? g : A.nh(g, "h");
            _ = A.rv(e[g]);
            var w = u && _ ? u === "*this" ? _ : A.rv(_[u]) : undefined;
            h = S(w);
            D(a, h);
            t(r, f, h, o);
          }
        } else if (d === "O") {
          var g = 0;
          var _;
          for (var O in e) {
            f[i] = e[O];
            f[p] = l ? O : A.nh(O, "h");
            _ = A.rv(e[O]);
            var w = u && _ ? u === "*this" ? _ : A.rv(_[u]) : undefined;
            h = S(w);
            D(a, h);
            t(r, f, h, o);
            g++;
          }
        } else if (d === "S") {
          for (var g = 0; g < e.length; g++) {
            f[i] = e[g];
            f[p] = l ? g : A.nh(g, "h");
            h = S(e[g] + g);
            D(a, h);
            t(r, f, h, o);
          }
        } else if (d === "N") {
          for (var g = 0; g < e; g++) {
            f[i] = g;
            f[p] = l ? g : A.nh(g, "h");
            h = S(g);
            D(a, h);
            t(r, f, h, o);
          }
        } else { }
      } else {
        var j = A.rv(e);
        var _, P;
        if (d === "A") {
          for (var g = 0; g < j.length; g++) {
            P = j[g];
            P = A.hn(P) === "n" ? A.nh(P, "h") : P;
            _ = A.rv(P);
            f[i] = P;
            f[p] = l ? g : A.nh(g, "h");
            var w = u && _ ? u === "*this" ? _ : A.rv(_[u]) : undefined;
            h = S(w);
            D(a, h);
            t(r, f, h, o);
          }
        } else if (d === "O") {
          var g = 0;
          for (var O in j) {
            P = j[O];
            P = A.hn(P) === "n" ? A.nh(P, "h") : P;
            _ = A.rv(P);
            f[i] = P;
            f[p] = l ? O : A.nh(O, "h");
            var w = u && _ ? u === "*this" ? _ : A.rv(_[u]) : undefined;
            h = S(w);
            D(a, h);
            t(r, f, h, o);
            g++;
          }
        } else if (d === "S") {
          for (var g = 0; g < j.length; g++) {
            P = A.nh(j[g], "h");
            f[i] = P;
            f[p] = l ? g : A.nh(g, "h");
            h = S(e[g] + g);
            D(a, h);
            t(r, f, h, o);
          }
        } else if (d === "N") {
          for (var g = 0; g < j; g++) {
            P = A.nh(g, "h");
            f[i] = P;
            f[p] = l ? g : A.nh(g, "h");
            h = S(g);
            D(a, h);
            t(r, f, h, o);
          }
        } else { }
      }
      if (v) {
        f[i] = s;
      } else {
        delete f[i];
      }
      if (c) {
        f[p] = y;
      } else {
        delete f[p];
      }
    }
    function N(e) {
      if (A.hn(e) == "h") return true;
      if (typeof e !== "object") return false;
      for (var t in e) {
        if (e.hasOwnProperty(t)) {
          if (N(e[t])) return true;
        }
      }
      return false;
    }
    function b(e, t, r, n, o) {
      var a = false;
      var i = K(n, "", 2);
      if (o.ap && i && i.constructor === Function) {
        t = "$wxs:" + t;
        e.attr["$gdc"] = K;
      }
      if (o.is_affected || N(n)) {
        e.n.push(t);
        e.raw[t] = n;
      }
      e.attr[t] = i;
    }
    function d(e, t, r, n, o, a) {
      a.opindex = r;
      var i = {}, p;
      var u = c(z[r], n, o, a, i);
      b(e, t, r, u, i);
    }
    function h(e, t, r, n, o, a, i) {
      i.opindex = n;
      var p = {}, u;
      var l = c(e[n], o, a, i, p);
      b(t, r, n, l, p);
    }
    function p(e, t, r, n) {
      n.opindex = e;
      var o = {};
      var a = c(z[e], t, r, n, o);
      return a && a.constructor === Function ? undefined : a;
    }
    function l(e, t, r, n, o) {
      o.opindex = t;
      var a = {};
      var i = c(e[t], r, n, o, a);
      return i && i.constructor === Function ? undefined : i;
    }
    function _(e, t, r, n, o) {
      var o = o || {};
      n.opindex = e;
      return f(z[e], t, r, n, o);
    }
    function w(e, t, r, n, o, a) {
      var a = a || {};
      o.opindex = t;
      return f(e[t], r, n, o, a);
    }
    function O(e, t, r, n, o, a, i, p, u) {
      var l = {};
      var f = _(e, r, n, o);
      y(f, t, r, n, o, a, i, p, u);
    }
    function j(e, t, r, n, o, a, i, p, u, l) {
      var f = {};
      var v = w(e, t, n, o, a);
      y(v, r, n, o, a, i, p, u, l);
    }
    function P(e, t, r, n, o, a) {
      var i = v(e);
      var p = 0;
      for (var u = 0; u < t.length; u += 2) {
        if (p + t[u + 1] < 0) {
          i.attr[t[u]] = true;
        } else {
          d(i, t[u], p + t[u + 1], n, o, a);
          if (p === 0) p = t[u + 1];
        }
      }
      for (var u = 0; u < r.length; u += 2) {
        if (p + r[u + 1] < 0) {
          i.generics[r[u]] = "";
        } else {
          var l = c(z[p + r[u + 1]], n, o, a);
          if (l != "") l = "wx-" + l;
          i.generics[r[u]] = l;
          if (p === 0) p = r[u + 1];
        }
      }
      return i;
    }
    function M(e, t, r, n, o, a, i) {
      var p = v(t);
      var u = 0;
      for (var l = 0; l < r.length; l += 2) {
        if (u + r[l + 1] < 0) {
          p.attr[r[l]] = true;
        } else {
          h(e, p, r[l], u + r[l + 1], o, a, i);
          if (u === 0) u = r[l + 1];
        }
      }
      for (var l = 0; l < n.length; l += 2) {
        if (u + n[l + 1] < 0) {
          p.generics[n[l]] = "";
        } else {
          var f = c(e[u + n[l + 1]], o, a, i);
          if (f != "") f = "wx-" + f;
          p.generics[n[l]] = f;
          if (u === 0) u = n[l + 1];
        }
      }
      return p;
    }
    var m = function () {
      if (typeof __WXML_GLOBAL__ === "undefined" || undefined === __WXML_GLOBAL__.wxs_nf_init) {
        x();
        C();
        k();
        U();
        I();
        L();
        E();
        R();
        F();
      }
      if (typeof __WXML_GLOBAL__ !== "undefined") __WXML_GLOBAL__.wxs_nf_init = true;
    };
    var x = function () {
    };
    var C = function () {
    };
    var k = function () {
    };
    var U = function () {
    };
    var I = function () {
    };
    var L = function () {
    };
    var E = function () {
    };
    var R = function () {
    };
    var F = function () {
    };
    m();
    var J = function () {
      var e = Array.prototype.slice.call(arguments);
      e.unshift(Date);
      return new (Function.prototype.bind.apply(Date, e))();
    };
    var B = function () {
      var e = Array.prototype.slice.call(arguments);
      e.unshift(RegExp);
      return new (Function.prototype.bind.apply(RegExp, e))();
    };
    var Y = {};
    Y.nv_log = function () {
      var e = "WXSRT:";
      for (var t = 0; t < arguments.length; ++t) e += arguments[t] + " ";
      console.log(e);
    };
    var G = parseInt, X = parseFloat, H = isNaN, V = isFinite, $ = decodeURI, W = decodeURIComponent, Q = encodeURI, q = encodeURIComponent;
    function K(e, t, r) {
      e = A.rv(e);
      if (e === null || e === undefined) return e;
      if (e.constructor === String || e.constructor === Boolean || e.constructor === Number) return e;
      if (e.constructor === Object) {
        var n = {};
        for (var o in e) if (e.hasOwnProperty(o)) if (undefined === t) n[o.substring(3)] = K(e[o], t, r); else n[t + o] = K(e[o], t, r);
        return n;
      }
      if (e.constructor === Array) {
        var n = [];
        for (var a = 0; a < e.length; a++) n.push(K(e[a], t, r));
        return n;
      }
      if (e.constructor === Date) {
        var n = new Date();
        n.setTime(e.getTime());
        return n;
      }
      if (e.constructor === RegExp) {
        var i = "";
        if (e.global) i += "g";
        if (e.ignoreCase) i += "i";
        if (e.multiline) i += "m";
        return new RegExp(e.source, i);
      }
      if (r && e.constructor === Function) {
        if (r == 1) return K(e(), undefined, 2);
        if (r == 2) return e;
      }
      return null;
    }
    var Z = {};
    Z.nv_stringify = function (e) {
      JSON.stringify(e);
      return JSON.stringify(K(e));
    };
    Z.nv_parse = function (e) {
      if (e === undefined) return undefined;
      var t = JSON.parse(e);
      return K(t, "nv_");
    };
    function ee(e, t, r, n) {
      e.extraAttr = {
        t_action: t,
        t_rawid: r
      };
      if (typeof n != "undefined") e.extraAttr.t_cid = n;
    }
    function te() {
      if (typeof window.__webview_engine_version__ == "undefined") return 0;
      return window.__webview_engine_version__;
    }
    function re(e, t, r, n, o, a) {
      var i = ne(t, r, n);
      if (i) e.push(i); else {
        e.push("");
        u(n + ":import:" + o + ":" + a + ": Path `" + t + "` not found from `" + n + "`.");
      }
    }
    function ne(e, t, r) {
      if (e[0] != "/") {
        var n = r.split("/");
        n.pop();
        var o = e.split("/");
        for (var a = 0; a < o.length; a++) {
          if (o[a] == "..") n.pop(); else if (!o[a] || o[a] == ".") continue; else n.push(o[a]);
        }
        e = n.join("/");
      }
      if (r[0] == "." && e[0] == "/") e = "." + e;
      if (t[e]) return e;
      if (t[e + ".wxml"]) return e + ".wxml";
    }
    function oe(e, t, r, n) {
      if (!t) return;
      if (n[e][t]) return n[e][t];
      for (var o = r[e].i.length - 1; o >= 0; o--) {
        if (r[e].i[o] && n[r[e].i[o]][t]) return n[r[e].i[o]][t];
      }
      for (var o = r[e].ti.length - 1; o >= 0; o--) {
        var a = ne(r[e].ti[o], r, e);
        if (a && n[a][t]) return n[a][t];
      }
      var i = ae(r, e);
      for (var o = 0; o < i.length; o++) {
        if (i[o] && n[i[o]][t]) return n[i[o]][t];
      }
      for (var p = r[e].j.length - 1; p >= 0; p--) if (r[e].j[p]) {
        for (var a = r[r[e].j[p]].ti.length - 1; a >= 0; a--) {
          var u = ne(r[r[e].j[p]].ti[a], r, e);
          if (u && n[u][t]) {
            return n[u][t];
          }
        }
      }
    }
    function ae(e, t) {
      if (!t) return [];
      if ($gaic[t]) {
        return $gaic[t];
      }
      var r = [], n = [], o = 0, a = 0, i = {}, p = {};
      n.push(t);
      p[t] = true;
      a++;
      while (o < a) {
        var u = n[o++];
        for (var l = 0; l < e[u].ic.length; l++) {
          var f = e[u].ic[l];
          var v = ne(f, e, u);
          if (v && !p[v]) {
            p[v] = true;
            n.push(v);
            a++;
          }
        }
        for (var l = 0; u != t && l < e[u].ti.length; l++) {
          var c = e[u].ti[l];
          var s = ne(c, e, u);
          if (s && !i[s]) {
            i[s] = true;
            r.push(s);
          }
        }
      }
      $gaic[t] = r;
      return r;
    }
    var ie = {};
    function pe(e, t, r, n, o, a, i) {
      var p = ne(e, t, r);
      t[r].j.push(p);
      if (p) {
        if (ie[p]) {
          u("-1:include:-1:-1: `" + e + "` is being included in a loop, will be stop.");
          return;
        }
        ie[p] = true;
        try {
          t[p].f(n, o, a, i);
        } catch (n) { }
        ie[p] = false;
      } else {
        u(r + ":include:-1:-1: Included path `" + e + "` not found from `" + r + "`.");
      }
    }
    function ue(e, t, r, n) {
      u(t + ":template:" + r + ":" + n + ": Template `" + e + "` not found.");
    }
    function le(e) {
      var t = false;
      delete e.properities;
      delete e.n;
      if (e.children) {
        do {
          t = false;
          var r = [];
          for (var n = 0; n < e.children.length; n++) {
            var o = e.children[n];
            if (o.tag == "virtual") {
              t = true;
              for (var a = 0; o.children && a < o.children.length; a++) {
                r.push(o.children[a]);
              }
            } else {
              r.push(o);
            }
          }
          e.children = r;
        } while (t);
        for (var n = 0; n < e.children.length; n++) {
          le(e.children[n]);
        }
      }
      return e;
    }
    function fe(e) {
      if (e.tag == "wx-wx-scope") {
        e.tag = "virtual";
        e.wxCkey = "11";
        e["wxScopeData"] = e.attr["wx:scope-data"];
        delete e.n;
        delete e.raw;
        delete e.generics;
        delete e.attr;
      }
      for (var t = 0; e.children && t < e.children.length; t++) {
        fe(e.children[t]);
      }
      return e;
    }
    return {
      a: D,
      b: S,
      c: v,
      d: e,
      e: t,
      f: u,
      g: r,
      h: s,
      i: n,
      j: o,
      k: A,
      l: T,
      m: a,
      n: f,
      o: c,
      p: i,
      q: y,
      r: N,
      s: b,
      t: d,
      u: h,
      v: p,
      w: l,
      x: _,
      y: w,
      z: O,
      A: j,
      B: P,
      C: M,
      D: J,
      E: B,
      F: Y,
      G: G,
      H: X,
      I: H,
      J: V,
      K: $,
      L: W,
      M: Q,
      N: q,
      O: K,
      P: Z,
      Q: ee,
      R: te,
      S: re,
      T: ne,
      U: oe,
      V: ae,
      W: ie,
      X: pe,
      Y: ue,
      Z: le,
      aa: fe
    };
  }()
});
