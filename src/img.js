import {Drag} from './drag'


var IMG_PLACEHOLDER = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAABCAYAAAAIN1RAAAAADElEQVQIW2NkIAEAAABaAAL8VAbiAAAAAElFTkSuQmCC';


class Img {

    constructor(config) {

        this.config = $.extend({}, config);

        this.init();
    }

    init() {
        this.$insert = $(this.config.insert);

        this.appendDom();
        this.addEvent();
    }

    destory() {
        this.$img.remove();
        this.$insert = null;
        this.$img = null;

        this.dragInstance.destory();
    }

    appendDom() {

        var style = [
            'opacity: ' + this.config.opacity,
            'z-index: ' + this.config.zIndex,
            'width: ' + this.config.width,
            'height: ' + this.config.height,
            'left: ' + this.config.left,
            'top: ' + this.config.top,
            'border: ' + (this.config.showBorder ? '1px solid #000000' : '0'), (!this.config.src || !this.config.showImg ? 'display: none' : ''),
            ''
        ].join(';');

        this.$insert.append('<img class="dstl-img dstlImg" src="' + (this.config.src || IMG_PLACEHOLDER) + '" draggable="false" alt="" style="' + style + '">');

        this.$img = this.$insert.find('.dstlImg');

    }

    dragHandler(style) {

        var left = style.left;
        var top = style.top;

        $('.dstlPanel .dstl_ValLeft').val(left);
        $('.dstlPanel .dstl_ValTop').val(top);

    }

    addEvent() {
        this.dragInstance = new Drag();
        this.dragInstance.init(this.$img).onMove(this.dragHandler);
    }

}

export {
    Img
}
