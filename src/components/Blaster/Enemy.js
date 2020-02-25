import { Ship } from "./Ship";

export class Enemy extends Ship {
    constructor(x, y, speed, startAngle, fill) {
        super(x, y, speed, startAngle, fill);
        this.stroke = true

        this.follow = this.follow.bind(this);
    }

    async follow(playerPos) {
        let angleToPlayer = Math.atan2((playerPos.y - this.y), (playerPos.x - this.x)) 
        this.angle = angleToPlayer
        this.up()
    }
}