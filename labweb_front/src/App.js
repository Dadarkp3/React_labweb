import React from 'react';
import Board from './board/Board.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <header className="App-header">8-Puzzle</header>
        <div className="App">
          <Board />
        </div>
      </div>
    );
  }
}

export default App;
