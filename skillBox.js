

class SkillBox {
    constructor({
        skill, x, y, size
    }) {
        this.skill = skill
        this.name = skill.name
        this.x = x
        this.y = y
        this.width = size
        this.height = size
    }

    update(ctx, dt) {

        //draw outline  radiused rectangule empty
        ctx.fillStyle = "black"
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.fillStyle = "white"
        ctx.fillRect(this.x + 1, this.y + 1, this.width - 2, this.height - 2);

        //skill name center in box
        ctx.fillStyle = "black"
        //width of text
        ctx.font = `bold 12px serif`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(this.name, this.x + this.width / 2, this.y + this.height / 2);
        let ts = performance.now()
        if (this.skill.lastUsed != 0) {
            //draw casting loader
            let progress = (ts - this.skill.lastUsed) / this.skill.castTime
            //opacity 0.2
            if (progress < 1) {
                ctx.fillStyle = "rgba(0,0,0,0.2)"
                ctx.fillRect(this.x, this.y, this.width, this.height * (1 - progress));
            }
            let remainingTime = this.skill.coolDown - (ts - this.skill.lastUsed)
            //draw  opacity 0.5 box with height percentage of remaining time to cast
            if (remainingTime > 0) {
                let percentage = remainingTime / this.skill.coolDown
                ctx.fillStyle = "rgba(0,0,0,0.5)"
                ctx.fillRect(this.x, this.y, this.width, this.height * percentage);
            }
        }

    }
}

export default SkillBox