
export default class Skill {

    constructor({ name, castTime, coolDown }) {
        this.name = name
        this.coolDown = coolDown
        this.castTime = castTime
        this.lastUsed = 0
    }
    use() {
        if (this.lastUsed != 0) {
            return null
        }
        this.lastUsed = performance.now()
        return this
    }

    ready() {
        return this.lastUsed == 0
    }

    casting() {
        if (this.ready()) {
            return false
        }
        let ts = performance.now()
        if (this.lastUsed + this.castTime > ts) {
            return true
        } else {
            return false
        }
    }

    update(dt) {
        let ts = performance.now()
        if (this.lastUsed != 0) {
            let remainingTime = this.coolDown - (ts - this.lastUsed)
            if (remainingTime <= 0) {
                this.lastUsed = 0
            }
        }
        return null
    }
}