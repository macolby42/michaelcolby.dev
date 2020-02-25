import React from 'react';
import Canvas from './Canvas';
import { Ship } from './Ship';
import { deepCopy } from './utils';
import EnemyGenerator from './EnemyGenerator';
import GameOverScreen from './GameOverScreen';

class Game extends React.Component {
    constructor(props) {
        super(props);
        
        this.lastUpdate = performance.now();
        this.enemyGenerator = new EnemyGenerator()
        
        this.state = {
            width: null,
            height: null,
            player: new Ship(400, 400, 14, (0 * Math.PI / 180), 'RGB(50,255,175)'),
            isGameOver: false,
            keys: []
        }
        this.getCanvasSize = this.getCanvasSize.bind(this);
        this.update = this.update.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
        this.handleKeyup = this.handleKeyup.bind(this);
        this.enemyShot = this.enemyShot.bind(this);
        this.gameOverCallback = this.gameOverCallback.bind(this);

        window.addEventListener('keydown',this.handleKeydown);
        window.addEventListener('keyup',this.handleKeyup);
        // window.addEventListener('resize', this.onResize.bind(this));
    }

    handleKeydown(e) {
        e.preventDefault()
        const code = e.key
        if (code === 'w' || code === 'W' || code === 'a' || code === 'A' || code === 'd' || code === 'D' || code === ' ') {
            const currKeys = this.state.keys
            if (!currKeys.includes(code) && currKeys.length < 10) {
                currKeys.push(code)
                this.setState({keys: currKeys})
            }
        }
    }

    handleKeyup(e) {
        e.preventDefault()
        const code = e.key
        const currKeys = this.state.keys
        const loc = currKeys.indexOf(code)
        currKeys.splice(loc, 1)
        this.setState({keys: currKeys})
    }

    getCanvasSize(width, height) {
        this.setState({
            width: width,
            height: height
        })
        this.enemyGenerator.updateBounds(width, height)
    }

    gameOverCallback(isGameOver) {
        console.log('play ball!')
        if (isGameOver) {
            this.setState({ isGameOver: isGameOver })
            this.enemyGenerator.clearEnemies()
            this.state.player.reset(400, 400, 14, (0 * Math.PI / 180), 'RGB(50,255,175)')
        }
        else {
            this.setState({ 
                isGameOver: isGameOver,
            })
        }
    }

    enemyShot(index) {
        this.enemyGenerator.enemyShot(index)
    }

    componentDidMount() {
        this.rAF = requestAnimationFrame(this.update);
        this.enemyGenerator.waveTicker()
    }

    update() {
        if (this.lastUpdate < performance.now() - this.props.options.updateRate) {
            this.lastUpdate = performance.now();
            const temp = deepCopy(this.state.player)
            this.state.keys.forEach(code => {
                if (code === 'w' || code === 'W') {
                    temp.up();
                }
                if (code === 'a' || code === 'A') {
                    temp.left();
                }
                if (code === 'd' || code === 'D') {
                    temp.right();
                }
                if (code === ' ') {
                    temp.shoot();
                }
                return true
            })
            this.enemyGenerator.enemies.forEach(e => {
                e.follow({ x: temp.x, y: temp.y })
                return true
            })
            this.forceUpdate()
        }
        this.rAF = requestAnimationFrame(this.update);
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.rAF);
    }

    render() {
        if (this.state.isGameOver) {
            return(
                <GameOverScreen
                    options={ this.props.options }
                    sizeCallback={ this.getCanvasSize }
                    gameOverCallback={ this.gameOverCallback }
                />
            )
        }
        else {
            return (
                <Canvas 
                    player={ this.state.player }
                    enemies={ this.enemyGenerator.enemies }
                    killed={ this.enemyGenerator.killed }
                    options={ this.props.options }
                    sizeCallback={ this.getCanvasSize }
                    shotEnemyCallback={ this.enemyShot }
                    gameOverCallback={ this.gameOverCallback }
                />
            )
        }
    }
}

export default Game;