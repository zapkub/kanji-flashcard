import { defineCustomComponent } from "../common/base.js";



defineCustomComponent({
    name: 'ui-word', 
    html: './scripts/elements/word.html',
    extends: {
        setReveal(template, isReveal) {
            const revealComponents = template.querySelectorAll('.kana, .en')
            revealComponents.forEach(component => {
                if (isReveal) {
                    component.classList.add('reveal')
                } else {
                    component.classList.remove('reveal')
                }
            })
        },
        setValue(template, value) {
            template.innerHTML = `
                <span slot="kanji">${value.kanji || value.kana}</span>
                <span slot="kana">${value.kana}</span>
                <span slot="en">${value.en}</span>
            `
        }
    }
})