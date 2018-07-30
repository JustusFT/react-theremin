import React, { Component } from 'react';

import Options from './components/Options/Options';
import PlayField from './components/PlayField/PlayField';
import Theremin from './util/Theremin';

class App extends Component {
  constructor(props) {
    super(props);

    this.theremin = new Theremin();

    this.state = {
      height: this.theremin.options.volumeArea,
      lines: this.theremin.getNotePositions()
    };
  }

  resize = () => this.forceUpdate();

  handleMouseMove = e => {
    this.theremin.setPitch(e.pageX);
    this.theremin.setVolume(e.pageY);
  };

  handleHeightChange = value => {
    this.theremin.options.height = value;
    this.setState({
      height: value
    });
  };

  handleLineChange = (key, value) => {
    this.theremin.options[key] = value;
    this.setState({
      lines: this.theremin.getNotePositions()
    });
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  render() {
    return (
      <div>
        <Options
          theremin={this.theremin}
          onHeightChange={this.handleHeightChange}
          onLineChange={this.handleLineChange}
        />
        <PlayField
          lines={this.state.lines}
          height={this.state.height}
          onMouseEnter={this.theremin.playSound}
          onMouseLeave={this.theremin.stopSound}
          onMouseMove={this.handleMouseMove}
        />
        <button onClick={() => this.forceUpdate()}>Update</button>
      </div>
    );
  }
}

export default App;
