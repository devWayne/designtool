/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Img = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _drag = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IMG_PLACEHOLDER = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAABCAYAAAAIN1RAAAAADElEQVQIW2NkIAEAAABaAAL8VAbiAAAAAElFTkSuQmCC';

var Img = function () {
    function Img(config) {
        _classCallCheck(this, Img);

        this.config = $.extend({}, config);

        this.init();
    }

    _createClass(Img, [{
        key: 'init',
        value: function init() {
            this.$insert = $(this.config.insert);

            this.appendDom();
            this.addEvent();
        }
    }, {
        key: 'destory',
        value: function destory() {
            this.$img.remove();
            this.$insert = null;
            this.$img = null;

            this.dragInstance.destory();
        }
    }, {
        key: 'appendDom',
        value: function appendDom() {

            var style = ['opacity: ' + this.config.opacity, 'z-index: ' + this.config.zIndex, 'width: ' + this.config.width, 'height: ' + this.config.height, 'left: ' + this.config.left, 'top: ' + this.config.top, 'border: ' + (this.config.showBorder ? '1px solid #000000' : '0'), !this.config.src || !this.config.showImg ? 'display: none' : '', ''].join(';');

            this.$insert.append('<img class="dstl-img dstlImg" src="' + (this.config.src || IMG_PLACEHOLDER) + '" draggable="false" alt="" style="' + style + '">');

            this.$img = this.$insert.find('.dstlImg');
        }
    }, {
        key: 'dragHandler',
        value: function dragHandler(style) {

            var left = style.left;
            var top = style.top;

            $('.dstlPanel .dstl_ValLeft').val(left);
            $('.dstlPanel .dstl_ValTop').val(top);
        }
    }, {
        key: 'addEvent',
        value: function addEvent() {
            this.dragInstance = new _drag.Drag();
            this.dragInstance.init(this.$img).onMove(this.dragHandler);
        }
    }]);

    return Img;
}();

exports.Img = Img;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _table = __webpack_require__(2);

var _img = __webpack_require__(0);

(function () {
    // 初始化

    var instance = null;

    // 监听插件页面发来的消息
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

        if (request.action === 'setState') {

            sendResponse({
                msg: 'success'
            });

            if (request.targetState === 'on') {
                instance = new _table.Table();
            }

            if (request.targetState === 'off') {
                instance && instance.destory();
            }
        }
    });
})();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Table = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _img = __webpack_require__(0);

var _crossline = __webpack_require__(4);

var _panel = __webpack_require__(5);

__webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Table = function () {
    function Table(userConfig) {
        _classCallCheck(this, Table);

        // localstorage 优先级最高
        userConfig = $.extend(userConfig || {});

        $('body').append('<div class="dstl-wrapper dstlWrapper"></div>');

        this.config = $.extend({

            // 要插入的 dom 外层容器，默认插入到 body
            insert: $('body').find('.dstlWrapper'),

            // 图片宽度
            width: '100%',

            // 图片高度
            height: 'auto',

            showBorder: false,

            // 显示图片
            showImg: true,

            // 展示比较线
            showCrossLine: false,

            // 展开控制面板
            showPanel: true,

            // left
            left: 0,

            // top
            top: 0,

            // zIndex
            zIndex: 1,

            // opacity
            opacity: 0.6,

            // 视觉稿链接
            src: ''

        }, userConfig);

        this.init();
    }

    _createClass(Table, [{
        key: 'init',
        value: function init() {
            this.img = new _img.Img(this.config);
            this.crossLine = new _crossline.CrossLine(this.config);
            this.panel = new _panel.Panel(this.config, this.img);
        }
    }, {
        key: 'destory',
        value: function destory() {
            this.img.destory();
            this.crossLine.destory();
            this.panel.destory();

            this.img = null;
            this.crossLine = null;
            this.panel = null;

            this.config = null;

            $('body').find('.dstlWrapper').remove();
        }
    }]);

    return Table;
}();

;

