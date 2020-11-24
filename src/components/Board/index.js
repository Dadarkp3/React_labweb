import React from 'react';

// Style
import './style.css';

//Componentes
import { Container, Row, Col } from 'react-bootstrap';
import Cell from '../Cell';
import Button from '../Button';

// Helpers
import { shuffle } from '../../helpers/helpers';

const initialState = {
  boardState: shuffle(),
  pontuation: 0,
};

const winnerConfiguration = [1, 2, 3, 4, 5, 6, 7, 8, 0];
const boardSize = 3;

class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      ...initialState,
    };
    this.moveCell = this.moveCell.bind(this);
    this.clearMemory = this.clearMemory.bind(this);
    this.findBlankPosition = this.findBlankPosition.bind(this);
    this.checkEndOFGame = this.checkEndOFGame.bind(this);
  }

  checkEndOFGame(boardState) {
    var winner = true;
    for (var i = 0; i < boardSize * boardSize; i++) {
      if (boardState[i] !== winnerConfiguration[i]) {
        winner = false;
      }
    }
    if (winner) {
      return true;
    }
    return false;
  }

  clearMemory() {}

  findBlankPosition(actualPosition) {
    var blankPosition = -1;
    if (
      actualPosition + boardSize < boardSize * boardSize &&
      this.state.boardState[actualPosition + boardSize] === 0
    ) {
      //look position: below
      blankPosition = actualPosition + boardSize;
    } else if (
      actualPosition - boardSize >= 0 &&
      this.state.boardState[actualPosition - boardSize] === 0
    ) {
      //look position: above
      blankPosition = actualPosition - boardSize;
    } else if (
      actualPosition + 1 < boardSize * boardSize &&
      (actualPosition + 1) % boardSize !== 0 &&
      this.state.boardState[actualPosition + 1] === 0
    ) {
      //look position: right
      blankPosition = actualPosition + 1;
    } else if (
      actualPosition - 1 >= 0 &&
      actualPosition % boardSize !== 0 &&
      this.state.boardState[actualPosition - 1] === 0
    ) {
      //look position: left
      blankPosition = actualPosition - 1;
    }
    return blankPosition;
  }

  moveCell(n) {
    if (n['value'] === 0) {
      return;
    } else {
      var blankPosition = this.findBlankPosition(n['position']);
      if (blankPosition !== -1) {
        var boardState = [...this.state.boardState];
        boardState[blankPosition] = n['value'];
        boardState[n['position']] = 0;
        this.setState({ boardState });
        this.checkEndOFGame(boardState);
        this.setState({ pontuation: this.state.pontuation + 1 });
      }
    }
  }

  renderCell(i) {
    //i=0
    return (
      <Col className='noPadding'>
        <Cell
          value={this.state.boardState[i]}
          position={i}
          click={this.moveCell}
        />
      </Col>
    );
  }

  render() {
    return (
      <div className='Board'>
        <Container>
          <Row>
            <Col>
              <h2>Score: {this.state.pontuation}</h2>
            </Col>
          </Row>
        </Container>
        <Container>
          {!this.checkEndOFGame(this.state.boardState) ? (
            <>
              <Row>
                {this.renderCell(0)}
                {this.renderCell(1)}
                {this.renderCell(2)}
              </Row>
              <Row>
                {this.renderCell(3)}
                {this.renderCell(4)}
                {this.renderCell(5)}
              </Row>
              <Row>
                {this.renderCell(6)}
                {this.renderCell(7)}
                {this.renderCell(8)}
              </Row>
            </>
          ) : (
            <Row className='win-game'>You Win!</Row>
          )}
        </Container>
        <Container>
          <Row>
            <Col>
              <Button
                text='Restart'
                callback={() =>
                  this.setState({
                    ...initialState,
                  })
                }
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Board;
