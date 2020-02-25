import React from 'react';
import GameCanvas from './GameCanvas'

export default class GameOverScreen extends React.Component {
    constructor(props) {
        super(props);
        this.saveContext = this.saveContext.bind(this);
        this.show = this.show.bind(this);
        
        this.state = {
            player: props.player,
            enemies: props.enemies,
            killed: props.killed
        }
        this.handleButtonClick = this.handleButtonClick.bind(this)

        window.addEventListener('click', this.handleButtonClick);
    }

    handleButtonClick(e) {
        let x = e.clientX
        let y = e.clientY
        let halfW = Math.floor(this.width/2)
        let halfH = Math.floor(this.height/2)
        if (x > halfW-100 && x < halfW+100 && y > halfH+25 && y < halfH+75) {
            this.ctx.clearRect(0, 0, this.width, this.height)
            this.props.gameOverCallback(false)
        }
    }

    saveContext(ctx) {
        this.ctx = ctx;
        this.width = this.ctx.canvas.parentNode.offsetWidth;
        this.height = this.ctx.canvas.parentNode.offsetHeight;
    }
    
    show() {
        let halfW = Math.floor(this.width/2)
        let halfH = Math.floor(this.height/2)
        this.ctx.save()
        this.ctx.fillStyle = "white"
        this.ctx.font = "30pt Arial"
        this.ctx.textAlign = "center"
        this.ctx.textBaseline = "top"
        this.ctx.fillText("Game Over", halfW, halfH)
        this.ctx.fillStyle = 'RGB(50,255,175)'
        this.ctx.fillRect(halfW-100, halfH+40, 200, 50)
        this.ctx.fillStyle = 'black'
        this.ctx.fillText("Retry?", halfW, halfH+45)
        this.ctx.restore()
    }

    setupCanvas() {
        this.ctx.canvas.height = this.height;
        this.ctx.canvas.width = this.width;
        this.props.sizeCallback(this.height, this.width);
    }

    componentDidUpdate() {
        this.ctx.fillStyle = this.props.options.backgroundColor;
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.show();
    }
    
    componentDidMount() {
        this.setupCanvas();
        this.ctx.fillStyle = this.props.options.backgroundColor;
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.show();
    }

    render() {
        return(<GameCanvas ctxRef={ this.saveContext } />);
    }
}