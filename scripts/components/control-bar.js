import { BaseHTMLElement } from "../common/base.js"
class ControlBar extends BaseHTMLElement {

    constructor() {
        super('/scripts/components/control-bar.html')
    }

}
customElements.define('control-bar', ControlBar)