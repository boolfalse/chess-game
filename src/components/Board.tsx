
import React, {useEffect, useState} from 'react';


function Board() {
    // WHITE is blue, BLACK is red // 1984 :)

    const rows = 8, columns = 8;
    const [board, setBoard] = useState([]);
    const [turn, setTurn] = useState('white');
    const [lastSelected, setLastCSelected] = useState({ r: -1, c: -1 });

    const pieceSelected = (r: number, c: number) => {
        // get the clicked cell
        const cell = document.querySelector(`.cell[data-r="${r}"][data-c="${c}"]`);
        if (!cell) return;

        const currentOwner = cell.getAttribute('data-current-owner');
        // owner 1 is white, owner 2 is black
        if (currentOwner === '' || currentOwner !== turn) {
            // alert('Invalid move');
            return;
        }

        // change the color of the cell
        if (cell.classList.contains('selected')) {
            cell.classList.remove('selected');
            setLastCSelected({ r: -1, c: -1 });
        } else {
            const lastCell = document.querySelector(`.cell[data-r="${lastSelected.r}"][data-c="${lastSelected.c}"]`);
            if (lastCell) lastCell.classList.remove('selected');
            cell.classList.add('selected');
            setLastCSelected({ r, c });
        }
    }

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
                            <div key={j}
                                 data-current-owner={!cell ? '' : (cell[1] === '1' ? 'white' : 'black')}
                                 data-r={i}
                                 data-c={j}
                                 onClick={() => pieceSelected(i, j)}
                                 className={`cell ${((i + j) % 2 === 0) ? 'cell-white' : 'cell-black'}`}>
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