exports.Table = Table;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Drag = function () {
    function Drag() {
        _classCallCheck(this, Drag);
    }

    _createClass(Drag, [{
        key: 'constrcutor',
        value: function constrcutor() {}
    }, {
        key: 'init',
        value: function init($target) {

            var self = this;

            self.params = {
                left: 0,
                top: 0,
                currentX: 0,
                currentY: 0,
                moveFlag: false
            };

            self.$target = $target;

            var params = self.params;

            var $doc = $(document);

            if ($target.css('left') !== 'auto') {
                params.left = $target.css('left');
            }
            if ($target.css('top') !== 'auto') {
                params.top = $target.css('top');
            }

            this.mousedownHandler = function (ev) {

                ev.preventDefault();

                params.moveFlag = true;

                var isMobile = ev.changedTouches && ev.changedTouches[0];

                if (isMobile) {
                    params.currentX = ev.changedTouches[0].pageX;
                    params.currentY = ev.changedTouches[0].pageY;
                } else {
                    params.currentX = ev.clientX;
                    params.currentY = ev.clientY;
                }
            };
            $target.on('mousedown touchstart', this.mousedownHandler);

            this.mouseupHandler = function (ev) {
                ev.preventDefault();

                params.moveFlag = false;

                self.setCurrentPos();
            };
            $doc.on('mouseup touchend', this.mouseupHandler);

            this.mousemoveHandler = function (ev) {

                ev.preventDefault();

                if (params.moveFlag) {

                    var isMobile = ev.changedTouches && ev.changedTouches[0];

                    if (isMobile) {
                        var nowX = ev.changedTouches[0].pageX;
                        var nowY = ev.changedTouches[0].pageY;
                    } else {
                        var nowX = ev.clientX;
                        var nowY = ev.clientY;
                    }

                    var disX = nowX - params.currentX;
                    var disY = nowY - params.currentY;

                    var style = {
                        left: parseInt(params.left) + parseInt(disX) + 'px',
                        top: parseInt(params.top) + parseInt(disY) + 'px'
                    };

                    $target.css(style);

                    self.moveHandler && self.moveHandler(style);
                }
            };
            $doc.on('mousemove touchmove', this.mousemoveHandler);

            return this;
        }
    }, {
        key: 'destory',
        value: function destory() {
            var $doc = $(document);
            $doc.off('mousemove touchmove', this.mousemoveHandler);
            $doc.off('mouseup touchend', this.mouseupHandler);
            this.$target.off('mousedown touchstart', this.mousedownHandler);
        }
    }, {
        key: 'onMove',
        value: function onMove(callback) {
            callback && (this.moveHandler = callback);
        }
    }, {
        key: 'setCurrentPos',
        value: function setCurrentPos() {

            var cssLeft = this.$target.css('left');
            var cssTop = this.$target.css('top');

            if (cssLeft !== 'auto') {
                this.params.left = cssLeft;
            }

            if (cssTop !== 'auto') {
                this.params.top = cssTop;
            }
        }
    }]);

    return Drag;
}();

exports.Drag = Drag;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * 交叉线部分
 */
var CrossLine = function () {
    function CrossLine(config) {
        _classCallCheck(this, CrossLine);

        this.config = $.extend({}, config);
        this.init();
    }

    _createClass(CrossLine, [{
        key: 'init',
        value: function init() {
            this.$insert = $(this.config.insert);
            this.appendDom();

            this.$rowLine = this.$insert.find('.dstlRowLine');
            this.$verticalLine = this.$insert.find('.dstlVerticalLine');

            this.addEvent();
        }
    }, {
        key: 'destory',
        value: function destory() {
            var $win = $(window);

            $win.off('mouseup', this.mouseupHandler);
            $win.off('mousemove', this.mousemoveHandler);

            this.$insert.remove();
            this.$rowLine.remove();
            this.$verticalLine.remove();
        }
    }, {
        key: 'appendDom',
        value: function appendDom() {
            this.$insert.append('<span style="' + (!this.config.showCrossLine ? 'display: none;' : 'display: block;') + '" class="dstl-row-line dstlRowLine dstlCrossLine"></span><span style="' + (!this.config.showCrossLine ? 'display: none;' : 'display: block;') + '" class="dstl-vertical-line dstlVerticalLine dstlCrossLine"></span>');
        }
    }, {
        key: 'addEvent',
        value: function addEvent() {

            var self = this;
            var $win = $(window);

            var moveCount = 0;

            this.mouseupHandler = function (ev) {
                moveCount = 0;
            };
            $win.on('mouseup', this.mouseupHandler);

            this.mousemoveHandler = function (ev) {
                moveCount++;

                if (moveCount < 3) {
                    return;
                }

                if (!self.$verticalLine.is(':visible')) {
                    return;
                }

                var currentX = ev.clientX;
                var currentY = ev.clientY;

                // 手机模式下不支持该功能
                self.$verticalLine.show().css({
                    left: currentX - 5
                });

                self.$rowLine.show().css({
                    top: currentY - 5
                });
            };
            $win.on('mousemove', this.mousemoveHandler);
        }
    }]);

    return CrossLine;
}();

