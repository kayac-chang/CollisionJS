// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"index.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../lib/core/utils.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resize = resize;

function resize(_ref) {
  var canvas = _ref.canvas;
  var clientWidth = canvas.clientWidth,
      clientHeight = canvas.clientHeight;
  canvas.width = clientWidth;
  canvas.height = clientHeight;
}
},{}],"../lib/core/Ticker.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Ticker;

function Delta(prev) {
  return function (cur) {
    var delta = (cur - prev) / 1000;
    prev = cur;
    return delta;
  };
}

function Ticker() {
  var updateFns = [];
  var getDelta = Delta(performance.now());
  update(getDelta(performance.now()));
  var _destroy = false;
  return {
    add: function add(func) {
      return updateFns.push(func);
    },
    destroy: function destroy() {
      return _destroy = true;
    }
  };

  function update(delta) {
    if (_destroy) {
      return;
    }

    updateFns.forEach(function (fn) {
      return fn(delta);
    });
    requestAnimationFrame(function (now) {
      return update(getDelta(now));
    });
  }
}
},{}],"../lib/core/elements/Line.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Line;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Line(ctx, _ref) {
  var style = _ref.style,
      start = _ref.start,
      end = _ref.end;
  ctx.strokeStyle = style;
  ctx.beginPath();

  var _start = _slicedToArray(start, 2),
      startX = _start[0],
      startY = _start[1];

  ctx.moveTo(startX, startY);

  var _end = _slicedToArray(end, 2),
      endX = _end[0],
      endY = _end[1];

  ctx.lineTo(endX, endY);
  ctx.stroke();
}
},{}],"../lib/core/elements/Circle.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Circle;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Circle(ctx, _ref) {
  var style = _ref.style,
      position = _ref.position,
      radius = _ref.radius;
  ctx.fillStyle = style;
  ctx.beginPath();

  var _position = _slicedToArray(position, 2),
      x = _position[0],
      y = _position[1];

  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
}
},{}],"../lib/core/elements/Rect.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Rect;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Rect(ctx, _ref) {
  var style = _ref.style,
      position = _ref.position,
      size = _ref.size;
  ctx.fillStyle = style;

  var _position = _slicedToArray(position, 2),
      x = _position[0],
      y = _position[1];

  var _size = _slicedToArray(size, 2),
      w = _size[0],
      h = _size[1];

  ctx.fillRect(x, y, w, h);
}
},{}],"../lib/core/elements/Text.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Text;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Text(ctx, _ref) {
  var style = _ref.style,
      msg = _ref.msg,
      position = _ref.position;
  ctx.fillStyle = style;

  var _position = _slicedToArray(position, 2),
      x = _position[0],
      y = _position[1];

  ctx.fillText(msg, x, y);
}
},{}],"../lib/core/elements/Polygon.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Polygon;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Polygon(ctx, _ref) {
  var style = _ref.style,
      path = _ref.path;
  ctx.fillStyle = style;
  ctx.beginPath();

  var _path$ = _slicedToArray(path[0], 2),
      startX = _path$[0],
      startY = _path$[1];

  ctx.moveTo(startX, startY);

  var _iterator = _createForOfIteratorHelper(path),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
          x = _step$value[0],
          y = _step$value[1];

      ctx.lineTo(x, y);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  ctx.closePath();
  ctx.fill();
}
},{}],"../lib/core/elements/types.ts":[function(require,module,exports) {

},{}],"../lib/core/elements/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Line: true,
  Circle: true,
  Rect: true,
  Text: true,
  Polygon: true
};
Object.defineProperty(exports, "Line", {
  enumerable: true,
  get: function () {
    return _Line.default;
  }
});
Object.defineProperty(exports, "Circle", {
  enumerable: true,
  get: function () {
    return _Circle.default;
  }
});
Object.defineProperty(exports, "Rect", {
  enumerable: true,
  get: function () {
    return _Rect.default;
  }
});
Object.defineProperty(exports, "Text", {
  enumerable: true,
  get: function () {
    return _Text.default;
  }
});
Object.defineProperty(exports, "Polygon", {
  enumerable: true,
  get: function () {
    return _Polygon.default;
  }
});

var _Line = _interopRequireDefault(require("./Line"));

