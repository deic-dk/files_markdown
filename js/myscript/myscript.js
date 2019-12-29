!function (e, t) {
  "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t(e.MyScript = {});
}(this, function (e) {
  "use strict";

  var t = {
    EventType: {
      IDLE: "idle",
      CHANGED: "changed",
      IMPORTED: "imported",
      EXPORTED: "exported",
      CONVERTED: "converted",
      RENDERED: "rendered",
      LOADED: "loaded",
      UNDO: "undo",
      REDO: "redo",
      CLEAR: "clear",
      IMPORT: "import",
      SUPPORTED_IMPORT_MIMETYPES: "supportedImportMimeTypes",
      EXPORT: "export",
      CONVERT: "convert",
      ERROR: "error"
    },
    RecognitionType: {
      TEXT: "TEXT",
      MATH: "MATH",
      SHAPE: "SHAPE",
      MUSIC: "MUSIC",
      ANALYZER: "ANALYZER",
      DIAGRAM: "DIAGRAM",
      NEBO: "NEBO",
      RAWCONTENT: "Raw Content"
    },
    Protocol: {
      WEBSOCKET: "WEBSOCKET",
      REST: "REST"
    },
    ModelState: {
      INITIALIZING: "INITIALIZING",
      INITIALIZED: "INITIALIZED",
      EXPORTING: "EXPORTING",
      EXPORTED: "EXPORTED",
      PENDING: "PENDING",
      MODIFIED: "MODIFIED",
      ERROR: "ERROR"
    },
    Trigger: {
      QUIET_PERIOD: "QUIET_PERIOD",
      POINTER_UP: "POINTER_UP",
      DEMAND: "DEMAND"
    },
    Logger: {
      EDITOR: "editor",
      MODEL: "model",
      GRABBER: "grabber",
      RENDERER: "renderer",
      RECOGNIZER: "recognizer",
      CALLBACK: "callback",
      UTIL: "util",
      SMARTGUIDE: "smartguide"
    },
    LogLevel: {
      TRACE: "TRACE",
      DEBUG: "DEBUG",
      INFO: "INFO",
      WARN: "WARN",
      ERROR: "ERROR"
    },
    Languages: {
      zh_CN: "Noto Sans CJK tc",
      zh_HK: "Noto Sans CJK tc",
      zh_TW: "Noto Sans CJK tc",
      ko_KR: "Noto Sans CJK kr",
      ja_JP: "Noto Sans CJK jp",
      hy_AM: "Noto Sans Armenian",
      default: "Open Sans"
    },
    Error: {
      NOT_REACHABLE: "MyScript recognition server is not reachable. Please reload once you are connected.",
      WRONG_CREDENTIALS: "Application credentials are invalid. Please check or regenerate your application key and hmackey.",
      TOO_OLD: "Session is too old. Max Session Duration Reached."
    },
    Exports: {
      JIIX: "application/vnd.myscript.jiix"
    }
  },
      n = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

  function r(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
  }

  function i(e, t) {
    return e(t = {
      exports: {}
    }, t.exports), t.exports;
  }

  var o = (0, i(function (e) {
    var t, r;
    t = n, r = function () {
      var e = function () {},
          t = "undefined",
          n = ["trace", "debug", "info", "warn", "error"];

      function r(e, t) {
        var n = e[t];
        if ("function" == typeof n.bind) return n.bind(e);

        try {
          return Function.prototype.bind.call(n, e);
        } catch (t) {
          return function () {
            return Function.prototype.apply.apply(n, [e, arguments]);
          };
        }
      }

      function i(t, r) {
        for (var i = 0; i < n.length; i++) {
          var o = n[i];
          this[o] = i < t ? e : this.methodFactory(o, t, r);
        }

        this.log = this.debug;
      }

      function o(n, o, a) {
        return function (n) {
          return "debug" === n && (n = "log"), typeof console !== t && (void 0 !== console[n] ? r(console, n) : void 0 !== console.log ? r(console, "log") : e);
        }(n) || function (e, n, r) {
          return function () {
            typeof console !== t && (i.call(this, n, r), this[e].apply(this, arguments));
          };
        }.apply(this, arguments);
      }

      function a(e, r, a) {
        var s,
            c = this,
            l = "loglevel";

        function u() {
          var e;

          if (typeof window !== t) {
            try {
              e = window.localStorage[l];
            } catch (e) {}

            if (typeof e === t) try {
              var n = window.document.cookie,
                  r = n.indexOf(encodeURIComponent(l) + "=");
              -1 !== r && (e = /^([^;]+)/.exec(n.slice(r))[1]);
            } catch (e) {}
            return void 0 === c.levels[e] && (e = void 0), e;
          }
        }

        e && (l += ":" + e), c.name = e, c.levels = {
          TRACE: 0,
          DEBUG: 1,
          INFO: 2,
          WARN: 3,
          ERROR: 4,
          SILENT: 5
        }, c.methodFactory = a || o, c.getLevel = function () {
          return s;
        }, c.setLevel = function (r, o) {
          if ("string" == typeof r && void 0 !== c.levels[r.toUpperCase()] && (r = c.levels[r.toUpperCase()]), !("number" == typeof r && r >= 0 && r <= c.levels.SILENT)) throw "log.setLevel() called with invalid level: " + r;
          if (s = r, !1 !== o && function (e) {
            var r = (n[e] || "silent").toUpperCase();

            if (typeof window !== t) {
              try {
                return void (window.localStorage[l] = r);
              } catch (e) {}

              try {
                window.document.cookie = encodeURIComponent(l) + "=" + r + ";";
              } catch (e) {}
            }
          }(r), i.call(c, r, e), typeof console === t && r < c.levels.SILENT) return "No console available for logging";
        }, c.setDefaultLevel = function (e) {
          u() || c.setLevel(e, !1);
        }, c.enableAll = function (e) {
          c.setLevel(c.levels.TRACE, e);
        }, c.disableAll = function (e) {
          c.setLevel(c.levels.SILENT, e);
        };
        var d = u();
        null == d && (d = null == r ? "WARN" : r), c.setLevel(d, !1);
      }

      var s = new a(),
          c = {};

      s.getLogger = function (e) {
        if ("string" != typeof e || "" === e) throw new TypeError("You must supply a name when creating a logger.");
        var t = c[e];
        return t || (t = c[e] = new a(e, s.getLevel(), s.methodFactory)), t;
      };

      var l = typeof window !== t ? window.log : void 0;
      return s.noConflict = function () {
        return typeof window !== t && window.log === s && (window.log = l), s;
      }, s.getLoggers = function () {
        return c;
      }, s;
    }, e.exports ? e.exports = r() : t.log = r();
  }).noConflict)(),
      a = o.getLogger(t.Logger.EDITOR);
  a.setDefaultLevel(t.LogLevel.ERROR);
  o.getLogger(t.Logger.SMARTGUIDE);
  a.setDefaultLevel(t.LogLevel.ERROR);
  var s = o.getLogger(t.Logger.MODEL);
  s.setDefaultLevel(t.LogLevel.ERROR);
  var c = o.getLogger(t.Logger.GRABBER);
  c.setDefaultLevel(t.LogLevel.ERROR);
  var l = o.getLogger(t.Logger.RENDERER);
  l.setDefaultLevel(t.LogLevel.ERROR);
  var u = o.getLogger(t.Logger.RECOGNIZER);
  u.setDefaultLevel(t.LogLevel.ERROR);
  var d = o.getLogger(t.Logger.CALLBACK);
  d.setDefaultLevel(t.LogLevel.ERROR);
  var f = o.getLogger(t.Logger.UTIL);
  f.setDefaultLevel(t.LogLevel.ERROR), o.getLogger("test").setDefaultLevel(t.LogLevel.ERROR);

  var h = function (e) {
    return null == e || "function" != typeof e && "object" != typeof e;
  },
      p = function (e, t) {
    if (null === e || void 0 === e) throw new TypeError("expected first argument to be an object.");
    if (void 0 === t || "undefined" == typeof Symbol) return e;
    if ("function" != typeof Object.getOwnPropertySymbols) return e;

    for (var n = Object.prototype.propertyIsEnumerable, r = Object(e), i = arguments.length, o = 0; ++o < i;) for (var a = Object(arguments[o]), s = Object.getOwnPropertySymbols(a), c = 0; c < s.length; c++) {
      var l = s[c];
      n.call(a, l) && (r[l] = a[l]);
    }

    return r;
  },
      g = Object.prototype.toString,
      m = function (e) {
    var t = typeof e;
    return "undefined" === t ? "undefined" : null === e ? "null" : !0 === e || !1 === e || e instanceof Boolean ? "boolean" : "string" === t || e instanceof String ? "string" : "number" === t || e instanceof Number ? "number" : "function" === t || e instanceof Function ? void 0 !== e.constructor.name && "Generator" === e.constructor.name.slice(0, 9) ? "generatorfunction" : "function" : void 0 !== Array.isArray && Array.isArray(e) ? "array" : e instanceof RegExp ? "regexp" : e instanceof Date ? "date" : "[object RegExp]" === (t = g.call(e)) ? "regexp" : "[object Date]" === t ? "date" : "[object Arguments]" === t ? "arguments" : "[object Error]" === t ? "error" : "[object Promise]" === t ? "promise" : function (e) {
      return e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e);
    }(e) ? "buffer" : "[object Set]" === t ? "set" : "[object WeakSet]" === t ? "weakset" : "[object Map]" === t ? "map" : "[object WeakMap]" === t ? "weakmap" : "[object Symbol]" === t ? "symbol" : "[object Map Iterator]" === t ? "mapiterator" : "[object Set Iterator]" === t ? "setiterator" : "[object String Iterator]" === t ? "stringiterator" : "[object Array Iterator]" === t ? "arrayiterator" : "[object Int8Array]" === t ? "int8array" : "[object Uint8Array]" === t ? "uint8array" : "[object Uint8ClampedArray]" === t ? "uint8clampedarray" : "[object Int16Array]" === t ? "int16array" : "[object Uint16Array]" === t ? "uint16array" : "[object Int32Array]" === t ? "int32array" : "[object Uint32Array]" === t ? "uint32array" : "[object Float32Array]" === t ? "float32array" : "[object Float64Array]" === t ? "float64array" : "object";
  };

  function v(e) {
    e = e || {};
    var t = arguments.length,
        n = 0;
    if (1 === t) return e;

    for (; ++n < t;) {
      var r = arguments[n];
      h(e) && (e = r), b(r) && y(e, r);
    }

    return e;
  }

  function y(e, t) {
    for (var n in p(e, t), t) if ("__proto__" !== n && E(t, n)) {
      var r = t[n];
      b(r) ? ("undefined" === m(e[n]) && "function" === m(r) && (e[n] = r), e[n] = v(e[n] || {}, r)) : e[n] = r;
    }

    return e;
  }

  function b(e) {
    return "object" === m(e) || "function" === m(e);
  }

  function E(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }

  var x = v,
      w = {
    recognitionParams: {
      type: "TEXT",
      protocol: "WEBSOCKET",
      apiVersion: "V4",
      server: {
        scheme: "https",
        host: "cloud.myscript.com",
        applicationKey: void 0,
        hmacKey: void 0,
        useWindowLocation: !1,
        websocket: {
          pingEnabled: !0,
          pingDelay: 3e4,
          maxPingLostCount: 10,
          autoReconnect: !0,
          maxRetryCount: 2,
          fileChunkSize: 3e5
        }
      },
      v4: {
        alwaysConnected: !0,
        lang: "en_US",
        export: {
          "image-resolution": 300,
          jiix: {
            "bounding-box": !1,
            strokes: !1,
            text: {
              chars: !1,
              words: !0
            }
          }
        },
        renderer: {
          debug: {
            "draw-text-boxes": !1,
            "draw-image-boxes": !1
          }
        },
        math: {
          mimeTypes: ["application/x-latex", "application/mathml+xml"],
          solver: {
            enable: !0,
            "fractional-part-digits": 3,
            "decimal-separator": ".",
            "rounding-mode": "half up",
            "angle-unit": "deg"
          },
          margin: {
            bottom: 10,
            left: 15,
            right: 15,
            top: 10
          }
        },
        text: {
          guides: {
            enable: !0
          },
          smartGuide: !0,
          smartGuideFadeOut: {
            enable: !1,
            duration: 1e4
          },
          mimeTypes: ["text/plain", "application/vnd.myscript.jiix"],
          margin: {
            top: 20,
            left: 10,
            right: 10
          }
        },
        diagram: {
          mimeTypes: ["application/vnd.myscript.jiix"],
          margin: {
            bottom: 10,
            left: 15,
            right: 15,
            top: 10
          }
        },
        "raw-content": {
          recognition: {
            text: !1,
            shape: !1
          }
        }
      },
      v3: {
        mathParameter: {
          resultTypes: ["LATEX", "MATHML"],
          columnarOperation: !1,
          userResources: [],
          scratchOutDetectionSensitivity: 1
        },
        textParameter: {
          language: "en_US",
          textInputMode: "CURSIVE",
          resultDetail: "TEXT",
          contentTypes: [],
          subsetKnowledges: [],
          userLkWords: [],
          userResources: [],
          textProperties: {
            textCandidateListSize: 1,
            wordCandidateListSize: void 0,
            wordPredictionListSize: 0,
            wordCompletionListSize: 0,
            characterCandidateListSize: void 0,
            enableOutOfLexicon: !1,
            discardCaseVariations: !1,
            discardAccentuationVariations: !1,
            glyphDistortion: void 0,
            enableTagger: !1,
            spellingDistortion: void 0
          }
        },
        shapeParameter: {
          userResources: void 0,
          rejectDetectionSensitivity: 1,
          doBeautification: !0
        },
        musicParameter: {
          divisions: 480,
          resultTypes: ["MUSICXML", "SCORETREE"],
          userResources: [],
          staff: {
            top: 100,
            count: 5,
            gap: 20
          },
          clef: {
            symbol: "G",
            octave: 0,
            line: 2
          },
          scratchOutDetectionSensitivity: 1
        },
        analyzerParameter: {
          textParameter: {
            textProperties: {},
            language: "en_US",
            textInputMode: "CURSIVE"
          },
          coordinateResolution: void 0
        }
      }
    },
    listenerOptions: {
      capture: !1,
      passive: !0
    },
    undoRedoMaxStackSize: 20,
    xyFloatPrecision: 0,
    timestampFloatPrecision: 0,
    triggerDelay: 2e3,
    processDelay: 0,
    resizeTriggerDelay: 200,
    triggers: {
      exportContent: "POINTER_UP",
      addStrokes: "POINTER_UP"
    },
    restConversionState: "",
    renderingParams: {
      stroker: "quadratic",
      minHeight: 100,
      minWidth: 100
    }
  };

  function S(e) {
    var t = e,
        n = void 0;
    return t && t.recognitionParams.server && t.recognitionParams.server.useWindowLocation ? (t.recognitionParams.server.scheme = window.location.protocol.slice(0, -1), t.recognitionParams.server.host = window.location.host, n = x({}, w, void 0 === t ? {} : t)) : n = x({}, w, void 0 === e ? {} : e), a.debug("Override default configuration", n), n;
  }

  var T = i(function (e, t) {
    e.exports = function (e) {
      function t(r) {
        if (n[r]) return n[r].exports;
        var i = n[r] = {
          i: r,
          l: !1,
          exports: {}
        };
        return e[r].call(i.exports, i, i.exports, t), i.l = !0, i.exports;
      }

      var n = {};
      return t.m = e, t.c = n, t.i = function (e) {
        return e;
      }, t.d = function (e, n, r) {
        t.o(e, n) || Object.defineProperty(e, n, {
          configurable: !1,
          enumerable: !0,
          get: r
        });
      }, t.n = function (e) {
        var n = e && e.__esModule ? function () {
          return e.default;
        } : function () {
          return e;
        };
        return t.d(n, "a", n), n;
      }, t.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }, t.p = "", t(t.s = 1);
    }([function (e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e;
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      };

      t.default = function e(t) {
        var n = this;
        (function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        })(this, e), this.toJSON = function (e) {
          if ("string" != typeof e) return console.error("Need a CSS string but given ", void 0 === e ? "undefined" : r(e), e), "Not a valid CSS..!";
          var t = {},
              i = void 0,
              o = void 0,
              a = void 0;

          try {
            e.split("{").forEach(function (e) {
              if (o = e.trim()) if (-1 === o.indexOf("}")) t[o] = {}, i = o;else {
                o.substring(0, o.indexOf("}")).split(";").forEach(function (e) {
                  (a = e.split(":")) && 2 === a.length && (t[i][a[0].trim().replace(/^\"|\"$/g, "")] = n._trimSemiColon(a[1].trim().replace(/^\"|\"$/g, "")));
                });

                try {
                  (i = o.split("}")[1].trim()) && (t[i] = {});
                } catch (e) {}
              }
            });
          } catch (e) {
            return "Not a valid CSS..!";
          }

          return t;
        }, this.toCSS = function (e) {
          if ("object" !== (void 0 === e ? "undefined" : r(e))) return console.error("Need a JSON object but given ", void 0 === e ? "undefined" : r(e), e), "Not a valid JSON..!";
          var t = "";

          try {
            for (var n in e) if (e.hasOwnProperty(n)) {
              for (var i in t += n + " {\n", e[n]) e[n].hasOwnProperty(i) && (t += i + ": " + e[n][i] + ";\n");

              t += "}\n";
            }
          } catch (e) {
            return "Not a valid JSON..!";
          }

          return t;
        }, this._trimSemiColon = function (e) {
          return ";" === e.slice(-1) ? e.slice(0, n.length - 1) : e;
        };
      };
    }, function (e, t, n) {
      e.exports = n(0).default;
    }]);
  }),
      R = r(T),
      C = (T.JsonCSS, void 0),
      k = new R();

  function P(e) {
    var t = k.toCSS({
      css: e
    });
    return t.substring(6, t.length - 3);
  }

  var I = {
    ink: {
      color: "#000000",
      "-myscript-pen-width": 1,
      "-myscript-pen-fill-style": "none",
      "-myscript-pen-fill-color": "#FFFFFF00"
    },
    ".math": {
      "font-family": "STIXGeneral"
    },
    ".math-solved": {
      "font-family": "STIXGeneral",
      color: "#A8A8A8FF"
    },
    ".text": {
      "font-family": "Open Sans",
      "font-size": 10
    }
  },
      _ = new R();

  function L(e) {
    return _.toCSS(e);
  }

  var A = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9];

  function M(e, t) {
    if (t || 0 === t) {
      var n = void 0;
      return n = t > 10 ? A[10] : A[t], Math.round(e * n) / n;
    }

    return e;
  }

  function O(e, t, n) {
    var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
        i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0,
        o = e;
    o.changedTouches && (o = o.changedTouches[0]);
    var a = t.getBoundingClientRect();
    return {
      x: M(o.clientX - a.left - t.clientLeft - i, n.xyFloatPrecision),
      y: M(o.clientY - a.top - t.clientTop - r, n.xyFloatPrecision),
      t: M(Date.now(), n.timestampFloatPrecision)
    };
  }

  var z = Object.freeze({
    attach: function (e, t) {
      var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
          r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
          i = 0;

      function o() {
        "None" !== window.getSelection().type && window.getSelection().removeAllRanges();
      }

      function a(e) {
        var t = document.querySelector(".more-menu");
        return !(e.target.classList.contains("ellipsis") || e.target.classList.contains("more-menu") || e.target.classList.contains("options-label-button") || !t || "none" === t.style.display || (t.style.display = "none", 0));
      }

      function s(e) {
        var t = document.querySelector(".candidates");
        return !(e.target.classList.contains("candidates") || "SPAN" === e.target.tagName || !t || "none" === t.style.display || (t.style.display = "none", 0));
      }

      var l = {
        options: t.configuration.listenerOptions,
        listeners: [{
          types: ["pointerdown"],
          listener: function (i) {
            var l = i.target.id === t.domElement.id || i.target.classList.contains("ms-canvas");
            if (void 0 !== this.activePointerId) this.activePointerId === i.pointerId && c.trace(i.type + " event with the same id without any pointer up", i.pointerId);else if (2 !== i.button && 2 !== i.buttons && l) {
              if (!a(i) && !s(i)) {
                this.activePointerId = i.pointerId;
                var u = i.pointerId > 2147483647 ? -1 : i.pointerId;
                o(), i.stopPropagation(), t.pointerDown(O(i, e, t.configuration, n, r), i.pointerType, u);
              }
            } else i.target.classList.contains("ellipsis") || i.target.classList.contains("tag-icon") ? (a(i), s(i)) : (a(i), s(i), this.smartGuidePointerDown = !0, this.downSmartGuidePoint = O(i, e, t.configuration));
          }
        }, {
          types: ["pointermove"],
          listener: function (a) {
            if (void 0 !== this.activePointerId && this.activePointerId === a.pointerId) o(), t.pointerMove(O(a, e, t.configuration, n, r));else if (this.smartGuidePointerDown) {
              var s = O(a, e, t.configuration, n, r),
                  l = Math.abs(this.downSmartGuidePoint.x - s.x),
                  u = Math.abs(this.downSmartGuidePoint.y - s.y);

              if (i = Math.max(l, i), l < 5 && u > 5 && i < 15 || l > 5 && u > 5 && i < 15) {
                this.activePointerId = a.pointerId;
                var d = a.pointerId > 2147483647 ? -1 : a.pointerId;
                o(), t.pointerDown(this.downSmartGuidePoint, a.pointerType, d);
              }
            } else c.trace(a.type + " event from another pointerid (" + a.pointerId + ")", this.activePointerId);
          }
        }, {
          types: ["pointerup", "pointerout", "pointerleave", "pointercancel"],
          listener: function (o) {
            i = 0, this.smartGuidePointerDown = !1;
            var a = ["smartguide", "prompter-text-container", "prompter-text", "tag-icon", "ellipsis"],
                s = ["ps__rail-x", "ps__thumb-x"],
                l = o.relatedTarget && (a.includes(o.relatedTarget.className) || s.includes(o.relatedTarget.className)),
                u = o.relatedTarget && o.target && (a.includes(o.target.className) || s.includes(o.target.className)),
                d = o.relatedTarget && o.target && ("SPAN" === o.target.tagName || "SPAN" === o.relatedTarget.tagName);
            l || u || d ? o.stopPropagation() : void 0 !== this.activePointerId && this.activePointerId === o.pointerId ? (this.activePointerId = void 0, o.stopPropagation(), t.pointerUp(O(o, e, t.configuration, n, r))) : c.trace(o.type + " event from another pointerid (" + o.pointerId + ")", this.activePointerId);
          }
        }]
      };
      return c.debug("attaching listeners", l), l.listeners.forEach(function (t) {
        t.types.forEach(function (n) {
          return e.addEventListener(n, t.listener, l.options);
        });
      }), l;
    },
    detach: function (e, t) {
      c.debug("detaching listeners", t), t.listeners.forEach(function (n) {
        n.types.forEach(function (r) {
          return e.removeEventListener(r, n.listener, t.options);
        });
      });
    }
  });

  function D(e, t, n) {
    n && n.drawStroke(e, t);
  }

  var N = {
    table: "table",
    shape: "shape",
    recognizedShape: "recognizedShape",
    ellipse: "ellipse",
    line: "line"
  };

  function H(e) {
    var t = (e + Math.PI) % (2 * Math.PI) - Math.PI;
    return t < -Math.PI && (t += 2 * Math.PI), t;
  }

  function U(e, t, n, r) {
    var i = H(n + Math.PI * (7 / 8)),
        o = H(n - Math.PI * (7 / 8)),
        a = e;
    a.save();

    try {
      a.fillStyle = a.strokeStyle, a.moveTo(t.x, t.y), a.beginPath(), a.lineTo(t.x + r * Math.cos(i), t.y + r * Math.sin(i)), a.lineTo(t.x + r * Math.cos(o), t.y + r * Math.sin(o)), a.lineTo(t.x, t.y), a.fill();
    } finally {
      a.restore();
    }
  }

  function X(e, t) {
    var n = function (e, t, n, r, i, o, a) {
      var s = Math.cos(i),
          c = Math.sin(i),
          l = s,
          u = c;
      s *= n, l *= r, c *= n, u *= r;
      var d = Math.floor(Math.abs(a) / .02),
          f = [];
      e.save();

      try {
        e.beginPath();

        for (var h = 0; h <= d; h++) {
          var p = o + h / d * a,
              g = Math.atan2(Math.sin(p) / r, Math.cos(p) / n),
              m = Math.cos(g),
              v = Math.sin(g),
              y = t.x + s * m - u * v,
              b = t.y + l * v + c * m;
          0 === h ? e.moveTo(y, b) : e.lineTo(y, b), 0 !== h && h !== d || f.push({
            x: y,
            y: b
          });
        }

        e.stroke();
      } finally {
        e.restore();
      }

      return f;
    }(e, t.center, t.maxRadius, t.minRadius, t.orientation, t.startAngle, t.sweepAngle);

    t.beginDecoration && "ARROW_HEAD" === t.beginDecoration && U(e, n[0], t.beginTangentAngle, 12), t.endDecoration && "ARROW_HEAD" === t.endDecoration && U(e, n[1], t.endTangentAngle, 12);
  }

  function j(e, t, n) {
    e.save();

    try {
      e.beginPath(), e.moveTo(t.x, t.y), e.lineTo(n.x, n.y), e.stroke();
    } finally {
      e.restore();
    }
  }

  function B(e, t) {
    l.debug("draw " + t.type + " symbol");
    var n = e;
    n.save();

    try {
      if (n.lineWidth = t.width, n.strokeStyle = t.color, t.elementType) switch (t.elementType) {
        case N.shape:
          B(n, t.candidates[t.selectedCandidateIndex]);
          break;

        case N.table:
          t.lines.forEach(function (e) {
            return B(n, e);
          });
          break;

        case N.line:
          j(n, t.data.p1, t.data.p2);
          break;

        default:
          l.error(t.elementType + " not implemented");
      } else switch (t.type) {
        case N.ellipse:
          X(n, t);
          break;

        case N.line:
          !function (e, t) {
            j(e, t.firstPoint, t.lastPoint), "ARROW_HEAD" === t.beginDecoration && U(e, t.firstPoint, t.beginTangentAngle, 12), "ARROW_HEAD" === t.endDecoration && U(e, t.lastPoint, t.endTangentAngle, 12);
          }(n, t);
          break;

        case N.recognizedShape:
          t.primitives.forEach(function (e) {
            return B(n, e);
          });
          break;

        default:
          l.error(t.type + " not implemented");
      }
    } finally {
      n.restore();
    }
  }

  var W = {
    inputCharacter: "inputCharacter",
    char: "char",
    string: "string",
    textLine: "textLine"
  };

  function Y(e, t) {
    !function (e, t, n) {
      var r = e;
      r.save();

      try {
        r.font = n.textHeight + "px serif", r.textAlign = "CENTER" === n.justificationType ? "center" : "left", r.textBaseline = "bottom", r.fillStyle = r.strokeStyle, r.fillText(t, n.topLeftPoint.x, n.topLeftPoint.y + n.height);
      } finally {
        r.restore();
      }
    }(e, t.label, t.data), t.underlineList.forEach(function (n) {
      !function (e, t, n, r) {
        var i = r.width / n.length;
        j(e, {
          x: r.topLeftPoint.x + t.data.firstCharacter * i,
          y: r.topLeftPoint.y + r.height
        }, {
          x: r.topLeftPoint.x + t.data.lastCharacter * i,
          y: r.topLeftPoint.y + r.height
        });
      }(e, n, t.label, t.data);
    });
  }

  var G = {
    F: {
      svg: '<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="18" height="20"><g transform="translate(6.600000e-3,3.125356e-3)"><path d="M17.3 3.1 C17.3 3.5 17.1 3.8 16.8 4.1 C16.5 4.4 15.9 4.5 15.5 4.3 C15 4.1 14.7 3.7 14.7 3.2 C14.6 2.8 14.8 2.5 15 2.2 C15.3 1.9 15.7 1.8 16 1.8 C16.4 1.8 16.8 2 17 2.3 C17.2 2.5 17.3 2.8 17.3 3.1 z"/><path d="M17.3 8.9 C17.3 9.3 17.1 9.7 16.8 9.9 C16.5 10.3 15.9 10.3 15.5 10.2 C15 10 14.7 9.5 14.7 9.1 C14.6 8.7 14.8 8.3 15 8 C15.3 7.8 15.7 7.6 16 7.6 C16.5 7.7 17 8 17.2 8.4 C17.2 8.6 17.3 8.8 17.3 8.9 z"/><path d="M13 7.2 C13 10 11.8 12.7 9.8 14.7 C7.3 17.2 4 18.8 0.7 19.8 C0.3 20.1 -0.4 19.8 0.3 19.4 C1.6 18.8 3 18.3 4.2 17.5 C7 15.8 9.3 13.1 9.8 9.9 C10.1 8 10.1 5.9 9.6 4 C9.2 2.6 8.2 1.1 6.7 0.9 C5.3 0.7 3.7 1.2 2.7 2.2 C2.5 2.4 2 3.2 2 4 C2.6 3.6 2.6 3.6 3.1 3.4 C4.2 2.9 5.7 3.6 6 4.9 C6.3 6 6.1 7.5 5 8.1 C3.8 8.7 2 8.5 1.4 7.2 C0.3 5.3 0.9 2.6 2.6 1.2 C4.4 -0.3 7.1 -0.3 9.2 0.4 C11.4 1.3 12.7 3.5 12.9 5.8 C13 6.2 13 6.7 13 7.2 z"/></g></svg>',
      getBoundingBox: function (e, t, n) {
        return {
          height: 3 * e,
          width: 3 * e * .9,
          x: t,
          y: n - e
        };
      }
    },
    C: {
      svg: '<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="18" height="25"><g transform="matrix(1,0,0,1.030698,-309.364,-543.8647)"><path d="M 325.9 546.8 C 325.8 548.7 324.7 550.7 322.8 551.5 C 321.1 552.1 319.1 552.2 317.6 551 C 316.6 550.2 316.2 548.4 317.3 547.5 C 318.3 546.5 320.4 547.4 320.3 548.9 C 320.7 549.9 318.5 550.5 319.7 551.3 C 321 551.6 322.3 550.5 322.6 549.3 C 323.1 547.5 323.1 545.6 322.7 543.8 C 322.4 542.9 321.9 541.5 320.7 541.9 C 319.2 542.2 318.3 543.8 317.9 545.1 C 317.6 543.2 316.4 541.5 315 540.2 C 315 544.1 315 548 315 551.9 L 314.1 551.9 C 314.1 543.9 314.1 535.7 314.1 527.7 L 315 527.7 C 315 531.5 315 535.5 315 539.4 C 316.4 538.1 317.6 536.4 317.8 534.5 C 318.3 535.9 319.3 537.5 321 537.8 C 322.2 537.8 322.5 536.3 322.8 535.4 C 323.1 533.7 323.1 531.8 322.6 530.1 C 322.2 529 320.9 528 319.6 528.3 C 318.6 529 320.6 529.6 320.3 530.6 C 320.5 532 318.8 533 317.6 532.3 C 316.3 531.6 316.4 529.7 317.4 528.8 C 318 528.1 319.3 527.7 320.3 527.7 C 321.2 527.7 321.8 527.7 322.6 528 C 324.6 528.7 325.7 530.7 325.9 532.7 C 326.2 534.9 324.9 537.3 322.8 538.2 C 321.5 538.7 319.9 538.3 318.8 537.3 C 318.7 538.3 318.2 539.2 317.7 539.9 C 318.1 540.6 318.6 541.8 318.8 542.1 C 320.1 540.9 322.5 540.8 323.8 542 C 325.2 543.1 326.1 545 325.9 546.8 z "/></g><g transform="matrix(1,0,0,1.030928,-309.364,-543.9805)"><path d="M 312.2 551.9 L 309.4 551.9 L 309.4 527.7 L 312.2 527.7 L 312.2 551.9 z "/></g></svg>',
      getBoundingBox: function (e, t, n) {
        return {
          height: 3 * e,
          width: 3 * e * .72,
          x: t,
          y: n - 1.5 * e
        };
      }
    },
    G: {
      svg: '<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="15" height="40"><g><path d="m 12 3.4 c 0.3 3.1 -2 5.6 -4.1 7.6 -0.9 0.9 -0.2 0.1 -0.6 0.6 -0.1 -0.5 -0.3 -1.7 -0.3 -2.1 0.1 -2.6 2.3 -6.5 4.2 -7.9 0.3 0.6 0.6 0.6 0.8 1.8 z m 0.7 15.9 c -1.2 -0.9 -2.8 -1.1 -4.3 -0.9 -0.2 -1.2 -0.4 -2.5 -0.6 -3.7 2.4 -2.3 4.9 -4.9 5 -8.4 0.1 -2.2 -0.3 -4.6 -1.7 -6.4 C 9.5 0.1 8.3 2.1 7.4 3.3 c -1.5 2.6 -1.1 5.8 -0.6 8.6 -0.8 0.9 -1.9 1.7 -2.7 2.7 -2.4 2.3 -4.4 5.3 -4 8.7 0.2 3.3 2.6 6.3 5.9 7.1 1.2 0.3 2.6 0.3 3.8 0.1 0.2 2.2 1 4.5 0.1 6.7 -0.7 1.6 -2.8 2.9 -4.3 2.2 -0.6 -0.3 -0.1 -0.1 -0.5 -0.2 1.1 -0.3 2 -1 2.3 -1.5 0.8 -1.4 -0.4 -3.6 -2.2 -3.3 -2.3 0 -3.2 3.1 -1.7 4.6 1.3 1.5 3.8 1.3 5.4 0.3 1.8 -1.2 2 -3.5 1.8 -5.5 -0.1 -0.7 -0.4 -2.6 -0.4 -3.3 0.7 -0.2 0.2 -0.1 1.2 -0.4 2.7 -1 4.4 -4.2 3.6 -7 -0.3 -1.4 -1 -2.9 -2.3 -3.7 z m 0.6 5.7 c 0.2 2 -1.1 4.2 -3.1 4.9 -0.1 -0.8 -0.2 -1 -0.3 -1.4 -0.5 -2.4 -0.7 -4.9 -1.1 -7.3 1.6 -0.2 3.5 0.5 4 2.1 0.2 0.6 0.3 1.2 0.4 1.8 z m -5.1 5.1 c -2.5 0.1 -5 -1.6 -5.6 -4 -0.7 -2.1 -0.5 -4.5 0.8 -6.4 1.1 -1.7 2.6 -3 4 -4.5 0.2 1.1 0.4 2.2 0.5 3.3 -3 0.8 -5 4.6 -3.2 7.3 0.5 0.8 2 2.2 2.8 1.6 -1.1 -0.7 -2 -1.8 -1.8 -3.2 -0.1 -1.3 1.4 -2.9 2.7 -3.1 0.4 2.8 0.9 6 1.4 8.8 -0.5 0.1 -1 0.1 -1.5 0.1 z"/></g></svg>',
      getBoundingBox: function (e, t, n) {
        return {
          height: 7.5 * e,
          width: 7.5 * e * .375,
          x: t,
          y: n - 4.5 * e
        };
      }
    }
  },
      F = {
    accidental: "accidental",
    arpeggiate: "arpeggiate",
    bar: "bar",
    beam: "beam",
    clef: "clef",
    decoration: "decoration",
    dots: "dots",
    head: "head",
    ledgerLine: "ledgerLine",
    rest: "rest",
    staff: "staff",
    stem: "stem",
    tieOrSlur: "tieOrSlur",
    timeSignature: "timeSignature"
  };

  function K() {
    return Object.keys(G).map(function (e) {
      return t = e, n = "data:image/svg+xml," + G[e].svg, (r = document.createElement("img")).dataset.clef = t, r.src = n, r.style.display = "none", r;
      var t, n, r;
    });
  }

  function V(e, t) {
    switch (l.debug("draw " + t.type + " symbol"), t.type) {
      case F.clef:
        !function (e, t) {
          e.drawImage(e.canvas.parentElement.querySelector("img[data-clef=" + t.value.symbol + "]"), t.boundingBox.x, t.boundingBox.y, t.boundingBox.width, t.boundingBox.height);
        }(e, t);
        break;

      case F.staff:
        !function (e, t) {
          for (var n = 0; n < t.count; n++) j(e, {
            x: 0,
            y: t.top + n * t.gap
          }, {
            x: e.canvas.width,
            y: t.top + n * t.gap
          });
        }(e, t);
        break;

      default:
        l.error(t.type + " not implemented");
    }
  }

  function J(e, t, n, r, i) {
    var o = Math.sqrt(Math.pow(t - r[i - 1], 2) + Math.pow(e - n[i - 1], 2));
    return isNaN(o) ? 0 : o;
  }

  function q(e, t, n, r, i, o) {
    var a = i[o - 1] + J(e, t, n, r, o);
    return isNaN(a) ? 0 : a;
  }

  function Z(e) {
    return Object.assign({}, {
      type: "stroke",
      x: [],
      y: [],
      t: [],
      p: [],
      l: [],
      width: 0
    }, e);
  }

  function Q(e) {
    return {
      type: e.type,
      x: e.x,
      y: e.y,
      t: e.t
    };
  }

  function Stroke(e, t) {
    var n,
        r,
        i,
        o,
        a,
        c,
        l,
        u = e;
    return n = t.x, r = t.y, i = u.x, o = u.y, a = u.width, c = 2 + a / 4, l = !1, (0 === i.length || 0 === o.length || Math.abs(i[i.length - 1] - n) >= c || Math.abs(o[o.length - 1] - r) >= c) && (l = !0), l ? (u.x.push(t.x), u.y.push(t.y), u.t.push(t.t), u.p.push(function (e, t, n, r, i, o) {
      var a = 1,
          s = J(e, t, n, r, o),
          c = q(e, t, n, r, i, o);
      0 === c ? a = .5 : s === c ? a = 1 : s < 10 ? a = .2 + Math.pow(.1 * s, .4) : s > c - 10 && (a = .2 + Math.pow(.1 * (c - s), .4));
      var l = a * Math.max(.1, 1 - .1 * Math.sqrt(s));
      return isNaN(parseFloat(l)) ? .5 : l;
    }(t.x, t.y, u.x, u.y, u.l, u.x.length - 1)), u.l.push(q(t.x, t.y, u.x, u.y, u.l, u.x.length - 1))) : s.trace("ignore filtered point", t), u;
  }

  function ee(e) {
    for (var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : e.x.length, r = Z({
      color: e.color,
      width: e.width
    }), i = t; i < n; i++) Stroke(r, {
      x: e.x[i],
      y: e.y[i],
      t: e.t[i]
    });

    return r;
  }

  function te(e, t) {
    var n = void 0;
    return void 0 !== t && t >= 0 && t < e.x.length && (n = {
      x: e.x[t],
      y: e.y[t],
      t: e.t[t],
      p: e.p[t],
      l: e.l[t]
    }), n;
  }

  var ne = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  },
      re = function (e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
  },
      ie = function () {
    function e(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    return function (t, n, r) {
      return n && e(t.prototype, n), r && e(t, r), t;
    };
  }(),
      oe = function (e) {
    if (Array.isArray(e)) {
      for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];

      return n;
    }

    return Array.from(e);
  };

  function ae(e, t) {
    return {
      minX: Math.min(e.minX, t.minX),
      maxX: Math.max(e.maxX, t.maxX),
      minY: Math.min(e.minY, t.minY),
      maxY: Math.max(e.maxY, t.maxY)
    };
  }

  function se(e) {
    return {
      minX: Math.min(e.firstPoint.x, e.lastPoint.x),
      maxX: Math.max(e.firstPoint.x, e.lastPoint.x),
      minY: Math.min(e.firstPoint.y, e.lastPoint.y),
      maxY: Math.max(e.firstPoint.y, e.lastPoint.y)
    };
  }

  function ce(e) {
    var t = Math.cos(e.orientation),
        n = Math.sin(e.orientation),
        r = t,
        i = n;
    t *= e.maxRadius, r *= e.minRadius, n *= e.maxRadius, i *= e.minRadius;

    for (var o = Math.abs(e.sweepAngle) / .02, a = [], s = [], c = 0; c <= o; c++) {
      var l = e.startAngle + c / o * e.sweepAngle,
          u = Math.atan2(Math.sin(l) / e.minRadius, Math.cos(l) / e.maxRadius),
          d = Math.cos(u),
          f = Math.sin(u);
      a.push(e.center.x + (t * d - i * f)), s.push(e.center.y + (r * f + n * d));
    }

    return {
      minX: Math.min.apply(Math, a),
      maxX: Math.max.apply(Math, a),
      minY: Math.min.apply(Math, s),
      maxY: Math.max.apply(Math, s)
    };
  }

  function le(e) {
    return {
      minX: e.data.topLeftPoint.x,
      maxX: e.data.topLeftPoint.x + e.data.width,
      minY: e.data.topLeftPoint.y,
      maxY: e.data.topLeftPoint.y + e.data.height
    };
  }

  function ue(e) {
    return {
      minX: e.boundingBox.x,
      maxX: e.boundingBox.x + e.boundingBox.width,
      minY: e.boundingBox.y,
      maxY: e.boundingBox.y + e.boundingBox.height
    };
  }

  function de(e) {
    return {
      minX: Math.min.apply(Math, oe(e.x)),
      maxX: Math.max.apply(Math, oe(e.x)),
      minY: Math.min.apply(Math, oe(e.y)),
      maxY: Math.max.apply(Math, oe(e.y))
    };
  }

  function fe(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
      minX: Number.MAX_VALUE,
      maxX: Number.MIN_VALUE,
      minY: Number.MAX_VALUE,
      maxY: Number.MIN_VALUE
    };
    return t = e.filter(function (e) {
      return "stroke" === e.type;
    }).map(de).reduce(ae, t), t = e.filter(function (e) {
      return "clef" === e.type;
    }).map(ue).reduce(ae, t), t = e.filter(function (e) {
      return "line" === e.type;
    }).map(se).reduce(ae, t), t = e.filter(function (e) {
      return "ellipse" === e.type;
    }).map(ce).reduce(ae, t), t = e.filter(function (e) {
      return "textLine" === e.type;
    }).map(le).reduce(ae, t);
  }

  function he(e) {
    switch (e.recognitionParams.type) {
      case t.RecognitionType.MUSIC:
        return function (e) {
          var t = Object.assign({}, {
            type: "staff"
          }, e.recognitionParams.v3.musicParameter.staff),
              n = {
            type: "clef",
            value: Object.assign({}, e.recognitionParams.v3.musicParameter.clef)
          };
          return n.value.yAnchor = t.top + t.gap * (t.count - n.value.line), delete n.value.line, n.boundingBox = G[n.value.symbol].getBoundingBox(t.gap, 0, n.value.yAnchor), [t, n];
        }(e);

      default:
        return [];
    }
  }

  function pe(e) {
    return {
      currentStroke: void 0,
      rawStrokes: [],
      strokeGroups: [],
      lastPositions: {
        lastSentPosition: -1,
        lastReceivedPosition: -1,
        lastRenderedPosition: -1
      },
      defaultSymbols: e ? he(e) : [],
      recognizedSymbols: void 0,
      exports: void 0,
      rawResults: {
        convert: void 0,
        exports: void 0
      },
      creationTime: new Date().getTime(),
      modificationTime: void 0
    };
  }

  function ge(e) {
    var t = e;
    return t.currentStroke = void 0, t.rawStrokes = [], t.strokeGroups = [], t.lastPositions.lastSentPosition = -1, t.lastPositions.lastReceivedPosition = -1, t.lastPositions.lastRenderedPosition = -1, t.recognizedSymbols = void 0, t.exports = void 0, t.rawResults.convert = void 0, t.rawResults.exports = void 0, t;
  }

  function me(e) {
    return !!e.recognizedSymbols && e.rawStrokes.length !== e.recognizedSymbols.filter(function (e) {
      return "stroke" === e.type;
    }).length;
  }

  function ve(e, t) {
    var n = e;
    return s.debug("addStroke", t), n.rawStrokes.push(t), n;
  }

  function ye(e, t, n) {
    var r = e;
    s.debug("addStroke", t);
    var i = r.strokeGroups.length - 1;
    if (r.strokeGroups[i] && r.strokeGroups[i].penStyle === n) r.strokeGroups[i].strokes.push(t);else {
      var o = {
        penStyle: n,
        strokes: []
      },
          a = {};
      Object.assign(a, t), o.strokes.push(a), r.strokeGroups.push(o);
    }
    return r;
  }

  function be(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e.lastPositions.lastReceivedPosition + 1;
    return e.rawStrokes.slice(t);
  }

  function Ee(e, t, n) {
    var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 96;

    if (n && n["-myscript-pen-width"]) {
      var i = n["-myscript-pen-width"] * r / 25.4;
      Object.assign(n, {
        width: i / 2
      });
    }

    var o = e;
    return s.trace("initPendingStroke", t), o.currentStroke = Z(n), o.currentStroke = Stroke(o.currentStroke, t), o;
  }

  function xe(e, t) {
    var n = e;
    return n.currentStroke && (s.trace("appendToPendingStroke", t), n.currentStroke = Stroke(n.currentStroke, t)), n;
  }

  function we(e, t, n) {
    var r = e;

    if (r.currentStroke) {
      s.trace("endPendingStroke", t);
      var i = Stroke(r.currentStroke, t);
      ve(r, i), ye(r, i, n), delete r.currentStroke;
    }

    return r;
  }

  function Se(e) {
    var t = {
      minX: Number.MAX_VALUE,
      maxX: Number.MIN_VALUE,
      minY: Number.MAX_VALUE,
      maxY: Number.MIN_VALUE
    };
    return e.defaultSymbols && e.defaultSymbols.length > 0 && (t = fe(e.defaultSymbols, t)), e.recognizedSymbols && e.recognizedSymbols.length > 0 ? (t = fe(e.recognizedSymbols, t), t = fe(be(e), t)) : t = fe(e.rawStrokes, t), t;
  }

  function Te(e, t, n, r, i) {
    return e.rawStrokes.slice(t, n + 1).map(function (e, t, n) {
      return n.length < 2 ? ee(e, r, i + 1) : 0 === t ? ee(e, r) : t === n.length - 1 ? ee(e, 0, i + 1) : e;
    });
  }

  function Re(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e.rawStrokes.length - 1,
        n = e;
    return n.lastPositions.lastSentPosition = t, n;
  }

  function Ce(e) {
    var t = e;
    return t.lastPositions.lastReceivedPosition = t.lastPositions.lastSentPosition, t;
  }

  function ke(e) {
    var t = e;
    return t.lastPositions.lastSentPosition = -1, t.lastPositions.lastReceivedPosition = -1, t;
  }

  function Pe(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e.recognizedSymbols ? e.recognizedSymbols.length - 1 : -1,
        n = e;
    return n.lastPositions.lastRenderedPosition = t, n;
  }

  function Ie(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e.lastPositions.lastRenderedPosition + 1;
    return e.recognizedSymbols ? e.recognizedSymbols.slice(t) : [];
  }

  function _e(e) {
    var t = Object.assign({}, e);
    return t.defaultSymbols = [].concat(oe(e.defaultSymbols)), t.currentStroke = e.currentStroke ? Object.assign({}, e.currentStroke) : void 0, t.rawStrokes = [].concat(oe(e.rawStrokes)), t.strokeGroups = JSON.parse(JSON.stringify(e.strokeGroups)), t.lastPositions = Object.assign({}, e.lastPositions), t.exports = e.exports ? Object.assign({}, e.exports) : void 0, t.rawResults = Object.assign({}, e.rawResults), t.recognizedSymbols = e.recognizedSymbols ? [].concat(oe(e.recognizedSymbols)) : void 0, t;
  }

  function Le() {
    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];

    return t.reduce(function (e, t) {
      var n = e;
      return n.recognizedSymbols = t.recognizedSymbols, n.lastPositions.lastSentPosition = t.lastPositions.lastSentPosition, n.lastPositions.lastReceivedPosition = t.lastPositions.lastReceivedPosition, n.lastPositions.lastRenderedPosition = t.lastPositions.lastRenderedPosition, n.rawResults = t.rawResults, n.exports = t.exports, n;
    });
  }

  var Ae = Object.freeze({
    createModel: pe,
    clearModel: ge,
    needRedraw: me,
    addStroke: ve,
    addStrokeToGroup: ye,
    extractPendingStrokes: be,
    initPendingStroke: Ee,
    appendToPendingStroke: xe,
    endPendingStroke: we,
    getBorderCoordinates: Se,
    extractStrokesFromInkRange: Te,
    updateModelSentPosition: Re,
    updateModelReceivedPosition: Ce,
    resetModelPositions: ke,
    resetModelRendererPosition: function (e) {
      var t = e;
      return t.lastPositions.lastRenderedPosition = -1, t;
    },
    updateModelRenderedPosition: Pe,
    extractPendingRecognizedSymbols: Ie,
    cloneModel: _e,
    mergeModels: Le
  });

  function Me(e) {
    return function (e) {
      if (e) {
        var t = e.getContext("2d");
        return (window.devicePixelRatio || 1) / (t.webkitBackingStorePixelRatio || t.mozBackingStorePixelRatio || t.msBackingStorePixelRatio || t.oBackingStorePixelRatio || t.backingStorePixelRatio || 1);
      }

      return 1;
    }(document.createElement("canvas"));
  }

  function Oe(e, t) {
    var n = document.createElement("canvas");
    return n.classList.add(t), n.classList.add("ms-canvas"), e.appendChild(n), l.debug("canvas created", n), n;
  }

  function ze(e) {
    return [e.renderingCanvas, e.capturingCanvas].forEach(function (t) {
      var n = t.parentNode,
          r = n.clientWidth < e.minWidth ? e.minWidth : n.clientWidth,
          i = n.clientHeight < e.minHeight ? e.minHeight : n.clientHeight;
      t.width = r * e.pixelRatio, t.height = i * e.pixelRatio, t.style.width = r + "px", t.style.height = i + "px", t.getContext("2d").scale(e.pixelRatio, e.pixelRatio), l.debug("canvas size changed", t);
    }), e;
  }

  function De(e, t, n) {
    var r = t.elementType ? t.elementType : t.type;
    l.trace("attempting to draw " + r + " symbol"), "stroke" === r ? D(e, t, n) : W[r] ? function (e, t) {
      l.debug("draw " + t.type + " symbol");
      var n = e;
      n.save();

      try {
        if (n.lineWidth = t.width, n.strokeStyle = t.color, t.elementType) switch (t.elementType) {
          case W.textLine:
            Y(n, t);
            break;

          default:
            l.error(t.elementType + " not implemented");
        } else switch (t.type) {
          case W.textLine:
            Y(n, t);
            break;

          default:
            l.error(t.type + " not implemented");
        }
      } finally {
        n.restore();
      }
    }(e, t) : N[r] ? B(e, t) : F[r] ? V(e, t) : l.warn("impossible to draw " + r + " symbol");
  }

  function Ne(e, t, n) {
    e.renderingCanvasContext.clearRect(0, 0, e.renderingCanvas.width, e.renderingCanvas.height);
    var r = [].concat(oe(t.defaultSymbols));
    return t.recognizedSymbols ? (r.push.apply(r, oe(t.recognizedSymbols)), r.push.apply(r, oe(be(t)))) : r.push.apply(r, oe(t.rawStrokes)), r.forEach(function (t) {
      return De(e.renderingCanvasContext, t, n);
    }), e.capturingCanvasContext.clearRect(0, 0, e.capturingCanvas.width, e.capturingCanvas.height), t;
  }

  var He = Object.freeze({
    getInfo: function () {
      return {
        type: "canvas",
        apiVersion: "V3"
      };
    },
    attach: function (e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
          n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
      l.debug("attach renderer", e);
      var r = Me(),
          i = K();
      i.forEach(function (t) {
        return e.appendChild(t);
      });
      var o = Oe(e, "ms-rendering-canvas"),
          a = Oe(e, "ms-capture-canvas");
      return ze({
        pixelRatio: r,
        minHeight: t,
        minWidth: n,
        renderingCanvas: o,
        renderingCanvasContext: o.getContext("2d"),
        capturingCanvas: a,
        capturingCanvasContext: a.getContext("2d"),
        resources: i
      });
    },
    detach: function (e, t) {
      l.debug("detach renderer", e), t.resources.forEach(function (t) {
        return e.removeChild(t);
      }), e.removeChild(t.renderingCanvas), e.removeChild(t.capturingCanvas);
    },
    resize: function (e, t, n) {
      return this.drawModel(ze(e), t, n);
    },
    drawCurrentStroke: function (e, t, n) {
      return e.capturingCanvasContext.clearRect(0, 0, e.capturingCanvas.width, e.capturingCanvas.height), l.trace("drawing current stroke ", t.currentStroke), D(e.capturingCanvasContext, t.currentStroke, n), t;
    },
    drawModel: Ne
  });

  function Ue(e, t, n) {
    var r = e.p * n;
    return [{
      x: e.x - Math.sin(t) * r,
      y: e.y + Math.cos(t) * r
    }, {
      x: e.x + Math.sin(t) * r,
      y: e.y - Math.cos(t) * r
    }];
  }

  function Xe(e, t) {
    return {
      x: (t.x + e.x) / 2,
      y: (t.y + e.y) / 2,
      p: (t.p + e.p) / 2
    };
  }

  function je(e, t) {
    return Math.atan2(t.y - e.y, t.x - e.x);
  }

  function Be(e, t, n) {
    e.arc(t.x, t.y, n, 0, 2 * Math.PI, !0);
  }

  function We(e, t, n, r) {
    var i = Ue(t, je(t, n), r),
        o = Ue(n, je(t, n), r);
    e.moveTo(i[0].x, i[0].y), e.lineTo(o[0].x, o[0].y), e.lineTo(o[1].x, o[1].y), e.lineTo(i[1].x, i[1].y);
  }

  function Ye(e, t, n, r, i) {
    var o = Ue(t, je(t, r), i),
        a = Ue(n, je(r, n), i),
        s = Ue(r, je(t, n), i);
    e.moveTo(o[0].x, o[0].y), e.quadraticCurveTo(s[0].x, s[0].y, a[0].x, a[0].y), e.lineTo(a[1].x, a[1].y), e.quadraticCurveTo(s[1].x, s[1].y, o[1].x, o[1].y);
  }

  var Ge = Object.freeze({
    getInfo: function () {
      return {
        type: "canvas",
        name: "quadratic",
        apiVersion: "V3"
      };
    },
    drawStroke: function (e, t) {
      var n = e,
          r = t.x.length,
          i = t.width > 0 ? t.width : n.lineWidth,
          o = t.color ? t.color : n.strokeStyle,
          a = te(t, 0),
          s = r - 2;
      n.save();

      try {
        if (n.beginPath(), r < 3) Be(n, a, .6 * i);else {
          Be(n, a, i * a.p), We(n, a, Xe(a, te(t, 1)), i);

          for (var c = 0; c < s; c++) Ye(n, Xe(te(t, c), te(t, c + 1)), Xe(te(t, c + 1), te(t, c + 2)), te(t, c + 1), i);

          We(n, Xe(te(t, r - 2), te(t, r - 1)), te(t, r - 1), i), function (e, t, n, r) {
            var i = je(t, n),
                o = Ue(n, i, r);
            e.moveTo(o[0].x, o[0].y);

            for (var a = 1; a <= 6; a++) {
              var s = i - a * Math.PI / 6;
              e.lineTo(n.x - n.p * r * Math.sin(s), n.y + n.p * r * Math.cos(s));
            }
          }(n, te(t, r - 2), te(t, r - 1), i);
        }
        n.closePath(), void 0 !== o && (n.fillStyle = o, n.fill());
      } finally {
        n.restore();
      }
    }
  }),
      Fe = "http://www.w3.org/1999/xhtml",
      Ke = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: Fe,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  };

  function Ve(e) {
    var t = e += "",
        n = t.indexOf(":");
    return n >= 0 && "xmlns" !== (t = e.slice(0, n)) && (e = e.slice(n + 1)), Ke.hasOwnProperty(t) ? {
      space: Ke[t],
      local: e
    } : e;
  }

  function Je(e) {
    var t = Ve(e);
    return (t.local ? function (e) {
      return function () {
        return this.ownerDocument.createElementNS(e.space, e.local);
      };
    } : function (e) {
      return function () {
        var t = this.ownerDocument,
            n = this.namespaceURI;
        return n === Fe && t.documentElement.namespaceURI === Fe ? t.createElement(e) : t.createElementNS(n, e);
      };
    })(t);
  }

  function qe() {}

  function Ze(e) {
    return null == e ? qe : function () {
      return this.querySelector(e);
    };
  }

  function Qe() {
    return [];
  }

  var $e = function (e) {
    return function () {
      return this.matches(e);
    };
  };

  if ("undefined" != typeof document) {
    var et = document.documentElement;

    if (!et.matches) {
      var tt = et.webkitMatchesSelector || et.msMatchesSelector || et.mozMatchesSelector || et.oMatchesSelector;

      $e = function (e) {
        return function () {
          return tt.call(this, e);
        };
      };
    }
  }

  var nt = $e;

  function rt(e) {
    return new Array(e.length);
  }

  function it(e, t) {
    this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
  }

  it.prototype = {
    constructor: it,
    appendChild: function (e) {
      return this._parent.insertBefore(e, this._next);
    },
    insertBefore: function (e, t) {
      return this._parent.insertBefore(e, t);
    },
    querySelector: function (e) {
      return this._parent.querySelector(e);
    },
    querySelectorAll: function (e) {
      return this._parent.querySelectorAll(e);
    }
  };
  var ot = "$";

  function at(e, t, n, r, i, o) {
    for (var a, s = 0, c = t.length, l = o.length; s < l; ++s) (a = t[s]) ? (a.__data__ = o[s], r[s] = a) : n[s] = new it(e, o[s]);

    for (; s < c; ++s) (a = t[s]) && (i[s] = a);
  }

  function st(e, t, n, r, i, o, a) {
    var s,
        c,
        l,
        u = {},
        d = t.length,
        f = o.length,
        h = new Array(d);

    for (s = 0; s < d; ++s) (c = t[s]) && (h[s] = l = ot + a.call(c, c.__data__, s, t), l in u ? i[s] = c : u[l] = c);

    for (s = 0; s < f; ++s) (c = u[l = ot + a.call(e, o[s], s, o)]) ? (r[s] = c, c.__data__ = o[s], u[l] = null) : n[s] = new it(e, o[s]);

    for (s = 0; s < d; ++s) (c = t[s]) && u[h[s]] === c && (i[s] = c);
  }

  function ct(e, t) {
    return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
  }

  function lt(e) {
    return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
  }

  function ut(e) {
    return e.trim().split(/^|\s+/);
  }

  function dt(e) {
    return e.classList || new ft(e);
  }

  function ft(e) {
    this._node = e, this._names = ut(e.getAttribute("class") || "");
  }

  function ht(e, t) {
    for (var n = dt(e), r = -1, i = t.length; ++r < i;) n.add(t[r]);
  }

  function pt(e, t) {
    for (var n = dt(e), r = -1, i = t.length; ++r < i;) n.remove(t[r]);
  }

  function gt() {
    this.textContent = "";
  }

  function mt() {
    this.innerHTML = "";
  }

  function vt() {
    this.nextSibling && this.parentNode.appendChild(this);
  }

  function yt() {
    this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
  }

  function bt() {
    return null;
  }

  function Et() {
    var e = this.parentNode;
    e && e.removeChild(this);
  }

  function xt() {
    return this.parentNode.insertBefore(this.cloneNode(!1), this.nextSibling);
  }

  function wt() {
    return this.parentNode.insertBefore(this.cloneNode(!0), this.nextSibling);
  }

  ft.prototype = {
    add: function (e) {
      this._names.indexOf(e) < 0 && (this._names.push(e), this._node.setAttribute("class", this._names.join(" ")));
    },
    remove: function (e) {
      var t = this._names.indexOf(e);

      t >= 0 && (this._names.splice(t, 1), this._node.setAttribute("class", this._names.join(" ")));
    },
    contains: function (e) {
      return this._names.indexOf(e) >= 0;
    }
  };
  var St = {};
  "undefined" != typeof document && ("onmouseenter" in document.documentElement || (St = {
    mouseenter: "mouseover",
    mouseleave: "mouseout"
  }));

  function Tt(e, t, n) {
    return e = Rt(e, t, n), function (t) {
      var n = t.relatedTarget;
      n && (n === this || 8 & n.compareDocumentPosition(this)) || e.call(this, t);
    };
  }

  function Rt(e, t, n) {
    return function (r) {
      try {
        e.call(this, this.__data__, t, n);
      } finally {}
    };
  }

  function Ct(e) {
    return function () {
      var t = this.__on;

      if (t) {
        for (var n, r = 0, i = -1, o = t.length; r < o; ++r) n = t[r], e.type && n.type !== e.type || n.name !== e.name ? t[++i] = n : this.removeEventListener(n.type, n.listener, n.capture);

        ++i ? t.length = i : delete this.__on;
      }
    };
  }

  function kt(e, t, n) {
    var r = St.hasOwnProperty(e.type) ? Tt : Rt;
    return function (i, o, a) {
      var s,
          c = this.__on,
          l = r(t, o, a);
      if (c) for (var u = 0, d = c.length; u < d; ++u) if ((s = c[u]).type === e.type && s.name === e.name) return this.removeEventListener(s.type, s.listener, s.capture), this.addEventListener(s.type, s.listener = l, s.capture = n), void (s.value = t);
      this.addEventListener(e.type, l, n), s = {
        type: e.type,
        name: e.name,
        value: t,
        listener: l,
        capture: n
      }, c ? c.push(s) : this.__on = [s];
    };
  }

  function Pt(e, t, n) {
    var r = lt(e),
        i = r.CustomEvent;
    "function" == typeof i ? i = new i(t, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(t, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(t, !1, !1)), e.dispatchEvent(i);
  }

  var It = [null];

  function _t(e, t) {
    this._groups = e, this._parents = t;
  }

  function Lt(e, t, n) {
    n && n.drawStroke(e, t);
  }

  function At(e, t, n) {
    var r = e.ownerDocument.createElementNS("http://www.w3.org/2000/svg", "_");

    switch (r.innerHTML = n, t.toLowerCase()) {
      case "beforebegin":
        e.parentNode.insertBefore(r.firstChild, e);
        break;

      case "afterbegin":
        e.insertBefore(r.lastChild, e.firstChild);
        break;

      case "beforeend":
        e.appendChild(r.firstChild);
        break;

      case "afterend":
        e.parentNode.insertBefore(r.lastChild, e.nextSibling);
        break;

      default:
        l.warn("Invalid insertAdjacentHTML position");
    }
  }

  _t.prototype = function () {
    return new _t([[document.documentElement]], It);
  }.prototype = {
    constructor: _t,
    select: function (e) {
      "function" != typeof e && (e = Ze(e));

      for (var t = this._groups, n = t.length, r = new Array(n), i = 0; i < n; ++i) for (var o, a, s = t[i], c = s.length, l = r[i] = new Array(c), u = 0; u < c; ++u) (o = s[u]) && (a = e.call(o, o.__data__, u, s)) && ("__data__" in o && (a.__data__ = o.__data__), l[u] = a);

      return new _t(r, this._parents);
    },
    selectAll: function (e) {
      var t;
      "function" != typeof e && (e = null == (t = e) ? Qe : function () {
        return this.querySelectorAll(t);
      });

      for (var n = this._groups, r = n.length, i = [], o = [], a = 0; a < r; ++a) for (var s, c = n[a], l = c.length, u = 0; u < l; ++u) (s = c[u]) && (i.push(e.call(s, s.__data__, u, c)), o.push(s));

      return new _t(i, o);
    },
    filter: function (e) {
      "function" != typeof e && (e = nt(e));

      for (var t = this._groups, n = t.length, r = new Array(n), i = 0; i < n; ++i) for (var o, a = t[i], s = a.length, c = r[i] = [], l = 0; l < s; ++l) (o = a[l]) && e.call(o, o.__data__, l, a) && c.push(o);

      return new _t(r, this._parents);
    },
    data: function (e, t) {
      if (!e) return p = new Array(this.size()), u = -1, this.each(function (e) {
        p[++u] = e;
      }), p;
      var n,
          r = t ? st : at,
          i = this._parents,
          o = this._groups;
      "function" != typeof e && (n = e, e = function () {
        return n;
      });

      for (var a = o.length, s = new Array(a), c = new Array(a), l = new Array(a), u = 0; u < a; ++u) {
        var d = i[u],
            f = o[u],
            h = f.length,
            p = e.call(d, d && d.__data__, u, i),
            g = p.length,
            m = c[u] = new Array(g),
            v = s[u] = new Array(g);
        r(d, f, m, v, l[u] = new Array(h), p, t);

        for (var y, b, E = 0, x = 0; E < g; ++E) if (y = m[E]) {
          for (E >= x && (x = E + 1); !(b = v[x]) && ++x < g;);

          y._next = b || null;
        }
      }

      return (s = new _t(s, i))._enter = c, s._exit = l, s;
    },
    enter: function () {
      return new _t(this._enter || this._groups.map(rt), this._parents);
    },
    exit: function () {
      return new _t(this._exit || this._groups.map(rt), this._parents);
    },
    merge: function (e) {
      for (var t = this._groups, n = e._groups, r = t.length, i = n.length, o = Math.min(r, i), a = new Array(r), s = 0; s < o; ++s) for (var c, l = t[s], u = n[s], d = l.length, f = a[s] = new Array(d), h = 0; h < d; ++h) (c = l[h] || u[h]) && (f[h] = c);

      for (; s < r; ++s) a[s] = t[s];

      return new _t(a, this._parents);
    },
    order: function () {
      for (var e = this._groups, t = -1, n = e.length; ++t < n;) for (var r, i = e[t], o = i.length - 1, a = i[o]; --o >= 0;) (r = i[o]) && (a && a !== r.nextSibling && a.parentNode.insertBefore(r, a), a = r);

      return this;
    },
    sort: function (e) {
      function t(t, n) {
        return t && n ? e(t.__data__, n.__data__) : !t - !n;
      }

      e || (e = ct);

      for (var n = this._groups, r = n.length, i = new Array(r), o = 0; o < r; ++o) {
        for (var a, s = n[o], c = s.length, l = i[o] = new Array(c), u = 0; u < c; ++u) (a = s[u]) && (l[u] = a);

        l.sort(t);
      }

      return new _t(i, this._parents).order();
    },
    call: function () {
      var e = arguments[0];
      return arguments[0] = this, e.apply(null, arguments), this;
    },
    nodes: function () {
      var e = new Array(this.size()),
          t = -1;
      return this.each(function () {
        e[++t] = this;
      }), e;
    },
    node: function () {
      for (var e = this._groups, t = 0, n = e.length; t < n; ++t) for (var r = e[t], i = 0, o = r.length; i < o; ++i) {
        var a = r[i];
        if (a) return a;
      }

      return null;
    },
    size: function () {
      var e = 0;
      return this.each(function () {
        ++e;
      }), e;
    },
    empty: function () {
      return !this.node();
    },
    each: function (e) {
      for (var t = this._groups, n = 0, r = t.length; n < r; ++n) for (var i, o = t[n], a = 0, s = o.length; a < s; ++a) (i = o[a]) && e.call(i, i.__data__, a, o);

      return this;
    },
    attr: function (e, t) {
      var n = Ve(e);

      if (arguments.length < 2) {
        var r = this.node();
        return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
      }

      return this.each((null == t ? n.local ? function (e) {
        return function () {
          this.removeAttributeNS(e.space, e.local);
        };
      } : function (e) {
        return function () {
          this.removeAttribute(e);
        };
      } : "function" == typeof t ? n.local ? function (e, t) {
        return function () {
          var n = t.apply(this, arguments);
          null == n ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
        };
      } : function (e, t) {
        return function () {
          var n = t.apply(this, arguments);
          null == n ? this.removeAttribute(e) : this.setAttribute(e, n);
        };
      } : n.local ? function (e, t) {
        return function () {
          this.setAttributeNS(e.space, e.local, t);
        };
      } : function (e, t) {
        return function () {
          this.setAttribute(e, t);
        };
      })(n, t));
    },
    style: function (e, t, n) {
      return arguments.length > 1 ? this.each((null == t ? function (e) {
        return function () {
          this.style.removeProperty(e);
        };
      } : "function" == typeof t ? function (e, t, n) {
        return function () {
          var r = t.apply(this, arguments);
          null == r ? this.style.removeProperty(e) : this.style.setProperty(e, r, n);
        };
      } : function (e, t, n) {
        return function () {
          this.style.setProperty(e, t, n);
        };
      })(e, t, null == n ? "" : n)) : function (e, t) {
        return e.style.getPropertyValue(t) || lt(e).getComputedStyle(e, null).getPropertyValue(t);
      }(this.node(), e);
    },
    property: function (e, t) {
      return arguments.length > 1 ? this.each((null == t ? function (e) {
        return function () {
          delete this[e];
        };
      } : "function" == typeof t ? function (e, t) {
        return function () {
          var n = t.apply(this, arguments);
          null == n ? delete this[e] : this[e] = n;
        };
      } : function (e, t) {
        return function () {
          this[e] = t;
        };
      })(e, t)) : this.node()[e];
    },
    classed: function (e, t) {
      var n = ut(e + "");

      if (arguments.length < 2) {
        for (var r = dt(this.node()), i = -1, o = n.length; ++i < o;) if (!r.contains(n[i])) return !1;

        return !0;
      }

      return this.each(("function" == typeof t ? function (e, t) {
        return function () {
          (t.apply(this, arguments) ? ht : pt)(this, e);
        };
      } : t ? function (e) {
        return function () {
          ht(this, e);
        };
      } : function (e) {
        return function () {
          pt(this, e);
        };
      })(n, t));
    },
    text: function (e) {
      return arguments.length ? this.each(null == e ? gt : ("function" == typeof e ? function (e) {
        return function () {
          var t = e.apply(this, arguments);
          this.textContent = null == t ? "" : t;
        };
      } : function (e) {
        return function () {
          this.textContent = e;
        };
      })(e)) : this.node().textContent;
    },
    html: function (e) {
      return arguments.length ? this.each(null == e ? mt : ("function" == typeof e ? function (e) {
        return function () {
          var t = e.apply(this, arguments);
          this.innerHTML = null == t ? "" : t;
        };
      } : function (e) {
        return function () {
          this.innerHTML = e;
        };
      })(e)) : this.node().innerHTML;
    },
    raise: function () {
      return this.each(vt);
    },
    lower: function () {
      return this.each(yt);
    },
    append: function (e) {
      var t = "function" == typeof e ? e : Je(e);
      return this.select(function () {
        return this.appendChild(t.apply(this, arguments));
      });
    },
    insert: function (e, t) {
      var n = "function" == typeof e ? e : Je(e),
          r = null == t ? bt : "function" == typeof t ? t : Ze(t);
      return this.select(function () {
        return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
      });
    },
    remove: function () {
      return this.each(Et);
    },
    clone: function (e) {
      return this.select(e ? wt : xt);
    },
    datum: function (e) {
      return arguments.length ? this.property("__data__", e) : this.node().__data__;
    },
    on: function (e, t, n) {
      var r,
          i,
          o = function (e) {
        return e.trim().split(/^|\s+/).map(function (e) {
          var t = "",
              n = e.indexOf(".");
          return n >= 0 && (t = e.slice(n + 1), e = e.slice(0, n)), {
            type: e,
            name: t
          };
        });
      }(e + ""),
          a = o.length;

      if (!(arguments.length < 2)) {
        for (s = t ? kt : Ct, null == n && (n = !1), r = 0; r < a; ++r) this.each(s(o[r], t, n));

        return this;
      }

      var s = this.node().__on;

      if (s) for (var c, l = 0, u = s.length; l < u; ++l) for (r = 0, c = s[l]; r < a; ++r) if ((i = o[r]).type === c.type && i.name === c.name) return c.value;
    },
    dispatch: function (e, t) {
      return this.each(("function" == typeof t ? function (e, t) {
        return function () {
          return Pt(this, e, t.apply(this, arguments));
        };
      } : function (e, t) {
        return function () {
          return Pt(this, e, t);
        };
      })(e, t));
    }
  };

  var Mt = Object.freeze({
    getInfo: function () {
      return {
        type: "svg",
        apiVersion: "V4"
      };
    },
    attach: function (e) {
      var t,
          n = e;
      return l.debug("populate root element", n), n.style.fontSize = "10px", "string" == typeof (t = n) ? new _t([[document.querySelector(t)]], [document.documentElement]) : new _t([[t]], It);
    },
    detach: function (e, t) {
      l.debug("detach renderer", e), t.select("svg").remove();
    },
    resize: function (e, t, n, r, i) {
      var o = e.node().getBoundingClientRect(),
          a = e.selectAll("svg"),
          s = o.width < i ? i : o.width,
          c = o.height < r ? r : o.height;
      return a.attr("viewBox", "0 0 " + s + ", " + c), a.attr("width", s + "px"), a.attr("height", c + "px"), l.debug("svg viewBox changed", a), t;
    },
    drawCurrentStroke: function (e, t, n) {
      var r = t;
      return r.currentStroke.id = "pendingStroke-" + t.rawStrokes.length, l.trace("drawing current stroke ", t.currentStroke), e.select("#pendingStrokes #" + r.currentStroke.id).remove(), Lt(e.select("#pendingStrokes").append("path").attr("id", t.currentStroke.id), t.currentStroke, n), r;
    },
    drawModel: function (e, t, n) {
      var r = Ie(t);
      r && (r.forEach(function (t) {
        var n;
        (n = t).updates.forEach(function (t) {
          try {
            var r = 'svg[data-layer="' + n.layer + '"]';

            switch (t.type) {
              case "REPLACE_ALL":
                e.select(r).remove();
                var i = e.node();
                i.insertAdjacentHTML ? i.insertAdjacentHTML("beforeEnd", t.svg) : At(i, "beforeEnd", t.svg), "MODEL" === n.layer && e.select(r).append("g").attr("id", "pendingStrokes");
                break;

              case "REMOVE_ELEMENT":
                t.id.includes("s") || t.id.includes("MODEL") ? e.select("#" + t.id).remove() : (e.select("#" + t.id).attr("class", "removed-stroke"), setTimeout(function () {
                  e.select("#" + t.id).remove();
                }, 100));
                break;

              case "REPLACE_ELEMENT":
                var o = e.select("#" + t.id).node().parentNode;
                e.select("#" + t.id).remove(), o.insertAdjacentHTML ? o.insertAdjacentHTML("beforeEnd", t.svg) : (At(o, "beforeEnd", t.svg), e.node().insertAdjacentHTML("beforeEnd", e.select(r).remove().node().outerHTML));
                break;

              case "REMOVE_CHILD":
                e.select("#" + t.parentId + " > *:nth-child(" + (t.index + 1) + ")").remove();
                break;

              case "APPEND_CHILD":
                var a = e.select(t.parentId ? "#" + t.parentId : r).node();
                a.insertAdjacentHTML ? a.insertAdjacentHTML("beforeEnd", t.svg) : (At(a, "beforeEnd", t.svg), e.node().insertAdjacentHTML("beforeEnd", e.select(r).remove().node().outerHTML));
                break;

              case "INSERT_BEFORE":
                var s = e.select("#" + t.refId).node();
                s.insertAdjacentHTML ? s.insertAdjacentHTML("beforeBegin", t.svg) : (At(s, "beforeBegin", t.svg), e.node().insertAdjacentHTML("beforeEnd", e.select(r).remove().node().outerHTML));
                break;

              case "REMOVE_ATTRIBUTE":
                e.selectAll(t.id ? "#" + t.id : "svg").attr(t.name, null);
                break;

              case "SET_ATTRIBUTE":
                t.id && e.selectAll("#" + t.id).attr(t.name, t.value);
                break;

              default:
                l.debug("unknown update " + t.type + " action");
            }
          } catch (e) {
            l.error("Invalid update " + t.type, t), l.error("Error on svg patch", e);
          }
        });
      }), Pe(t));
      var i = be(t);
      return i && i.forEach(function (t) {
        return r = t, i = e.select("#pendingStrokes"), l.trace("attempting to draw " + r.type + " symbol"), void ("stroke" !== r.type || i.select("id", r.id) ? l.warn("impossible to draw " + r.type + " symbol") : Lt(i.append("path").attr("id", r.id), r, n));
        var r, i;
      }), t;
    }
  });

  function Ot(e, t, n) {
    return ["M " + t.x + "," + t.y, "m " + -n + ",0", "a " + n + "," + n + " 0 1 0 " + 2 * n + ",0", "a " + n + "," + n + " 0 1 0 " + -2 * n + ",0"].join(" ");
  }

  function zt(e, t, n, r) {
    var i = Ue(t, je(t, n), r),
        o = Ue(n, je(t, n), r);
    return ["M " + i[0].x + "," + i[0].y, "L " + o[0].x + "," + o[0].y, "L " + o[1].x + "," + o[1].y, "L " + i[1].x + "," + i[1].y].join(" ");
  }

  function Dt(e, t, n, r, i) {
    var o = Ue(t, je(t, r), i),
        a = Ue(n, je(r, n), i),
        s = Ue(r, je(t, n), i);
    return ["M " + o[0].x + "," + o[0].y, "Q " + s[0].x + "," + s[0].y + " " + a[0].x + "," + a[0].y, "L " + a[1].x + "," + a[1].y, "Q " + s[1].x + "," + s[1].y + " " + o[1].x + "," + o[1].y].join(" ");
  }

  var Nt = Object.freeze({
    getInfo: function () {
      return {
        type: "svg",
        name: "quadratic",
        apiVersion: "V4"
      };
    },
    drawStroke: function (e, t) {
      var n = t.x.length,
          r = t.width,
          i = te(t, 0),
          o = n - 2,
          a = [];
      if (n < 3) a.push(Ot(0, i, .6 * r));else {
        a.push(Ot(0, i, r * i.p)), a.push(zt(0, i, Xe(i, te(t, 1)), r));

        for (var s = 0; s < o; s++) a.push(Dt(0, Xe(te(t, s), te(t, s + 1)), Xe(te(t, s + 1), te(t, s + 2)), te(t, s + 1), r));

        a.push(zt(0, Xe(te(t, n - 2), te(t, n - 1)), te(t, n - 1), r)), a.push(function (e, t, n, r) {
          for (var i = je(t, n), o = Ue(n, i, r), a = ["M " + o[0].x + "," + o[0].y], s = 1; s <= 6; s++) {
            var c = i - s * (Math.PI / 6);
            a.push("L " + (n.x - n.p * r * Math.sin(c)) + "," + (n.y + n.p * r * Math.cos(c)));
          }

          return a.join(" ");
        }(0, te(t, n - 2), te(t, n - 1), r));
      }
      var c = a.join(" ");
      e.attr("color", t.color).style("fill", t.color).style("stroke", "transparent").classed("pending-stroke", !0).attr("d", c + "Z");
    }
  }),
      Ht = i(function (e, t) {
    var n;
    e.exports = (n = n || function (e, t) {
      var n = Object.create || function () {
        function e() {}

        return function (t) {
          var n;
          return e.prototype = t, n = new e(), e.prototype = null, n;
        };
      }(),
          r = {},
          i = r.lib = {},
          o = i.Base = {
        extend: function (e) {
          var t = n(this);
          return e && t.mixIn(e), t.hasOwnProperty("init") && this.init !== t.init || (t.init = function () {
            t.$super.init.apply(this, arguments);
          }), t.init.prototype = t, t.$super = this, t;
        },
        create: function () {
          var e = this.extend();
          return e.init.apply(e, arguments), e;
        },
        init: function () {},
        mixIn: function (e) {
          for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);

          e.hasOwnProperty("toString") && (this.toString = e.toString);
        },
        clone: function () {
          return this.init.prototype.extend(this);
        }
      },
          a = i.WordArray = o.extend({
        init: function (e, t) {
          e = this.words = e || [], this.sigBytes = void 0 != t ? t : 4 * e.length;
        },
        toString: function (e) {
          return (e || c).stringify(this);
        },
        concat: function (e) {
          var t = this.words,
              n = e.words,
              r = this.sigBytes,
              i = e.sigBytes;
          if (this.clamp(), r % 4) for (var o = 0; o < i; o++) {
            var a = n[o >>> 2] >>> 24 - o % 4 * 8 & 255;
            t[r + o >>> 2] |= a << 24 - (r + o) % 4 * 8;
          } else for (var o = 0; o < i; o += 4) t[r + o >>> 2] = n[o >>> 2];
          return this.sigBytes += i, this;
        },
        clamp: function () {
          var t = this.words,
              n = this.sigBytes;
          t[n >>> 2] &= 4294967295 << 32 - n % 4 * 8, t.length = e.ceil(n / 4);
        },
        clone: function () {
          var e = o.clone.call(this);
          return e.words = this.words.slice(0), e;
        },
        random: function (t) {
          for (var n, r = [], i = function (t) {
            var t = t,
                n = 987654321,
                r = 4294967295;
            return function () {
              var i = ((n = 36969 * (65535 & n) + (n >> 16) & r) << 16) + (t = 18e3 * (65535 & t) + (t >> 16) & r) & r;
              return i /= 4294967296, (i += .5) * (e.random() > .5 ? 1 : -1);
            };
          }, o = 0; o < t; o += 4) {
            var s = i(4294967296 * (n || e.random()));
            n = 987654071 * s(), r.push(4294967296 * s() | 0);
          }

          return new a.init(r, t);
        }
      }),
          s = r.enc = {},
          c = s.Hex = {
        stringify: function (e) {
          for (var t = e.words, n = e.sigBytes, r = [], i = 0; i < n; i++) {
            var o = t[i >>> 2] >>> 24 - i % 4 * 8 & 255;
            r.push((o >>> 4).toString(16)), r.push((15 & o).toString(16));
          }

          return r.join("");
        },
        parse: function (e) {
          for (var t = e.length, n = [], r = 0; r < t; r += 2) n[r >>> 3] |= parseInt(e.substr(r, 2), 16) << 24 - r % 8 * 4;

          return new a.init(n, t / 2);
        }
      },
          l = s.Latin1 = {
        stringify: function (e) {
          for (var t = e.words, n = e.sigBytes, r = [], i = 0; i < n; i++) {
            var o = t[i >>> 2] >>> 24 - i % 4 * 8 & 255;
            r.push(String.fromCharCode(o));
          }

          return r.join("");
        },
        parse: function (e) {
          for (var t = e.length, n = [], r = 0; r < t; r++) n[r >>> 2] |= (255 & e.charCodeAt(r)) << 24 - r % 4 * 8;

          return new a.init(n, t);
        }
      },
          u = s.Utf8 = {
        stringify: function (e) {
          try {
            return decodeURIComponent(escape(l.stringify(e)));
          } catch (e) {
            throw new Error("Malformed UTF-8 data");
          }
        },
        parse: function (e) {
          return l.parse(unescape(encodeURIComponent(e)));
        }
      },
          d = i.BufferedBlockAlgorithm = o.extend({
        reset: function () {
          this._data = new a.init(), this._nDataBytes = 0;
        },
        _append: function (e) {
          "string" == typeof e && (e = u.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes;
        },
        _process: function (t) {
          var n = this._data,
              r = n.words,
              i = n.sigBytes,
              o = this.blockSize,
              s = 4 * o,
              c = i / s,
              l = (c = t ? e.ceil(c) : e.max((0 | c) - this._minBufferSize, 0)) * o,
              u = e.min(4 * l, i);

          if (l) {
            for (var d = 0; d < l; d += o) this._doProcessBlock(r, d);

            var f = r.splice(0, l);
            n.sigBytes -= u;
          }

          return new a.init(f, u);
        },
        clone: function () {
          var e = o.clone.call(this);
          return e._data = this._data.clone(), e;
        },
        _minBufferSize: 0
      }),
          f = (i.Hasher = d.extend({
        cfg: o.extend(),
        init: function (e) {
          this.cfg = this.cfg.extend(e), this.reset();
        },
        reset: function () {
          d.reset.call(this), this._doReset();
        },
        update: function (e) {
          return this._append(e), this._process(), this;
        },
        finalize: function (e) {
          e && this._append(e);

          var t = this._doFinalize();

          return t;
        },
        blockSize: 16,
        _createHelper: function (e) {
          return function (t, n) {
            return new e.init(n).finalize(t);
          };
        },
        _createHmacHelper: function (e) {
          return function (t, n) {
            return new f.HMAC.init(e, n).finalize(t);
          };
        }
      }), r.algo = {});

      return r;
    }(Math), n);
  }),
      Ut = i(function (e, t) {
    e.exports = Ht.enc.Hex;
  }),
      Xt = (i(function (e, t) {
    var n, r, i, o, a, s;
    e.exports = (i = (r = n = Ht).lib, o = i.Base, a = i.WordArray, (s = r.x64 = {}).Word = o.extend({
      init: function (e, t) {
        this.high = e, this.low = t;
      }
    }), s.WordArray = o.extend({
      init: function (e, t) {
        e = this.words = e || [], this.sigBytes = void 0 != t ? t : 8 * e.length;
      },
      toX32: function () {
        for (var e = this.words, t = e.length, n = [], r = 0; r < t; r++) {
          var i = e[r];
          n.push(i.high), n.push(i.low);
        }

        return a.create(n, this.sigBytes);
      },
      clone: function () {
        for (var e = o.clone.call(this), t = e.words = this.words.slice(0), n = t.length, r = 0; r < n; r++) t[r] = t[r].clone();

        return e;
      }
    }), n);
  }), i(function (e, t) {
    var n;
    e.exports = (n = Ht, function () {
      var e = n,
          t = e.lib.Hasher,
          r = e.x64,
          i = r.Word,
          o = r.WordArray,
          a = e.algo;

      function s() {
        return i.create.apply(i, arguments);
      }

      var c = [s(1116352408, 3609767458), s(1899447441, 602891725), s(3049323471, 3964484399), s(3921009573, 2173295548), s(961987163, 4081628472), s(1508970993, 3053834265), s(2453635748, 2937671579), s(2870763221, 3664609560), s(3624381080, 2734883394), s(310598401, 1164996542), s(607225278, 1323610764), s(1426881987, 3590304994), s(1925078388, 4068182383), s(2162078206, 991336113), s(2614888103, 633803317), s(3248222580, 3479774868), s(3835390401, 2666613458), s(4022224774, 944711139), s(264347078, 2341262773), s(604807628, 2007800933), s(770255983, 1495990901), s(1249150122, 1856431235), s(1555081692, 3175218132), s(1996064986, 2198950837), s(2554220882, 3999719339), s(2821834349, 766784016), s(2952996808, 2566594879), s(3210313671, 3203337956), s(3336571891, 1034457026), s(3584528711, 2466948901), s(113926993, 3758326383), s(338241895, 168717936), s(666307205, 1188179964), s(773529912, 1546045734), s(1294757372, 1522805485), s(1396182291, 2643833823), s(1695183700, 2343527390), s(1986661051, 1014477480), s(2177026350, 1206759142), s(2456956037, 344077627), s(2730485921, 1290863460), s(2820302411, 3158454273), s(3259730800, 3505952657), s(3345764771, 106217008), s(3516065817, 3606008344), s(3600352804, 1432725776), s(4094571909, 1467031594), s(275423344, 851169720), s(430227734, 3100823752), s(506948616, 1363258195), s(659060556, 3750685593), s(883997877, 3785050280), s(958139571, 3318307427), s(1322822218, 3812723403), s(1537002063, 2003034995), s(1747873779, 3602036899), s(1955562222, 1575990012), s(2024104815, 1125592928), s(2227730452, 2716904306), s(2361852424, 442776044), s(2428436474, 593698344), s(2756734187, 3733110249), s(3204031479, 2999351573), s(3329325298, 3815920427), s(3391569614, 3928383900), s(3515267271, 566280711), s(3940187606, 3454069534), s(4118630271, 4000239992), s(116418474, 1914138554), s(174292421, 2731055270), s(289380356, 3203993006), s(460393269, 320620315), s(685471733, 587496836), s(852142971, 1086792851), s(1017036298, 365543100), s(1126000580, 2618297676), s(1288033470, 3409855158), s(1501505948, 4234509866), s(1607167915, 987167468), s(1816402316, 1246189591)],
          l = [];
      !function () {
        for (var e = 0; e < 80; e++) l[e] = s();
      }();
      var u = a.SHA512 = t.extend({
        _doReset: function () {
          this._hash = new o.init([new i.init(1779033703, 4089235720), new i.init(3144134277, 2227873595), new i.init(1013904242, 4271175723), new i.init(2773480762, 1595750129), new i.init(1359893119, 2917565137), new i.init(2600822924, 725511199), new i.init(528734635, 4215389547), new i.init(1541459225, 327033209)]);
        },
        _doProcessBlock: function (e, t) {
          for (var n = this._hash.words, r = n[0], i = n[1], o = n[2], a = n[3], s = n[4], u = n[5], d = n[6], f = n[7], h = r.high, p = r.low, g = i.high, m = i.low, v = o.high, y = o.low, b = a.high, E = a.low, x = s.high, w = s.low, S = u.high, T = u.low, R = d.high, C = d.low, k = f.high, P = f.low, I = h, _ = p, L = g, A = m, M = v, O = y, z = b, D = E, N = x, H = w, U = S, X = T, j = R, B = C, W = k, Y = P, G = 0; G < 80; G++) {
            var F = l[G];
            if (G < 16) var K = F.high = 0 | e[t + 2 * G],
                V = F.low = 0 | e[t + 2 * G + 1];else {
              var J = l[G - 15],
                  q = J.high,
                  Z = J.low,
                  Q = (q >>> 1 | Z << 31) ^ (q >>> 8 | Z << 24) ^ q >>> 7,
                  $ = (Z >>> 1 | q << 31) ^ (Z >>> 8 | q << 24) ^ (Z >>> 7 | q << 25),
                  ee = l[G - 2],
                  te = ee.high,
                  ne = ee.low,
                  re = (te >>> 19 | ne << 13) ^ (te << 3 | ne >>> 29) ^ te >>> 6,
                  ie = (ne >>> 19 | te << 13) ^ (ne << 3 | te >>> 29) ^ (ne >>> 6 | te << 26),
                  oe = l[G - 7],
                  ae = oe.high,
                  se = oe.low,
                  ce = l[G - 16],
                  le = ce.high,
                  ue = ce.low;
              K = (K = (K = Q + ae + ((V = $ + se) >>> 0 < $ >>> 0 ? 1 : 0)) + re + ((V += ie) >>> 0 < ie >>> 0 ? 1 : 0)) + le + ((V += ue) >>> 0 < ue >>> 0 ? 1 : 0), F.high = K, F.low = V;
            }
            var de,
                fe = N & U ^ ~N & j,
                he = H & X ^ ~H & B,
                pe = I & L ^ I & M ^ L & M,
                ge = _ & A ^ _ & O ^ A & O,
                me = (I >>> 28 | _ << 4) ^ (I << 30 | _ >>> 2) ^ (I << 25 | _ >>> 7),
                ve = (_ >>> 28 | I << 4) ^ (_ << 30 | I >>> 2) ^ (_ << 25 | I >>> 7),
                ye = (N >>> 14 | H << 18) ^ (N >>> 18 | H << 14) ^ (N << 23 | H >>> 9),
                be = (H >>> 14 | N << 18) ^ (H >>> 18 | N << 14) ^ (H << 23 | N >>> 9),
                Ee = c[G],
                xe = Ee.high,
                we = Ee.low,
                Se = W + ye + ((de = Y + be) >>> 0 < Y >>> 0 ? 1 : 0),
                Te = ve + ge;
            W = j, Y = B, j = U, B = X, U = N, X = H, N = z + (Se = (Se = (Se = Se + fe + ((de += he) >>> 0 < he >>> 0 ? 1 : 0)) + xe + ((de += we) >>> 0 < we >>> 0 ? 1 : 0)) + K + ((de += V) >>> 0 < V >>> 0 ? 1 : 0)) + ((H = D + de | 0) >>> 0 < D >>> 0 ? 1 : 0) | 0, z = M, D = O, M = L, O = A, L = I, A = _, I = Se + (me + pe + (Te >>> 0 < ve >>> 0 ? 1 : 0)) + ((_ = de + Te | 0) >>> 0 < de >>> 0 ? 1 : 0) | 0;
          }

          p = r.low = p + _, r.high = h + I + (p >>> 0 < _ >>> 0 ? 1 : 0), m = i.low = m + A, i.high = g + L + (m >>> 0 < A >>> 0 ? 1 : 0), y = o.low = y + O, o.high = v + M + (y >>> 0 < O >>> 0 ? 1 : 0), E = a.low = E + D, a.high = b + z + (E >>> 0 < D >>> 0 ? 1 : 0), w = s.low = w + H, s.high = x + N + (w >>> 0 < H >>> 0 ? 1 : 0), T = u.low = T + X, u.high = S + U + (T >>> 0 < X >>> 0 ? 1 : 0), C = d.low = C + B, d.high = R + j + (C >>> 0 < B >>> 0 ? 1 : 0), P = f.low = P + Y, f.high = k + W + (P >>> 0 < Y >>> 0 ? 1 : 0);
        },
        _doFinalize: function () {
          var e = this._data,
              t = e.words,
              n = 8 * this._nDataBytes,
              r = 8 * e.sigBytes;
          return t[r >>> 5] |= 128 << 24 - r % 32, t[30 + (r + 128 >>> 10 << 5)] = Math.floor(n / 4294967296), t[31 + (r + 128 >>> 10 << 5)] = n, e.sigBytes = 4 * t.length, this._process(), this._hash.toX32();
        },
        clone: function () {
          var e = t.clone.call(this);
          return e._hash = this._hash.clone(), e;
        },
        blockSize: 32
      });
      e.SHA512 = t._createHelper(u), e.HmacSHA512 = t._createHmacHelper(u);
    }(), n.SHA512);
  }), i(function (e, t) {
    var n, r, i, o, a, s;
    e.exports = (r = (n = Ht).lib, i = r.Base, o = n.enc, a = o.Utf8, s = n.algo, void (s.HMAC = i.extend({
      init: function (e, t) {
        e = this._hasher = new e.init(), "string" == typeof t && (t = a.parse(t));
        var n = e.blockSize,
            r = 4 * n;
        t.sigBytes > r && (t = e.finalize(t)), t.clamp();

        for (var i = this._oKey = t.clone(), o = this._iKey = t.clone(), s = i.words, c = o.words, l = 0; l < n; l++) s[l] ^= 1549556828, c[l] ^= 909522486;

        i.sigBytes = o.sigBytes = r, this.reset();
      },
      reset: function () {
        var e = this._hasher;
        e.reset(), e.update(this._iKey);
      },
      update: function (e) {
        return this._hasher.update(e), this;
      },
      finalize: function (e) {
        var t = this._hasher,
            n = t.finalize(e);
        t.reset();
        var r = t.finalize(this._oKey.clone().concat(n));
        return r;
      }
    })));
  }), i(function (e, t) {
    e.exports = Ht.HmacSHA512;
  }));

  function jt(e, t, n) {
    var r = "object" === (void 0 === e ? "undefined" : ne(e)) ? JSON.stringify(e) : e;
    return u.debug("The HmacSHA512 function is loaded", Xt), new Xt(r, t + n).toString(Ut);
  }

  function Bt(e) {
    var t = void 0;

    try {
      t = JSON.parse(e.responseText);
    } catch (n) {
      t = e.responseText;
    }

    return t;
  }

  function Wt(e, t, n) {
    var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
        i = arguments[4],
        o = arguments[5],
        a = r.editor.configuration,
        s = r;
    return new Promise(function (r, c) {
      var l = new XMLHttpRequest();
      if (l.open(e, t, !0), l.withCredentials = !0, "V3" === i) l.setRequestHeader("Accept", "application/json"), l.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");else if ("V4" === i) {
        switch (a.recognitionParams.type) {
          case "TEXT":
          case "MATH":
          case "DIAGRAM":
          case "Raw Content":
            l.setRequestHeader("Accept", "application/json," + o);
        }

        l.setRequestHeader("applicationKey", a.recognitionParams.server.applicationKey), l.setRequestHeader("hmac", jt(JSON.stringify(n), a.recognitionParams.server.applicationKey, a.recognitionParams.server.hmacKey)), l.setRequestHeader("Content-Type", "application/json");
      }
      var u,
          d,
          f = o && ("application/vnd.openxmlformats-officedocument.presentationml.presentation" === o || o.startsWith("image/png") || o.startsWith("image/jpeg"));
      f && (l.responseType = "blob"), l.onerror = function () {
        c({
          msg: "Could not connect to " + t + " connection error",
          recoverable: !1
        });
      }, l.onload = function () {
        l.status >= 200 && l.status < 300 ? r(f ? l.response : Bt(l)) : c(new Error(l.responseText));
      }, l.onreadystatechange = function () {
        4 === l.readyState && l.status >= 200 && l.status < 300 && r(f ? l.response : Bt(l));
      }, s && (s.idle = !1), "V4" === i ? l.send(JSON.stringify(n)) : l.send(n ? (u = n, d = [], Object.keys(u).forEach(function (e) {
        void 0 !== u[e] && "function" != typeof u[e] && d.push(encodeURIComponent(e) + "=" + encodeURIComponent(u[e]));
      }), d.join("&")) : void 0);
    }).then(function (e) {
      return s && (s.idle = !0), e;
    });
  }

  function Yt(e, t, n, r, i) {
    return Wt("POST", t, n, e, r, i);
  }

  function Gt(e) {
    var t = Date.now();
    return u.info("Create empty recognizer context with ID: " + t), {
      id: t,
      editor: e,
      recognitionContexts: [],
      initPromise: void 0,
      lastPositions: {
        lastSentPosition: -1,
        lastReceivedPosition: -1
      },
      url: void 0,
      websocket: void 0,
      websocketCallback: void 0,
      reconnect: void 0,
      currentReconnectionCount: 0,
      sessionId: void 0,
      contentPartCount: 0,
      currentPartId: void 0,
      instanceId: void 0,
      canUndo: !1,
      canRedo: !1,
      isEmpty: void 0,
      supportedImportMimeTypes: [],
      undoStackIndex: 0,
      possibleUndoCount: 0,
      idle: !0,
      initialized: !1
    };
  }

  function Ft(e, t) {
    return !!e.lastPositions && e.lastPositions.lastSentPosition >= t.rawStrokes.length - 1;
  }

  function Kt(e, t) {
    var n = e;
    return t && (n.lastPositions.lastSentPosition = t.lastSentPosition, n.lastPositions.lastReceivedPosition = t.lastReceivedPosition), n.lastPositions.lastSentPosition === n.lastPositions.lastReceivedPosition === -1 && delete n.instanceId, n;
  }

  function Vt(e, t) {
    var n = e;
    return n.recognitionContexts[0] = t, n;
  }

  function Jt(e) {
    return !0 === e.websocket.autoReconnect && e.currentReconnectionCount <= e.websocket.maxRetryCount;
  }

  function qt(e) {
    var t = e;
    return !0 === t.websocket.autoReconnect && t.currentReconnectionCount++ <= t.websocket.maxRetryCount;
  }

  var Zt = {
    type: "LOST_CONNECTION"
  },
      Qt = "CLOSE_RECOGNIZER",
      $t = Object.freeze({
    createEmptyRecognizerContext: Gt,
    isResetRequired: Ft,
    updateRecognitionPositions: Kt,
    setRecognitionContext: Vt,
    canReconnect: Jt,
    shouldAttemptImmediateReconnect: qt,
    LOST_CONNEXION_MESSAGE: Zt,
    CLOSE_RECOGNIZER_MESSAGE: Qt
  });

  function en(e, t, n, r) {
    var i = t.editor.configuration;
    return Yt(t, i.recognitionParams.server.scheme + "://" + i.recognitionParams.server.host + e, r(t, n), "V3").then(function (e) {
      u.debug("Cdkv3RestRecognizer success", e);
      var n = t.lastPositions;
      n.lastReceivedPosition = n.lastSentPosition;
      var r = Kt(t, n);
      return e.instanceId && (r.instanceId = e.instanceId), e;
    });
  }

  function tn(e) {
    return e.rawResults && e.rawResults.exports && e.rawResults.exports.result && e.rawResults.exports.result.textSegmentResult && e.rawResults.exports.result.textSegmentResult.candidates ? {
      CANDIDATES: e.rawResults.exports.result,
      TEXT: e.rawResults.exports.result.textSegmentResult.candidates[e.rawResults.exports.result.textSegmentResult.selectedCandidateIdx].label
    } : {};
  }

  function nn(e, n, r) {
    var i = ke(n);
    u.debug("Updated model", i);
    var o = Kt(e, i.lastPositions);
    o.initPromise = Promise.resolve(i), o.initPromise.then(function (e) {
      o.initialized = !0, u.debug("Updated recognizer context", o), r(void 0, e, t.EventType.LOADED);
    });
  }

  function rn(e, t, n) {
    var r = ke(t);
    u.debug("Updated model", r);
    var i = Kt(e, r.lastPositions);
    delete i.instanceId, u.debug("Updated recognizer context", i), n(void 0, r);
  }

  function on(e, n, r) {
    var i = ge(n);
    u.debug("Updated model", i);
    var o = Kt(e, i.lastPositions);
    delete o.instanceId, u.debug("Updated recognizer context", o), r(void 0, i, t.EventType.CHANGED, t.EventType.EXPORTED, t.EventType.RENDERED);
  }

  function an(e, t, n) {
    var r = e;
    r.initialized = !1, delete r.instanceId, n(void 0, t);
  }

  var sn = {
    types: [t.RecognitionType.TEXT],
    protocol: t.Protocol.REST,
    apiVersion: "V3",
    availableTriggers: {
      exportContent: [t.Trigger.QUIET_PERIOD, t.Trigger.DEMAND]
    }
  };

  function cn(e, t) {
    var n = e.editor.configuration,
        r = {
      inputUnits: [{
        textInputType: "MULTI_LINE_TEXT",
        components: t.rawStrokes.map(function (e) {
          return Q(e);
        })
      }]
    };
    Object.assign(r, {
      textParameter: n.recognitionParams.v3.textParameter
    }), u.debug("input.inputUnits[0].components size is " + r.inputUnits[0].components.length);
    var i = {
      instanceId: e ? e.instanceId : void 0,
      applicationKey: n.recognitionParams.server.applicationKey,
      textInput: JSON.stringify(r)
    };
    return n.recognitionParams.server.hmacKey && (i.hmac = jt(i.textInput, n.recognitionParams.server.applicationKey, n.recognitionParams.server.hmacKey)), Re(t), i;
  }

  var ln = Object.freeze({
    textRestV3Configuration: sn,
    getInfo: function () {
      return sn;
    },
    buildInput: cn,
    export_: function (e, n, r) {
      en("/api/v3.0/recognition/rest/text/doSimpleRecognition.json", e, n, cn).then(function (e) {
        return function (e, n, r) {
          u.debug("Cdkv3RestTextRecognizer result callback", e);
          var i = Ce(e);
          i.rawResults.exports = n, i.exports = tn(e), u.debug("Cdkv3RestTextRecognizer model updated", i), r(void 0, i, t.EventType.EXPORTED, t.EventType.IDLE);
        }(n, e, r);
      }).catch(function (e) {
        return r(e, n);
      });
    },
    init: nn,
    close: an,
    clear: on,
    reset: rn
  });

  function un(e) {
    return e.rawResults && e.rawResults.exports && e.rawResults.exports.result && e.rawResults.exports.result.results && e.rawResults.exports.result.results.length > 0 ? e.rawResults.exports.result.results.map(function (e) {
      var t = {};
      return Object.keys(e).includes("root") ? t["" + e.type] = e.root : t["" + e.type] = e.value, t;
    }).reduce(function (e, t) {
      return Object.assign(e, t);
    }, {}) : {};
  }

  function dn(e) {
    var t = [].concat(oe(e.rawStrokes));

    if (e.rawResults && e.rawResults.exports && e.rawResults.exports.result && e.rawResults.exports.result.scratchOutResults && e.rawResults.exports.result.scratchOutResults.length > 0) {
      var n = e.rawResults.exports.result.scratchOutResults.map(function (e) {
        return e.erasedInkRanges.concat(e.inkRanges);
      }).reduce(function (e, t) {
        return e.concat(t);
      });
      return t.filter(function (e, t) {
        return !n.find(function (e) {
          return e.component === t;
        });
      });
    }

    return t;
  }

  var fn = {
    types: [t.RecognitionType.MATH],
    protocol: t.Protocol.REST,
    apiVersion: "V3",
    availableTriggers: {
      exportContent: [t.Trigger.QUIET_PERIOD, t.Trigger.DEMAND]
    }
  };

  function hn(e, t) {
    var n = e.editor.configuration,
        r = {
      components: t.rawStrokes.map(function (e) {
        return Q(e);
      })
    };
    Object.assign(r, n.recognitionParams.v3.mathParameter), u.debug("input.components size is " + r.components.length);
    var i = {
      instanceId: e ? e.instanceId : void 0,
      applicationKey: n.recognitionParams.server.applicationKey,
      mathInput: JSON.stringify(r)
    };
    return n.recognitionParams.server.hmacKey && (i.hmac = jt(i.mathInput, n.recognitionParams.server.applicationKey, n.recognitionParams.server.hmacKey)), Re(t), i;
  }

  var pn = Object.freeze({
    mathRestV3Configuration: fn,
    getInfo: function () {
      return fn;
    },
    export_: function (e, n, r) {
      return en("/api/v3.0/recognition/rest/math/doSimpleRecognition.json", e, n, hn).then(function (e) {
        return function (e, n, r) {
          u.debug("Cdkv3RestMathRecognizer result callback", e);
          var i = Ce(e);
          i.rawResults.exports = n, i.recognizedSymbols = dn(e), i.exports = un(e), u.debug("Cdkv3RestMathRecognizer model updated", i), r(void 0, i, t.EventType.EXPORTED, t.EventType.IDLE);
        }(n, e, r);
      }).catch(function (e) {
        return r(e, n);
      });
    },
    init: nn,
    close: an,
    clear: on,
    reset: rn
  });

  function gn(e, t) {
    var n = e.rawStrokes;
    return t && t.length > 0 && (n = t.map(function (t) {
      return Te(e, t.stroke ? t.stroke : t.firstStroke, t.stroke ? t.stroke : t.lastStroke, t.firstPoint, t.lastPoint);
    }).reduce(function (e, t) {
      return e.concat(t);
    })), {
      color: n[0].color,
      width: n[0].width
    };
  }

  function mn(e, t) {
    if (t.candidates && t.candidates.length > 0) {
      var n = t.candidates[t.selectedCandidateIndex];

      switch (n.type) {
        case "notRecognized":
          return t.inkRanges && t.inkRanges.length > 0 ? t.inkRanges.map(function (t) {
            return Te(e, t.firstStroke, t.lastStroke, t.firstPoint, t.lastPoint);
          }).reduce(function (e, t) {
            return e.concat(t);
          }) : [];

        case "recognizedShape":
          return n.primitives;

        default:
          return [];
      }
    }

    return [];
  }

  var vn = {
    types: [t.RecognitionType.ANALYZER],
    protocol: t.Protocol.REST,
    apiVersion: "V3",
    availableTriggers: {
      exportContent: [t.Trigger.QUIET_PERIOD, t.Trigger.DEMAND]
    }
  };

  function yn(e, t) {
    var n = e.editor.configuration,
        r = {
      components: t.rawStrokes.map(function (e) {
        return Q(e);
      })
    };
    Object.assign(r, {
      parameter: n.recognitionParams.v3.analyzerParameter
    }), u.debug("input.components size is " + r.components.length);
    var i = {
      instanceId: e ? e.instanceId : void 0,
      applicationKey: n.recognitionParams.server.applicationKey,
      analyzerInput: JSON.stringify(r)
    };
    return n.recognitionParams.server.hmacKey && (i.hmac = jt(i.analyzerInput, n.recognitionParams.server.applicationKey, n.recognitionParams.server.hmacKey)), Re(t), i;
  }

  function bn(e) {
    return e.rawResults && e.rawResults.exports && e.rawResults.exports.result ? [].concat(oe(e.rawResults.exports.result.shapes), oe(e.rawResults.exports.result.tables), oe(e.rawResults.exports.result.textLines)).map(function (t) {
      return function (e, t) {
        var n = gn(e, t.inkRanges);

        switch (t.elementType) {
          case "table":
            return t.lines.map(function (e) {
              return Object.assign(e, n);
            });

          case "textLine":
            return [t].map(function (e) {
              return Object.assign(e, e.result.textSegmentResult.candidates[e.result.textSegmentResult.selectedCandidateIdx], n);
            });

          case "shape":
            return mn(e, t).map(function (e) {
              return Object.assign(e, n);
            });

          default:
            return [];
        }
      }(e, t);
    }).reduce(function (e, t) {
      return e.concat(t);
    }) : [];
  }

  var En = Object.freeze({
    analyzerRestV3Configuration: vn,
    getInfo: function () {
      return vn;
    },
    export_: function (e, n, r) {
      return en("/api/v3.0/recognition/rest/analyzer/doSimpleRecognition.json", e, n, yn).then(function (e) {
        return function (e, n, r) {
          u.debug("Cdkv3RestAnalyzerRecognizer result callback", e);
          var i = Ce(e);
          i.rawResults.exports = n, i.recognizedSymbols = bn(e), i.exports = function (e) {
            return e.rawResults && e.rawResults.exports && e.rawResults.exports.result ? {
              ANALYSIS: e.rawResults.exports.result
            } : {};
          }(e), u.debug("Cdkv3RestAnalyzerRecognizer model updated", i), r(void 0, i, t.EventType.EXPORTED, t.EventType.CONVERTED, t.EventType.IDLE);
        }(n, e, r);
      }).catch(function (e) {
        return r(e, n);
      });
    },
    init: nn,
    close: an,
    clear: on,
    reset: rn
  }),
      xn = {
    types: [t.RecognitionType.SHAPE],
    protocol: t.Protocol.REST,
    apiVersion: "V3",
    availableTriggers: {
      exportContent: [t.Trigger.QUIET_PERIOD, t.Trigger.DEMAND]
    }
  };

  function wn(e, t) {
    var n = e.editor.configuration,
        r = {
      components: be(t).map(function (e) {
        return Q(e);
      })
    };
    Object.assign(r, n.recognitionParams.v3.shapeParameter), u.debug("input.components size is " + r.components.length);
    var i = {
      instanceId: e ? e.instanceId : void 0,
      applicationKey: n.recognitionParams.server.applicationKey,
      shapeInput: JSON.stringify(r)
    };
    return n.recognitionParams.server.hmacKey && (i.hmac = jt(i.shapeInput, n.recognitionParams.server.applicationKey, n.recognitionParams.server.hmacKey)), Re(t), i;
  }

  function Sn(e, t) {
    return {
      instanceSessionId: e ? e.instanceId : void 0
    };
  }

  function Tn(e, n, r) {
    u.debug("Cdkv3RestShapeRecognizer result callback", e);
    var i = Ce(e);
    i.rawResults.exports = n, i.recognizedSymbols = function (e) {
      return e.rawResults && e.rawResults.exports && e.rawResults.exports.result && e.rawResults.exports.result.segments ? e.rawResults.exports.result.segments.map(function (t) {
        var n = gn(e, t.inkRanges);
        return mn(e, t).map(function (e) {
          return Object.assign(e, n);
        });
      }).reduce(function (e, t) {
        return e.concat(t);
      }) : [];
    }(e), i.exports = function (e) {
      return e.rawResults && e.rawResults.exports && e.rawResults.exports.result && e.rawResults.exports.result.segments ? {
        SEGMENTS: e.rawResults.exports.result.segments
      } : {};
    }(e), u.debug("Cdkv3RestShapeRecognizer model updated", i), r(void 0, i, t.EventType.EXPORTED, t.EventType.CONVERTED, t.EventType.IDLE);
  }

  var Rn = Object.freeze({
    shapeRestV3Configuration: xn,
    getInfo: function () {
      return xn;
    },
    export_: function (e, t, n) {
      en("/api/v3.0/recognition/rest/shape/doSimpleRecognition.json", e, t, wn).then(function (e) {
        return Tn(t, e, n);
      }).catch(function (e) {
        return n(e, t);
      });
    },
    reset: function (e, n, r) {
      var i = ke(n);
      en("/api/v3.0/recognition/rest/shape/clearSessionId.json", e, i, Sn).then(function (e) {
        return r(void 0, i, t.EventType.IDLE);
      }).catch(function (e) {
        return r(e, i);
      });
    },
    clear: function (e, n, r) {
      var i = ge(_e(n));
      en("/api/v3.0/recognition/rest/shape/clearSessionId.json", e, i, Sn).then(function (e) {
        return r(void 0, i, t.EventType.CHANGED, t.EventType.EXPORTED, t.EventType.CONVERTED, t.EventType.IDLE);
      }).catch(function (e) {
        return r(e, i);
      });
    },
    init: nn,
    close: an
  }),
      Cn = {
    types: [t.RecognitionType.MUSIC],
    protocol: t.Protocol.REST,
    apiVersion: "V3",
    availableTriggers: {
      exportContent: [t.Trigger.QUIET_PERIOD, t.Trigger.DEMAND]
    }
  };

  function kn(e, t) {
    var n = e.editor.configuration,
        r = {
      components: [].concat(t.defaultSymbols, t.rawStrokes).filter(function (e) {
        return "staff" !== e.type;
      }).map(function (e) {
        return "stroke" === e.type ? Q(e) : e;
      })
    },
        i = Object.assign({}, n.recognitionParams.v3.musicParameter);
    delete i.clef, Object.assign(r, i), u.debug("input.components size is " + r.components.length);
    var o = {
      instanceId: e ? e.instanceId : void 0,
      applicationKey: n.recognitionParams.server.applicationKey,
      musicInput: JSON.stringify(r)
    };
    return n.recognitionParams.server.hmacKey && (o.hmac = jt(o.musicInput, n.recognitionParams.server.applicationKey, n.recognitionParams.server.hmacKey)), Re(t), o;
  }

  var Pn = Object.freeze({
    musicRestV3Configuration: Cn,
    getInfo: function () {
      return Cn;
    },
    init: function (e, n, r) {
      var i = ke(n);
      u.debug("Updated model", i);
      var o = Kt(e, i.lastPositions);
      o.initPromise = Promise.resolve(i), o.initPromise.then(function (e) {
        o.initialized = !0, u.debug("Updated recognizer context", o), r(void 0, e, t.EventType.LOADED, t.EventType.RENDERED);
      });
    },
    export_: function (e, n, r) {
      en("/api/v3.0/recognition/rest/music/doSimpleRecognition.json", e, n, kn).then(function (e) {
        return function (e, n, r) {
          u.debug("Cdkv3RestMusicRecognizer result callback", e);
          var i = Ce(e);
          i.rawResults.exports = n, i.exports = un(e), u.debug("Cdkv3RestMusicRecognizer model updated", i), r(void 0, i, t.EventType.EXPORTED, t.EventType.IDLE);
        }(n, e, r);
      }).catch(function (e) {
        return r(e, n);
      });
    },
    close: an,
    clear: on,
    reset: rn
  }),
      In = {
    types: [t.RecognitionType.TEXT, t.RecognitionType.DIAGRAM, t.RecognitionType.MATH, t.RecognitionType.RAWCONTENT],
    protocol: t.Protocol.REST,
    apiVersion: "V4",
    availableTriggers: {
      exportContent: [t.Trigger.QUIET_PERIOD, t.Trigger.DEMAND]
    }
  };

  function _n(e, t, n, r) {
    var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "",
        o = arguments[5],
        a = t.editor.configuration;
    return Yt(t, a.recognitionParams.server.scheme + "://" + a.recognitionParams.server.host + e, r(t, n, i), "V4", o).then(function (e) {
      u.debug("iinkRestRecognizer success", e);
      var n = t.lastPositions;
      n.lastReceivedPosition = n.lastSentPosition;
      var r = Kt(t, n);
      return e.instanceId && (r.instanceId = e.instanceId), e;
    });
  }

  function Ln(e, t, n) {
    var r = e.editor.configuration,
        i = void 0;
    "TEXT" === r.recognitionParams.type ? i = function (e) {
      return {
        text: e.recognitionParams.v4.text,
        lang: e.recognitionParams.v4.lang,
        export: e.recognitionParams.v4.export
      };
    }(r) : "MATH" === r.recognitionParams.type ? i = function (e) {
      return {
        math: e.recognitionParams.v4.math,
        lang: e.recognitionParams.v4.lang,
        export: e.recognitionParams.v4.export
      };
    }(r) : "DIAGRAM" === r.recognitionParams.type ? i = function (e) {
      return {
        diagram: e.recognitionParams.v4.diagram,
        lang: e.recognitionParams.v4.lang,
        export: e.recognitionParams.v4.export
      };
    }(r) : "Raw Content" === r.recognitionParams.type && (i = function (e) {
      return {
        "raw-content": {
          recognition: e.recognitionParams.v4["raw-content"].recognition
        },
        lang: e.recognitionParams.v4.lang,
        export: e.recognitionParams.v4.export
      };
    }(r));
    var o = [];
    t.strokeGroups.forEach(function (e) {
      var t = {
        penStyle: "{}" === JSON.stringify(e.penStyle) ? null : P(e.penStyle),
        strokes: e.strokes.map(function (e) {
          return function (e) {
            return {
              x: e.x,
              y: e.y,
              t: e.t
            };
          }(e);
        })
      };
      o.push(t);
    });
    var a = {
      configuration: i,
      xDPI: 96,
      yDPI: 96,
      contentType: "Raw Content" === r.recognitionParams.type ? "Raw Content" : r.recognitionParams.type.charAt(0).toUpperCase() + r.recognitionParams.type.slice(1).toLowerCase(),
      theme: L(e.editor.theme),
      strokeGroups: o
    };
    return e.editor.domElement && (a.height = e.editor.domElement.clientHeight, a.width = e.editor.domElement.clientWidth), n && (a.conversionState = "DIGITAL_EDIT"), Re(t), a;
  }

  function An(e, t, n) {
    var r = {};
    return r[t] = n, r;
  }

  function Mn(e, n, r, i, o) {
    u.debug("iinkRestRecognizer result callback", e);
    var a = Ce(e);
    a.rawResults.exports = r, a.exports ? Object.assign(a.exports, An(0, i, r)) : a.exports = An(0, i, r), u.debug("iinkRestRecognizer model updated", a), o(void 0, a, t.EventType.EXPORTED, t.EventType.IDLE);
  }

  var On = Object.freeze({
    iinkRestConfiguration: In,
    getInfo: function () {
      return In;
    },
    postMessage: _n,
    export_: function (e, t, n, r) {
      var i = e.editor.configuration;

      function o(r) {
        _n("/api/v4.0/iink/batch", e, t, Ln, i.restConversionState, r).then(function (e) {
          Mn(t, 0, e, r, n);
        }).catch(function (e) {
          n(e, t);
        });
      }

      r ? r.forEach(function (e) {
        o(e);
      }) : "TEXT" === i.recognitionParams.type ? i.recognitionParams.v4.text.mimeTypes.forEach(function (e) {
        o(e);
      }) : "DIAGRAM" === i.recognitionParams.type ? i.recognitionParams.v4.diagram.mimeTypes.forEach(function (e) {
        o(e);
      }) : "MATH" === i.recognitionParams.type ? i.recognitionParams.v4.math.mimeTypes.forEach(function (e) {
        o(e);
      }) : "Raw Content" === i.recognitionParams.type && i.recognitionParams.v4["raw-content"].mimeTypes.forEach(function (e) {
        o(e);
      });
    },
    convert: function (e, t, n) {
      e.editor.configuration, _n("/api/v4.0/iink/batch", e, t, Ln, "DIGITAL_EDIT").then(function (e) {
        return Mn(t, 0, e, n);
      }).catch(function (e) {
        return n(e, t);
      });
    },
    init: nn,
    close: an,
    clear: on,
    reset: rn
  });

  function zn(e) {
    var t = void 0;

    try {
      t = new WebSocket(e.url);
    } catch (e) {
      u.error("Unable to open websocket, Check the host and your connectivity");
    }

    return function (e, t) {
      var n = t.editor.configuration.recognitionParams.server.websocket,
          r = e;
      r.start = new Date(), r.autoReconnect = n.autoReconnect, r.maxRetryCount = n.maxRetryCount, r.pingEnabled = n.pingEnabled, r.pingDelay = n.pingDelay, r.maxPingLost = n.maxPingLostCount, r.pingLostCount = 0, r.recognizerContext = t;
    }(t, e), t.pingEnabled && function e(t) {
      var n = t;
      n.pingLostCount++, n.pingLostCount > n.maxPingLost ? t.close(1e3, "PING_LOST") : n.readyState <= 1 && setTimeout(function () {
        n.readyState <= 1 && (n.send(JSON.stringify({
          type: "ping"
        })), e(n));
      }, n.pingDelay);
    }(t), t.onopen = function (t) {
      u.trace("onOpen"), e.websocketCallback(t);
    }, t.onclose = function (n) {
      u.trace("onClose", new Date() - t.start), e.websocketCallback(n);
    }, t.onerror = function (t) {
      u.trace("onError"), e.websocketCallback(t);
    }, t.onmessage = function (n) {
      if (u.trace("onMessage"), t.pingLostCount = 0, "pong" !== JSON.parse(n.data).type) {
        var r = {
          type: n.type,
          data: JSON.parse(n.data)
        };
        e.websocketCallback(r);
      }
    }, t;
  }

  function Dn(e, t) {
    var n = e;
    n.idle = !1;
    var r = n.websocket;
    if (!(r.readyState <= 1)) throw Zt;
    r.send(JSON.stringify(t)), u.debug(t.type + " message sent", t);
  }

  function Nn(e, t) {
    return function (n) {
      var r = t;
      u.trace(n.type + " websocket callback", n);
      var i = t.recognitionContexts[t.recognitionContexts.length - 1];

      switch (u.debug("Current recognition context", i), n.type) {
        case "open":
          Dn(t, {
            type: "applicationKey",
            applicationKey: t.editor.configuration.recognitionParams.server.applicationKey
          });
          break;

        case "message":
          switch (u.trace("Receiving message", n.data.type), n.data.type) {
            case "hmacChallenge":
              Dn(t, function (e, t) {
                return {
                  type: "hmac",
                  applicationKey: e.recognitionParams.server.applicationKey,
                  challenge: t.data.challenge,
                  hmac: jt(t.data.challenge, e.recognitionParams.server.applicationKey, e.recognitionParams.server.hmacKey)
                };
              }(t.editor.configuration, n));
              break;

            case "init":
              r.currentReconnectionCount = 0, r.idle = !0, r.initialized = !0, i.callback(void 0, n.data), e.resolve(i);
              break;

            case "reset":
              r.idle = !0, i.callback(void 0, n.data);
              break;

            case "mathResult":
            case "textResult":
              r.idle = !0, n.data.instanceId && (t.instanceId && t.instanceId !== n.data.instanceId && u.debug("Instance id switch from " + t.instanceId + " to " + n.data.instanceId + " this is suspicious"), r.instanceId = n.data.instanceId, u.debug("Memorizing instance id", n.data.instanceId)), i.callback(void 0, n.data);
              break;

            case "error":
              u.debug("Error detected stopping all recognition", n), i ? i.callback(n.data) : e.reject(Object.assign({}, n.data, {
                recoverable: !1
              }));
              break;

            default:
              u.warn("This is something unexpected in current recognizer. Not the type of message we should have here.", n);
          }

          break;

        case "error":
          u.debug("Error detected stopping all recognition", n), i ? i.callback(Object.assign({}, n, {
            recoverable: !1
          })) : e.reject(Object.assign({}, n, {
            recoverable: !1
          }));
          break;

        case "close":
          u.debug("Close detected stopping all recognition", n), r.initialized = !1, i ? i.callback(void 0, n) : e.reject(n);
          break;

        default:
          u.warn("This is something unexpected in current recognizer. Not the type of message we should have here.", n);
      }
    };
  }

  var Hn = function (e, n, r, i) {
    return r && "close" === r.type ? i(n, e, t.EventType.CHANGED) : i(n, e);
  };

  function Un(e, t, n, r) {
    var i = Kt(t, t.recognitionContexts[0].model.lastPositions);
    i.url = function (e, t) {
      return ("https" === e.recognitionParams.server.scheme ? "wss" : "ws") + "://" + e.recognitionParams.server.host + t;
    }(t.editor.configuration, e), i.reconnect = r;
    var o,
        a,
        s = (o = void 0, a = void 0, {
      promise: new Promise(function (e, t) {
        o = e, a = t;
      }),
      resolve: o,
      reject: a
    });
    return i.initPromise = s.promise, u.debug("Opening the websocket for context ", t), i.websocketCallback = n(s, i), i.websocket = zn(i), i.initPromise.then(function (e) {
      return u.debug("Init over", e), e;
    });
  }

  function Xn(e, t, n, r) {
    for (var i = arguments.length, o = Array(i > 4 ? i - 4 : 0), a = 4; a < i; a++) o[a - 4] = arguments[a];

    qt(t) && t.reconnect ? (u.info("Attempting a retry", t.currentReconnectionCount), t.reconnect(t, n, function (i, a) {
      i ? (u.error("Failed retry", i), Xn.apply(void 0, [e, t, n, r].concat(o))) : e.apply(void 0, [t, a, r].concat(o));
    })) : r("Unable to reconnect", n);
  }

  function jn(e, t) {
    for (var n = arguments.length, r = Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++) r[i - 2] = arguments[i];

    return e.initPromise.then(function () {
      u.trace("Init was done. Sending message");
      var n = t.apply(void 0, r);

      if (n) {
        Dn(e, n);
        var i = e.recognitionContexts[0].model.lastPositions;
        i && Kt(e, i);
      } else u.warn("empty message");
    });
  }

  function Bn(e, t, n) {
    var r = {
      model: t,
      callback: function (e, r) {
        return Hn(t, e, r, n);
      }
    },
        i = e;
    e.initPromise.then(function () {
      return i.recognitionContexts[0] = r, i;
    }).then(function (e) {
      return t = 1e3, n = Qt, void ((r = e.websocket) && r.readyState < 2 && r.close(t, n));
      var t, n, r;
    });
  }

  var Wn = {
    types: [t.RecognitionType.MATH],
    protocol: t.Protocol.WEBSOCKET,
    apiVersion: "V3",
    availableTriggers: {
      exportContent: [t.Trigger.POINTER_UP]
    }
  };

  function Yn(e, t) {
    return Re(t), e.lastPositions.lastSentPosition < 0 ? {
      type: "start",
      parameters: e.editor.configuration.recognitionParams.v3.mathParameter,
      components: t.rawStrokes.map(function (e) {
        return Q(e);
      })
    } : {
      type: "continue",
      components: be(t, -1).map(function (e) {
        return Q(e);
      })
    };
  }

  function Gn(e) {
    return ke(e), {
      type: "reset"
    };
  }

  var Fn = function (e, n, r, i) {
    if (r) {
      if ("init" === r.type) return i(n, e, t.EventType.LOADED, t.EventType.IDLE);
      if ("close" === r.type) return i(n, e, t.EventType.CHANGED);
      var o = Ce(e);
      return o.rawResults.exports = r, o.exports = un(o), o.recognizedSymbols = dn(o), i(n, o, t.EventType.EXPORTED, t.EventType.IDLE);
    }

    return i(n, e);
  };

  function Kn(e, t, n) {
    jn(Vt(e, {
      model: t,
      callback: function (e, r) {
        return Fn(t, e, r, n);
      }
    }), Gn, t).catch(function (r) {
      return Xn(Kn, e, t, n);
    });
  }

  var Vn = Object.freeze({
    init: function e(t, n, r) {
      Un("/api/v3.0/recognition/ws/math", Vt(t, {
        model: ke(n),
        callback: function (e, t) {
          return Fn(n, e, t, r);
        }
      }), Nn, e).catch(function (e) {
        qt(t) && t.reconnect ? (u.info("Attempting a reconnect", t.currentReconnectionCount), t.reconnect(t, n, r)) : (u.error("Unable to init", e), r(e, n));
      });
    },
    export_: function e(t, n, r) {
      jn(Vt(t, {
        model: n,
        callback: function (e, t) {
          return Fn(n, e, t, r);
        }
      }), Yn, t, n).catch(function (i) {
        return Xn(e, t, n, r);
      });
    },
    reset: Kn,
    mathWebSocketV3Configuration: Wn,
    getInfo: function () {
      return Wn;
    },
    clear: function (e, t, n) {
      on(e, t, function (t, r) {
        for (var i = arguments.length, o = Array(i > 2 ? i - 2 : 0), a = 2; a < i; a++) o[a - 2] = arguments[a];

        Kn(e, r, function (e, t) {
          return u.trace("Session reset");
        }), n.apply(void 0, [t, r].concat(o));
      });
    },
    close: Bn
  }),
      Jn = {
    types: [t.RecognitionType.TEXT],
    protocol: t.Protocol.WEBSOCKET,
    apiVersion: "V3",
    availableTriggers: {
      exportContent: [t.Trigger.POINTER_UP]
    }
  };

  function qn(e, t) {
    return Re(t), e.lastPositions.lastSentPosition < 0 ? {
      type: "start",
      textParameter: e.editor.configuration.recognitionParams.v3.textParameter,
      inputUnits: [{
        textInputType: "MULTI_LINE_TEXT",
        components: t.rawStrokes.map(function (e) {
          return Q(e);
        })
      }]
    } : {
      type: "continue",
      inputUnits: [{
        textInputType: "MULTI_LINE_TEXT",
        components: be(t, -1).map(function (e) {
          return Q(e);
        })
      }]
    };
  }

  function Zn(e) {
    return ke(e), {
      type: "reset"
    };
  }

  var Qn = function (e, n, r, i) {
    if (r) {
      if ("init" === r.type) return i(n, e, t.EventType.LOADED, t.EventType.IDLE);
      if ("close" === r.type) return i(n, e, t.EventType.CHANGED);
      var o = Ce(e);
      return o.rawResults.exports = r, o.exports = tn(e), i(n, o, t.EventType.EXPORTED, t.EventType.IDLE);
    }

    return i(n, e);
  };

  function $n(e, t, n) {
    jn(Vt(e, {
      model: t,
      callback: function (e, r) {
        return Qn(t, e, r, n);
      }
    }), Zn, t).catch(function (r) {
      return Xn($n, e, t, n);
    });
  }

  var er = Object.freeze({
    init: function e(t, n, r) {
      Un("/api/v3.0/recognition/ws/text", Vt(t, {
        model: ke(n),
        callback: function (e, t) {
          return Qn(n, e, t, r);
        }
      }), Nn, e).catch(function (e) {
        qt(t) && t.reconnect ? (u.info("Attempting a reconnect", t.currentReconnectionCount), t.reconnect(t, n, r)) : (u.error("Unable to init", e), r(e, n));
      });
    },
    export_: function e(t, n, r) {
      jn(Vt(t, {
        model: n,
        callback: function (e, t) {
          return Qn(n, e, t, r);
        }
      }), qn, t, n).catch(function (i) {
        return Xn(e, t, n, r);
      });
    },
    reset: $n,
    textWebSocketV3Configuration: Jn,
    getInfo: function () {
      return Jn;
    },
    clear: function (e, t, n) {
      on(e, t, function (t, r) {
        for (var i = arguments.length, o = Array(i > 2 ? i - 2 : 0), a = 2; a < i; a++) o[a - 2] = arguments[a];

        $n(e, r, function (e, t) {
          return u.trace("Session reset");
        }), n.apply(void 0, [t, r].concat(o));
      });
    },
    close: Bn
  });

  function tr() {}

  function nr(e, t) {
    return Math.floor(Math.random() * (t - e + 1)) + e;
  }

  tr.maxFromBits = function (e) {
    return Math.pow(2, e);
  }, tr.limitUI04 = tr.maxFromBits(4), tr.limitUI06 = tr.maxFromBits(6), tr.limitUI08 = tr.maxFromBits(8), tr.limitUI12 = tr.maxFromBits(12), tr.limitUI14 = tr.maxFromBits(14), tr.limitUI16 = tr.maxFromBits(16), tr.limitUI32 = tr.maxFromBits(32), tr.limitUI40 = tr.maxFromBits(40), tr.limitUI48 = tr.maxFromBits(48), tr.randomUI04 = function () {
    return nr(0, tr.limitUI04 - 1);
  }, tr.randomUI06 = function () {
    return nr(0, tr.limitUI06 - 1);
  }, tr.randomUI08 = function () {
    return nr(0, tr.limitUI08 - 1);
  }, tr.randomUI12 = function () {
    return nr(0, tr.limitUI12 - 1);
  }, tr.randomUI14 = function () {
    return nr(0, tr.limitUI14 - 1);
  }, tr.randomUI16 = function () {
    return nr(0, tr.limitUI16 - 1);
  }, tr.randomUI32 = function () {
    return nr(0, tr.limitUI32 - 1);
  }, tr.randomUI40 = function () {
    return (0 | Math.random() * (1 << 30)) + (0 | 1024 * Math.random()) * (1 << 30);
  }, tr.randomUI48 = function () {
    return (0 | Math.random() * (1 << 30)) + (0 | Math.random() * (1 << 18)) * (1 << 30);
  }, tr.paddedString = function (e, t, n) {
    e = String(e), n = n || "0";

    for (var r = t - e.length; r > 0; r >>>= 1, n += n) 1 & r && (e = n + e);

    return e;
  }, tr.prototype.fromParts = function (e, t, n, r, i, o) {
    return this.version = n >> 12 & 15, this.hex = tr.paddedString(e.toString(16), 8) + "-" + tr.paddedString(t.toString(16), 4) + "-" + tr.paddedString(n.toString(16), 4) + "-" + tr.paddedString(r.toString(16), 2) + tr.paddedString(i.toString(16), 2) + "-" + tr.paddedString(o.toString(16), 12), this;
  }, tr.prototype.toString = function () {
    return this.hex;
  }, tr.prototype.toURN = function () {
    return "urn:uuid:" + this.hex;
  }, tr.prototype.toBytes = function () {
    for (var e = this.hex.split("-"), t = [], n = 0, r = 0; r < e.length; r++) for (var i = 0; i < e[r].length; i += 2) t[n++] = parseInt(e[r].substr(i, 2), 16);

    return t;
  }, tr.prototype.equals = function (e) {
    return e instanceof UUID && this.hex === e.hex;
  }, tr.getTimeFieldValues = function (e) {
    var t = e - Date.UTC(1582, 9, 15),
        n = t / 4294967296 * 1e4 & 268435455;
    return {
      low: 1e4 * (268435455 & t) % 4294967296,
      mid: 65535 & n,
      hi: n >>> 16,
      timestamp: t
    };
  }, tr._create4 = function () {
    return new tr().fromParts(tr.randomUI32(), tr.randomUI16(), 16384 | tr.randomUI12(), 128 | tr.randomUI06(), tr.randomUI08(), tr.randomUI48());
  }, tr._create1 = function () {
    var e = new Date().getTime(),
        t = tr.randomUI14(),
        n = 1099511627776 * (1 | tr.randomUI08()) + tr.randomUI40(),
        r = tr.randomUI04(),
        i = 0;
    e != i ? (e < i && t++, i = e, r = tr.randomUI04()) : Math.random() < .25 && r < 9984 ? r += 1 + tr.randomUI04() : t++;
    var o = tr.getTimeFieldValues(i),
        a = o.low + r,
        s = 4095 & o.hi | 4096,
        c = (t &= 16383) >>> 8 | 128,
        l = 255 & t;
    return new tr().fromParts(a, o.mid, s, c, l, n);
  }, tr.create = function (e) {
    return this["_create" + (e = e || 4)]();
  }, tr.fromTime = function (e, t) {
    t = t || !1;
    var n = tr.getTimeFieldValues(e),
        r = n.low,
        i = 4095 & n.hi | 4096;
    return !1 === t ? new tr().fromParts(r, n.mid, i, 0, 0, 0) : new tr().fromParts(r, n.mid, i, 128 | tr.limitUI06, tr.limitUI08 - 1, tr.limitUI48 - 1);
  }, tr.firstFromTime = function (e) {
    return tr.fromTime(e, !1);
  }, tr.lastFromTime = function (e) {
    return tr.fromTime(e, !0);
  }, tr.fromURN = function (e) {
    var t;
    return (t = /^(?:urn:uuid:|\{)?([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{2})([0-9a-f]{2})-([0-9a-f]{12})(?:\})?$/i.exec(e)) ? new tr().fromParts(parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16), parseInt(t[4], 16), parseInt(t[5], 16), parseInt(t[6], 16)) : null;
  }, tr.fromBytes = function (e) {
    if (e.length < 5) return null;

    for (var t = "", n = 0, r = [4, 2, 2, 2, 6], i = 0; i < r.length; i++) {
      for (var o = 0; o < r[i]; o++) {
        var a = e[n++].toString(16);
        1 == a.length && (a = "0" + a), t += a;
      }

      6 !== r[i] && (t += "-");
    }

    return tr.fromURN(t);
  }, tr.fromBinary = function (e) {
    for (var t = [], n = 0; n < e.length; n++) if (t[n] = e.charCodeAt(n), t[n] > 255 || t[n] < 0) throw new Error("Unexpected byte in binary data.");

    return tr.fromBytes(t);
  }, tr.new = function () {
    return this.create(4);
  }, tr.newTS = function () {
    return this.create(1);
  };
  var rr = tr;

  function ir(e, t) {
    return function (n) {
      var r = t;
      u.trace(n.type + " websocket callback", n);
      var i = t.recognitionContexts[t.recognitionContexts.length - 1];

      switch (u.debug("Current recognition context", i), n.type) {
        case "open":
          t.sessionId ? Dn(t, sr(t.editor.configuration, t.editor.domElement, t.sessionId)) : Dn(t, ar(t.editor.configuration, t.editor.domElement));
          break;

        case "message":
          switch (u.debug("Receiving " + n.data.type + " message", n), n.data.type) {
            case "ack":
              n.data.hmacChallenge && Dn(t, function (e, t) {
                return {
                  type: "hmac",
                  hmac: jt(t.data.hmacChallenge, e.recognitionParams.server.applicationKey, e.recognitionParams.server.hmacKey)
                };
              }(t.editor.configuration, n)), n.data.iinkSessionId && (r.sessionId = n.data.iinkSessionId);
              break;

            case "newPart":
              break;

            case "contentPackageDescription":
              r.currentReconnectionCount = 0, r.contentPartCount = n.data.contentPartCount, Dn(t, ur(t.editor.configuration)), r.currentPartId ? Dn(t, lr(t.editor.configuration, t.currentPartId)) : Dn(t, cr(t.editor.configuration));
              break;

            case "partChanged":
              n.data.partId && (r.currentPartId = n.data.partId), r.initialized = !0, Dn(t, Cr(t.editor.theme)), Dn(t, Tr(t.editor.penStyle)), Dn(t, Rr(t.editor.penStyleClasses)), i.callback(void 0, n.data), e.resolve(i);
              break;

            case "contentChanged":
              void 0 !== n.data.canUndo && (r.canUndo = n.data.canUndo), void 0 !== n.data.canRedo && (r.canRedo = n.data.canRedo), void 0 !== n.data.empty && (r.isEmpty = n.data.empty), void 0 !== n.data.possibleUndoCount && (r.possibleUndoCount = n.data.possibleUndoCount), void 0 !== n.data.undoStackIndex && (r.undoStackIndex = n.data.undoStackIndex), i.callback(void 0, n.data);
              break;

            case "exported":
            case "svgPatch":
              i.callback(void 0, n.data);
              break;

            case "supportedImportMimeTypes":
              r.supportedImportMimeTypes = n.data.mimeTypes, i.callback(void 0, n.data);
              break;

            case "fileChunkAck":
              i.callback(void 0, n.data);
              break;

            case "idle":
              r.idle = !0, i.callback(void 0, n.data);
              break;

            case "error":
              u.debug("Error detected stopping all recognition", n), i ? i.callback(n.data) : e.reject(Object.assign({}, n.data, {
                recoverable: !1
              }));
              break;

            default:
              u.warn("This is something unexpected in current recognizer. Not the type of message we should have here.", n);
          }

          break;

        case "error":
          u.debug("Error detected stopping all recognition", n), i ? i.callback(Object.assign({}, n, {
            recoverable: !1
          })) : e.reject(Object.assign({}, n, {
            recoverable: !1
          }));
          break;

        case "close":
          u.debug("Close detected stopping all recognition", n), r.initialized = !1, r.canRedo = !1, r.canUndo = !1, i ? i.callback(n) : e.reject(n);
          break;

        default:
          u.warn("This is something unexpected in current recognizer. Not the type of message we should have here.", n);
      }
    };
  }

  var or = {
    types: [t.RecognitionType.MATH, t.RecognitionType.TEXT, t.RecognitionType.DIAGRAM, t.RecognitionType.NEBO],
    protocol: t.Protocol.WEBSOCKET,
    apiVersion: "V4",
    availableTriggers: {
      exportContent: [t.Trigger.POINTER_UP, t.Trigger.DEMAND],
      addStrokes: [t.Trigger.POINTER_UP]
    }
  };

  function ar(e, t) {
    return {
      type: "newContentPackage",
      applicationKey: e.recognitionParams.server.applicationKey,
      xDpi: 96,
      yDpi: 96,
      viewSizeHeight: t.clientHeight < e.renderingParams.minHeight ? e.renderingParams.minHeight : t.clientHeight,
      viewSizeWidth: t.clientWidth < e.renderingParams.minWidth ? e.renderingParams.minWidth : t.clientWidth
    };
  }

  function sr(e, t, n) {
    return {
      type: "restoreIInkSession",
      iinkSessionId: n,
      applicationKey: e.recognitionParams.server.applicationKey,
      xDpi: 96,
      yDpi: 96,
      viewSizeHeight: t.clientHeight < e.renderingParams.minHeight ? e.renderingParams.minHeight : t.clientHeight,
      viewSizeWidth: t.clientWidth < e.renderingParams.minWidth ? e.renderingParams.minWidth : t.clientWidth
    };
  }

  function cr(e) {
    return {
      type: "newContentPart",
      contentType: e.recognitionParams.type,
      mimeTypes: e.triggers.exportContent !== t.Trigger.DEMAND ? e.recognitionParams.v4["" + e.recognitionParams.type.toLowerCase()].mimeTypes : void 0
    };
  }

  function lr(e, n) {
    return {
      type: "openContentPart",
      id: n,
      mimeTypes: e.triggers.exportContent !== t.Trigger.DEMAND ? e.recognitionParams.v4["" + e.recognitionParams.type.toLowerCase()].mimeTypes : void 0
    };
  }

  function ur(e) {
    return Object.assign({
      type: "configuration"
    }, e.recognitionParams.v4);
  }

  function dr(e, t) {
    var n = be(t, e.lastPositions.lastSentPosition + 1);
    if (n.length > 0) return Re(t), {
      type: "addStrokes",
      strokes: n.map(function (e) {
        return Object.assign({}, {
          id: e.id,
          pointerType: e.pointerType,
          pointerId: e.pointerId,
          x: e.x,
          y: e.y,
          t: e.t,
          p: e.p
        });
      })
    };
  }

  function fr() {
    return {
      type: "undo"
    };
  }

  function hr() {
    return {
      type: "redo"
    };
  }

  function pr() {
    return {
      type: "clear"
    };
  }

  function gr(e) {
    return {
      type: "convert",
      conversionState: e
    };
  }

  function mr(e) {
    return {
      type: "zoom",
      zoom: e
    };
  }

  function vr(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
        n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
    return {
      type: "changeViewSize",
      height: e.clientHeight < t ? t : e.clientHeight,
      width: e.clientWidth < n ? n : e.clientWidth
    };
  }

  function yr(e, t, n) {
    return {
      type: "export",
      partId: t,
      mimeTypes: n && 0 !== Object.keys(n).length ? n : e.recognitionParams.v4["" + e.recognitionParams.type.toLowerCase()].mimeTypes
    };
  }

  function br(e, t) {
    return {
      type: "importFile",
      importFileId: e,
      mimeType: t
    };
  }

  function Er(e, t, n) {
    return {
      type: "fileChunk",
      importFileId: e,
      data: t,
      lastChunk: n
    };
  }

  function xr(e) {
    return Object.assign({
      type: "pointerEvents"
    }, e);
  }

  function wr() {
    return {
      type: "waitForIdle"
    };
  }

  function Sr() {
    return {
      type: "getSupportedImportMimeTypes"
    };
  }

  function Tr(e) {
    return {
      type: "setPenStyle",
      style: e ? P(e) : ""
    };
  }

  function Rr(e) {
    return {
      type: "setPenStyleClasses",
      styleClasses: e
    };
  }

  function Cr(e) {
    return {
      type: "setTheme",
      theme: L(e)
    };
  }

  var kr = function (e, n, r, i) {
    var o = Ce(e);

    if (r) {
      if (void 0 !== r.updates) return o.recognizedSymbols ? o.recognizedSymbols.push(r) : o.recognizedSymbols = [r], i(n, o, t.EventType.RENDERED);
      if (void 0 !== r.exports) return o.rawResults.exports = r, o.exports = r.exports, i(n, o, t.EventType.EXPORTED);
      if (void 0 !== r.canUndo || void 0 !== r.canRedo) return i(n, o, t.EventType.CHANGED);
      if ("supportedImportMimeTypes" === r.type) return i(n, o, t.EventType.SUPPORTED_IMPORT_MIMETYPES);
      if ("partChanged" === r.type) return i(n, o, t.EventType.LOADED);
      if ("idle" === r.type) return i(n, o, t.EventType.IDLE);
      if ("close" === r.type) return i(n, o, t.EventType.CHANGED);
    }

    return i(n, o);
  };

  var Pr = {
    grabber: z,
    strokerList: [Ge, Nt],
    rendererList: [He, Mt],
    recognizerList: [ln, pn, En, Rn, Pn, On, er, Vn, Object.freeze({
      init: function e(t, n, r) {
        Un("/api/v4.0/iink/document", Vt(t, {
          model: Re(n, n.lastPositions.lastReceivedPosition),
          callback: function (e, t) {
            return kr(n, e, t, r);
          }
        }), ir, e).catch(function (e) {
          qt(t) && t.reconnect ? (u.info("Attempting a reconnect", t.currentReconnectionCount), t.reconnect(t, n, r)) : (u.error("Unable to reconnect", e), kr(n, e, void 0, r));
        });
      },
      newContentPart: function e(t, n, r) {
        jn(Vt(t, {
          model: n,
          callback: function (e, t) {
            return kr(n, e, t, r);
          }
        }), cr, t.editor.configuration).catch(function (i) {
          return Xn(e, t, n, r);
        });
      },
      openContentPart: function e(t, n, r) {
        jn(Vt(t, {
          model: n,
          callback: function (e, t) {
            return kr(n, e, t, r);
          }
        }), lr, t.editor.configuration, t.currentPartId).catch(function (i) {
          return Xn(e, t, n, r);
        });
      },
      sendConfiguration: function e(t, n, r) {
        jn(Vt(t, {
          model: n,
          callback: function (e, t) {
            return kr(n, e, t, r);
          }
        }), ur, t.editor.configuration).catch(function (i) {
          return Xn(e, t, n, r);
        });
      },
      pointerEvents: function e(t, n, r, i) {
        jn(Vt(t, {
          model: n,
          callback: function (e, t) {
            return kr(n, e, t, i);
          }
        }), xr, r).catch(function (o) {
          return Xn(e, t, n, r, i);
        });
      },
      addStrokes: function e(t, n, r) {
        jn(Vt(t, {
          model: n,
          callback: function (e, t) {
            return kr(n, e, t, r);
          }
        }), dr, t, n).catch(function (i) {
          return Xn(e, t, n, r);
        });
      },
      undo: function e(t, n, r) {
        jn(Vt(t, {
          model: n,
          callback: function (e, t) {
            return kr(n, e, t, r);
          }
        }), fr).catch(function (i) {
          return Xn(e, t, n, r);
        });
      },
      redo: function e(t, n, r) {
        jn(Vt(t, {
          model: n,
          callback: function (e, t) {
            return kr(n, e, t, r);
          }
        }), hr).catch(function (i) {
          return Xn(e, t, n, r);
        });
      },
      clear: function e(t, n, r) {
        jn(Vt(t, {
          model: n,
          callback: function (e, i) {
            on(t, n, function (t, n) {
              u.debug("The model after clear is :", n), kr(n, e, i, r);
            });
          }
        }), pr).catch(function (i) {
          return Xn(e, t, n, r);
        });
      },
      convert: function e(t, n, r, i) {
        jn(Vt(t, {
          model: n,
          callback: function (e, t) {
            return kr(n, e, t, r);
          }
        }), gr, i).catch(function (o) {
          return Xn(e, t, n, r, i);
        });
      },
      export_: function e(t, n, r, i) {
        jn(Vt(t, {
          model: n,
          callback: function (e, t) {
            return kr(n, e, t, r);
          }
        }), yr, t.editor.configuration, t.currentPartId, i).catch(function (o) {
          return Xn(e, t, n, r, i);
        });
      },
      import_: function e(t, n, r, i) {
        for (var o = {
          model: n,
          callback: function (e, t) {
            return kr(n, e, t, i);
          },
          importFileId: rr.create(4).toString()
        }, a = Vt(t, o), s = t.editor.configuration.recognitionParams.server.websocket.fileChunkSize, c = function (c) {
          0 === c && jn(a, br, o.importFileId, r.type).catch(function (o) {
            return Xn(e, t, n, r, i);
          }), function (e) {
            var t = this,
                n = new FileReader();
            return new Promise(function (r, i) {
              n.onload = function (e) {
                return r(e.target.result);
              }, n.onerror = function () {
                return i(t);
              }, n.readAsText(e);
            });
          }(r.slice(c, s, r.type)).then(function (l) {
            jn(a, Er, o.importFileId, l, c + s > r.size).catch(function (o) {
              return Xn(e, t, n, r, i);
            });
          });
        }, l = 0; l < r.size; l += s) c(l);
      },
      getSupportedImportMimeTypes: function e(t, n, r) {
        jn(Vt(t, {
          model: n,
          callback: function (e, t) {
            return kr(n, e, t, r);
          }
        }), Sr).catch(function (i) {
          return Xn(e, t, n, r);
        });
      },
      waitForIdle: function e(t, n, r) {
        jn(Vt(t, {
          model: n,
          callback: function (e, t) {
            return kr(n, e, t, r);
          }
        }), wr).catch(function (i) {
          return Xn(e, t, n, r);
        });
      },
      resize: function e(t, n, r, i) {
        jn(Vt(t, {
          model: n,
          callback: function (e, t) {
            return kr(n, e, t, r);
          }
        }), vr, i, t.editor.configuration.renderingParams.minHeight, t.editor.configuration.renderingParams.minWidth).catch(function (o) {
          return Xn(e, t, n, r, i);
        });
      },
      zoom: function e(t, n) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 10,
            i = arguments[3];
        jn(Vt(t, {
          model: n,
          callback: function (e, t) {
            return kr(n, e, t, i);
          }
        }), mr, r).catch(function (r) {
          return Xn(e, t, n, i);
        });
      },
      setPenStyle: function e(t, n, r, i) {
        jn(Vt(t, {
          model: n,
          callback: function (e, t) {
            return kr(n, e, t, i);
          }
        }), Tr, r).catch(function (r) {
          return Xn(e, t, n, i);
        });
      },
      setPenStyleClasses: function e(t, n, r, i) {
        jn(Vt(t, {
          model: n,
          callback: function (e, t) {
            return kr(n, e, t, i);
          }
        }), Rr, r).catch(function (r) {
          return Xn(e, t, n, i);
        });
      },
      setTheme: function e(t, n, r, i) {
        jn(Vt(t, {
          model: n,
          callback: function (e, t) {
            return kr(n, e, t, i);
          }
        }), Cr, r).catch(function (r) {
          return Xn(e, t, n, i);
        });
      },
      IInkWebSocketV4Configuration: or,
      getInfo: function () {
        return or;
      },
      buildNewContentPackageInput: ar,
      buildRestoreIInkSessionInput: sr,
      buildNewContentPart: cr,
      buildOpenContentPart: lr,
      buildConfiguration: ur,
      buildSetPenStyle: Tr,
      buildSetPenStyleClasses: Rr,
      buildSetTheme: Cr,
      close: Bn
    })],
    callbacks: [function (e, t) {
      d.info("emitting " + e + " event", t), this.dispatchEvent(new CustomEvent(e, Object.assign({
        bubbles: !0,
        composed: !0
      }, t ? {
        detail: t
      } : void 0)));
    }],
    getBehaviorFromConfiguration: function (e, t) {
      var n = {};
      return n.grabber = e.grabber, t && ("V4" === t.recognitionParams.apiVersion && "REST" === t.recognitionParams.protocol ? n.stroker = Ge : n.stroker = e.strokerList.find(function (e) {
        return e.getInfo().apiVersion === t.recognitionParams.apiVersion && e.getInfo().name === t.renderingParams.stroker;
      }), "V4" === t.recognitionParams.apiVersion && "REST" === t.recognitionParams.protocol ? n.renderer = He : n.renderer = e.rendererList.find(function (e) {
        return e.getInfo().apiVersion === t.recognitionParams.apiVersion;
      }), n.recognizer = e.recognizerList.find(function (e) {
        return e.getInfo().types.includes(t.recognitionParams.type) && e.getInfo().protocol === t.recognitionParams.protocol && e.getInfo().apiVersion === t.recognitionParams.apiVersion;
      })), n.callbacks = e.callbacks, n;
    }
  };

  function Ir(e) {
    var t = e;
    return t.canUndo = e.currentPosition > 0, t.canRedo = e.currentPosition < e.stack.length - 1, t;
  }

  function _r(e, t) {
    for (var n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2], r = e.stack[e.currentPosition], i = arguments.length, o = Array(i > 3 ? i - 3 : 0), a = 3; a < i; a++) o[a - 3] = arguments[a];

    t.apply(void 0, [void 0, n ? _e(r) : r].concat(o));
  }

  var Lr = Object.freeze({
    getModel: _r,
    updateModel: function (e, n, r) {
      var i = e.stack.findIndex(function (e) {
        return e.modificationTime === n.modificationTime && e.rawStrokes.length === n.rawStrokes.length;
      }),
          o = n;
      o.modificationTime = new Date().getTime();
      var a = [];
      if (i > -1) e.stack.splice(i, 1, _e(o)), s.debug("model updated", o);else {
        var c = e;
        c.currentPosition += 1, c.stack = c.stack.slice(0, c.currentPosition), c.stack.push(_e(o)), c.stack.length > c.maxSize && (c.stack.shift(), c.currentPosition--), s.debug("model pushed", o), a.push(t.EventType.CHANGED);
      }
      Ir(e), s.debug("undo/redo stack updated", e), _r.apply(void 0, [e, r, !1].concat(a));
    },
    undo: function (e, n, r) {
      var i = e;
      i.currentPosition > 0 && (i.currentPosition -= 1, Ir(e), s.debug("undo index", i.currentPosition)), _r(e, r, !0, t.EventType.CHANGED, t.EventType.EXPORTED);
    },
    redo: function (e, n, r) {
      var i = e;
      i.currentPosition < i.stack.length - 1 && (i.currentPosition += 1, Ir(e), s.debug("redo index", i.currentPosition)), _r(e, r, !0, t.EventType.CHANGED, t.EventType.EXPORTED);
    }
  });

  function Ar(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 10,
        n = document.createElement("canvas");
    return n.width = Math.abs(e.maxX - e.minX) + 2 * t, n.style.width = n.width + "px", n.height = Math.abs(e.maxY - e.minY) + 2 * t, n.style.height = n.height + "px", n;
  }

  function Mr(e) {
    return getComputedStyle(e);
  }

  function Or(e, t) {
    for (var n in t) {
      var r = t[n];
      "number" == typeof r && (r += "px"), e.style[n] = r;
    }

    return e;
  }

  function zr(e) {
    var t = document.createElement("div");
    return t.className = e, t;
  }

  var Dr = "undefined" != typeof Element && (Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.msMatchesSelector);

  function Nr(e, t) {
    if (!Dr) throw new Error("No element matching method supported");
    return Dr.call(e, t);
  }

  function Hr(e) {
    e.remove ? e.remove() : e.parentNode && e.parentNode.removeChild(e);
  }

  function Ur(e, t) {
    return Array.prototype.filter.call(e.children, function (e) {
      return Nr(e, t);
    });
  }

  var Xr = {
    main: "ps",
    element: {
      thumb: function (e) {
        return "ps__thumb-" + e;
      },
      rail: function (e) {
        return "ps__rail-" + e;
      },
      consuming: "ps__child--consume"
    },
    state: {
      focus: "ps--focus",
      active: function (e) {
        return "ps--active-" + e;
      },
      scrolling: function (e) {
        return "ps--scrolling-" + e;
      }
    }
  },
      jr = {
    x: null,
    y: null
  };

  function Br(e, t) {
    var n = e.element.classList,
        r = Xr.state.scrolling(t);
    n.contains(r) ? clearTimeout(jr[t]) : n.add(r);
  }

  function Wr(e, t) {
    jr[t] = setTimeout(function () {
      return e.isAlive && e.element.classList.remove(Xr.state.scrolling(t));
    }, e.settings.scrollingThreshold);
  }

  var Yr = function (e) {
    this.element = e, this.handlers = {};
  },
      Gr = {
    isEmpty: {
      configurable: !0
    }
  };

  Yr.prototype.bind = function (e, t) {
    void 0 === this.handlers[e] && (this.handlers[e] = []), this.handlers[e].push(t), this.element.addEventListener(e, t, !1);
  }, Yr.prototype.unbind = function (e, t) {
    var n = this;
    this.handlers[e] = this.handlers[e].filter(function (r) {
      return !(!t || r === t) || (n.element.removeEventListener(e, r, !1), !1);
    });
  }, Yr.prototype.unbindAll = function () {
    for (var e in this.handlers) this.unbind(e);
  }, Gr.isEmpty.get = function () {
    var e = this;
    return Object.keys(this.handlers).every(function (t) {
      return 0 === e.handlers[t].length;
    });
  }, Object.defineProperties(Yr.prototype, Gr);

  var Fr = function () {
    this.eventElements = [];
  };

  function Kr(e) {
    if ("function" == typeof window.CustomEvent) return new CustomEvent(e);
    var t = document.createEvent("CustomEvent");
    return t.initCustomEvent(e, !1, !1, void 0), t;
  }

  Fr.prototype.eventElement = function (e) {
    var t = this.eventElements.filter(function (t) {
      return t.element === e;
    })[0];
    return t || (t = new Yr(e), this.eventElements.push(t)), t;
  }, Fr.prototype.bind = function (e, t, n) {
    this.eventElement(e).bind(t, n);
  }, Fr.prototype.unbind = function (e, t, n) {
    var r = this.eventElement(e);
    r.unbind(t, n), r.isEmpty && this.eventElements.splice(this.eventElements.indexOf(r), 1);
  }, Fr.prototype.unbindAll = function () {
    this.eventElements.forEach(function (e) {
      return e.unbindAll();
    }), this.eventElements = [];
  }, Fr.prototype.once = function (e, t, n) {
    var r = this.eventElement(e),
        i = function (e) {
      r.unbind(t, i), n(e);
    };

    r.bind(t, i);
  };

  var Vr = function (e, t, n, r, i) {
    var o;
    if (void 0 === r && (r = !0), void 0 === i && (i = !1), "top" === t) o = ["contentHeight", "containerHeight", "scrollTop", "y", "up", "down"];else {
      if ("left" !== t) throw new Error("A proper axis should be provided");
      o = ["contentWidth", "containerWidth", "scrollLeft", "x", "left", "right"];
    }
    !function (e, t, n, r, i) {
      var o = n[0],
          a = n[1],
          s = n[2],
          c = n[3],
          l = n[4],
          u = n[5];
      void 0 === r && (r = !0);
      void 0 === i && (i = !1);
      var d = e.element;
      e.reach[c] = null, d[s] < 1 && (e.reach[c] = "start");
      d[s] > e[o] - e[a] - 1 && (e.reach[c] = "end");
      t && (d.dispatchEvent(Kr("ps-scroll-" + c)), t < 0 ? d.dispatchEvent(Kr("ps-scroll-" + l)) : t > 0 && d.dispatchEvent(Kr("ps-scroll-" + u)), r && function (e, t) {
        Br(e, t), Wr(e, t);
      }(e, c));
      e.reach[c] && (t || i) && d.dispatchEvent(Kr("ps-" + c + "-reach-" + e.reach[c]));
    }(e, n, o, r, i);
  };

  function Jr(e) {
    return parseInt(e, 10) || 0;
  }

  var qr = {
    isWebKit: "undefined" != typeof document && "WebkitAppearance" in document.documentElement.style,
    supportsTouch: "undefined" != typeof window && ("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch),
    supportsIePointer: "undefined" != typeof navigator && navigator.msMaxTouchPoints,
    isChrome: "undefined" != typeof navigator && /Chrome/i.test(navigator && navigator.userAgent)
  },
      Zr = function (e) {
    var t = e.element;
    e.containerWidth = t.clientWidth, e.containerHeight = t.clientHeight, e.contentWidth = t.scrollWidth, e.contentHeight = t.scrollHeight, t.contains(e.scrollbarXRail) || (Ur(t, Xr.element.rail("x")).forEach(function (e) {
      return Hr(e);
    }), t.appendChild(e.scrollbarXRail)), t.contains(e.scrollbarYRail) || (Ur(t, Xr.element.rail("y")).forEach(function (e) {
      return Hr(e);
    }), t.appendChild(e.scrollbarYRail)), !e.settings.suppressScrollX && e.containerWidth + e.settings.scrollXMarginOffset < e.contentWidth ? (e.scrollbarXActive = !0, e.railXWidth = e.containerWidth - e.railXMarginWidth, e.railXRatio = e.containerWidth / e.railXWidth, e.scrollbarXWidth = Qr(e, Jr(e.railXWidth * e.containerWidth / e.contentWidth)), e.scrollbarXLeft = Jr((e.negativeScrollAdjustment + t.scrollLeft) * (e.railXWidth - e.scrollbarXWidth) / (e.contentWidth - e.containerWidth))) : e.scrollbarXActive = !1, !e.settings.suppressScrollY && e.containerHeight + e.settings.scrollYMarginOffset < e.contentHeight ? (e.scrollbarYActive = !0, e.railYHeight = e.containerHeight - e.railYMarginHeight, e.railYRatio = e.containerHeight / e.railYHeight, e.scrollbarYHeight = Qr(e, Jr(e.railYHeight * e.containerHeight / e.contentHeight)), e.scrollbarYTop = Jr(t.scrollTop * (e.railYHeight - e.scrollbarYHeight) / (e.contentHeight - e.containerHeight))) : e.scrollbarYActive = !1, e.scrollbarXLeft >= e.railXWidth - e.scrollbarXWidth && (e.scrollbarXLeft = e.railXWidth - e.scrollbarXWidth), e.scrollbarYTop >= e.railYHeight - e.scrollbarYHeight && (e.scrollbarYTop = e.railYHeight - e.scrollbarYHeight), function (e, t) {
      var n = {
        width: t.railXWidth
      };
      t.isRtl ? n.left = t.negativeScrollAdjustment + e.scrollLeft + t.containerWidth - t.contentWidth : n.left = e.scrollLeft;
      t.isScrollbarXUsingBottom ? n.bottom = t.scrollbarXBottom - e.scrollTop : n.top = t.scrollbarXTop + e.scrollTop;
      Or(t.scrollbarXRail, n);
      var r = {
        top: e.scrollTop,
        height: t.railYHeight
      };
      t.isScrollbarYUsingRight ? t.isRtl ? r.right = t.contentWidth - (t.negativeScrollAdjustment + e.scrollLeft) - t.scrollbarYRight - t.scrollbarYOuterWidth : r.right = t.scrollbarYRight - e.scrollLeft : t.isRtl ? r.left = t.negativeScrollAdjustment + e.scrollLeft + 2 * t.containerWidth - t.contentWidth - t.scrollbarYLeft - t.scrollbarYOuterWidth : r.left = t.scrollbarYLeft + e.scrollLeft;
      Or(t.scrollbarYRail, r), Or(t.scrollbarX, {
        left: t.scrollbarXLeft,
        width: t.scrollbarXWidth - t.railBorderXWidth
      }), Or(t.scrollbarY, {
        top: t.scrollbarYTop,
        height: t.scrollbarYHeight - t.railBorderYWidth
      });
    }(t, e), e.scrollbarXActive ? t.classList.add(Xr.state.active("x")) : (t.classList.remove(Xr.state.active("x")), e.scrollbarXWidth = 0, e.scrollbarXLeft = 0, t.scrollLeft = 0), e.scrollbarYActive ? t.classList.add(Xr.state.active("y")) : (t.classList.remove(Xr.state.active("y")), e.scrollbarYHeight = 0, e.scrollbarYTop = 0, t.scrollTop = 0);
  };

  function Qr(e, t) {
    return e.settings.minScrollbarLength && (t = Math.max(t, e.settings.minScrollbarLength)), e.settings.maxScrollbarLength && (t = Math.min(t, e.settings.maxScrollbarLength)), t;
  }

  function $r(e, t) {
    var n = t[0],
        r = t[1],
        i = t[2],
        o = t[3],
        a = t[4],
        s = t[5],
        c = t[6],
        l = t[7],
        u = e.element,
        d = null,
        f = null,
        h = null;

    function p(t) {
      u[c] = d + h * (t[i] - f), Br(e, l), Zr(e), t.stopPropagation(), t.preventDefault();
    }

    function g() {
      Wr(e, l), e.event.unbind(e.ownerDocument, "mousemove", p);
    }

    e.event.bind(e[a], "mousedown", function (t) {
      d = u[c], f = t[i], h = (e[r] - e[n]) / (e[o] - e[s]), e.event.bind(e.ownerDocument, "mousemove", p), e.event.once(e.ownerDocument, "mouseup", g), t.stopPropagation(), t.preventDefault();
    });
  }

  var ei = {
    "click-rail": function (e) {
      e.event.bind(e.scrollbarY, "mousedown", function (e) {
        return e.stopPropagation();
      }), e.event.bind(e.scrollbarYRail, "mousedown", function (t) {
        var n = t.pageY - window.pageYOffset - e.scrollbarYRail.getBoundingClientRect().top > e.scrollbarYTop ? 1 : -1;
        e.element.scrollTop += n * e.containerHeight, Zr(e), t.stopPropagation();
      }), e.event.bind(e.scrollbarX, "mousedown", function (e) {
        return e.stopPropagation();
      }), e.event.bind(e.scrollbarXRail, "mousedown", function (t) {
        var n = t.pageX - window.pageXOffset - e.scrollbarXRail.getBoundingClientRect().left > e.scrollbarXLeft ? 1 : -1;
        e.element.scrollLeft += n * e.containerWidth, Zr(e), t.stopPropagation();
      });
    },
    "drag-thumb": function (e) {
      $r(e, ["containerWidth", "contentWidth", "pageX", "railXWidth", "scrollbarX", "scrollbarXWidth", "scrollLeft", "x"]), $r(e, ["containerHeight", "contentHeight", "pageY", "railYHeight", "scrollbarY", "scrollbarYHeight", "scrollTop", "y"]);
    },
    keyboard: function (e) {
      var t = e.element;
      e.event.bind(e.ownerDocument, "keydown", function (n) {
        if (!(n.isDefaultPrevented && n.isDefaultPrevented() || n.defaultPrevented) && (Nr(t, ":hover") || Nr(e.scrollbarX, ":focus") || Nr(e.scrollbarY, ":focus"))) {
          var r,
              i = document.activeElement ? document.activeElement : e.ownerDocument.activeElement;

          if (i) {
            if ("IFRAME" === i.tagName) i = i.contentDocument.activeElement;else for (; i.shadowRoot;) i = i.shadowRoot.activeElement;
            if (Nr(r = i, "input,[contenteditable]") || Nr(r, "select,[contenteditable]") || Nr(r, "textarea,[contenteditable]") || Nr(r, "button,[contenteditable]")) return;
          }

          var o = 0,
              a = 0;

          switch (n.which) {
            case 37:
              o = n.metaKey ? -e.contentWidth : n.altKey ? -e.containerWidth : -30;
              break;

            case 38:
              a = n.metaKey ? e.contentHeight : n.altKey ? e.containerHeight : 30;
              break;

            case 39:
              o = n.metaKey ? e.contentWidth : n.altKey ? e.containerWidth : 30;
              break;

            case 40:
              a = n.metaKey ? -e.contentHeight : n.altKey ? -e.containerHeight : -30;
              break;

            case 32:
              a = n.shiftKey ? e.containerHeight : -e.containerHeight;
              break;

            case 33:
              a = e.containerHeight;
              break;

            case 34:
              a = -e.containerHeight;
              break;

            case 36:
              a = e.contentHeight;
              break;

            case 35:
              a = -e.contentHeight;
              break;

            default:
              return;
          }

          e.settings.suppressScrollX && 0 !== o || e.settings.suppressScrollY && 0 !== a || (t.scrollTop -= a, t.scrollLeft += o, Zr(e), function (n, r) {
            var i = t.scrollTop;

            if (0 === n) {
              if (!e.scrollbarYActive) return !1;
              if (0 === i && r > 0 || i >= e.contentHeight - e.containerHeight && r < 0) return !e.settings.wheelPropagation;
            }

            var o = t.scrollLeft;

            if (0 === r) {
              if (!e.scrollbarXActive) return !1;
              if (0 === o && n < 0 || o >= e.contentWidth - e.containerWidth && n > 0) return !e.settings.wheelPropagation;
            }

            return !0;
          }(o, a) && n.preventDefault());
        }
      });
    },
    wheel: function (e) {
      var t = e.element;

      function n(n) {
        var r = function (e) {
          var t = e.deltaX,
              n = -1 * e.deltaY;
          return void 0 !== t && void 0 !== n || (t = -1 * e.wheelDeltaX / 6, n = e.wheelDeltaY / 6), e.deltaMode && 1 === e.deltaMode && (t *= 10, n *= 10), t != t && n != n && (t = 0, n = e.wheelDelta), e.shiftKey ? [-n, -t] : [t, n];
        }(n),
            i = r[0],
            o = r[1];

        if (!function (e, n, r) {
          if (!qr.isWebKit && t.querySelector("select:focus")) return !0;
          if (!t.contains(e)) return !1;

          for (var i = e; i && i !== t;) {
            if (i.classList.contains(Xr.element.consuming)) return !0;
            var o = Mr(i);

            if ([o.overflow, o.overflowX, o.overflowY].join("").match(/(scroll|auto)/)) {
              var a = i.scrollHeight - i.clientHeight;
              if (a > 0 && !(0 === i.scrollTop && r > 0 || i.scrollTop === a && r < 0)) return !0;
              var s = i.scrollLeft - i.clientWidth;
              if (s > 0 && !(0 === i.scrollLeft && n < 0 || i.scrollLeft === s && n > 0)) return !0;
            }

            i = i.parentNode;
          }

          return !1;
        }(n.target, i, o)) {
          var a = !1;
          e.settings.useBothWheelAxes ? e.scrollbarYActive && !e.scrollbarXActive ? (o ? t.scrollTop -= o * e.settings.wheelSpeed : t.scrollTop += i * e.settings.wheelSpeed, a = !0) : e.scrollbarXActive && !e.scrollbarYActive && (i ? t.scrollLeft += i * e.settings.wheelSpeed : t.scrollLeft -= o * e.settings.wheelSpeed, a = !0) : (t.scrollTop -= o * e.settings.wheelSpeed, t.scrollLeft += i * e.settings.wheelSpeed), Zr(e), (a = a || function (n, r) {
            var i = 0 === t.scrollTop,
                o = t.scrollTop + t.offsetHeight === t.scrollHeight,
                a = 0 === t.scrollLeft,
                s = t.scrollLeft + t.offsetWidth === t.offsetWidth;
            return !(Math.abs(r) > Math.abs(n) ? i || o : a || s) || !e.settings.wheelPropagation;
          }(i, o)) && !n.ctrlKey && (n.stopPropagation(), n.preventDefault());
        }
      }

      void 0 !== window.onwheel ? e.event.bind(t, "wheel", n) : void 0 !== window.onmousewheel && e.event.bind(t, "mousewheel", n);
    },
    touch: function (e) {
      if (qr.supportsTouch || qr.supportsIePointer) {
        var t = e.element,
            n = {},
            r = 0,
            i = {},
            o = null;
        qr.supportsTouch ? (e.event.bind(t, "touchstart", l), e.event.bind(t, "touchmove", u), e.event.bind(t, "touchend", d)) : qr.supportsIePointer && (window.PointerEvent ? (e.event.bind(t, "pointerdown", l), e.event.bind(t, "pointermove", u), e.event.bind(t, "pointerup", d)) : window.MSPointerEvent && (e.event.bind(t, "MSPointerDown", l), e.event.bind(t, "MSPointerMove", u), e.event.bind(t, "MSPointerUp", d)));
      }

      function a(n, r) {
        t.scrollTop -= r, t.scrollLeft -= n, Zr(e);
      }

      function s(e) {
        return e.targetTouches ? e.targetTouches[0] : e;
      }

      function c(e) {
        return !(e.pointerType && "pen" === e.pointerType && 0 === e.buttons || (!e.targetTouches || 1 !== e.targetTouches.length) && (!e.pointerType || "mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE));
      }

      function l(e) {
        if (c(e)) {
          var t = s(e);
          n.pageX = t.pageX, n.pageY = t.pageY, r = new Date().getTime(), null !== o && clearInterval(o);
        }
      }

      function u(o) {
        if (c(o)) {
          var l = s(o),
              u = {
            pageX: l.pageX,
            pageY: l.pageY
          },
              d = u.pageX - n.pageX,
              f = u.pageY - n.pageY;
          if (function (e, n, r) {
            if (!t.contains(e)) return !1;

            for (var i = e; i && i !== t;) {
              if (i.classList.contains(Xr.element.consuming)) return !0;
              var o = Mr(i);

              if ([o.overflow, o.overflowX, o.overflowY].join("").match(/(scroll|auto)/)) {
                var a = i.scrollHeight - i.clientHeight;
                if (a > 0 && !(0 === i.scrollTop && r > 0 || i.scrollTop === a && r < 0)) return !0;
                var s = i.scrollLeft - i.clientWidth;
                if (s > 0 && !(0 === i.scrollLeft && n < 0 || i.scrollLeft === s && n > 0)) return !0;
              }

              i = i.parentNode;
            }

            return !1;
          }(o.target, d, f)) return;
          a(d, f), n = u;
          var h = new Date().getTime(),
              p = h - r;
          p > 0 && (i.x = d / p, i.y = f / p, r = h), function (n, r) {
            var i = t.scrollTop,
                o = t.scrollLeft,
                a = Math.abs(n),
                s = Math.abs(r);

            if (s > a) {
              if (r < 0 && i === e.contentHeight - e.containerHeight || r > 0 && 0 === i) return 0 === window.scrollY && r > 0 && qr.isChrome;
            } else if (a > s && (n < 0 && o === e.contentWidth - e.containerWidth || n > 0 && 0 === o)) return !0;

            return !0;
          }(d, f) && o.preventDefault();
        }
      }

      function d() {
        e.settings.swipeEasing && (clearInterval(o), o = setInterval(function () {
          e.isInitialized ? clearInterval(o) : i.x || i.y ? Math.abs(i.x) < .01 && Math.abs(i.y) < .01 ? clearInterval(o) : (a(30 * i.x, 30 * i.y), i.x *= .8, i.y *= .8) : clearInterval(o);
        }, 10));
      }
    }
  },
      ti = function (e, t) {
    var n = this;
    if (void 0 === t && (t = {}), "string" == typeof e && (e = document.querySelector(e)), !e || !e.nodeName) throw new Error("no element is specified to initialize PerfectScrollbar");

    for (var r in this.element = e, e.classList.add(Xr.main), this.settings = {
      handlers: ["click-rail", "drag-thumb", "keyboard", "wheel", "touch"],
      maxScrollbarLength: null,
      minScrollbarLength: null,
      scrollingThreshold: 1e3,
      scrollXMarginOffset: 0,
      scrollYMarginOffset: 0,
      suppressScrollX: !1,
      suppressScrollY: !1,
      swipeEasing: !0,
      useBothWheelAxes: !1,
      wheelPropagation: !1,
      wheelSpeed: 1
    }, t) n.settings[r] = t[r];

    this.containerWidth = null, this.containerHeight = null, this.contentWidth = null, this.contentHeight = null;

    var i,
        o,
        a = function () {
      return e.classList.add(Xr.state.focus);
    },
        s = function () {
      return e.classList.remove(Xr.state.focus);
    };

    this.isRtl = "rtl" === Mr(e).direction, this.isNegativeScroll = (o = e.scrollLeft, e.scrollLeft = -1, i = e.scrollLeft < 0, e.scrollLeft = o, i), this.negativeScrollAdjustment = this.isNegativeScroll ? e.scrollWidth - e.clientWidth : 0, this.event = new Fr(), this.ownerDocument = e.ownerDocument || document, this.scrollbarXRail = zr(Xr.element.rail("x")), e.appendChild(this.scrollbarXRail), this.scrollbarX = zr(Xr.element.thumb("x")), this.scrollbarXRail.appendChild(this.scrollbarX), this.scrollbarX.setAttribute("tabindex", 0), this.event.bind(this.scrollbarX, "focus", a), this.event.bind(this.scrollbarX, "blur", s), this.scrollbarXActive = null, this.scrollbarXWidth = null, this.scrollbarXLeft = null;
    var c = Mr(this.scrollbarXRail);
    this.scrollbarXBottom = parseInt(c.bottom, 10), isNaN(this.scrollbarXBottom) ? (this.isScrollbarXUsingBottom = !1, this.scrollbarXTop = Jr(c.top)) : this.isScrollbarXUsingBottom = !0, this.railBorderXWidth = Jr(c.borderLeftWidth) + Jr(c.borderRightWidth), Or(this.scrollbarXRail, {
      display: "block"
    }), this.railXMarginWidth = Jr(c.marginLeft) + Jr(c.marginRight), Or(this.scrollbarXRail, {
      display: ""
    }), this.railXWidth = null, this.railXRatio = null, this.scrollbarYRail = zr(Xr.element.rail("y")), e.appendChild(this.scrollbarYRail), this.scrollbarY = zr(Xr.element.thumb("y")), this.scrollbarYRail.appendChild(this.scrollbarY), this.scrollbarY.setAttribute("tabindex", 0), this.event.bind(this.scrollbarY, "focus", a), this.event.bind(this.scrollbarY, "blur", s), this.scrollbarYActive = null, this.scrollbarYHeight = null, this.scrollbarYTop = null;
    var l = Mr(this.scrollbarYRail);
    this.scrollbarYRight = parseInt(l.right, 10), isNaN(this.scrollbarYRight) ? (this.isScrollbarYUsingRight = !1, this.scrollbarYLeft = Jr(l.left)) : this.isScrollbarYUsingRight = !0, this.scrollbarYOuterWidth = this.isRtl ? function (e) {
      var t = Mr(e);
      return Jr(t.width) + Jr(t.paddingLeft) + Jr(t.paddingRight) + Jr(t.borderLeftWidth) + Jr(t.borderRightWidth);
    }(this.scrollbarY) : null, this.railBorderYWidth = Jr(l.borderTopWidth) + Jr(l.borderBottomWidth), Or(this.scrollbarYRail, {
      display: "block"
    }), this.railYMarginHeight = Jr(l.marginTop) + Jr(l.marginBottom), Or(this.scrollbarYRail, {
      display: ""
    }), this.railYHeight = null, this.railYRatio = null, this.reach = {
      x: e.scrollLeft <= 0 ? "start" : e.scrollLeft >= this.contentWidth - this.containerWidth ? "end" : null,
      y: e.scrollTop <= 0 ? "start" : e.scrollTop >= this.contentHeight - this.containerHeight ? "end" : null
    }, this.isAlive = !0, this.settings.handlers.forEach(function (e) {
      return ei[e](n);
    }), this.lastScrollTop = e.scrollTop, this.lastScrollLeft = e.scrollLeft, this.event.bind(this.element, "scroll", function (e) {
      return n.onScroll(e);
    }), Zr(this);
  };

  ti.prototype.update = function () {
    this.isAlive && (this.negativeScrollAdjustment = this.isNegativeScroll ? this.element.scrollWidth - this.element.clientWidth : 0, Or(this.scrollbarXRail, {
      display: "block"
    }), Or(this.scrollbarYRail, {
      display: "block"
    }), this.railXMarginWidth = Jr(Mr(this.scrollbarXRail).marginLeft) + Jr(Mr(this.scrollbarXRail).marginRight), this.railYMarginHeight = Jr(Mr(this.scrollbarYRail).marginTop) + Jr(Mr(this.scrollbarYRail).marginBottom), Or(this.scrollbarXRail, {
      display: "none"
    }), Or(this.scrollbarYRail, {
      display: "none"
    }), Zr(this), Vr(this, "top", 0, !1, !0), Vr(this, "left", 0, !1, !0), Or(this.scrollbarXRail, {
      display: ""
    }), Or(this.scrollbarYRail, {
      display: ""
    }));
  }, ti.prototype.onScroll = function (e) {
    this.isAlive && (Zr(this), Vr(this, "top", this.element.scrollTop - this.lastScrollTop), Vr(this, "left", this.element.scrollLeft - this.lastScrollLeft), this.lastScrollTop = this.element.scrollTop, this.lastScrollLeft = this.element.scrollLeft);
  }, ti.prototype.destroy = function () {
    this.isAlive && (this.event.unbindAll(), Hr(this.scrollbarX), Hr(this.scrollbarY), Hr(this.scrollbarXRail), Hr(this.scrollbarYRail), this.removePsClasses(), this.element = null, this.scrollbarX = null, this.scrollbarY = null, this.scrollbarXRail = null, this.scrollbarYRail = null, this.isAlive = !1);
  }, ti.prototype.removePsClasses = function () {
    this.element.className = this.element.className.split(" ").filter(function (e) {
      return !e.match(/^ps([-_].+|)$/);
    }).join(" ");
  };

  var ni = function (e) {
    var t;
    if ("SELECT" === e.nodeName) e.focus(), t = e.value;else if ("INPUT" === e.nodeName || "TEXTAREA" === e.nodeName) {
      var n = e.hasAttribute("readonly");
      n || e.setAttribute("readonly", ""), e.select(), e.setSelectionRange(0, e.value.length), n || e.removeAttribute("readonly"), t = e.value;
    } else {
      e.hasAttribute("contenteditable") && e.focus();
      var r = window.getSelection(),
          i = document.createRange();
      i.selectNodeContents(e), r.removeAllRanges(), r.addRange(i), t = r.toString();
    }
    return t;
  },
      ri = i(function (e, t) {
    !function (e, t) {
      var n,
          r = (n = t) && n.__esModule ? n : {
        default: n
      },
          i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e;
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      },
          o = function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
          }
        }

        return function (t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t;
        };
      }(),
          a = function () {
        function e(t) {
          !function (e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, e), this.resolveOptions(t), this.initSelection();
        }

        return o(e, [{
          key: "resolveOptions",
          value: function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            this.action = e.action, this.container = e.container, this.emitter = e.emitter, this.target = e.target, this.text = e.text, this.trigger = e.trigger, this.selectedText = "";
          }
        }, {
          key: "initSelection",
          value: function () {
            this.text ? this.selectFake() : this.target && this.selectTarget();
          }
        }, {
          key: "selectFake",
          value: function () {
            var e = this,
                t = "rtl" == document.documentElement.getAttribute("dir");
            this.removeFake(), this.fakeHandlerCallback = function () {
              return e.removeFake();
            }, this.fakeHandler = this.container.addEventListener("click", this.fakeHandlerCallback) || !0, this.fakeElem = document.createElement("textarea"), this.fakeElem.style.fontSize = "12pt", this.fakeElem.style.border = "0", this.fakeElem.style.padding = "0", this.fakeElem.style.margin = "0", this.fakeElem.style.position = "absolute", this.fakeElem.style[t ? "right" : "left"] = "-9999px";
            var n = window.pageYOffset || document.documentElement.scrollTop;
            this.fakeElem.style.top = n + "px", this.fakeElem.setAttribute("readonly", ""), this.fakeElem.value = this.text, this.container.appendChild(this.fakeElem), this.selectedText = (0, r.default)(this.fakeElem), this.copyText();
          }
        }, {
          key: "removeFake",
          value: function () {
            this.fakeHandler && (this.container.removeEventListener("click", this.fakeHandlerCallback), this.fakeHandler = null, this.fakeHandlerCallback = null), this.fakeElem && (this.container.removeChild(this.fakeElem), this.fakeElem = null);
          }
        }, {
          key: "selectTarget",
          value: function () {
            this.selectedText = (0, r.default)(this.target), this.copyText();
          }
        }, {
          key: "copyText",
          value: function () {
            var e = void 0;

            try {
              e = document.execCommand(this.action);
            } catch (t) {
              e = !1;
            }

            this.handleResult(e);
          }
        }, {
          key: "handleResult",
          value: function (e) {
            this.emitter.emit(e ? "success" : "error", {
              action: this.action,
              text: this.selectedText,
              trigger: this.trigger,
              clearSelection: this.clearSelection.bind(this)
            });
          }
        }, {
          key: "clearSelection",
          value: function () {
            this.trigger && this.trigger.focus(), window.getSelection().removeAllRanges();
          }
        }, {
          key: "destroy",
          value: function () {
            this.removeFake();
          }
        }, {
          key: "action",
          set: function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "copy";
            if (this._action = e, "copy" !== this._action && "cut" !== this._action) throw new Error('Invalid "action" value, use either "copy" or "cut"');
          },
          get: function () {
            return this._action;
          }
        }, {
          key: "target",
          set: function (e) {
            if (void 0 !== e) {
              if (!e || "object" !== (void 0 === e ? "undefined" : i(e)) || 1 !== e.nodeType) throw new Error('Invalid "target" value, use a valid Element');
              if ("copy" === this.action && e.hasAttribute("disabled")) throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
              if ("cut" === this.action && (e.hasAttribute("readonly") || e.hasAttribute("disabled"))) throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
              this._target = e;
            }
          },
          get: function () {
            return this._target;
          }
        }]), e;
      }();

      e.exports = a;
    }(e, ni);
  });

  function ii() {}

  r(ri), ii.prototype = {
    on: function (e, t, n) {
      var r = this.e || (this.e = {});
      return (r[e] || (r[e] = [])).push({
        fn: t,
        ctx: n
      }), this;
    },
    once: function (e, t, n) {
      var r = this;

      function i() {
        r.off(e, i), t.apply(n, arguments);
      }

      return i._ = t, this.on(e, i, n);
    },
    emit: function (e) {
      for (var t = [].slice.call(arguments, 1), n = ((this.e || (this.e = {}))[e] || []).slice(), r = 0, i = n.length; r < i; r++) n[r].fn.apply(n[r].ctx, t);

      return this;
    },
    off: function (e, t) {
      var n = this.e || (this.e = {}),
          r = n[e],
          i = [];
      if (r && t) for (var o = 0, a = r.length; o < a; o++) r[o].fn !== t && r[o].fn._ !== t && i.push(r[o]);
      return i.length ? n[e] = i : delete n[e], this;
    }
  };
  var oi = ii,
      ai = i(function (e, t) {
    t.node = function (e) {
      return void 0 !== e && e instanceof HTMLElement && 1 === e.nodeType;
    }, t.nodeList = function (e) {
      var n = Object.prototype.toString.call(e);
      return void 0 !== e && ("[object NodeList]" === n || "[object HTMLCollection]" === n) && "length" in e && (0 === e.length || t.node(e[0]));
    }, t.string = function (e) {
      return "string" == typeof e || e instanceof String;
    }, t.fn = function (e) {
      return "[object Function]" === Object.prototype.toString.call(e);
    };
  }),
      si = (ai.node, ai.nodeList, ai.string, ai.fn, 9);

  if ("undefined" != typeof Element && !Element.prototype.matches) {
    var ci = Element.prototype;
    ci.matches = ci.matchesSelector || ci.mozMatchesSelector || ci.msMatchesSelector || ci.oMatchesSelector || ci.webkitMatchesSelector;
  }

  var li = function (e, t) {
    for (; e && e.nodeType !== si;) {
      if ("function" == typeof e.matches && e.matches(t)) return e;
      e = e.parentNode;
    }
  };

  var ui = function (e, t, n, r, i) {
    var o = function (e, t, n, r) {
      return function (n) {
        n.delegateTarget = li(n.target, t), n.delegateTarget && r.call(e, n);
      };
    }.apply(this, arguments);

    return e.addEventListener(n, o, i), {
      destroy: function () {
        e.removeEventListener(n, o, i);
      }
    };
  };

  var di = function (e, t, n) {
    if (!e && !t && !n) throw new Error("Missing required arguments");
    if (!ai.string(t)) throw new TypeError("Second argument must be a String");
    if (!ai.fn(n)) throw new TypeError("Third argument must be a Function");
    if (ai.node(e)) return function (e, t, n) {
      return e.addEventListener(t, n), {
        destroy: function () {
          e.removeEventListener(t, n);
        }
      };
    }(e, t, n);
    if (ai.nodeList(e)) return function (e, t, n) {
      return Array.prototype.forEach.call(e, function (e) {
        e.addEventListener(t, n);
      }), {
        destroy: function () {
          Array.prototype.forEach.call(e, function (e) {
            e.removeEventListener(t, n);
          });
        }
      };
    }(e, t, n);
    if (ai.string(e)) return function (e, t, n) {
      return ui(document.body, e, t, n);
    }(e, t, n);
    throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");
  },
      fi = r(i(function (e, t) {
    !function (e, t, n, r) {
      var i = s(t),
          o = s(n),
          a = s(r);

      function s(e) {
        return e && e.__esModule ? e : {
          default: e
        };
      }

      var c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e;
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      },
          l = function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
          }
        }

        return function (t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t;
        };
      }(),
          u = function (e) {
        function t(e, n) {
          !function (e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, t);

          var r = function (e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t;
          }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));

          return r.resolveOptions(n), r.listenClick(e), r;
        }

        return function (e, t) {
          if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
          e.prototype = Object.create(t && t.prototype, {
            constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
        }(t, e), l(t, [{
          key: "resolveOptions",
          value: function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            this.action = "function" == typeof e.action ? e.action : this.defaultAction, this.target = "function" == typeof e.target ? e.target : this.defaultTarget, this.text = "function" == typeof e.text ? e.text : this.defaultText, this.container = "object" === c(e.container) ? e.container : document.body;
          }
        }, {
          key: "listenClick",
          value: function (e) {
            var t = this;
            this.listener = (0, a.default)(e, "click", function (e) {
              return t.onClick(e);
            });
          }
        }, {
          key: "onClick",
          value: function (e) {
            var t = e.delegateTarget || e.currentTarget;
            this.clipboardAction && (this.clipboardAction = null), this.clipboardAction = new i.default({
              action: this.action(t),
              target: this.target(t),
              text: this.text(t),
              container: this.container,
              trigger: t,
              emitter: this
            });
          }
        }, {
          key: "defaultAction",
          value: function (e) {
            return d("action", e);
          }
        }, {
          key: "defaultTarget",
          value: function (e) {
            var t = d("target", e);
            if (t) return document.querySelector(t);
          }
        }, {
          key: "defaultText",
          value: function (e) {
            return d("text", e);
          }
        }, {
          key: "destroy",
          value: function () {
            this.listener.destroy(), this.clipboardAction && (this.clipboardAction.destroy(), this.clipboardAction = null);
          }
        }], [{
          key: "isSupported",
          value: function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ["copy", "cut"],
                t = "string" == typeof e ? [e] : e,
                n = !!document.queryCommandSupported;
            return t.forEach(function (e) {
              n = n && !!document.queryCommandSupported(e);
            }), n;
          }
        }]), t;
      }(o.default);

      function d(e, t) {
        var n = "data-clipboard-" + e;
        if (t.hasAttribute(n)) return t.getAttribute(n);
      }

      e.exports = u;
    }(e, ri, oi, di);
  }));

  function hi(e) {
    for (var t = e && e.parentNode; t;) {
      if ("[object ShadowRoot]" === t.toString()) return !0;
      t = t.parentNode;
    }

    return !1;
  }

  function pi(e, n) {
    var r = n.elements;
    r.textElement.addEventListener("click", function (r) {
      return function (e, n, r) {
        var i = r,
            o = r.elements;

        if (e.target.id !== "prompter-text" + r.randomString) {
          var a = e.target.id.replace("word-", "").replace(r.randomString, ""),
              s = JSON.parse(n.exports[t.Exports.JIIX]).words;

          if (i.wordToChange = s[a], i.wordToChange.id = a, o.candidatesElement.innerHTML = "", i.wordToChange && i.wordToChange.candidates) {
            o.candidatesElement.style.display = "flex", i.wordToChange.candidates.forEach(function (e, t) {
              i.wordToChange.label === e ? o.candidatesElement.innerHTML += '<span id="cdt-' + t + r.randomString + '" class="selected-word">' + e + "</span>" : o.candidatesElement.innerHTML += '<span id="cdt-' + t + r.randomString + '">' + e + "</span>";
            });
            var c = e.target.getBoundingClientRect().left - 60;
            o.candidatesElement.style.top = "48px", o.candidatesElement.style.left = c + "px", e.target.parentNode.parentNode.parentNode.insertBefore(o.candidatesElement, e.target.parentNode.parentNode);
          }
        }
      }(r, e, n);
    }), r.candidatesElement.addEventListener("click", function (r) {
      return function (e, n, r) {
        var i = r,
            o = r.elements,
            a = e.target.innerText;

        if (a !== i.wordToChange.label && i.wordToChange.candidates.includes(a)) {
          var s = JSON.parse(n.exports[t.Exports.JIIX]);
          s.words[i.wordToChange.id].label = a, n.import_(JSON.stringify(s), t.Exports.JIIX);
        }

        o.candidatesElement.style.display = "none";
      }(r, e, n);
    }), r.ellipsisElement.addEventListener("click", function (e) {
      return function (e, t) {
        var n = t,
            r = function () {
          var t = e.target.offsetLeft - 68;
          n.menuElement.style.left = t + "px";
        },
            i = document.contains(n.menuElement);

        hi(n.menuElement) || i ? "none" === n.menuElement.style.display && (r(), n.menuElement.style.display = "flex") : (n.menuElement.style.display = "flex", r(), n.menuElement.appendChild(n.convertElement), n.menuElement.appendChild(n.copyElement), n.menuElement.appendChild(n.deleteElement), e.target.parentNode.insertBefore(n.menuElement, e.target));
      }(e, r);
    }), r.copyElement.addEventListener("click", function () {
      var scribbleText = $('#editor.ms-editor .more-menu .options-label-button[data-clipboard-text]').attr('data-clipboard-text');
      $("body").append("<input type='text' id='scribbleText' name='scribbleText' />");
      $("#scribbleText").val(scribbleText);
      document.execCommand("copy");
     $("#scribbleText").remove();
      r.menuElement.style.display = "none";
    }), r.convertElement.addEventListener("click", function () {
      r.menuElement.style.display = "none", e.convert();
    }), r.deleteElement.addEventListener("click", function () {
      r.menuElement.style.display = "none", e.clear();
    });
  }

  function gi(e) {
    var t = "-" + Math.random().toString(10).substring(2, 12),
        n = function (e) {
      var t = document.createElement("div");
      t.id = "smartguide" + e, t.classList.add("smartguide");
      var n = document.createElement("div");
      n.id = "prompter-text" + e, n.classList.add("prompter-text"), n.setAttribute("touch-action", "none");
      var r = document.createElement("div");
      r.id = "prompter-text-container" + e, r.classList.add("prompter-text-container"), r.appendChild(n);
      var i = document.createElement("div");
      i.id = "ellipsis" + e, i.classList.add("ellipsis"), i.innerHTML = "...";
      var o = document.createElement("div");
      o.id = "tag-icon" + e, o.classList.add("tag-icon"), o.innerHTML = "&#182;";
      var a = document.createElement("div");
      a.id = "candidates" + e, a.classList.add("candidates");
      var s = document.createElement("div");
      s.id = "more-menu" + e, s.classList.add("more-menu");
      var c = document.createElement("button");
      c.classList.add("options-label-button"), c.id = "convert" + e, c.innerHTML = "Convert";
      var l = document.createElement("button");
      l.classList.add("options-label-button"), l.id = "copy" + e, l.innerHTML = "Copy";
      var u = document.createElement("button");
      return u.classList.add("options-label-button"), u.id = "delete" + e, u.innerHTML = "Delete", {
        smartGuideElement: t,
        textElement: n,
        textContainer: r,
        candidatesElement: a,
        menuElement: s,
        tagElement: o,
        ellipsisElement: i,
        convertElement: c,
        copyElement: l,
        deleteElement: u
      };
    }(t),
        r = (new fi(n.copyElement), {
      editor: e,
      wordToChange: "",
      lastWord: "",
      previousLabelExport: " ",
      perfectScrollbar: new ti(n.textContainer, {
        suppressScrollY: !0,
        scrollXMarginOffset: 1
      }),
      elements: n,
      smartGuideTimeOutId: 0,
      randomString: t
    });

    return pi(e, r), e.configuration.recognitionParams.v4.text.smartGuideFadeOut.enable && function () {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1e4,
          t = arguments[1],
          n = t,
          r = t.elements;
      new MutationObserver(function (t) {
        t.forEach(function () {
          n.smartGuideTimeOutId && clearTimeout(n.smartGuideTimeOutId), "none" === r.candidatesElement.style.display && "none" === r.menuElement.style.display ? n.smartGuideTimeOutId = setTimeout(function () {
            r.smartGuideElement.classList.add("smartguide-out"), r.smartGuideElement.classList.remove("smartguide-in");
          }, e) : document.contains(r.candidatesElement) || document.contains(r.menuElement) || (n.smartGuideTimeOutId = setTimeout(function () {
            r.smartGuideElement.classList.add("smartguide-out"), r.smartGuideElement.classList.remove("smartguide-in");
          }, e));
        });
      }).observe(r.smartGuideElement, {
        childList: !0,
        subtree: !0,
        attributes: !0
      });
    }(e.configuration.recognitionParams.v4.text.smartGuideFadeOut.duration, r), r;
  }

  var mi = Object.freeze({
    inkImporter: function (e, t, n, r) {
      var i = e;
      a.debug("inkImporter start importing =>", t);
      var o = Object.assign({}, i.behavior.grabber);
      o.detach = i.behavior.grabber.detach, i.behavior.grabber = {};
      var s = [];
      t.forEach(function (e) {
        e.convert ? s.push({
          action: "convert",
          value: !0
        }) : e.setDelay ? s.push({
          action: "setDelay",
          value: e.setDelay
        }) : (e.color && s.push({
          action: "setColor",
          value: e.color
        }), e.X.forEach(function (t, n) {
          var r = "move";
          0 === n ? r = "down" : n === e.X.length - 1 && (r = "up"), s.push({
            action: r,
            point: {
              x: e.X[n],
              y: e.Y[n]
            }
          });
        }));
      }), a.debug("Array of actions =>", s), function e(t, n, a) {
        if (n < t.length) {
          var s = t[n],
              c = a;
          if ("convert" === s.action ? i.convert() : "setDelay" === s.action ? c = s.value : "setColor" === s.action ? i.penStyle = {
            color: s.value
          } : (s.point.t = new Date().getTime(), "down" === s.action ? i.pointerDown(s.point) : "up" === s.action ? i.pointerUp(s.point) : "move" === s.action && i.pointerMove(s.point)), r && n === t.map(function (e) {
            return e.action;
          }).lastIndexOf("down") - 1) setTimeout(function () {
            e(t, n + 1, c);
          }, r);else if (n === t.length - 1) {
            var l = new Event("drawEnded");
            document.dispatchEvent(l), i.behavior.grabber = o;
          } else setTimeout(function () {
            e(t, n + 1, c);
          }, c);
        }
      }(s, 0, n);
    },
    importStrokeGroups: function (e, t) {
      t.forEach(function (t) {
        t.strokes.forEach(function (n) {
          ve(e.model, n), ye(e.model, n, t.penStyle);
        });
      }), e.renderer.drawModel(e.rendererContext, e.model, e.stroker);
    }
  });

  function vi(e, n) {
    for (var r = e, i = arguments.length, o = Array(i > 2 ? i - 2 : 0), s = 2; s < i; s++) o[s - 2] = arguments[s];

    o.forEach(function (i) {
      switch (i) {
        case t.EventType.RENDERED:
          break;

        case t.EventType.UNDO:
        case t.EventType.REDO:
        case t.EventType.CLEAR:
        case t.EventType.CONVERT:
        case t.EventType.EXPORT:
          e.callbacks.forEach(function (t) {
            return t.call(e.domElement, i);
          });
          break;

        case t.EventType.LOADED:
        case t.EventType.CHANGED:
          e.callbacks.forEach(function (t) {
            return t.call(e.domElement, i, {
              initialized: e.initialized,
              canUndo: e.canUndo,
              canRedo: e.canRedo,
              canClear: e.canClear,
              isEmpty: e.isEmpty,
              possibleUndoCount: e.possibleUndoCount,
              undoStackIndex: e.undoStackIndex,
              canConvert: e.canConvert,
              canExport: e.canExport
            });
          });
          break;

        case t.EventType.EXPORTED:
          window.clearTimeout(r.notifyTimer), r.notifyTimer = window.setTimeout(function () {
            e.callbacks.forEach(function (t) {
              return t.call(e.domElement, i, {
                exports: e.exports
              });
            });
          }, r.configuration.processDelay);
          break;

        case t.EventType.SUPPORTED_IMPORT_MIMETYPES:
          e.callbacks.forEach(function (t) {
            return t.call(e.domElement, i, {
              mimeTypes: e.supportedImportMimeTypes
            });
          });
          break;

        case t.EventType.ERROR:
          e.callbacks.forEach(function (t) {
            return t.call(e.domElement, i, n);
          });
          break;

        case t.EventType.IDLE:
          e.callbacks.forEach(function (t) {
            return t.call(e.domElement, i, {
              idle: e.idle
            });
          });
          break;

        default:
          a.debug("No valid trigger configured for " + i);
      }
    });
  }

  function yi(e, t, n, r, i) {
    for (var o = arguments.length, s = Array(o > 5 ? o - 5 : 0), c = 5; c < o; c++) s[c - 5] = arguments[c];

    e && Ft(n, r) ? (a.debug("Reset is needed"), e(n, r, function (e, r) {
      for (var o = arguments.length, a = Array(o > 2 ? o - 2 : 0), c = 2; c < o; c++) a[c - 2] = arguments[c];

      e ? i.apply(void 0, [e, r].concat(a)) : t.apply(void 0, [n, r, i].concat(s));
    })) : t.apply(void 0, [n, r, i].concat(s));
  }

  function bi(e, t) {
    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : e.configuration.triggers[t];
    return !(!e.recognizer || !e.recognizer.getInfo().availableTriggers[t].includes(n)) || (a.error(n + " is not a valid trigger for " + t), !1);
  }

  function Ei(e, n) {
    for (var r = e, i = n, o = arguments.length, s = Array(o > 2 ? o - 2 : 0), c = 2; c < o; c++) s[c - 2] = arguments[c];

    a.debug("model changed callback on " + s + " event(s)", n), i.creationTime === e.model.creationTime && (i.rawStrokes.length === e.model.rawStrokes.length && i.lastPositions.lastSentPosition >= e.model.lastPositions.lastReceivedPosition ? (r.model = Le(r.model, i), (me(r.model) || s.includes(t.EventType.RENDERED)) && e.renderer.drawModel(e.rendererContext, r.model, e.stroker)) : (r.model = i, e.renderer.drawModel(e.rendererContext, r.model, e.stroker)), vi.apply(void 0, [e, void 0].concat(s))), "TEXT" === e.configuration.recognitionParams.type && "V4" === e.configuration.recognitionParams.apiVersion && "REST" !== e.configuration.recognitionParams.protocol && e.configuration.recognitionParams.v4.text.mimeTypes.includes(t.Exports.JIIX) && e.configuration.recognitionParams.v4.text.smartGuide && function (e, n) {
      e.smartGuide = function (e, n) {
        var r = e,
            i = e.elements,
            o = document.contains(i.smartGuideElement);
        hi(i.smartGuideElement) || o || function (e) {
          var t = e,
              n = e.elements,
              r = 3.779527559 * t.editor.configuration.recognitionParams.v4.text.margin.top,
              i = 3.779527559 * t.editor.configuration.recognitionParams.v4.text.margin.left;
          !function (e, r) {
            n.smartGuideElement.style.top = r + "px", n.smartGuideElement.style.left = e + "px", n.smartGuideElement.style.visibility = "hidden", t.editor.domElement.insertBefore(n.smartGuideElement, t.editor.loader);
          }(i, r - 45.354330708), n.smartGuideElement.appendChild(n.tagElement);
          var o = t.editor.domElement.clientWidth - i - n.tagElement.offsetWidth - 35 - i;
          (function (e, t) {
            n.textContainer.style.left = e + "px", n.textContainer.style.width = t + "px", n.textContainer.style.maxWidth = t + "px", n.smartGuideElement.appendChild(n.textContainer);
          })(i = n.tagElement.offsetWidth, o), function (e) {
            n.ellipsisElement.style.left = e + "px", n.smartGuideElement.appendChild(n.ellipsisElement);
          }(i += o), n.menuElement.style.display = "none", n.menuElement.appendChild(n.convertElement), n.menuElement.appendChild(n.copyElement), n.menuElement.appendChild(n.deleteElement), n.smartGuideElement.appendChild(n.menuElement), n.candidatesElement.style.display = "none", n.smartGuideElement.appendChild(n.candidatesElement), n.smartGuideElement.style.height = "48px", n.smartGuideElement.style.width = n.tagElement.offsetWidth + n.textContainer.offsetWidth + n.ellipsisElement.offsetWidth + "px", t.perfectScrollbar.update();
        }(e);

        var a = function (t, n, r) {
          var i = document.createElement("span");
          return i.id = "word-" + n + e.randomString, t ? i.innerHTML = "&nbsp;" : i.textContent = r.label, i;
        };

        if (n && JSON.parse(n[t.Exports.JIIX]).words.length > 0) {
          if (i.smartGuideElement.classList.add("smartguide-in"), i.smartGuideElement.classList.remove("smartguide-out"), i.candidatesElement.style.display = "none", i.menuElement.style.display = "none", r.previousLabelExport && r.previousLabelExport !== JSON.parse(n[t.Exports.JIIX]).label) {
            var s = JSON.parse(n[t.Exports.JIIX]).words;
            !function (e) {
              i.textElement.innerHTML = "";
              var t = document.createDocumentFragment();
              e.forEach(function (n, o) {
                if (" " === n.label || n.label.includes("\n")) t.appendChild(a(!0, o));else if (o !== e.length - 1) t.appendChild(a(!1, o, n));else {
                  i.textElement.appendChild(t), r.perfectScrollbar.update(), "" === r.lastWord && (r.lastWord = n);
                  var s = a(!1, o, n);
                  r.lastWord.candidates !== n.candidates && r.lastWord.label !== n.label ? (s.classList.add("added-word"), i.textElement.appendChild(s), i.textContainer.scrollLeft = s.offsetLeft, r.lastWord = n) : (i.textElement.appendChild(s), i.textContainer.scrollLeft = s.offsetLeft);
                }
              });
            }(s), function (o) {
              if (r.tempWords && r.tempWords.length === o.length) {
                var a = o.map(function (e) {
                  return e.label;
                }),
                    s = r.tempWords.map(function (e) {
                  return e.label;
                }),
                    c = a.indexOf(a.filter(function (e) {
                  return -1 === s.indexOf(e);
                })[0]);
                document.getElementById("word-" + c + e.randomString) && c > -1 && (document.getElementById("word-" + c + e.randomString).classList.add("modified-word"), i.textContainer.scrollLeft = document.getElementById("word-" + c + e.randomString).offsetLeft - 10);
              }

              r.tempWords = JSON.parse(n[t.Exports.JIIX]).words;
            }(s);
          }

          r.previousLabelExport = JSON.parse(n[t.Exports.JIIX]).label, i.copyElement.setAttribute("data-clipboard-text", JSON.parse(n[t.Exports.JIIX]).label);
        } else i.smartGuideElement.classList.add("smartguide-out"), i.smartGuideElement.classList.remove("smartguide-in");

        return r;
      }(e.smartGuide, n);
    }(r, i.exports), be(n).length > 0 && !e.recognizer.addStrokes && e.configuration.triggers.exportContent !== t.Trigger.DEMAND && wi(e, n);
  }

  function xi(e, n, r) {
    for (var i = arguments.length, o = Array(i > 3 ? i - 3 : 0), s = 3; s < i; s++) o[s - 3] = arguments[s];

    var c = e,
        l = function (n, r) {
      for (var i = arguments.length, s = Array(i > 2 ? i - 2 : 0), l = 2; l < i; l++) s[l - 2] = arguments[l];

      n ? ("close" !== n.type && a.error("Error while firing the recognition", n.stack || n), "Invalid application key." === n.message || "Invalid HMAC" === n.message || n.error && n.error.result && n.error.result.error && ("InvalidApplicationKeyException" === n.error.result.error || "InvalidHMACSignatureException" === n.error.result.error) || n.code && "access.not.granted" === n.code ? c.error.innerText = t.Error.WRONG_CREDENTIALS : "Session is too old. Max Session Duration Reached" === n.message || n.code && "session.too.old" === n.code ? c.error.innerText = t.Error.TOO_OLD : 1006 !== n.code && 1e3 !== n.code || "none" !== c.error.style.display || (c.error.innerText = t.Error.NOT_REACHABLE), c.error.innerText !== t.Error.TOO_OLD && "CLOSE_RECOGNIZER" !== n.reason || !Jt(e.recognizerContext) ? (c.error.style.display = "initial", vi.apply(void 0, [e, n, t.EventType.ERROR].concat(s))) : (a.info("Reconnection is available", n.stack || n), c.error.style.display = "none")) : ("initial" === c.error.style.display && (c.error.style.display = "none"), Ei.apply(void 0, [c, r].concat(oe([].concat(o, s).filter(function (e, t, n) {
        return t === n.indexOf(e);
      })))));
    };

    a.debug("recognition callback"), e.undoRedoManager.updateModel && !n ? e.undoRedoManager.updateModel(e.undoRedoContext, r, l) : l.apply(void 0, [n, r].concat(o));
  }

  function wi(e, n, r) {
    var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : e.configuration.triggers.exportContent;
    e.recognizer && e.recognizer.export_ && e.recognizerContext.initPromise.then(function () {
      if (bi(e, "exportContent", i)) {
        var o = e;
        window.clearTimeout(e.exportTimer), o.exportTimer = window.setTimeout(function () {
          yi(e.recognizer.reset, e.recognizer.export_, e.recognizerContext, n, function (t, n) {
            for (var r = arguments.length, i = Array(r > 2 ? r - 2 : 0), o = 2; o < r; o++) i[o - 2] = arguments[o];

            xi.apply(void 0, [e, t, n].concat(i));
          }, r);
        }, i === t.Trigger.QUIET_PERIOD ? e.configuration.triggerDelay : 0);
      }
    });
  }

  var Si = function () {
    function e(t, n, r, i, o) {
      re(this, e), this.domElement = t, this.domElement.classList.add("ms-editor"), this.loader = document.createElement("div"), this.loader.classList.add("loader"), this.loader = this.domElement.appendChild(this.loader), this.error = document.createElement("div"), this.error.classList.add("error-msg"), this.error = this.domElement.appendChild(this.error), this.exportTimer = void 0, this.resizeTimer = void 0, this.notifyTimer = void 0, this.innerBehaviors = function (e) {
        if (e) {
          var t = {
            grabber: e.grabber || Pr.grabber,
            rendererList: e.rendererList || Pr.rendererList,
            strokerList: e.strokerList || Pr.strokerList,
            recognizerList: e.recognizerList || Pr.recognizerList,
            callbacks: e.callbacks || Pr.callbacks,
            getBehaviorFromConfiguration: e.getBehaviorFromConfiguration || Pr.getBehaviorFromConfiguration
          };
          return a.debug("Override default behaviors", t), t;
        }

        return Pr;
      }(o), this.configuration = n, this.smartGuide = gi(this), this.localTheme = "", this.theme = i, this.penStyle = r, this.penStyleClasses = "", this.domElement.editor = this;
    }

    return ie(e, [{
      key: "getStats",
      value: function () {
        return function (e) {
          var t = {
            strokesCount: 0,
            pointsCount: 0,
            byteSize: 0,
            humanSize: 0,
            humanUnit: "BYTE"
          };

          if (e.rawStrokes) {
            t.strokesCount = e.rawStrokes.length;
            var n = cn(Gt({
              configuration: w
            }), e);
            t.pointsCount = e.rawStrokes.map(function (e) {
              return e.x.length;
            }).reduce(function (e, t) {
              return e + t;
            }, 0);
            var r = n.textInput.length;
            t.byteSize = r, r < 270 ? (t.humanUnit = "BYTE", t.byteSize = 0, t.humanSize = 0) : r < 2048 ? (t.humanUnit = "BYTES", t.humanSize = r) : r < 1048576 ? (t.humanUnit = "KiB", t.humanSize = (r / 1024).toFixed(2)) : (t.humanUnit = "MiB", t.humanSize = (r / 1024 / 1024).toFixed(2));
          }

          return f.info("Stats", t), t;
        }(this.model);
      }
    }, {
      key: "pointerDown",
      value: function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "pen",
            n = arguments[2];
        a.trace("Pointer down", e), window.clearTimeout(this.notifyTimer), window.clearTimeout(this.exportTimer), this.model = Ee(this.model, e, Object.assign({
          pointerType: t,
          pointerId: n
        }, this.theme.ink, this.localPenStyle)), this.renderer.drawCurrentStroke(this.rendererContext, this.model, this.stroker);
      }
    }, {
      key: "pointerMove",
      value: function (e) {
        a.trace("Pointer move", e), this.model = xe(this.model, e), this.renderer.drawCurrentStroke(this.rendererContext, this.model, this.stroker);
      }
    }, {
      key: "pointerUp",
      value: function (e) {
        a.trace("Pointer up", e), this.model = we(this.model, e, this.penStyle), this.renderer.drawModel(this.rendererContext, this.model, this.stroker), this.recognizer.addStrokes ? function (e, t) {
          var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : e.configuration.triggers.addStrokes;
          e.recognizer && e.recognizer.addStrokes && e.recognizerContext.initPromise.then(function () {
            bi(e, "addStrokes", n) && yi(e.recognizer.reset, e.recognizer.addStrokes, e.recognizerContext, t, function (t, n) {
              for (var r = arguments.length, i = Array(r > 2 ? r - 2 : 0), o = 2; o < r; o++) i[o - 2] = arguments[o];

              xi.apply(void 0, [e, t, n].concat(i));
            });
          });
        }(this, this.model) : xi(this, void 0, this.model);
      }
    }, {
      key: "removeStroke",
      value: function (e) {
        this.model.strokeGroups.forEach(function (t) {
          var n = t.strokes.map(function (e) {
            return JSON.stringify(e);
          }).indexOf(JSON.stringify(e));
          -1 !== n && t.strokes.splice(n, 1);
        });
        var t = this.model.rawStrokes.map(function (e) {
          return JSON.stringify(e);
        }).indexOf(JSON.stringify(e));
        -1 !== t && this.model.rawStrokes.splice(t, 1), this.renderer.drawModel(this.rendererContext, this.model, this.stroker), xi(this, void 0, this.model), "DEMAND" !== this.configuration.triggers.exportContent && wi(this, this.model);
      }
    }, {
      key: "reDraw",
      value: function (e, t) {
        var n = this;
        e.forEach(function (e) {
          ve(n.model, e);
        }), t.forEach(function (e) {
          e.strokes.forEach(function (t) {
            ye(n.model, t, e.penStyle);
          });
        }), this.renderer.drawModel(this.rendererContext, this.model, this.stroker), xi(this, void 0, this.model);
      }
    }, {
      key: "waitForIdle",
      value: function () {
        var e, n;
        vi(this, void 0, t.EventType.IDLE), e = this, n = this.model, e.recognizer && e.recognizer.waitForIdle && e.recognizerContext.initPromise.then(function () {
          e.recognizer.waitForIdle(e.recognizerContext, n, function (t, n) {
            for (var r = arguments.length, i = Array(r > 2 ? r - 2 : 0), o = 2; o < r; o++) i[o - 2] = arguments[o];

            xi.apply(void 0, [e, t, n].concat(i));
          });
        });
      }
    }, {
      key: "undo",
      value: function () {
        var e = this;
        a.debug("Undo current model", this.model), vi(this, void 0, t.EventType.UNDO), this.undoRedoManager.undo(this.undoRedoContext, this.model, function (t, n) {
          for (var r = arguments.length, i = Array(r > 2 ? r - 2 : 0), o = 2; o < r; o++) i[o - 2] = arguments[o];

          Ei.apply(void 0, [e, n].concat(i));
        });
      }
    }, {
      key: "redo",
      value: function () {
        var e = this;
        a.debug("Redo current model", this.model), vi(this, void 0, t.EventType.REDO), this.undoRedoManager.redo(this.undoRedoContext, this.model, function (t, n) {
          for (var r = arguments.length, i = Array(r > 2 ? r - 2 : 0), o = 2; o < r; o++) i[o - 2] = arguments[o];

          Ei.apply(void 0, [e, n].concat(i));
        });
      }
    }, {
      key: "clear",
      value: function () {
        var e = this;
        this.canClear && (a.debug("Clear current model", this.model), vi(this, void 0, t.EventType.CLEAR), this.recognizer.clear(this.recognizerContext, this.model, function (t, n) {
          for (var r = arguments.length, i = Array(r > 2 ? r - 2 : 0), o = 2; o < r; o++) i[o - 2] = arguments[o];

          xi.apply(void 0, [e, t, n].concat(i));
        }));
      }
    }, {
      key: "convert",
      value: function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "DIGITAL_EDIT";
        this.canConvert && (vi(this, void 0, t.EventType.CONVERT), function (e, t, n) {
          e.recognizer && e.recognizer.convert && e.recognizerContext.initPromise.then(function () {
            e.recognizer.convert(e.recognizerContext, t, function (t, n) {
              for (var r = arguments.length, i = Array(r > 2 ? r - 2 : 0), o = 2; o < r; o++) i[o - 2] = arguments[o];

              xi.apply(void 0, [e, t, n].concat(i));
            }, n);
          });
        }(this, this.model, e));
      }
    }, {
      key: "setGuides",
      value: function () {
        var e,
            t,
            n = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
        this.configuration.recognitionParams.v4.text.guides.enable = n, e = this, t = this.model, e.recognizer && e.recognizer.sendConfiguration && e.recognizerContext.initPromise.then(function () {
          e.recognizer.sendConfiguration(e.recognizerContext, t, function (t, n) {
            for (var r = arguments.length, i = Array(r > 2 ? r - 2 : 0), o = 2; o < r; o++) i[o - 2] = arguments[o];

            xi.apply(void 0, [e, t, n].concat(i));
          });
        });
      }
    }, {
      key: "export_",
      value: function (e) {
        this.canExport && (vi(this, void 0, t.EventType.EXPORT), wi(this, this.model, e, t.Trigger.DEMAND));
      }
    }, {
      key: "import_",
      value: function (e, n) {
        vi(this, void 0, t.EventType.IMPORT), function (e, t, n) {
          e.recognizer && e.recognizer.import_ && e.recognizerContext.initPromise.then(function () {
            e.recognizer.import_(e.recognizerContext, t, n, function (t, n) {
              for (var r = arguments.length, i = Array(r > 2 ? r - 2 : 0), o = 2; o < r; o++) i[o - 2] = arguments[o];

              xi.apply(void 0, [e, t, n].concat(i));
            });
          });
        }(this, this.model, e instanceof Blob ? e : new Blob([e], {
          type: n
        }));
      }
    }, {
      key: "getSupportedImportMimeTypes",
      value: function () {
        var e, t;
        e = this, t = this.model, e.recognizer && e.recognizer.getSupportedImportMimeTypes && e.recognizerContext.initPromise.then(function () {
          e.recognizer.getSupportedImportMimeTypes(e.recognizerContext, t, function (t, n) {
            for (var r = arguments.length, i = Array(r > 2 ? r - 2 : 0), o = 2; o < r; o++) i[o - 2] = arguments[o];

            xi.apply(void 0, [e, t, n].concat(i));
          });
        });
      }
    }, {
      key: "pointerEvents",
      value: function (e) {
        !function (e, t, n) {
          e.recognizer && e.recognizer.pointerEvents && e.recognizerContext.initPromise.then(function () {
            e.recognizer.pointerEvents(e.recognizerContext, t, n, function (t, n) {
              for (var r = arguments.length, i = Array(r > 2 ? r - 2 : 0), o = 2; o < r; o++) i[o - 2] = arguments[o];

              xi.apply(void 0, [e, t, n].concat(i));
            });
          });
        }(this, this.model, e);
      }
    }, {
      key: "resize",
      value: function () {
        var e, t, n, r, i, o, s;
        a.debug("Resizing editor"), this.renderer.resize(this.rendererContext, this.model, this.stroker, this.configuration.renderingParams.minHeight, this.configuration.renderingParams.minWidth), e = this, t = this.model, e.recognizer && e.recognizer.resize && (e.recognizerContext.initPromise.then(function () {
          var n = e;
          window.clearTimeout(e.resizeTimer), n.resizeTimer = window.setTimeout(function () {
            e.recognizer.resize(e.recognizerContext, t, function (t, n) {
              for (var r = arguments.length, i = Array(r > 2 ? r - 2 : 0), o = 2; o < r; o++) i[o - 2] = arguments[o];

              xi.apply(void 0, [e, t, n].concat(i));
            }, e.domElement);
          }, e.configuration.resizeTriggerDelay);
        }), n = e.smartGuide, r = n, i = n.elements, o = 3.779527559 * r.editor.configuration.recognitionParams.v4.text.margin.left, s = r.editor.domElement.clientWidth - o - i.tagElement.offsetWidth - 35 - o, i.textContainer.style.width = s + "px", i.textContainer.style.maxWidth = s + "px", o = i.tagElement.offsetWidth, o += s, i.ellipsisElement.style.left = o + "px", i.smartGuideElement.style.width = i.tagElement.offsetWidth + i.textContainer.offsetWidth + i.ellipsisElement.offsetWidth + "px", r.perfectScrollbar.update());
      }
    }, {
      key: "setThemeForFont",
      value: function (e) {
        var n = !Object.keys(t.Languages).includes(e),
            r = "hy_AM" === e,
            i = n || r ? t.Languages.default : t.Languages[e],
            o = n || r ? "1.2" : "1.8";
        this.theme = {
          ".text": {
            "font-family": i,
            "line-height": o
          }
        };
      }
    }, {
      key: "unload",
      value: function () {
        this.grabber && this.grabber.detach(this.domElement, this.grabberContext), this.innerRenderer && this.innerRenderer.detach(this.domElement, this.rendererContext);
      }
    }, {
      key: "forceChange",
      value: function () {
        vi(this, void 0, t.EventType.CHANGED);
      }
    }, {
      key: "configuration",
      set: function (e) {
        this.loader.style.display = "initial", this.error.style.display = "none", this.innerConfiguration = S(e), this.setThemeForFont(this.innerConfiguration.recognitionParams.v4.lang), this.behavior = this.behaviors.getBehaviorFromConfiguration(this.behaviors, this.innerConfiguration);
      },
      get: function () {
        return this.innerConfiguration;
      }
    }, {
      key: "penStyle",
      set: function (e) {
        var t, n, r, i;
        this.innerPenStyle = (n = x({}, C, void 0 === (t = e) ? {} : t), a.debug("Override default pen style", n), n), this.localPenStyle = this.innerPenStyle, r = this, i = this.model, r.recognizer && r.recognizer.setPenStyle && r.recognizerContext.initPromise.then(function () {
          r.recognizer.setPenStyle(r.recognizerContext, i, r.penStyle, function (e, t) {
            for (var n = arguments.length, i = Array(n > 2 ? n - 2 : 0), o = 2; o < n; o++) i[o - 2] = arguments[o];

            xi.apply(void 0, [r, e, t].concat(i));
          });
        });
      },
      get: function () {
        return this.innerPenStyle;
      }
    }, {
      key: "penStyleClasses",
      set: function (e) {
        var t, n;
        this.innerPenStyleClasses = e, this.localPenStyle = this.theme["." + this.innerPenStyleClasses], t = this, n = this.model, t.recognizer && t.recognizer.setPenStyleClasses && t.recognizerContext.initPromise.then(function () {
          t.recognizer.setPenStyleClasses(t.recognizerContext, n, t.penStyleClasses, function (e, n) {
            for (var r = arguments.length, i = Array(r > 2 ? r - 2 : 0), o = 2; o < r; o++) i[o - 2] = arguments[o];

            xi.apply(void 0, [t, e, n].concat(i));
          });
        });
      },
      get: function () {
        return this.innerPenStyleClasses;
      }
    }, {
      key: "theme",
      set: function (e) {
        var t, n;
        this.innerTheme = function (e) {
          var t = x({}, I, void 0 === e ? {} : e);
          return a.debug("Override default theme", t), t;
        }(e), t = this, n = this.model, t.recognizer && t.recognizer.setTheme && t.recognizerContext.initPromise.then(function () {
          t.recognizer.setTheme(t.recognizerContext, n, t.theme, function (e, n) {
            for (var r = arguments.length, i = Array(r > 2 ? r - 2 : 0), o = 2; o < r; o++) i[o - 2] = arguments[o];

            xi.apply(void 0, [t, e, n].concat(i));
          });
        });
      },
      get: function () {
        return this.innerTheme;
      }
    }, {
      key: "behaviors",
      get: function () {
        return this.innerBehaviors;
      }
    }, {
      key: "behavior",
      set: function (e) {
        e && (this.grabber && this.grabber.detach(this.domElement, this.grabberContext), this.innerBehavior = e, this.renderer = this.innerBehavior.renderer, this.recognizer = this.innerBehavior.recognizer, this.grabberContext = this.grabber.attach(this.domElement, this));
      },
      get: function () {
        return this.innerBehavior;
      }
    }, {
      key: "recognizer",
      set: function (e) {
        var t = this;
        this.undoRedoContext = {
          stack: [],
          currentPosition: -1,
          maxSize: this.configuration.undoRedoMaxStackSize,
          canUndo: !1,
          canRedo: !1
        }, this.undoRedoManager = Lr;

        var n = function (n) {
          t.innerRecognizer = e, t.innerRecognizer && (t.recognizerContext = Gt(t), t.innerRecognizer.undo && t.innerRecognizer.redo && t.innerRecognizer.clear && (t.undoRedoContext = t.recognizerContext, t.undoRedoManager = t.innerRecognizer), t.innerRecognizer.init(t.recognizerContext, n, function (e, n) {
            for (var r = arguments.length, i = Array(r > 2 ? r - 2 : 0), o = 2; o < r; o++) i[o - 2] = arguments[o];

            a.debug("Recognizer initialized", n), t.loader.style.display = "none", xi.apply(void 0, [t, e, n].concat(i));
          }));
        };

        e && (this.innerRecognizer ? this.innerRecognizer.close(this.recognizerContext, this.model, function (e, r) {
          for (var i = arguments.length, o = Array(i > 2 ? i - 2 : 0), s = 2; s < i; s++) o[s - 2] = arguments[s];

          a.info("Recognizer closed"), xi.apply(void 0, [t, e, r].concat(o)), n(ge(r));
        }) : (this.model = pe(this.configuration), n(this.model)));
      },
      get: function () {
        return this.innerRecognizer;
      }
    }, {
      key: "renderer",
      set: function (e) {
        e && (this.innerRenderer && this.innerRenderer.detach(this.domElement, this.rendererContext), this.innerRenderer = e, this.innerRenderer && (this.rendererContext = this.innerRenderer.attach(this.domElement, this.configuration.renderingParams.minHeight, this.configuration.renderingParams.minWidth)));
      },
      get: function () {
        return this.innerRenderer;
      }
    }, {
      key: "grabber",
      get: function () {
        return this.behavior ? this.behavior.grabber : void 0;
      }
    }, {
      key: "stroker",
      get: function () {
        return this.behavior ? this.behavior.stroker : void 0;
      }
    }, {
      key: "callbacks",
      get: function () {
        return this.behavior ? this.behavior.callbacks : void 0;
      }
    }, {
      key: "png",
      get: function () {
        return function (e, t) {
          var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 10;

          if (e.rawStrokes.length > 0) {
            var r = Se(e),
                i = Ar(r, n),
                o = Ar(r, n),
                a = {
              renderingCanvas: o,
              renderingCanvasContext: o.getContext("2d"),
              capturingCanvas: i,
              capturingCanvasContext: i.getContext("2d")
            };
            return a.renderingCanvasContext.translate(-r.minX + n, -r.minY + n), Ne(a, e, t), a.renderingCanvas.toDataURL("image/png");
          }

          return null;
        }(this.model, this.stroker);
      }
    }, {
      key: "initialized",
      get: function () {
        return !!this.recognizerContext && this.recognizerContext.initialized;
      }
    }, {
      key: "idle",
      get: function () {
        return this.recognizerContext.idle;
      }
    }, {
      key: "canUndo",
      get: function () {
        return this.undoRedoContext.canUndo;
      }
    }, {
      key: "canRedo",
      get: function () {
        return this.undoRedoContext.canRedo;
      }
    }, {
      key: "isEmpty",
      get: function () {
        return this.recognizerContext.isEmpty;
      }
    }, {
      key: "canClear",
      get: function () {
        return this.canUndo && !this.isEmpty;
      }
    }, {
      key: "canConvert",
      get: function () {
        return this.canUndo && this.canClear && this.recognizer && this.recognizer.convert;
      }
    }, {
      key: "possibleUndoCount",
      get: function () {
        return this.recognizerContext.possibleUndoCount;
      }
    }, {
      key: "undoStackIndex",
      get: function () {
        return this.recognizerContext.undoStackIndex;
      }
    }, {
      key: "canExport",
      get: function () {
        return this.canUndo && this.canClear && this.recognizer && this.recognizer.getInfo().availableTriggers.exportContent.includes(t.Trigger.DEMAND);
      }
    }, {
      key: "exports",
      get: function () {
        return this.model ? this.model.exports : void 0;
      }
    }, {
      key: "supportedImportMimeTypes",
      get: function () {
        return this.recognizerContext.supportedImportMimeTypes;
      }
    }, {
      key: "eastereggs",
      get: function () {
        return mi;
      }
    }]), e;
  }(),
      Ti = {
    af_ZA: "Afrikaans",
    az_AZ: "Azərbaycanca",
    be_BY: "Беларуская",
    bg_BG: "Български",
    bs_BA: "Bosanski",
    ca_ES: "Català",
    ceb_PH: "Sinugboanon",
    cs_CZ: "Čeština",
    da_DK: "Dansk",
    de_AT: "Deutsch (Österreich)",
    de_DE: "Deutsch",
    el_GR: "Ελληνικά",
    en_CA: "English (Canada)",
    en_GB: "English (United Kingdom)",
    en_PH: "English (Philippines)",
    en_US: "English (United States)",
    es_CO: "Español (Colombia)",
    es_ES: "Español (España)",
    es_MX: "Español (México)",
    et_EE: "Eesti",
    eu_ES: "Euskara",
    fi_FI: "Suomi",
    fil_PH: "Filipino",
    fr_CA: "Français (Canada)",
    fr_FR: "Français (France)",
    ga_IE: "Gaeilge",
    gl_ES: "Galego",
    hr_HR: "Hrvatski",
    hu_HU: "Magyar",
    hy_AM: "Հայերեն",
    id_ID: "Bahasa Indonesia",
    is_IS: "Íslenska",
    it_IT: "Italiano",
    ja_JP: "日本語",
    ka_GE: "ქართული",
    kk_KZ: "Қазақша",
    ko_KR: "한국어",
    lt_LT: "Lietuvių",
    lv_LV: "Latviešu",
    mg_MG: "Malagasy",
    mk_MK: "Македонски",
    mn_MN: "Монгол",
    ms_MY: "Bahasa Melayu (Malaysia)",
    nl_BE: "Nederlands (België)",
    nl_NL: "Nederlands",
    no_NO: "Norsk (Bokmål)",
    pl_PL: "Polski",
    pt_BR: "Português (Brasil)",
    pt_PT: "Português (Portugal)",
    ro_RO: "Română",
    ru_RU: "Русский",
    sk_SK: "Slovenčina",
    sl_SI: "Slovenščina",
    sq_AL: "Shqip",
    sr_Cyrl_RS: "Српски",
    sr_Latn_RS: "Srpski",
    sv_SE: "Svenska",
    sw_TZ: "Kiswahili",
    tr_TR: "Türkçe",
    tt_RU: "Татарча",
    uk_UA: "Українська",
    vi_VN: "Tiếng Việt",
    zh_CN: "中文 (中国)",
    zh_HK: "中文 (香港)",
    zh_TW: "中文 (台灣)"
  },
      Ri = {
    result: Ti
  },
      Ci = Object.freeze({
    result: Ti,
    default: Ri
  }),
      ki = {
    af_ZA: "Afrikaans",
    az_AZ: "Azərbaycanca",
    id_ID: "Bahasa Indonesia",
    ms_MY: "Bahasa Melayu (Malaysia)",
    bs_BA: "Bosanski",
    ca_ES: "Català",
    da_DK: "Dansk",
    de_DE: "Deutsch",
    de_AT: "Deutsch (Österreich)",
    et_EE: "Eesti",
    en_CA: "English (Canada)",
    en_GB: "English (United Kingdom)",
    en_US: "English (United States)",
    es_ES: "Español (España)",
    es_MX: "Español (México)",
    eu_ES: "Euskara",
    fr_CA: "Français (Canada)",
    fr_FR: "Français (France)",
    ga_IE: "Gaeilge",
    gl_ES: "Galego",
    hr_HR: "Hrvatski",
    it_IT: "Italiano",
    lv_LV: "Latviešu",
    lt_LT: "Lietuvių",
    hu_HU: "Magyar",
    nl_NL: "Nederlands",
    nl_BE: "Nederlands (België)",
    no_NO: "Norsk (Bokmål)",
    pl_PL: "Polski",
    pt_BR: "Português (Brasil)",
    pt_PT: "Português (Portugal)",
    ro_RO: "Română",
    sq_AL: "Shqip",
    sk_SK: "Slovenčina",
    sl_SI: "Slovenščina",
    sr_Latn_RS: "Srpski",
    fi_FI: "Suomi",
    sv_SE: "Svenska",
    th_TH: "Thaiไทย",
    vi_VN: "Tiếng Việt",
    tr_TR: "Türkçe",
    is_IS: "Íslenska",
    cs_CZ: "Čeština",
    el_GR: "Ελληνικά",
    be_BY: "Беларуская",
    bg_BG: "Български",
    mk_MK: "Македонски",
    mn_MN: "Монгол",
    ru_RU: "Русский",
    sr_Cyrl_RS: "Српски",
    tt_RU: "Татарча",
    uk_UA: "Українська",
    kk_KZ: "Қазақша",
    hy_AM: "Հայերեն",
    he_IL: "עברית",
    ur_PK: "اردو",
    ar: "العربية",
    fa_IR: "فارسی",
    hi_IN: "हिन्दी",
    ka_GE: "ქართული",
    zh_CN: "中文 (中国)",
    zh_TW: "中文 (台灣)",
    zh_HK: "中文 (香港)",
    ja_JP: "日本語",
    ko_KR: "한국어"
  },
      Pi = {
    result: ki
  },
      Ii = Object.freeze({
    result: ki,
    default: Pi
  });

  function _i(e, t, n, r, i) {
    return a.debug("Registering a new editor"), new Si(e, t, n, r, i);
  }

  function Li(e) {
    return "V4" === S(e).recognitionParams.apiVersion ? Ci : Ii;
  }

  var Ai = {
    Constants: t,
    DefaultConfiguration: w,
    DefaultBehaviors: Pr,
    DefaultPenStyle: C,
    DefaultTheme: I,
    register: _i,
    getAvailableLanguageList: Li,
    LoggerConfig: o,
    Editor: Si,
    InkModel: Ae,
    RecognizerContext: $t
  };
  e.default = Ai, e.Constants = t, e.DefaultConfiguration = w, e.DefaultBehaviors = Pr, e.DefaultPenStyle = C, e.DefaultTheme = I, e.register = _i, e.getAvailableLanguageList = Li, e.LoggerConfig = o, e.Editor = Si, e.InkModel = Ae, e.RecognizerContext = $t, Object.defineProperty(e, "__esModule", {
    value: !0
  });
}); //# sourceMappingURL=myscript.min.js.map