import React from 'react';
import Game from './Game';
import '../../App.css';

export default function Blaster() {
    const options = {
        pixelSize: 10,
        backgroundColor: '#000000',
        redBG: 0,
        greenBG: 0,
        blueBG: 0,
        cellColor: '#FFFFFF',
        updateRate: 32,
        pixelPadding: 3,
        startPortionRows: 15,
        startPortionCols: 15,
        speed: 14
    }

    return(
        <div className="fullScreen">
            <Game options={ options }/>
      </div>
    );
}