var _Circle = _interopRequireDefault(require("./Circle"));

var _Rect = _interopRequireDefault(require("./Rect"));

var _Text = _interopRequireDefault(require("./Text"));

var _Polygon = _interopRequireDefault(require("./Polygon"));

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./Line":"../lib/core/elements/Line.ts","./Circle":"../lib/core/elements/Circle.ts","./Rect":"../lib/core/elements/Rect.ts","./Text":"../lib/core/elements/Text.ts","./Polygon":"../lib/core/elements/Polygon.ts","./types":"../lib/core/elements/types.ts"}],"../lib/core/systems/Render.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = RenderSystem;

var _elements = require("../elements");

function Renderer(ctx) {
  return function (element) {
    if (element.type === "rect") {
      return (0, _elements.Rect)(ctx, element);
    }

    if (element.type === "circle") {
      return (0, _elements.Circle)(ctx, element);
    }

    if (element.type === "line") {
      return (0, _elements.Line)(ctx, element);
    }

    if (element.type === "polygon") {
      return (0, _elements.Polygon)(ctx, element);
    }
  };
}

function RenderSystem(ctx, update) {
  return function (delta) {
    update(delta).forEach(Renderer(ctx));
  };
}
},{"../elements":"../lib/core/elements/index.ts"}],"../lib/core/systems/FPS.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FPSSystem;

function FPSSystem(ctx) {
  return function (delta) {
    ctx.font = "25px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("FPS: ".concat(Math.round(1 / delta)), 10, 30);
  };
}
},{}],"../lib/core/systems/Clear.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ClearSystem;

function ClearSystem(ctx) {
  var canvas = ctx.canvas;
  return function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
}
},{}],"../lib/core/systems/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "RenderSystem", {
  enumerable: true,
  get: function () {
    return _Render.default;
  }
});
Object.defineProperty(exports, "FPSSystem", {
  enumerable: true,
  get: function () {
    return _FPS.default;
  }
});
Object.defineProperty(exports, "ClearSystem", {
  enumerable: true,
  get: function () {
    return _Clear.default;
  }
});

var _Render = _interopRequireDefault(require("./Render"));

var _FPS = _interopRequireDefault(require("./FPS"));

var _Clear = _interopRequireDefault(require("./Clear"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./Render":"../lib/core/systems/Render.ts","./FPS":"../lib/core/systems/FPS.ts","./Clear":"../lib/core/systems/Clear.ts"}],"../lib/core/Game.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Game;

var _utils = require("./utils");

var _Ticker = _interopRequireDefault(require("./Ticker"));

var _systems = require("./systems");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Game(canvas, init) {
  var ctx = canvas.getContext("2d");

  if (!ctx) {
    throw "Your browser not support canvas api..";
  }

  (0, _utils.resize)(ctx);
  var ticker = (0, _Ticker.default)();
  ticker.add((0, _systems.ClearSystem)(ctx));
  ticker.add((0, _systems.RenderSystem)(ctx, init(ctx)));
  ticker.add((0, _systems.FPSSystem)(ctx));
}
},{"./utils":"../lib/core/utils.ts","./Ticker":"../lib/core/Ticker.ts","./systems":"../lib/core/systems/index.ts"}],"../lib/core/types.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _elements = require("./elements");

Object.keys(_elements).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _elements[key];
    }
  });
});
},{"./elements":"../lib/core/elements/index.ts"}],"../lib/core/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Game: true
};
Object.defineProperty(exports, "Game", {
  enumerable: true,
  get: function () {
    return _Game.default;
  }
});

var _Game = _interopRequireDefault(require("./Game"));

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./Game":"../lib/core/Game.ts","./types":"../lib/core/types.ts"}],"../lib/vec2/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mag = mag;
exports.dot = dot;
exports.mul = mul;
exports.divide = divide;
exports.normalize = normalize;
exports.add = add;
exports.sub = sub;
exports.det = det;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function mag(_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      x = _ref2[0],
      y = _ref2[1];

  return Math.sqrt(x * x + y * y);
}

