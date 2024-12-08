import { defineCustomComponent } from "../common/base.js"
defineCustomComponent({
    name: 'ui-button', 
    html: './scripts/elements/button.html',
    onMount: async (template) => {
        const button = template.getElement('ui-button')
        button.type = template.getAttribute('type')
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
