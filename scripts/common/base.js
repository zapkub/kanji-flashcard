window.templateCache = {}
class BaseHTMLElement extends HTMLElement {


   _html = null

    constructor(html) {
        super()
        this._html = html
        this._templateKey = btoa(this._html).toLocaleLowerCase();
    }

    async connectedCallback() {
        let text = window.templateCache[this._templateKey]
        let dd = window.templateCache["l3njcmlwdhmvzwxlbwvudhmvynv0dg9ulmh0bww="]
        console.log(dd)

        if (!text) {
            console.log('no cache')
            const response = await fetch(this._html, {
                redirect: 'follow',
            })
            text = await response.text()
            window.templateCache[this._templateKey] = text
        }

        const shadow = this.attachShadow({ mode: 'open' })
        shadow.innerHTML = text

    }
}

export { BaseHTMLElement }