function dot(_ref3, _ref4) {
  var _ref5 = _slicedToArray(_ref3, 2),
      x1 = _ref5[0],
      y1 = _ref5[1];

  var _ref6 = _slicedToArray(_ref4, 2),
      x2 = _ref6[0],
      y2 = _ref6[1];

  return x1 * x2 + y1 * y2;
}

function mul(_ref7, scaler) {
  var _ref8 = _slicedToArray(_ref7, 2),
      x = _ref8[0],
      y = _ref8[1];

  return [x * scaler, y * scaler];
}

function divide(_ref9, scaler) {
  var _ref10 = _slicedToArray(_ref9, 2),
      x = _ref10[0],
      y = _ref10[1];

  return [x / scaler, y / scaler];
}

function normalize(v) {
  return divide(v, mag(v));
}

function add(_ref11, _ref12) {
  var _ref13 = _slicedToArray(_ref11, 2),
      x1 = _ref13[0],
      y1 = _ref13[1];

  var _ref14 = _slicedToArray(_ref12, 2),
      x2 = _ref14[0],
      y2 = _ref14[1];

  return [x1 + x2, y1 + y2];
}

function sub(_ref15, _ref16) {
  var _ref17 = _slicedToArray(_ref15, 2),
      x1 = _ref17[0],
      y1 = _ref17[1];

  var _ref18 = _slicedToArray(_ref16, 2),
      x2 = _ref18[0],
      y2 = _ref18[1];

  return [x1 - x2, y1 - y2];
}

function det(_ref19) {
  var _ref20 = _slicedToArray(_ref19, 2),
      top = _ref20[0],
      down = _ref20[1];

  var _top = _slicedToArray(top, 2),
      a = _top[0],
      b = _top[1];

  var _down = _slicedToArray(down, 2),
      c = _down[0],
      d = _down[1];

  return a * d - b * c;
}
},{}],"../dist/hitTest/circle_circle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hitTest;

var _vec = require("../../lib/vec2");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function hitTest(o1, o2) {
  var _o1$position = _slicedToArray(o1.position, 2),
      x1 = _o1$position[0],
      y1 = _o1$position[1];

  var _o2$position = _slicedToArray(o2.position, 2),
      x2 = _o2$position[0],
      y2 = _o2$position[1];

  var r1 = o1.radius;
  var r2 = o2.radius;
  var dx = x1 - x2;
  var dy = y1 - y2;
  return (0, _vec.mag)([dx, dy]) <= r1 + r2;
}
},{"../../lib/vec2":"../lib/vec2/index.ts"}],"../dist/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inRange = inRange;
exports.points = points;
exports.sum = sum;
exports.clamp = clamp;
exports.triangleArea = triangleArea;
exports.forEachPath = forEachPath;

var _vec = require("../lib/vec2");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function inRange(_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      x = _ref2[0],
      y = _ref2[1];

  var _ref3 = [Math.min(x, y), Math.max(x, y)],
      min = _ref3[0],
      max = _ref3[1];
  return function (num) {
    return num >= min && num <= max;
  };
}

function points(_ref4) {
  var position = _ref4.position,
      size = _ref4.size;

  var _position = _slicedToArray(position, 2),
      x = _position[0],
      y = _position[1];

  var _size = _slicedToArray(size, 2),
      w = _size[0],
      h = _size[1];

  return [x, x + w, y, y + h];
}

function sum(nums) {
  return nums.reduce(function (a, b) {
    return a + b;
  });
}

function clamp(_ref5, num) {
  var _ref6 = _slicedToArray(_ref5, 2),
      x = _ref6[0],
      y = _ref6[1];

  return inRange([x, y])(num) ? num : num > x ? y : x;
}

function triangleArea(_ref7) {
  var _ref8 = _slicedToArray(_ref7, 3),
      t1 = _ref8[0],
      t2 = _ref8[1],
      t3 = _ref8[2];

  return Math.abs((0, _vec.det)([//
  (0, _vec.sub)(t2, t1), (0, _vec.sub)(t3, t1)]));
}

function forEachPath(path, func) {
  path.forEach(function (cur, index) {
    return func(cur, path[(index + 1) % path.length]);
  });
}
},{"../lib/vec2":"../lib/vec2/index.ts"}],"../dist/hitTest/circle_rect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hitTest;

var _utils = require("../utils");

