import React from 'react';
import '../../App.css';

export default class GameCanvas extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <canvas className={ "canvas" }
        ref={node =>
          node ? this.props.ctxRef(node.getContext('2d')) : null} />
    );
  }
}