class Vector2D {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    add(vector) {
        this.x += vector.x
        this.y += vector.y
    }

    subtract(vector) {
        this.x -= vector.x
        this.y -= vector.y
    }

    multiply(vector) {
        this.x *= vector.x
        this.y *= vector.y
    }

    divide(vector) {
        this.x /= vector.x
        this.y /= vector.y
    }
}


export default Vector2D