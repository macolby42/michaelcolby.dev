import React from 'react';
import GameCanvas from './GameCanvas'
import { scoreBoard } from './utils';

class Canvas extends React.Component {

    constructor(props) {
        super(props);
        this.saveContext = this.saveContext.bind(this);
        this.show = this.show.bind(this);
        
        this.state = {
            player: props.player,
            enemies: props.enemies,
            killed: props.killed
        }
    }

    saveContext(ctx) {
        this.ctx = ctx;
        this.width = this.ctx.canvas.parentNode.offsetWidth;
        this.height = this.ctx.canvas.parentNode.offsetHeight;
    }
    
    show() {
        scoreBoard(this.ctx, this.props.killed, this.width, this.height)
        this.state.player.render(this.ctx)
        this.state.player.shots.forEach((shot, index) => {
            if ((shot.x < this.width && shot.x > 0) && (shot.y < this.height && shot.y > 0)) {
                shot.render(this.ctx)
            }
            else {
                this.state.player.deleteShot(index)
            }
        })
        this.state.enemies.forEach((enemy, enemyIndex) => {
            enemy.render(this.ctx)
            if (this.state.player.isHit(enemy)) this.props.gameOverCallback(true)
            this.state.player.shots.forEach((shot, shotIndex) => {
                if (enemy.isHit(shot)) {
                    this.props.shotEnemyCallback(enemyIndex)
                    this.state.player.deleteShot(shotIndex)
                }
            })
        })
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

export default Canvas;