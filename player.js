

import combo from "./combo.js"
export default class Player {
    constructor({ name }) {
        this.name = name
        this.skills = {}
        this.activeSkill = null
    }

    addSkill(skill) {
        this.skills[skill.name] = skill
    }

    useSkill(name) {
        if (this.activeSkill && !combo.isRunning()) { //casting a skill
            return null
        }
        let skill = this.skills[name]
        if (!skill || !skill.ready()) {
            return null
        }
        this.activeSkill = skill

        return skill.use()
    }

    update(dt) {
        let ts = performance.now()

        if (this.activeSkill) {
            if (!this.activeSkill.casting()) {
                this.activeSkill = null
            }
        }


    }

}