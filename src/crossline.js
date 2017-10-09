class CrossLine {

    constructor(config) {
        this.config = $.extend({}, config);
        this.init();
    }
    init() {
        this.$insert = $(this.config.insert);
        this.appendDom();

        this.$rowLine = this.$insert.find('.dstlRowLine');
        this.$verticalLine = this.$insert.find('.dstlVerticalLine');

        this.addEvent();
    }

    destory() {
        var $win = $(window);

        $win.off('mouseup', this.mouseupHandler);
        $win.off('mousemove', this.mousemoveHandler);

        this.$insert.remove();
        this.$rowLine.remove();
        this.$verticalLine.remove();
    }

    appendDom() {
        this.$insert.append('<span style="' + (!this.config.showCrossLine ? 'display: none;' : 'display: block;') + '" class="dstl-row-line dstlRowLine dstlCrossLine"></span><span style="' + (!this.config.showCrossLine ? 'display: none;' : 'display: block;') + '" class="dstl-vertical-line dstlVerticalLine dstlCrossLine"></span>');
    }

    addEvent() {

        var self = this;
        var $win = $(window);

        var moveCount = 0;

        this.mouseupHandler = function(ev) {
            moveCount = 0;
        };
        $win.on('mouseup', this.mouseupHandler);

        this.mousemoveHandler = function(ev) {
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

}

export {
    CrossLine
}
