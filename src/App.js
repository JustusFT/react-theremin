import React, { Component } from 'react';

import Options from './components/Options/Options';
import PlayField from './components/PlayField/PlayField';
import Theremin from './util/Theremin';

class App extends Component {
  constructor(props) {
    super(props);

    this.theremin = new Theremin();
  }

  resize = () => this.forceUpdate();

  handleMouseMove = e => {
    this.theremin.setPitch(e.pageX);
    this.theremin.setVolume(e.pageY);
  };

  handleOptionsChange = (key, value, { forceUpdate = false } = {}) => {
    this.theremin.options[key] = value;
    if (forceUpdate) {
      this.forceUpdate();
    }
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
        <Options onOptionsChange={this.handleOptionsChange} />
        <PlayField
          theremin={this.theremin}
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
