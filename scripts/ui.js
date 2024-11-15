
import './components/control-bar.js'
import './elements/button.js'
import './pages/prepare.js'

class UI {
    static getById(id) {
        return document.getElementById(id)
    }

    constructor() {
        this._root = UI.getById('root')
    }

    goTo(routeName) {
        this._root.innerHTML = `<page-${routeName}></page-${routeName}>`
    }
}

export default {

    init() {
        const ui = new UI()
        ui.goTo('prepare')
        return ui
    }


}