var _vec = require("../../lib/vec2");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function hitTest(o1, o2) {
  var _points = (0, _utils.points)(o2),
      _points2 = _slicedToArray(_points, 4),
      r1 = _points2[0],
      r2 = _points2[1],
      r3 = _points2[2],
      r4 = _points2[3];

  var _o1$position = _slicedToArray(o1.position, 2),
      cx = _o1$position[0],
      cy = _o1$position[1];

  var r = o1.radius;
  var dx = //
  cx - (0, _utils.clamp)([r1, r2], cx),
      dy = cy - (0, _utils.clamp)([r3, r4], cy);
  return (0, _vec.mag)([dx, dy]) <= r;
}
},{"../utils":"../dist/utils.js","../../lib/vec2":"../lib/vec2/index.ts"}],"../dist/hitTest/point_circle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hitTest;

var _vec = require("../../lib/vec2");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function hitTest(_ref, circle) {
  var _ref2 = _slicedToArray(_ref, 2),
      x1 = _ref2[0],
      y1 = _ref2[1];

  var _circle$position = _slicedToArray(circle.position, 2),
      x2 = _circle$position[0],
      y2 = _circle$position[1];

  var r = circle.radius;
  var dx = x1 - x2;
  var dy = y1 - y2;
  return (0, _vec.mag)([dx, dy]) <= r;
}
},{"../../lib/vec2":"../lib/vec2/index.ts"}],"../dist/hitTest/point_line.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hitTest;

var _vec = require("../../lib/vec2");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function hitTest(_ref, o2) {
  var _ref2 = _slicedToArray(_ref, 2),
      px = _ref2[0],
      py = _ref2[1];

  var _o2$start = _slicedToArray(o2.start, 2),
      x1 = _o2$start[0],
      y1 = _o2$start[1];

  var _o2$end = _slicedToArray(o2.end, 2),
      x2 = _o2$end[0],
      y2 = _o2$end[1];

  var d1 = (0, _vec.mag)([px - x1, py - y1]) + (0, _vec.mag)([px - x2, py - y2]);
  var d2 = (0, _vec.mag)([x1 - x2, y1 - y2]);
  return Math.abs(d1 - d2) < 1;
}
},{"../../lib/vec2":"../lib/vec2/index.ts"}],"../dist/hitTest/line_circle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hitTest;

var _point_circle = _interopRequireDefault(require("./point_circle"));

var _point_line = _interopRequireDefault(require("./point_line"));

var _vec = require("../../lib/vec2");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hitTest(o1, o2) {
  if ([o1.start, o1.end].some(function (point) {
    return (0, _point_circle.default)(point, o2);
  })) {
    return true;
  }

  var v = (0, _vec.normalize)((0, _vec.sub)(o1.end, o1.start));
  var w = (0, _vec.sub)(o2.position, o1.start);
  var p = (0, _vec.add)(o1.start, (0, _vec.mul)(v, (0, _vec.dot)(v, w)));

  if (!(0, _point_line.default)(p, o1)) {
    return false;
  }

  return (0, _vec.mag)((0, _vec.sub)(o2.position, p)) < o2.radius;
}
},{"./point_circle":"../dist/hitTest/point_circle.js","./point_line":"../dist/hitTest/point_line.js","../../lib/vec2":"../lib/vec2/index.ts"}],"../dist/hitTest/line_line.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hitTest;

var _utils = require("../utils");

var _vec = require("../../lib/vec2");

function hitTest(o1, o2) {
  var l1 = (0, _vec.sub)(o1.start, o1.end);
  var l2 = (0, _vec.sub)(o2.start, o2.end);
  var l3 = (0, _vec.sub)(o1.start, o2.end);
  var den = (0, _vec.det)([l1, l2]);

  if (den === 0) {
    return false;
  }

  var t = (0, _vec.det)([l3, l2]) / den;
  var u = -1 * (0, _vec.det)([l3, l1]) / den;
  return (0, _utils.inRange)([0, 1])(t) && (0, _utils.inRange)([0, 1])(u);
}
},{"../utils":"../dist/utils.js","../../lib/vec2":"../lib/vec2/index.ts"}],"../dist/hitTest/line_rect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hitTest;

