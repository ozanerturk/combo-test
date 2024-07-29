class Engine {
    constructor({ canvas, width, height }) {
        this.canvas = canvas
        //set the canvas size
        this.canvas.width = width
        this.canvas.height = height

        //set the context
        this.context = canvas.getContext("2d")

        //set the objects
        this.objects = []
        this.previousTs = 0
    }

    add(gameObject) {
        this.objects.push(gameObject)
    }

    start() {
        this.previousTs = performance.now()
        console.log("engine started")
        requestAnimationFrame(this.update.bind(this))
    }

    update() {
        let ts = performance.now()
        let dt = (ts - this.previousTs)
        this.previousTs = ts

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.context.fillStyle = "black"
        this.context.fillText("fps:" + (1000 / dt).toFixed(2), 20, 20)
        this.objects.forEach(obj => {
            obj.update(this.context, dt)
        })

        requestAnimationFrame(this.update.bind(this))
    }
}

export default Engine;