import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ squares, onSquareClick, status }) {
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => onSquareClick(0)} />
        <Square value={squares[1]} onSquareClick={() => onSquareClick(1)} />
        <Square value={squares[2]} onSquareClick={() => onSquareClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => onSquareClick(3)} />
        <Square value={squares[4]} onSquareClick={() => onSquareClick(4)} />
        <Square value={squares[5]} onSquareClick={() => onSquareClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => onSquareClick(6)} />
        <Square value={squares[7]} onSquareClick={() => onSquareClick(7)} />
        <Square value={squares[8]} onSquareClick={() => onSquareClick(8)} />
      </div>
    </>
  );
}

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [selectedSquare, setSelectedSquare] = useState(null);

  function handleClick(i) {
    if (calculateWinner(squares)) {
      return;
    }

    const currentPlayer = xIsNext ? 'X' : 'O';
  
    const playerPieceCount = squares.filter(
      (square) => square === currentPlayer,
    ).length;

    if (playerPieceCount >= 3) {
      if(selectedSquare === null){
        if (squares[i] == currentPlayer) {
          setSelectedSquare(i);
        }
        return;
      }
      if (squares[i]) {
        setSelectedSquare(null);
        return;
      }

      const nextSquares = squares.slice();
      if(!isAdjacent(selectedSquare, i)){
        setSelectedSquare(null);
        return;
      }
      nextSquares[selectedSquare] = null;
      nextSquares[i] = currentPlayer;
      setSquares(nextSquares);
      setSelectedSquare(null);
      setXIsNext(!xIsNext);
      return;

    }

    if (squares[i]) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = currentPlayer;
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} onSquareClick={handleClick} status={status} />
      </div>
    </div>
  );
}

function isAdjacent(from, to) {
  const fromRow = Math.floor(from / 3);
  const fromCol = from % 3;
  const toRow = Math.floor(to / 3);
  const toCol = to % 3;

  const rowDiff = Math.abs(fromRow - toRow);
  const colDiff = Math.abs(fromCol - toCol);

  return (rowDiff <= 1 && colDiff <= 1 && (rowDiff !== 0 || colDiff !== 0));
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