var _line_line = _interopRequireDefault(require("./line_line"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function hitTest(o1, o2) {
  var _o2$position = _slicedToArray(o2.position, 2),
      x = _o2$position[0],
      y = _o2$position[1];

  var _o2$size = _slicedToArray(o2.size, 2),
      w = _o2$size[0],
      h = _o2$size[1];

  var r1 = [x, y];
  var r2 = [x + w, y];
  var r3 = [x, y + h];
  var r4 = [x + w, y + h];
  return [{
    start: r1,
    end: r2
  }, {
    start: r2,
    end: r4
  }, {
    start: r4,
    end: r3
  }, {
    start: r3,
    end: r1
  }].some(function (line) {
    return (0, _line_line.default)(o1, line);
  });
}
},{"./line_line":"../dist/hitTest/line_line.js"}],"../dist/hitTest/point_point.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hitTest;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 *  Test if collision between two points.
 */
function hitTest(_ref, _ref2) {
  var _ref3 = _slicedToArray(_ref, 2),
      x1 = _ref3[0],
      y1 = _ref3[1];

  var _ref4 = _slicedToArray(_ref2, 2),
      x2 = _ref4[0],
      y2 = _ref4[1];

  return [//
  x1 - x2, y1 - y2].every(function (num) {
    return Math.abs(num) < 1;
  });
}
},{}],"../dist/hitTest/point_rect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hitTest;

var _utils = require("../utils");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function hitTest(_ref, o2) {
  var _ref2 = _slicedToArray(_ref, 2),
      px = _ref2[0],
      py = _ref2[1];

  var _points = (0, _utils.points)(o2),
      _points2 = _slicedToArray(_points, 4),
      r1 = _points2[0],
      r2 = _points2[1],
      r3 = _points2[2],
      r4 = _points2[3];

  return [//
  (0, _utils.inRange)([r1, r2])(px), (0, _utils.inRange)([r3, r4])(py)].every(Boolean);
}
},{"../utils":"../dist/utils.js"}],"../dist/hitTest/polygon_point.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hitTest;

var _utils = require("../utils");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function hitTest(_ref, _ref2) {
  var path = _ref.path;

  var _ref3 = _slicedToArray(_ref2, 2),
      px = _ref3[0],
      py = _ref3[1];

  var hit = false;
  (0, _utils.forEachPath)(path, function (_ref4, _ref5) {
    var _ref6 = _slicedToArray(_ref4, 2),
        cx = _ref6[0],
        cy = _ref6[1];

    var _ref7 = _slicedToArray(_ref5, 2),
        nx = _ref7[0],
        ny = _ref7[1];

    var test1 = cy > py != ny > py;
    var test2 = px < (nx - cx) * (py - cy) / (ny - cy) + cx;

    if (test1 && test2) {
      hit = !hit;
    }
  });
  return hit;
}
},{"../utils":"../dist/utils.js"}],"../dist/hitTest/polygon_circle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hitTest;

var _utils = require("../utils");

var _line_circle = _interopRequireDefault(require("./line_circle"));

var _polygon_point = _interopRequireDefault(require("./polygon_point"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hitTest(_ref, circle) {
  var path = _ref.path;
  var hit = false;
  (0, _utils.forEachPath)(path, function (start, end) {
    if (hit) {
      return;
    }

    if ((0, _line_circle.default)({
      start: start,
      end: end
    }, circle)) {
      hit = true;
    }
  });
  return hit || (0, _polygon_point.default)({
    path: path
  }, circle.position);
}
},{"../utils":"../dist/utils.js","./line_circle":"../dist/hitTest/line_circle.js","./polygon_point":"../dist/hitTest/polygon_point.js"}],"../dist/hitTest/polygon_line.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hitTest;

var _utils = require("../utils");

var _line_line = _interopRequireDefault(require("./line_line"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hitTest(_ref, line) {
  var path = _ref.path;
  var hit = false;
  (0, _utils.forEachPath)(path, function (start, end) {
    if (hit) {
      return;
    }

    if ((0, _line_line.default)({
      start: start,
      end: end
    }, line)) {
      hit = true;
    }
  });
  return hit;
}
},{"../utils":"../dist/utils.js","./line_line":"../dist/hitTest/line_line.js"}],"../dist/hitTest/polygon_polygon.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hitTest;

