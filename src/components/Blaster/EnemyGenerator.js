import { Enemy } from "./Enemy"
import { rand, sleep } from "./utils"

export default class EnemyGenerator {
    constructor(xBounds, yBounds) {
        this.xBounds = xBounds
        this.yBounds = yBounds
        this.enemies = []
        this.killed = 0

        this.generate = this.generate.bind(this)
        this.generateNorth = this.generateNorth.bind(this)
        this.waveTicker = this.waveTicker.bind(this)
        this.enemyShot = this.enemyShot.bind(this)
        this.clearEnemies = this.clearEnemies.bind(this)
    }

    updateBounds(x, y) {
        this.xBounds = x
        this.yBounds = y
    }

    generate() {
        /* 0 = NORTH
           1 = EAST
           2 = SOUTH
           3 = WEST
        */
        let direction = rand(0, 3)
        switch(direction) {
            case 0:
                this.generateNorth()
                break;
            case 1:
                this.generateEast()
                break;
            case 2:
                this.generateSouth()
                break;
            case 3:
                this.generateWest()
                break;
            default:
                return
        }
    }
    
    generateNorth() {
        let x = rand(0, this.xBounds)
        let y = rand(50, 250)
        this.enemies.push(new Enemy(x, -y, 3, (0 * Math.PI / 180), 'RGB(50,255,175)'))
    }

    generateEast() {
        let x = rand(this.xBounds+50, this.xBounds+250)
        let y = rand(0, this.yBounds)
        this.enemies.push(new Enemy(x, y, 3, (0 * Math.PI / 180), 'RGB(50,255,175)'))
    }

    generateSouth() {
        let x = rand(0, this.xBounds)
        let y = rand(this.yBounds+50, this.yBounds+250)
        this.enemies.push(new Enemy(x, y, 3, (0 * Math.PI / 180), 'RGB(50,255,175)'))
    }

    generateWest() {
        let x = rand(50, 250)
        let y = rand(0, this.yBounds)
        this.enemies.push(new Enemy(-x, y, 3, (0 * Math.PI / 180), 'RGB(50,255,175)'))
    }

    enemyShot(index) {
        this.enemies.splice(index, 1)
        this.killed += 1
    }

    clearEnemies() {
        this.killed = 0
        this.enemies = []
    }

    async waveTicker() {
        while (true) {
            let toGenerate = rand(3, 8)
            for (let x=0; x < toGenerate; x++) {
                this.generate()
            }
            await sleep(10000) // wave every 10 secs
        }
    }
}