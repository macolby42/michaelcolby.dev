export function rand(from, to){
    return Math.floor(Math.random() * to) + from;  
}

export function isOnScreen(x, y, xMax, yMax) {
    if (0 > x || x > xMax) return false
    if (0 > y || y > yMax) return false
    return true
}

export async function sleep(bedtime) {
    return new Promise(resolve => setTimeout(resolve, bedtime))
}

export function hex(ctx, width, height, side, color, stroke) {
    const path = new Path2D()
    
    const halfHeight = Math.floor(height/2)
    const halfSideLength = Math.floor(side/2)
    const halfWidth = Math.floor(width/2)
    
    path.moveTo(0, -(halfHeight))
    /* Q1  */
    path.lineTo(halfSideLength, -(halfHeight))
    path.lineTo(halfWidth, -(halfSideLength))
    path.lineTo(halfWidth, 0)

    /* Q4 */
    path.lineTo(halfWidth, halfSideLength)
    path.lineTo(halfSideLength, halfHeight)
    path.lineTo(0, halfHeight)

    /* Q3 */
    path.lineTo(-(halfSideLength), halfHeight)
    path.lineTo(-(halfWidth), halfSideLength)
    path.lineTo(-(halfWidth), 0)

    /* Q2 */
    path.lineTo(-(halfWidth), -(halfSideLength))
    path.lineTo(-(halfSideLength), -(halfHeight))
    path.lineTo(0, -(halfHeight))

    path.closePath()
    if (stroke) {
        ctx.strokeStyle = color
        ctx.stroke(path)
        ctx.fillStyle = "black"
        ctx.fill(path)
    }
    else {
        ctx.fillStyle = color
        ctx.fill(path)
    }
}

export function triangle(ctx, side, color, stroke) {
    const path = new Path2D()
    
    path.moveTo(0, 0)

    path.lineTo(side, 0)
    path.lineTo(0, side)
    path.lineTo(0, 0)

    path.lineTo(0, -side)
    path.lineTo(side, 0)

    path.closePath()
    if (stroke) {
        ctx.strokeStyle = color
        ctx.stroke(path)
        ctx.fillStyle = "black"
        ctx.fill(path)
    }
    else {
        ctx.fillStyle = color
        ctx.fill(path)
    }
}

export function scoreBoard(ctx, score, width) {
    ctx.save()
    ctx.clearRect(width-100, 0, 100, 100);
    ctx.fillRect(width-100, 0, 100, 100);
    ctx.fillStyle = "white"
    ctx.font = "30pt Arial"
    ctx.textAlight = "center"
    ctx.fillText(score, (width-100), 50)
    ctx.restore()
}

export function deepCopy(obj) {
    return Object.assign({}, obj)
}