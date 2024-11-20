
import { Router } from './common/router.js'



export default {

    async init() {

        await import('./components/control-bar.js')
        await import('./elements/button.js')
        await import('./elements/word.js')
        await import('./pages/prepare.js')
        await import('./pages/session-page.js')

        Router.init();
        const query = new URLSearchParams(window.location.search)
        Router.goTo(query.get('page') || 'prepare')
    }


}