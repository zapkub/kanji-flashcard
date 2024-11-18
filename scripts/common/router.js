


export class Router {
    static goTo(page, state) {
        Router.setState(state)
        console.log('push new history state')
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('page', page)
        const newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
        history.pushState(null, '', newRelativePathQuery);
        Router.render(page, state)
    }

    static getState() {
        const searchParams = new URLSearchParams(window.location.search);
        return JSON.parse(atob(searchParams.get('state')))
    }
    static setState(state) {
        const base64State = window.btoa(JSON.stringify(state || Router.getState()))
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('state', base64State);
        const newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
        history.pushState(null, '', newRelativePathQuery);
    }

    static render(page) {
        document.getElementById('root').innerHTML = `
            <page-${page}></page-${page}>
        `
    }

    static init() { }
}