import {Table} from './table'
import {Img} from './img'

(function() {
    // 初始化

    var instance = null;

    // 监听插件页面发来的消息
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {


        if (request.action === 'set-dstl-state') {

            sendResponse({
                msg: 'success'
            });

            if (request.targetState === 'on') {
                instance = new Table();
            }

            if (request.targetState === 'off') {
                instance && (instance.destory());
            }
        }

    });

})();