exports.CrossLine = CrossLine;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Panel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tpl = __webpack_require__(6);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * 控制面板部分
 */
var Panel = function () {
    function Panel(config, imgInstance) {
        _classCallCheck(this, Panel);

        this.imgInstance = imgInstance;
        this.config = $.extend({}, config);
        this.init();
    }

    _createClass(Panel, [{
        key: 'init',
        value: function init() {
            this.$insert = $(this.config.insert);
            this.$img = $('.dstlImg');
            this.$crossLine = $('.dstlCrossLine');

            this.appendDom();

            this.addEvent();
        }
    }, {
        key: 'destory',
        value: function destory() {
            this.$container.find('.dstl_InputText').off('focus');
            this.$container.find('.dstl_InputText').off('keyup');
            this.$container.find('.dstl_InputCheckbox').off('change');
            this.$container.find('.dstl_Reset').off('click');
            this.$container.find('.dstl_PanelSwitcher').off('click');
            this.$container.find('.dstl_ImgSwither').off('click');
            $(window).off('unload', this._windowOnloadHandler);

            this.$insert.remove();
            this.$img.remove();
            this.$crossLine.remove();

            this.$insert = null;
            this.$img = null;
            this.$crossLine = null;
            this.$panelArea = null;
            this.$container = null;
        }
    }, {
        key: 'appendDom',
        value: function appendDom() {

            // 插入 DOM 的时候就根据配置信息初始化面板样式
            this.$insert.append((0, _tpl.tpl)(this.config));
            this.$container = this.$insert.find('.dstlPanel');
            this.$panelArea = this.$insert.find('.dstl_PanelArea');
        }
    }, {
        key: 'config2style',
        value: function config2style(config) {
            var style = {};

            $.each(config, function (key, value) {

                if (key === 'showBorder') {
                    key = 'border';
                    value = value ? '1px solid black' : '0';
                }

                style[key] = value;
            });

            return style;
        }
    }, {
        key: 'getPanelConfig',
        value: function getPanelConfig() {

            // 输入的配置
            var config = {
                opacity: $('.dstl_ValOpacity', this.$container).val(),
                width: $('.dstl_ValWidth', this.$container).val(),
                height: $('.dstl_ValHeight', this.$container).val(),
                zIndex: $('.dstl_ValZIndex', this.$container).val(),
                left: $('.dstl_ValLeft', this.$container).val(),
                top: $('.dstl_ValTop', this.$container).val(),
                showBorder: $('.dstl_ValBorder', this.$container).hasClass('dstl-panel-area-checked'),
                showCrossLine: $('.dstl_ValCrossLine', this.$container).hasClass('dstl-panel-area-checked'),
                showImg: !$('.dstl_ImgSwither', this.$container).hasClass('dstl-is-closed'),
                showPanel: !$('.dstl_PanelSwitcher', this.$container).hasClass('dstl-is-closed'),
                src: $('.dstl_ValPic', this.$container).val()
            };

            return config;
        }
    }, {
        key: 'updateStyleByPanel',
        value: function updateStyleByPanel() {
            var inputValue = this.getPanelConfig();

            var style = this.config2style(inputValue);

            // 图片样式
            this.$img.css(style);

            // panel 的 zIndex 始终要比图片高一级
            var imgZIndex = parseInt(inputValue.zIndex);
            this.$container.css({
                zIndex: imgZIndex ? imgZIndex + 1000 : 1000
            });

            if (inputValue.src) {
                this.$img.attr('src', inputValue.src);
            }

            // 交叉线
            if (inputValue.showCrossLine) {
                this.$crossLine.show();
            } else {
                this.$crossLine.hide();
            }
        }
    }, {
        key: 'storePanelConfig',
        value: function storePanelConfig(config) {
            localStorage.removeItem(localStorangeConfigName);
            localStorage.setItem(localStorangeConfigName, JSON.stringify(config));
        }
    }, {
        key: 'resetPanel',
        value: function resetPanel() {

            $('.dstl_ValOpacity', this.$container).val(0.6);
            $('.dstl_ValWidth', this.$container).val('100%');
            $('.dstl_ValHeight', this.$container).val('auto');
            $('.dstl_ValZIndex', this.$container).val(1);
            $('.dstl_ValLeft', this.$container).val(0);
            $('.dstl_ValTop', this.$container).val(0);
            $('.dstl_ValBorder', this.$container).removeClass('dstl-panel-area-checked');
            $('.dstl_ValCrossLine', this.$container).removeClass('dstl-panel-area-checked');

            this.updateStyleByPanel();

            // 修正拖拽组件的状态值
            this.imgInstance.dragInstance.setCurrentPos();
        }
    }, {
        key: 'addEvent',
        value: function addEvent() {
            var self = this;

            // hack: chrome 移动模拟器无法实现点击聚焦
            this.$container.find('.dstl_InputText').on('touchstart', function () {
                this.focus();
            });

            this.$container.find('.dstl_InputCheckbox').on('touchstart click', function (ev) {
                ev.preventDefault();
                var $target = $(this);
                if ($target.hasClass('dstl-panel-area-checked')) {
                    $target.removeClass('dstl-panel-area-checked');
                } else {
                    $target.addClass('dstl-panel-area-checked');
                }

                self.updateStyleByPanel();
            });

            var keyupTimer;
            this.$container.find('.dstl_InputText').on('keyup', function () {

                clearTimeout(keyupTimer);

                setTimeout(function () {
                    // 获取输入值
                    self.updateStyleByPanel();
                    clearTimeout(keyupTimer);
                }, 100);
            });

            this.$container.find('.dstl_ValFile').on('change', function (e) {

                var file = e.target.files[0]; //获取图片资源

                // 只选择图片文件
                if (!file.type.match('image.*')) {
                    return false;
                }

                var reader = new FileReader();

                reader.readAsDataURL(file); // 读取文件

                // 渲染文件
                reader.onload = function (arg) {
                    self.$container.find('.dstl_ValPic').val(arg.target.result);
                    self.$img.attr('src', arg.target.result);
                };
            });

            this.$container.find('.dstl_Reset').on('click touchstart', function () {
                self.resetPanel();
            });

            this.$container.find('.dstl_PanelSwitcher').on('click touchstart', function (ev) {
                var $target = $(ev.currentTarget);
                if ($target.hasClass('dstl-is-closed')) {
                    // 关闭状态
                    self.$panelArea.show();
                    self.$container.find('.dstl_ImgSwither').show();
                    self.$container.find('.dstl_Reset').show();
                    $target.removeClass('dstl-is-closed').text('Hide panel');
                } else {

                    // 展开状态
                    self.$panelArea.hide();
                    self.$container.find('.dstl_ImgSwither').hide();
                    self.$container.find('.dstl_Reset').hide();
                    $target.addClass('dstl-is-closed').text('DSTL');
                }
            });

            this.$container.find('.dstl_ImgSwither').on('click touchstart', function (ev) {
                var $target = $(ev.currentTarget);

                if ($target.hasClass('dstl-is-closed')) {
                    // 关闭状态
                    self.$img.show();
                    $target.removeClass('dstl-is-closed').text('Hide image');
                } else {
                    // 展开状态
                    self.$img.hide();
                    $target.addClass('dstl-is-closed').text('Show image');
                }
            });

            // 刷新页面时存储配置到 localstorage
            this._windowOnloadHandler = function () {
                var inputValue = self.getPanelConfig();

                self.storePanelConfig(inputValue);
            };
            $(window).on('unload', this._windowOnloadHandler);

            function addkeyUpDownEvent($dom, upHandler, downHandler) {
                $dom.on('keydown', function (ev) {
                    if (ev.keyCode !== 38 && ev.keyCode !== 40) {
                        return;
                    }

                    var $target = $(this);
                    var val = $.trim($target.val());

                    // 上键
                    if (ev.keyCode === 38) {
                        upHandler.call(this, val, $target);
                    }

                    // 下键
                    if (ev.keyCode === 40) {
                        downHandler.call(this, val, $target);
                    }
                });
            }

            addkeyUpDownEvent(this.$container.find('.dstl_ValOpacity'), function (val, $target) {

                val = parseFloat(val === '' ? 1 : val);

                if (val < 1) {
                    val = val * 10;
                    val += 1;
                    val = val / 10;
                }

                $target.val(val);
            }, function (val, $target) {
                val = parseFloat(val === '' ? 1 : val);

                if (val > 0) {
                    val = val * 10;
                    val -= 1;
                    val = val / 10;
                }
                $target.val(val);
            });

            addkeyUpDownEvent(this.$container.find('.dstl_ValZIndex'), function (val, $target) {
                val = parseFloat(val === '' ? 0 : val);
                val += 1;
                $target.val(val);
            }, function (val, $target) {
                val = parseFloat(val === '' ? 0 : val);
                val -= 1;
                $target.val(val);
            });

            addkeyUpDownEvent(this.$container.find('.dstl_ValWidth, .dstl_ValHeight, .dstl_ValLeft, .dstl_ValTop'), function (val, $target) {

                if (val === '') {
                    val = '100%';
                }

                if (val === '0') {
                    val = '0px';
                }

                if (!/\w*\d+\w*/.test(val)) {
                    return;
                }

                var partUnit = val.split(/-?\d+/g)[1];
                var partNum = val.split(partUnit)[0];

                if (partNum === '') {
                    return;
                }

                partNum = parseInt(partNum);
                partNum += 1;

                $target.val(partNum + partUnit);
            }, function (val, $target) {
                if (val === '') {
                    val = '100%';
                }

                if (val === '0') {
                    val = '0px';
                }

                if (!/\w*\d+\w*/.test(val)) {
                    return;
                }

                var partUnit = val.split(/-?\d+/g)[1];
                var partNum = val.split(partUnit)[0];

                if (partNum === '') {
                    return;
                }

                partNum = parseInt(partNum);
                partNum -= 1;

                $target.val(partNum + partUnit);
            });
        }
    }]);

    return Panel;
}();

