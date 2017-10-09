function tpl(config) {
    return `<div class="dstl-panel dstlPanel" style="z-index:1000;">
        <div class="dstl-panel-area dstl_PanelArea" ${!config.showPanel ? ` style="display: none;"` : ``}>
        <ul class="dstl-panel-area-ul">
        <li class="dstl-panel-area-li">
        <span class="dstl-panel-area-label">opacity: </span><input type="text" value="${config.opacity}" class="dstl_InputText dstl_ValOpacity dstl-panel-area-input">
        </li>
        <li class="dstl-panel-area-li">
        <span class="dstl-panel-area-label">z-index: </span><input type="text" value="${config.zIndex}" class="dstl_InputText dstl_ValZIndex dstl-panel-area-input">
        </li>
        <li class="dstl-panel-area-li">
        <span class="dstl-panel-area-label">width: </span><input type="text" value="${config.width}" class="dstl_InputText dstl_ValWidth dstl-panel-area-input">
        </li>
        <li class="dstl-panel-area-li">
        <span class="dstl-panel-area-label">height: </span><input type="text" value="${config.height}" class="dstl_InputText dstl_ValHeight dstl-panel-area-input">
        </li>
        <li class="dstl-panel-area-li">
        <span class="dstl-panel-area-label">left: </span><input type="text" value="${config.left}" class="dstl_InputText dstl_ValLeft dstl-panel-area-input">
        </li>
        <li class="dstl-panel-area-li">
        <span class="dstl-panel-area-label">top: </span><input type="text" value="${config.top}" class="dstl_InputText dstl_ValTop dstl-panel-area-input">
        </li>
        <li class="dstl-panel-area-li">
        <span class="dstl-panel-area-label">online img: </span><input type="text" ${config.src ? `value=${config.src}` : ``} class="dstl_InputText dstl_ValPic dstl-panel-area-input">
        </li>
        </ul>
        </div>

        <div class="dstl-btn-area">

        <a href="javascript:;" ${!config.showPanel ? ` style="display: none;"` : ``} class="dstl-btn btn-reset dstl_Reset">Reset</a>

        ${config.showImg && config.src ? `<a href="javascript:;" ${!config.showPanel ? ` style="display: none;"` : ``} class="dstl-btn btn-img-switcher dstl_ImgSwither">Hide image</a>` : `<a href="javascript:;" ${!config.showPanel ? ` style="display: none;"` : ``} class="dstl-btn btn-img-switcher dstl-is-closed dstl_ImgSwither">Show image</a>`}

        ${config.showPanel ? `<a href="javascript:;" class="dstl-btn dstl_PanelSwitcher">Hide panel<a>` : `<a href="javascript:;" class="dstl-btn dstl_PanelSwitcher dstl-is-closed '">DSTL</a>`}

        </div>
        </div>`;

}
export {
    tpl
}
