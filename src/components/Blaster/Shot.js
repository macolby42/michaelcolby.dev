import { sleep, hex } from './utils'

export class Shot {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.render = this.render.bind(this)
    }

    async fly(angle) {
        while (true) {
            this.x += (15 * Math.cos(angle))
            this.y += (15 * Math.sin(angle))
            await sleep(30)
        }
    }

    render(ctx) {
        ctx.save()
        ctx.translate(this.x, this.y)  
        hex(ctx, 20, 20, 8, 'RGB(50,255,175)')
        ctx.restore()
    }
}