exports.Panel = Panel;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function tpl(config) {
    return "<div class=\"dstl-panel dstlPanel\" style=\"z-index:1000;\">\n        <div class=\"dstl-panel-area dstl_PanelArea\" " + (!config.showPanel ? " style=\"display: none;\"" : "") + ">\n        <ul class=\"dstl-panel-area-ul\">\n        <li class=\"dstl-panel-area-li\">\n        <span class=\"dstl-panel-area-label\">opacity: </span><input type=\"text\" value=\"" + config.opacity + "\" class=\"dstl_InputText dstl_ValOpacity dstl-panel-area-input\">\n        </li>\n        <li class=\"dstl-panel-area-li\">\n        <span class=\"dstl-panel-area-label\">z-index: </span><input type=\"text\" value=\"" + config.zIndex + "\" class=\"dstl_InputText dstl_ValZIndex dstl-panel-area-input\">\n        </li>\n        <li class=\"dstl-panel-area-li\">\n        <span class=\"dstl-panel-area-label\">width: </span><input type=\"text\" value=\"" + config.width + "\" class=\"dstl_InputText dstl_ValWidth dstl-panel-area-input\">\n        </li>\n        <li class=\"dstl-panel-area-li\">\n        <span class=\"dstl-panel-area-label\">height: </span><input type=\"text\" value=\"" + config.height + "\" class=\"dstl_InputText dstl_ValHeight dstl-panel-area-input\">\n        </li>\n        <li class=\"dstl-panel-area-li\">\n        <span class=\"dstl-panel-area-label\">left: </span><input type=\"text\" value=\"" + config.left + "\" class=\"dstl_InputText dstl_ValLeft dstl-panel-area-input\">\n        </li>\n        <li class=\"dstl-panel-area-li\">\n        <span class=\"dstl-panel-area-label\">top: </span><input type=\"text\" value=\"" + config.top + "\" class=\"dstl_InputText dstl_ValTop dstl-panel-area-input\">\n        </li>\n        <li class=\"dstl-panel-area-li\">\n        <span class=\"dstl-panel-area-label\">online img: </span><input type=\"text\" " + (config.src ? "value=" + config.src : "") + " class=\"dstl_InputText dstl_ValPic dstl-panel-area-input\">\n        </li>\n        </ul>\n        </div>\n\n        <div class=\"dstl-btn-area\">\n\n        <a href=\"javascript:;\" " + (!config.showPanel ? " style=\"display: none;\"" : "") + " class=\"dstl-btn btn-reset dstl_Reset\">Reset</a>\n\n        " + (config.showImg && config.src ? "<a href=\"javascript:;\" " + (!config.showPanel ? " style=\"display: none;\"" : "") + " class=\"dstl-btn btn-img-switcher dstl_ImgSwither\">Hide image</a>" : "<a href=\"javascript:;\" " + (!config.showPanel ? " style=\"display: none;\"" : "") + " class=\"dstl-btn btn-img-switcher dstl-is-closed dstl_ImgSwither\">Show image</a>") + "\n\n        " + (config.showPanel ? "<a href=\"javascript:;\" class=\"dstl-btn dstl_PanelSwitcher\">Hide panel<a>" : "<a href=\"javascript:;\" class=\"dstl-btn dstl_PanelSwitcher dstl-is-closed '\">DSTL</a>") + "\n\n        </div>\n        </div>";
}
exports.tpl = tpl;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(10)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/_css-loader@0.28.7@css-loader/index.js!../node_modules/_less-loader@4.0.5@less-loader/dist/cjs.js!./dstl.less", function() {
			var newContent = require("!!../node_modules/_css-loader@0.28.7@css-loader/index.js!../node_modules/_less-loader@4.0.5@less-loader/dist/cjs.js!./dstl.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(undefined);
// imports


// module
exports.push([module.i, ".dstl-wrapper {\n  position: relative;\n}\n.dstl-is-closed {\n  text-align: center;\n}\n/* 控制面板部分 */\n.dstl-panel {\n  box-sizing: border-box;\n  position: fixed;\n  z-index: 1000;\n  right: 0;\n  bottom: 0;\n  background: #ffffff;\n  width: 100%;\n  background: rgba(0, 0, 0, 0.3);\n  color: #fff;\n}\n.dstl-panel-area-ul,\n.dstl-panel-area-li {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n.dstl-panel-area {\n  padding-right: 10px;\n  padding-bottom: 10px;\n}\n.dstl-panel-area-ul {\n  padding-top: 10px;\n}\n.dstl-panel-area-li {\n  line-height: 26px;\n  height: 26px;\n  font-size: 12px;\n}\n.dstl-panel-area-li:after {\n  display: block;\n  content: \" \";\n  clear: both;\n}\n.dstl-panel-area-label {\n  padding: 0;\n  margin: 0;\n  line-height: 26px;\n  text-transform: none;\n  float: left;\n  width: 80px;\n  height: 26px;\n  vertical-align: middle;\n  padding-right: 10px;\n  text-align: right;\n  font-size: 12px;\n  font-weight: normal;\n}\n.dstl-panel-area-input {\n  box-sizing: border-box;\n  height: 26px;\n  border-radius: 0;\n  box-shadow: none;\n  margin: 0;\n  width: 140px;\n  border-top: 0;\n  border-left: 0;\n  border-right: 0;\n  border-bottom: 1px solid #fff;\n  vertical-align: middle;\n  outline: none;\n  font-size: 12px;\n  background: transparent;\n  color: #fff;\n}\n.dstl-panel-area-input-file {\n  box-sizing: border-box;\n  border-radius: 0;\n  box-shadow: none;\n  margin: 0;\n  width: 140px;\n  border-top: 0;\n  border-left: 0;\n  border-right: 0;\n  vertical-align: middle;\n  outline: none;\n  font-size: 12px;\n}\n.dstl-panel-area-checkbox {\n  float: left;\n  margin-top: 7px;\n  width: 12px;\n  height: 12px;\n  border: 1px solid #000;\n}\n.dstl-panel-area-checkbox.dstl-panel-area-checked {\n  background: rgba(127, 220, 127, 0.79);\n}\n.dstl-btn-area {\n  position: relative;\n  text-align: right;\n}\n.dstl-btn-upload-wrap {\n  margin-bottom: 10px;\n}\n.dstl-btn-img-upload {\n  border: 1px solid black;\n}\n.dstl-btn {\n  display: inline-block;\n  padding: 5px;\n  text-align: center;\n  margin: 0 5px;\n  font-size: 12px;\n  text-decoration: none;\n  -webkit-transition: all .5s;\n  -moz-transition: all .5s;\n  -ms-transition: all .5s;\n  -o-transition: all .5s;\n  transition: all .5s;\n  cursor: pointer;\n}\n.dstl-btn:hover {\n  color: #ff4400;\n}\n/*图片部分*/\n.dstl-img {\n  box-sizing: border-box;\n  position: fixed;\n  width: 100%;\n  opacity: .5;\n  cursor: move;\n}\n.dstl-img.dstl-show {\n  display: inline;\n}\n/*交叉线部分*/\n.dstl-row-line,\n.dstl-vertical-line {\n  display: none;\n  position: fixed;\n  z-index: 1000;\n  left: 0;\n  top: 0;\n  background: red;\n}\n.dstl-row-line.dstl-show,\n.dstl-vertical-line.dstl-show {\n  display: block;\n}\n.dstl-row-line {\n  left: 0;\n  right: 0;\n  height: 1px;\n}\n.dstl-vertical-line {\n  width: 1px;\n  top: 0;\n  bottom: 0;\n}\n", ""]);

// exports


/***/ }),
/* 9 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(11);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 11 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);