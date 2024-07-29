class ScoreText {
    constructor({ x, y, fontSize }) {
        this.x = x
        this.y = y
        this.fontSize = fontSize
        this.score = 0;
    }
    add(score) {
        this.score += score
    }

    set(score) {
        this.score = score
    }
    increase() {
        this.score++
    }
    update(ctx, dt) {
        ctx.fillStyle = "black"
        ctx.font = `bold ${this.fontSize}px serif`
        ctx.fillText(this.score, this.x, this.y);
    }
}

export default ScoreText