import {Img} from './img'
import {CrossLine} from './crossline'
import {Panel} from './panel'
import './dstl.less'

class Table {

    constructor(userConfig) {
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


    init() {
        this.img = new Img(this.config);
        this.crossLine = new CrossLine(this.config);
        this.panel = new Panel(this.config, this.img);
    }

    destory() {
        this.img.destory();
        this.crossLine.destory();
        this.panel.destory();

        this.img = null;
        this.crossLine = null;
        this.panel = null;

        this.config = null;

        $('body').find('.dstlWrapper').remove();
    }

};


export {
    Table
}
