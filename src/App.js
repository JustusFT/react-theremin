import React, { Component } from 'react';
import Options from './Options';
import PlayField from './PlayField';

const mockOptions = {
  volumeArea: 50
  //range: [80, 1440],
  //key: 'C',
  //scale: 'major'
};

class App extends Component {
  render() {
    return (
      <div>
        <Options />
        <PlayField options={mockOptions} />
      </div>
    );
  }
}

export default App;
