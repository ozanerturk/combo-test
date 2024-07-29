import util from "./util.js"
const STATUS = {
    SUCCESS: 1,
    FAIL: 0,
    RUNNING: 2,
    IDLE: 3
}
class Combo {
    constructor({ x, y, width, height }) {
        this.combo = 0;
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.status = STATUS.IDLE
        this.remaningTime = 0;
        this.startTime = 0
        this.valid_time_region = [0.7, 0.8]
        this.onResult = () => { }
    }


    error(msg) {
        this.status = STATUS.FAIL
        this.msg = msg
        this.remaningTime = 0
    }
    hit(duration) {
        if (this.status != STATUS.RUNNING) {
            return
        }
        let occurTime = performance.now()
        let timingInDurationPercentage = (occurTime - this.startTime) / this.duration
        if (timingInDurationPercentage < this.valid_time_region[0]) {
            this.error("miss")
            return false;
        } else if (timingInDurationPercentage > this.valid_time_region[1]) {
            this.error("miss")
            return false;
        } else {
            this.combo++;
            this.next(duration)
            return true;
        }
    }
    next(duration) {
        let start = util.random(0.5, 0.8)
        let minWidth = 0.1
        let end = util.random(start + minWidth, 0.9)
        this.valid_time_region = [start, end]
        this.startTime = performance.now()
        this.duration = duration
        this.remaningTime = duration
    }
    start(duration) {
        this.combo = 0;
        this.status = STATUS.RUNNING
        this.next(duration)
    }
    isRunning() {
        return this.status == STATUS.RUNNING
    }
    isSuccess() {
        return this.status == STATUS.SUCCESS
    }

    update(ctx, dt) {
        //draw progress bar
        //draw container rectangle
        if (this.status == STATUS.IDLE) {
            ctx.fillStyle = "gray"
            ctx.fillRect(this.x, this.y, this.width, this.height);
        } else if (this.status == STATUS.RUNNING) {
            ctx.fillStyle = "yellow"
            ctx.fillRect(this.x, this.y, this.width, this.height);
            this.remaningTime -= dt
            if (this.remaningTime <= 0) {
                this.remaningTime = 0
                this.error("combo timeout")
            }
            ctx.fillStyle = "green"
            ctx.fillRect(this.x, this.y, this.width * (1 - (this.remaningTime / this.duration)), this.height);
            ctx.strokeStyle = "black"
        }
        else if (this.status == STATUS.SUCCESS) {
            ctx.fillStyle = "rgb(0,200,0)"
            ctx.fillRect(this.x, this.y, this.width, this.height);

        }
        else if (this.status == STATUS.FAIL) {
            ctx.fillStyle = "red"
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        

        ctx.beginPath()
        ctx.moveTo(this.x + this.width * this.valid_time_region[0], this.y)
        ctx.lineTo(this.x + this.width * this.valid_time_region[0], this.y + this.height)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(this.x + this.width * this.valid_time_region[1], this.y)
        ctx.lineTo(this.x + this.width * this.valid_time_region[1], this.y + this.height)
        ctx.stroke()

    }
}

const combo = new Combo({ x: 50, y: 50, width: 700, height: 50 })

export default combo