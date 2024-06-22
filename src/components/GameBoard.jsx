import React, { useState } from 'react';

// const initialGameBoard = [
//     [null, null, null],
//     [null, null, null],
//     [null, null, null],
// ];

const GameBoard = ({ onSelectSquare, board }) => {
    // const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // function handleSelectSquare(rowIndex, colIndex) {
    //     setGameBoard((prevGameBoard) => {
    //         // prevGameBoard[rowIndex][colIndex] = "X"
    //         // return prevGameBoard

    //         //insted of this in react we store previous values
    //         // const updatedBoard = prevGameBoard.map((row, rIdx) =>
    //         //     row.map((cell, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? "X" : cell))
    //         // );
    //         const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //     });

    //     onSelectSquare();
    // }

    // let gameBoard = initialGameBoard;

    // for (const turn of turns) {
    //     const { square, player } = turn;
    //     const { row, col } = square;

    //     gameBoard[row][col] = player;
    // }


    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                <button onClick={() => onSelectSquare(rowIndex, colIndex)}
                                    disabled={ playerSymbol !== null }
                                >
                                    {playerSymbol}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}

export default GameBoard;