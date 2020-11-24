import React, { useState } from 'react';

// Style
import './style.css';

//Componentes
import { Container, Row, Col } from 'react-bootstrap';
import Cell from '../Cell';
import Button from '../Button';

// Helpers
import { shuffle } from '../../helpers/helpers';

const Board = () => {
  const [boardState, setBoardState] = useState(shuffle());
  const [pontuation, setPontuation] = useState(0);

  const winnerConfiguration = [1, 2, 3, 4, 5, 6, 7, 8, 0];
  const boardSize = 3;

  function checkEndOFGame(boardState) {
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

  const findBlankPosition = (actualPosition) => {
    var blankPosition = -1;
    if (
      actualPosition + boardSize < boardSize * boardSize &&
      boardState[actualPosition + boardSize] === 0
    ) {
      //look position: below
      blankPosition = actualPosition + boardSize;
    } else if (
      actualPosition - boardSize >= 0 &&
      boardState[actualPosition - boardSize] === 0
    ) {
      //look position: above
      blankPosition = actualPosition - boardSize;
    } else if (
      actualPosition + 1 < boardSize * boardSize &&
      (actualPosition + 1) % boardSize !== 0 &&
      boardState[actualPosition + 1] === 0
    ) {
      //look position: right
      blankPosition = actualPosition + 1;
    } else if (
      actualPosition - 1 >= 0 &&
      actualPosition % boardSize !== 0 &&
      boardState[actualPosition - 1] === 0
    ) {
      //look position: left
      blankPosition = actualPosition - 1;
    }
    return blankPosition;
  };

  const moveCell = ({ value, position }) => {
    console.log(value, position);
    if (value === 0) {
      return;
    }
    const blankPosition = findBlankPosition(position);
    if (blankPosition !== -1) {
      let board = boardState;
      board[blankPosition] = value;
      board[position] = 0;
      setBoardState(board);
      setPontuation(pontuation + 1);
      checkEndOFGame(boardState);
    }
  };

  const cleanBoard = () => {
    setBoardState(shuffle());
    setPontuation(0);
  };

  return (
    <div className='Board'>
      <Container>
        <Row>
          <Col>
            <h2>Score: {pontuation}</h2>
          </Col>
        </Row>
      </Container>
      <Container className='board-game'>
        {!checkEndOFGame(boardState) ? (
          boardState.map((cell, index) => (
            <Cell
              key={cell}
              value={cell}
              position={index}
              callback={() => moveCell({ value: cell, position: index })}
            />
          ))
        ) : (
          <Row className='win-game'>You Win!</Row>
        )}
      </Container>
      <Container>
        <Row>
          <Col>
            <Button text='Restart' callback={() => cleanBoard()} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Board;
