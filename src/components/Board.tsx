
import React, {useEffect, useState} from 'react';


function Board() {
    const rows = 8, columns = 8;
    const [board, setBoard] = useState([]);

    const initializeBoard = () => {
        const pieces = [
            'R2', 'N2', 'B2', 'Q2', 'K2', 'B2', 'N2', 'R2',
            'P2', 'P2', 'P2', 'P2', 'P2', 'P2', 'P2', 'P2',
            '', '', '', '', '', '', '', '',
            '', '', '', '', '', '', '', '',
            '', '', '', '', '', '', '', '',
            '', '', '', '', '', '', '', '',
            'P1', 'P1', 'P1', 'P1', 'P1', 'P1', 'P1', 'P1',
            'R1', 'N1', 'B1', 'Q1', 'K1', 'B1', 'N1', 'R1',
        ];

        const initBoard = Array.from({ length: rows }, () => Array(columns).fill(''));

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                if (pieces[i * columns + j]) {
                    initBoard[i][j] = pieces[i * columns + j];
                }
            }
        }

        // @ts-ignore
        setBoard(initBoard);
    }

    useEffect(() => {
        initializeBoard();
    }, []);

    return (
        <div className="board-container">
            <div className="board">
                {board.map((row: Array<string>, i: number) => (
                    <div key={i} className="row">
                        {row.map((cell: string, j: number) => (
                            <div key={j} className={`cell ${((i + j) % 2 === 0) ? 'cell-white' : 'cell-black'}`}>
                                <span className={`piece-${cell}`}>
                                    {cell}
                                </span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Board;
