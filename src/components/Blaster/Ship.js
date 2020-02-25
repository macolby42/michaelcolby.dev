import { sleep, hex, triangle } from './utils'
import { Shot } from './Shot';

export class Ship {
    constructor(x, y, speed, startAngle, fill) {
        this.x = x
        this.y = y
        this.speed = speed
        this.angle = startAngle
        this.fill = fill
        this.stroke = false
        
        this.shots = []
        this.cooldown = 0
        
        this.render = this.render.bind(this)
        this.up = this.up.bind(this)
        this.left = this.left.bind(this)
        this.right = this.right.bind(this)
        this.shoot = this.shoot.bind(this)
        this.deleteShot = this.deleteShot.bind(this)
        this.shotCooldown = this.shotCooldown.bind(this)
        this.isHit = this.isHit.bind(this)
    }

    render(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);        
        ctx.rotate(this.angle);
        hex(ctx, 100, 100, 40, this.fill, this.stroke)

        ctx.restore()

        ctx.save();
        ctx.translate(this.x+(55 * Math.cos(this.angle)), this.y+(55 * Math.sin(this.angle)));
        ctx.rotate(this.angle);
        triangle(ctx, 20, this.fill, this.stroke)

        ctx.restore()

        ctx.save()
        ctx.rotate(this.angle);
        ctx.restore()
    }

    isHit(shot) {
        return Math.hypot((this.x-shot.x), (this.y-shot.y)) < 55
    }

    up() {
        this.x += (this.speed * Math.cos(this.angle))
        this.y += (this.speed * Math.sin(this.angle))
    }

    left() {
        this.angle = this.angle -= 9 * Math.PI / 180
    }

    right() {
        this.angle = this.angle += 9 * Math.PI / 180
    }

    shoot(){
        if (this.cooldown === 0) {
            let shot = new Shot(this.x+(55 * Math.cos(this.angle)), this.y+(55 * Math.sin(this.angle)))
            shot.fly(this.angle)
            this.shots.push(shot)
            this.cooldown = 2
            this.shotCooldown()
        }
    }
    
    async shotCooldown() {
        while (this.cooldown > 0) {
            this.cooldown = this.cooldown - 1
            await sleep(500)
        }
    }

    deleteShot(index) {
        this.shots.splice(index, 1)
    }

    reset(x, y, speed, startAngle, fill) {
        this.x = x
        this.y = y
        this.speed = speed
        this.angle = startAngle
        this.fill = fill
        
        this.shots = []
        this.cooldown = 0
    }
}