

function createCustomWebComponent(templateContent, config) { 
    const uiElementClass = class UIElement extends HTMLElement {
        static formAssociated = config.formAssociated;
        static get observedAttributes() {
            return config.observedAttributes || []
        }
        constructor() {
            super();
            for(let k in config.extends) {
                if (typeof this[k] === 'function') {
                    this[k] = this[k].bind(this, this)
                }
            }

            if (uiElementClass.formAssociated) {
                this._internals = this.attachInternals()
            }
        }

        /**
         * 
         * @param {string} id 
         * @returns template from shadowroot query by id
         */
        getTemplate(id) {
            return this.shadowRoot.querySelector(`template#${id}`)
        }

        getElement(id) {
            return this.shadowRoot.querySelector(`#${id}`)
        }

        querySelector(query) {
            return this.shadowRoot.querySelector(query)
        }

        querySelectorAll(query) {
            return this.shadowRoot.querySelectorAll(query)
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue !== newValue) {
                if(config.onAttributeChange) {
                    config.onAttributeChange.bind(name, oldValue, newValue)
                }
            }
        }

        async connectedCallback() {
            this.attachShadow({ mode: 'open' })
            this.shadowRoot.appendChild(templateContent.cloneNode(true))
            if(config.onMount) {
                config.onMount(this)
            }
            this.createNestedComponent()
        }

        async disconnectedCallback() {
            console.log(this)
            config.onUnmount?.(this)
        }

        createNestedComponent() {
            config.components?.forEach(component => {
                const nestedComponentTemplate = this.shadowRoot.querySelector(`template#${component.name}`)
                const CustomUIElement = createCustomWebComponent(nestedComponentTemplate.content, component)
                customElements.define(component.name, CustomUIElement,component.options)
            })
        }
    }
    Object.assign(uiElementClass.prototype, config.extends)
    return uiElementClass
}

async function defineCustomComponent(config) {

    let componentTemplate = document.getElementById(config.name)
    if (!componentTemplate) {
        const response = await fetch(config.html, {
            redirect: 'follow',
        })
        const text = await response.text()
        componentTemplate = document.createElement('template')
        componentTemplate.id = config.name
        componentTemplate.innerHTML = text

    }
    let templateContent = componentTemplate.content
    if (config.templateId) {
        templateContent = componentTemplate.content.querySelector(`template#${config.templateId}`).content
    }
    const CustomUIElement = createCustomWebComponent(templateContent, config)

    customElements.define(config.name, CustomUIElement, config.options)
}

export { defineCustomComponent }
