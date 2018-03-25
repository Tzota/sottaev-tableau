import React, { Component } from 'react';
import {connect} from 'react-redux';
import {omit} from 'ramda';

import './App.css';
import gong from './resources/Gong-sound.mp3'
import hammer from './resources/hammer.mp3'

import Tableau from './Containers/Tableau';

const BaseLogger = ({line} : {line: string}) => (
  <pre>{line}</pre>
);

const Logger = connect(
  (state: TState): {line: string} => ({
    //   line: state.logString,
      line: JSON.stringify(omit(['logString'],state), null, 4),
  })
)(BaseLogger);

class App extends Component {
    render() {
        return (
            <div className="App">
                {/* <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header> */}
                <Tableau />
                <pre style={{position: 'absolute', top: 0, left: 0, color: 'black', display: 'none' }}>
                    <Logger />
                </pre>
                <audio id='gong'><source src={gong} type="audio/mpeg" /></audio>
                <audio id='hammer'><source src={hammer} type="audio/mpeg" /></audio>
            </div>
        );
    }
}

export default App;
