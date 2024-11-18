import { defineCustomComponent } from "../common/base.js";
import { fetcher } from "../common/fetcher.js";
import { Router } from "../common/router.js";

// Mulberry32 is a simple and effective 32-bit seeded random number generator
function mulberry32(seed) {
    return function () {
        let t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}

function shuffleArray(array, seed = Date.now()) {
    // Create a copy to avoid mutating the original array
    const shuffled = [...array];
    const random = mulberry32(seed);

    // Fisher-Yates shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

const vocabResolver = async (lessonIdList = []) => {
    const vocabListResponse = await Promise.all(lessonIdList.map(lessonId => fetcher(`./datasource/${lessonId}.json`)))
    const vocabList = await Promise.all(vocabListResponse.map(response => response.json()))
    return vocabList
}

defineCustomComponent({
    name: 'page-session',
    html: './scripts/pages/session.html',
    onRender: async (template) => {

        const endButton = template.querySelector('ui-button#end-button')
        endButton.addClickHandler(template.onEnd)

        const nextButton = template.querySelector('ui-button#next-button')
        nextButton.addClickHandler(template.onNext)

        const state = Router.getState()
        const vocabLists = await vocabResolver(state.lessons)
        let vocabs = vocabLists.map(lesson => lesson.vocab).reduce((curr, next) => {
            return curr.concat(next)
        }, [])
        const seed = state.seed || Date.now()
        vocabs = shuffleArray(vocabs, seed)
        template.vocabs = vocabs
        state.seed = seed
        Router.setState(state)

        template.renderVocab()

    },
    extends: {

        renderVocab(template) {
            const kanjiDisplay = template.querySelector('div#kanji-display')
            const vocabs = template.vocabs
            const state = Router.getState()
            if (!state.vocabIdx) {
                state.vocabIdx = 0
            }
            kanjiDisplay.innerText = vocabs[state.vocabIdx].kanji || vocabs[state.vocabIdx].kana
        },

        onNext(template) {
            const state = Router.getState()
            state.vocabIdx = state.vocabIdx+1
            Router.setState(state)
            template.renderVocab();
        },
        onEnd() {
            Router.goTo('prepare', {
                page: 'prepare',
            })
        },

    }
})