var _utils = require("../utils");

var _polygon_line = _interopRequireDefault(require("./polygon_line"));

var _polygon_point = _interopRequireDefault(require("./polygon_point"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hitTest(p1, p2) {
  var hit = false;
  (0, _utils.forEachPath)(p1.path, function (start, end) {
    if (hit) {
      return;
    }

    if ((0, _polygon_line.default)(p2, {
      start: start,
      end: end
    })) {
      hit = true;
    }
  });
  return hit || (0, _polygon_point.default)(p1, p2.path[0]);
}
},{"../utils":"../dist/utils.js","./polygon_line":"../dist/hitTest/polygon_line.js","./polygon_point":"../dist/hitTest/polygon_point.js"}],"../dist/hitTest/polygon_rect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hitTest;

var _utils = require("../utils");

var _line_rect = _interopRequireDefault(require("./line_rect"));

var _polygon_point = _interopRequireDefault(require("./polygon_point"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hitTest(_ref, rect) {
  var path = _ref.path;
  var hit = false;
  (0, _utils.forEachPath)(path, function (start, end) {
    if (hit) {
      return;
    }

    if ((0, _line_rect.default)({
      start: start,
      end: end
    }, rect)) {
      hit = true;
    }
  });
  return hit || (0, _polygon_point.default)({
    path: path
  }, rect.position);
}
},{"../utils":"../dist/utils.js","./line_rect":"../dist/hitTest/line_rect.js","./polygon_point":"../dist/hitTest/polygon_point.js"}],"../dist/hitTest/ray_line.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hitTest;

var _utils = require("../utils");

var _vec = require("../../lib/vec2");

function hitTest(o2, o1) {
  var l1 = (0, _vec.sub)(o1.start, o1.end);
  var l2 = (0, _vec.sub)(o2.start, (0, _vec.add)(o2.start, o2.dir));
  var l3 = (0, _vec.sub)(o1.start, (0, _vec.add)(o2.start, o2.dir));
  var den = (0, _vec.det)([l1, l2]);

  if (den === 0) {
    return false;
  }

  var t = (0, _vec.det)([l3, l2]) / den;
  var u = -1 * (0, _vec.det)([l3, l1]) / den;
  return (0, _utils.inRange)([0, 1])(t) && u > 0;
}
},{"../utils":"../dist/utils.js","../../lib/vec2":"../lib/vec2/index.ts"}],"../dist/hitTest/rect_rect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hitTest;

var _utils = require("../utils");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function hitTest(o1, o2) {
  var _points = (0, _utils.points)(o1),
      _points2 = _slicedToArray(_points, 4),
      a1 = _points2[0],
      a2 = _points2[1],
      a3 = _points2[2],
      a4 = _points2[3];

  var _points3 = (0, _utils.points)(o2),
      _points4 = _slicedToArray(_points3, 4),
      b1 = _points4[0],
      b2 = _points4[1],
      b3 = _points4[2],
      b4 = _points4[3];

  return [//
  a2 >= b1, a1 <= b2, a4 >= b3, a3 <= b4].every(Boolean);
}
},{"../utils":"../dist/utils.js"}],"../dist/hitTest/triangle_point.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hitTest;

