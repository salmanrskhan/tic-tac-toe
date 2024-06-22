import React, { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = '0'
  }

  return currentPlayer
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState('X');
  // const [hasWinner, setHasWinner] = useState(false)
  const [players, setPlayers] = useState({
    X: 'Player 1',
    0: 'Player 2'
  });

  const activePlayer = deriveActivePlayer(gameTurns)

  // let gameBoard = initialGameBoard;
  let gameBoard = [...initialGameBoard.map(array => [...array])];

    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;

        gameBoard[row][col] = player;
    }

    let winner;

    for (const combination of WINNING_COMBINATIONS){
      const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
      const SecondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
      const ThirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

      if (firstSquareSymbol && 
        firstSquareSymbol === SecondSquareSymbol && 
        firstSquareSymbol === ThirdSquareSymbol)(
          // winner = firstSquareSymbol
          winner=players[firstSquareSymbol]
        )
    }

    const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? '0' : 'X')
    setGameTurns((prevTurns) => {
      // let currentPlayer = 'X';

      // if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
      //   currentPlayer = '0'
      // }

      const currentPlayer = deriveActivePlayer(prevTurns)

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns,
      ];
      
      return updatedTurns;
    });
  }

function handleRestart(){
  setGameTurns([])
}

function handlePlayerNameChange(symbol, newName){
  setPlayers(prevPlayers => {
    return {
      ...prevPlayers,
      [symbol]: newName
    };
  });
}

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
          initialName="player 1" 
          symbol="X" 
          isActive={activePlayer === 'X'} 
          onChangeName={handlePlayerNameChange}
          />
          <Player 
          initialName="player 2" 
          symbol="0" 
          isActive={activePlayer === '0'} 
          onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare}
          // /*activePlayerSymbol={activePlayer} */
          // turns={gameTurns}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
