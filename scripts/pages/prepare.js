import { BaseHTMLElement } from "../common/base.js"
class PreparePage extends BaseHTMLElement {

    constructor() {
        super('/scripts/pages/prepare.html')
    }

}
customElements.define('page-prepare', PreparePage)
