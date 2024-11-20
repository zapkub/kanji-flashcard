import { defineCustomComponent } from "../common/base.js"
defineCustomComponent({
    name: 'ui-button', 
    html: './scripts/elements/button.html',
    onRender: async (template) => {
        const button = template.getElement('ui-button')
    },
    extends: {
        addClickHandler: (template, handler) => {
            console.log('no event assigned')
            template.querySelector('button').addEventListener("click", () => {
                handler()
            });
        }
    }
})
