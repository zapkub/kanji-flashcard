import { defineCustomComponent } from "../common/base.js"
import { fetcher } from "../common/fetcher.js"
import { Router } from "../common/router.js"

const renderLessonList = async (template, list) => {
    const lessonSelectors = template.getElement('lesson-selectors')
    const fragments = list.lessonIds
        .map((lesson) => {
            const templateNode = template.getElement("lesson-item-input-checkbox")
            const div = document.createElement('div');
            div.innerHTML = templateNode.innerHTML
                .replace(/\$value/g, lesson)
                .replace(/\$name/g, 'lesson')
            return div
        })
        .reduce((fragments, item) => {
            fragments.appendChild(item)
            return fragments
        }, document.createDocumentFragment())
    lessonSelectors.appendChild(fragments)
}

defineCustomComponent({
    name: 'page-prepare',
    html: './scripts/pages/prepare.html',
    onRender: async (template) => {
        const listResponse = await fetcher('./datasource/list.json')
        const list = await listResponse.json()
        const form = template.querySelector('form')
        form.addEventListener('submit', template.handleSubmit);
        await renderLessonList(template, list)
    },
    extends: {
        handleSubmit: (template, event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            Router.goTo('session', {
                lessons: formData.getAll('lesson')
            })
        },
    }
})