var _utils = require("../utils");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function hitTest(_ref, p) {
  var path = _ref.path;

  var _path = _slicedToArray(path, 3),
      t1 = _path[0],
      t2 = _path[1],
      t3 = _path[2];

  var area = (0, _utils.triangleArea)(path);
  var area1 = (0, _utils.triangleArea)([t1, t2, p]);
  var area2 = (0, _utils.triangleArea)([t2, t3, p]);
  var area3 = (0, _utils.triangleArea)([t3, t1, p]);
  return (0, _utils.sum)([area1, area2, area3]) === area;
}
},{"../utils":"../dist/utils.js"}],"../dist/hitTest/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "circle_circle", {
  enumerable: true,
  get: function () {
    return _circle_circle.default;
  }
});
Object.defineProperty(exports, "circle_rect", {
  enumerable: true,
  get: function () {
    return _circle_rect.default;
  }
});
Object.defineProperty(exports, "line_circle", {
  enumerable: true,
  get: function () {
    return _line_circle.default;
  }
});
Object.defineProperty(exports, "line_line", {
  enumerable: true,
  get: function () {
    return _line_line.default;
  }
});
Object.defineProperty(exports, "line_rect", {
  enumerable: true,
  get: function () {
    return _line_rect.default;
  }
});
Object.defineProperty(exports, "point_circle", {
  enumerable: true,
  get: function () {
    return _point_circle.default;
  }
});
Object.defineProperty(exports, "point_line", {
  enumerable: true,
  get: function () {
    return _point_line.default;
  }
});
Object.defineProperty(exports, "point_point", {
  enumerable: true,
  get: function () {
    return _point_point.default;
  }
});
Object.defineProperty(exports, "point_rect", {
  enumerable: true,
  get: function () {
    return _point_rect.default;
  }
});
Object.defineProperty(exports, "polygon_circle", {
  enumerable: true,
  get: function () {
    return _polygon_circle.default;
  }
});
Object.defineProperty(exports, "polygon_line", {
  enumerable: true,
  get: function () {
    return _polygon_line.default;
  }
});
Object.defineProperty(exports, "polygon_point", {
  enumerable: true,
  get: function () {
    return _polygon_point.default;
  }
});
Object.defineProperty(exports, "polygon_polygon", {
  enumerable: true,
  get: function () {
    return _polygon_polygon.default;
  }
});
Object.defineProperty(exports, "polygon_rect", {
  enumerable: true,
  get: function () {
    return _polygon_rect.default;
  }
});
Object.defineProperty(exports, "ray_line", {
  enumerable: true,
  get: function () {
    return _ray_line.default;
  }
});
Object.defineProperty(exports, "rect_rect", {
  enumerable: true,
  get: function () {
    return _rect_rect.default;
  }
});
Object.defineProperty(exports, "triangle_point", {
  enumerable: true,
  get: function () {
    return _triangle_point.default;
  }
});
exports.default = void 0;

var _circle_circle = _interopRequireDefault(require("./circle_circle"));

var _circle_rect = _interopRequireDefault(require("./circle_rect"));

var _line_circle = _interopRequireDefault(require("./line_circle"));

var _line_line = _interopRequireDefault(require("./line_line"));

var _line_rect = _interopRequireDefault(require("./line_rect"));

var _point_circle = _interopRequireDefault(require("./point_circle"));

var _point_line = _interopRequireDefault(require("./point_line"));

var _point_point = _interopRequireDefault(require("./point_point"));

var _point_rect = _interopRequireDefault(require("./point_rect"));

var _polygon_circle = _interopRequireDefault(require("./polygon_circle"));

var _polygon_line = _interopRequireDefault(require("./polygon_line"));

var _polygon_point = _interopRequireDefault(require("./polygon_point"));

var _polygon_polygon = _interopRequireDefault(require("./polygon_polygon"));

var _polygon_rect = _interopRequireDefault(require("./polygon_rect"));

var _ray_line = _interopRequireDefault(require("./ray_line"));

var _rect_rect = _interopRequireDefault(require("./rect_rect"));

var _triangle_point = _interopRequireDefault(require("./triangle_point"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  circle_circle: _circle_circle.default,
  circle_rect: _circle_rect.default,
  line_circle: _line_circle.default,
  line_line: _line_line.default,
  line_rect: _line_rect.default,
  point_circle: _point_circle.default,
  point_line: _point_line.default,
  point_point: _point_point.default,
  point_rect: _point_rect.default,
  polygon_circle: _polygon_circle.default,
  polygon_line: _polygon_line.default,
  polygon_point: _polygon_point.default,
  polygon_polygon: _polygon_polygon.default,
  polygon_rect: _polygon_rect.default,
  ray_line: _ray_line.default,
  rect_rect: _rect_rect.default,
  triangle_point: _triangle_point.default
};
exports.default = _default;
},{"./circle_circle":"../dist/hitTest/circle_circle.js","./circle_rect":"../dist/hitTest/circle_rect.js","./line_circle":"../dist/hitTest/line_circle.js","./line_line":"../dist/hitTest/line_line.js","./line_rect":"../dist/hitTest/line_rect.js","./point_circle":"../dist/hitTest/point_circle.js","./point_line":"../dist/hitTest/point_line.js","./point_point":"../dist/hitTest/point_point.js","./point_rect":"../dist/hitTest/point_rect.js","./polygon_circle":"../dist/hitTest/polygon_circle.js","./polygon_line":"../dist/hitTest/polygon_line.js","./polygon_point":"../dist/hitTest/polygon_point.js","./polygon_polygon":"../dist/hitTest/polygon_polygon.js","./polygon_rect":"../dist/hitTest/polygon_rect.js","./ray_line":"../dist/hitTest/ray_line.js","./rect_rect":"../dist/hitTest/rect_rect.js","./triangle_point":"../dist/hitTest/triangle_point.js"}],"../dist/type.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCircle = isCircle;

