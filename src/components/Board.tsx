
import React, {useEffect, useState} from 'react';


function Board() {
    // WHITE is blue, BLACK is red // 1984 :)

    const rows = 8, columns = 8;
    const [board, setBoard] = useState([]);
    const [turn, setTurn] = useState('white');
    const [lastSelected, setLastSelected] = useState({ r: -1, c: -1 });

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
            setLastSelected({ r: -1, c: -1 });
        } else {
            const lastCell = document.querySelector(`.cell[data-r="${lastSelected.r}"][data-c="${lastSelected.c}"]`);
            if (lastCell) lastCell.classList.remove('selected');
            cell.classList.add('selected');
            setLastSelected({ r, c });
        }

        highlightAvailableMoves(board[r][c][0], board[r][c][1], r, c);
    }

    const highlightAvailableMoves = (pieceType: string, pieceOwner: string, r: number, c: number) => {
        console.log(`Type: ${pieceType}, Owner: ${pieceOwner === '1' ? 'white' : 'black'}, Row: ${r}, Column: ${c}`);

        const pieceMoves = [];
        switch (pieceType) {
            case 'K':
                pieceMoves.push({r: r + 1, c: c});
                pieceMoves.push({r: r - 1, c: c});
                pieceMoves.push({r: r, c: c + 1});
                pieceMoves.push({r: r, c: c - 1});
                pieceMoves.push({r: r + 1, c: c + 1});
                pieceMoves.push({r: r + 1, c: c - 1});
                pieceMoves.push({r: r - 1, c: c + 1});
                pieceMoves.push({r: r - 1, c: c - 1});
                break;
            case 'Q':
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < columns; j++) {
                        if (i === r || j === c || Math.abs(i - r) === Math.abs(j - c)) {
                            pieceMoves.push({r: i, c: j});
                        }
                    }
                }
                break;
            case 'R':
                for (let i = 0; i < rows; i++) {
                    if (i !== r) pieceMoves.push({r: i, c});
                    if (i !== c) pieceMoves.push({r, c: i});
                }
                break;
            case 'B':
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < columns; j++) {
                        if (Math.abs(i - r) === Math.abs(j - c)) {
                            pieceMoves.push({r: i, c: j});
                        }
                    }
                }
                break;
            case 'N':
                const knightMoves = [
                    {dr: 2, dc: 1}, {dr: 2, dc: -1},
                    {dr: -2, dc: 1}, {dr: -2, dc: -1},
                    {dr: 1, dc: 2}, {dr: 1, dc: -2},
                    {dr: -1, dc: 2}, {dr: -1, dc: -2},
                ];

                knightMoves.forEach(move => {
                    const newR = r + move.dr;
                    const newC = c + move.dc;
                    if (newR >= 0 && newR < rows && newC >= 0 && newC < columns) {
                        pieceMoves.push({r: newR, c: newC});
                    }
                });
                break;
            case 'P':
                const direction = pieceOwner === '1' ? -1 : 1;
                const startRow = pieceOwner === '1' ? 6 : 1;
                const newR = r + direction;
                if (newR >= 0 && newR < rows) {
                    if (c > 0) pieceMoves.push({r: newR, c: c - 1});
                    if (c < columns - 1) pieceMoves.push({r: newR, c: c + 1});
                    if (r === startRow) {
                        pieceMoves.push({r: newR + direction, c});
                    }
                }
                break;
        }

        // filter out the moves that are out of bounds
        const filteredMoves = pieceMoves.filter(move => {
            return move.r >= 0 && move.r < rows && move.c >= 0 && move.c < columns;
        });

        // filter out the moves that are occupied by the same color
        const finalMoves = filteredMoves.filter(move => {
            const targetCell = board[move.r][move.c];
            return targetCell === '' || targetCell[1] !== pieceOwner;
        });

        // add class `available` to the available cells
        finalMoves.forEach(move => {
            const cell = document.querySelector(`.cell[data-r="${move.r}"][data-c="${move.c}"]`);
            if (cell) {
                cell.classList.add('available');
                cell.setAttribute('data-current-owner', pieceOwner === '1' ? 'white' : 'black');
            }
        });

        // TODO: add logic to move the piece
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
