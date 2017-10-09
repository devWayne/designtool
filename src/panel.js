import {tpl} from './tpl'

class Panel {

    constructor(config, imgInstance) {
        this.imgInstance = imgInstance;
        this.config = $.extend({}, config);
        this.init();
    }


    init() {
        this.$insert = $(this.config.insert);
        this.$img = $('.dstlImg');
        this.$crossLine = $('.dstlCrossLine');

        this.appendDom();

        this.addEvent();
    }

    destory() {
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

    appendDom() {

        // 插入 DOM 的时候就根据配置信息初始化面板样式
        this.$insert.append(tpl(this.config));
        this.$container = this.$insert.find('.dstlPanel');
        this.$panelArea = this.$insert.find('.dstl_PanelArea');

    }

    config2style(config) {
        var style = {};

        $.each(config, function(key, value) {

            if (key === 'showBorder') {
                key = 'border';
                value = value ? '1px solid black' : '0';
            }

            style[key] = value;

        });

        return style;
    }

    getPanelConfig() {

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

    updateStyleByPanel() {
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

    storePanelConfig(config) {
        localStorage.removeItem(localStorangeConfigName);
        localStorage.setItem(localStorangeConfigName, JSON.stringify(config));
    }

    resetPanel() {

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

    addEvent() {
        var self = this;

        // hack: chrome 移动模拟器无法实现点击聚焦
        this.$container.find('.dstl_InputText').on('touchstart', function() {
            this.focus();
        });

        this.$container.find('.dstl_InputCheckbox').on('touchstart click', function(ev) {
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
        this.$container.find('.dstl_InputText').on('keyup', function() {

            clearTimeout(keyupTimer);

            setTimeout(function() {
                // 获取输入值
                self.updateStyleByPanel();
                clearTimeout(keyupTimer);
            }, 100);

        });

        this.$container.find('.dstl_ValFile').on('change', function(e) {

            var file = e.target.files[0]; //获取图片资源

            // 只选择图片文件
            if (!file.type.match('image.*')) {
                return false;
            }

            var reader = new FileReader();

            reader.readAsDataURL(file); // 读取文件

            // 渲染文件
            reader.onload = function(arg) {
                self.$container.find('.dstl_ValPic').val(arg.target.result);
                self.$img.attr('src', arg.target.result);
            }

        });

        this.$container.find('.dstl_Reset').on('click touchstart', function() {
            self.resetPanel();
        });

        this.$container.find('.dstl_PanelSwitcher').on('click touchstart', function(ev) {
            var $target = $(ev.currentTarget);
            if ($target.hasClass('dstl-is-closed')) { // 关闭状态
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

        this.$container.find('.dstl_ImgSwither').on('click touchstart', function(ev) {
            var $target = $(ev.currentTarget);

            if ($target.hasClass('dstl-is-closed')) { // 关闭状态
                self.$img.show();
                $target.removeClass('dstl-is-closed').text('Hide image');
            } else {
                // 展开状态
                self.$img.hide();
                $target.addClass('dstl-is-closed').text('Show image');
            }

        });

        // 刷新页面时存储配置到 localstorage
        this._windowOnloadHandler = function() {
            var inputValue = self.getPanelConfig();

            self.storePanelConfig(inputValue);
        };
        $(window).on('unload', this._windowOnloadHandler);

        function addkeyUpDownEvent($dom, upHandler, downHandler) {
            $dom.on('keydown', function(ev) {
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

        addkeyUpDownEvent(this.$container.find('.dstl_ValOpacity'), function(val, $target) {

            val = parseFloat(val === '' ? 1 : val);

            if (val < 1) {
                val = val * 10;
                val += 1;
                val = val / 10;
            }

            $target.val(val);

        }, function(val, $target) {
            val = parseFloat(val === '' ? 1 : val);

            if (val > 0) {
                val = val * 10;
                val -= 1;
                val = val / 10;
            }
            $target.val(val);
        });

        addkeyUpDownEvent(this.$container.find('.dstl_ValZIndex'), function(val, $target) {
            val = parseFloat(val === '' ? 0 : val);
            val += 1;
            $target.val(val);
        }, function(val, $target) {
            val = parseFloat(val === '' ? 0 : val);
            val -= 1;
            $target.val(val);
        });

        addkeyUpDownEvent(this.$container.find('.dstl_ValWidth, .dstl_ValHeight, .dstl_ValLeft, .dstl_ValTop'), function(val, $target) {

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
        }, function(val, $target) {
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

}

export {
    Panel
}