function isCircle(obj) {
  return obj.type && obj.type === "circle";
}
},{}],"../dist/functions/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.elastic_collision = elastic_collision;

var _vec = require("../../lib/vec2");

/**
 * elastic collisions
 *    vf = ( (m1 - m2) * v1 + (2 * m2) * v2 ) / m1 + m2
 */
function elastic_collision(v1, v2, m1, m2) {
  var a = (0, _vec.mul)(v1, (m1 - m2) / (m1 + m2));
  var b = (0, _vec.mul)(v2, 2 * m2 / (m1 + m2));
  return (0, _vec.add)(a, b);
}
},{"../../lib/vec2":"../lib/vec2/index.ts"}],"../dist/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  hitTest: true
};
Object.defineProperty(exports, "hitTest", {
  enumerable: true,
  get: function () {
    return _hitTest.default;
  }
});

var _hitTest = _interopRequireDefault(require("./hitTest"));

var _type = require("./type");

Object.keys(_type).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _type[key];
    }
  });
});

var _functions = require("./functions");

Object.keys(_functions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _functions[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./hitTest":"../dist/hitTest/index.js","./type":"../dist/type.js","./functions":"../dist/functions/index.js"}],"index.ts":[function(require,module,exports) {
"use strict";

require("./index.scss");

var _core = require("../lib/core");

var _dist = require("../dist");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function updatePosition(delta, body) {
  var _body$position = _slicedToArray(body.position, 2),
      x = _body$position[0],
      y = _body$position[1];

  var _body$velocity = _slicedToArray(body.velocity, 2),
      vx = _body$velocity[0],
      vy = _body$velocity[1];

  body.position = [x + vx * delta, y + vy * delta];
}

function collision(o1, o2) {
  var hit = false;

  if ((0, _dist.isCircle)(o1) && (0, _dist.isCircle)(o2)) {
    hit = _dist.hitTest.circle_circle(o1, o2);
  }

  o1["style"] = hit ? "#ff8080" : "#0099b0";
  o2["style"] = hit ? "#ff8080" : "#0099b0";

  if (!hit) {
    return;
  }

  var v1 = (0, _dist.elastic_collision)(o1.velocity, o2.velocity, o1.mass, o2.mass);
  var v2 = (0, _dist.elastic_collision)(o2.velocity, o1.velocity, o2.mass, o1.mass);
  o1.velocity = v1;
  o2.velocity = v2;
}

function main(_ref) {
  var canvas = _ref.canvas;
  var background = {
    type: "rect",
    style: "#ffffff",
    position: [0, 0],
    size: [canvas.width, canvas.height]
  };
  var c1 = {
    type: "circle",
    style: "#0099b0",
    position: [100, 250],
    radius: 20,
    velocity: [100, 0],
    acceleration: [0, 0],
    mass: 1
  };
  var c2 = {
    type: "circle",
    style: "#0099b0",
    position: [400, 250],
    radius: 20,
    velocity: [0, 0],
    acceleration: [0, 0],
    mass: 1
  };
  return function (delta) {
    collision(c1, c2);
    [c1, c2].forEach(function (body) {
      return updatePosition(delta, body);
    });
    return [background, c1, c2];
  };
}

var view = document.getElementById("root");
(0, _core.Game)(view, main);
},{"./index.scss":"index.scss","../lib/core":"../lib/core/index.ts","../dist":"../dist/index.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58074" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/example.77de5100.js.map