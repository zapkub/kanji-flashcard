import { BaseHTMLElement } from "../common/base.js"
class UIButton extends BaseHTMLElement {

    constructor() {
        super('/scripts/elements/button.html')
    }

}
customElements.define('ui-button', UIButton)
