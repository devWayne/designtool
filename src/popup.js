class Page {


    constructor() {
        this.initPage();
    }


    initPage() {
        this.addEvent();
    }

    addEvent() {
        var currentState = 'off';

        // 菜单点击以后执行的动作
        $('.J_State').click((e) => {

            currentState = currentState === 'off' ? 'on' : 'off';

            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: 'setState',
                    targetState: currentState
                }, function(response) {
                    console.log(response);
                });
            });
        });
    }

}

new Page();
